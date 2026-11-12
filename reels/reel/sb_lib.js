const INK='#5B3A2E',IVORY='#F8F5F1',SKY='#E7EEFA',TERRA='#EC9369',LILAC='#C1A4CD',BLUE='#98B5D9',BUTTER='#E2D486',SAGE='#B1BF78',PEACH='#F3B8A8',TAN='#B99673',ROSE='#E1B4BD',STONE='#B7AF98',GOLD='#E8B84A';
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp=(a,b,x)=>a+(b-a)*x,seg=(t,a,b)=>clamp((t-a)/(b-a));
const E={outC:x=>1-Math.pow(1-x,3),out4:x=>1-Math.pow(1-x,4),inC:x=>x*x*x,io:x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,bk:x=>{const c1=1.7,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);}};
const f1=n=>Math.round(n*10)/10,f2=n=>Math.round(n*100)/100;const pop=(t,a,d=0.4)=>t<a?0:clamp(E.bk(seg(t,a,a+d)),0,1.2);
let K={},CAP=[],S=[0],SC=[],FISH=0,RACK=0;
const _cv=document.createElement('canvas').getContext('2d');
function T(x,y,s,txt,{f='IM',c=INK,a='middle',o=1,mw=0,rot=0,st='',sw=0}={}){if(o<=0.004)return '';if(mw){_cv.font=`${s}px ${f}`;const w=_cv.measureText(txt).width;if(w>mw)s=s*mw/w;}
  return `<text x="${f1(x)}" y="${f1(y)}" font-family="${f}" font-size="${f1(s)}" fill="${c}" text-anchor="${a}" opacity="${f2(o)}" ${rot?`transform="rotate(${rot} ${f1(x)} ${f1(y)})"`:''} ${st?`stroke="${st}" stroke-width="${sw}" paint-order="stroke" stroke-linejoin="round"`:''}>${txt.replace(/&/g,'&amp;')}</text>`;}
// thin warm-charcoal ink; optional pencil hatch on shaded faces
const P=(d,fill,sw=3.4,h=0)=>`<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`+(h?`<path d="${d}" fill="url(#${h===2?'hatch2':'hatch'})"/>`:'');
const R=(x,y,w,h,fill,rx=6,sw=3.4,hh=0)=>P(`M${x+rx},${y} H${x+w-rx} Q${x+w},${y} ${x+w},${y+rx} V${y+h-rx} Q${x+w},${y+h} ${x+w-rx},${y+h} H${x+rx} Q${x},${y+h} ${x},${y+h-rx} V${y+rx} Q${x},${y} ${x+rx},${y} Z`,fill,sw,hh);
function cam(z,cx,cy,inner,rot=0){return `<g transform="translate(540,960) rotate(${f2(rot)}) scale(${f2(z*1000)/1000}) translate(${f1(-cx)},${f1(-cy)})">${inner}</g>`;}
function caption(t){let cur=null;for(const [a,x] of CAP)if(t>=a)cur=[a,x];if(!cur||!cur[1])return '';const p=E.outC(seg(t,cur[0],cur[0]+0.12));
  return `<g opacity="${f2(p)}" transform="translate(0,${f1((1-p)*8)})">${T(540,1680,42,cur[1],{f:'IM',c:'#3E3533',st:'#FBF8F2',sw:9,mw:820})}</g>`;}
function logo(){return `<g><rect x="56" y="92" width="258" height="72" rx="36" fill="${IVORY}" stroke="${INK}" stroke-width="3"/><image href="assets/logo-ink.svg" x="80" y="107" width="210" height="42"/></g>`;}
function star(cx,cy,r,fill,sw=2.6){let d='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*0.46:r;d+=(i?'L':'M')+f1(cx+Math.cos(a)*rr)+','+f1(cy+Math.sin(a)*rr);}return P(d+'Z',fill,sw);}
function stars(cx,cy,n,r=18,gap=42){let s='';for(let i=0;i<5;i++)s+=star(cx+(i-2)*gap,cy,r,i<n?GOLD:'#EFE9DD');return s;}
function contact(cx,cy,rx,ry=14){return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#shade)"/>`;}
// pointing hand from above (same build as Reel 08, storybook palette)
function hand(x,y,rot,s=1){const SK=PEACH;
  const curl=(cx,cy,w,h)=>P(`M${cx-w/2},${cy-h/2+w/2} q0,${-w/2} ${w/2},${-w/2} q${w/2},0 ${w/2},${w/2} l0,${h-w} q0,${w/2} ${-w/2},${w/2} q${-w/2},0 ${-w/2},${-w/2} Z`,SK,3)+P(`M${cx-w*0.3},${cy+h*0.08} q${w*0.3},${w*0.18} ${w*0.6},0`,'none',2.2);
  return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${f1(rot)}) scale(${f2(s)}) translate(46,-6)">`+
   P('M-130,-900 L170,-900 L160,-330 Q20,-300 -120,-330 Z',LILAC,3.4,1)+P('M-125,-345 Q20,-318 165,-345 L170,-300 Q20,-275 -130,-300 Z','#D4BEDC')+
   P('M-110,-300 Q-128,-220 -110,-162 Q-60,-122 40,-130 Q122,-138 140,-200 Q150,-262 140,-300 Z',SK)+
   P('M-112,-252 Q-162,-212 -140,-168 Q-120,-140 -96,-160 Q-88,-200 -98,-238 Z',SK)+P('M-142,-186 q8,10 22,6','none',2.2)+
   P('M-104,-176 L-102,-44 Q-100,-6 -70,-4 Q-40,-6 -38,-44 L-40,-176 Z',SK)+P('M-94,-112 q24,7 46,0 M-92,-78 q22,6 42,0','none',2.2)+
   P('M-84,-42 Q-84,-20 -70,-18 Q-56,-20 -56,-42 Q-70,-50 -84,-42 Z','#FBEDE6',2.6)+curl(-6,-160,50,78)+curl(46,-156,50,74)+curl(94,-160,44,64)+'</g>';}
// tiny shoppers: round heads, simple bodies, readable gestures
function person(x,y,c,t,{ph=0,s=1,o=1,walk=false,face=0,q=false}={}){const b=walk?Math.abs(Math.sin(t*9+ph))*6:Math.sin(t*2+ph)*1.5;
  let h=`<g transform="translate(${f1(x)},${f1(y-b)}) scale(${f2(s)})" opacity="${f2(o)}">`+contact(0,14,22,6)+P('M-17,0 Q-21,-48 0,-52 Q21,-48 17,0 Z',c,3)+`<circle cx="0" cy="-67" r="16" fill="${PEACH}" stroke="${INK}" stroke-width="3"/>`+
    `<circle cx="${-5+face*4}" cy="-69" r="2.2" fill="${INK}"/><circle cx="${5+face*4}" cy="-69" r="2.2" fill="${INK}"/><path d="M-9,0 L-10,14 M9,0 L10,14" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  if(q)h+=`<g transform="translate(18,-104)">${P('M0,0 q-4,-30 26,-30 q30,0 26,30 q-4,22 -26,22 l-10,10 l2,-12 q-14,-6 -18,-20 Z',IVORY,2.6)}${T(26,-2,30,'?',{f:'HW'})}</g>`;
  return h+'</g>';}
function signBoard(x,y,txt,{c=IVORY,s=34,w=null}={}){const W=w||txt.length*s*0.5+40;return R(x-W/2,y-34,W,62,c,10,3)+T(x,y+8,s,txt,{f:'HW'})+P(`M${x-W*0.3},${y+28} L${x-W*0.3},${y+70} M${x+W*0.3},${y+28} L${x+W*0.3},${y+70}`,'none',3);}

function render(t){let i=0;while(i<S.length-1&&t>=S[i+1])i++;const b=Math.floor(t*8)%3;FISH=0;RACK=0;
  const pin=i>0?1+0.02*(1-E.io(seg(t,S[i],S[i]+0.45))):1;
  const body=SC[i](t);
  document.getElementById('fishD').setAttribute('scale',f1(280*FISH));document.getElementById('rackB').setAttribute('stdDeviation',f1(RACK));
  let inner=`<g filter="url(#ink${b})"><g transform="translate(540,960) scale(${f2(pin*1000)/1000}) translate(-540,-960)">${body}</g></g>`;
  if(RACK>0.05)inner=`<g filter="url(#rack)">${inner}</g>`;
  let out=FISH>0.01?`<g filter="url(#fish)">${inner}</g><rect x="0" y="0" width="1080" height="1920" fill="url(#lensV)" opacity="${f2(FISH*0.45)}"/>`:inner;
  out+=`<image href="assets/paper_wc.jpg" x="0" y="0" width="1080" height="1920" style="mix-blend-mode:multiply"/>`;
  out+=logo()+caption(t);
  document.getElementById('g').innerHTML=out;}
window.render=render;
window.ready=document.fonts.ready.then(()=>Promise.all(['IM','IB','HW','MK'].map(f=>document.fonts.load(`40px ${f}`)))).then(()=>Promise.all(['paper_wc.jpg','logo-ink.svg','fisheye_map.png'].map(n=>new Promise(r=>{const i=new Image();i.onload=r;i.onerror=r;i.src='assets/'+n;})))).then(()=>render(0));
