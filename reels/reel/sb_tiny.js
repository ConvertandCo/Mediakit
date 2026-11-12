// ===== Reel A: "Tiny or huge?" (product photos), storybook. Timed to the script; re-time to the VO later =====
K={a:0.2,tiny:0.6,huge:1.4,s2:2.8,tell:3.0,stat:4.8,judge:6.0,no1:8.0,no2:8.5,no3:9.0,s3:10.2,hand:10.4,ring:11.2,s4:12.0,p1:13.4,p2:14.6,p3:15.6,s5:17.0,every:17.2,cta:19.4};const END=21.6;
CAP=[[0.2,'Is this jar tiny…'],[1.4,'…or huge?'],[2.6,''],[3.0,'Your shopper can’t tell either.'],[4.8,'42% of shoppers'],[6.0,'try to judge size from the photos.'],[8.0,'No hand, no scale, no clue.'],[9.9,''],
 [10.3,'So put it in a hand.'],[12.0,'Then add three more:'],[13.4,'a texture close-up,'],[14.6,'one in use,'],[15.6,'and the back label.'],[17.2,'Every photo should answer a question.'],[19.4,'Comment STORE, and we’ll check yours.'],[21.3,'']];
const SFX=[[0.6,'move',-24],[1.4,'wl',-19],[1.45,'thud',-24],[3.0,'pop',-25],[4.8,'pop',-21],[6.0,'trace',-27],[8.0,'click',-23],[8.5,'click',-23],[9.0,'click',-23],[10.2,'whoosh',-25],[10.75,'soft',-25],[11.2,'accept',-21],
 [12.0,'move',-25],[13.4,'click1',-22],[14.6,'click1',-22],[15.6,'click1',-22],[17.0,'whoosh',-25],[17.3,'pop',-25],[19.4,'pop',-22],[19.7,'accept',-22]];
// ---------- props ----------
function photoCard(x,y,w,h,inner,{rot=0,id='pc'}={}){return `<g transform="rotate(${rot} ${x+w/2} ${y+h/2})">`+contact(x+w/2,y+h+18,w*0.5,16)+R(x,y,w,h,'#FFFFFF',14,3.6)+
 `<clipPath id="${id}"><rect x="${x+18}" y="${y+18}" width="${w-36}" height="${h-36}" rx="6"/></clipPath><g clip-path="url(#${id})"><rect x="${x+18}" y="${y+18}" width="${w-36}" height="${h-36}" fill="#F7F3EC"/>${inner}</g>`+R(x+18,y+18,w-36,h-36,'none',6,2.4)+'</g>';}
function polaroid(x,y,rot,k,inner,label,id){if(k<=0)return '';const s=clamp(k,0,1.15);return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${f2(s)})">`+contact(0,232,170,14)+R(-190,-210,380,440,'#FFFFFF',8,3.4)+
 `<clipPath id="${id}"><rect x="-166" y="-186" width="332" height="320"/></clipPath><g clip-path="url(#${id})"><rect x="-166" y="-186" width="332" height="320" fill="#F7F3EC"/>${inner}</g>`+R(-166,-186,332,320,'none',2,2.2)+
 T(0,190,40,label,{f:'HW',c:BROWN})+`<circle cx="0" cy="-196" r="13" fill="${CORAL}" stroke="${BROWN}" stroke-width="3"/></g>`;}
function bigNum(x,y,txt,k){if(k<=0)return '';return `<g transform="translate(${x},${y}) scale(${f2(clamp(k,0,1.15))}) rotate(-3)">`+R(-220,-110,440,200,MUST,26,4)+T(0,48,150,txt,{f:'MK',c:BROWN})+'</g>';}
function cross(x,y,k){if(k<=0)return '';const a=24*clamp(k);return `<path d="M${x-a},${y-a} L${x+a},${y+a} M${x+a},${y-a} L${x-a},${y+a}" stroke="${CORAL}" stroke-width="8" stroke-linecap="round"/>`;}
// texture close-up: swirled nut butter
function texture(){let s=`<rect x="-200" y="-200" width="400" height="400" fill="#C98B55"/>`;for(let i=0;i<9;i++){const r=30+i*22;s+=`<path d="M${-r},${f1(-40+i*6)} q${r*0.6},${-r*0.5} ${r*1.2},0 q${r*0.5},${r*0.5} ${r*0.9},${r*0.2}" stroke="${i%2?'#A86F3F':'#E2B07A'}" stroke-width="${i%2?9:6}" fill="none" stroke-linecap="round"/>`;}
 return s+`<ellipse cx="-60" cy="-90" rx="40" ry="14" fill="#fff" opacity=".35"/>`;}
function inUse(){return `<rect x="-200" y="-200" width="400" height="400" fill="#F0E6D2"/>`+P('M-120,-60 Q-130,-130 -60,-130 Q0,-150 60,-130 Q130,-130 120,-60 L110,90 L-110,90 Z','#E7C38C',3.4)+P('M-96,-60 Q-100,-108 -50,-108 Q0,-122 50,-108 Q100,-108 96,-60 L88,70 L-88,70 Z','#B9773F',2.6)+
 `<path d="M-70,-40 q40,-20 80,0 M-50,10 q50,-20 90,4" stroke="#8a522a" stroke-width="5" fill="none"/>`+P('M60,-170 L150,-20 L136,-12 L46,-162 Z','#C9CED6',3)+P('M150,-20 L178,30 L160,40 L136,-12 Z','#8a6a4e',3);}
function backLabel(){let s=`<rect x="-200" y="-200" width="400" height="400" fill="#C98B55"/>`+R(-130,-150,260,270,CREAM,6,3)+T(0,-112,28,'INGREDIENTS',{f:'IB',c:BROWN});
 s+=T(0,-80,22,'Peanuts, salt.',{f:'IM',c:BROWN})+`<path d="M-110,-58 H110" stroke="${BROWN}" stroke-width="2.5"/>`+T(-110,-30,20,'Net wt',{f:'IM',c:BROWN,a:'start'})+T(110,-30,20,'340 g',{f:'IB',c:BROWN,a:'end'});
 for(let i=0;i<4;i++)s+=`<path d="M-110,${f1(-4+i*30)} H110" stroke="${BROWN}" stroke-width="1.5" opacity=".5"/>`+R(-110,4+i*30,i%2?120:160,14,'#e5d9c2',3,0);return s;}
// ---------- scene 1: tiny… or huge? ----------
function s1(t){let w=skyBg('#F3EBDD','#E9DCC6');
 let js=1.7;const k1=E.io(seg(t,K.tiny,K.tiny+0.5)),k2=E.bk(seg(t,K.huge,K.huge+0.45));js=lerp(1.7,0.38,k1);if(t>=K.huge)js=lerp(0.38,5.2,clamp(k2,0,1.08));
 w+=photoCard(150,380,780,980,sbJar(540,870+(js-1.7)*20,js),{id:'pc1'});
 w+=tag(540,1500,'product photo',SKY2,pop(t,0.1),-2,34);
 if(t>=K.tiny&&t<K.huge)w+=tag(780,1130,'tiny?',CREAM,pop(t,K.tiny+0.2),6,40);
 if(t>=K.huge)w+=tag(300,470,'huge?',CREAM,pop(t,K.huge+0.25),-6,44);
 return cam(1.0+0.02*t,540,900,w);}
// ---------- scene 2: the shopper can't tell either; 42% ----------
function s2(t){let w=skyBg('#EEF0EA','#E3E4D6');w+=P('M-1600,1330 L2800,1330 L2800,3000 L-1600,3000 Z',SAND,3.4,2);
 const ph=`<rect width="348" height="728" fill="#fff"/><rect x="0" y="0" width="348" height="70" fill="#F1ECE4"/>`+T(174,46,22,'nutbutter.store',{f:'IM',c:'#8a7a6a'})+`<rect x="20" y="96" width="308" height="308" fill="#F7F3EC"/>`+sbJar(174,250,0.9)+
  T(24,452,26,'Peanut Butter',{f:'IB',c:BROWN,a:'start'})+T(24,492,24,'₹349',{f:'IB',c:CORAL,a:'start'})+R(24,520,300,64,BROWN,10,0)+T(174,562,24,'Add to cart',{f:'IB',c:'#fff'});
 w+=sbPhone(560,560,380,760,ph,{rot:4});
 w+=person(330,1330,LAV,t,{s:2.6,face:1,q:t>=K.tell});
 w+=bigNum(540,330,'42%',pop(t,K.stat,0.45));
 if(t>=K.judge)w+=T(540,500,40,'try to judge size from photos',{f:'HW',c:BROWN,o:seg(t,K.judge,K.judge+0.3)});
 [[K.no1,'No hand',250],[K.no2,'no scale',540],[K.no3,'no clue',830]].forEach(([a,txt,x],i)=>{w+=tag(x,1470,txt,i===2?CORAL:CREAM,pop(t,a),i%2?3:-3,38);});
 w+=T(540,1600,24,'Source: Baymard Institute, 2017 · demo product',{f:'IM',c:'#7a6a5a',o:seg(t,K.stat,K.stat+0.4)});
 return cam(1.0,540,960,w);}
// ---------- scene 3: put it in a hand ----------
function s3(t){let w=skyBg('#F3EBDD','#E9DCC6');const k=E.outC(seg(t,K.hand,K.hand+0.6));
 w+=photoCard(150,380,780,980,`<g transform="translate(-60,60)">${sbJar(600,860,1.7)}</g>`+handAt(lerp(900,592,k),lerp(-200,712,k),-28,1.25),{id:'pc3'});
 w+=ring(t,K.ring,620,860,300,330,CORAL,7);
 w+=tag(540,1500,'now you can tell',MUST,pop(t,K.ring+0.15),-2,40);
 return cam(1.0,540,900,w);}
// ---------- scene 4: three more photos ----------
function s4(t){let w=skyBg('#EFE7D6','#E5D6BC');
 const handPic=`<g transform="translate(-60,50) scale(.45)">${sbJar(0,0,1.7)}${handAt(-8,-148,-28,1.25)}</g>`;
 w+=polaroid(310,560,-4,E.outC(seg(t,K.s4,K.s4+0.4)),handPic,'size','pl0');
 w+=polaroid(770,600,5,pop(t,K.p1),texture(),'texture','pl1');
 w+=polaroid(320,1110,4,pop(t,K.p2),inUse(),'in use','pl2');
 w+=polaroid(770,1140,-5,pop(t,K.p3),backLabel(),'back label','pl3');
 return cam(1.0,540,900,w);}
// ---------- scene 5: every photo answers a question ----------
function s5(t){let w=skyBg('#F3EBDD','#EADAC0');
 const thumbs=[['size','#F7F3EC'],['texture','#C98B55'],['in use','#E7C38C'],['label','#F6F0E2']];
 let ph=`<rect width="448" height="868" fill="#fff"/><rect width="448" height="70" fill="#F1ECE4"/>`+T(224,46,22,'nutbutter.store',{f:'IM',c:'#8a7a6a'})+`<rect x="20" y="90" width="408" height="380" fill="#F7F3EC"/>`+`<g transform="translate(150,300) scale(.9)">${sbJar(0,0,1.4)}</g>`+handAt(310,192,-28,0.85);
 thumbs.forEach(([l,c],i)=>{const k=pop(t,K.s5+0.15+i*0.12);ph+=`<g transform="translate(${70+i*102},540) scale(${f2(clamp(k,0,1.1))})">${R(-44,-44,88,88,c,8,2.6)}</g>`;});
 ph+=T(24,640,30,'Peanut Butter',{f:'IB',c:BROWN,a:'start'})+T(24,684,26,'₹349 · 340 g',{f:'IB',c:CORAL,a:'start'})+R(24,720,400,70,BROWN,10,0)+T(224,766,26,'Add to cart',{f:'IB',c:'#fff'});
 w+=sbPhone(316,330,480,900,ph,{rot:-2});
 w+=tag(540,1330,'every photo answers a question',MUST,pop(t,K.every+0.1),-2,40);
 if(t>=K.cta){const k=pop(t,K.cta);w+=`<g transform="translate(540,1490) scale(${f2(clamp(k,0,1.15))})">`+R(-300,-58,600,116,CORAL,58,4)+T(0,18,50,'Comment STORE',{f:'HW',c:CREAM})+'</g>';}
 return cam(1.0,540,900,w);}
S=[0,K.s2,K.s3,K.s4,K.s5];SC=[s1,s2,s3,s4,s5];
