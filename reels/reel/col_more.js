// extra collage props: paper bags, little cut-out people, hanging price tags, push pins
const stick=(inner,shadow=false)=>`<g filter="url(#${shadow?'shd':'cut'})">${inner}</g>`;
function pBag(x,y,s=1,c='#C9A06A',rot=0){return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${f2(rot)}) scale(${f2(s)})">`+stick(`<path d="M-34,-40 L34,-40 L40,40 L-40,40 Z" fill="${c}"/><path d="M-16,-40 Q-16,-70 0,-70 Q16,-70 16,-40" fill="none" stroke="#5a4127" stroke-width="6"/>`)+`<path d="M-34,-40 L34,-40 L36,-28 L-36,-28 Z" fill="#000" opacity=".12"/></g>`;}
function mini(x,y,c,s=1,o=1){return `<g transform="translate(${f1(x)},${f1(y)}) scale(${f2(s)})" opacity="${f2(o)}">`+stick(`<circle cx="0" cy="-92" r="22" fill="#E9B79A"/><path d="M-30,0 Q-32,-62 0,-66 Q32,-62 30,0 Z" fill="${c}"/>`)+`</g>`;}
function pin(x,y,c=OR){return `<circle cx="${x}" cy="${y}" r="13" fill="${c}" stroke="#7a2a12" stroke-width="2"/><circle cx="${x-4}" cy="${y-4}" r="4" fill="#fff" opacity=".6"/>`;}
function priceTag(x,y,rot,txt,{s=1,c='#F3EEE2',fc=INK,f='MK',fs=86}={}){return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${f2(rot)}) scale(${f2(s)})">`+stick(`<path d="M-120,-80 L110,-80 L170,0 L110,80 L-120,80 Z" fill="${c}"/>`)+`<circle cx="120" cy="0" r="14" fill="#2E2A25"/>`+T(-10,fs*0.33,fs,txt,{f,c:fc,a:'middle'})+'</g>';}
function srcLine(t,t0,y,txt,c='#d9d2c3'){return T(540,y,17,txt,{f:'LB',c,a:'middle',ls:2,o:E.outC(seg(t,t0,t0+0.4))});}
const pp=(t,a,d=0.35)=>t<a?0:clamp(E.bk(seg(t,a,a+d)),0,1.2);
const sc=(x,y,k,inner)=>k<=0?'':`<g transform="translate(${f1(x)},${f1(y)}) scale(${f2(k)}) translate(${f1(-x)},${f1(-y)})">${inner}</g>`;
