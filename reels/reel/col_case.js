// ===== Reel B v2: "Closes the tab" as a detective's case board (paper collage). Timed to the script; re-time to the VO later =====
const K={a:0,tap1:0.45,tap2:0.62,love:1.4,toB:2.0,p2:2.2,rev:3.6,toC:4.8,p3:4.8,date:6.2,str:6.4,close:7.6,stamp:7.9,rip:8.4,s5:9.2,q:9.4,send:11.0},END=13.0;
CAP=[[0.2,'Found it on Instagram.'],[1.4,'Love it.'],[2.2,'Opens the website.'],[3.6,'No reviews.'],[4.8,'Checks their Instagram.'],[6.2,'Last post: 2023.'],[7.6,'Closes the tab.'],[9.0,'']];
const SFX=[[0.45,'click',-22],[0.62,'click',-22],[0.66,'pop',-23],[1.4,'pop',-24],[2.0,'whoosh',-23],[2.5,'rustle',-29],[3.6,'move',-24],[3.95,'thud',-25],[4.8,'whoosh',-23],[5.2,'rustle',-29],
 [6.2,'trace',-23],[6.45,'trace',-27],[7.6,'wl',-19],[7.9,'hit',-16],[8.4,'rustle',-21],[9.2,'whoosh',-24],[9.45,'pop',-25],[11.0,'whoosh',-23],[11.15,'soft',-27]];
const RED='#C0392B',MAN='#E3C58E';
// ---------- props ----------
function candleP(x,y,s=1){return `<g transform="translate(${f1(x)},${f1(y)}) scale(${f2(s)})"><ellipse cx="0" cy="-70" rx="70" ry="70" fill="#FFD27A" opacity=".35"/>`+
 `<path d="M-90,-10 Q-95,70 -55,78 H55 Q95,70 90,-10 Z" fill="#B4573A"/><rect x="-98" y="-22" width="196" height="22" rx="6" fill="#C9694A"/><ellipse cx="0" cy="-20" rx="82" ry="12" fill="#F1E6CE"/>`+
 `<path d="M0,-28 V-52" stroke="#2E2A25" stroke-width="3"/><path d="M0,-92 Q14,-66 0,-52 Q-14,-66 0,-92 Z" fill="#FFC23A" stroke="#E07B2C" stroke-width="2"/></g>`;}
function heartP(x,y,s,c=RED){return `<g transform="translate(${f1(x)},${f1(y)}) scale(${f2(s)})">`+stick(`<path d="M0,30 C-50,-10 -40,-60 0,-30 C40,-60 50,-10 0,30 Z" fill="${c}"/>`)+'</g>';}
function igPost(t){const liked=t>=K.tap2;let s=`<rect width="400" height="790" fill="#fff"/>`+T(24,60,22,'Instagram',{f:'HW',c:INK});
 s+=`<circle cx="44" cy="112" r="20" fill="#B4573A"/>`+T(76,120,19,'wickandclay',{f:'IB',c:INK});
 s+=`<rect x="0" y="146" width="400" height="400" fill="#EBD9BB"/><rect x="0" y="400" width="400" height="146" fill="#D5B98F"/>`+candleP(200,410,1.25);
 const hk=t>=K.tap2?clamp(E.bk(seg(t,K.tap2,K.tap2+0.3)),0,1.2)*(1-seg(t,K.tap2+0.6,K.tap2+0.9)):0;if(hk>0)s+=`<g opacity=".95">${heartP(200,340,hk*2.4,'#fff')}</g>`;
 s+=`<g transform="translate(36,586) scale(.55)"><path d="M0,30 C-50,-10 -40,-60 0,-30 C40,-60 50,-10 0,30 Z" fill="${liked?RED:'none'}" stroke="${liked?RED:INK}" stroke-width="6"/></g>`+T(24,650,18,liked?'1,205 likes':'1,204 likes',{f:'IB',c:INK});
 s+=T(24,680,17,'Hand-poured clay pot candles.',{f:'IR',c:INK})+`<rect x="100" y="706" width="200" height="50" rx="25" fill="${INK}"/>`+T(200,738,19,'Shop now ›',{f:'IB',c:'#fff',a:'middle'});
 return s;}
function browser(t){let s=stick(`<rect x="-380" y="-500" width="760" height="1000" fill="#fff"/>`)+`<rect x="-380" y="-500" width="760" height="70" fill="#ECEAE4"/>`+
 [0,1,2].map(i=>`<circle cx="${-345+i*28}" cy="-465" r="9" fill="${['#E86B5F','#F4C14F','#5FC26A'][i]}"/>`).join('')+`<rect x="-240" y="-484" width="560" height="40" rx="20" fill="#fff"/>`+T(40,-457,20,'wickandclay.store',{f:'IR',c:'#666',a:'middle'});
 s+=`<rect x="-340" y="-400" width="320" height="320" fill="#EBD9BB"/>`+candleP(-180,-210,1.0);
 s+=T(10,-350,40,'Clay Pot Candle',{f:'IB',c:INK})+T(10,-295,38,'₹1,299',{f:'IB',c:OR})+`<rect x="10" y="-250" width="330" height="70" rx="10" fill="${INK}"/>`+T(175,-205,26,'Add to cart',{f:'IB',c:'#fff',a:'middle'});
 s+=`<rect x="-340" y="-30" width="680" height="3" fill="#e5e1d8"/>`+revBlock(0,0,1);
 for(let i=0;i<5;i++)s+=`<rect x="-340" y="${250+i*44}" width="${i%2?520:680}" height="16" rx="6" fill="#EEEAE2"/>`;
 return s;}
function revBlock(x,y,s){let r=`<g transform="translate(${x},${y}) scale(${s})">`+T(-340,40,34,'Customer reviews (0)',{f:'IB',c:INK});
 for(let i=0;i<5;i++){let d='';for(let j=0;j<10;j++){const a=-Math.PI/2+j*Math.PI/5,rr=j%2?11:24;d+=(j?'L':'M')+f1(-318+i*58+Math.cos(a)*rr)+','+f1(100+Math.sin(a)*rr);}r+=`<path d="${d}Z" fill="#EEE9DF" stroke="#b9b2a5" stroke-width="2.5"/>`;}
 return r+T(-340,175,30,'No reviews yet',{f:'IB',c:INK})+T(-340,212,22,'Be the first to write a review',{f:'IR',c:'#777'})+'</g>';}
function igGrid(t){let s=stick(`<rect x="-360" y="-400" width="720" height="820" fill="#fff"/>`);
 s+=`<circle cx="-270" cy="-310" r="56" fill="#B4573A"/>`+T(-190,-322,32,'wickandclay',{f:'IB',c:INK})+T(-190,-282,22,'9 posts · 312 followers',{f:'IR',c:'#666'});
 const cols=['#C9A27A','#B4573A','#D9C3A0','#8E6E4E','#E0B979','#A9502E','#CDB08A','#9a7a58','#E9D6B8'],g=224;
 for(let i=0;i<9;i++){const x=-340+(i%3)*(g+4),y=-220+Math.floor(i/3)*(g+4);s+=`<rect x="${x}" y="${y}" width="${g}" height="${g}" fill="${cols[i]}"/>`;if(i%2===0)s+=`<g opacity=".75">${candleP(x+g/2,y+g*0.66,0.6)}</g>`;}
 s+=`<rect x="-340" y="-220" width="680" height="680" fill="#9b958c" opacity=".45" style="mix-blend-mode:saturation"/><rect x="-340" y="-220" width="680" height="680" fill="#F3EEE4" opacity=".28"/>`;
 s+=`<rect x="-332" y="-206" width="150" height="40" rx="6" fill="#fff" opacity=".92"/>`+T(-257,-178,22,'14 Mar 2023',{f:'IB',c:INK,a:'middle'});
 return s;}
function evTag(x,y,rot,n,txt,k){if(k<=0)return '';return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${f2(clamp(k,0,1.2))})">`+stick(`<path d="M-170,-60 H150 L190,0 L150,60 H-170 Z" fill="${MAN}"/>`)+`<circle cx="160" cy="0" r="10" fill="#6b5534"/>`+
 T(-150,-14,22,`EVIDENCE #${n}`,{f:'LB',c:'#6b4a1f',ls:3})+T(-150,36,38,txt,{f:'HW',c:INK})+'</g>';}
function magnifier(x,y,rot,lensInner=''){const id='lens'+(UID++);return `<g transform="translate(${f1(x)},${f1(y)})"><clipPath id="${id}"><circle cx="0" cy="0" r="118"/></clipPath>`+
 (lensInner?`<g clip-path="url(#${id})"><circle r="118" fill="#fff"/>${lensInner}</g>`:'')+`<circle r="118" fill="#cfe8ff" opacity=".18"/>`+
 `<g filter="url(#shd)"><circle r="124" fill="none" stroke="#2E2A25" stroke-width="20"/><g transform="rotate(${rot})"><rect x="128" y="-20" width="190" height="40" rx="18" fill="#6b3f22"/><rect x="118" y="-14" width="30" height="28" fill="#2E2A25"/></g></g>`+
 `<path d="M-70,-60 Q-40,-95 10,-100" stroke="#fff" stroke-width="10" fill="none" opacity=".55" stroke-linecap="round"/></g>`;}
const string=(x1,y1,x2,y2,k)=>k<=0?'':`<path d="M${x1},${y1} Q${(x1+x2)/2},${(y1+y2)/2+60} ${f1(lerp(x1,x2,k))},${f1(lerp(y1,y2,k)+Math.sin(k*Math.PI)*40*(1-k))}" stroke="${RED}" stroke-width="5" fill="none"/>`;
// board positions (world)
const A=[540,860],B=[1640,1020],C=[1120,2240];
function cork(){let s='';for(let i=-1;i<3;i++)for(let j=-1;j<3;j++)s+=`<image href="assets/bg_cork.jpg" x="${i*1200}" y="${j*2040}" width="1200" height="2040" preserveAspectRatio="none"/>`;return s;}
function board(t){let w=cork();
 // scraps of red string already on the board (it's a case in progress)
 w+=`<path d="M-200,300 Q300,420 640,260" stroke="${RED}" stroke-width="5" fill="none" opacity=".8"/>`+pin(640,260,RED);
 // A: phone with the post
 w+=phone(A[0],A[1],1.15,igPost(t),-3)+pin(A[0],A[1]-470);
 const fy=t<K.tap1?lerp(980,870,E.outC(seg(t,0,K.tap1))):870,pr=[K.tap1,K.tap2].some(a=>t>=a&&t<a+0.1)?1:0;if(t<K.toB)w+=finger(A[0]+20,fy,1-seg(t,K.love,K.toB),pr);
 if(t>=K.love)w+=heartP(A[0]+250,A[1]-330,pp(t,K.love)*1.5);
 // B: the website, which later gets ripped off the board
 const rk=E.inC(seg(t,K.rip,K.rip+0.55));
 w+=`<g transform="translate(${f1(B[0]+rk*120)},${f1(B[1]+rk*1500)}) rotate(${f1(rk*24)})">${browser(t)}</g>`;if(rk<0.05)w+=pin(B[0],B[1]-490);
 w+=evTag(B[0]-160,B[1]+560,-4,1,'No reviews',pp(t,K.rev+0.35));
 // C: their Instagram, gone quiet
 w+=`<g transform="translate(${C[0]},${C[1]}) rotate(3)">${igGrid(t)}</g>`+pin(C[0],C[1]-395);
 if(t>=K.date)w+=loop(t,K.date,C[0]-250,C[1]-196,120,46,RED,7);
 w+=evTag(C[0]+260,C[1]+520,4,2,'Last post 2023',pp(t,K.date+0.25));
 // red string: evidence 1 -> evidence 2
 w+=string(B[0]-160,B[1]+560,C[0]+260,C[1]+520,E.outC(seg(t,K.str,K.str+0.6)));
 if(t>=K.str)w+=pin(B[0]-160,B[1]+560,RED)+(t>=K.str+0.6?pin(C[0]+260,C[1]+520,RED):'');
 // magnifier travels with the camera's subject
 let mx,my,lens='';
 if(t<K.toB){mx=A[0]+230;my=A[1]-120+Math.sin(t*2)*10;}
 else if(t<K.toC){const k=E.io(seg(t,K.rev-0.2,K.rev+0.3));mx=lerp(B[0]+260,B[0]-80,k);my=lerp(B[1]-200,B[1]+110,k);
  const k2=seg(t,K.rev,K.rev+0.3);if(k2>0)lens=`<g opacity="${f2(k2)}" transform="translate(${f1((B[0]-mx)*1.7)},${f1((B[1]-my)*1.7)}) scale(1.7)">${revBlock(0,0,1)}</g>`;}
 else{const k=E.io(seg(t,K.toC+0.2,K.date));mx=lerp(B[0]-80,C[0]-160,k);my=lerp(B[1]+110,C[1]-120,k);}
 if(t<K.close+0.3)w+=magnifier(mx,my,40,lens);
 return w;}
function cam(t){const kf=[[0,A[0],A[1]+40,1.0],[K.toB,A[0],A[1]+40,1.0],[K.toB+0.5,B[0],B[1]+80,1.0],[K.rev,B[0],B[1]+80,1.0],[K.rev+0.4,B[0]-60,B[1]+250,1.18],[K.toC,B[0]-60,B[1]+250,1.18],[K.toC+0.55,C[0],C[1]+40,1.0],[K.close,C[0],C[1]+40,1.0],[K.close+0.45,1090,1580,0.55],[99,1090,1580,0.53]];
 let i=0;while(i<kf.length-2&&t>=kf[i+1][0])i++;const [t0,x0,y0,z0]=kf[i],[t1,x1,y1,z1]=kf[i+1];const k=E.io(seg(t,t0,t1));return [lerp(x0,x1,k),lerp(y0,y1,k),lerp(z0,z1,k)*(1+0.01*Math.sin(t*1.3))];}
function s1(t){const [x,y,z]=cam(t);let s=`<g transform="translate(540,960) scale(${f3(z)}) translate(${f1(-x)},${f1(-y)})">${board(t)}</g>`;
 // opening note so frame one already says "investigation"
 s+=note(t,-2.0,90,250,'Before they buy…',{s:58,rot:-4,out:K.toB-0.3});
 // CASE CLOSED stamp, screen space, slams down
 if(t>=K.stamp){const k=seg(t,K.stamp,K.stamp+0.18),sh=t<K.stamp+0.35?Math.sin(t*90)*8*(1-seg(t,K.stamp+0.18,K.stamp+0.35)):0;
  s=`<g transform="translate(${f1(sh)},0)">${s}</g>`+`<g transform="translate(540,900) rotate(-12) scale(${f2(lerp(2.6,1,E.inC(k)))})" opacity="${f2(clamp(k*2))}"><rect x="-380" y="-120" width="760" height="240" rx="18" fill="none" stroke="${RED}" stroke-width="16"/><rect x="-360" y="-100" width="720" height="200" rx="10" fill="none" stroke="${RED}" stroke-width="5"/>`+T(0,48,128,'CASE CLOSED',{f:'SF',c:RED,a:'middle',ls:4})+'</g>';}
 return s+logo(true);}
function s5(t){let s=bg('bg_cork.jpg');
 const k=E.outC(seg(t,K.s5,K.s5+0.5));
 s+=`<g transform="translate(${f1(lerp(1500,540,k))},940) rotate(${f1(lerp(20,-3,k))})">`+stick(`<path d="M-380,-420 H-120 L-80,-470 H380 V420 H-380 Z" fill="${MAN}"/>`)+`<path d="M-380,-380 H380" stroke="#c9a868" stroke-width="4"/>`+
  T(-330,-300,30,'CASE FILE',{f:'LB',c:'#6b4a1f',ls:6})+T(-330,-200,96,'YOUR STORE',{f:'SF',c:INK})+
  `<rect x="-330" y="-140" width="500" height="6" fill="#6b4a1f" opacity=".5"/>`+T(-330,-60,34,'Reviews:  ?',{f:'HW',c:INK})+T(-330,10,34,'Last post:  ?',{f:'HW',c:INK})+T(-330,80,34,'Photos:  ?',{f:'HW',c:INK})+'</g>';
 s+=magnifier(lerp(1300,700,E.io(seg(t,K.s5+0.3,K.s5+1.2))),lerp(1500,1150,E.io(seg(t,K.s5+0.3,K.s5+1.2))),40);
 s+=note(t,K.q,90,240,'Would your store pass?',{s:64,rot:-3});
 if(t>=K.send){s+=note(t,K.send,150,1440,'Send this to someone who runs one.',{s:42,rot:2,c:'#fff'});
  const pk=E.io(seg(t,K.send,K.send+1.4)),px=lerp(100,1200,pk),py=lerp(1580,1300,pk)-Math.sin(pk*Math.PI)*260;
  s+=`<g transform="translate(${f1(px)},${f1(py)}) rotate(-18)">`+stick(`<path d="M-60,0 L60,-26 L-14,44 L-8,8 Z" fill="#fff"/><path d="M-8,8 L60,-26" stroke="#ccc" stroke-width="3"/>`)+'</g>';}
 return s+logo(true);}
S=[0,K.s5];SC=[s1,s5];
