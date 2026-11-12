# Voice + light SFX from the user's pack (sfx10). SFX duck under the voice; low whooshes on their own stem.
import sys,subprocess,json,numpy as np
from scipy.io import wavfile
from scipy.signal import butter,sosfilt
SR=48000;name=sys.argv[1]
import json
CFG=json.load(open('c3_vo.json'))[name];DUR=CFG['end'];ANC=CFG['anc'];WIN=CFG['win']
def WP(t):
    for a,b,n in WIN:
        if a<=t<b:return n+(t-a)
    for i in range(1,len(ANC)):
        if t<=ANC[i][0]:a0,b0=ANC[i-1];a1,b1=ANC[i];return b0+(t-a0)*(b1-b0)/(a1-a0)
    return ANC[-1][1]+t-ANC[-1][0]
N=int(SR*DUR)
sos=lambda k,f:butter(2,f,btype=k,fs=SR,output='sos')
W='../sfx10/w/'
def ld(n,a=0,b=None,fo=0.03,lp=None):
    sr,x=wavfile.read(W+n+'.wav');x=x.astype(float)/32768
    if x.ndim==1:x=np.stack([x,x],1)
    x=x[int(a*SR):(int(b*SR) if b else None)].copy()
    if lp:x=sosfilt(sos('lowpass',lp),x,axis=0)
    o=int(fo*SR);x[-o:]*=np.linspace(1,0,o)[:,None];x[:96]*=np.linspace(0,1,96)[:,None];return x/(np.abs(x).max()+1e-9)
L=np.zeros((N,2));WLs=np.zeros((N,2))
MUTE={}
def put(x,t,g,b=None):
    t=max(0,WP(t))
    if any(a<=t<c for a,c in MUTE.get(name,[])):return
    b=L if b is None else b;i=int(t*SR)
    if i>=N:return
    x=x[:N-i]*10**(g/20);b[i:i+len(x)]+=x
CLK=ld('mouse-click');CLK1=ld('click_01',0,0.35,fo=0.08);POP=ld('ui-pop-sound',0,0.5,fo=0.2);ACC=ld('menu_beep_accept_soft',fo=0.3)
WH=ld('whoosh3',lp=4000,fo=0.3);WL=ld('whoosh3',lp=650,fo=0.3);MOVE=ld('ui-move');CHOP=ld('fast-simple-chop-5',fo=0.1);CNT=ld('counting',0,1.3,fo=0.3)
wl=lambda t,g:put(WL,t,g,WLs)

# --- small synthesized sounds for what the pack doesn't have ---
rng=np.random.default_rng(3);tt=lambda d:np.arange(int(d*SR))/SR
def st(x):x=x/(np.abs(x).max()+1e-9);return np.stack([x,x],1)
def thud():t=tt(0.45);f=120*np.exp(-t*9)+45;ph=2*np.pi*np.cumsum(f)/SR;n=sosfilt(sos('lowpass',900),rng.standard_normal(len(t)))*np.exp(-t*40)*0.6;return st((np.sin(ph)*np.exp(-t*9)+n))
def coin():t=tt(0.6);x=sum(a*np.sin(2*np.pi*f*t)*np.exp(-t*d) for f,a,d in [(2637,1,7),(3951,.6,9),(5274,.35,12)]);x[int(0.07*SR):]+=0.8*x[:len(x)-int(0.07*SR)];return st(x*np.minimum(1,t*800))
def rustle(d=0.7):t=tt(d);n=sosfilt(sos('bandpass',[1800,7000]),rng.standard_normal(len(t)));am=np.abs(sosfilt(sos('lowpass',18),rng.standard_normal(len(t))));return st(n*am*np.sin(np.pi*t/d))
def snip():t=tt(0.18);x=np.zeros(len(t))
for a in (0.0,0.07):
    pass
def snip():
    t=tt(0.2);x=np.zeros(len(t))
    for a in (0.0,0.08):i=int(a*SR);m=int(0.03*SR);x[i:i+m]+=sosfilt(sos('highpass',3000),rng.standard_normal(m))*np.exp(-np.arange(m)/SR*150)
    return st(x)
def bub():t=tt(0.12);f=500+2600*t/0.12;return st(np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*t/0.12))
THUD,COIN,RUS,SNIP,BUB=thud(),coin(),rustle(),snip(),bub()

def tok():pass
def trace(d=0.45):t=tt(d);n=sosfilt(sos('bandpass',[2500,9000]),rng.standard_normal(len(t)));am=0.6+0.4*np.abs(np.sin(2*np.pi*11*t));return st(n*am*np.sin(np.pi*t/d)**0.5)
def hit():t=tt(0.7);f=90*np.exp(-t*6)+38;x=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*5);n=sosfilt(sos('lowpass',2500),rng.standard_normal(len(t)))*np.exp(-t*30);return st(x+0.5*n)
TRC,HIT=trace(),hit();SOFT=ld('ui-click',fo=0.08)


# --- gentler pop: 18% slower (lower, rounder), soft top end, small room echo; every other pop becomes a soft click ---
from scipy.signal import resample, fftconvolve
_p=POP.copy();_p=resample(_p,int(len(_p)*1.18),axis=0);_p=sosfilt(sos('lowpass',3200),_p,axis=0)
_ir=np.exp(-np.arange(int(0.35*SR))/SR*14)*np.random.default_rng(5).standard_normal(int(0.35*SR));_ir/=np.abs(_ir).sum()/6
_w=np.stack([fftconvolve(_p[:,c],_ir)[:len(_p)+int(0.35*SR)] for c in range(2)],1);_d=np.zeros_like(_w);_d[:len(_p)]=_p
_p=_d+0.28*_w/np.abs(_w).max();_p[-int(0.05*SR):]*=np.linspace(1,0,int(0.05*SR))[:,None];GPOP=_p/np.abs(_p).max()
_cnt=[0];_put0=put
SKIP={'col_upi':(3.7,6.6),'col_nine':(9.0,)}
def put(x,t,g,b=None):
    if x is POP:
        _cnt[0]+=1
        if round(t,2) in SKIP.get(name,()):return
        if _cnt[0]%2==0:return _put0(SOFT,t,g+1,b)
        return _put0(GPOP,t,g-3,b)
    return _put0(x,t,g,b)

def _ting(f):
    t=np.arange(int(0.32*SR))/SR;x=np.sin(2*np.pi*f*t)*np.exp(-t*13)+0.25*np.sin(2*np.pi*2*f*t)*np.exp(-t*22);x*=np.minimum(1,t*900);x/=np.abs(x).max();return np.stack([x,x],1)
TING=[_ting(f) for f in (1568,1760,1976,2349)]
P=put
if name=='col_speed':
    P(POP,0.1,-26);P(CLK1,0.9,-22);P(POP,1.0,-29);[P(SOFT,1.6+i*0.04,-36) for i in range(12)];P(ACC,2.8,-26);P(POP,3.0,-29)
    P(WH,4.35,-30);P(POP,4.6,-27);P(MOVE,6.3,-30);P(MOVE,7.2,-30);P(POP,8.6,-29);P(ACC,9.75,-25);P(TRC,10.0,-29)
    P(WH,11.15,-30);P(POP,11.3,-30);P(THUD,11.5,-22);P(THUD,12.5,-22);P(THUD,13.6,-22)
    P(SNIP,15.05,-20);P(SNIP,15.3,-21);P(THUD,15.45,-26);wl(15.4,-23)
    P(WH,15.95,-31);P(POP,16.05,-28);P(POP,16.2,-30);P(POP,17.25,-28);P(POP,18.35,-30);wl(19.2,-27);P(MOVE,19.25,-31)
    P(POP,20.25,-30);P(CLK,20.7,-20)
elif name=='col_nine':
    P(POP,0.1,-26);P(TRC,1.6,-27);P(MOVE,2.1,-30);P(POP,2.25,-28);[P(SOFT,3.5+i*0.05,-35) for i in range(6)];P(POP,4.8,-27);P(POP,4.92,-27);P(POP,5.1,-29)
    P(WH,5.85,-30);P(POP,6.0,-28);P(POP,6.25,-28);[P(SOFT,6.25+i*0.08,-35) for i in range(14)];P(POP,6.3,-27);[P(SOFT,6.55+i*0.08,-35) for i in range(6)]
    P(TRC,7.9,-27);P(POP,9.0,-29);P(WH,10.45,-30);P(POP,10.5,-27);P(POP,10.7,-30);P(POP,11.5,-30);P(POP,12.2,-30);P(TRC,13.2,-26);P(POP,13.6,-29)
    P(WH,15.15,-30);P(POP,15.2,-27);P(HIT,16.6,-17);P(CHOP,16.62,-22);P(POP,17.5,-30)
    P(WH,18.75,-30);P(POP,19.0,-28);P(CLK1,19.5,-24);P(POP,20.6,-28);P(CLK1,21.5,-24);P(POP,22.6,-30);P(CLK,23.1,-20)
else:
    P(CNT,0.1,-27);P(ACC,2.35,-24);P(POP,1.0,-29);P(POP,2.6,-29)
    P(WH,3.65,-30);P(POP,3.7,-27);P(TRC,4.6,-30);P(TRC,5.05,-31);P(POP,5.6,-28)
    P(WH,6.55,-30);P(POP,6.6,-27);P(POP,6.9,-29);P(MOVE,7.0,-30);P(CLK,8.2,-21);[P(TING[i],8.5+i*0.12,-31) for i in range(4)];P(ACC,9.1,-25)
    P(WH,9.55,-30);P(POP,9.8,-29);P(TRC,10.0,-28);wl(13.2,-22);P(MOVE,13.25,-28);P(POP,14.0,-29);[P(POP,14.7+i*0.15,-27) for i in range(3)]
    P(WH,16.45,-30);P(POP,16.5,-28);P(POP,18.0,-24);P(TRC,18.8,-29);P(POP,20.7,-29);P(POP,22.2,-30);P(CLK,22.7,-20)
from scipy.io import wavfile as wf
sr,v=wf.read(f"../vo4/{CFG['vo']}_vo.wav");v=v.astype(float)/32768;v=v/np.abs(v).max()*10**(-7/20)
vs=np.zeros(N);vs[:min(N,len(v))]=v[:N];env=np.abs(vs);e=np.zeros(N);p=0;r=np.exp(-1/(0.25*SR))
for k in range(0,N,48):
    m=env[k:k+48].max();p=m if m>p else p*r**48;e[k:k+48]=p
g=1-0.5*np.clip(e/0.08,0,1)
mix=np.stack([vs,vs],1)+L*g[:,None]+WLs
wavfile.write(f'out/{name}_vo_mix.wav',SR,(np.clip(mix,-1,1)*32767).astype(np.int16));print(name,'peak',np.abs(mix).max(),'sfx',np.abs(L).max())
