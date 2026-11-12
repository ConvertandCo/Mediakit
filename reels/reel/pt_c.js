// ===== Reel C: "Nobody came" (painted lane). Timed to the script; re-time to the VO later =====
const K={a:0.2,shut:0.3,bulb:1.1,nobody:1.6,leaf:1.8,s2:3.3,pull:3.3,sign0:6.0,phone:7.6,s3:9.8,board:9.8,feed:10.2,people:12.0,s4:14.0,push:14.0,friend:15.5,s5:17.3,eve:17.3,talk:19.0,s6:20.4,end:20.4};
const END=22.0,S=[0,K.s2,K.s3,K.s4,K.s5,K.s6];
const CAP=[[0.2,'You built the store.'],[1.6,'Nobody came.'],[3.0,''],[3.4,'Picture a shop in a lane nobody walks down,'],[6.0,'with no signboard.'],[7.6,'Your Shopify store is that shop.'],
 [9.8,'Your signboard is showing up, every day,'],[12.0,'where your buyers already scroll.'],[14.0,'Then give your first customers'],[15.5,'a reason to bring a friend.'],[17.3,'A store doesn’t get found.'],[19.0,'It gets talked about.'],[20.4,'']];
const SFX=[[0,'amb',-37],[0.3,'shutter',-18],[1.1,'click1',-21],[1.8,'rustle',-24],[3.3,'wl',-19],[6.0,'trace',-24],[7.6,'move',-21],[9.8,'thud',-18],[10.3,'soft',-29],[11.0,'soft',-29],[11.7,'soft',-29],[12.4,'soft',-29],
 [12.2,'step',-26],[12.7,'step',-27],[13.2,'step',-26],[13.7,'step',-27],[14.0,'wl',-21],[15.6,'pop',-24],[17.3,'ting2',-30],[17.45,'ting3',-31],[19.0,'bub',-26],[19.35,'bub',-27],[19.7,'bub',-28],[20.4,'whoosh',-24],[20.75,'accept',-23]];
const f1=n=>Math.round(n*10)/10,f2=n=>Math.round(n*100)/100,E={outC:x=>1-Math.pow(1-x,3),io:x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,inC:x=>x*x*x,bk:x=>{const c1=1.7,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);}};
const sg=(t,a,b)=>cl((t-a)/(b-a)),pop=(t,a,d=0.4)=>t<a?0:cl(E.bk(sg(t,a,a+d)),0,1.2);
const LN='#1d130c';const _cv=document.createElement('canvas').getContext('2d');const fit=(txt,s,f,mw)=>{_cv.font=`${s}px ${f}`;const w=_cv.measureText(txt).width;return w>mw?s*mw/w:s;};
const tx=(x,y,s,txt,{f='IB',c='#FFF6E6',a='middle',o=1,st=LN,sw=0,ls=0}={})=>o<=0.004?'':`<text x="${f1(x)}" y="${f1(y)}" font-family="${f}" font-size="${s}" fill="${c}" text-anchor="${a}" opacity="${f2(o)}" ${sw?`stroke="${st}" stroke-width="${sw}" paint-order="stroke" stroke-linejoin="round"`:''} ${ls?`letter-spacing="${ls}"`:''}>${txt}</text>`;
const pth=(d,fill,{s=LN,w=3.5,o=1}={})=>`<path d="${d}" fill="${fill}" stroke="${s}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" opacity="${f2(o)}"/>`;
// villagers / shoppers drawn in the painted style: flat fill, thin dark line
function folk(x,y,s,col,t,{ph=0,walk=false,o=1,hair='#1b120d',back=true}={}){const st=walk?Math.sin(t*7+ph):0,bob=walk?Math.abs(st)*5:Math.sin(t*1.5+ph)*1.2;
 return `<g transform="translate(${f1(x)},${f1(y-bob*s)}) scale(${f2(s)})" opacity="${f2(o)}">`+
  `<ellipse cx="0" cy="2" rx="40" ry="9" fill="#000" opacity=".25"/>`+
  pth(`M-12,-80 L${f1(-14+st*10)},0`,'none',{w:9,s:'#2b2018'})+pth(`M12,-80 L${f1(14-st*10)},0`,'none',{w:9,s:'#2b2018'})+
  pth('M-36,-78 Q-40,-160 -24,-188 Q0,-200 24,-188 Q40,-160 36,-78 Z',col)+
  pth(`M-32,-170 Q${f1(-52+st*6)},-120 ${f1(-40+st*8)},-92`,'none',{w:10,s:col})+pth(`M32,-170 Q${f1(52-st*6)},-120 ${f1(40-st*8)},-92`,'none',{w:10,s:col})+
  `<circle cx="0" cy="-218" r="27" fill="#B9785A" stroke="${LN}" stroke-width="3.5"/>`+(back?pth('M-27,-222 Q-26,-250 0,-250 Q26,-250 27,-222 Q14,-232 0,-230 Q-14,-232 -27,-222 Z',hair,{w:2}):'')+'</g>';}
const depthS=y=>0.8+(y-1450)/1250*2.0;
function feedTile(x,y,k,i){return `<g transform="translate(${f1(x)},${f1(y)})" opacity="${f2(k)}">`+`<rect x="-70" y="-90" width="140" height="180" rx="16" fill="#F4EBDD" stroke="${LN}" stroke-width="3"/>`+
 `<rect x="-58" y="-78" width="116" height="110" rx="8" fill="${['#4F8580','#B9946A','#C98B3A','#A9502E'][i%4]}"/>`+`<rect x="-40" y="-60" width="80" height="22" rx="4" fill="#F4EBDD" opacity=".9"/>`+
 pth('M-40,62 C-58,44 -50,30 -40,40 C-30,30 -22,44 -40,62 Z','#E8775A',{w:2.4})+tx(-20,60,22,String(12+i*7),{f:'IM',c:'#3a2a20',a:'start'})+'</g>';}
// camera: world point (cx,cy) to screen centre at scale z
const camT=(z,cx,cy)=>`translate(540,960) scale(${(z*1000|0)/1000}) translate(${f1(-cx)},${f1(-cy)})`;
const motes=[...Array(26)].map((_,i)=>[180+((i*97)%560),520+((i*173)%900),i*1.7]);
window.render=t=>{let w='';
 // camera path
 let z=1,cx=540,cy=960;
 if(t>=K.pull){const k=E.io(sg(t,K.pull,K.pull+2.3));z=lerp(1,0.55,k);cy=lerp(960,1150,k);}
 if(t>=K.sign0&&t<K.push){const k=E.io(sg(t,K.sign0,K.sign0+1.2));z=lerp(0.55,0.6,k);cy=lerp(1150,1100,k);}
 if(t>=K.push){const k=E.io(sg(t,K.push,K.push+1.8));z=lerp(0.6,0.95,k);cy=lerp(1100,1180,k);}
 z*=1+0.012*Math.sin(t*0.5);
 const eve=E.io(sg(t,K.eve,K.eve+1.2));
 let world=`<image href="assets/pt/lane.png" x="-660" y="-700" width="2400" height="3600"/>`;
 // bulb
 const bulbOn=t>=K.bulb?(t<K.bulb+0.25?(Math.sin(t*90)>0?1:0.3):1):0;
 world+=`<circle cx="540" cy="845" r="${f1(150+eve*90)}" fill="url(#bulb)" opacity="${f2(bulbOn*(0.55+eve*0.4))}"/><path d="M540,770 V832" stroke="#1a110c" stroke-width="3"/><circle cx="540" cy="842" r="11" fill="${bulbOn?'#FFE2A8':'#6a5a48'}"/>`;
 // shutter rolling up
 const sb=lerp(1340,790,E.io(sg(t,K.shut,K.shut+0.9)));let sh=`<rect x="214" y="752" width="652" height="${f1(sb-752)}" fill="#7D8B8A" stroke="${LN}" stroke-width="3"/>`;
 for(let y=764;y<sb-6;y+=18)sh+=`<path d="M214,${y} H866" stroke="#4c5757" stroke-width="4" opacity=".8"/>`;sh+=`<rect x="210" y="${f1(sb-8)}" width="660" height="14" fill="#3d4444"/>`;
 world+=`<g>${sh}</g>`+`<rect x="196" y="722" width="688" height="38" fill="#58625f" stroke="${LN}" stroke-width="3"/>`;
 // signboard: empty frame, then the board drops
 const bk=t>=K.board?E.bk(sg(t,K.board,K.board+0.45)):0,by=lerp(-500,560,cl(bk,0,1.1));
 if(t<K.board)world+=`<rect x="250" y="560" width="580" height="130" fill="#000" fill-opacity=".1" stroke="#3a2618" stroke-width="7"/>`;
 else world+=`<g transform="translate(0,${f1(by-560)})"><rect x="246" y="556" width="588" height="138" rx="6" fill="#E9D9B4" stroke="#3a2618" stroke-width="7"/><rect x="262" y="572" width="556" height="106" rx="4" fill="none" stroke="#B5462E" stroke-width="4"/>`+
   tx(540,648,68,'YOUR STORE',{f:'IB',c:'#B5462E',ls:6})+`</g>`;
 if(t>=K.sign0&&t<K.board){const k=E.outC(sg(t,K.sign0,K.sign0+0.5));world+=`<rect x="236" y="546" width="608" height="158" rx="20" fill="none" stroke="#FFE3A3" stroke-width="8" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="${f2(1-k)}" opacity=".9"/>`;}
 // people
 let ppl=[];
 if(t>=K.people){const list=[[380,0,'#C8553D'],[700,0.7,'#6E8F6A'],[470,1.4,'#D6B35A'],[640,2.0,'#7A6AA8'],[330,2.6,'#4F8580']];
  list.forEach(([xt,d,c],i)=>{const k=sg(t,K.people+d,K.people+d+2.6);if(k<=0)return;const y=lerp(2850,1470+i*6,E.outC(k)),x=lerp(xt>540?900:180,xt,E.outC(k));ppl.push([y,folk(x,y,depthS(y),c,t,{ph:i,walk:k<1})]);});}
 if(t>=K.friend){const k=sg(t,K.friend,K.friend+1.6);const y=lerp(2850,1520,E.outC(k));const s=depthS(y);
  ppl.push([y,folk(560-46*s,y,s,'#E8775A',t,{ph:3,walk:k<1})+folk(560+46*s,y,s,'#98B5D9',t,{ph:3.4,walk:k<1})+`<path d="M${f1(560-14*s)},${f1(y-95*s)} L${f1(560+14*s)},${f1(y-95*s)}" stroke="#B9785A" stroke-width="${f1(10*s)}" stroke-linecap="round"/>`]);
  if(t>=K.friend+0.1){const hk=pop(t,K.friend+0.1);ppl.push([y+1,`<g transform="translate(560,${f1(y-300*s)}) scale(${f2(hk*s*0.7)})">`+pth('M0,30 C-50,-10 -40,-60 0,-30 C40,-60 50,-10 0,30 Z','#E8775A',{w:3})+'</g>']);}}
 ppl.sort((a,b)=>a[0]-b[0]).forEach(p=>world+=p[1]);
 // talk bubbles in the evening
 if(t>=K.talk){[[420,1250,0],[640,1230,0.35],[540,1180,0.7]].forEach(([x,y,d])=>{const k=pop(t,K.talk+d);if(k<=0)return;world+=`<g transform="translate(${x},${y}) scale(${f2(k)})">`+pth('M-60,-34 Q-60,-60 -30,-60 H30 Q60,-60 60,-34 V-6 Q60,18 30,18 H0 L-20,40 L-16,18 H-30 Q-60,18 -60,-6 Z','#F4EBDD',{w:3})+
  [-22,0,22].map(dx=>`<circle cx="${dx}" cy="-21" r="6" fill="#3a2a20"/>`).join('')+'</g>';});}
 // sunlight (day) and fairy lights (evening)
 world+=`<path d="M-40,560 L170,430 L470,1460 L60,1460 Z" fill="#FFEFC6" opacity="${f2((0.30+0.03*Math.sin(t*0.7))*(1-eve))}" style="mix-blend-mode:screen" filter="url(#soft2)"/>`;
 world+=`<rect x="-660" y="-700" width="2400" height="3600" fill="#1b1030" opacity="${f2(eve*0.5)}" style="mix-blend-mode:multiply"/>`;
 if(eve>0){let L='';for(let i=0;i<22;i++){const x=-200+i*68,y=470+Math.sin((i/21)*Math.PI)*90,on=0.55+0.45*Math.sin(t*3+i*1.3);const c=['#FFD27A','#FF8A6B','#9BE0C8','#FFE9B0'][i%4];
   L+=`<circle cx="${x}" cy="${f1(y)}" r="16" fill="${c}" opacity="${f2(eve*on*0.35)}" filter="url(#soft4)"/><circle cx="${x}" cy="${f1(y)}" r="6" fill="${c}" opacity="${f2(eve*on)}"/>`;}
  world+=`<path d="M-200,470 Q${540},${470+180} 1300,470" stroke="#140c08" stroke-width="3" fill="none" opacity="${f2(eve)}"/>`+L+`<circle cx="540" cy="1050" r="420" fill="url(#bulb)" opacity="${f2(eve*0.35)}"/>`;}
 // leaf blowing past (nobody came)
 if(t>=K.leaf&&t<K.leaf+2.2){const k=sg(t,K.leaf,K.leaf+2.2),x=lerp(-100,1200,k),y=1380+Math.sin(k*9)*40;world+=`<g transform="translate(${f1(x)},${f1(y)}) rotate(${f1(k*720)})">`+pth('M0,-14 Q14,0 0,14 Q-14,0 0,-14 Z','#9A6A2E',{w:2})+'</g>';}
 // dust motes (day)
 motes.forEach(([mx,my,ph])=>{const x=mx+Math.sin(t*0.4+ph)*30,y=my-((t*14+ph*30)%120);world+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.4" fill="#FFF3D8" opacity="${f2((.25+.25*Math.sin(t*1.3+ph))*(x<560?1:.3)*(1-eve))}"/>`;});
 let scene=`<g transform="${camT(z,cx,cy)}">${world}</g>`;
 // phone frame: the lane becomes a store inside a phone
 const pk=t>=K.phone&&t<K.push+0.8?E.io(sg(t,K.phone,K.phone+0.7))*(1-E.io(sg(t,K.push,K.push+0.8))):0;
 if(pk>0){const x=lerp(0,200,pk),y=lerp(0,250,pk),W=lerp(1080,680,pk),H=lerp(1920,1380,pk),r=lerp(0,70,pk);
  scene=`<defs><clipPath id="phc"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(W)}" height="${f1(H)}" rx="${f1(r)}"/></clipPath></defs><rect width="1080" height="1920" fill="#2a1e17"/>`+
   `<rect width="1080" height="1920" fill="url(#vig)"/>`;
  // feed tiles scrolling past on both sides
  if(t>=K.feed){const fk=cl(sg(t,K.feed,K.feed+0.4))*(1-sg(t,K.push,K.push+0.5));for(let i=0;i<8;i++){const yy=1700-(((t-K.feed)*260+i*250+(i%2?120:0))%1500);const ek=fk*cl((yy-230)/120)*cl((1640-yy)/120);scene+=feedTile(i%2?998:82,yy,ek,i);}}
  scene+=`<g clip-path="url(#phc)"><g transform="${camT(z,cx,cy)}">${world}</g></g>`+
   `<rect x="${f1(x-14)}" y="${f1(y-14)}" width="${f1(W+28)}" height="${f1(H+28)}" rx="${f1(r+14)}" fill="none" stroke="#151012" stroke-width="${f1(28*pk)}"/>`+
   `<rect x="${f1(x+W/2-70)}" y="${f1(y+14)}" width="140" height="34" rx="17" fill="#151012" opacity="${f2(pk)}"/>`;}
 w+=scene;
 // end card
 if(t>=K.end){const k=E.io(sg(t,K.end,K.end+0.5));w+=`<rect width="1080" height="1920" fill="#120c09" opacity="${f2(k)}"/>`+
  tx(540,900,40,'PART TWO',{f:'IM',c:'#C9A579',o:sg(t,K.end+0.3,K.end+0.7),ls:10})+tx(540,1000,84,'They walk in.',{o:sg(t,K.end+0.35,K.end+0.8)})+tx(540,1100,84,'And walk out.',{o:sg(t,K.end+0.6,K.end+1.0),c:'#E8775A'})+
  tx(540,1230,40,'Tomorrow',{f:'HW',c:'#C9A579',o:sg(t,K.end+0.8,K.end+1.2)});}
 w+=`<rect width="1080" height="1920" fill="url(#vig)" opacity=".55"/><rect width="1080" height="1920" filter="url(#grain)"/>`;
 // logo + caption
 w+=`<g><rect x="56" y="92" width="258" height="72" rx="36" fill="#F8F5F1" opacity=".92"/><image href="assets/logo-ink.svg" x="80" y="107" width="210" height="42"/></g>`;
 let cur=null;for(const c of CAP)if(t>=c[0])cur=c;if(cur&&cur[1]&&t<K.end){const p=E.outC(sg(t,cur[0],cur[0]+0.15));w+=`<g opacity="${f2(p)}" transform="translate(0,${f1((1-p)*8)})">`+tx(540,1770,f1(fit(cur[1],46,'IB',940)),cur[1],{f:'IB',c:'#FFF6E6',sw:10})+'</g>';}
 document.getElementById('root').innerHTML=w;};
window.ready=document.fonts.ready.then(()=>Promise.all(['IM','IB','HW'].map(f=>document.fonts.load(`40px ${f}`)))).then(()=>Promise.all(['pt/lane.png','logo-ink.svg'].map(n=>new Promise(r=>{const i=new Image();i.onload=r;i.onerror=r;i.src='assets/'+n;})))).then(()=>render(0));
