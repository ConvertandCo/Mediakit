// ===== Reel 13 — The sign-up wall, storybook style (Reel 08 look, no houses). Timed to the script; retime to the VO later =====
K={a:0.1,arrive:0.9,acct:1.0,left:2.4,s2:3.3,n18:3.5,abandon:5.0,said:6.4,forced:7.3,s3:9.0,came:9.2,form:10.5,s4:12.0,guest:12.2,otp:13.7,pw:14.9,offer:16.2,paid:17.2,
 s5:18.6,pay:18.8,payClick:19.35,save:20.0,fill:20.5};const END=21.6;
CAP=[[0.1,'You asked them'],[1.0,'to create an account.'],[2.4,'They left.'],[3.1,''],[3.5,'18% of shoppers'],[5.0,'who abandoned checkout'],[6.4,'said it was because'],[7.3,'they were forced to sign up.'],[8.8,''],
 [9.2,'They came to buy…'],[10.5,'not to fill in a form.'],[11.8,''],[12.2,'Turn on guest checkout.'],[13.7,'Use a phone OTP'],[14.9,'instead of a password.'],[16.2,'Offer the account'],[17.2,'after they’ve paid.'],[18.4,''],
 [18.8,'Let them pay first.'],[20.0,'Save this.'],[20.8,'']];
// ---------- props ----------
function basket(x,y,s=1){return `<g transform="translate(${f1(x)},${f1(y)}) scale(${f2(s)})">`+P('M-34,-30 Q0,-80 34,-30','none',4)+sbJar(4,-34,0.42)+P('M-44,-30 L44,-30 L34,14 L-34,14 Z','#C99A63',3.2,1)+P('M-38,-14 L38,-14','none',2.4)+'</g>';}
function gate(x,y,open,label,{lc=CREAM}={}){const a=-82*E.io(clamp(open));let s=contact(x,y+8,170,14);
  s+=R(x-150,y-250,34,250,LAVD,8,3.4,1)+R(x+116,y-250,34,250,LAVD,8,3.4,1);
  s+=`<g transform="rotate(${f1(a)} ${x-133} ${y-130})">`+R(x-133,y-150,250,34,CREAM,14,3.2);for(let i=0;i<5;i++)s+=P(`M${x-110+i*50},${y-150} l22,0 l-16,34 l-22,0 Z`,CORAL,2.2);s+=`</g>`;
  s+=`<circle cx="${x-133}" cy="${y-130}" r="12" fill="${MUST}" stroke="${BROWN}" stroke-width="3"/>`;
  _cv.font='40px HW';const W=_cv.measureText(label).width+60;s+=P(`M${x-60},${y-250} L${x-60},${y-300} M${x+60},${y-250} L${x+60},${y-300}`,'none',3.4)+R(x-W/2,y-372,W,76,lc,12,3.4)+T(x,y-320,40,label,{f:'HW',c:BROWN});
  return s;}
function wall(x,y){let s=contact(x,y+8,230,16);const W=420,H=520,bw=84,bh=44;
  for(let r=0;r<H/bh;r++)for(let c=-1;c<W/bw+1;c++){const bx=x-W/2+c*bw+(r%2?bw/2:0),by=y-H+r*bh;const x1=Math.max(bx,x-W/2),x2=Math.min(bx+bw,x+W/2);if(x2-x1<8)continue;
    s+=R(x1,by,x2-x1,bh,(r*7+c*3)%4===0?'#D9694F':CORAL,4,2.6,(r+c)%3===0?1:0);}
  s+=`<g transform="rotate(-3 ${x} ${y-300})">`+R(x-150,y-420,300,250,CREAM,10,3.4)+T(x,y-372,30,'Create an account',{f:'HW',c:BROWN});
  ['Name','Email','Password','Confirm'].forEach((l,i)=>{s+=T(x-126,y-330+i*40,20,l,{f:'IM',c:'#8a7a6a',a:'start'})+R(x-20,y-350+i*40,140,28,'#fff',6,2.2);});
  return s+`</g><circle cx="${x}" cy="${y-424}" r="10" fill="${MUST}" stroke="${BROWN}" stroke-width="3"/>`;}
function puff(t,t0,x,y,n=6){if(t<t0||t>t0+0.7)return '';const k=E.outC(seg(t,t0,t0+0.7));let s='';for(let i=0;i<n;i++){const a=Math.PI+i/(n-1)*Math.PI;s+=`<circle cx="${f1(x+Math.cos(a)*220*k*(i%2?1:0.8))}" cy="${f1(y+Math.sin(a)*60*k)}" r="${f1(28*(1-k)+8)}" fill="${CREAM}" stroke="${BROWN}" stroke-width="2.6" opacity="${f2(1-k)}"/>`;}return s;}
function bubble(x,y,txt,k,s=34){if(k<=0)return '';_cv.font=`${s}px HW`;const W=_cv.measureText(txt).width+44;return `<g transform="translate(${x},${y}) scale(${f2(clamp(k,0,1.15))})">${P(`M${-W/2},-36 L${W/2},-36 L${W/2},20 L18,20 L0,44 L-8,20 L${-W/2},20 Z`,CREAM,3)}${T(0,6,s,txt,{f:'HW',c:BROWN})}</g>`;}
function ground(y=1300,c=SAND){return P(`M-1600,${y} L2800,${y} L2800,${y+1400} L-1600,${y+1400} Z`,c,3.4,2);}
// ---------- scene 1: walking to checkout, a wall drops ----------
function s1(t){let w=skyBg('#F0EEE6','#E8E0CF')+ground(1300);
  w+=P('M-400,1360 Q300,1330 1500,1380','none',3,0)+`<path d="M-400,1380 Q300,1350 1500,1400" stroke="${BROWN}" stroke-width="3" stroke-dasharray="14 18" fill="none" opacity=".4"/>`;
  const dk=seg(t,K.acct,K.acct+0.22),wy=lerp(-700,1300,E.inC(dk));
  w+=gate(680,1300,0,'Checkout');
  if(t>=K.acct)w+=wall(680,wy)+puff(t,K.acct+0.22,680,1300,7);
  // the shopper
  let sx=lerp(140,470,E.io(seg(t,K.a,K.arrive))),face=1,walk=t<K.arrive;
  if(t>=K.left+0.2){sx=lerp(470,-160,E.inC(seg(t,K.left+0.2,K.left+1.1)));face=-1;walk=true;}
  if(t<K.left+0.1)w+=basket(sx+50,1255,1.3);else w+=basket(500,1290,1.3)+bubble(500,1170,'…',pop(t,K.left+0.6),30);
  w+=person(sx,1300,LAV,t,{s:1.7,face,walk,q:t>=K.acct+0.35&&t<K.left});
  FISH=Math.sin(Math.PI*seg(t,K.acct+0.18,K.acct+0.55))*0.45;const sh=t>K.acct+0.2&&t<K.acct+0.5?Math.sin(t*90)*7*(1-seg(t,K.acct+0.2,K.acct+0.5)):0;
  return cam(1.5,560+sh,1130,w);}
// ---------- scene 2: 100 who left checkout; 18 because of the sign-up wall ----------
const PICK=[3,11,17,24,28,35,40,46,52,57,63,66,71,78,82,89,94,98];const COLS=[LAV,ROOF2,MUST,SAGE2];
function s2(t){let w=skyBg('#F2E6CF','#E6D2B0');RACK=6*(1-E.outC(seg(t,K.s2,K.s2+0.5)));
  const gx=180,gy=800,sx=80,sy=76;let cnt=0;
  for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,x=gx+c*sx,y=gy+r*sy,d=(r+c)/18,p=pop(t,K.n18-0.3+d*0.5,0.3);if(p<=0)continue;
    const j=PICK.indexOf(i),on=j>=0&&t>=K.n18+0.5+j*0.07;if(on)cnt++;
    const go=0,wl=j>=0?pop(t,K.forced+j*0.04,0.3):0;
    w+=`<g transform="translate(${f1(x+go*900)},${f1(y)}) scale(${f2(clamp(p,0,1.15)*0.62)})">`+person(0,0,on?CORAL:COLS[(r+c)%4],t,{ph:i,face:on?1:0})+'</g>';
    if(wl>0)w+=`<g transform="translate(${x+18},${y+4}) scale(${f2(wl)})">`+R(-2,-34,26,36,'#D9694F',3,2.4)+P('M-2,-22 L24,-22 M-2,-10 L24,-10 M10,-34 L10,-22 M4,-22 L4,-10 M16,-10 L16,2','none',1.8)+'</g>';}
  w+=tag(540,720,'100 shoppers who abandoned checkout',CREAM,pop(t,K.abandon),-2,36);
  // the hand holds up the count
  const hin=E.outC(seg(t,K.n18+0.2,K.n18+0.7));const cy=lerp(-300,470,hin);
  w+=`<g transform="translate(540,${f1(cy)}) rotate(-4)">${R(-160,-90,320,180,CREAM,14,3.6)}${T(0,40,120,cnt+'%',{f:'MK',c:CORAL})}</g>`+handAt(650,cy-60,-10,0.85);
  w+=bubble(560,1640-90,'“The site wanted me to create an account”',pop(t,K.forced+0.3),30);
  w+=T(540,1610,22,'BAYMARD INSTITUTE · CHECKOUT ABANDONMENT SURVEY',{f:'IM',c:'#9C8C78',o:seg(t,K.n18,K.n18+0.4)*(1-seg(t,K.forced+0.2,K.forced+0.4))});
  return cam(1+0.03*seg(t,K.s2,K.s3),540,960,w);}
// ---------- scene 3: came to buy, buried in a form ----------
function s3(t){let w=skyBg('#EEF0EC','#E1E5DC')+ground(1350);
  const sk=Math.sin(t*3)*0.6;w+=basket(650,1250,2.0)+person(470,1350,LAV,t,{s:2.8,face:1});
  if(t>=K.came+0.2&&t<K.form+0.4){const k=pop(t,K.came+0.2);w+=`<g transform="translate(560,860) scale(${f2(k)})">`+P('M0,30 C-50,-10 -40,-60 0,-30 C40,-60 50,-10 0,30 Z',CORAL,3.4)+'</g>';}
  w+=tag(300,560,'came to buy',MUST,pop(t,K.came+0.1)*(1-seg(t,K.form,K.form+0.2)),-5,52);
  if(t>=K.form){const u=E.io(seg(t,K.form,K.form+1.0)),bot=lerp(-60,1520,u);
    w+=P(`M240,-200 L840,-200 L840,${f1(bot)} L240,${f1(bot)} Z`,'#FBF7EE',3.4)+T(540,90,52,'Sign up',{f:'HW',c:BROWN});
    ['Full name','Email','Password','Confirm password','Date of birth','Phone number','Address','Pincode','Security question','Favourite colour'].forEach((l,i)=>{const y=180+i*130;if(y+70<bot)w+=T(280,y,26,l,{f:'IM',c:'#8a7a6a',a:'start'})+R(280,y+14,520,56,'#fff',10,2.6);});
    w+=`<ellipse cx="540" cy="${f1(bot)}" rx="310" ry="34" fill="#EDE3CF" stroke="${BROWN}" stroke-width="3.4"/>`;
    if(t>=K.form+1.0){const k=pop(t,K.form+1.0);w+=`<g transform="translate(905,1250) scale(${f2(k)})"><circle cx="0" cy="0" r="40" fill="${PEACH}" stroke="${BROWN}" stroke-width="3.4"/><circle cx="-12" cy="-4" r="4" fill="${BROWN}"/><circle cx="10" cy="-4" r="4" fill="${BROWN}"/>`+P('M-12,20 Q0,10 12,20','none',3)+P('M28,-30 Q40,-12 30,-4 Q20,-12 28,-30 Z',SKY2,2.4)+'</g>';}
    FISH=Math.sin(Math.PI*seg(t,K.form+0.7,K.form+1.2))*0.3;}
  return cam(1.0+0.04*seg(t,K.s3,K.s4),540,960+sk,w);}
// ---------- scene 4: three fixes along the path ----------
function s4(t){let w=skyBg('#F0EEE6','#E8E0CF')+ground(1300);
  w+=`<path d="M-1200,1380 Q600,1350 2400,1400" stroke="${BROWN}" stroke-width="3" stroke-dasharray="14 18" fill="none" opacity=".4"/>`;
  const open=seg(t,K.guest+0.55,K.guest+0.95);
  w+=gate(540,1300,open,t>=K.guest+0.3?'Guest checkout':'Checkout',{lc:t>=K.guest+0.3?MUST:CREAM});
  const sink=E.inC(seg(t,K.guest,K.guest+0.45));if(sink<1)w+=`<g transform="translate(0,${f1(sink*560)})"><clipPath id="wc"><rect x="0" y="0" width="1100" height="${f1(1300-sink*560)}"/></clipPath><g clip-path="url(#wc)">${wall(540,1300)}</g></g>`;
  w+=puff(t,K.guest+0.3,540,1300,6);
  // 2) phone OTP pops above the gate; the password padlock falls away
  if(t>=K.otp&&t<K.offer){const k=pop(t,K.otp)*(1-E.inC(seg(t,K.offer-0.45,K.offer)));let inner=T(110,80,30,'Enter code',{f:'HW',c:BROWN})+T(110,118,20,'sent to +91 98•••••21',{f:'IM',c:'#8a7a6a'});
    for(let i=0;i<6;i++){const on=t>=K.otp+0.45+i*0.1;inner+=R(14+i*34,150,28,40,on?'#fff':'#EFE6D2',6,2.4)+(on?T(28+i*34,180,26,'482917'[i],{f:'IB',c:BROWN}):'');}
    w+=`<g transform="translate(830,620) scale(${f2(k)}) rotate(4)"><g transform="translate(-125,-210)">${sbPhone(0,0,250,420,inner)}</g></g>`;}
  if(t>=K.pw){const k=pop(t,K.pw),fall=E.inC(seg(t,K.pw+0.75,K.pw+1.3));
    w+=`<g transform="translate(250,${f1(620+fall*2400)}) rotate(${f1(-8+60*fall)}) scale(${f2(k)})">`+P('M-36,-20 L-36,-60 Q-36,-96 0,-96 Q36,-96 36,-60 L36,-20','none',10)+R(-60,-24,120,100,MUST,14,3.4)+`<circle cx="0" cy="18" r="10" fill="${BROWN}"/>`+
       R(40,40,150,48,CREAM,10,3)+T(115,72,28,'Password',{f:'HW',c:BROWN})+'</g>';
    if(fall<0.2)w+=inkLine(t,K.pw+0.35,'M160,520 L340,720',CORAL,10,0.15)+inkLine(t,K.pw+0.45,'M340,520 L160,720',CORAL,10,0.15);}
  // the shopper goes through, then gets the account offer after paying
  let sx=330,walk=false;if(t>=K.guest+0.9){const a=E.io(seg(t,K.guest+0.9,K.guest+1.8));sx=lerp(330,700,a);walk=a>0&&a<1;}
  if(t>=K.offer+0.1){const a=E.io(seg(t,K.offer+0.1,K.paid));sx=lerp(700,1080,a);walk=a>0&&a<1;}
  w+=basket(sx+56,1255,1.3)+person(sx,1300,LAV,t,{s:1.7,face:1,walk});
  // 3) after payment: a little desk offers to save details
  if(t>=K.offer){const k=pop(t,K.offer);w+=`<g transform="translate(1330,1300) scale(${f2(k)}) translate(-1330,-1300)">`+person(1400,1210,ROOF2,t,{s:1.6,face:-1})+R(1240,1150,300,150,TAN,10,3.4,1)+tag(1390,1010,'Order placed ✓',SAGE2,1,3,34)+'</g>';}
  if(t>=K.paid){const k=pop(t,K.paid);w+=`<g transform="translate(1210,1110) rotate(-6) scale(${f2(k)})">${R(-130,-56,260,112,CREAM,12,3.4)}${T(0,-12,26,'Save your details?',{f:'HW',c:BROWN})}${R(-90,6,180,40,CORAL,20,2.6)}${T(0,34,24,'Create account',{f:'HW',c:CREAM})}</g>`;
    if(t>=K.paid+0.3)w+=`<g transform="translate(${f1(sx)},1040) scale(${f2(pop(t,K.paid+0.3))})">`+P('M0,24 C-40,-8 -32,-48 0,-24 C32,-48 40,-8 0,24 Z',CORAL,3)+'</g>';}
  
  const pan=E.io(seg(t,K.offer-0.3,K.offer+0.4)),out=E.io(seg(t,K.paid+0.6,K.paid+1.2));
  const cx=lerp(lerp(600,1150,pan),860,out),z=lerp(1.25,0.9,out);
  const n=t>=K.offer?3:t>=K.otp?2:1,nk=pop(t,n===1?K.guest:n===2?K.otp:K.offer);
  return cam(z,cx,lerp(1050,1080,out),w)+`<g transform="translate(130,300) scale(${f2(nk)})"><circle r="52" fill="${MUST}" stroke="${BROWN}" stroke-width="3.6"/>${T(0,24,70,String(n),{f:'MK',c:BROWN})}</g>`;}
// ---------- scene 5: let them pay first ----------
function s5(t){let w=skyBg('#F3EBDD','#EADAC0')+ground(1320);const paid=t>=K.payClick;
  // a big till box
  w+=contact(700,1330,200,16)+R(520,980,360,340,LAVD,22,3.6,1)+R(560,1020,280,120,CREAM,12,3.2)+T(700,1100,paid?54:48,paid?'Paid ✓':'Pay ₹899',{f:paid?'HW':'IB',c:paid?'#4E7D3A':BROWN})+R(640,1190,120,22,BROWN,11,2);
  // shopper tosses a coin in
  w+=person(300,1320,LAV,t,{s:2.2,face:1});
  if(t>=K.pay&&t<K.payClick+0.05){const k=seg(t,K.pay+0.1,K.payClick),x=lerp(360,700,k),y=lerp(1050,1200,k)-Math.sin(Math.PI*k)*280;w+=`<g transform="translate(${f1(x)},${f1(y)}) rotate(${f1(k*540)})"><circle r="34" fill="${MUST}" stroke="${BROWN}" stroke-width="3.4"/>${T(0,12,34,'₹',{f:'IB',c:BROWN})}</g>`;}
  if(paid){const k=E.outC(seg(t,K.payClick,K.payClick+0.5));for(let i=0;i<9;i++){const a=-Math.PI*0.95+i/8*Math.PI*0.9,r1=200+80*k,r2=200+170*k;
    w+=`<path d="M${f1(700+r1*Math.cos(a))},${f1(1050+r1*Math.sin(a))} L${f1(700+r2*Math.cos(a))},${f1(1050+r2*Math.sin(a))}" stroke="${CORAL}" stroke-width="7" stroke-linecap="round" opacity="${f2(1-seg(t,K.payClick+0.35,K.payClick+0.7))}"/>`;}
    w+=`<g transform="translate(300,940) scale(${f2(pop(t,K.payClick+0.2))})">`+P('M0,30 C-50,-10 -40,-60 0,-30 C40,-60 50,-10 0,30 Z',CORAL,3.4)+'</g>';}
  w+=tag(540,330,'Let them pay first.',MUST,pop(t,K.pay),-3,64);
  if(t>=K.payClick+0.5)w+=T(700,1420,36,'then offer the account →',{f:'HW',c:'#8a7a6a',o:seg(t,K.payClick+0.5,K.payClick+0.8)});
  w+=sbSave(t,K.save,K.fill,540,1530);
  return cam(1.0,540,960,w);}
S=[0,K.s2,K.s3,K.s4,K.s5];SC=[s1,s2,s3,s4,s5];
