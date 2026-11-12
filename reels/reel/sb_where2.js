// ===== Reel F v2: "Where they ask it", told with objects (storybook). Timed to the script; re-time to the VO later =====
K={q1:0.2,q2:1.3,q3:2.6,dive:3.9,faq:5.0,burst:6.6,land:7.8,s2:8.4,chart:8.6,tape:10.0,htag:11.0,s3:13.6,fog:13.6,blow:14.3,date:14.8,ret:16.0,s4:17.4,tap:18.8,cta:20.0};const END=21.6;
CAP=[[0.2,'Does it fit?'],[1.3,'When will it come?'],[2.6,'Can I send it back?'],[3.8,''],[4.1,'Your answers?'],[5.0,'Buried in an FAQ?'],[6.3,''],[6.6,'Move them next to the Buy button.'],[8.4,''],
 [8.6,'Not just a size chart.'],[10.0,'A decision.'],[11.0,'“Runs true to size. Between sizes? Go up.”'],[13.6,'Not “fast shipping.”'],[14.8,'“Arrives by Friday.”'],[16.0,'And one line on returns.'],
 [17.6,'Answer the question…'],[18.8,'…where they ask it.'],[20.0,''],[21.3,'']];
const SFX=[[0.2,'bub',-24],[0.5,'soft',-30],[1.3,'bub',-24],[1.6,'soft',-30],[2.6,'bub',-24],[2.9,'soft',-30],[3.9,'wl',-19],[4.4,'rustle',-29],[5.0,'thud',-22],[6.6,'hit',-24],[6.75,'whoosh',-23],[7.8,'accept',-22],
 [8.4,'whoosh',-26],[8.6,'rustle',-26],[10.0,'trace',-22],[10.4,'snip',-23],[11.0,'move',-25],[13.6,'rustle',-27],[14.3,'whoosh',-25],[14.8,'click1',-21],[15.2,'thud',-26],[16.0,'whoosh',-22],[16.7,'whoosh',-24],[17.1,'click',-22],
 [17.4,'whoosh',-26],[18.8,'click',-20],[19.0,'accept',-21],[20.0,'pop',-22]];
// ---------- props ----------
function bubbleQ(x,y,txt,k,{tick=0,s=40}={}){if(k<=0)return '';_cv.font=`${s}px HW`;const W=_cv.measureText(txt).width+56;
 let g=`<g transform="translate(${x},${y}) scale(${f2(clamp(k,0,1.15))})">${P(`M${-W/2},-46 L${W/2},-46 Q${W/2+14},-46 ${W/2+14},-32 L${W/2+14},20 Q${W/2+14},34 ${W/2},34 L22,34 L0,64 L-6,34 L${-W/2},34 Q${-W/2-14},34 ${-W/2-14},20 L${-W/2-14},-32 Q${-W/2-14},-46 ${-W/2},-46 Z`,CREAM,3.2)}${T(0,6,s,txt,{f:'HW',c:BROWN})}`;
 if(tick>0)g+=`<g transform="translate(${W/2+6},-40) scale(${f2(clamp(tick,0,1.15))})"><circle r="28" fill="${SAGE2}" stroke="${BROWN}" stroke-width="3.2"/><path d="M-12,0 L-3,10 L14,-10" stroke="${BROWN}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
 return g+'</g>';}
function kurta(x,y,s=1,size=''){return `<g transform="translate(${x},${y}) scale(${s})">`+P('M-70,-150 L-150,-110 L-185,10 L-130,30 L-110,-40 L-110,170 L110,170 L110,-40 L130,30 L185,10 L150,-110 L70,-150 Q0,-110 -70,-150 Z',SKY2,3.4,2)+
 P('M-30,-138 Q0,-120 30,-138 L18,-60 L-18,-60 Z','#9FC0DD',2.6)+[0,1,2].map(i=>`<circle cx="0" cy="${-118+i*20}" r="4" fill="${BROWN}"/>`).join('')+'</g>';}
// product card with the Buy button (world coords, centre x 540, top y 260)
function productCard(t,pressBuy=0){let s=contact(540,1205,360,18)+R(170,250,740,940,'#FFFFFF',26,3.6);
 s+=R(200,280,680,470,'#F2ECE2',12,2.6)+kurta(540,520,1.2);
 s+=T(210,820,46,'Linen Kurta',{f:'IB',c:BROWN,a:'start'})+T(870,820,44,'₹1,499',{f:'IB',c:CORAL,a:'end'});
 ['S','M','L','XL'].forEach((z,i)=>{s+=R(210+i*118,860,100,70,i===1?MUST:CREAM,10,2.8)+T(260+i*118,908,32,z,{f:'IB',c:BROWN});});
 const pz=1-0.06*pressBuy;s+=`<g transform="translate(540,1080) scale(${f2(pz)})">${R(-330,-60,660,120,BROWN,18,0)}${T(0,18,48,'Buy now',{f:'IB',c:'#fff'})}</g>`;
 return s;}
// soil cross-section under the page, with a buried chest
function soil(t){let s='';const bands=[['#B9D08F',1240,1300],['#C9A27A',1300,1700],['#B08559',1700,2150],['#946B47',2150,2650],['#7A5639',2650,4000]];
 bands.forEach(([c,a,b])=>{s+=P(`M-900,${a} Q-300,${a+18} 300,${a-6} T1500,${a+10} L1500,${b} L-900,${b} Z`,c,3.2);});
 s+=`<path d="M-900,1240 H1500" stroke="${BROWN}" stroke-width="4"/>`;for(let i=0;i<34;i++)s+=`<path d="M${-880+i*70},1240 l10,-26 l8,26" fill="#8FB46A" stroke="${BROWN}" stroke-width="2.5"/>`;
 [[200,1460,26],[860,1560,18],[420,1880,30],[760,2020,22],[120,2300,34],[900,2420,26],[300,2760,30],[820,2880,22]].forEach(([x,y,r])=>s+=`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*0.7}" fill="#D9C6A5" stroke="${BROWN}" stroke-width="3"/>`);
 s+=`<path d="M640,1250 Q660,1420 610,1600 Q570,1760 640,1900" stroke="#6B4A2E" stroke-width="7" fill="none"/><path d="M380,1250 Q360,1380 420,1500" stroke="#6B4A2E" stroke-width="5" fill="none"/>`;
 // a worm, wriggling
 const wx=230+Math.sin(t*2)*10;s+=`<path d="M${wx},2120 q20,-22 40,0 t40,0 t40,0" stroke="#E79A8C" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M${wx},2120 q20,-22 40,0 t40,0 t40,0" stroke="${BROWN}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".5"/>`;
 return s;}
function chest(t,x,y,open){const lid=-open*58;let s=contact(x,y+130,220,16);
 if(open>0){for(let i=0;i<9;i++){const a=-Math.PI/2+(i-4)*0.22,L=420*open;s+=`<path d="M${x},${y-40} L${f1(x+Math.cos(a-0.05)*L)},${f1(y-40+Math.sin(a-0.05)*L)} L${f1(x+Math.cos(a+0.05)*L)},${f1(y-40+Math.sin(a+0.05)*L)} Z" fill="#FFE7A0" opacity="${f2(0.45*open)}"/>`;}}
 s+=R(x-210,y-40,420,170,'#A86A3E',14,3.6,1)+`<path d="M${x-210},${y+30} H${x+210}" stroke="${BROWN}" stroke-width="3"/>`+R(x-150,y-40,30,170,'#D9A441',4,3)+R(x+120,y-40,30,170,'#D9A441',4,3);
 s+=`<g transform="rotate(${f1(lid)} ${x-210} ${y-40})">${P(`M${x-210},${y-40} Q${x-210},${y-140} ${x},${y-140} Q${x+210},${y-140} ${x+210},${y-40} Z`,'#B97B49',3.6)}${T(x,y-70,48,'FAQ',{f:'HW',c:CREAM})}</g>`;
 if(open<=0)s+=R(x-24,y-30,48,56,'#D9A441',6,3)+`<circle cx="${x}" cy="${y-6}" r="7" fill="${BROWN}"/>`;
 return s;}
function answerCard(x,y,rot,k,icon,txt){if(k<=0)return '';return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${f1(rot)}) scale(${f2(1.22*clamp(k,0,1.15))})">`+R(-150,-48,300,96,SAGE2,14,3.2)+icon+T(30,12,30,txt,{f:'HW',c:BROWN})+'</g>';}
const icTape=`<g transform="translate(-108,0)"><circle r="26" fill="${MUST}" stroke="${BROWN}" stroke-width="3"/><circle r="8" fill="${BROWN}"/></g>`;
const icCal=`<g transform="translate(-108,0)">${R(-26,-24,52,50,'#fff',6,3)}<rect x="-26" y="-24" width="52" height="14" fill="${CORAL}"/></g>`;
const icBoom=`<g transform="translate(-108,4)">${P('M-30,10 Q0,-40 30,10 L18,16 Q0,-16 -18,16 Z','#D9A441',3)}</g>`;
// ---------- scene 1 (0–8.4): hesitation, dive to the buried FAQ, answers burst back up ----------
function s1(t){let w=skyBg('#F3EBDD','#E9DCC6')+soil(t)+productCard(t);
 // hovering hand that hesitates on each question
 const hes=[K.q1,K.q2,K.q3].reduce((a,q)=>a+(t>=q?Math.exp(-(t-q)*5)*Math.sin((t-q)*18):0),0);const back=[K.q1,K.q2,K.q3].filter(q=>t>=q).length;
 if(t<K.dive+0.4)w+=handAt(600+hes*14,1020+back*24+Math.sin(t*3)*6,28,0.95);
 w+=bubbleQ(300,330,'Does it fit?',pop(t,K.q1)*(1-seg(t,K.dive,K.dive+0.3)),{s:52})+bubbleQ(760,250,'When will it come?',pop(t,K.q2)*(1-seg(t,K.dive,K.dive+0.3)),{s:46})+bubbleQ(520,140,'Can I send it back?',pop(t,K.q3)*(1-seg(t,K.dive,K.dive+0.3)),{s:46});
 const op=E.outC(seg(t,K.burst,K.burst+0.35));w+=chest(t,540,2780,op);
 if(t>=K.faq&&t<K.burst)w+=`<path d="M330,2640 L400,2640 M330,2640 L330,2710 M330,2640 L380,2690 M355,2640 Q352,2662 330,2665" stroke="#fff" stroke-width="2.5" fill="none" opacity=".8"/>`+tag(820,2560,'buried',MUST,pop(t,K.faq+0.1),6,46);
 // three answers fly up from the chest and pin beside Buy
 const dest=[[540,1250+0],[0,0],[0,0]];const C=[[icTape,'True to size',250,1300,-4],[icCal,'Arrives Friday',830,1300,3],[icBoom,'7-day returns',540,1420,-2]];
 C.forEach(([ic,txt,dx,dy,rot],i)=>{const a=K.burst+0.1+i*0.15,k=E.io(seg(t,a,K.land));if(t<a)return;const x=lerp(540+(i-1)*60,dx,k),y=lerp(2700,dy,k);
  w+=answerCard(x,y,rot*k+(1-k)*(i-1)*20,1,ic,txt);});
 // camera: product → dive into the soil → back up with the answers
 const dk=E.io(seg(t,K.dive,K.dive+1.0)),uk=E.io(seg(t,K.burst+0.2,K.land));let cy=lerp(820,2620,dk);cy=lerp(cy,1020,uk);const z=lerp(1,0.95,dk)*lerp(1,0.92,uk);
 if(t>=K.land)w+=ring(t,K.land,540,1170,420,300,CORAL,6);
 return cam(z,540,cy,w);}
// ---------- scene 2 (8.4–13.6): not just a size chart, a decision ----------
function s2(t){let w=skyBg('#EFE7D6','#E5D6BC');
 // hanger rail
 w+=`<path d="M60,330 H1020" stroke="${BROWN}" stroke-width="10" stroke-linecap="round"/>`+P('M540,330 q0,-40 30,-40 q30,0 26,30 l-26,30 L300,470 H780 L540,360','none',5);
 const sway=Math.sin(t*2.2)*2;w+=`<g transform="rotate(${f2(sway)} 540 330)">${kurta(540,640,1.9)}`;
 // measuring tape whips round the waist
 if(t>=K.tape){const k=E.outC(seg(t,K.tape,K.tape+0.45));w+=`<path d="M290,760 Q540,${f1(840-60*k)} ${f1(lerp(290,790,k))},760" stroke="${MUST}" stroke-width="30" fill="none" stroke-linecap="round"/>`;
  for(let i=0;i<14;i++){const u=i/13;if(u>k)break;const x=290+500*u,y=760+Math.sin(u*Math.PI)*(80-60*k)*1;w+=`<path d="M${f1(x)},${f1(y-10)} v14" stroke="${BROWN}" stroke-width="3"/>`;}}
 // hang tag swings in on a string with the decision line
 if(t>=K.htag){const k=E.outC(seg(t,K.htag,K.htag+0.5)),sw=Math.sin((t-K.htag)*6)*Math.exp(-(t-K.htag)*2)*14;
  w+=`<g transform="rotate(${f1(sw)} 760 520)"><path d="M760,520 L${f1(lerp(760,840,k))},${f1(lerp(520,1010,k))}" stroke="${BROWN}" stroke-width="3"/>`+
   `<g transform="translate(${f1(lerp(760,840,k))},${f1(lerp(520,1010,k))}) rotate(-6) scale(${f2(k)})">${P('M-40,0 L40,0 L210,0 L210,330 L-210,330 L-210,0 Z',CREAM,3.6)}<circle cx="0" cy="34" r="14" fill="#EFE7D6" stroke="${BROWN}" stroke-width="3"/>`+
   T(0,120,44,'Runs true',{f:'HW',c:BROWN,o:seg(t,K.htag+0.3,K.htag+0.6)})+T(0,172,44,'to size.',{f:'HW',c:BROWN,o:seg(t,K.htag+0.5,K.htag+0.8)})+
   T(0,238,36,'Between sizes?',{f:'HW',c:CORAL,o:seg(t,K.htag+0.8,K.htag+1.1)})+T(0,286,40,'Go up.',{f:'HW',c:CORAL,o:seg(t,K.htag+1.0,K.htag+1.3)})+'</g></g>';}
 w+='</g>';
 // the size chart: a wall of numbers that gets pushed aside
 if(t<K.tape+0.6){const k=pop(t,K.chart),out=E.inC(seg(t,K.tape,K.tape+0.5));let tb=R(-300,-230,600,460,'#fff',10,3.4);
  const rows=[['','S','M','L','XL'],['Chest','36','38','40','42'],['Waist','30','32','34','36'],['Length','27','28','29','30'],['Shoulder','15','16','17','18'],['Sleeve','8','8.5','9','9.5']];
  rows.forEach((r,i)=>r.forEach((c,j)=>tb+=T(-250+j*112+(j?40:0),-160+i*70,j?30:26,c,{f:i===0?'IB':'IM',c:BROWN,a:j?'middle':'start'})));
  w+=`<g transform="translate(${f1(540-out*900)},${f1(1250+out*200)}) rotate(${f1(-4-out*30)}) scale(${f2(clamp(k,0,1.1))})">${tb}</g>`;
  if(t>=K.chart+0.3&&t<K.tape)w+=tag(780,1500,'not just this',CREAM,pop(t,K.chart+0.3),5,40);}
 if(t>=K.tape+0.3)w+=tag(300,1480,'a decision',MUST,pop(t,K.tape+0.35),-4,52);
 return cam(1.0,540,900,w);}
// ---------- scene 3 (13.6–17.4): fog vs a real date; a boomerang for returns ----------
function s3(t){let w=skyBg('#EEF0EA','#E3E4D6')+P('M-1600,1500 L2800,1500 L2800,3000 L-1600,3000 Z',SAND,3.4,2);
 // calendar
 const flip=E.io(seg(t,K.date-0.25,K.date+0.15));w+=contact(540,1490,260,16)+R(300,640,480,560,'#fff',16,3.6)+`<rect x="300" y="640" width="480" height="120" rx="16" fill="${CORAL}" stroke="${BROWN}" stroke-width="3.6"/>`;
 w+=`<circle cx="400" cy="640" r="12" fill="${BROWN}"/><circle cx="680" cy="640" r="12" fill="${BROWN}"/>`+T(540,725,52,flip<0.5?'WEDNESDAY':'FRIDAY',{f:'IB',c:'#fff'})+T(540,1030,230,flip<0.5?'18':'20',{f:'MK',c:BROWN});
 if(flip>0&&flip<1)w+=`<path d="M300,760 L780,760 L780,${f1(760+440*(1-Math.abs(flip*2-1)))} L300,${f1(760+440*(1-Math.abs(flip*2-1)))} Z" fill="#F6F0E2" stroke="${BROWN}" stroke-width="3"/>`;
 // parcel drops onto Friday
 if(t>=K.date+0.2){const k=E.bk(seg(t,K.date+0.2,K.date+0.6));const y=lerp(-200,1290,clamp(k,0,1.05));w+=`<g transform="translate(560,${f1(y)}) rotate(-6)">${R(-90,-70,180,140,'#C9A06A',8,3.4,1)}<path d="M-90,-10 H90 M0,-70 V70" stroke="#8a6a3e" stroke-width="10"/></g>`;}
 // fog with "fast shipping!" that gets blown away
 const fo=1-E.io(seg(t,K.blow,K.blow+0.6));if(fo>0){const dx=E.inC(seg(t,K.blow,K.blow+0.6))*900;
  w+=`<g opacity="${f2(fo)}" transform="translate(${f1(dx)},0)">`+[[400,800,190],[620,760,220],[520,960,240],[340,1020,170],[720,1000,180]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#E8E6E0" stroke="${BROWN}" stroke-width="3"/>`).join('')+
   [[400,800,186],[620,760,216],[520,960,236],[340,1020,166],[720,1000,176]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#EDEBE5"/>`).join('')+T(540,900,58,'Fast shipping!',{f:'HW',c:'#8a7d70'})+T(540,980,40,'(…when?)',{f:'HW',c:'#a69b8e'})+'</g>';}
 // boomerang out and back for returns
 if(t>=K.ret){const k=seg(t,K.ret,K.ret+1.2);const a=k*Math.PI*2,x=860+Math.sin(a)*-560,y=1650-Math.sin(a/2)*380;
  if(k<1)w+=`<g transform="translate(${f1(x)},${f1(y)}) rotate(${f1(t*900)}) scale(1.6)">${P('M-60,20 Q0,-70 60,20 L38,30 Q0,-28 -38,30 Z','#D9A441',3.4)}</g>`;
  w+=handAt(900,1600,-150,1.2);if(k>=1)w+=`<g transform="translate(880,1560) rotate(-30) scale(1.6)">${P('M-60,20 Q0,-70 60,20 L38,30 Q0,-28 -38,30 Z','#D9A441',3.4)}</g>`;
  w+=answerCard(270,560,-4,pop(t,K.ret+1.1),icBoom,'7-day returns');}
 if(t>=K.date)w+=tag(820,560,'arrives by Friday',SAGE2,pop(t,K.date+0.6),5,42);
 return cam(1.0,540,1000,w);}
// ---------- scene 4 (17.4–21.6): answered where they ask, then Buy ----------
function s4(t){let w=skyBg('#F3EBDD','#E9DCC6');const pr=t>=K.tap&&t<K.tap+0.25?Math.sin(seg(t,K.tap,K.tap+0.25)*Math.PI):0;
 w+=productCard(t,pr);
 w+=answerCard(250,1300,-4,pop(t,K.s4+0.1),icTape,'True to size')+answerCard(830,1300,3,pop(t,K.s4+0.25),icCal,'Arrives Friday')+answerCard(540,1420,-2,pop(t,K.s4+0.4),icBoom,'7-day returns');
 w+=bubbleQ(300,330,'Does it fit?',1,{s:52,tick:pop(t,K.s4+0.3)})+bubbleQ(760,250,'When will it come?',1,{s:46,tick:pop(t,K.s4+0.55)})+bubbleQ(520,140,'Can I send it back?',1,{s:46,tick:pop(t,K.s4+0.8)});
 const hk=E.io(seg(t,K.tap-0.6,K.tap));w+=handAt(lerp(820,600,hk),lerp(1300,1080,hk)+pr*12,28,0.95);
 if(t>=K.cta){const k=pop(t,K.cta);w+=`<g transform="translate(540,1560) scale(${f2(clamp(k,0,1.15))})">`+R(-300,-58,600,116,CORAL,58,4)+T(0,18,50,'Comment STORE',{f:'HW',c:CREAM})+'</g>';}
 w+=T(540,1850,22,'Tip shared by Shopify merchants, Aug 2026 · no numbers published · demo store',{f:'IM',c:'#8a7a6a'});
 return cam(z4(t),540,880,w);}
const z4=t=>1.0+0.02*seg(t,K.s4,END);
S=[0,K.s2,K.s3,K.s4];SC=[s1,s2,s3,s4];
