// Shared paper-collage kit (Reel 06 look): stickers, notes, marker loops, phone, compositor.
const OR='#FF5B2E',YEL='#F4D63A',INK='#1E1E1E',PAPER='#F4F3EF',FOG='#9C9A95',GRN='#2E8B57';
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp=(a,b,x)=>a+(b-a)*x,seg=(t,a,b)=>clamp((t-a)/(b-a));
const E={outC:x=>1-Math.pow(1-x,3),out4:x=>1-Math.pow(1-x,4),inC:x=>x*x*x,inQ:x=>x*x,io:x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,
 bk:x=>{const c1=1.7,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);}};
const f1=n=>Math.round(n*10)/10,f2=n=>Math.round(n*100)/100,f3=n=>Math.round(n*1000)/1000;let UID=0;
const esc=s=>s.replace(/&/g,'&amp;');
function T(x,y,s,txt,{f='IM',c=INK,a='start',o=1,ls=0}={}){if(o<=0.004)return '';
  const body=esc(txt).split('₹').map((p,i)=>i?`<tspan font-family="IB">₹</tspan>${p}`:p).join('');
  return `<text x="${f1(x)}" y="${f1(y)}" font-family="${f}" font-size="${s}" fill="${c}" text-anchor="${a}" letter-spacing="${ls}" opacity="${f2(o)}">${body}</text>`;}
function bg(name){return `<image href="assets/${name}" x="-60" y="-60" width="1200" height="2040" preserveAspectRatio="none"/>`;}
function logo(dark){return `<image href="assets/${dark?'logo-paper':'logo-ink'}.svg" x="70" y="96" width="200" height="40"/>`;}
function note(t,t0,x,y,txt,{s=46,rot=-3,w=null,c=YEL,fc=INK,f='HW',pad=26,out=null}={}){if(t<t0)return '';if(out!==null&&t>out+0.25)return '';
  let p=E.bk(seg(t,t0,t0+0.3));if(out!==null)p*=1-E.inC(seg(t,out,out+0.25));const wr=seg(t,t0+0.12,t0+0.12+Math.min(0.9,txt.length*0.035));
  const W=w||txt.length*s*0.46+pad*2,H=s*1.5,id='n'+(UID++);
  return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${rot}) scale(${f2(clamp(p,0,1.3))})"><g filter="url(#shd)"><rect x="0" y="0" width="${f1(W)}" height="${f1(H)}" fill="${c}"/></g>`+
   `<rect x="${f1(W/2-46)}" y="-14" width="92" height="28" fill="#fff" opacity=".55" transform="rotate(4 ${f1(W/2)} 0)"/>`+
   `<clipPath id="${id}"><rect x="0" y="0" width="${f1(W*wr)}" height="${f1(H)}"/></clipPath><g clip-path="url(#${id})">${T(pad,H*0.7,s,txt,{f,c:fc})}</g></g>`;}
function loop(t,t0,cx,cy,rx,ry,c=INK,w=6,d=0.45){if(t<t0)return '';const k=E.outC(seg(t,t0,t0+d));
  const p=`M${f1(cx-rx*0.9)},${f1(cy-ry*0.35)} C${f1(cx-rx*1.05)},${f1(cy-ry*1.25)} ${f1(cx+rx*1.1)},${f1(cy-ry*1.2)} ${f1(cx+rx*1.02)},${f1(cy+ry*0.1)} C${f1(cx+rx*0.95)},${f1(cy+ry*1.2)} ${f1(cx-rx*1.08)},${f1(cy+ry*1.15)} ${f1(cx-rx*1.0)},${f1(cy+ry*0.05)} C${f1(cx-rx*0.95)},${f1(cy-ry*0.6)} ${f1(cx-rx*0.4)},${f1(cy-ry*1.0)} ${f1(cx+rx*0.2)},${f1(cy-ry*1.05)}`;
  return `<path d="${p}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="${f3(1-k)}"/>`;}
function arrow(t,t0,x1,y1,x2,y2,c=INK,w=6,lift=90){if(t<t0)return '';const k=E.outC(seg(t,t0,t0+0.4)),mx=(x1+x2)/2,my=Math.min(y1,y2)-lift;
  let s=`<path d="M${x1},${y1} Q${f1(mx)},${f1(my)} ${x2},${y2}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="${f3(1-k)}"/>`;
  if(k>0.95){const a=Math.atan2(y2-my,x2-mx);const h=(da)=>`${f1(x2-30*Math.cos(a+da))},${f1(y2-30*Math.sin(a+da))}`;s+=`<path d="M${h(0.5)} L${x2},${y2} L${h(-0.5)}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;}
  return s;}
// hand-drawn strike / X / tick, drawn on with the marker
function stroke(t,t0,d,c=INK,w=8,dur=0.25){if(t<t0)return '';const k=E.outC(seg(t,t0,t0+dur));return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="${f3(1-k)}"/>`;}
function xMark(t,t0,cx,cy,r,c=OR,w=12){return stroke(t,t0,`M${cx-r},${cy-r} L${cx+r},${cy+r}`,c,w,0.18)+stroke(t,t0+0.14,`M${cx+r},${cy-r} L${cx-r},${cy+r}`,c,w,0.18);}
function tick(t,t0,cx,cy,r,c=OR,w=12){return stroke(t,t0,`M${cx-r},${cy} L${cx-r*0.3},${cy+r*0.7} L${cx+r},${cy-r*0.8}`,c,w,0.3);}
let CAP=[];
function caption(t){let cur=null;for(const [a,x] of CAP)if(t>=a)cur=[a,x];if(!cur||!cur[1])return '';const o=E.outC(seg(t,cur[0],cur[0]+0.12));
  const w=cur[1].length*20.5+60;return `<g opacity="${f2(o)}"><rect x="${f1(540-w/2)}" y="1636" width="${f1(w)}" height="66" rx="6" fill="#141414" opacity=".85"/>`+T(540,1681,35,cur[1],{f:'SF',c:'#F4F3EF',a:'middle'})+'</g>';}
function jar(x,y,s=1){return `<g transform="translate(${f1(x)},${f1(y)}) scale(${f2(s)})"><rect x="-30" y="-80" width="60" height="20" rx="5" fill="#C9472B"/><rect x="-38" y="-64" width="76" height="110" rx="20" fill="#B9773F"/><rect x="-38" y="-30" width="76" height="40" fill="#F4EBD6"/>`+T(0,-3,14,'NUT',{f:'LB',c:'#7A4A22',a:'middle',ls:2})+`<rect x="-28" y="-54" width="10" height="80" rx="5" fill="#fff" opacity=".28"/></g>`;}
// phone: inner is drawn in screen space (0..428 x 0..818), clipped to the screen
function phone(cx,cy,sc,inner,rot=0,cut=true){return `<g transform="translate(${f1(cx)},${f1(cy)}) rotate(${f2(rot)}) scale(${f3(sc)}) translate(-214,-409)"><g ${cut?'filter="url(#cut)"':''}>`+
  `<rect x="0" y="0" width="428" height="818" rx="66" fill="url(#fr)"/><rect x="7" y="7" width="414" height="804" rx="59" fill="#0b0b0c"/>`+
  `<g clip-path="url(#scr)"><rect x="14" y="14" width="400" height="790" fill="#fff"/><g transform="translate(14,14)">${inner}</g></g></g></g>`;}
function statusBar(){return T(36,38,17,'9:41',{c:'#111'})+`<rect x="140" y="12" width="120" height="34" rx="17" fill="#000"/>`+
  `<rect x="14" y="56" width="372" height="42" rx="12" fill="#EFEFED"/>`+T(200,83,15,'convertandco.com',{f:'IR',c:'#555',a:'middle'});}
function demoBadge(x=16,y=124){return `<rect x="${x}" y="${y}" width="104" height="28" rx="14" fill="#111"/>`+T(x+52,y+19,12,'DEMO STORE',{f:'LB',c:PAPER,a:'middle',ls:1.5});}
function cursor(x,y,press=0){return `<g transform="translate(${f1(x)},${f1(y)}) scale(${f2(1-0.15*press)})" filter="url(#shd)"><path d="M0,0 L0,58 L15,44 L26,70 L37,65 L26,40 L46,40 Z" fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round"/></g>`;}
function finger(x,y,o=1,press=0){return `<g opacity="${f2(o)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(34+6*press)}" fill="#fff" opacity=".35"/><circle cx="${f1(x)}" cy="${f1(y)}" r="22" fill="#fff" stroke="${INK}" stroke-width="3" opacity=".9"/></g>`;}
function scissors(x,y,rot=0,s=1){return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${f2(rot)}) scale(${f2(s)})" filter="url(#shd)"><path d="M0,0 L54,-16 M0,0 L54,16" stroke="#9aa0a6" stroke-width="7" stroke-linecap="round"/>`+
  `<circle cx="-16" cy="-14" r="13" fill="none" stroke="${OR}" stroke-width="7"/><circle cx="-16" cy="14" r="13" fill="none" stroke="${OR}" stroke-width="7"/><circle cx="0" cy="0" r="3.5" fill="#333"/></g>`;}
function dashLine(x1,x2,y,k=1,c=INK,w=5){if(k<=0)return '';return `<line x1="${x1}" y1="${f1(y)}" x2="${f1(lerp(x1,x2,k))}" y2="${f1(y)}" stroke="${c}" stroke-width="${w}" stroke-dasharray="22 14" stroke-linecap="round"/>`;}
function savePill(t,t0,t1,x=110,y=1470){const p=E.outC(seg(t,t0,t0+0.3));if(p<=0)return '';const fill=t>=t1;const press=t>=t1&&t<t1+0.2?1-0.07*Math.sin(seg(t,t1,t1+0.2)*Math.PI):1;
  return `<g transform="translate(${x},${f1(y+(1-p)*24)}) scale(${f2(press*1.15)})" opacity="${f2(p)}" filter="url(#shd)"><rect x="0" y="-48" width="300" height="96" rx="48" fill="${fill?OR:'#fff'}" stroke="${INK}" stroke-width="3"/>`+
   `<path d="M44,-24 L76,-24 L76,26 L60,13 L44,26 Z" fill="${fill?'#fff':'none'}" stroke="${fill?'#fff':INK}" stroke-width="3.5" stroke-linejoin="round"/>`+T(100,13,36,'Save this',{c:fill?'#fff':INK})+'</g>';}
// compositor: hard cuts (no flash), short punch-in on each cut, printed crosshatch screen + grain, captions on top
let S=[0],SC=[];
function render(t){UID=0;let i=0;while(i<S.length-1&&t>=S[i+1])i++;
  const pin=i>0?1+0.06*(1-E.outC(seg(t,S[i],S[i]+0.3))):1;
  let out=`<g filter="url(#soft)"><g transform="translate(540,960) scale(${f3(pin)}) translate(-540,-960)">${SC[i](t)}</g></g>`;
  const k=Math.floor(t*12)%4;
  out+=`<rect width="1080" height="1920" fill="url(#h1)"/><rect width="1080" height="1920" fill="url(#h2)"/><image href="assets/grain${k}.png" x="0" y="0" width="1080" height="1920" opacity=".12"/>`;
  out+=caption(t);
  document.getElementById('g').innerHTML=out;}
window.render=render;
const IMG=['bg_grid.jpg','bg_cork.jpg','bg_yellow.jpg','clip.png','grain0.png','grain1.png','grain2.png','grain3.png','logo-ink.svg','logo-paper.svg'];
window.ready=document.fonts.ready.then(()=>Promise.all(['ID','IR','IM','IB','LB','HW','MK','SF'].map(f=>document.fonts.load(`40px ${f}`)))).then(()=>Promise.all(IMG.map(n=>new Promise(r=>{const i=new Image();i.onload=r;i.onerror=r;i.src='assets/'+n;})))).then(()=>{if(window.render)render(0);});
