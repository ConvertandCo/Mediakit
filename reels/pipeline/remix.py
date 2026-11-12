#!/usr/bin/env python3
"""Re-mix sound and re-mux an already-rendered reel (no VO): remix.py <rid>"""
import sys,os,json,subprocess
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));REEL=os.path.join(ROOT,'reel');OUT=os.path.join(REEL,'out')
rid=sys.argv[1];spec=json.load(open(os.path.join(ROOT,'plan','reels',f'{rid}.json')))
html=os.path.join(REEL,os.path.splitext(os.path.basename(spec['page']))[0]+'.html')
head={'col':'col_head.html','sb':'sb_head.html','pt':'pt_head.html'}[spec['head']];libs={'col':['col_more.js'],'sb':['sb_lib.js','sb_ext.js'],'pt':[]}[spec['head']]
open(html,'w').write(open(os.path.join(REEL,head)).read()+''.join(f'<script src="{l}"></script>' for l in libs)+f'<script src="{os.path.basename(spec["page"])}"></script></body></html>')
d=subprocess.run(['node','-e',f"const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://{html}');await p.evaluate(()=>window.ready);console.log(JSON.stringify(await p.evaluate(()=>({{END:typeof END!=='undefined'?END:window.END,SFX}}))));await b.close();}})();"],capture_output=True,text=True,check=True,cwd=REEL).stdout
D=json.loads(d.strip().splitlines()[-1]);dur=D['END']
subprocess.run([sys.executable,os.path.join(ROOT,'pipeline','mix.py'),rid,json.dumps(D['SFX']),str(dur),''],check=True)
fn=os.path.join(OUT,'final',f"ConvertCo_{rid}_{spec['title']}_v{spec.get('version',1)}_noVO.mp4")
subprocess.run(['ffmpeg','-y','-loglevel','error','-f','concat','-safe','0','-i',os.path.join(OUT,f'{rid}.list'),'-i',os.path.join(OUT,rid,'mix.wav'),'-map','0:v','-map','1:a','-c:v','copy','-af','alimiter=limit=0.84','-c:a','aac','-b:a','192k','-t',str(dur),'-movflags','+faststart',fn],check=True,cwd=OUT)
print('REMIXED',fn)
