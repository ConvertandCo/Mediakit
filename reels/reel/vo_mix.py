# Voice + light SFX from the user's pack (sfx10). SFX duck under the voice; low whooshes on their own stem.
import sys,subprocess,json,numpy as np
from scipy.io import wavfile
from scipy.signal import butter,sosfilt
SR=48000;name=sys.argv[1]
VO={'sb_fold':'fold','sb_signup':'signup','sb_second':'second','sb_goldfish':'gold'}[name]
DUR={'sb_fold':22.4,'sb_signup':21.9,'sb_second':21.8,'sb_goldfish':20.4}[name];N=int(SR*DUR)
sos=lambda k,f:butter(2,f,btype=k,fs=SR,output='sos')
W='../sfx10/w/'
def ld(n,a=0,b=None,fo=0.03,lp=None):
    sr,x=wavfile.read(W+n+'.wav');x=x.astype(float)/32768
    if x.ndim==1:x=np.stack([x,x],1)
    x=x[int(a*SR):(int(b*SR) if b else None)].copy()
    if lp:x=sosfilt(sos('lowpass',lp),x,axis=0)
    o=int(fo*SR);x[-o:]*=np.linspace(1,0,o)[:,None];x[:96]*=np.linspace(0,1,96)[:,None];return x/(np.abs(x).max()+1e-9)
L=np.zeros((N,2));WLs=np.zeros((N,2))
def put(x,t,g,b=None):
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

def tok():t=tt(0.22);x=np.sin(2*np.pi*620*t)*np.exp(-t*28)+0.5*np.sin(2*np.pi*1240*t)*np.exp(-t*45)+0.2*np.sin(2*np.pi*2480*t)*np.exp(-t*70);return st(x*np.minimum(1,t*2000))
def trace(d=0.45):t=tt(d);n=sosfilt(sos('bandpass',[2500,9000]),rng.standard_normal(len(t)));am=0.6+0.4*np.abs(np.sin(2*np.pi*11*t));return st(n*am*np.sin(np.pi*t/d)**0.5)
def hit():t=tt(0.7);f=90*np.exp(-t*6)+38;x=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*5);n=sosfilt(sos('lowpass',2500),rng.standard_normal(len(t)))*np.exp(-t*30);return st(x+0.5*n)
TOK,TRC,HIT=tok(),trace(),hit()
REPL={'sb_signup':(16.0,18.0),'sb_second':(16.0,18.0),'sb_goldfish':(99,99)}
SOFTCLK=ld('ui-click',fo=0.08)
_put=put
def put(x,t,g,b=None):
    if x is POP and name in REPL and not (REPL[name][0]<=t<REPL[name][1]):
        if name=='sb_goldfish':x=SOFTCLK;g-=1
        else:x=TOK;g+=1
    if name=='sb_goldfish' and b is None:g+=3
    _put(x,t,g,b)
E={
'sb_fold':lambda:[wl(1.91,-24),put(POP,2.85,-27),put(WH,3.95,-31),put(CNT,6.37,-29),put(POP,8.37,-27),put(WH,9.38,-31),put(MOVE,11.33,-31),
  put(WH,12.28,-29),put(POP,12.64,-28),put(POP,13.5,-28),put(POP,14.2,-28),put(WH,15.36,-31),put(POP,15.75,-31),wl(17.44,-25),put(MOVE,18.35,-31),
  wl(19.55,-27),put(ACC,20.12,-25),put(POP,20.81,-31),put(CLK,21.2,-21)],
'sb_signup':lambda:[wl(0.84,-25),put(CHOP,1.03,-21),put(MOVE,2.55,-31),put(WH,3.25,-31),put(CNT,4.0,-29),put(POP,6.84,-28),put(POP,7.14,-31),
  put(WH,8.56,-31),put(POP,8.94,-31),wl(10.04,-24),put(POP,11.04,-31),put(WH,11.32,-31),wl(11.56,-26),put(CLK1,12.11,-25),
  put(POP,13.16,-28),put(POP,15.2,-30),put(CHOP,15.55,-26),wl(15.95,-28),
  put(POP,16.23,-30),put(POP,17.19,-28),put(ACC,17.5,-28),put(WH,18.33,-31),put(CLK1,19.05,-22),put(ACC,19.08,-23),put(POP,20.24,-31),put(CLK,20.65,-21)],
'sb_second':lambda:[put(POP,0.05,-28),put(CHOP,0.95,-24),put(POP,2.2,-28),put(CLK1,3.46,-24),put(ACC,3.86,-28),put(WH,4.27,-31),put(MOVE,4.59,-31),
  put(POP,5.0,-33),put(POP,7.98,-26),wl(8.18,-27),put(POP,10.6,-29),put(WH,11.42,-31),put(POP,11.65,-30),wl(13.6,-27),put(POP,13.84,-28),
  put(POP,15.05,-31),wl(16.2,-27),put(POP,16.46,-28),put(CLK1,16.76,-31),put(CLK1,17.52,-31),put(WH,18.48,-31),put(CLK1,19.27,-22),put(ACC,19.3,-24),
  put(POP,20.43,-31),put(CLK,20.9,-21)],
'sb_goldfish':lambda:[wl(0.02,-27),put(POP,1.25,-27),put(POP,3.7,-27),put(POP,4.1,-32),put(WH,4.56,-31),put(CHOP,5.05,-20),put(POP,6.01,-28),
  put(MOVE,6.1,-32),put(POP,6.81,-30),put(POP,7.88,-30),put(POP,8.68,-30),put(MOVE,9.63,-30),put(WH,10.9,-31),put(POP,11.05,-31),put(POP,13.04,-32),put(ACC,14.1,-27),
  put(WH,15.33,-31),put(CHOP,15.92,-24),put(CHOP,16.42,-26),put(WH,17.42,-32),put(POP,18.91,-31),put(CLK,19.3,-21)]}
E[name]()
X={'sb_fold':lambda:[put(RUS,12.25,-29),put(RUS,14.14,-34)],
 'sb_signup':lambda:[put(THUD,1.04,-18),put(THUD,2.6,-30),put(RUS,10.04,-27),put(COIN,19.05,-25)],
 'sb_second':lambda:[put(THUD,0.1,-29),put(THUD,2.25,-29),put(COIN,3.46,-26),put(COIN,19.27,-25),put(RUS,11.65,-32)],
 'sb_goldfish':lambda:[*[put(BUB,t,-34) for t in (0.35,1.0,1.9,2.6,3.3)],put(THUD,5.06,-20),put(RUS,6.81,-33),put(SNIP,15.75,-24),put(SNIP,16.0,-25),put(RUS,17.5,-32)]}
X[name]()
Y={'sb_fold':lambda:[put(WH,4.14,-34),put(WH,5.8,-35),put(WH,11.33,-33),put(WH,12.44,-34),put(WH,16.94,-33),put(WH,18.45,-34)],
 'sb_signup':lambda:[put(WH,11.32,-27),wl(11.56,-22),put(CHOP,11.75,-27),*[put(CLK1,13.61+i*0.1,-30) for i in range(6)],put(ACC,14.25,-24)],
 'sb_second':lambda:[],
 'sb_goldfish':lambda:[put(HIT,5.05,-14),*[put(TRC,a,-27) for a in (6.511,7.579,8.38)],*[put(WH,a,-31) for a in (6.01,6.611,7.679,8.53)],*[put(CLK,17.63+i*0.18,-23) for i in range(5)]]}
Y[name]()
sr,v=wavfile.read(f'../vo4/{VO}_vo.wav');v=v.astype(float)/32768;v=v/np.abs(v).max()*10**(-1/20)*10**(-6/20)
vs=np.zeros(N);vs[:min(N,len(v))]=v[:N]
# duck: smoothed voice envelope -> up to 50% gain reduction on SFX (not on the low-whoosh stem)
env=np.abs(vs);a=np.exp(-1/(0.01*SR));r=np.exp(-1/(0.25*SR));e=np.zeros(N);p=0
for i in range(0,N,48):
    m=env[i:i+48].max();p=m if m>p else p*r**48;e[i:i+48]=p
g=1-0.5*np.clip(e/0.08,0,1)
mix=np.stack([vs,vs],1)+L*g[:,None]+WLs
wavfile.write(f'out/{name}_vo_mix.wav',SR,(np.clip(mix,-1,1)*32767).astype(np.int16));print(name,'peak',np.abs(mix).max())
