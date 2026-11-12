// ===== Reel 19 — The power of 9 (price endings), paper-collage style. Corrected to the real study ($34 / $39 / $44) =====
const K={raise:0.1,from:1.5,up:3.7,third:4.7,s2:5.9,tried:6.1,nob:7.9,than:9.0,s3:10.5,same:10.7,more:12.2,diff:13.0,s4:15.2,ending:15.4,deal:16.6,isnt:17.4,s5:18.8,test:19.0,keep:20.6,prem:21.5,save:22.6,fill:23.1},END=24.2;
CAP=[[0.1,'A catalogue raised a dress'],[1.5,'from $34 to $39.'],[3.4,''],[3.7,'Sales went up…'],[4.7,'by about a third.'],[5.8,''],
 [6.1,'Then they tried $44.'],[7.6,''],[7.9,'Sales were no better'],[9.0,'than at $34.'],[10.3,''],
 [10.7,'Same dress. Higher price.'],[12.2,'More sales.'],[13.0,'The difference? It ended in nine.'],[15.0,''],
 [15.4,'A price ending in nine'],[16.6,'says “deal.”'],[17.4,'Even when it isn’t one.'],[18.6,''],
 [19.0,'Test ₹499 on value products.'],[20.6,'Keep round prices'],[21.5,'for premium ones.'],[22.6,'Save this.'],[23.4,'']];
function dress(cx,cy,s=1){return `<g transform="translate(${cx},${cy}) scale(${s})">`+`<path d="M0,-300 Q0,-340 24,-340 Q44,-340 44,-320" fill="none" stroke="#8a8780" stroke-width="10" stroke-linecap="round"/><path d="M-170,-250 L0,-300 L170,-250" fill="none" stroke="#8a8780" stroke-width="12" stroke-linecap="round"/>`+
  stick(`<path d="M-80,-262 Q0,-210 80,-262 L130,-160 L96,-120 L180,330 Q0,370 -180,330 L-96,-120 L-130,-160 Z" fill="#2F5D8C"/>`)+
  `<path d="M-96,-120 Q0,-90 96,-120" stroke="#21476e" stroke-width="10" fill="none"/>`+[...Array(9)].map((_,i)=>`<circle cx="${-120+(i%3)*120+(Math.floor(i/3)%2)*60}" cy="${-40+Math.floor(i/3)*120}" r="12" fill="#F4F3EF" opacity=".75"/>`).join('')+'</g>';}
function hangTag(x,y,rot,txt,str=0,{c='#F3EEE2'}={}){return `<path d="M${x-160},${y-120} Q${x-90},${y-40} ${x-30},${y-10}" fill="none" stroke="#7a7268" stroke-width="3"/>`+priceTag(x+60,y,rot,txt,{s:0.85,c})+(str>0?stroke(1,0,`M${x-50},${y-10} L${f1(x-50+200*str)},${y+16}`,OR,10,0.01):'');}
// ---------- scene 1: $34 -> $39, sales up a third ----------
function s1(t){let s=bg('bg_grid.jpg');const z=1+0.03*seg(t,0,K.s2);s+=`<g transform="translate(540,960) scale(${f3(z)}) translate(-540,-960)">`;
  s+=sc(400,700,pp(t,0,0.45),dress(400,720,1));
  const fl=seg(t,K.from+0.6,K.from+0.9),str=E.outC(seg(t,K.from+0.1,K.from+0.45));
  if(fl<0.5)s+=`<g transform="translate(800,560) scale(1,${f2(1-fl*2)}) translate(-800,-560)">${hangTag(740,560,10,'$34',str)}</g>`;
  else s+=`<g transform="translate(800,560) scale(1,${f2((fl-0.5)*2)}) translate(-800,-560)">${hangTag(740,560,10,'$39',0,{c:YEL})}</g>`;
  // demand as paper bags: 6 -> 8
  for(let i=0;i<8;i++){const k=i<6?pp(t,K.up-0.2+i*0.05):pp(t,K.third+0.1+(i-6)*0.12);const x=170+i*105;if(k>0)s+=sc(x,1330,k,pBag(x,1330,0.95,i<6?'#C9A06A':OR,(i%3-1)*4));}
  s+=note(t,K.third+0.4,580,1420,'+⅓ sales',{s:56,rot:-3});
  s+='</g>';return s+logo(false);}
// ---------- scene 2: the three prices side by side ----------
function s2(t){let s=bg('bg_cork.jpg')+logo(true);const X=[230,540,850],P=['$34','$39','$44'],N=[6,8,6],T0=[K.s2+0.1,K.s2+0.35,K.tried+0.2];
  X.forEach((x,c)=>{s+=sc(x,380,pp(t,T0[c]),priceTag(x-20,380,-4+c*4,P[c],{s:0.62,c:c===1?YEL:'#F3EEE2'})+pin(x-80,330));
    for(let i=0;i<N[c];i++){const k=pp(t,T0[c]+0.25+i*0.08,0.3);if(k>0){const y=1440-i*100;s+=sc(x,y,k,pBag(x,y,0.85,c===1&&i>=6?OR:'#C9A06A',(i%2?3:-3)));}}});
  if(t>=K.nob){const k=E.io(seg(t,K.nob,K.nob+0.6)),y=1440-5*100-62;s+=dashLine(110,lerp(110,980,k),y,1,YEL,6);s+=note(t,K.than,560,520,'= same as $34',{s:48,rot:4});}
  s+=srcLine(t,K.s2+0.3,1590,'ANDERSON & SIMESTER · WOMEN’S CLOTHING CATALOGUE TEST · QME (2003)');
  s+=T(540,230,30,'bags = relative sales',{f:'HW',c:'#d9d2c3',a:'middle',o:seg(t,K.s2+0.6,K.s2+0.9)});
  return s;}
// ---------- scene 3: it ended in nine ----------
function s3(t){let s=bg('bg_grid.jpg');const bob=Math.sin(t*1.6)*3;
  s+=sc(540,820,pp(t,K.s3,0.45),`<g transform="rotate(${f2(-5+bob)} 540 820)">${priceTag(520,820,0,'$39',{s:2.0,c:YEL})}</g>`);
  s+=note(t,K.same,90,260,'same dress',{s:52,rot:-4})+note(t,K.same+0.8,640,300,'higher price ↑',{s:46,rot:5})+note(t,K.more,120,1240,'more sales ↑',{s:52,rot:-3});
  if(t>=K.diff){s+=loop(t,K.diff+0.2,640,810,110,120,OR,10);s+=note(t,K.diff+0.6,560,1200,'it ended in 9',{s:58,rot:3});}
  return s+logo(false);}
// ---------- scene 4: "deal" ----------
function s4(t){let s=bg('bg_yellow.jpg');s+=sc(540,820,pp(t,K.s4,0.4),priceTag(520,820,-3,'₹499',{s:1.9,fs:70,f:'IB'}));
  if(t>=K.deal){const k=seg(t,K.deal,K.deal+0.18),z=lerp(2.2,1,E.outC(k));s+=`<g transform="translate(700,600) rotate(-14) scale(${f2(z)})" opacity="${f2(clamp(k*3))}"><rect x="-170" y="-70" width="340" height="140" rx="12" fill="none" stroke="${OR}" stroke-width="10"/>`+T(0,32,96,'DEAL',{f:'MK',c:OR,a:'middle'})+'</g>';}
  if(t>=K.isnt){s+=note(t,K.isnt+0.1,160,1180,'…it’s ₹1 less than 500',{s:46,rot:-3,c:'#fff'});}
  return s+logo(false);}
// ---------- scene 5: value vs premium ----------
function giftBox(x,y){return stick(`<rect x="${x-110}" y="${y-60}" width="220" height="170" fill="#2E2A25"/><rect x="${x-125}" y="${y-100}" width="250" height="56" fill="#3a352f"/>`)+`<rect x="${x-14}" y="${y-100}" width="28" height="210" fill="#D4AF37"/><path d="M${x},${y-100} Q${x-70},${y-170} ${x-50},${y-110} M${x},${y-100} Q${x+70},${y-170} ${x+50},${y-110}" fill="none" stroke="#D4AF37" stroke-width="12"/>`;}
function s5(t){let s=bg('bg_grid.jpg');s+=`<line x1="540" y1="260" x2="540" y2="1440" stroke="${INK}" stroke-width="4" stroke-dasharray="18 14" opacity=".6"/>`;
  s+=sc(290,700,pp(t,K.test),jar(290,720,2.2)+priceTag(270,1040,-4,'₹499',{s:0.75,f:'IB',fs:68})+T(290,360,44,'value',{f:'HW',c:INK,a:'middle'}));
  if(t>=K.test+0.5)s+=tick(t,K.test+0.5,420,520,40,OR,12);
  s+=sc(790,700,pp(t,K.keep),giftBox(790,720)+priceTag(770,1040,4,'₹2,000',{s:0.75,f:'IB',fs:60})+T(790,360,44,'premium',{f:'HW',c:INK,a:'middle'}));
  if(t>=K.prem)s+=tick(t,K.prem,930,520,40,OR,12);
  s+=T(790,1180,30,'example prices',{f:'HW',c:'#8a877f',a:'middle',o:seg(t,K.keep,K.keep+0.3)});
  s+=savePill(t,K.save,K.fill,390,1480);
  return s+logo(false);}
S=[0,K.s2,K.s3,K.s4,K.s5];SC=[s1,s2,s3,s4,s5];
