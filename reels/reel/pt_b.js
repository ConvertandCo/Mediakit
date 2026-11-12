// ===== Reel B: "Closes the tab" (painted night, phone POV). Timed to the script; re-time to the VO later =====
const K={tap1:0.45,tap2:0.62,love:1.4,link:1.9,s2:2.2,scroll:3.0,s3:3.6,switch:4.8,s4:4.8,date:6.2,close:7.6,s5:8.0,lower:8.4,q:9.4,send:11.0};
const END=13.0,S=[0,K.s2,K.s3,K.s4,K.s5];
const CAP=[[0.2,'Found it on Instagram.'],[1.4,'Love it.'],[2.2,'Opens the website.'],[3.6,'No reviews.'],[4.8,'Checks their Instagram.'],[6.2,'Last post: 2023.'],[7.6,'Closes the tab.'],[9.0,'']];
const SFX=[[0,'amb',-38],[0.45,'click',-22],[0.62,'click',-22],[0.66,'pop',-22],[1.9,'click1',-21],[2.2,'soft',-27],[3.0,'move',-25],[3.65,'thud',-25],[4.8,'whoosh',-24],[6.2,'hit',-21],[7.6,'wl',-18],[7.65,'whoosh',-25],[9.4,'ting1',-29],[11.0,'whoosh',-24]];
const f1=n=>Math.round(n*10)/10,f2=n=>Math.round(n*100)/100,E={outC:x=>1-Math.pow(1-x,3),io:x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,inC:x=>x*x*x,bk:x=>{const c1=1.7,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);}};
const sg=(t,a,b)=>cl((t-a)/(b-a)),pop=(t,a,d=0.4)=>t<a?0:cl(E.bk(sg(t,a,a+d)),0,1.2);
const LN='#1d130c',UI='#262019',MUTE='#8a7d70',BG='#FBF7F0';
const _cv=document.createElement('canvas').getContext('2d');const fit=(txt,s,f,mw)=>{_cv.font=`${s}px ${f}`;const w=_cv.measureText(txt).width;return w>mw?s*mw/w:s;};
const tx=(x,y,s,txt,{f='IB',c='#FFF6E6',a='middle',o=1,st=LN,sw=0,ls=0}={})=>o<=0.004?'':`<text x="${f1(x)}" y="${f1(y)}" font-family="${f}" font-size="${f1(s)}" fill="${c}" text-anchor="${a}" opacity="${f2(o)}" ${sw?`stroke="${st}" stroke-width="${sw}" paint-order="stroke" stroke-linejoin="round"`:''} ${ls?`letter-spacing="${ls}"`:''}>${txt}</text>`;
const pth=(d,fill,{s=LN,w=3.5,o=1}={})=>`<path d="${d}" fill="${fill}" stroke="${s}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" opacity="${f2(o)}"/>`;
const heart=(x,y,s,fill,st=UI,w=3)=>`<g transform="translate(${f1(x)},${f1(y)}) scale(${f2(s)})">${pth('M0,30 C-50,-10 -40,-60 0,-30 C40,-60 50,-10 0,30 Z',fill,{s:st,w:w/Math.max(s,.01)})}</g>`;
const starP=(cx,cy,r,fill)=>{let d='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*0.46:r;d+=(i?'L':'M')+f1(cx+Math.cos(a)*rr)+','+f1(cy+Math.sin(a)*rr);}return pth(d+'Z',fill,{s:'#b9ad9e',w:2.5});};
// phone geometry (screen space)
const PX=170,PY=190,PW=740,PH=1460,SX=PX+20,SY=PY+20,SW=PW-40,SH=PH-40;
// a painted product: clay-pot candle
function candle(cx,cy,s,t){const fl=1+0.06*Math.sin(t*13)+0.04*Math.sin(t*7.3);return `<g transform="translate(${cx},${cy}) scale(${s})">`+
 `<circle cx="0" cy="-150" r="${f1(150*fl)}" fill="url(#bulb)" opacity=".55"/>`+`<ellipse cx="0" cy="150" rx="210" ry="28" fill="#000" opacity=".18"/>`+
 pth('M-190,-20 Q-200,140 -120,150 H120 Q200,140 190,-20 Z','#B4573A')+pth('M-205,-40 H205 V-5 H-205 Z','#C9694A')+`<path d="M-150,40 Q0,70 150,40" stroke="#8d3f28" stroke-width="5" fill="none"/>`+
 pth('M-170,-40 Q0,-75 170,-40','#EFE4CC',{w:3})+pth('M0,-60 V-105','none',{w:5})+
 `<path d="M0,${f1(-110-50*fl)} Q22,-125 0,-104 Q-22,-125 0,${f1(-110-50*fl)} Z" fill="#FFC75A" stroke="#E07B2C" stroke-width="3"/></g>`;}
function igPost(t,liked){let s=`<rect width="${SW}" height="${SH}" fill="${BG}"/>`;
 s+=tx(40,90,34,'Instagram',{f:'HW',c:UI,a:'start'})+`<rect x="0" y="120" width="${SW}" height="2" fill="#e6ddd0"/>`;
 s+=`<circle cx="60" cy="175" r="30" fill="#B4573A" stroke="#E8775A" stroke-width="4"/>`+tx(108,186,30,'wickandclay',{f:'IB',c:UI,a:'start'})+tx(SW-40,186,34,'···',{f:'IB',c:UI,a:'end'});
 s+=`<rect x="0" y="225" width="${SW}" height="${SW}" fill="#E9D6B8"/><rect x="0" y="${225+SW*0.62}" width="${SW}" height="${SW*0.38}" fill="#CDB08A"/>`+candle(SW/2,225+SW*0.52,1.15,t);
 const hk=t>=K.tap2?pop(t,K.tap2,0.35)*(1-sg(t,K.tap2+0.6,K.tap2+0.9)):0;if(hk>0)s+=heart(SW/2,225+SW/2,hk*3.2,'#FFFFFF','#FFFFFF',0.1);
 const iy=225+SW+60;s+=heart(56,iy,liked?0.75:0.7,liked?'#E8433A':'none',liked?'#E8433A':UI,3)+pth(`M120,${iy-26} a28,26 0 1 1 10,44 l-14,10 l2,-16 a28,26 0 0 1 2,-38 Z`,'none',{s:UI,w:3})+pth(`M190,${iy-22} L250,${iy-30} L222,${iy+28} L214,${iy+2} Z`,'none',{s:UI,w:3});
 s+=tx(40,iy+70,28,liked?'1,205 likes':'1,204 likes',{f:'IB',c:UI,a:'start'})+tx(40,iy+112,27,'Hand-poured clay pot candles.',{f:'IM',c:UI,a:'start'});
 const lk=t>=K.link&&t<K.link+0.2?0.94:1;s+=`<g transform="translate(${SW/2},${iy+200}) scale(${lk})"><rect x="-170" y="-40" width="340" height="80" rx="40" fill="${UI}"/>${tx(0,12,32,'Shop now  ›',{f:'IB',c:BG})}</g>`;
 return s;}
function page(t,off){let s=`<rect width="${SW}" height="${SH}" fill="#FFFFFF"/>`;
 s+=`<rect x="0" y="0" width="${SW}" height="130" fill="#F1ECE4"/><rect x="40" y="60" width="${SW-80}" height="54" rx="27" fill="#fff" stroke="#ddd3c4" stroke-width="2"/>`+tx(SW/2,97,26,'🔒 wickandclay.store'.replace('🔒 ',''),{f:'IM',c:MUTE});
 s+=`<g transform="translate(0,${f1(-off)})">`;
 s+=`<rect x="0" y="130" width="${SW}" height="${SW*0.9}" fill="#E9D6B8"/>`+candle(SW/2,130+SW*0.5,1.0,t);const y0=130+SW*0.9;
 s+=tx(40,y0+80,44,'Clay Pot Candle',{f:'IB',c:UI,a:'start'})+tx(40,y0+140,40,'₹1,299',{f:'IB',c:'#B4573A',a:'start'});
 s+=`<rect x="40" y="${y0+180}" width="${SW-80}" height="96" rx="14" fill="${UI}"/>`+tx(SW/2,y0+242,34,'Add to cart',{f:'IB',c:'#fff'});
 s+=tx(40,y0+340,26,'Hand-poured soy wax in a terracotta pot.',{f:'IM',c:MUTE,a:'start'});
 const ry=y0+440;s+=`<rect x="0" y="${ry}" width="${SW}" height="2" fill="#eee5d8"/>`+tx(40,ry+80,38,'Customer reviews',{f:'IB',c:UI,a:'start'});
 for(let i=0;i<5;i++)s+=starP(64+i*62,ry+150,26,'#EEE8DE');
 s+=tx(40,ry+240,34,'No reviews yet',{f:'IB',c:UI,a:'start'})+tx(40,ry+290,27,'Be the first to write a review',{f:'IM',c:MUTE,a:'start'});
 if(t>=K.s3){const k=E.outC(sg(t,K.s3,K.s3+0.4));s+=`<rect x="24" y="${ry+190}" width="${f1(420*k)}" height="70" rx="8" fill="#E8775A" opacity=".18"/>`;}
 return s+'</g>';}
function profile(t){let s=`<rect width="${SW}" height="${SH}" fill="${BG}"/>`;
 s+=tx(40,90,32,'wickandclay',{f:'IB',c:UI,a:'start'})+`<circle cx="100" cy="220" r="64" fill="#B4573A" stroke="#ddd" stroke-width="4"/>`;
 [['9','posts'],['312','followers'],['48','following']].forEach(([n,l],i)=>{s+=tx(290+i*150,212,36,n,{f:'IB',c:UI})+tx(290+i*150,250,22,l,{f:'IM',c:MUTE});});
 s+=tx(40,340,26,'Hand-poured candles · Jaipur',{f:'IM',c:UI,a:'start'});
 const g=(SW-8)/3,gy=400,dusty=E.io(sg(t,K.date-0.4,K.date+0.6));
 const cols=['#C9A27A','#B4573A','#D9C3A0','#8E6E4E','#E0B979','#A9502E','#CDB08A','#9a7a58','#E9D6B8'];
 for(let i=0;i<9;i++){const x=(i%3)*(g+4),y=gy+Math.floor(i/3)*(g+4);s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(g)}" height="${f1(g)}" fill="${cols[i]}"/>`;
  if(i%2===0)s+=`<g opacity=".7">`+candle(x+g/2,y+g*0.62,0.42,0)+'</g>';}
 s+=`<rect x="0" y="${gy}" width="${SW}" height="${f1(3*g+8)}" fill="#8f877d" opacity="${f2(dusty*0.55)}" style="mix-blend-mode:saturation"/><rect x="0" y="${gy}" width="${SW}" height="${f1(3*g+8)}" fill="#efe6d8" opacity="${f2(dusty*0.35)}"/>`;
 // cobweb in the corner
 if(dusty>0){const cw=`M0,${gy} L${f1(160*dusty)},${gy} M0,${gy} L0,${f1(gy+160*dusty)} M0,${gy} L${f1(120*dusty)},${f1(gy+120*dusty)} M${f1(60*dusty)},${gy} Q${f1(45*dusty)},${f1(gy+45*dusty)} 0,${f1(gy+60*dusty)} M${f1(110*dusty)},${gy} Q${f1(80*dusty)},${f1(gy+80*dusty)} 0,${f1(gy+110*dusty)}`;s+=`<path d="${cw}" stroke="#fff" stroke-width="2.5" fill="none" opacity=".85"/>`;}
 // the date stamp
 if(t>=K.date){const k=pop(t,K.date,0.3);s+=`<g transform="translate(${SW/2},${gy+g*1.5}) rotate(-8) scale(${f2(1.6-0.6*cl(k,0,1))})" opacity="${f2(cl(k*1.4,0,1))}"><rect x="-250" y="-70" width="500" height="140" rx="12" fill="#F7EDE0" fill-opacity=".85" stroke="#C0392B" stroke-width="7"/>`+
   tx(0,-14,30,'LAST POST',{f:'IB',c:'#C0392B',ls:6})+tx(0,44,58,'14 MAR 2023',{f:'IB',c:'#C0392B'})+'</g>';}
 return s;}
// thumb from the lower right, tip at (x,y)
function thumb(x,y,o=1){if(o<=0)return '';const bx=1080+60,by=1960,a=Math.atan2(y-by,x-bx),L=Math.hypot(x-bx,y-by);
 return `<g opacity="${f2(o)}" transform="translate(${bx},${by}) rotate(${f1(a*180/Math.PI)})">`+pth(`M0,-54 L${f1(L-42)},-40 Q${f1(L+4)},-36 ${f1(L+4)},0 Q${f1(L+4)},36 ${f1(L-42)},40 L0,54 Z`,'#C98B6B',{w:4})+
  pth(`M${f1(L-70)},-30 Q${f1(L-18)},-30 ${f1(L-14)},0 Q${f1(L-18)},30 ${f1(L-70)},30`,'#E8B8A0',{w:2.5})+`<path d="M${f1(L-150)},-50 q8,50 0,100" stroke="#8d5a42" stroke-width="3" fill="none" opacity=".6"/></g>`;}
function thumbPath(t){const P=[[0,600,860,1],[0.3,560,740,1],[0.45,560,740,1],[0.62,560,740,1],[0.95,700,1300,1],[1.75,560,1450,1],[1.9,550,1440,1],[2.15,760,1700,1],[2.9,640,1450,1],[3.0,640,1450,1],[3.5,640,860,1],[3.8,800,1500,1],[4.4,900,1900,0],[7.2,700,1900,0],[7.5,560,1620,1],[7.95,560,850,1],[8.2,800,1800,0]];
 let i=0;while(i<P.length-2&&t>=P[i+1][0])i++;const [t0,x0,y0,o0]=P[i],[t1,x1,y1,o1]=P[i+1];const k=E.io(sg(t,t0,t1));let x=lerp(x0,x1,k),y=lerp(y0,y1,k),o=lerp(o0,o1,k);
 const press=[K.tap1,K.tap2,K.link].some(a=>t>=a&&t<a+0.09);if(press)y+=10;return [x,y,o];}
// seated figure on the parapet, side view facing left
function sitter(t){const lw=E.io(sg(t,K.lower,K.lower+0.8)),hx=lerp(600,640,lw),hy=lerp(1040,1150,lw),look=lerp(0,-8,lw);
 let s=pth('M700,1226 L600,1118 L556,1232','none',{s:'#2b2a44',w:30})+pth('M700,1226 L600,1118 L556,1232','none',{s:LN,w:3});
 s+=pth('M748,1232 Q760,1120 742,1040 Q716,1012 684,1030 Q660,1100 664,1232 Z','#D6B35A');
 s+=pth(`M720,1052 L655,1118 L${f1(hx)},${f1(hy)}`,'none',{s:'#D6B35A',w:26})+pth(`M720,1052 L655,1118 L${f1(hx)},${f1(hy)}`,'none',{s:LN,w:2.5,o:.6});
 s+=`<g transform="rotate(${f1(look)} 705 1030)"><circle cx="705" cy="985" r="44" fill="#B9785A" stroke="${LN}" stroke-width="3.5"/>`+pth('M664,975 Q668,930 712,930 Q752,934 750,990 Q744,1020 728,1030 Q734,990 712,972 Q690,962 664,975 Z','#1b120d',{w:2})+'</g>';
 const glow=1-0.7*lw;s+=`<circle cx="${f1(hx-10)}" cy="${f1(hy-20)}" r="160" fill="#CFE6FF" opacity="${f2(0.18*glow)}" filter="url(#soft)"/><circle cx="672" cy="985" r="60" fill="#CFE6FF" opacity="${f2(0.22*glow)}" filter="url(#soft4)"/>`;
 s+=`<g transform="rotate(${f1(lerp(-18,40,lw))} ${f1(hx)} ${f1(hy)})"><rect x="${f1(hx-18)}" y="${f1(hy-34)}" width="36" height="64" rx="6" fill="#151012" stroke="#000" stroke-width="2"/></g>`;
 s+=pth(`M${f1(hx-12)},${f1(hy+6)} q14,8 26,-2`,'#B9785A',{w:2.5});
 return s;}
window.render=t=>{let w='';
 const wide=E.io(sg(t,K.s5,K.s5+0.7));
 if(wide<1){ // close-up: blurred night behind the phone
  let s=`<image href="assets/pt/night_blur.png" x="${f1(-90-t*4)}" y="-160" width="1260" height="2240"/>`+`<rect width="1080" height="1920" fill="#000" opacity=".25"/>`;
  s+=`<circle cx="540" cy="900" r="700" fill="#CFE6FF" opacity=".06" filter="url(#soft)"/>`;
  // phone body
  s+=`<rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="86" fill="#141013" stroke="#000" stroke-width="3"/><rect x="${PX+6}" y="${PY+6}" width="${PW-12}" height="${PH-12}" rx="80" fill="none" stroke="#3a3238" stroke-width="3"/>`;
  s+=`<defs><clipPath id="scr"><rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="66"/></clipPath></defs><g clip-path="url(#scr)"><rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" fill="#0c0b10"/>`;
  // screens
  let scr='';const liked=t>=K.tap2;
  if(t<K.s2){scr=igPost(t,liked);const k=sg(t,K.s2-0.25,K.s2);if(k>0)scr+=`<rect width="${SW}" height="${SH}" fill="#fff" opacity="${f2(k)}"/>`;}
  else if(t<K.switch){const off=lerp(0,860,E.io(sg(t,K.scroll,K.scroll+0.55)));scr=page(t,off);}
  else{const k=E.io(sg(t,K.switch,K.switch+0.45));scr=`<g transform="translate(${f1(-SW*k)},0)">${page(t,860)}</g><g transform="translate(${f1(SW*(1-k))},0)">${profile(t)}</g>`;}
  // closing the tab: the card shrinks and flies up
  const ck=E.inC(sg(t,K.close,K.close+0.4));
  if(ck>0)scr=profile(t);if(ck>0)scr=`<rect width="${SW}" height="${SH}" fill="#0c0b10"/><g opacity="${f2(1-ck)}" transform="translate(${SW/2},${f1(SH/2-ck*900)}) scale(${f2(1-0.45*E.outC(sg(t,K.close,K.close+0.25)))}) translate(${-SW/2},${-SH/2})"><rect width="${SW}" height="${SH}" rx="60" fill="#000"/>${scr}</g>`;
  s+=`<g transform="translate(${SX},${SY})">${scr}</g></g>`;
  s+=`<rect x="${PX+PW/2-80}" y="${PY+30}" width="160" height="40" rx="20" fill="#141013"/>`;
  // DEMO tag on the phone
  s+=`<g transform="translate(${PX+PW-40},${PY+PH+40})"><rect x="-150" y="-26" width="150" height="40" rx="20" fill="#F8F5F1" opacity=".85"/>${tx(-75,2,20,'DEMO STORE',{f:'IB',c:'#3a2a20'})}</g>`;
  const [hx,hy,ho]=thumbPath(t);s+=thumb(hx,hy,ho);
  w+=`<g opacity="${f2(1-wide)}" transform="translate(540,960) scale(${f2(1-0.25*wide)}) translate(-540,-960)">${s}</g>`;}
 if(wide>0){let s=`<image href="assets/pt/night.png" x="0" y="0" width="1080" height="1920"/>`;
  // twinkle on the string lights
  for(let i=0;i<14;i++){const x=40+i*75,y=900+Math.sin(i/13*Math.PI)*70;s+=`<circle cx="${x}" cy="${f1(y)}" r="16" fill="#FFE2A0" opacity="${f2(0.18*(0.5+0.5*Math.sin(t*3+i*1.7)))}" filter="url(#soft4)"/>`;}
  s+=sitter(t);
  if(t>=K.q){const k=E.outC(sg(t,K.q,K.q+0.5));s+=`<g opacity="${f2(k)}" transform="translate(0,${f1((1-k)*14)})">`+tx(540,1470,f1(fit('Would your store pass?',80,'IB',940)),'Would your store pass?',{f:'IB',c:'#FFF6E6',sw:0})+'</g>';}
  if(t>=K.send){const k=E.outC(sg(t,K.send,K.send+0.5));s+=`<g opacity="${f2(k)}">`+tx(540,1570,f1(fit('Send this to someone who runs one.',46,'IM',900)),'Send this to someone who runs one.',{f:'IM',c:'#E9D9B4'})+'</g>';
   const pk=E.io(sg(t,K.send,K.send+1.6)),px=lerp(640,1180,pk),py=lerp(1000,300,pk)-Math.sin(pk*Math.PI)*120;
   s+=`<g transform="translate(${f1(px)},${f1(py)}) rotate(-28)" opacity="${f2(1-sg(t,K.send+1.3,K.send+1.6))}">`+pth('M-40,0 L40,-18 L-10,30 L-6,6 Z','#F4EBDD',{w:3})+pth('M-6,6 L40,-18','none',{w:2})+'</g>';}
  w+=`<g opacity="${f2(wide)}">${s}</g>`;}
 w+=`<rect width="1080" height="1920" fill="url(#vig)" opacity=".5"/><rect width="1080" height="1920" filter="url(#grain)"/>`;
 w+=`<g><rect x="56" y="92" width="258" height="72" rx="36" fill="#F8F5F1" opacity=".92"/><image href="assets/logo-ink.svg" x="80" y="107" width="210" height="42"/></g>`;
 let cur=null;for(const c of CAP)if(t>=c[0])cur=c;if(cur&&cur[1]){const p=E.outC(sg(t,cur[0],cur[0]+0.15));w+=`<g opacity="${f2(p)}" transform="translate(0,${f1((1-p)*8)})">`+tx(540,1790,f1(fit(cur[1],50,'IB',940)),cur[1],{f:'IB',c:'#FFF6E6',sw:10})+'</g>';}
 document.getElementById('root').innerHTML=w;};
window.ready=document.fonts.ready.then(()=>Promise.all(['IM','IB','HW'].map(f=>document.fonts.load(`40px ${f}`)))).then(()=>Promise.all(['pt/night.png','pt/night_blur.png','logo-ink.svg'].map(n=>new Promise(r=>{const i=new Image();i.onload=r;i.onerror=r;i.src='assets/'+n;})))).then(()=>render(0));
