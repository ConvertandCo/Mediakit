#!/usr/bin/env python3
"""
Build one reel end to end.

  python3 pipeline/build.py <reel_id>            # uses plan/reels/<reel_id>.json
  python3 pipeline/build.py <reel_id> --check    # only render 6 check frames (no full render)

Spec (plan/reels/<id>.json):
  {"id":"R20","page":"reel/col_r20.js","head":"col"|"sb","title":"...","vo":"vo/R20.mp3" (optional),
   "transcript":"plain words of the VO (no tags)","overrides":{"K key": seconds,...},"aberration":true,"version":1}

The page JS must define K (beat times), CAP ([[t,'caption'],...]), S/SC (scenes), END, and SFX ([[t,'sound',dB],...])
in script time. When a voiceover exists, every time is re-mapped onto the spoken words automatically.
"""
import sys, os, json, subprocess, re, shutil, math
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REEL=os.path.join(ROOT,'reel'); OUT=os.path.join(REEL,'out'); os.makedirs(OUT,exist_ok=True)
rid=sys.argv[1]; CHECK='--check' in sys.argv
spec=json.load(open(os.path.join(ROOT,'plan','reels',f'{rid}.json')))
head={'col':'col_head.html','sb':'sb_head.html','pt':'pt_head.html'}[spec.get('head','col')]
libs={'col':['col_more.js'],'sb':['sb_lib.js','sb_ext.js'],'pt':[]}[spec.get('head','col')]
def sh(c,**k): print('$',c if isinstance(c,str) else ' '.join(c)); return subprocess.run(c,shell=isinstance(c,str),check=True,**k)

# 1) assemble the page
page=os.path.basename(spec['page']); base=os.path.splitext(page)[0]
html=open(os.path.join(REEL,head)).read()+''.join(f'<script src="{l}"></script>' for l in libs)+f'<script src="{page}"></script>'
src_html=os.path.join(REEL,f'{base}.html'); open(src_html,'w').write(html+'</body></html>')

# 2) read K / CAP / SFX / END from the page
dump=subprocess.run(['node','-e',f"""
const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://{src_html}');await p.evaluate(()=>window.ready);
console.log(JSON.stringify(await p.evaluate(()=>({{K,CAP,END:typeof END!=='undefined'?END:window.END,SFX:typeof SFX!=='undefined'?SFX:[],S}}))));await b.close();}})();"""],capture_output=True,text=True,check=True,cwd=REEL).stdout
D=json.loads(dump.strip().splitlines()[-1]); END=D['END']
print('scenes',D['S'],'END',END,'captions',len(D['CAP']),'sfx',len(D['SFX']))

# 3) voiceover: tighten pauses, align words, map caption starts onto words
anchors=None; vo_wav=None
if spec.get('vo') and os.path.exists(os.path.join(ROOT,spec['vo'])):
    import numpy as np
    from scipy.io import wavfile
    work=os.path.join(OUT,rid); os.makedirs(work,exist_ok=True)
    mp3=os.path.join(ROOT,spec['vo'])
    sh(['ffmpeg','-y','-loglevel','error','-i',mp3,'-ar','48000','-ac','1',f'{work}/vo48.wav'])
    sr,x=wavfile.read(f'{work}/vo48.wav'); x=x.astype(np.float32)/32768
    hop=int(sr*0.01); e=np.array([np.sqrt(np.mean(x[i:i+hop]**2)+1e-12) for i in range(0,len(x)-hop,hop)]); sil=20*np.log10(e)<-42
    out=[];pos=0;i=0;CAPS=0.42
    while i<len(sil):
        if sil[i]:
            j=i
            while j<len(sil) and sil[j]: j+=1
            a,b=i*hop,j*hop;L=b-a;keep=int(0.08*sr) if i==0 else (int(0.15*sr) if j>=len(sil)-1 else min(L,int(CAPS*sr)));keep=min(keep,L)
            if a>pos: out.append(x[pos:a])
            out.append(x[a:a+keep]);pos=b;i=j
        else: i+=1
    if pos<len(x): out.append(x[pos:])
    y=np.concatenate(out); vo_wav=f'{work}/vo.wav'; wavfile.write(vo_wav,sr,(y*32767).astype(np.int16)); VOLEN=len(y)/sr
    # forced alignment (pocketsphinx). Words missing from its dictionary are dropped from the alignment text.
    from pocketsphinx import Decoder
    sh(['ffmpeg','-y','-loglevel','error','-i',vo_wav,'-ar','16000','-ac','1','-f','s16le',f'{work}/vo.raw'])
    d=Decoder(samprate=16000)
    words=[w for w in re.sub(r"[^a-z' ]"," ",re.sub(r"\[[a-z ]+\]","",spec['transcript'].lower())).split()]
    words=[w for w in words if d.lookup_word(w) is not None]
    d.set_align_text(' '.join(words)); d.start_utt(); d.process_raw(open(f'{work}/vo.raw','rb').read(),full_utt=True); d.end_utt()
    W=[(re.sub(r'\(\d+\)','',s.word),s.start_frame/100,s.end_frame/100) for s in d.seg() if s.word not in ('<sil>','<s>','</s>','[NOISE]')]
    json.dump(W,open(f'{work}/words.json','w'))
    # caption chunk -> first matching word, scanning forward
    norm=lambda s:[w for w in re.sub(r"[^a-z' ]"," ",s.lower().replace('%',' percent')).split()]
    anchors=[];wi=0;last_end=0
    for t,txt in D['CAP']:
        if not txt:
            anchors.append([t,round(last_end+0.25,3)]);continue
        toks=[w for w in norm(txt) if d.lookup_word(w) is not None]
        hit=None
        for k in range(wi,len(W)):
            if toks and W[k][0]==toks[0]: hit=k;break
        if hit is None: continue
        anchors.append([t,round(W[hit][1],3)])
        n=max(1,len(toks)); wi=hit+1; last_end=W[min(len(W)-1,hit+n-1)][2]
    # monotonic clean-up + end anchor
    clean=[];prev=-1
    for a,b in sorted(anchors):
        if b>prev: clean.append([a,b]);prev=b
    clean.append([END,round(max(VOLEN+0.8,prev+0.6),3)])
    if spec.get('anchors'): clean=spec['anchors']
    anchors=clean; json.dump(anchors,open(f'{work}/anchors.json','w')); print('anchors',anchors)

# 4) the page that is actually rendered
render_html=src_html
if anchors:
    scen=','.join('K.'+k for k in D['K'] if k.startswith('s') and k[1:].isdigit())
    ov=json.dumps(spec.get('overrides',{}))
    render_html=os.path.join(REEL,f'{base}_vo.html')
    open(render_html,'w').write(html+f'<script src="warp.js"></script><script>WARP({json.dumps(anchors)},{ov});S=[0,{scen}];</script></body></html>')
def warp(t):
    if not anchors: return t
    for i in range(1,len(anchors)):
        if t<=anchors[i][0]:
            a0,b0=anchors[i-1];a1,b1=anchors[i];return b0+(t-a0)*(b1-b0)/max(1e-6,(a1-a0))
    return anchors[-1][1]+t-anchors[-1][0]
dur=round(warp(END),2) if anchors else END
ov=spec.get('overrides',{}); okeys={D['K'][k]:v for k,v in ov.items() if k in D['K']}
def wsfx(t):
    for k0,v in okeys.items():
        if k0<=t<k0+0.9: return v+(t-k0)
    return warp(t)

# 5) check frames
chk=os.path.join(OUT,rid,'check'); shutil.rmtree(chk,ignore_errors=True); os.makedirs(chk,exist_ok=True)
times=[round(dur*f,2) for f in (0.08,0.25,0.42,0.58,0.75,0.92)]
sh(['node','shot6.js']+[str(t) for t in times],cwd=REEL,env={**os.environ,'PG':os.path.basename(render_html),'OD':chk})
pngs=sorted([os.path.join(chk,f) for f in os.listdir(chk) if f.endswith('.png')],key=lambda p:float(re.findall(r'd_([\d.]+)\.png',p)[0]))
sh(['ffmpeg','-y','-loglevel','error']+sum([['-i',p] for p in pngs],[])+['-filter_complex',f'hstack={len(pngs)},scale=1800:-1',os.path.join(OUT,rid,'sheet.jpg')])
print('CHECK SHEET',os.path.join(OUT,rid,'sheet.jpg'))
if CHECK: sys.exit(0)

# 6) render in chunks (4 at a time), retry failures
frames=int(math.ceil(dur*30)); per=int(math.ceil(frames/6)); jobs=[]
for n in range(6):
    name=f'{rid}_{n}'; dst=os.path.join(OUT,name+'.mp4')
    if os.path.exists(dst): os.remove(dst)
    jobs.append((n*per,min(frames,(n+1)*per),name))
running=[];pending=list(jobs)
import time
while pending or running:
    while pending and len(running)<4:
        a,b,name=pending.pop(0);running.append((subprocess.Popen(['node','render_mb.js',os.path.basename(render_html),str(a),str(b),name],cwd=REEL,stdout=subprocess.DEVNULL,stderr=open(os.path.join(OUT,name+'.log'),'w')),(a,b,name),0))
    time.sleep(5);still=[]
    for p,job,tries in running:
        r=p.poll()
        if r is None: still.append((p,job,tries))
        elif r!=0 and tries<2:
            a,b,name=job;still.append((subprocess.Popen(['node','render_mb.js',os.path.basename(render_html),str(a),str(b),name],cwd=REEL,stdout=subprocess.DEVNULL,stderr=open(os.path.join(OUT,name+'.log'),'a')),job,tries+1))
        elif r!=0: raise SystemExit(f'render failed: {job}')
    running=still

# 7) sound: SFX from the page (re-timed) + voice with ducking
sh([sys.executable,os.path.join(ROOT,'pipeline','mix.py'),rid,json.dumps([[wsfx(t),s,g] for t,s,g in D['SFX']]),str(dur),vo_wav or ''])

# 8) mux
lst=os.path.join(OUT,f'{rid}.list'); open(lst,'w').write(''.join(f"file '{rid}_{n}.mp4'\n" for n in range(6)))
v=spec.get('version',1); suffix='VO' if vo_wav else 'noVO'
final_dir=os.path.join(OUT,'final'); os.makedirs(final_dir,exist_ok=True)
fn=os.path.join(final_dir,f"ConvertCo_{rid}_{spec['title']}_v{v}_{suffix}.mp4")
vf='[0:v]rgbashift=rh=-1:bh=1,format=yuv420p[v]' if spec.get('aberration',spec.get('head')=='col') else '[0:v]format=yuv420p[v]'
sh(['ffmpeg','-y','-loglevel','error','-f','concat','-safe','0','-i',lst,'-i',os.path.join(OUT,rid,'mix.wav'),'-filter_complex',vf+';[1:a]alimiter=limit=0.84[a]','-map','[v]','-map','[a]','-c:v','libx264','-preset','medium','-crf','17','-c:a','aac','-b:a','192k','-t',str(dur),'-movflags','+faststart',fn],cwd=OUT)
print('FINAL',fn)
