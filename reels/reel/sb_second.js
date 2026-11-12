// ===== Reel 14 — Second order, storybook style (Reel 08 look). Timed to the script; retime to the VO later =====
K={o1:0.1,eat:0.9,o2:2.0,pig:2.9,s2:3.7,card:3.9,most:6.4,again:8.0,s3:9.6,ty:9.8,remind:11.7,low:13.0,wa:14.2,deliv:15.4,s4:16.6,win:16.8,save:18.0,fill:18.5};const END=19.5;
CAP=[[0.1,'Your first order'],[0.9,'pays for the ad.'],[2.0,'Your second order'],[2.9,'pays you.'],[3.6,''],
 [3.9,'In a survey of 100+ Indian D2C founders,'],[6.4,'most said only 10–30%'],[8.0,'of customers buy again.'],[9.4,''],
 [9.8,'So don’t stop at the thank-you page.'],[11.7,'Send a reorder reminder'],[13.0,'before it runs out.'],[14.2,'Follow up on WhatsApp'],[15.4,'after delivery.'],[16.4,''],
 [16.8,'Win the second order.'],[18.0,'Save this.'],[18.8,'']];
function bubble(x,y,txt,k,s=34,c=CREAM){if(k<=0)return '';_cv.font=`${s}px HW`;const W=_cv.measureText(txt).width+44;return `<g transform="translate(${x},${y}) scale(${f2(clamp(k,0,1.15))})">${P(`M${-W/2},-36 L${W/2},-36 L${W/2},20 L18,20 L0,44 L-8,20 L${-W/2},20 Z`,c,3)}${T(0,6,s,txt,{f:'HW',c:BROWN})}</g>`;}
function ground(y=1300,c=SAND){return P(`M-1600,${y} L2800,${y} L2800,${y+1400} L-1600,${y+1400} Z`,c,3.4,2);}
function parcel(x,y,s,label){return `<g transform="translate(${f1(x)},${f1(y)}) scale(${f2(s)})">`+contact(0,70,110,14)+P('M-100,-60 L100,-60 L100,70 L-100,70 Z','#D2A26C',3.4,1)+P('M-100,-60 L-70,-100 L130,-100 L100,-60 Z','#E2BA86',3.2)+P('M100,-60 L130,-100 L130,30 L100,70 Z','#B98552',3.2,1)+
  R(-24,-60,48,130,'#C39060',0,0)+R(-70,-10,140,54,CREAM,8,3)+T(0,28,34,label,{f:'HW',c:BROWN})+'</g>';}
function coin(x,y,s=1,r=0){return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${f1(r)}) scale(${f2(s)})"><circle r="36" fill="${MUST}" stroke="${BROWN}" stroke-width="3.4"/><circle r="26" fill="none" stroke="${BROWN}" stroke-width="2" opacity=".5"/>${T(0,13,36,'₹',{f:'IB',c:BROWN})}</g>`;}
function megaphone(x,y,open){const m=12+30*open;return `<g transform="translate(${x},${y})">`+contact(0,150,150,16)+P(`M-120,-40 L60,-${100+m} L60,${100+m} L-120,40 Z`,CORAL,3.6,1)+R(-170,-50,60,100,'#C25E45',10,3.4)+P(`M60,-${100+m} Q90,0 60,${100+m}`,'#F28F72',3.4)+
  `<ellipse cx="66" cy="0" rx="${f1(14+10*open)}" ry="${f1(60+m*0.8)}" fill="#7a3a2a" stroke="${BROWN}" stroke-width="3"/>`+P('M-150,50 L-150,150 M-120,50 L-110,150','none',4)+tag(-40,-180,'Ads',CREAM,1,-4,44)+'</g>';}
function piggy(x,y,s=1,happy=0){return `<g transform="translate(${x},${y}) scale(${s})">`+contact(0,120,150,16)+P('M-150,0 Q-150,-110 -20,-110 Q120,-110 150,-20 Q170,10 150,50 Q130,110 30,110 L-90,110 Q-150,90 -150,0 Z',ROSE,3.6,2)+
  R(-60,-120,90,18,BROWN,9,2)+P('M150,-10 Q195,-5 190,30 Q186,55 150,45 Z',ROSE,3.4)+`<circle cx="170" cy="20" r="5" fill="${BROWN}"/><circle cx="182" cy="20" r="5" fill="${BROWN}"/><circle cx="100" cy="-40" r="7" fill="${BROWN}"/>`+
  P('M-110,110 L-110,150 M-40,110 L-40,150 M30,110 L30,150 M90,110 L90,150','none',10)+P('M20,-100 L50,-150 L80,-96 Z',ROSE,3)+(happy?P('M80,-10 Q100,8 120,-6','none',4):'')+tag(0,40,'You',CREAM,1,3,40)+'</g>';}
// ---------- scene 1: order 1 feeds the ads, order 2 feeds you ----------
function s1(t){let w=skyBg('#F3EBDD','#E8DAC2')+ground(1340);
  w+=megaphone(260,1050,t>=K.eat&&t<K.eat+0.6?Math.abs(Math.sin((t-K.eat)*12)):0.2)+piggy(780,1150,1,t>=K.pig+0.4);
  w+=`<g transform="translate(0,0)">`+parcel(330,1500,pop(t,K.o1)*0.95,'Order 1')+parcel(760,1500,pop(t,K.o2)*0.95,'Order 2')+'</g>';
  // coin 1 into the megaphone, coin 2 into the piggy bank
  if(t>=K.o1+0.3&&t<K.eat+0.15){const k=E.io(seg(t,K.o1+0.3,K.eat+0.1));w+=coin(lerp(330,330,k),lerp(1400,1050,k)-Math.sin(Math.PI*k)*250,1.1,k*400);}
  if(t>=K.o2+0.3&&t<K.pig+0.3){const k=E.io(seg(t,K.o2+0.3,K.pig+0.25));w+=coin(lerp(760,760,k),lerp(1400,1010,k)-Math.sin(Math.PI*k)*280,1.1,k*400);}
  if(t>=K.eat+0.1)w+=bubble(420,800,'nom.',pop(t,K.eat+0.1)*(1-seg(t,K.o2,K.o2+0.2)),40);
  if(t>=K.pig+0.4)w+=`<g transform="translate(860,880) scale(${f2(pop(t,K.pig+0.4))})">`+P('M0,30 C-50,-10 -40,-60 0,-30 C40,-60 50,-10 0,30 Z',CORAL,3.4)+'</g>';
  const pan=E.io(seg(t,K.o2-0.4,K.o2+0.3));return cam(1.35,lerp(330,760,pan),1240,w);}
// ---------- scene 2: ten customers, only a few come back ----------
function s2(t){let w=skyBg('#F2E6CF','#E6D2B0')+ground(1320);RACK=6*(1-E.outC(seg(t,K.s2,K.s2+0.5)));
  const C=[LAV,ROOF2,MUST,SAGE2,CORAL];
  for(let i=0;i<10;i++){const x=108+i*96,p=pop(t,K.card+0.4+i*0.08,0.3);if(p<=0)continue;
    const back=i===2||i===6||i===8,solid=i===2;const leave=E.inC(seg(t,K.most+0.2+i*0.05,K.most+1.2+i*0.05));
    let dx=0,face=0,walk=false,o=1;
    if(!back){dx=leave*1100;face=leave>0?1:0;walk=leave>0&&leave<1;}
    else{const r=E.io(seg(t,K.again,K.again+0.6));dx=0;o=solid?1:lerp(1,0.4,r);}
    w+=`<g transform="translate(${f1(x+dx)},1320) scale(${f2(clamp(p,0,1.15))})">`+person(0,0,C[i%5],t,{s:1.8,ph:i,face,walk,o})+(t<K.most+0.2?`<g transform="translate(28,-62) scale(.42)">${parcel(0,0,1,'')}</g>`:'')+'</g>';
    if(back&&t>=K.again)w+=bubble(x,1080,solid?'again!':'again?',pop(t,K.again+0.2+(i-2)*0.06),28);}
  if(t>=K.again+0.3){w+=T(540,1470,42,'1 to 3 out of every 10',{f:'HW',c:'#8a7a6a',o:seg(t,K.again+0.3,K.again+0.6)});}
  w+=`<g transform="translate(540,780) rotate(-3) scale(${f2(pop(t,K.most))})">${R(-190,-95,380,190,CREAM,14,3.6)}${T(0,10,110,'10–30%',{f:'MK',c:CORAL,mw:340})}${T(0,64,30,'buy again',{f:'HW',c:BROWN})}</g>`;
  const hin=E.outC(seg(t,K.card,K.card+0.5)),hout=E.inC(seg(t,K.most-0.5,K.most-0.05));const cy=lerp(-200,420,hin)-800*hout;
  w+=`<g transform="translate(540,${f1(cy)}) rotate(2)">${R(-280,-70,560,140,CREAM,12,3.4)}${T(0,-10,36,'Survey · 100+ Indian D2C founders',{f:'HW',c:BROWN,mw:520})}${T(0,40,22,'DSG Consumer Partners · Meta · Viralmint',{f:'IM',c:'#8a7a6a'})}</g>`;
  if(hout<1)w+=handAt(700,cy-50-400*hout,-10,0.85);
  w+=T(540,1610,22,'DSG CONSUMER PARTNERS · META · VIRALMINT SURVEY (DEC 2025)',{f:'IM',c:'#9C8C78',o:seg(t,K.most,K.most+0.4)});
  return cam(1+0.03*seg(t,K.s2,K.s3),540,960,w);}
// ---------- scene 3: the road after the thank-you page ----------
function s3(t){let w=skyBg('#EEF0EC','#E1E5DC')+ground(1360);
  w+=`<path d="M-600,1420 Q600,1390 2800,1440" stroke="${BROWN}" stroke-width="3" stroke-dasharray="14 18" fill="none" opacity=".4"/>`;
  // stop 1: the thank-you page is not the end
  w+=`<g transform="translate(300,1360) scale(${f2(pop(t,K.ty))})">`+P('M-6,0 L-6,-300 L6,-300 L6,0 Z',BROWN,2)+R(-150,-470,300,170,CREAM,12,3.4)+T(0,-410,36,'Thank you',{f:'HW',c:BROWN})+T(0,-360,26,'for your order!',{f:'HW',c:'#8a7a6a'})+'</g>';
  if(t>=K.ty+0.6)w+=tag(300,760,'not the end →',MUST,pop(t,K.ty+0.6),-5,40);
  // stop 2: the jar runs low, a reminder arrives
  {const sh=t>=K.low&&t<K.low+0.6?Math.sin(t*40)*4:0;w+=sbJar(1000+sh,1290,1.6)+tag(1000,1060,'running low…',CREAM,pop(t,K.low),4,36);}
  if(t>=K.remind){const k=pop(t,K.remind);const inner=T(160,70,26,'Day 25',{f:'HW',c:'#8a7a6a'})+R(14,100,292,170,'#fff',18,2.6)+T(160,150,30,'Running low?',{f:'HW',c:BROWN})+T(160,192,22,'Reorder in one tap',{f:'IM',c:'#8a7a6a'})+R(60,212,200,44,CORAL,22,2.6)+T(160,243,26,'Reorder',{f:'HW',c:CREAM});
    w+=`<g transform="translate(1360,1000) scale(${f2(k)}) rotate(4)"><g transform="translate(-176,-330)">${sbPhone(0,0,352,640,inner)}</g></g>`;}
  // stop 3: a friendly follow-up after delivery
  if(t>=K.wa){const k=pop(t,K.wa);const inner=R(0,0,320,70,'#6FA36A',0,0)+T(160,46,26,'Your store',{f:'HW',c:CREAM})+bubble(170,170,'Delivered! How is it?',pop(t,K.wa+0.3),22,'#D9F0CF')+bubble(150,290,'Any questions? Just reply.',pop(t,K.deliv),20,'#D9F0CF');
    w+=`<g transform="translate(1960,1000) scale(${f2(k)}) rotate(-3)"><g transform="translate(-176,-330)">${sbPhone(0,0,352,640,inner)}</g></g>`+parcel(1700,1380,0.7*pop(t,K.wa+0.1),'Delivered');}
  // a shopper walks the road
  const pan=t<K.remind-0.3?0:t<K.wa-0.3?E.io(seg(t,K.remind-0.3,K.remind+0.3)):1+E.io(seg(t,K.wa-0.3,K.wa+0.3));
  const cx=[420,1180,1840],X=lerp(lerp(cx[0],cx[1],clamp(pan)),cx[2],clamp(pan-1));
  w+=person(X-120,1360,LAV,t,{s:1.6,face:1,walk:pan%1>0.02&&pan%1<0.98});
  return cam(1.25,X,1100,w);}
// ---------- scene 4: win the second order ----------
function s4(t){let w=skyBg('#F3EBDD','#E8DAC2')+ground(1340);
  w+=piggy(620,1140,1.15,1)+parcel(240,1420,pop(t,K.s4)*0.85,'Order 2');
  if(t>=K.win&&t<K.win+0.8){const k=E.io(seg(t,K.win,K.win+0.6));w+=coin(lerp(240,600,k),lerp(1340,990,k)-Math.sin(Math.PI*k)*300,1.15,k*500);}
  if(t>=K.win+0.6){const k=E.outC(seg(t,K.win+0.6,K.win+1.1));for(let i=0;i<8;i++){const a=-Math.PI+i/7*Math.PI,r1=200+40*k,r2=200+120*k;w+=`<path d="M${f1(620+r1*Math.cos(a))},${f1(1000+r1*Math.sin(a))} L${f1(620+r2*Math.cos(a))},${f1(1000+r2*Math.sin(a))}" stroke="${CORAL}" stroke-width="7" stroke-linecap="round" opacity="${f2(1-seg(t,K.win+0.9,K.win+1.3))}"/>`;}}
  w+=tag(540,420,'Win the second order.',MUST,pop(t,K.win),-3,62);
  w+=sbSave(t,K.save,K.fill,540,1560);
  return cam(1.0,540,960,w);}
S=[0,K.s2,K.s3,K.s4];SC=[s1,s2,s3,s4];
