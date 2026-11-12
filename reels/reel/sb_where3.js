// ===== Reel F v3: "Where they ask it", told on one phone screen (storybook). Timed to the script; re-time to the VO later =====
K={q1:0.2,q2:1.3,q3:2.6,scroll:3.9,faq:5.0,up:6.5,land:7.8,zoom:8.4,chart:8.6,dec:10.0,size:11.0,ship:13.6,date:14.8,ret:16.0,out:17.4,tap:18.8,cta:20.0};const END=21.6;
CAP=[[0.2,'Does it fit?'],[1.3,'When will it come?'],[2.6,'Can I send it back?'],[3.8,''],[4.1,'Your answers?'],[5.0,'Buried in an FAQ?'],[6.3,''],[6.6,'Move them next to the Buy button.'],[8.4,''],
 [8.6,'Not just a size chart.'],[10.0,'A decision.'],[11.0,'“Runs true to size. Between sizes? Go up.”'],[13.6,'Not “fast shipping.”'],[14.8,'“Arrives by Friday.”'],[16.0,'And one line on returns.'],
 [17.6,'Answer the question…'],[18.8,'…where they ask it.'],[20.0,''],[21.3,'']];
const SFX=[[0.2,'bub',-24],[1.3,'bub',-24],[2.6,'bub',-24],[3.9,'move',-24],[5.0,'thud',-25],[6.5,'whoosh',-24],[6.7,'trace',-26],[7.0,'trace',-27],[7.3,'trace',-27],[7.8,'accept',-22],
 [8.4,'wl',-21],[8.6,'pop',-25],[10.0,'pop',-24],[11.0,'trace',-25],[13.6,'pop',-25],[14.0,'snip',-23],[14.8,'click1',-21],[16.0,'click1',-21],[17.4,'wl',-22],[17.7,'soft',-25],[17.95,'soft',-25],[18.2,'soft',-25],[18.8,'click',-20],[19.0,'accept',-21],[20.0,'pop',-22]];
function bubbleQ(x,y,txt,k,{tick=0,s=40}={}){if(k<=0)return '';_cv.font=`${s}px HW`;const W=_cv.measureText(txt).width+56;
 let g=`<g transform="translate(${x},${y}) scale(${f2(clamp(k,0,1.15))})">${P(`M${-W/2},-46 L${W/2},-46 Q${W/2+14},-46 ${W/2+14},-32 L${W/2+14},20 Q${W/2+14},34 ${W/2},34 L22,34 L0,64 L-6,34 L${-W/2},34 Q${-W/2-14},34 ${-W/2-14},20 L${-W/2-14},-32 Q${-W/2-14},-46 ${-W/2},-46 Z`,CREAM,3.2)}${T(0,6,s,txt,{f:'HW',c:BROWN})}`;
 if(tick>0)g+=`<g transform="translate(${W/2+6},-40) scale(${f2(clamp(tick,0,1.15))})"><circle r="28" fill="${SAGE2}" stroke="${BROWN}" stroke-width="3.2"/><path d="M-12,0 L-3,10 L14,-10" stroke="${BROWN}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
 return g+'</g>';}
function kurta(x,y,s=1){return `<g transform="translate(${x},${y}) scale(${s})">`+P('M-70,-150 L-150,-110 L-185,10 L-130,30 L-110,-40 L-110,170 L110,170 L110,-40 L130,30 L185,10 L150,-110 L70,-150 Q0,-110 -70,-150 Z',SKY2,3.4,2)+
 P('M-30,-138 Q0,-120 30,-138 L18,-60 L-18,-60 Z','#9FC0DD',2.6)+[0,1,2].map(i=>`<circle cx="0" cy="${-118+i*20}" r="4" fill="${BROWN}"/>`).join('')+'</g>';}
// phone + screen geometry (world coords)
const PX=300,PY=330,PW=480,PH=1000,SX=318,SY=348,SW=444,SH=964,ROWH=86,GAP=10;
const icTape=(x,y)=>`<g transform="translate(${x},${y})"><circle r="16" fill="${MUST}" stroke="${BROWN}" stroke-width="2.6"/><circle r="5" fill="${BROWN}"/></g>`;
const icCal=(x,y)=>`<g transform="translate(${x},${y})">${R(-16,-15,32,30,'#fff',4,2.6)}<rect x="-16" y="-15" width="32" height="9" fill="${CORAL}"/></g>`;
const icBack=(x,y)=>`<g transform="translate(${x},${y})"><path d="M9,-6 A11,11 0 1 0 11,8" stroke="${BROWN}" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M4,-12 L10,-6 L3,-1" stroke="${BROWN}" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>`;
// the product page, in page coords (0..SW wide); up = how far the answers have moved up (0..1)
function pageBody(t,up,{showChart=true}={}){let s=`<rect x="0" y="0" width="${SW}" height="1900" fill="#fff"/>`;
 s+=`<rect x="0" y="0" width="${SW}" height="56" fill="#F1ECE4"/>`+R(20,10,SW-40,36,'#fff',18,1.6)+T(SW/2,35,17,'linenhouse.store',{f:'IM',c:'#8a7a6a'});
 s+=`<rect x="16" y="68" width="${SW-32}" height="330" rx="10" fill="#F2ECE2"/>`+kurta(SW/2,236,0.85);
 s+=T(18,446,30,'Linen Kurta',{f:'IB',c:BROWN,a:'start'})+T(SW-18,446,28,'₹1,499',{f:'IB',c:CORAL,a:'end'});
 ['S','M','L','XL'].forEach((z,i)=>{s+=R(18+i*82,466,70,46,i===1?MUST:CREAM,8,2.2)+T(53+i*82,498,22,z,{f:'IB',c:BROWN});});
 if(showChart)s+=T(SW-18,500,18,'Size chart ›',{f:'IM',c:'#7a8fb5',a:'end'});
 const blockH=up*(3*ROWH+2*GAP+20),by=536+blockH;
 s+=R(18,by,SW-36,70,BROWN,12,0)+T(SW/2,by+46,30,'Buy now',{f:'IB',c:'#fff'});
 for(let i=0;i<14;i++)s+=R(18,by+100+i*34,i%4===3?260:SW-36,12,'#EEE7DC',5,0);
 const fy=by+100+14*34+40;s+=T(18,fy,24,'FAQ',{f:'IB',c:BROWN,a:'start'});
 ['Sizing','Shipping','Returns'].forEach((l,i)=>{const y=fy+16+i*64;s+=R(18,y,SW-36,52,'#F7F3EC',8,1.8)+T(36,y+34,22,l,{f:'IM',c:'#7a6a5a',a:'start'})+T(SW-36,y+34,24,'›',{f:'IB',c:'#7a6a5a',a:'end'});});
 return {s,fy,by};}
// answer rows inside the gap next to Buy
function rows(t){const R0=546;let s='';
 const row=(i,icon,l1,l2,t0,{col=SAGE2}={})=>{if(t<t0)return '';const k=E.outC(seg(t,t0,t0+0.35)),y=R0+i*(ROWH+GAP);
  return `<g opacity="${f2(k)}">${R(18,y,SW-36,ROWH,col,12,2.2)}${icon(44,y+ROWH/2)}${T(74,y+(l2?36:52),22,l1,{f:'HW',c:BROWN,a:'start',o:seg(t,t0+0.15,t0+0.45)})}${l2?T(74,y+66,22,l2,{f:'HW',c:CORAL,a:'start',o:seg(t,t0+0.4,t0+0.7)}):''}</g>`;};
 // placeholders during the move
 if(t<K.size)s+=[0,1,2].map(i=>{const k=E.io(seg(t,K.up+0.1+i*0.2,K.land));if(k<=0)return '';const y=R0+i*(ROWH+GAP);return `<g opacity="${f2(k)}">${R(18,y,SW-36,ROWH,'#F3F5EC',12,1.8)}${[icTape,icCal,icBack][i](44,y+ROWH/2)}${T(74,y+52,22,['Fit','Delivery','Returns'][i],{f:'IM',c:'#9a8e80',a:'start'})}</g>`;}).join('');
 s+=row(0,icTape,'Runs true to size.','Between sizes? Go up.',K.size);
 if(t>=K.ship&&t<K.date){const k=pop(t,K.ship),y=R0+ROWH+GAP;s+=`<g opacity="${f2(clamp(k,0,1))}">${R(18,y,SW-36,ROWH,'#F7F3EC',12,1.8)}${T(SW/2,y+54,24,'Fast shipping!',{f:'IB',c:'#8a7d70'})}</g>`+
  (t>=K.ship+0.4?`<path d="M60,${y+ROWH/2+4} L${f1(lerp(60,SW-60,E.outC(seg(t,K.ship+0.4,K.ship+0.7))))},${y+ROWH/2-4}" stroke="${CORAL}" stroke-width="6" stroke-linecap="round"/>`:'');}
 if(t<K.ship&&t>=K.size)s+=`<g>${R(18,R0+ROWH+GAP,SW-36,ROWH,'#F3F5EC',12,1.8)}${icCal(44,R0+ROWH+GAP+ROWH/2)}${T(74,R0+ROWH+GAP+52,22,'Delivery',{f:'IM',c:'#9a8e80',a:'start'})}</g>`;
 if(t<K.ret&&t>=K.size)s+=`<g>${R(18,R0+2*(ROWH+GAP),SW-36,ROWH,'#F3F5EC',12,1.8)}${icBack(44,R0+2*(ROWH+GAP)+ROWH/2)}${T(74,R0+2*(ROWH+GAP)+52,22,'Returns',{f:'IM',c:'#9a8e80',a:'start'})}</g>`;
 s+=row(1,icCal,'Arrives by Friday.','',K.date);
 s+=row(2,icBack,'Returns accepted within 7 days.','',K.ret);
 return s;}
function scene(t){let w=skyBg('#F3EBDD','#E9DCC6');
 const up=E.io(seg(t,K.up,K.land));
 // scroll: down to the FAQ, then back up
 const pb=pageBody(t,up),bottom=pb.fy+16+3*64+20-SH;let off=lerp(0,bottom,E.io(seg(t,K.scroll,K.scroll+0.9)));off=lerp(off,0,E.io(seg(t,K.up-0.1,K.up+0.6)));
 let scr=`<g transform="translate(0,${f1(-off)})">${pb.s}${rows(t)}</g>`;
 if(t>=K.faq&&t<K.up){const fy=pb.fy-off;scr+=`<rect x="10" y="${f1(fy-34)}" width="${SW-20}" height="${f1(3*64+60)}" rx="14" fill="none" stroke="${CORAL}" stroke-width="5" stroke-dasharray="14 10"/>`;}
 // flying copies of the FAQ rows heading up to the gap (during the move)
 if(t>=K.up&&t<K.land+0.1){[0,1,2].forEach(i=>{const k=E.io(seg(t,K.up+i*0.15,K.land));const y0=SH-120+i*40,y1=546+i*(ROWH+GAP)+ROWH/2;const y=lerp(y0,y1,k);
   if(k<1)scr+=`<g transform="translate(${SW/2},${f1(y)}) scale(${f2(lerp(0.8,1,k))})">${R(-SW/2+18,-ROWH/2,SW-36,ROWH,SAGE2,12,2.2)}${T(0,10,24,['Sizing','Shipping','Returns'][i],{f:'IB',c:BROWN})}</g>`;});}
 // phone
 w+=contact(540,PY+PH+24,280,18)+`<rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="64" fill="#2b2522" stroke="${BROWN}" stroke-width="4"/>`;
 w+=`<clipPath id="scr"><rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="48"/></clipPath><g clip-path="url(#scr)"><g transform="translate(${SX},${SY})">${scr}</g></g>`;
 w+=`<rect x="${540-60}" y="${PY+22}" width="120" height="28" rx="14" fill="#2b2522"/>`;
 // tags around the phone
 if(t>=K.faq&&t<K.up)w+=tag(820,1180,'buried down here',MUST,pop(t,K.faq+0.15),5,40);
 if(t>=K.land&&t<K.zoom+0.3)w+=tag(820,860,'right by Buy',SAGE2,pop(t,K.land),5,38);
 if(t>=K.chart&&t<K.dec)w+=ring(t,K.chart,692,838,78,24,CORAL,4)+tag(660,1310,'not just a chart',CREAM,pop(t,K.chart+0.2),4,30);
 if(t>=K.dec&&t<K.ship)w+=tag(400,1310,'a decision',MUST,pop(t,K.dec),-4,34);
 // the shopper's questions (start and end)
 const qOut=1-seg(t,K.scroll,K.scroll+0.3),qIn=t>=K.out?1:0;
 const qk=(a)=>t<K.out?pop(t,a)*qOut:qIn;const tk=(d)=>t>=K.out?pop(t,K.out+0.3+d):0;
 w+=bubbleQ(260,300,'Does it fit?',qk(K.q1),{s:46,tick:tk(0)})+bubbleQ(770,215,'When will it come?',qk(K.q2),{s:42,tick:tk(0.25)})+bubbleQ(560,105,'Can I send it back?',qk(K.q3),{s:42,tick:tk(0.5)});
 // thumb/hand hovering over Buy (start), tapping Buy (end)
 const buyY=SY+536+(3*ROWH+2*GAP+20)*up+35-off;
 if(t<K.scroll){const hes=[K.q1,K.q2,K.q3].reduce((a,q)=>a+(t>=q?Math.exp(-(t-q)*5)*Math.sin((t-q)*18):0),0),back=[K.q1,K.q2,K.q3].filter(q=>t>=q).length;w+=handAt(600+hes*12,buyY-10+back*18,28,0.8);}
 if(t>=K.out+0.4){const hk=E.io(seg(t,K.tap-0.6,K.tap)),pr=t>=K.tap&&t<K.tap+0.25?1:0;w+=handAt(lerp(820,600,hk),lerp(buyY+260,buyY-6,hk)+pr*8,28,0.8);
  if(t>=K.tap+0.1)w+=tag(820,buyY+90,'added to cart ✓',SAGE2,pop(t,K.tap+0.1),-3,34);}
 if(t>=K.cta){const k=pop(t,K.cta);w+=`<g transform="translate(540,1470) scale(${f2(clamp(k,0,1.15))})">`+R(-300,-58,600,116,CORAL,58,4)+T(0,18,50,'Comment STORE',{f:'HW',c:CREAM})+'</g>';}
 w+=T(540,1850,22,'Tip shared by Shopify merchants, Aug 2026 · no numbers published · demo store',{f:'IM',c:'#8a7a6a'});
 // camera: full phone → close-up on the answers → back out
 const zi=E.io(seg(t,K.zoom,K.zoom+0.7)),zo=E.io(seg(t,K.out,K.out+0.7)),zk=zi*(1-zo);
 const z=lerp(1.15,1.75,zk),cy=lerp(860,SY+546+140,zk);
 return cam(z,540,cy,w);}
S=[0];SC=[scene];
