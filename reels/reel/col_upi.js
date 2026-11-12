// ===== Reel 17 — UPI first, paper-collage style. Timed to the script; retime to the VO later =====
const K={made:0.1,bn:1.0,month:2.6,s2:3.7,npci:3.9,oct:5.0,s3:6.6,trust:6.8,tap:8.2,s4:9.6,buried:9.8,cards:11.0,chk:12.2,top:13.2,icons:14.7,s5:16.5,reason:16.7,now:18.0,cod:18.7,fam:20.7,save:22.2,fill:22.7},END=23.8;
CAP=[[0.1,'Indians made over'],[1.0,'25 billion UPI payments'],[2.6,'in a single month.'],[3.5,''],[3.9,'That’s NPCI’s count'],[5.0,'for October 2026.'],[6.3,''],
 [6.8,'Your customers already trust'],[8.2,'one tap and a PIN.'],[9.4,''],[9.8,'So if UPI is buried'],[11.0,'under cards and wallets'],[12.2,'at your checkout…'],[13.2,'move it to the top.'],[14.4,''],
 [14.7,'Show the app icons they know.'],[16.3,''],[16.7,'And give one small reason'],[18.0,'to pay now,'],[18.7,'instead of cash on delivery.'],[20.3,''],[20.7,'Make paying feel familiar.'],[22.2,'Save this.'],[23.0,'']];
// ---------- scene 1: a split-flap counter rolls to 25,470,000,000 ----------
function qr(x,y,s,rot){let q=`<rect x="0" y="0" width="70" height="70" fill="#fff"/>`;const M=[[0,0],[0,46],[46,0]];M.forEach(([a,b])=>q+=`<rect x="${a+3}" y="${b+3}" width="18" height="18" fill="none" stroke="${INK}" stroke-width="4"/><rect x="${a+9}" y="${b+9}" width="6" height="6" fill="${INK}"/>`);
  for(let i=0;i<14;i++)q+=`<rect x="${28+((i*13)%34)}" y="${26+((i*7)%36)}" width="7" height="7" fill="${INK}"/>`;return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${f1(rot)}) scale(${f2(s)}) translate(-35,-35)">${stick(q)}</g>`;}
function s1(t){let s=bg('bg_grid.jpg');
  for(let i=0;i<12;i++){const ph=((t*0.18+i*0.083)%1),x=60+((i*173)%960),y=-80+ph*2100;s+=qr(x,y,0.9+((i*37)%5)*0.12,(i*47)%40-20);}
  const target='25470000000',g=E.out4(seg(t,K.made,K.made+2.2));let disp='';for(let i=0;i<target.length;i++){const d=+target[i],k=clamp(g*1.3-i*0.03);disp+=k>=1?d:Math.floor((t*30+i*3)%10);}
  const grp=disp.slice(0,2)+','+disp.slice(2,5)+','+disp.slice(5,8)+','+disp.slice(8,11);
  const W=62,x0=540-grp.length*W/2;let tiles='';for(let i=0;i<grp.length;i++){const c=grp[i],x=x0+i*W;if(c===',')tiles+=T(x+W/2,800,80,',',{f:'IB',c:INK,a:'middle'});else tiles+=`<rect x="${x+4}" y="${660}" width="${W-8}" height="160" rx="10" fill="#2E2A25"/><line x1="${x+4}" y1="740" x2="${x+W-4}" y2="740" stroke="#000" stroke-width="3"/>`+T(x+W/2,782,84,c,{f:'IB',c:'#F4F3EF',a:'middle'});}
  s+=sc(540,740,pp(t,0,0.4),stick(`<rect x="${x0-30}" y="630" width="${grp.length*W+60}" height="220" rx="18" fill="#E7E2D4"/>`)+tiles);
  s+=note(t,K.bn,120,980,'UPI payments',{s:60,rot:-3})+note(t,K.month,560,1100,'in ONE month',{s:56,rot:4});
  return s+logo(false);}
// ---------- scene 2: the month itself, torn from a calendar ----------
function s2(t){let s=bg('bg_cork.jpg')+logo(true);const k=pp(t,K.s2,0.45);
  let cal=stick(`<rect x="200" y="300" width="680" height="820" fill="#F7F5EF"/>`)+`<rect x="200" y="300" width="680" height="170" fill="${OR}"/>`+T(540,415,72,'OCTOBER 2026',{f:'SF',c:'#fff',a:'middle'})+pin(260,330)+pin(820,330);
  const D=['M','T','W','T','F','S','S'];D.forEach((d,i)=>cal+=T(260+i*93,530,30,d,{f:'IB',c:'#999',a:'middle'}));
  for(let dd=1;dd<=31;dd++){const idx=dd+2,r=Math.floor(idx/7),c=idx%7;cal+=T(260+c*93,600+r*92,40,String(dd),{f:'IM',c:INK,a:'middle'});
    if(t>=K.oct-0.4+dd*0.03)cal+=`<path d="M${242+c*93},${578+r*92} L${278+c*93},${602+r*92}" stroke="${OR}" stroke-width="5" stroke-linecap="round" opacity=".75"/>`;}
  s+=sc(540,700,k,`<g transform="rotate(-2 540 700)">${cal}</g>`);
  s+=note(t,K.oct+0.6,560,1160,'25.47 billion',{s:64,rot:-4});
  s+=srcLine(t,K.npci,1590,'NPCI DATA · REPORTED BY ENTREPRENEUR INDIA, 3 NOV 2026');return s;}
// ---------- scene 3: one tap and a PIN ----------
function finger(x,y,press){return `<g transform="translate(${f1(x)},${f1(y+18*press)})">`+stick(`<path d="M-70,0 Q-72,-90 0,-92 Q72,-90 70,0 L70,700 L-70,700 Z" fill="#E9B79A"/>`)+`<path d="M-46,-40 Q-46,-74 0,-76 Q46,-74 46,-40 Q46,-8 0,-6 Q-46,-8 -46,-40 Z" fill="#F7D9CB" stroke="#c99a84" stroke-width="3"/><path d="M-40,140 Q0,128 40,140 M-40,300 Q0,288 40,300" stroke="#c99a84" stroke-width="4" fill="none"/></g>`;}
function s3(t){let s=bg('bg_grid.jpg');const tap=K.tap,press=t>=tap&&t<tap+0.2?Math.sin(seg(t,tap,tap+0.2)*Math.PI):0,done=t>=tap+0.15;
  s+=sc(540,640,pp(t,K.s3),stick(`<circle cx="540" cy="640" r="210" fill="${done?OR:'#F7F5EF'}"/>`)+T(540,620,58,done?'Pay':'Pay',{f:'IB',c:done?'#fff':INK,a:'middle'})+T(540,690,44,'₹899',{f:'IB',c:done?'#fff':INK,a:'middle'}));
  const fy=lerp(1500,890,E.out4(seg(t,K.trust+0.2,tap)))+lerp(0,700,E.inC(seg(t,tap+0.35,tap+0.8)));s+=finger(560,fy,press);
  // four PIN dots
  for(let i=0;i<4;i++){const on=t>=tap+0.3+i*0.12;s+=`<circle cx="${405+i*90}" cy="1090" r="26" fill="${on?INK:'none'}" stroke="${INK}" stroke-width="5"/>`;}
  if(t>=tap+0.9)s+=tick(t,tap+0.9,540,1220,60,OR,14);
  s+=note(t,K.trust+0.1,90,230,'one tap + PIN',{s:58,rot:-4});
  return s+logo(false);}
// ---------- scene 4: dig UPI out from under the pile ----------
const OPTS=['Credit / debit card','Wallets','Net banking','EMI','UPI'];
function strip(x,y,label,rot,hl){return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${f2(rot)})">`+stick(`<rect x="-330" y="-56" width="660" height="112" rx="10" fill="${hl?YEL:'#F7F5EF'}"/>`)+`<circle cx="-270" cy="0" r="20" fill="none" stroke="${INK}" stroke-width="5"/>`+(hl?`<circle cx="-270" cy="0" r="10" fill="${INK}"/>`:'')+T(-226,14,40,label,{f:'IM',c:INK})+'</g>';}
function appIcon(x,y,c,k,rot){if(k<=0)return '';return sc(x,y,k,`<g transform="rotate(${rot} ${x} ${y})">`+stick(`<rect x="${x-46}" y="${y-46}" width="92" height="92" rx="24" fill="${c}"/>`)+`<path d="M${x-14},${y-20} L${x+16},${y} L${x-14},${y+20}" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g>`);}
function s4(t){let s=bg('bg_grid.jpg');const mv=E.io(seg(t,K.top,K.top+0.8)),lift=Math.sin(Math.PI*seg(t,K.top,K.top+0.8));
  const base=[[540,480,-1],[548,620,1.5],[532,760,-2],[546,900,2],[540,1150,-4]];
  // UPI first in the draw order while buried (under the others), last once it rises
  const pos=i=>{if(i===4)return [lerp(540,540,mv),lerp(1150,480,mv),lerp(-4,-1,mv)];const [x,y,r]=base[i];return [x,y+140*mv,r];};
  const draw=i=>{const [x,y,r]=pos(i);return strip(x,y,OPTS[i],r,i===4&&mv>0.5);};
  if(mv<0.5){s+=draw(4);for(let i=0;i<4;i++)s+=draw(i);s+=`<g transform="translate(560,1090) rotate(8)">`+stick(`<rect x="-300" y="-50" width="600" height="100" rx="10" fill="#E9E4D6"/>`)+T(-240,14,38,'Cash on delivery',{f:'IM',c:'#777'})+'</g>';}
  else{s+=`<g transform="translate(560,${f1(1090+140*mv)}) rotate(8)">`+stick(`<rect x="-300" y="-50" width="600" height="100" rx="10" fill="#E9E4D6"/>`)+T(-240,14,38,'Cash on delivery',{f:'IM',c:'#777'})+'</g>';for(let i=0;i<4;i++)s+=draw(i);s+=`<g transform="translate(0,${f1(-30*lift)})">${draw(4)}</g>`;}
  if(t>=K.buried&&t<K.top)s+=loop(t,K.buried+0.2,540,1150,360,80,OR,8);
  if(t>=K.top+0.8)s+=note(t,K.top+0.8,640,300,'move it to the top',{s:44,rot:4});
  // generic app icons (no brand logos) pop beside UPI
  const C=['#4F7CAC','#7B4FA3','#2E8B57'];C.forEach((c,i)=>s+=appIcon(560+i*110,480,c,pp(t,K.icons+i*0.15),(i-1)*6));
  if(t>=K.icons+0.5)s+=T(670,575,30,'the apps they already use',{f:'HW',c:INK,a:'middle',o:seg(t,K.icons+0.5,K.icons+0.8)});
  s+=note(t,K.buried,90,230,'your checkout',{s:56,rot:-4,out:K.top+0.6});
  return s+logo(false);}
// ---------- scene 5: one small reason to pay now ----------
function cash(x,y,rot){return `<g transform="translate(${x},${y}) rotate(${rot})">`+[0,1,2].map(i=>stick(`<rect x="${-150+i*8}" y="${-70-i*14}" width="300" height="140" rx="8" fill="#A9C99A"/>`)+`<circle cx="${i*8}" cy="${-i*14}" r="40" fill="none" stroke="#5e8a52" stroke-width="5"/>`+T(i*8,-i*14+16,44,'₹',{f:'IB',c:'#5e8a52',a:'middle'})).join('')+'</g>';}
function s5(t){let s=bg('bg_cork.jpg')+logo(true);
  s+=sc(300,1000,pp(t,K.s5),cash(300,1000,-6)+T(300,1140,34,'cash on delivery',{f:'HW',c:'#F4F3EF',a:'middle'}));
  if(t>=K.now){const k=pp(t,K.now,0.4);s+=sc(700,640,k,`<g transform="rotate(5 700 640)">`+stick(`<rect x="460" y="500" width="480" height="280" rx="14" fill="${YEL}"/>`)+`<rect x="478" y="518" width="444" height="244" rx="10" fill="none" stroke="${INK}" stroke-width="4" stroke-dasharray="16 10"/>`+
    T(700,610,80,'₹20 off',{f:'MK',c:INK,a:'middle'})+T(700,680,34,'when you pay by UPI',{f:'HW',c:INK,a:'middle'})+T(700,735,24,'example offer',{f:'IM',c:'#6b5d17',a:'middle'})+pin(700,505)+'</g>');}
  if(t>=K.cod)s+=arrow(t,K.cod+0.1,330,880,560,780,'#F4F3EF',7,120);
  s+=note(t,K.fam,140,1300,'Make paying feel familiar.',{s:56,rot:-3});
  s+=savePill(t,K.save,K.fill,390,1500);
  return s;}
S=[0,K.s2,K.s3,K.s4,K.s5];SC=[s1,s2,s3,s4,s5];
