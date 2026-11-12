# cap long pauses, trim lead-in, then force-align words with pocketsphinx
import sys,subprocess,re,json,numpy as np
from scipy.io import wavfile
name=sys.argv[1];CAP=float(sys.argv[2]) if len(sys.argv)>2 else 0.45
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{name}.mp3','-ar','48000','-ac','1',f'{name}_48.wav'],check=True)
sr,x=wavfile.read(f'{name}_48.wav');x=x.astype(np.float32)/32768
# silence map via frame energy
hop=int(sr*0.01);e=np.array([np.sqrt(np.mean(x[i:i+hop]**2)+1e-12) for i in range(0,len(x)-hop,hop)]);db=20*np.log10(e)
sil=db<-42
segs=[];i=0
while i<len(sil):
    if sil[i]:
        j=i
        while j<len(sil) and sil[j]:j+=1
        segs.append((i,j));i=j
    else:i+=1
out=[];pos=0;mp=[]  # map (orig_t,new_t)
newlen=0
for a,b in segs:
    a_s,b_s=a*hop,b*hop;L=b_s-a_s
    keep=int(0.08*sr) if a==0 else (int(0.15*sr) if b>=len(sil)-1 else min(L,int(CAP*sr)))
    if a_s>pos:out.append(x[pos:a_s]);mp.append((pos/sr,newlen/sr));newlen+=a_s-pos
    keep=min(keep,L);mp.append((a_s/sr,newlen/sr));out.append(x[a_s:a_s+keep]*np.linspace(1,1,keep));newlen+=keep;pos=b_s
if pos<len(x):out.append(x[pos:]);mp.append((pos/sr,newlen/sr));newlen+=len(x)-pos
y=np.concatenate(out);wavfile.write(f'{name}_vo.wav',sr,(y*32767).astype(np.int16))
print(name,'orig',len(x)/sr,'new',len(y)/sr)
