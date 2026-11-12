// ===== Reel 15 — The goldfish myth, storybook style (Reel 08 look). Timed to the script; retime to the VO later =====
K={q1:0.1,eight:1.2,fish:2.6,s2:3.9,myth:4.1,bbc:5.0,tr1:5.6,tr2:6.4,nobody:7.0,empty:7.9,s3:9.5,stop:9.6,bore:11.4,bored:12.6,s4:14.1,shorter:14.3,worth:16.0,save:17.2,fill:17.7};const END=18.8;
CAP=[[0.1,'Heard people now have'],[1.2,'an 8-second attention span?'],[2.6,'Shorter than a goldfish?'],[3.7,''],
 [4.1,'It’s a myth.'],[5.0,'When the BBC traced it in 2017,'],[7.0,'nobody could find'],[7.9,'the research behind it.'],[9.2,''],
 [9.6,'People don’t stop paying attention.'],[11.4,'They stop paying attention'],[12.6,'to things that bore them.'],[13.9,''],
 [14.3,'So don’t make your page shorter.'],[16.0,'Make it worth reading.'],[17.2,'Save this.'],[18.0,'']];
function ground(y=1300,c=SAND){return P(`M-1600,${y} L2800,${y} L2800,${y+1400} L-1600,${y+1400} Z`,c,3.4,2);}
function bubble(x,y,txt,k,s=34,c=CREAM){if(k<=0)return '';_cv.font=`${s}px HW`;const W=_cv.measureText(txt).width+44;return `<g transform="translate(${x},${y}) scale(${f2(clamp(k,0,1.15))})">${P(`M${-W/2},-36 L${W/2},-36 L${W/2},20 L18,20 L0,44 L-8,20 L${-W/2},20 Z`,c,3)}${T(0,6,s,txt,{f:'HW',c:BROWN})}</g>`;}
function goldfish(x,y,s,t,dir=1){const tail=Math.sin(t*9)*10;return `<g transform="translate(${f1(x)},${f1(y)}) scale(${f2(s*dir)},${f2(s)})">`+P(`M-60,0 L-${f1(110)},${f1(-40+tail)} L-${f1(104)},${f1(40+tail)} Z`,'#F0904F',3.2)+P('M-70,0 Q-40,-56 30,-46 Q80,-30 84,0 Q80,30 30,46 Q-40,56 -70,0 Z','#F5A25D',3.4)+
  P('M-10,-44 Q10,-80 40,-44','#F0904F',3)+P('M0,20 Q14,44 34,26','#F0904F',2.8)+`<circle cx="52" cy="-10" r="12" fill="#fff" stroke="${BROWN}" stroke-width="3"/><circle cx="56" cy="-10" r="6" fill="${BROWN}"/>`+P('M74,14 q6,4 10,0','none',2.6)+'</g>';}
function bowl(x,y,r){return contact(x,y+r*0.9,r*0.8,18)+`<path d="M${x-r*0.55},${y-r*0.8} Q${x-r*1.15},${y} ${x-r*0.6},${y+r*0.85} L${x+r*0.6},${y+r*0.85} Q${x+r*1.15},${y} ${x+r*0.55},${y-r*0.8} Z" fill="#DDEAF3" opacity=".75"/>`+
  `<path d="M${x-r*0.86},${y-r*0.25} Q${x},${y-r*0.35} ${x+r*0.86},${y-r*0.25} Q${x+r*1.0},${y+r*0.3} ${x+r*0.6},${y+r*0.85} L${x-r*0.6},${y+r*0.85} Q${x-r*1.0},${y+r*0.3} ${x-r*0.86},${y-r*0.25} Z" fill="${SKY2}" opacity=".7"/>`;}
function bowlRim(x,y,r){return `<path d="M${x-r*0.55},${y-r*0.8} Q${x-r*1.15},${y} ${x-r*0.6},${y+r*0.85} L${x+r*0.6},${y+r*0.85} Q${x+r*1.15},${y} ${x+r*0.55},${y-r*0.8}" fill="none" stroke="${BROWN}" stroke-width="3.6"/>`+`<ellipse cx="${x}" cy="${y-r*0.8}" rx="${r*0.55}" ry="${r*0.1}" fill="none" stroke="${BROWN}" stroke-width="3.4"/>`+
  `<path d="M${x-r*0.7},${y-r*0.2} Q${x-r*0.78},${y+r*0.2} ${x-r*0.55},${y+r*0.5}" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".55"/>`;}
function watch(x,y,k,txt,c=CREAM){if(k<=0)return '';return `<g transform="translate(${x},${y}) scale(${f2(clamp(k,0,1.15))})">`+R(-16,-120,32,26,BROWN,6,2)+`<circle cx="0" cy="0" r="94" fill="${c}" stroke="${BROWN}" stroke-width="4"/>`+P('M60,-74 L82,-96','none',8)+T(0,18,52,txt,{f:'HW',c:BROWN})+'</g>';}
function card(x,y,rot,k,l1,l2='',{c=CREAM,w=440,dash=false}={}){if(k<=0)return '';return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${f2(clamp(k,0,1.15))})">`+
  (dash?`<rect x="${-w/2}" y="-70" width="${w}" height="140" rx="12" fill="none" stroke="${BROWN}" stroke-width="3.4" stroke-dasharray="16 12"/>`:R(-w/2,-70,w,140,c,12,3.4))+T(0,l2?-6:14,38,l1,{f:'HW',c:BROWN,mw:w-40})+(l2?T(0,40,24,l2,{f:'IM',c:'#8a7a6a',mw:w-40}):'')+'</g>';}
function magnifier(x,y,s=1){return `<g transform="translate(${f1(x)},${f1(y)}) scale(${f2(s)})">`+P('M70,70 L170,170','none',0)+`<path d="M74,74 L176,176" stroke="${BROWN}" stroke-width="34" stroke-linecap="round"/><path d="M74,74 L176,176" stroke="${CORAL}" stroke-width="24" stroke-linecap="round"/>`+
  `<circle r="104" fill="#fff" opacity=".28"/><circle r="104" fill="none" stroke="${BROWN}" stroke-width="16"/><circle r="104" fill="none" stroke="${MUST}" stroke-width="9"/><path d="M-60,-40 Q-50,-70 -20,-80" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" opacity=".8"/></g>`;}
// ---------- scene 1: the 8-second claim ----------
function s1(t){let w=skyBg('#EEF2F2','#E2E8E6')+ground(1340);
  w+=bowl(720,1080,280)+goldfish(720+Math.sin(t*1.3)*60,1120+Math.sin(t*2)*16,1.15,t,Math.cos(t*1.3)>0?1:-1);
  for(let i=0;i<3;i++){const ph=(t*0.7+i/3)%1;w+=`<circle cx="${f1(780+Math.sin(ph*9+i)*10)}" cy="${f1(1060-ph*260)}" r="${f1(8+ph*8)}" fill="none" stroke="${BROWN}" stroke-width="2.6" opacity="${f2(1-ph)}"/>`;}
  w+=bowlRim(720,1080,280)+person(250,1340,LAV,t,{s:2.5,face:1});
  w+=watch(250,880,pop(t,K.eight+0.1),'8 sec',CREAM)+watch(720,620,pop(t,K.fish),'9 sec',MUST);
  if(t>=K.fish+0.4)w+=bubble(250,620,'wait… what?',pop(t,K.fish+0.4),36);
  const pk=E.io(seg(t,0,1.3));FISH=lerp(0.45,0,pk);
  return cam(lerp(1.7,1.0,pk),lerp(720,520,pk),lerp(1110,1000,pk),w);}
// ---------- scene 2: trace the claim back ----------
function s2(t){let w=skyBg('#F2E6CF','#E6D2B0');RACK=5*(1-E.outC(seg(t,K.s2,K.s2+0.4)));
  w+=card(540,480,-2,pop(t,K.s2),'People: 8 sec · Goldfish: 9 sec','the claim',{w:620});
  if(t>=K.myth){const k=seg(t,K.myth,K.myth+0.18),z=lerp(2.2,1,E.outC(k));w+=`<g transform="translate(800,590) rotate(-12) scale(${f2(z)})" opacity="${f2(clamp(k*3))}">`+`<rect x="-150" y="-60" width="300" height="120" rx="10" fill="none" stroke="${CORAL}" stroke-width="9"/>`+T(0,30,84,'MYTH',{f:'MK',c:CORAL})+'</g>';}
  w+=inkLine(t,K.tr1-0.3,'M540,560 Q420,700 330,800','#8a7a6a',4,0.4)+inkLine(t,K.tr2-0.3,'M380,940 Q600,1000 720,1060','#8a7a6a',4,0.4)+inkLine(t,K.nobody-0.3,'M720,1200 Q560,1260 420,1320','#8a7a6a',4,0.4);
  w+=card(330,870,3,pop(t,K.tr1),'Microsoft Canada report, 2015','a marketing report',{w:520});
  w+=card(730,1130,-3,pop(t,K.tr2),'A stats website','cited as the source',{w:420});
  w+=card(400,1390,2,pop(t,K.nobody),'?','',{dash:true,w:380});
  if(t>=K.empty)w+=T(620,1460,40,'no study found',{f:'HW',c:CORAL,o:seg(t,K.empty,K.empty+0.3)});
  // magnifier hops card to card
  if(t>=K.bbc){const P0=[[1300,300],[560,470],[330,860],[730,1120],[400,1380]],tt=[K.bbc,K.bbc+0.4,K.tr1+0.2,K.tr2+0.2,K.nobody+0.25];let x=P0[0][0],y=P0[0][1];
    for(let i=1;i<P0.length;i++){const k=E.io(seg(t,tt[i]-0.4,tt[i]));if(k>0){x=lerp(P0[i-1][0],P0[i][0],k);y=lerp(P0[i-1][1],P0[i][1],k);}}
    const mv=tt.some(a=>t>a-0.4&&t<a);w+=magnifier(x,y,1.0)+(t>=K.empty?'':'');FISH=mv?0.12:0.06;}
  w+=tag(800,250,'BBC, 2017',MUST,pop(t,K.bbc),4,40);
  w+=T(540,1610,22,'BBC RADIO 4 · MORE OR LESS, 2017',{f:'IM',c:'#9C8C78',o:seg(t,K.bbc,K.bbc+0.4)});
  return cam(1+0.03*seg(t,K.s2,K.s3),540,960,w);}
// ---------- scene 3: bored vs hooked ----------
function viewer(x,y,t,{asleep=0,hooked=0,content}){let s=sbPhone(x-120,y-700,240,420,content);
  s+=`<g transform="translate(${x},${y}) translate(0,${f1(-20*hooked)}) scale(${f2(1+0.05*hooked)})">`+person(0,0,hooked?CORAL:LAV,t,{s:2.6,face:0})+'</g>';
  if(asleep>0){s+=`<g opacity="${f2(asleep)}"><path d="M${x-22},${y-182} q8,6 16,0 M${x+6},${y-182} q8,6 16,0" stroke="${BROWN}" stroke-width="3.4" fill="none"/>`;for(let i=0;i<3;i++){const ph=(t*0.8+i/3)%1;s+=T(x+60+ph*60,y-240-ph*120,26+ph*20,'z',{f:'HW',c:BROWN,o:1-ph});}s+='</g>';}
  if(hooked>0)for(let i=0;i<2;i++){const ph=(t*0.9+i/2)%1;s+=`<g transform="translate(${f1(x+(i?70:-70))},${f1(y-260-ph*140)}) scale(${f2(0.7*(1-ph*0.4))})" opacity="${f2(1-ph)}">`+P('M0,30 C-50,-10 -40,-60 0,-30 C40,-60 50,-10 0,30 Z',CORAL,3.4)+'</g>';}
  return s;}
function s3(t){let w=skyBg('#EEF0EC','#E1E5DC')+ground(1380);
  const dull=T(104,60,22,'About us',{f:'HW',c:'#999'})+[90,130,160,190,220,250,280,310,340,370].map((y,i)=>`<rect x="20" y="${y}" width="${150+((i*37)%50)}" height="10" rx="5" fill="#D7D0C4"/>`).join('');
  const good=R(14,14,180,150,'#F1E2C2',10,2.4)+sbJar(104,96,0.8)+T(104,196,24,'₹899 · ships in 24h',{f:'HW',c:BROWN,mw:186})+R(14,214,180,30,SAGE2,15,2)+T(104,236,18,'How it’s made ▸',{f:'HW',c:BROWN})+stars(104,276,5,10,24)+R(14,300,180,40,BROWN,12,2)+T(104,328,22,'Add to cart',{f:'HW',c:CREAM});
  w+=viewer(290,1380,t,{asleep:E.outC(seg(t,K.bore,K.bore+0.4)),content:dull})+viewer(800,1380,t,{hooked:E.outC(seg(t,K.bored+0.1,K.bored+0.5)),content:good});
  w+=tag(290,1480,'boring',CREAM,pop(t,K.bore+0.2),-3,40)+tag(800,1480,'useful',MUST,pop(t,K.bored+0.3),3,40);
  w+=tag(540,330,'Attention isn’t gone.',CREAM,pop(t,K.stop),-2,50);
  return cam(1.0,540,960,w);}
// ---------- scene 4: not shorter, more useful ----------
function s4(t){let w=skyBg('#F3EBDD','#E8DAC2');
  const cut=E.io(seg(t,K.shorter+0.4,K.shorter+0.9)),heal=E.io(seg(t,K.worth-0.3,K.worth+0.2));
  const gap=60*cut*(1-heal);
  w+=`<g transform="translate(0,${f1(-gap/2)})">`+P('M300,420 L780,420 L780,980 L300,980 Z','#FBF7EE',3.4)+'</g>'+`<g transform="translate(0,${f1(gap/2)})">`+P('M300,980 L780,980 L780,1460 L300,1460 Z','#FBF7EE',3.4)+'</g>';
  const L=['What it is','Price + delivery','Real reviews','How to use it','Answers to doubts'];
  L.forEach((l,i)=>{const y=520+i*180+(i>=3?gap/2:-gap/2),on=t>=K.worth+0.15+i*0.18;
    w+=on?R(330,y-50,420,100,i%2?'#F6EBD0':'#EFF3E6',12,2.6)+T(560,y+12,36,l,{f:'HW',c:BROWN})+`<g transform="translate(380,${y})">`+inkLine(t,K.worth+0.2+i*0.18,'M-18,0 L-4,14 L20,-16',CORAL,7,0.2)+'</g>':`<rect x="340" y="${y-8}" width="${260+(i*53)%120}" height="16" rx="8" fill="#DDD5C6"/>`;});
  if(t>=K.shorter&&t<K.worth+0.1){const k=E.io(seg(t,K.shorter,K.shorter+0.6));w+=`<g transform="translate(${f1(lerp(160,900,k))},980) rotate(0)" opacity="${f2(1-seg(t,K.worth-0.3,K.worth))}">`+P('M0,0 L60,-18 M0,0 L60,18','none',8)+`<circle cx="-18" cy="-16" r="15" fill="none" stroke="${CORAL}" stroke-width="7"/><circle cx="-18" cy="16" r="15" fill="none" stroke="${CORAL}" stroke-width="7"/></g>`;
    if(t>=K.shorter+0.9)w+=inkLine(t,K.shorter+0.9,'M200,880 L880,1080',CORAL,12,0.2)+inkLine(t,K.shorter+1.05,'M880,880 L200,1080',CORAL,12,0.2);}
  w+=tag(540,260,t<K.worth?'Shorter?':'Make it worth reading.',t<K.worth?CREAM:MUST,t<K.worth?pop(t,K.shorter):pop(t,K.worth),-2,56);
  w+=sbSave(t,K.save,K.fill,540,1560);
  return cam(1.0,540,960,w);}
S=[0,K.s2,K.s3,K.s4];SC=[s1,s2,s3,s4];
