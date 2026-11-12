// ===== Reel F: "Where they ask it" (sizing, shipping, returns), storybook. Timed to the script; re-time to the VO later =====
K={q1:0.2,q2:1.3,q3:2.6,s2:3.9,ans:4.1,faq:5.0,s3:6.4,move:6.6,s4:8.4,chart:8.6,decision:10.0,size:11.0,ship:13.6,date:14.8,ret:16.0,s5:17.4,ansq:17.6,where:18.8,cta:20.0};const END=21.6;
CAP=[[0.2,'Does it fit?'],[1.3,'When will it come?'],[2.6,'Can I send it back?'],[3.8,''],[4.1,'Your answers?'],[5.0,'Buried in an FAQ?'],[6.3,''],[6.6,'Move them next to the Buy button.'],[8.4,''],
 [8.6,'Not just a size chart.'],[10.0,'A decision.'],[11.0,'“Runs true to size. Between sizes? Go up.”'],[13.6,'Not “fast shipping.”'],[14.8,'“Arrives by Friday.”'],[16.0,'And one line on returns.'],
 [17.6,'Answer the question…'],[18.8,'…where they ask it.'],[20.0,''],[21.3,'']];
const SFX=[[0.2,'bub',-24],[1.3,'bub',-24],[2.6,'bub',-24],[3.9,'whoosh',-25],[4.4,'move',-26],[5.0,'thud',-25],[6.6,'trace',-25],[6.9,'trace',-26],[7.2,'trace',-26],[7.6,'accept',-23],
 [8.6,'pop',-25],[10.0,'snip',-24],[11.0,'trace',-27],[13.6,'pop',-25],[14.0,'snip',-24],[14.8,'click1',-22],[16.0,'click1',-22],[17.4,'whoosh',-25],[17.7,'soft',-25],[17.95,'soft',-25],[18.2,'soft',-25],[18.8,'accept',-22],[20.0,'pop',-22]];
// ---------- props ----------
function bubbleQ(x,y,txt,k,{tick=0,s=40}={}){if(k<=0)return '';_cv.font=`${s}px HW`;const W=_cv.measureText(txt).width+56;
 let g=`<g transform="translate(${x},${y}) scale(${f2(clamp(k,0,1.15))})">${P(`M${-W/2},-46 L${W/2},-46 Q${W/2+14},-46 ${W/2+14},-32 L${W/2+14},20 Q${W/2+14},34 ${W/2},34 L22,34 L0,64 L-6,34 L${-W/2},34 Q${-W/2-14},34 ${-W/2-14},20 L${-W/2-14},-32 Q${-W/2-14},-46 ${-W/2},-46 Z`,CREAM,3.2)}${T(0,6,s,txt,{f:'HW',c:BROWN})}`;
 if(tick>0)g+=`<g transform="translate(${W/2+6},-40) scale(${f2(clamp(tick,0,1.15))})"><circle r="28" fill="${SAGE2}" stroke="${BROWN}" stroke-width="3.2"/><path d="M-12,0 L-3,10 L14,-10" stroke="${BROWN}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
 return g+'</g>';}
function kurta(x,y,s=1){return `<g transform="translate(${x},${y}) scale(${s})">`+P('M-70,-150 L-150,-110 L-185,10 L-130,30 L-110,-40 L-110,170 L110,170 L110,-40 L130,30 L185,10 L150,-110 L70,-150 Q0,-110 -70,-150 Z',SKY2,3.4,2)+
 P('M-30,-138 Q0,-120 30,-138 L18,-60 L-18,-60 Z','#9FC0DD',2.6)+[0,1,2].map(i=>`<circle cx="0" cy="${-118+i*20}" r="4" fill="${BROWN}"/>`).join('')+P('M-110,150 L110,150','none',2.4)+'</g>';}
// the long product page (world coords)
function longPage(t,{answersUp=0,dust=0}={}){let s=contact(540,2700,330,18)+R(200,280,680,2420,'#FFFFFF',22,3.6);
 s+=R(230,310,620,620,'#F2ECE2',10,2.4)+kurta(540,620,1.25);
 s+=T(240,1010,44,'Linen Kurta',{f:'IB',c:BROWN,a:'start'})+T(240,1064,38,'₹1,499',{f:'IB',c:CORAL,a:'start'});
 ['S','M','L','XL'].forEach((z,i)=>{s+=R(240+i*112,1100,96,70,i===1?MUST:CREAM,10,2.8)+T(288+i*112,1148,32,z,{f:'IB',c:BROWN});});
 s+=R(240,1200,600,96,BROWN,14,0)+T(540,1262,38,'Buy now',{f:'IB',c:'#fff'});
 for(let i=0;i<22;i++)s+=R(240,1350+i*40,i%5===4?380:600,16,'#EEE7DC',6,0);
 s+=T(240,2300,36,'FAQ',{f:'IB',c:BROWN,a:'start'});
 ['Sizing','Shipping','Returns'].forEach((l,i)=>{const y=2340+i*96;s+=R(240,y,600,80,'#F7F3EC',10,2.4)+T(266,y+52,32,l,{f:'IM',c:'#7a6a5a',a:'start'})+T(812,y+52,32,'›',{f:'IB',c:'#7a6a5a',a:'end'});});
 if(dust>0){for(let i=0;i<16;i++)s+=`<circle cx="${250+(i*137)%580}" cy="${2330+(i*71)%300}" r="${2+i%3}" fill="#9a8a78" opacity="${f2(dust*.5)}"/>`;
  s+=`<path d="M840,2320 L${f1(840-90*dust)},2320 M840,2320 L840,${f1(2320+90*dust)} M840,2320 L${f1(840-70*dust)},${f1(2320+70*dust)} M${f1(840-40*dust)},2320 Q${f1(840-30*dust)},${f1(2320+30*dust)} 840,${f1(2320+40*dust)}" stroke="#b5a898" stroke-width="2.5" fill="none"/>`;}
 return s;}
// ---------- scene 1: three questions ----------
function s1(t){let w=skyBg('#F3EBDD','#E9DCC6')+P('M-1600,1400 L2800,1400 L2800,3000 L-1600,3000 Z',SAND,3.4,2);
 w+=person(540,1400,ROSE,t,{s:4.2,face:0});
 w+=bubbleQ(290,820,'Does it fit?',pop(t,K.q1),{s:54})+bubbleQ(720,640,'When will it come?',pop(t,K.q2),{s:50})+bubbleQ(440,450,'Can I send it back?',pop(t,K.q3),{s:50});
 return cam(1.0,540,900,w);}
// ---------- scene 2: the answers are buried at the bottom ----------
function s2(t){let w=skyBg('#EEF0EA','#E3E4D6');const k=E.io(seg(t,K.s2+0.2,K.faq));
 w+=longPage(t,{dust:seg(t,K.faq,K.faq+0.6)});
 if(t>=K.faq)w+=tag(540,2200,'buried down here',MUST,pop(t,K.faq+0.1),-3,40);
 return cam(1.0,540,lerp(900,2250,k),w);}
// ---------- scene 3: move them up, next to Buy ----------
function s3(t){let w=skyBg('#EEF0EA','#E3E4D6');const z=lerp(0.62,0.62,0);w+=longPage(t,{});
 const lines=['Runs true to size','Arrives by Friday','7-day returns'];
 lines.forEach((l,i)=>{const a=K.move+i*0.3,k=E.io(seg(t,a,a+0.7));const sx=540,sy=2380+i*96,tx2=540,ty=1330+i*0;
  const x=lerp(sx,tx2+(i-1)*230,k),y=lerp(sy,1360-((i===1)?0:0),k)-Math.sin(k*Math.PI)*260;
  if(t>=a-0.05)w+=`<g transform="translate(${f1(x)},${f1(y)}) scale(${f2(lerp(1.7,1.5,k))})">${R(-110,-34,220,68,SAGE2,12,3)}${T(0,10,24,l,{f:'HW',c:BROWN})}</g>`;});
 w+=ring(t,K.move+1.0,540,1300,380,120,CORAL,6);
 return cam(0.62,540,1500,w);}
// ---------- scene 4: the buy box, rewritten ----------
function s4(t){let w=skyBg('#F3EBDD','#EADAC0');
 w+=contact(540,1700,380,18)+R(150,250,780,1440,'#FFFFFF',26,3.6);
 w+=R(180,280,330,330,'#F2ECE2',10,2.4)+kurta(345,450,0.75)+T(540,330,40,'Linen Kurta',{f:'IB',c:BROWN,a:'start'})+T(540,384,36,'₹1,499',{f:'IB',c:CORAL,a:'start'});
 ['S','M','L','XL'].forEach((z,i)=>{w+=R(540+i*92,420,80,60,i===1?MUST:CREAM,10,2.6)+T(580+i*92,462,28,z,{f:'IB',c:BROWN});});
 // size chart link (kept), then the decision line
 w+=T(540,540,28,'Size chart ›',{f:'IM',c:'#7a8fb5',a:'start'})+(t>=K.chart&&t<K.decision+0.6?tag(800,590,'not just this',CREAM,pop(t,K.chart),5,30):'');
 const row=(y,icon,txt,k,o=1)=>t<k?'':`<g opacity="${f2(o)}">${icon}${inkLine(t,k,`M260,${y+30} L${260+Math.min(600,txt.length*19)},${y+30}`,SAGE2,10,0.5)}${T(260,y+16,38,txt,{f:'HW',c:BROWN,a:'start',o:seg(t,k,k+0.4)})}</g>`;
 const ruler=y=>`<g transform="translate(205,${y})">${R(-22,-10,44,30,MUST,4,2.6)}<path d="M-12,-10 v10 M0,-10 v14 M12,-10 v10" stroke="${BROWN}" stroke-width="2.4"/></g>`;
 const truck=y=>`<g transform="translate(205,${y})">${R(-26,-12,32,28,SKY2,4,2.6)}${R(6,-4,20,20,SKY2,4,2.6)}<circle cx="-14" cy="18" r="6" fill="${BROWN}"/><circle cx="16" cy="18" r="6" fill="${BROWN}"/></g>`;
 const back=y=>`<g transform="translate(205,${y})"><path d="M14,-8 A16,16 0 1 0 16,12" stroke="${BROWN}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M8,-16 L16,-8 L6,-2" stroke="${BROWN}" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
 if(t>=K.decision){w+=tag(540,690,'a decision',MUST,pop(t,K.decision)*(1-seg(t,K.size-0.1,K.size+0.2)),-3,34);}
 w+=row(760,ruler(780),'Runs true to size. Between sizes? Go up.',t>=K.size?K.size:99);
 // fast shipping badge, crossed out, then the real date
 if(t>=K.ship){const k=pop(t,K.ship);const crossK=E.outC(seg(t,K.ship+0.4,K.ship+0.7));const fade=1-seg(t,K.date-0.1,K.date+0.2);
  if(fade>0)w+=`<g opacity="${f2(fade)}"><g transform="translate(400,900) scale(${f2(clamp(k,0,1.1))})">${R(-150,-36,300,72,'#F7F3EC',36,2.8)}${T(0,12,32,'Fast shipping!',{f:'IB',c:'#7a6a5a'})}</g>`+
   (crossK>0?`<path d="M240,${f1(900+30)} L${f1(240+320*crossK)},${f1(900-30*crossK)}" stroke="${CORAL}" stroke-width="8" stroke-linecap="round"/>`:'')+'</g>';}
 w+=row(880,truck(900),'Arrives by Friday',t>=K.date?K.date:99);
 w+=row(1000,back(1020),'Returns accepted within 7 days',t>=K.ret?K.ret:99);
 w+=R(200,1110,680,100,BROWN,14,0)+T(540,1176,40,'Buy now',{f:'IB',c:'#fff'});
 if(t>=K.ret+0.3)w+=arrowTo(t,K.ret+0.3,880,1240,760,1110,-40);
 for(let i=0;i<6;i++)w+=R(200,1290+i*44,i%3===2?400:680,16,'#EEE7DC',6,0);
 w+=T(540,1580,22,'Tip shared by Shopify merchants, Aug 2026 · no numbers published · demo store',{f:'IM',c:'#8a7a6a',mw:740});
 return cam(1.0,540,900,w);}
// ---------- scene 5: questions answered ----------
function s5(t){let w=skyBg('#F3EBDD','#E9DCC6')+P('M-1600,1400 L2800,1400 L2800,3000 L-1600,3000 Z',SAND,3.4,2);
 w+=person(540,1400,ROSE,t,{s:4.2,face:0});
 w+=bubbleQ(290,820,'Does it fit?',1,{s:54,tick:pop(t,K.s5+0.3)})+bubbleQ(720,640,'When will it come?',1,{s:50,tick:pop(t,K.s5+0.55)})+bubbleQ(440,450,'Can I send it back?',1,{s:50,tick:pop(t,K.s5+0.8)});
 if(t>=K.cta){const k=pop(t,K.cta);w+=`<g transform="translate(540,1580) scale(${f2(clamp(k,0,1.15))})">`+R(-300,-58,600,116,CORAL,58,4)+T(0,18,50,'Comment STORE',{f:'HW',c:CREAM})+'</g>';}
 return cam(1.0,540,900,w);}
S=[0,K.s2,K.s3,K.s4,K.s5];SC=[s1,s2,s3,s4,s5];
