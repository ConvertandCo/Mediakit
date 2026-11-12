// ===== Reel 10 — Above the fold, paper-collage style (timed to the script; retime when the VO lands) =====
const K={h1:0.1,h2:1.5,pull:1.35,line:2.0,s2:3.2,yr:3.3,n57:5.5,fold:7.2,s3:8.6,q:8.8,banner:10.4,prod:11.8,price:12.8,reason:13.5,
 s4:15.0,open:15.2,scroll:16.9,see:18.0,fix:19.0,save:20.2,fill:20.7},END=22.0;
CAP=[[0.1,'Most of your visitor’s attention'],[1.5,'never leaves the first screen.'],[3.0,''],
 [3.3,'In a 2018 eye-tracking study,'],[5.5,'57% of viewing time'],[7.2,'was above the fold.'],[8.4,''],
 [8.8,'So what’s on your first screen?'],[10.4,'A big banner…'],[11.8,'or the product,'],[12.8,'the price,'],[13.5,'and the reason to buy?'],[14.8,''],
 [15.2,'Open your store on your phone.'],[16.9,'If you have to scroll'],[18.0,'to see the price,'],[19.0,'fix that first.'],[20.2,'Save this.'],[21.0,'']];
// page space (400 x 790 screen) -> world
const ptf=(cx,cy,sc,rot=0)=>`translate(${f1(cx)},${f1(cy)}) rotate(${f2(rot)}) scale(${f3(sc)}) translate(-200,-395)`;
const wpt=(cx,cy,sc,px,py)=>({x:cx+(px-200)*sc,y:cy+(py-395)*sc});
const OUT='M66,0 H362 A66,66 0 0 1 428,66 V752 A66,66 0 0 1 362,818 H66 A66,66 0 0 1 0,752 V66 A66,66 0 0 1 66,0 Z';
const HOLE='M66,14 H362 A52,52 0 0 1 414,66 V752 A52,52 0 0 1 362,804 H66 A52,52 0 0 1 14,752 V66 A52,52 0 0 1 66,14 Z';
// detailed phone: titanium band, side buttons, visible thickness (back), glass sheen + camera island (front)
const DX=11,DY=13;
const rr=(x,y,w,h,r)=>`M${x+r},${y} H${x+w-r} A${r},${r} 0 0 1 ${x+w},${y+r} V${y+h-r} A${r},${r} 0 0 1 ${x+w-r},${y+h} H${x+r} A${r},${r} 0 0 1 ${x},${y+h-r} V${y+r} A${r},${r} 0 0 1 ${x+r},${y} Z`;
function phoneBack(cx,cy,sc,rot=0){const m='pm'+(UID++);
  const btn=(x,y,w,h)=>`<rect x="${x+DX*0.6}" y="${y+DY*0.6}" width="${w}" height="${h}" rx="3" fill="#2a2b2e"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#btn)"/>`;
  return `<g transform="translate(${f1(cx)},${f1(cy)}) rotate(${f2(rot)}) scale(${f3(sc)}) translate(-214,-409)"><mask id="${m}" maskUnits="userSpaceOnUse" x="-60" y="-60" width="560" height="960"><rect x="-60" y="-60" width="560" height="960" fill="#fff"/><path d="${HOLE}" fill="#000"/></mask>`+
   `<g filter="url(#cut)" mask="url(#${m})">`+btn(-7,150,9,46)+btn(-7,232,9,72)+btn(-7,322,9,72)+btn(426,262,9,112)+
   `<path d="${rr(DX,DY,428,818,66)}" fill="url(#th)"/><path d="${rr(DX*0.5,DY*0.5,428,818,66)}" fill="#3b3c40"/>`+
   `<path d="${OUT}" fill="#0b0b0c"/></g></g>`;}
function frame(cx,cy,sc,rot=0){return `<g transform="translate(${f1(cx)},${f1(cy)}) rotate(${f2(rot)}) scale(${f3(sc)}) translate(-214,-409)">`+
  `<path d="${OUT} ${HOLE}" fill="url(#ti)" fill-rule="evenodd"/><path d="${OUT}" fill="none" stroke="#4a4b4f" stroke-width="1.6"/>`+
  `<path d="${rr(2.5,2.5,423,813,63.5)}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.6"/>`+
  `<path d="${rr(6,6,416,806,60)} ${HOLE}" fill="#050506" fill-rule="evenodd"/><path d="${rr(6,6,416,806,60)}" fill="none" stroke="#2c2d30" stroke-width="1.2"/>`+
  `<path d="${HOLE}" fill="url(#gl)"/>`+
  `<rect x="154" y="26" width="120" height="34" rx="17" fill="#000"/><circle cx="254" cy="43" r="8" fill="#141a33"/><circle cx="254" cy="43" r="4.5" fill="#0a0d1c"/><circle cx="251.5" cy="40.5" r="2" fill="#7f8fd6" opacity=".8"/>`+
  `<rect x="164" y="796" width="100" height="5" rx="2.5" fill="#111" opacity=".55"/></g>`;}
// the store's banner (full = 620 tall; squeezes into a strip when fixed)
function banner(bh){let s=`<rect x="0" y="0" width="400" height="${f1(bh)}" fill="url(#bn)"/>`;
  if(bh>330){const o=clamp((bh-330)/200);s+=`<g opacity="${f2(o)}">`;for(let i=0;i<9;i++){const a=(i/9)*Math.PI*2+0.2;s+=`<path d="M200,${f1(bh*0.42)} L${f1(200+500*Math.cos(a))},${f1(bh*0.42+500*Math.sin(a))} L${f1(200+500*Math.cos(a+0.25))},${f1(bh*0.42+500*Math.sin(a+0.25))} Z" fill="#fff" opacity=".1"/>`;}
    s+=T(200,bh*0.30,58,'FESTIVE',{f:'MK',c:'#fff',a:'middle',ls:2})+T(200,bh*0.30+100,104,'SALE',{f:'MK',c:'#fff',a:'middle',ls:4})+T(200,bh*0.30+160,24,'UP TO 40% OFF',{f:'IB',c:'#fff',a:'middle',ls:3})+
     `<rect x="120" y="${f1(bh*0.30+200)}" width="160" height="50" rx="25" fill="#fff"/>`+T(200,bh*0.30+232,17,'SHOP NOW',{f:'IB',c:OR,a:'middle',ls:2})+'</g>';}
  else s+=T(200,bh/2+8,19,'FESTIVE SALE · UP TO 40% OFF',{f:'IB',c:'#fff',a:'middle',ls:1,o:clamp((330-bh)/120)});
  return s;}
// product block under the banner; y0 = where it starts
function product(y0,{pricePop=0,hlReason=0}={}){let s=`<rect x="0" y="${f1(y0)}" width="400" height="300" fill="url(#img)"/>`+jar(200,y0+175,1.75);
  s+=T(20,y0+346,24,'Classic nut butter',{c:'#1d1d1d'});
  s+=`<g transform="translate(20,${f1(y0+398)}) scale(${f2(1+0.25*pricePop)})">`+T(0,0,36,'₹899',{f:'IB',c:'#111'})+'</g>';
  [['Ships in 24 hrs',20,150],['COD available',182,138]].forEach(([l,x,w])=>{s+=`<rect x="${x}" y="${f1(y0+420)}" width="${w}" height="34" rx="17" fill="${hlReason?'#FFE7DE':'#F1F0EC'}" stroke="${hlReason?OR:'none'}" stroke-width="2"/>`+T(x+w/2,y0+443,14,l,{f:'IM',c:'#333',a:'middle'});});
  s+=`<rect x="20" y="${f1(y0+500)}" width="360" height="62" rx="14" fill="#111"/>`+T(200,y0+539,20,'Add to cart',{c:'#fff',a:'middle'});
  return s;}
function topBar(){return `<rect x="0" y="0" width="400" height="104" fill="#fff"/>`+T(22,38,17,'9:41',{c:'#111'})+`<rect x="140" y="12" width="120" height="34" rx="17" fill="#000"/>`+
  `<rect x="14" y="56" width="372" height="42" rx="12" fill="#EFEFED"/>`+T(200,83,15,'convertandco.com',{f:'IR',c:'#555',a:'middle'});}
// banner-first store page in page space; scroll shifts the content, the browser bar stays
function storePage(bh,scroll,opt={}){return `<g transform="translate(0,${f1(-scroll)})">`+`<g transform="translate(0,110)">${banner(bh)}</g>`+product(110+bh+30,opt)+'</g>'+topBar();}
// =================== scene 1: the first screen is a window onto a long page ===================
function s1(t){let s=bg('bg_grid.jpg');const cx=540,cy=700,sc=1.15;
  const pk=E.io(seg(t,K.pull,K.pull+1.0)),z=lerp(1.9,1,pk),fy=lerp(700,930,pk);
  s+=`<g transform="translate(540,960) scale(${f3(z)}) translate(-540,${f1(-fy)})">`;
  s+=`<g transform="${ptf(cx,cy,sc)}"><g filter="url(#cut)"><path d="M52,0 H348 A52,52 0 0 1 400,52 V1380 H0 V52 A52,52 0 0 1 52,0 Z" fill="#fff"/></g>${storePage(620,0)}`+
     `<rect x="0" y="790" width="400" height="590" fill="${PAPER}" opacity=".62"/><rect x="0" y="790" width="400" height="590" fill="url(#h1)"/></g>`;
  s+=phoneBack(cx,cy,sc)+frame(cx,cy,sc);
  // the fold: a cut line across the bottom of the first screen
  const fk=E.io(seg(t,K.line,K.line+0.6)),fyw=wpt(cx,cy,sc,0,790).y;
  if(fk>0){s+=dashLine(150,930,fyw,fk,INK,5)+scissors(lerp(150,930,fk)+10,fyw,0,1.1);}
  {const o=E.outC(seg(t,K.line+0.3,K.line+0.7));s+=T(925,1250,44,'the rest of',{f:'HW',c:'#6d6a63',a:'middle',o})+T(925,1300,44,'your page',{f:'HW',c:'#6d6a63',a:'middle',o});if(o>0.9)s+=arrow(t,K.line+0.7,880,1330,790,1400,'#6d6a63',5,-10);}
  s+='</g>';
  s+=note(t,K.line+0.2,610,170,'the first screen',{s:50,rot:4});
  if(t>=K.line+0.55)s+=arrow(t,K.line+0.55,700,260,640,380,INK,6,40);
  return s+`<g opacity="${f2(E.outC(seg(t,K.pull+0.8,K.pull+1.1)))}">${logo(false)}</g>`;}
// =================== scene 2: the study ===================
function s2(t){let s=bg('bg_cork.jpg')+logo(true);const zoom=1+0.035*seg(t,K.s2,K.s3);
  s+=`<g transform="translate(540,900) scale(${f3(zoom)}) translate(-540,-900)">`;
  const cp=E.out4(seg(t,K.s2,K.s2+0.35));
  s+=`<g transform="translate(160,${f1(230-(1-cp)*80)}) rotate(-1.5)" opacity="${f2(cp)}" filter="url(#shd)"><image href="assets/clip.png" x="0" y="0" width="760" height="980"/>`+
     T(380,90,22,'EYE-TRACKING STUDY · 2018',{f:'LB',c:'#555',a:'middle',ls:4})+T(380,170,48,'Where does the time go?',{f:'SF',c:INK,a:'middle'})+`<rect x="40" y="208" width="680" height="3" fill="#333"/>`;
  // a page-shaped bar: top share fills orange to 57%
  const bx=110,by=290,bw=260,bh=600,ap=E.bk(seg(t,K.yr+0.3,K.yr+0.65));
  s+=`<g transform="translate(${bx+bw/2},${by+bh/2}) scale(${f2(clamp(ap,0,1.15))}) translate(${-bx-bw/2},${-by-bh/2})">`+
     `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#fff" stroke="${INK}" stroke-width="4"/>`;
  for(let i=0;i<9;i++)s+=`<rect x="${bx+26}" y="${by+30+i*64}" width="${bw-52-(i%3)*40}" height="14" rx="7" fill="#E4E1D8"/>`;
  const g=E.io(seg(t,K.n57,K.n57+1.0)),hTop=bh*0.57*g;
  if(g>0)s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${f1(hTop)}" fill="${OR}" opacity=".92"/>`;
  s+='</g>';
  const n=Math.round(57*g);
  if(t>=K.n57){s+=T(560,by+190,150,n+'%',{f:'MK',c:OR,a:'middle'});s+=T(560,by+250,38,'of viewing time',{f:'HW',c:INK,a:'middle',o:E.outC(seg(t,K.n57+0.6,K.n57+0.9))});}
  if(t>=K.fold){const fk=E.io(seg(t,K.fold,K.fold+0.55)),fy=by+bh*0.57;s+=dashLine(60,700,fy,fk,INK,5)+scissors(lerp(60,700,fk)+10,fy,0,1);
    {const o=E.outC(seg(t,K.fold+0.5,K.fold+0.8));s+=`<g opacity="${f2(o)}"><rect x="410" y="${fy+40}" width="300" height="62" fill="#F3EEE2" transform="rotate(-2 560 ${fy+70})"/></g>`+T(560,fy+84,36,'everything below: 43%',{f:'HW',c:'#555',a:'middle',o});}}
  s+='</g>';
  if(t>=K.fold+0.3)s+=note(t,K.fold+0.3,600,1110,'above the fold',{s:52,rot:-4});
  s+='</g>';
  s+=T(540,1290,17,'NIELSEN NORMAN GROUP · EYE-TRACKING RESEARCH, 2018',{f:'LB',c:'#d9d2c3',a:'middle',ls:2,o:cp});
  return s;}
// =================== scene 3: banner or the reason to buy? ===================
function s3(t){let s=bg('bg_grid.jpg');const cx=540,cy=990,sc=1.3,rot=-1.5;
  const sway=Math.sin((t-K.s3)*1.3)*0.6;
  s+=`<g transform="translate(540,990) scale(${f3(1+0.025*seg(t,K.s3,K.s4))}) translate(-540,-990)">`;
  const pp=t>=K.price?Math.sin(seg(t,K.price,K.price+0.35)*Math.PI):0;
  // underneath: the fixed first screen (product, price, reason)
  s+=`<g transform="${ptf(cx,cy,sc,rot+sway)}"><clipPath id="sc3"><rect x="0" y="0" width="400" height="790" rx="52"/></clipPath><g clip-path="url(#sc3)"><rect width="400" height="790" fill="#fff"/>`+
     product(110,{pricePop:pp,hlReason:t>=K.reason})+topBar()+'</g></g>';
  s+=phoneBack(cx,cy,sc,rot+sway)+frame(cx,cy,sc,rot+sway);
  // the banner on top, until it peels off and falls out of frame
  const pk=seg(t,K.prod,K.prod+1.0);
  if(pk<1){const lift=E.io(seg(t,K.prod,K.prod+0.25)),fall=E.inQ(seg(t,K.prod+0.15,K.prod+1.0));
    s+=`<g transform="${ptf(cx,cy,sc,rot+sway)} translate(0,110) translate(${f1(60*fall)},${f1(1500*fall)}) rotate(${f2(-6*lift+28*fall)} 400 0)" ${lift>0?'filter="url(#shd)"':''}><clipPath id="bnc"><rect x="0" y="0" width="400" height="640" rx="${lift>0?6:0}"/></clipPath><g clip-path="url(#bnc)">${banner(640)}</g></g>`;}
  s+='</g>';
  s+=note(t,K.q,90,170,'What’s on your first screen?',{s:56,rot:-3,out:K.prod});
  if(t>=K.banner&&t<K.prod+0.1){const c=wpt(cx,cy,sc,200,430);s+=loop(t,K.banner+0.1,c.x,c.y,330,420,INK,7);}
  s+=note(t,K.banner+0.25,560,330,'a big banner…',{s:54,rot:5,out:K.prod});
  // labels for what should be there
  const im=wpt(cx,cy,sc,120,260),pr=wpt(cx,cy,sc,70,385),re=wpt(cx,cy,sc,120,560);
  s+=note(t,K.prod+0.55,40,620,'product',{s:48,rot:-5});if(t>=K.prod+0.75)s+=arrow(t,K.prod+0.75,150,700,f1(im.x),f1(im.y),INK,6,30);
  s+=note(t,K.price,780,1030,'price',{s:52,rot:4});if(t>=K.price+0.2)s+=arrow(t,K.price+0.2,790,1080,f1(pr.x+150),f1(pr.y),INK,6,60);
  s+=note(t,K.reason,520,1470,'reason to buy',{s:50,rot:-3});if(t>=K.reason+0.2)s+=arrow(t,K.reason+0.2,560,1470,f1(re.x+40),f1(re.y+40),INK,6,20);
  return s+logo(false);}
// =================== scene 4: the thumb test ===================
function s4(t){let s=bg('bg_grid.jpg');const cx=540,cy=880,sc=1.2;
  const inn=E.bk(seg(t,K.s4,K.s4+0.5)),py=lerp(1500,0,clamp(inn,0,1.2)),rot=lerp(8,-1,clamp(inn,0,1));
  const up=E.io(seg(t,K.scroll+0.1,K.scroll+0.9)),back=E.io(seg(t,K.fix+0.05,K.fix+0.6));
  const scroll=560*up*(1-back),bh=lerp(620,150,back);
  const pp=t>=K.see?Math.sin(seg(t,K.see,K.see+0.35)*Math.PI):0;
  s+=`<g transform="translate(0,${f1(py)})">`;
  s+=`<g transform="${ptf(cx,cy,sc,rot)}"><clipPath id="sc4"><rect x="0" y="0" width="400" height="790" rx="52"/></clipPath><g clip-path="url(#sc4)"><rect width="400" height="790" fill="#fff"/>`+
     storePage(bh,scroll,{pricePop:pp+(t>=K.fix+0.5?Math.sin(seg(t,K.fix+0.5,K.fix+0.85)*Math.PI):0)})+'</g></g>';
  s+=phoneBack(cx,cy,sc,rot)+frame(cx,cy,sc,rot);
  // fold line at the bottom of the screen
  const fyw=wpt(cx,cy,sc,0,790).y,fk=E.io(seg(t,K.open+0.5,K.open+1.0));
  if(fk>0)s+=dashLine(130,950,fyw,fk,INK,5)+scissors(lerp(130,950,fk)+10,fyw,0,1)+T(950,fyw-22,38,'fold',{f:'HW',c:INK,a:'end',o:E.outC(seg(t,K.open+0.9,K.open+1.2))});
  // finger swipes up
  if(t>=K.scroll-0.2&&t<K.scroll+1.2){const k=E.io(seg(t,K.scroll+0.1,K.scroll+0.9)),o=seg(t,K.scroll-0.2,K.scroll)*(1-seg(t,K.scroll+0.95,K.scroll+1.2));s+=finger(640,lerp(1230,640,k),o,t<K.scroll+0.15?1:0);}
  // the price was below the fold
  if(t>=K.see&&t<K.fix+0.05){const p=wpt(cx,cy,sc,70,110+620+30+398-560-12);s+=loop(t,K.see+0.1,p.x+10,p.y,120,58,OR,7);}
  if(t>=K.fix+0.6)s+=tick(t,K.fix+0.65,860,560,52,OR,13);
  s+='</g>';
  s+=note(t,K.open,110,170,'The phone test',{s:58,rot:-3,out:K.fix});
  s+=note(t,K.see+0.25,610,1405,'had to scroll?',{s:50,rot:4,out:K.fix});
  s+=note(t,K.fix+0.1,400,170,'Fix that first.',{s:62,rot:3});
  s+=savePill(t,K.save,K.fill,390,1500);
  return s+logo(false);}
S=[0,K.s2,K.s3,K.s4];SC=[s1,s2,s3,s4];
