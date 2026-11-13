// Static posts (4:5, 1080x1350) in the storybook style: the pinned "Start here" poster and the "5 questions" carousel.
const W=1080,H=1350;
const tick=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})"><circle r="30" fill="${SAGE2}" stroke="${BROWN}" stroke-width="3.4"/><path d="M-13,0 L-3,11 L15,-11" stroke="${BROWN}" stroke-width="5.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const cross=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})"><circle r="30" fill="${PEACH}" stroke="${BROWN}" stroke-width="3.4"/><path d="M-11,-11 L11,11 M11,-11 L-11,11" stroke="${BROWN}" stroke-width="5.5" stroke-linecap="round"/></g>`;
function bubble(x,y,txt,s=46,c=CREAM){_cv.font=`${s}px HW`;const w=_cv.measureText(txt).width+60;
 return `<g transform="translate(${x},${y})">${P(`M${-w/2},-${s} H${w/2} Q${w/2+16},-${s} ${w/2+16},-${s-16} V${s*0.5} Q${w/2+16},${s*0.8} ${w/2},${s*0.8} H24 L0,${s*0.8+32} L-6,${s*0.8} H${-w/2} Q${-w/2-16},${s*0.8} ${-w/2-16},${s*0.5} V-${s-16} Q${-w/2-16},-${s} ${-w/2},-${s} Z`,c,3.4)}${T(0,s*0.18,s,txt,{f:'HW',c:BROWN})}</g>`;}
function kurta(x,y,s=1){return `<g transform="translate(${x},${y}) scale(${s})">`+P('M-70,-150 L-150,-110 L-185,10 L-130,30 L-110,-40 L-110,170 L110,170 L110,-40 L130,30 L185,10 L150,-110 L70,-150 Q0,-110 -70,-150 Z',SKY2,3.4,2)+
 P('M-30,-138 Q0,-120 30,-138 L18,-60 L-18,-60 Z','#9FC0DD',2.6)+[0,1,2].map(i=>`<circle cx="0" cy="${-118+i*20}" r="4" fill="${BROWN}"/>`).join('')+'</g>';}
function pageCard(x,y,w,h,inner){return contact(x+w/2,y+h+16,w*0.42,14)+R(x,y,w,h,'#FFFFFF',22,3.6)+`<g transform="translate(${x},${y})">${inner}</g>`;}
const swipe=(t='Swipe')=>T(W-70,H-70,34,t+' →',{f:'HW',c:BROWN,a:'end'});
const foot=n=>T(70,H-70,26,n,{f:'IM',c:'#8a7a6a',a:'start'});
const brand=()=>`<image href="assets/logo-ink.svg" x="70" y="64" width="190" height="38"/>`;
// ---------------- POSTER: Start here ----------------
function poster(){let s=skyBg('#F3EBDD','#E9DCC6')+brand();
 s+=T(70,250,92,'Visitors come.',{f:'IB',c:BROWN,a:'start'})+T(70,352,92,'They don’t buy.',{f:'IB',c:CORAL,a:'start'});
 s+=T(70,430,46,'We find why, and fix it.',{f:'HW',c:BROWN,a:'start'})+T(70,490,32,'For Indian D2C brands on Shopify',{f:'IM',c:'#7a6a5a',a:'start'});
 const ph=`<rect width="388" height="728" fill="#fff"/><rect width="388" height="56" fill="#F1ECE4"/>`+R(20,10,348,36,'#fff',18,1.6)+
  `<rect x="16" y="70" width="356" height="300" rx="10" fill="#F2ECE2"/>`+kurta(194,222,0.8)+T(18,410,28,'Linen Kurta',{f:'IB',c:BROWN,a:'start'})+T(370,410,26,'₹1,499',{f:'IB',c:CORAL,a:'end'})+
  ['S','M','L','XL'].map((z,i)=>R(18+i*70,430,60,42,i===1?MUST:CREAM,8,2)+T(48+i*70,459,20,z,{f:'IB',c:BROWN})).join('')+
  T(18,520,20,'Reviews (0)',{f:'IM',c:'#8a7a6a',a:'start'})+R(18,600,352,64,BROWN,12,0)+T(194,642,28,'Buy now',{f:'IB',c:'#fff'});
 const PX=600,PY=440;s+=sbPhone(PX,PY,420,760,ph);
 const O=(x,y)=>[PX+16+x,PY+16+y];
 const pin=(cx,cy,rx,ry,txt,tx,ty)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${CORAL}" stroke-width="6"/>`+`<path d="M${tx+120},${ty} Q${(tx+120+cx-rx)/2},${ty-20} ${cx-rx},${cy}" stroke="${CORAL}" stroke-width="4" fill="none" stroke-dasharray="10 9"/>`+tag(tx,ty,txt,CREAM,1,-3,36);
 let [x,y]=O(158,451);s+=pin(x,y,158,40,'which size?',300,700);
 [x,y]=O(70,514);s+=pin(x,y,70,26,'no reviews',300,880);
 [x,y]=O(194,575);s+=pin(x,y,150,24,'no delivery date',300,1060);
 s+=`<g transform="translate(70,1235)">${R(0,0,500,88,CORAL,44,3.6)}${T(250,58,44,'Comment STORE',{f:'HW',c:CREAM})}</g>`+T(600,1292,36,'for a free store audit',{f:'HW',c:BROWN,a:'start'});
 return s;}
// ---------------- CAROUSEL: 5 questions ----------------
function cover(){let s=skyBg('#F3EBDD','#E9DCC6')+brand();
 s+=T(70,290,80,'Every shopper asks',{f:'IB',c:BROWN,a:'start'})+T(70,400,112,'5 questions',{f:'IB',c:CORAL,a:'start'})+T(70,500,80,'before paying.',{f:'IB',c:BROWN,a:'start'});
 s+=T(70,590,44,'Your product page should answer all 5.',{f:'HW',c:BROWN,a:'start'});
 s+=person(330,1220,ROSE,0,{s:2.6,face:0});
 s+=bubble(640,760,'What is it?',40)+bubble(820,880,'Is it for me?',40)+bubble(600,990,'Total cost?',40)+bubble(820,1100,'When will it come?',38)+bubble(640,1210,'Can I return it?',38);
 return s+swipe();}
function qSlide(n,q,ans,el,note){let s=skyBg('#F3EBDD','#E9DCC6')+brand();
 s+=`<g transform="translate(70,170)">${R(0,0,120,120,MUST,24,3.6)}${T(60,86,80,String(n),{f:'MK',c:BROWN})}</g>`;
 s+=bubble(560,420,q,56);
 s+=T(70,590,30,'ANSWER IT WITH',{f:'IB',c:'#8a7a6a',a:'start'})+T(70,660,52,ans,{f:'IB',c:BROWN,a:'start',mw:940});
 s+=pageCard(70,720,940,400,el);
 s+=T(70,1200,36,note,{f:'HW',c:BROWN,a:'start',mw:940});
 return s+foot(`${n}/5`)+swipe();}
const elWhat=`<rect x="24" y="24" width="300" height="352" rx="12" fill="#F2ECE2"/>`+kurta(174,200,0.9)+T(354,90,40,'Linen Kurta',{f:'IB',c:BROWN,a:'start'})+
 T(354,146,30,'Breathable everyday kurta',{f:'IM',c:BROWN,a:'start'})+T(354,186,30,'for Indian summers.',{f:'IM',c:BROWN,a:'start'})+R(354,230,540,16,'#EEE7DC',6,0)+R(354,262,420,16,'#EEE7DC',6,0)+tick(860,330,1.1);
const elFor=T(24,70,36,'Size',{f:'IB',c:BROWN,a:'start'})+['S','M','L','XL'].map((z,i)=>R(24+i*110,96,94,64,i===1?MUST:CREAM,10,2.6)+T(71+i*110,140,30,z,{f:'IB',c:BROWN})).join('')+
 R(24,200,890,150,'#F3F5EC',14,2.4)+T(54,262,40,'Runs true to size.',{f:'HW',c:BROWN,a:'start'})+T(54,318,40,'Between sizes? Go up.',{f:'HW',c:CORAL,a:'start'})+tick(860,90,1.1);
const elCost=T(24,80,52,'₹1,499',{f:'IB',c:CORAL,a:'start'})+T(24,140,30,'Delivery: free above ₹999',{f:'IM',c:BROWN,a:'start'})+T(24,186,30,'COD: +₹49 · UPI: no extra charge',{f:'IM',c:BROWN,a:'start'})+
 R(24,240,890,100,'#F3F5EC',14,2.4)+T(54,304,38,'What you see here is what you pay.',{f:'HW',c:BROWN,a:'start'})+tick(860,90,1.1);
const elWhen=R(24,40,180,180,'#fff',16,3)+`<rect x="24" y="40" width="180" height="50" rx="16" fill="${CORAL}" stroke="${BROWN}" stroke-width="3"/>`+T(114,76,26,'FRI',{f:'IB',c:'#fff'})+T(114,176,80,'20',{f:'MK',c:BROWN})+
 T(250,110,48,'Arrives by Fri, 20 Nov',{f:'IB',c:BROWN,a:'start'})+T(250,166,30,'to 560001 · order in the next 4 hrs',{f:'IM',c:'#7a6a5a',a:'start'})+R(24,260,890,100,'#F7F3EC',14,2)+T(54,322,36,'Not “Fast shipping!”',{f:'HW',c:'#8a7d70',a:'start'})+
 `<path d="M48,312 L420,300" stroke="${CORAL}" stroke-width="6" stroke-linecap="round"/>`+tick(860,90,1.1);
const elReturn=T(24,90,44,'Easy 7-day returns',{f:'IB',c:BROWN,a:'start'})+T(24,146,30,'Free pickup from your door. Refund in 3 days.',{f:'IM',c:BROWN,a:'start'})+
 R(24,200,890,150,'#F3F5EC',14,2.4)+T(54,262,38,'One line, right under Buy.',{f:'HW',c:BROWN,a:'start'})+T(54,316,38,'Not a link to a policy page.',{f:'HW',c:CORAL,a:'start'})+tick(860,90,1.1);
function cta(){let s=skyBg('#F3EBDD','#E9DCC6')+brand();
 s+=T(70,300,76,'Can your product',{f:'IB',c:BROWN,a:'start'})+T(70,396,76,'page answer all 5?',{f:'IB',c:BROWN,a:'start'});
 ['What is it?','Is it for me?','What does it cost, all in?','When will it arrive?','What if I don’t like it?'].forEach((q,i)=>{s+=tick(100,520+i*96,0.9)+T(150,534+i*96,40,q,{f:'HW',c:BROWN,a:'start'});});
 s+=`<g transform="translate(70,1060)">${R(0,0,940,100,CORAL,50,3.6)}${T(470,66,50,'Comment STORE for a free audit',{f:'HW',c:CREAM,mw:880})}</g>`;
 s+=T(70,1240,40,'Save this. Check your page tonight.',{f:'HW',c:BROWN,a:'start'});
 return s;}
const SLIDES={poster:()=>poster(),c1:()=>cover(),
 c2:()=>qSlide(1,'What is it?','A plain-words title and one clear line',elWhat,'If they have to guess what it is, they won’t guess the price is worth it.'),
 c3:()=>qSlide(2,'Is it for me?','A decision, not just a size chart',elFor,'Tell them which size to pick. Don’t make them work it out.'),
 c4:()=>qSlide(3,'What does it cost, all in?','The full price before checkout',elCost,'Delivery and COD charges belong next to the price.'),
 c5:()=>qSlide(4,'When will it arrive?','A real date, next to Buy',elWhen,'Only promise a date you can actually hit for that pincode.'),
 c6:()=>qSlide(5,'What if I don’t like it?','Your return promise in one line',elReturn,'Write your actual policy. Short, plain, near Buy.'),
 c7:()=>cta()};
window.drawPost=id=>{const sv=document.getElementById('sv'),st=document.getElementById('stage');st.style.height=H+'px';sv.setAttribute('height',H);sv.setAttribute('viewBox',`0 0 ${W} ${H}`);
 document.getElementById('g').innerHTML=SLIDES[id]()+`<rect width="${W}" height="${H}" fill="url(#grainP)" opacity="0"/>`;};
window.ready=document.fonts.ready.then(()=>Promise.all(['IM','IB','HW','MK'].map(f=>document.fonts.load(`40px ${f}`))));
