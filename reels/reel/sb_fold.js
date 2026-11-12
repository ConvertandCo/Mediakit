// ===== Reel 12 — Above the fold, storybook style (Reel 08 look, no houses). Timed to the script; retime to the VO later =====
K={h1:0.1,h2:1.5,pull:1.35,s2:3.2,yr:3.3,n57:5.5,fold:7.2,s3:8.6,q:8.8,banner:10.4,prod:11.8,price:12.8,reason:13.5,
 s4:15.0,open:15.2,scroll:16.9,see:18.0,fix:19.0,save:20.2,fill:20.7};const END=22.0;
CAP=[[0.1,'Most of your visitor’s attention'],[1.5,'never leaves the first screen.'],[3.0,''],
 [3.3,'In a 2018 eye-tracking study,'],[5.5,'57% of viewing time'],[7.2,'was above the fold.'],[8.4,''],
 [8.8,'So what’s on your first screen?'],[10.4,'A big banner…'],[11.8,'or the product,'],[12.8,'the price,'],[13.5,'and the reason to buy?'],[14.8,''],
 [15.2,'Open your store on your phone.'],[16.9,'If you have to scroll'],[18.0,'to see the price,'],[19.0,'fix that first.'],[20.2,'Save this.'],[21.0,'']];
// ---------- the store screen (sw wide), banner height bh, scrolled by sc ----------
function banner(w,bh){let s=R(0,0,w,bh,CORAL,16,3.4);
  if(bh>300){for(let i=0;i<7;i++){const a=i/7*Math.PI*2+0.3;s+=`<path d="M${w/2},${bh*0.42} L${f1(w/2+600*Math.cos(a))},${f1(bh*0.42+600*Math.sin(a))} L${f1(w/2+600*Math.cos(a+0.28))},${f1(bh*0.42+600*Math.sin(a+0.28))} Z" fill="#fff" opacity=".12"/>`;}
    s+=T(w/2,bh*0.3,58,'FESTIVE',{f:'HW',c:CREAM})+T(w/2,bh*0.3+108,112,'SALE',{f:'MK',c:CREAM})+T(w/2,bh*0.3+170,36,'up to 40% off',{f:'HW',c:CREAM})+R(w/2-90,bh*0.3+205,180,56,CREAM,28,3)+T(w/2,bh*0.3+244,30,'shop now',{f:'HW',c:BROWN});}
  else s+=T(w/2,bh/2+11,32,'FESTIVE SALE · 40% OFF',{f:'HW',c:CREAM,mw:w-30});
  return s;}
function store(w,bh,sc,{only=null,pp=0}={}){const y0=bh>0?96+bh+24:100;const on=k=>only===null?1:only[k];let s=`<g transform="translate(0,${f1(-sc)})">`;
  if(bh>0)s+=`<g transform="translate(14,96)">${banner(w-28,bh)}</g>`;
  const pk=(k,cx,cy,body)=>{const v=on(k);if(v<=0)return '';return `<g transform="translate(${cx},${cy}) scale(${f2(clamp(v,0,1.2))}) translate(${-cx},${-cy})">${body}</g>`;};
  s+=pk(0,w/2,y0+130,R(14,y0,w-28,260,'#F1E2C2',14,3,2)+sbJar(w/2,y0+140,1.35));
  s+=pk(0,120,y0+296,T(30,y0+306,36,'Classic nut butter',{f:'HW',c:BROWN,a:'start'}));
  s+=pk(1,80,y0+346,`<g transform="translate(30,${y0+364}) scale(${f2(1+0.25*pp)})">`+T(0,0,50,'₹899',{f:'IB',c:BROWN,a:'start'})+'</g>');
  s+=pk(2,w/2,y0+392,R(30,y0+376,186,40,SAGE2,20,2.8)+T(123,y0+404,25,'Ships in 24 hrs',{f:'HW',c:BROWN})+R(230,y0+376,150,40,MUST,20,2.8)+T(305,y0+404,25,'COD available',{f:'HW',c:BROWN}));
  s+=pk(0,w/2,y0+468,R(14,y0+434,w-28,66,BROWN,16,3)+T(w/2,y0+478,34,'Add to cart',{f:'HW',c:CREAM}));
  s+='</g>'+R(0,0,w,88,CREAM,0,0)+R(14,40,w-28,42,'#EADFC8',21,2.6)+T(w/2,69,21,'convertandco.com',{f:'IM',c:'#8a7a6a'});
  return s;}
// ---------- scene 1: everyone looks at the top; the rest of the page hangs below, unvisited ----------
function s1(t){let w=skyBg();
  // the long page hanging under the phone
  w+=P('M330,1020 L750,1020 L752,2380 Q700,2410 650,2385 Q600,2360 540,2390 Q480,2415 420,2385 Q370,2365 328,2392 Z','#EDE3CF',3.4,2);
  w+=`<g opacity=".6">`+T(370,1100,40,'Classic nut butter',{f:'HW',c:BROWN,a:'start'})+T(370,1170,52,'₹899',{f:'IB',c:BROWN,a:'start'})+P('M370,1240 q80,-6 170,0 M370,1290 q120,-6 260,0 M370,1340 q60,-5 120,0','none',3.4)+R(370,1390,150,40,SAGE2,20,2.6)+R(540,1390,150,40,MUST,20,2.6)+
     R(360,1490,360,70,'#8f7b6e',16,3)+T(540,1537,34,'Add to cart',{f:'HW',c:CREAM})+P('M370,1630 q90,-6 180,0 M370,1680 q120,-6 250,0 M370,1730 q70,-5 140,0','none',3.4)+stars(540,1830,5,22,52)+
     P('M370,1920 q100,-6 200,0 M370,1970 q120,-6 270,0 M370,2020 q80,-6 160,0','none',3.4)+'</g>';
  // cobweb on the cart button + spider bobbing on a thread
  w+=P('M720,1490 L640,1490 M720,1490 L720,1570 M720,1490 L660,1550 M650,1490 Q690,1525 720,1560 M680,1490 Q700,1510 720,1530','none',2.4);
  const sp=1800+Math.sin(t*2.4)*40;w+=P(`M600,1560 L600,${f1(sp)}`,'none',2)+`<g transform="translate(600,${f1(sp)})">`+P('M-14,-6 L-26,-16 M-14,2 L-28,4 M-14,8 L-24,20 M14,-6 L26,-16 M14,2 L28,4 M14,8 L24,20','none',2.6)+`<circle cx="0" cy="0" r="14" fill="${BROWN}"/><circle cx="-5" cy="-3" r="3" fill="#fff"/><circle cx="5" cy="-3" r="3" fill="#fff"/></g>`;
  w+=T(540,2230,46,'nobody scrolls down here',{f:'HW',c:'#8a7a6a',rot:-3});
  // the phone: everyone's eyes go here
  w+=sbPhone(300,170,480,860,store(448,560,0));
  // little visitors on two hills, sight-beams to the top of the screen
  w+=P('M-200,1330 Q60,1150 300,1260 L300,2600 L-200,2600 Z',SAGE2,3.4,2)+P('M780,1260 Q1020,1150 1280,1330 L1280,2600 L780,2600 Z',SAGE2,3.4,2);
  const V=[[150,1230,LAV],[240,1245,MUST],[860,1240,ROOF2],[950,1222,CORAL]];
  const bo=0.18+0.06*Math.sin(t*5);
  V.forEach(([x,y],i)=>{const tx=540+(i-1.5)*90,ty=430;w+=`<path d="M${x},${y-72} L${tx-60},${ty} L${tx+60},${ty+30} Z" fill="${MUST}" opacity="${f2(bo)}"/>`;});
  V.forEach(([x,y,c],i)=>{w+=person(x,y,c,t,{ph:i,s:1.25,face:x<540?1:-1});});
  // camera: hold on the screen, then tilt down the page through a fisheye
  const pk=E.io(seg(t,K.pull,K.pull+1.1));FISH=Math.sin(Math.PI*pk)*0.55;
  const z=lerp(1.05+0.04*seg(t,0,K.pull),0.6,pk),cy=lerp(820,1380,pk);
  w=cam(z,540,cy,w)+tag(740,190,'the first screen',MUST,pop(t,K.pull+0.9),-4,44);
  return w;}
// ---------- scene 2: where viewing time goes (two jars) ----------
function glass(x,y,w,h,lvl,c){let s=`<path d="M${x},${y} L${x},${y+h-30} Q${x},${y+h} ${x+30},${y+h} L${x+w-30},${y+h} Q${x+w},${y+h} ${x+w},${y+h-30} L${x+w},${y}" fill="#F1F5F8" opacity=".8"/>`;
  const sh=(h-12)*lvl;if(sh>1)s+=P(`M${x+6},${y+h-sh-6} Q${x+w/2},${y+h-sh-18} ${x+w-6},${y+h-sh-6} L${x+w-6},${y+h-30} Q${x+w-6},${y+h-6} ${x+w-30},${y+h-6} L${x+30},${y+h-6} Q${x+6},${y+h-6} ${x+6},${y+h-30} Z`,c,2.6,1);
  return s+P(`M${x},${y} L${x},${y+h-30} Q${x},${y+h} ${x+30},${y+h} L${x+w-30},${y+h} Q${x+w},${y+h} ${x+w},${y+h-30} L${x+w},${y}`,'none',3.6)+R(x-12,y-16,w+24,24,CREAM,8,3)+`<path d="M${x+22},${y+30} L${x+22},${y+h-60}" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".6"/>`;}
function cloud(x,y,s=1){return `<g transform="translate(${x},${y}) scale(${s})">`+P('M-170,40 Q-200,-20 -130,-40 Q-120,-110 -40,-100 Q0,-150 70,-110 Q150,-120 150,-50 Q210,-30 180,40 Z',CREAM,3.6)+'</g>';}
function s2(t){let w=skyBg('#F2E6CF','#E6D2B0');RACK=6*(1-E.outC(seg(t,K.s2,K.s2+0.5)));
  const g=E.io(seg(t,K.n57,K.n57+1.1)),gl=t>=K.fold;
  w+=contact(350,1460,190,18)+contact(730,1460,190,18);
  if(gl)w+=`<ellipse cx="350" cy="1180" rx="${f1(220+10*Math.sin(t*6))}" ry="320" fill="${MUST}" opacity=".28"/>`;
  w+=glass(220,920,260,540,0.57*g,CORAL)+glass(600,920,260,540,0.43*g,'#D8C7A5');
  // sand streams from the cloud of "viewing time"
  if(t>=K.n57-0.1&&t<K.n57+1.3){const o=seg(t,K.n57-0.1,K.n57+0.1)*(1-seg(t,K.n57+1.1,K.n57+1.3));
    for(const [x,wd] of [[350,22],[730,16]])w+=`<rect x="${x-wd/2}" y="660" width="${wd}" height="${f1(lerp(260,800,1-g*0.4))}" fill="${x<500?CORAL:'#CDB48A'}" opacity="${f2(o)}"/>`;}
  w+=cloud(540,640,1.25)+T(540,650,40,'viewing time',{f:'HW',c:BROWN});
  w+=tag(350,1530,'first screen',CREAM,pop(t,K.n57+0.5),-3,38)+tag(730,1530,'the rest',CREAM,pop(t,K.n57+0.65),3,38);
  if(t>=K.n57+0.3){const n=Math.round(57*g),m=Math.round(43*g);w+=T(350,860,96,n+'%',{f:'MK',c:CORAL})+T(730,860,72,m+'%',{f:'MK',c:'#9C8460'});}
  w+=tag(260,1060,'above the fold',MUST,pop(t,K.fold+0.15),-8,40);
  // the hand brings in the study card, then leaves
  const hin=E.outC(seg(t,K.yr,K.yr+0.5)),hout=E.inC(seg(t,K.n57-0.6,K.n57-0.1));
  const cx=540,cyc=lerp(-200,330,hin)-700*hout;
  w+=`<g transform="translate(${cx},${f1(cyc)}) rotate(-3)">${R(-250,-70,500,140,CREAM,12,3.4)}${T(0,-12,36,'Eye-tracking study, 2018',{f:'HW',c:BROWN})}${T(0,40,24,'Nielsen Norman Group',{f:'IM',c:'#8a7a6a'})}</g>`;
  if(hout<1)w+=handAt(cx+150,cyc-60-500*hout,-8,0.9);
  w+=T(540,1610,22,'NIELSEN NORMAN GROUP · EYE-TRACKING RESEARCH, 2018',{f:'IM',c:'#9C8C78',o:seg(t,K.n57,K.n57+0.4)});
  return cam(1+0.03*seg(t,K.s2,K.s3),540,960,w);}
// ---------- scene 3: the banner flies off; product, price, reason arrive ----------
function s3(t){let w=skyBg('#EEF0EC','#E3E6DF');
  w+=P('M-200,1320 L1280,1320 L1280,2200 L-200,2200 Z',SAND,3.4,2);
  const only=[pop(t,K.prod+0.35),pop(t,K.price),pop(t,K.reason)],pp=t>=K.price?Math.sin(seg(t,K.price,K.price+0.4)*Math.PI):0;
  w+=sbPhone(290,300,500,960,store(468,0,0,{only,pp}));
  // banner pinned over the screen
  const fk=seg(t,K.prod,K.prod+1.0);if(fk<1){const lift=E.io(seg(t,K.prod,K.prod+0.2)),fl=E.inC(seg(t,K.prod+0.1,K.prod+1.0)),fl2=Math.sin(t*14)*6*lift;
    w+=`<g transform="translate(${f1(306+700*fl)},${f1(380-1100*fl)}) rotate(${f1(-6*lift+50*fl+fl2)})"><g transform="skewY(${f2(fl2*0.4)})">${banner(468,560)}</g>`+
       (lift<0.5?`<circle cx="24" cy="18" r="11" fill="${MUST}" stroke="${BROWN}" stroke-width="3"/><circle cx="444" cy="18" r="11" fill="${MUST}" stroke="${BROWN}" stroke-width="3"/>`:'')+'</g>';}
  // the hand points at the banner, then flicks it away
  const hin=E.outC(seg(t,K.banner,K.banner+0.45)),hout=E.inC(seg(t,K.prod+0.15,K.prod+0.6)),flick=Math.sin(seg(t,K.prod-0.05,K.prod+0.2)*Math.PI);
  if(t>=K.banner&&hout<1)w+=handAt(lerp(1100,700,hin)+300*hout-40*flick,lerp(-100,600,hin)-600*hout,18+25*flick,0.95);
  if(t>=K.banner+0.35&&t<K.prod)w+=tag(840,250,'a big banner…?',CREAM,pop(t,K.banner+0.35),5,40);
  // labels for what belongs on the first screen
  w+=tag(150,470,'product',MUST,pop(t,K.prod+0.6),-6,40)+arrowTo(t,K.prod+0.8,170,510,380,540,40);
  w+=tag(140,820,'price',MUST,pop(t,K.price+0.1),5,44)+arrowTo(t,K.price+0.3,170,780,325,745,30);
  w+=tag(890,1010,'reason to buy',MUST,pop(t,K.reason+0.1),-3,40)+arrowTo(t,K.reason+0.3,880,970,700,800,40);
  // two little helpers cheer each time something lands
  const hop=k=>t>=k&&t<k+0.4?Math.sin(seg(t,k,k+0.4)*Math.PI)*30:0;
  w+=person(180,1400-hop(K.prod+0.35),LAV,t,{s:1.35,face:1})+person(900,1400-hop(K.price)-hop(K.reason),ROOF2,t,{ph:2,s:1.35,face:-1});
  w=tag(560,190,'What’s on your first screen?',CREAM,pop(t,K.q)*(1-seg(t,K.banner-0.1,K.banner+0.1)),-2,46)+w;
  return cam(1+0.03*seg(t,K.s3,K.s4),540,900,w);}
// ---------- scene 4: the phone test, a real thumb scroll ----------
function s4(t){let w=skyBg('#F3EBDD','#EADAC0');const up=E.io(seg(t,K.scroll+0.1,K.scroll+0.9)),back=E.io(seg(t,K.fix+0.05,K.fix+0.6));
  const sc=380*up*(1-back),bh=lerp(520,110,back),pp=t>=K.fix+0.5?Math.sin(seg(t,K.fix+0.5,K.fix+0.9)*Math.PI):0;
  const inn=E.bk(seg(t,K.s4,K.s4+0.5));
  w+=`<g transform="translate(0,${f1(lerp(900,0,clamp(inn,0,1.1)))})">`+sbPhone(330,260,420,820,store(388,bh,sc,{pp}),{rot:-2});
  // the fold, marked like a tear line
  const fk=E.io(seg(t,K.open+0.4,K.open+0.9));if(fk>0)w+=`<line x1="200" y1="1066" x2="${f1(lerp(200,880,fk))}" y2="1066" stroke="${CORAL}" stroke-width="6" stroke-dasharray="20 14" stroke-linecap="round"/>`+tag(930,1066,'fold',CREAM,pop(t,K.open+0.8),4,36);
  if(t>=K.see&&t<K.fix+0.05)w+=ring(t,K.see+0.05,440,886,130,64,CORAL,6);
  w+=tag(830,1240,'had to scroll?',CREAM,pop(t,K.see+0.25)*(1-seg(t,K.fix,K.fix+0.2)),4,40);
  if(t>=K.fix+0.6){const k=pop(t,K.fix+0.6);w+=`<g transform="translate(830,520) scale(${f2(k)})">`+star(0,0,46,MUST,3.4)+'</g>';}
  w+='</g>';
  // thumb comes up from below and swipes the page
  if(t>=K.scroll-0.5&&t<K.see+0.6){const a=E.outC(seg(t,K.scroll-0.5,K.scroll)),o=E.inC(seg(t,K.see+0.1,K.see+0.6)),k=E.io(seg(t,K.scroll+0.1,K.scroll+0.9));
    w+=handAt(600,lerp(lerp(1900,980,a),560,k)+900*o,180,0.95);}
  w+=tag(540,220,'The phone test',CREAM,pop(t,K.open)*(1-seg(t,K.fix-0.1,K.fix+0.1)),-2,48)+tag(560,220,'Fix that first.',MUST,pop(t,K.fix+0.1),-3,50);
  w+=sbSave(t,K.save,K.fill,540,1330);
  return cam(1.0,540,960,w);}
S=[0,K.s2,K.s3,K.s4];SC=[s1,s2,s3,s4];
