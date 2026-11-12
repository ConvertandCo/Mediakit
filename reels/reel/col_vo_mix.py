# SFX for Reels 10/11 (collage). No music. Usage: python3 col_sfx.py afold|signup
import sys,numpy as np
from scipy.io import wavfile
from scipy.signal import butter,sosfilt
SR=48000;name=sys.argv[1];DUR=22.4
import json
ANC=json.load(open('fold_anchors.json'))
def WP(t):
    for i in range(1,len(ANC)):
        if t<=ANC[i][0]:a0,b0=ANC[i-1];a1,b1=ANC[i];return b0+(t-a0)*(b1-b0)/(a1-a0)
    return ANC[-1][1]+t-ANC[-1][0]
N=int(SR*DUR);L=np.zeros((N,2));WLs=np.zeros((N,2))
sos=lambda k,f:butter(2,f,btype=k,fs=SR,output='sos')
def ld(p,a=0,b=None,fi=0.003,fo=0.03,lp=None):
    sr,x=wavfile.read(p);x=x.astype(float)
    x=x/32768 if x.dtype!=float or np.abs(x).max()>2 else x
    if x.ndim==1:x=np.stack([x,x],1)
    x=x[int(a*sr):(int(b*sr) if b else None)].copy()
    if lp:x=sosfilt(sos('lowpass',lp),x,axis=0)
    i=int(fi*SR);o=int(fo*SR)
    if i:x[:i]*=np.linspace(0,1,i)[:,None]
    x[-o:]*=np.linspace(1,0,o)[:,None];return x/(np.abs(x).max()+1e-9)
def put(x,at,g,buf=None):
    at=max(0,WP(at)) if at>=0.1 else at
    b=L if buf is None else buf;i=int(at*SR);x=x[:N-i]*10**(g/20);b[i:i+len(x)]+=x
A='../sfx8/';B='../sfx9w/'
C1=ld(A+'click1.wav',0.12,0.45);C2=ld(A+'click2.wav',0,0.2);WH=ld(A+'whoosh.wav');KICK=ld(A+'kick.wav',fo=0.4)
IMP=ld(A+'impact.wav',1.95,4.5,fi=0.01,fo=0.8,lp=9000);PING=ld(A+'ping.wav',0.05,1.2,fo=0.4)
WL=ld(A+'whoosh.wav',lp=650,fi=0.05,fo=0.2);CHOP=ld(B+'chop.wav',fo=0.1);MOVE=ld(B+'move.wav');CNT=ld(B+'counting.wav',0,1.1,fo=0.25);ACC=ld(B+'accept.wav',fo=0.3)
wl=lambda at,g:put(WL,at,g,WLs)
if name=='afold':
    put(C2,0.05,-30);wl(1.35,-26);put(CHOP,2.0,-28);put(CHOP,2.3,-31);put(C2,2.2,-33)
    put(WH,3.15,-36);put(KICK,3.65,-30);put(CNT,5.5,-30);put(PING,6.5,-25);put(CHOP,7.2,-28);put(C2,7.5,-33)
    put(WH,8.55,-38);put(C2,8.8,-33);put(MOVE,10.5,-32);put(C2,10.65,-33)
    put(WH,11.9,-34);wl(11.85,-27);put(C2,12.35,-33);put(C1,12.8,-22);put(C1,13.5,-24)
    put(WH,14.95,-36);put(KICK,15.3,-30);put(CHOP,15.7,-30);put(C2,15.2,-34)
    wl(17.0,-27);put(C2,18.05,-30);put(C2,18.25,-33);put(WH,19.05,-35);put(PING,19.65,-26);put(C2,19.1,-33)
    put(C2,20.2,-34);put(C1,20.7,-20)
else:
    put(C2,0.05,-30);put(C1,0.6,-20);put(IMP,1.0,-24);put(KICK,1.02,-24)
    put(WH,2.4,-32);wl(2.4,-26);put(C2,2.6,-30)
    put(WH,3.25,-36)
    for i in range(6):put(C2,3.3+i*0.08,-38)
    put(CNT,3.95,-30);put(MOVE,5.1,-32);put(MOVE,6.4,-32);put(C2,7.3,-32);put(C2,7.65,-32)
    put(WH,8.95,-36);put(KICK,9.1,-30);put(C2,9.2,-33);wl(10.5,-26);put(MOVE,10.55,-32);put(CHOP,11.55,-26);put(CHOP,11.7,-28)
    put(WH,11.95,-36);put(KICK,12.25,-30);put(C1,12.8,-20)
    wl(13.45,-27);put(KICK,13.75,-30)
    for i in range(6):put(C2,14.15+i*0.1,-34)
    put(C2,14.9,-32);put(CHOP,15.25,-30)
    wl(15.95,-27);put(KICK,16.25,-30);put(C1,16.5,-24);put(PING,16.6,-28);put(C2,17.2,-30);wl(17.75,-28)
    put(WH,18.55,-36);put(KICK,18.7,-28);put(C1,19.35,-18);put(ACC,19.4,-26);put(C2,20.0,-34);put(C1,20.5,-20)
sr,v=wavfile.read('../vo4/fold_vo.wav');v=v.astype(float)/32768;v=v/np.abs(v).max()*10**(-7/20)
if v.ndim==1:v=np.stack([v,v],1)
vs=np.zeros((N,2));vs[:min(N,len(v))]=v[:N];env=np.abs(vs[:,0]);e=np.zeros(N);p=0;r=np.exp(-1/(0.25*SR))
for k in range(0,N,48):
    m=env[k:k+48].max();p=m if m>p else p*r**48;e[k:k+48]=p
g=1-0.5*np.clip(e/0.08,0,1);sfx=(L*g[:,None]+WLs)*10**(5/20)
mix=vs+sfx;wavfile.write('out/afold_vo_mix.wav',SR,(np.clip(mix,-1,1)*32767).astype(np.int16));print('peak',np.abs(mix).max(),'sfxpeak',np.abs(sfx).max())
