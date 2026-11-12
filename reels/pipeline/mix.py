#!/usr/bin/env python3
"""Mix sound effects (+ optional voiceover) for one reel. Called by build.py.
   mix.py <rid> '<json [[t,sound,dB],...]>' <duration> [vo.wav]
Sounds: click, click1, soft, pop (gentle), whoosh, wl (low whoosh, own stem, not ducked), move, chop, count, accept,
        thud, coin, rustle, snip, trace, hit, bub, ting1..ting4, impact, kick, ping.
House rules baked in: no music; SFX duck up to 50% under the voice; target about -15 LUFS."""
import sys, os, json, numpy as np, subprocess
from scipy.io import wavfile
from scipy.signal import butter, sosfilt, resample, fftconvolve
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rid=sys.argv[1]; EV=json.loads(sys.argv[2]); DUR=float(sys.argv[3]); VO=sys.argv[4] if len(sys.argv)>4 and sys.argv[4] else None
SR=48000; N=int(SR*DUR); L=np.zeros((N,2)); WL=np.zeros((N,2)); rng=np.random.default_rng(3)
sos=lambda k,f:butter(2,f,btype=k,fs=SR,output='sos')
def ld(p,a=0,b=None,fo=0.03,lp=None):
    sr,x=wavfile.read(os.path.join(ROOT,p));x=x.astype(float)
    x=x/32768 if np.abs(x).max()>2 else x
    if x.ndim==1:x=np.stack([x,x],1)
    if sr!=SR:x=resample(x,int(len(x)*SR/sr),axis=0)
    x=x[int(a*SR):(int(b*SR) if b else None)].copy()
    if lp:x=sosfilt(sos('lowpass',lp),x,axis=0)
    o=int(fo*SR);x[-o:]*=np.linspace(1,0,o)[:,None];x[:96]*=np.linspace(0,1,96)[:,None];return x/(np.abs(x).max()+1e-9)
tt=lambda d:np.arange(int(d*SR))/SR
def st(x):x=x/(np.abs(x).max()+1e-9);return np.stack([x,x],1)
P='sfx10/w/'
S={'click':ld(P+'mouse-click.wav'),'click1':ld(P+'click_01.wav',0,0.35,fo=0.08),'soft':ld(P+'ui-click.wav',fo=0.08),
   'whoosh':ld(P+'whoosh3.wav',lp=4000,fo=0.3),'wl':ld(P+'whoosh3.wav',lp=650,fo=0.3),'move':ld(P+'ui-move.wav'),
   'chop':ld(P+'fast-simple-chop-5.wav',fo=0.1),'count':ld(P+'counting.wav',0,1.3,fo=0.3),'accept':ld(P+'menu_beep_accept_soft.wav',fo=0.3),
   'impact':ld('sfx8/impact.wav',1.95,4.5,fo=0.8,lp=9000),'kick':ld('sfx8/kick.wav',fo=0.4),'ping':ld('sfx8/ping.wav',0.05,1.2,fo=0.4)}
# gentle pop: slower, softer top, small room
p=ld(P+'ui-pop-sound.wav',0,0.5,fo=0.2);p=resample(p,int(len(p)*1.18),axis=0);p=sosfilt(sos('lowpass',3200),p,axis=0)
ir=np.exp(-np.arange(int(0.35*SR))/SR*14)*rng.standard_normal(int(0.35*SR));ir/=np.abs(ir).sum()/6
w=np.stack([fftconvolve(p[:,c],ir)[:len(p)+int(0.35*SR)] for c in range(2)],1);d=np.zeros_like(w);d[:len(p)]=p
p=d+0.28*w/np.abs(w).max();p[-int(0.05*SR):]*=np.linspace(1,0,int(0.05*SR))[:,None];S['pop']=p/np.abs(p).max()
# made-in-code sounds
t=tt(0.45);f=120*np.exp(-t*9)+45;S['thud']=st(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*9)+sosfilt(sos('lowpass',900),rng.standard_normal(len(t)))*np.exp(-t*40)*0.6)
t=tt(0.6);x=sum(a*np.sin(2*np.pi*f*t)*np.exp(-t*dd) for f,a,dd in [(2637,1,7),(3951,.6,9),(5274,.35,12)]);x[int(0.07*SR):]+=0.8*x[:len(x)-int(0.07*SR)];S['coin']=st(x*np.minimum(1,t*800))
t=tt(0.7);n=sosfilt(sos('bandpass',[1800,7000]),rng.standard_normal(len(t)));am=np.abs(sosfilt(sos('lowpass',18),rng.standard_normal(len(t))));S['rustle']=st(n*am*np.sin(np.pi*t/0.7))
x=np.zeros(int(0.2*SR))
for a in (0.0,0.08):
    i=int(a*SR);m=int(0.03*SR);x[i:i+m]+=sosfilt(sos('highpass',3000),rng.standard_normal(m))*np.exp(-np.arange(m)/SR*150)
S['snip']=st(x)
t=tt(0.45);n=sosfilt(sos('bandpass',[2500,9000]),rng.standard_normal(len(t)));S['trace']=st(n*(0.6+0.4*np.abs(np.sin(2*np.pi*11*t)))*np.sin(np.pi*t/0.45)**0.5)
t=tt(0.7);f=90*np.exp(-t*6)+38;S['hit']=st(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*5)+0.5*sosfilt(sos('lowpass',2500),rng.standard_normal(len(t)))*np.exp(-t*30))
t=tt(0.12);S['bub']=st(np.sin(2*np.pi*np.cumsum(500+2600*t/0.12)/SR)*np.sin(np.pi*t/0.12))
for k,fr in enumerate((1568,1760,1976,2349),1):
    t=tt(0.32);x=np.sin(2*np.pi*fr*t)*np.exp(-t*13)+0.25*np.sin(2*np.pi*2*fr*t)*np.exp(-t*22);S[f'ting{k}']=st(x*np.minimum(1,t*900))
def put(x,at,g,buf):
    i=int(max(0,at)*SR)
    if i>=N:return
    x=x[:N-i]*10**(g/20);buf[i:i+len(x)]+=x
for at,name,g in EV:
    if name not in S: print('unknown sound',name);continue
    put(S[name],at,g,WL if name=='wl' else L)
mix=L+WL
if VO:
    sr,v=wavfile.read(VO);v=v.astype(float)/32768
    if v.ndim>1:v=v.mean(1)
    v=v/np.abs(v).max()*10**(-7/20);vs=np.zeros(N);vs[:min(N,len(v))]=v[:N]
    env=np.abs(vs);e=np.zeros(N);pk=0;r=np.exp(-1/(0.25*SR))
    for k in range(0,N,48):
        m=env[k:k+48].max();pk=m if m>pk else pk*r**48;e[k:k+48]=pk
    g=1-0.5*np.clip(e/0.08,0,1);mix=np.stack([vs,vs],1)+L*g[:,None]+WL
else:
    mix=mix/(np.abs(mix).max()+1e-9)*10**(-3/20)
os.makedirs(os.path.join(ROOT,'reel','out',rid),exist_ok=True);tmp=os.path.join(ROOT,'reel','out',rid,'mix_raw.wav')
wavfile.write(tmp,SR,(np.clip(mix,-1,1)*32767).astype(np.int16))
# static gain to about -15 LUFS (measured, not dynamic loudnorm, which would lift quiet SFX)
meas=subprocess.run(['ffmpeg','-i',tmp,'-af','ebur128','-f','null','-'],capture_output=True,text=True).stderr
I=[float(l.split('I:')[1].split('LUFS')[0]) for l in meas.splitlines() if l.strip().startswith('I:')]
gain=(-15.0-I[-1]) if I else 0
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',tmp,'-af',f'volume={gain:.2f}dB,alimiter=limit=0.84',os.path.join(ROOT,'reel','out',rid,'mix.wav')],check=True)
print('mix ok, gain',round(gain,2))
