// ===== Reel 18 — 0.1 seconds (site speed), paper-collage style. Timed to the script; retime to the VO later =====
const K={zero:0.1,eight:1.9,s2:4.4,study:4.6,mob:6.3,tenth:7.2,saw:8.6,rise:9.7,s3:11.2,img:11.4,apps:12.4,slid:13.5,cut:15.0,s4:16.0,mid:16.0,data:17.2,wait:18.3,they:19.2,save:20.2,fill:20.7},END=21.8;
CAP=[[0.1,'Zero point one seconds.'],[1.9,'That’s what 8% more'],[3.0,'conversions looked like.'],[4.3,''],
 [4.6,'In a Deloitte study for Google,'],[6.3,'a mobile site just'],[7.2,'a tenth of a second faster'],[8.6,'saw retail conversions'],[9.7,'rise by 8.4%.'],[11.0,''],
 [11.4,'Heavy images.'],[12.4,'Apps you forgot.'],[13.5,'Sliders nobody watches.'],[14.8,''],
 [15.2,'Open your store'],[16.0,'on a mid-range phone,'],[17.2,'on mobile data.'],[18.3,'If you’re waiting,'],[19.2,'so are they.'],[20.2,'Save this.'],[21.0,'']];
// ---------- scene 1: a stopwatch, one tick ----------
function stopwatch(cx,cy,r,ang,sweep){let s=stick(`<rect x="${cx-34}" y="${cy-r-70}" width="68" height="56" rx="10" fill="#d8d6d0"/><rect x="${cx+r*0.62}" y="${cy-r*0.86}" width="44" height="34" rx="8" fill="#d8d6d0" transform="rotate(42 ${cx+r*0.62} ${cy-r*0.86})"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#F7F5EF"/>`);
  s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="12"/>`;
  for(let i=0;i<60;i++){const a=i/60*Math.PI*2,l=i%5?16:34;s+=`<line x1="${f1(cx+Math.sin(a)*(r-24))}" y1="${f1(cy-Math.cos(a)*(r-24))}" x2="${f1(cx+Math.sin(a)*(r-24-l))}" y2="${f1(cy-Math.cos(a)*(r-24-l))}" stroke="${INK}" stroke-width="${i%5?3:6}"/>`;}
  if(sweep>0){const a=sweep*Math.PI*2*0.1,R=r-60;s+=`<path d="M${cx},${cy} L${cx},${cy-R} A${R},${R} 0 0 1 ${f1(cx+Math.sin(a)*R)},${f1(cy-Math.cos(a)*R)} Z" fill="${OR}" opacity=".85"/>`;}
  const a=ang*Math.PI/180;s+=`<line x1="${cx}" y1="${cy}" x2="${f1(cx+Math.sin(a)*(r-50))}" y2="${f1(cy-Math.cos(a)*(r-50))}" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="18" fill="${INK}"/>`;
  return s;}
function s1(t){let s=bg('bg_grid.jpg');const sw=E.io(seg(t,K.zero+0.3,K.zero+0.9)),ang=36*sw;
  const z=1+0.03*seg(t,0,K.s2);s+=`<g transform="translate(540,960) scale(${f3(z)}) translate(-540,-960)">`;
  s+=`<g transform="translate(540,700) scale(${f2(pp(t,0,0.4))}) translate(-540,-700)">${stopwatch(540,700,330,ang,sw)}</g>`;
  s+=note(t,K.zero+0.9,610,310,'0.1 s',{s:84,rot:6,f:'MK'});
  // 12 bags become 13 (≈ +8%)
  for(let i=0;i<13;i++){const x=150+i*65,k=i<12?pp(t,K.eight-0.3+i*0.04):pp(t,K.eight+0.9);if(k>0)s+=sc(x,1300,k,pBag(x,1300,0.75,i<12?'#C9A06A':OR,(i%3-1)*3));}
  s+=note(t,K.eight+1.1,330,1400,'+8% conversions',{s:50,rot:-3});
  s+='</g>';return s+logo(false);}
// ---------- scene 2: the study, pinned clipping + two honest bars ----------
function s2(t){let s=bg('bg_cork.jpg')+logo(true);const z=1+0.03*seg(t,K.s2,K.s3);s+=`<g transform="translate(540,960) scale(${f3(z)}) translate(-540,-960)">`;
  const ck=pp(t,K.study,0.4);s+=sc(540,430,ck,`<g transform="rotate(-2 540 430)">`+stick(`<path d="M140,240 L940,236 L930,620 L150,628 Z" fill="#F1ECDD"/>`,false)+
    T(540,320,50,'Milliseconds Make Millions',{f:'SF',c:INK,a:'middle'})+T(540,368,23,'Deloitte, commissioned by Google · mobile site speed, 2020',{f:'IR',c:'#555',a:'middle'})+
    [430,470,510,550,590].map((y,i)=>`<rect x="190" y="${y}" width="${700-(i*61)%180}" height="12" rx="6" fill="#d9d3c4"/>`).join('')+pin(170,262)+pin(910,258)+'</g>');
  // bars: today vs 0.1 s faster (8.4% taller)
  const g=E.io(seg(t,K.mob,K.mob+0.8)),g2=E.io(seg(t,K.tenth,K.tenth+0.9)),B=1470,H=480;
  if(g>0)s+=stick(`<rect x="230" y="${f1(B-H*g)}" width="220" height="${f1(H*g)}" fill="#E8E2D2"/>`)+T(340,B+50,32,'today',{f:'HW',c:'#F4F3EF',a:'middle'});
  if(g2>0){const h=H*g2*(1+0.084*E.io(seg(t,K.rise,K.rise+0.5)));s+=stick(`<rect x="630" y="${f1(B-h)}" width="220" height="${f1(h)}" fill="#E8E2D2"/>`)+(h>H?`<rect x="630" y="${f1(B-h)}" width="220" height="${f1(h-H)}" fill="${OR}"/>`:'')+T(740,B+50,32,'0.1 s faster',{f:'HW',c:'#F4F3EF',a:'middle'});}
  if(t>=K.rise){s+=loop(t,K.rise+0.3,740,B-H-20,150,48,YEL,6);s+=T(740,B-H-110,96,'+8.4%',{f:'MK',c:YEL,a:'middle',o:E.outC(seg(t,K.rise,K.rise+0.3))});}
  if(t>=K.saw)s+=note(t,K.saw,150,780,'retail conversions',{s:44,rot:-4});
  s+='</g>'+srcLine(t,K.study+0.3,1590,'DELOITTE & 55 FOR GOOGLE · MILLISECONDS MAKE MILLIONS (2020)');return s;}
// ---------- scene 3: a balloon weighed down by dead weight ----------
function sandbag(x,y,label,rot){return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${f2(rot)})">`+stick(`<path d="M-70,-30 Q-90,60 -60,90 L60,90 Q90,60 70,-30 Q40,-60 0,-58 Q-40,-60 -70,-30 Z" fill="#B58A5A"/><path d="M-30,-56 Q0,-80 30,-56" fill="none" stroke="#6b4a2a" stroke-width="8"/>`)+
  `<path d="M-50,10 Q0,0 50,10" stroke="#8c6a43" stroke-width="3" fill="none"/>`+'</g>'+note(1,0,x-110,y+64,label,{s:34,rot:rot*0.5,w:220+Math.max(0,label.length-12)*14});}
function s3(t){let s=bg('bg_grid.jpg');const L=[['Heavy images',K.img,300],['Apps you forgot',K.apps,540],['Sliders nobody watches',K.slid,780]];
  let n=0;L.forEach(([,a])=>{n+=E.io(seg(t,a,a+0.5));});
  const cut=E.inC(seg(t,K.cut+0.35,K.cut+1.0)),by=380+130*n-1400*cut,bob=Math.sin(t*2)*8;
  // balloon
  const bx=540,byy=by+bob;let b=stick(`<path d="M${bx},${byy+300} C${bx-260},${byy+120} ${bx-260},${byy-260} ${bx},${byy-260} C${bx+260},${byy-260} ${bx+260},${byy+120} ${bx},${byy+300} Z" fill="${OR}"/>`);
  b+=`<path d="M${bx},${byy-260} C${bx-90},${byy-180} ${bx-90},${byy+160} ${bx},${byy+300} C${bx+90},${byy+160} ${bx+90},${byy-180} ${bx},${byy-260} Z" fill="${YEL}"/><path d="M${bx},${byy-260} L${bx},${byy+300}" stroke="#fff" stroke-width="10" opacity=".6"/>`;
  b+=`<path d="M${bx-60},${byy+300} L${bx-50},${byy+380} M${bx+60},${byy+300} L${bx+50},${byy+380}" stroke="${INK}" stroke-width="4"/>`+stick(`<rect x="${bx-70}" y="${byy+380}" width="140" height="90" rx="8" fill="#9C6B3E"/>`)+T(bx,byy+436,30,'your store',{f:'HW',c:'#F4F3EF',a:'middle'});
  s+=b;
  // dead weight on ropes
  L.forEach(([lab,a,x],i)=>{const k=E.bk(seg(t,a,a+0.45));if(k<=0)return;const drop=E.inC(seg(t,K.cut+0.2,K.cut+0.8))*900;const yy=byy+620+(i===1?60:0)-(1-clamp(k,0,1))*500+drop;
    if(t<K.cut+0.2)s+=`<path d="M${bx+(i-1)*50},${byy+470} L${x},${yy-60}" stroke="${INK}" stroke-width="4"/>`;s+=sandbag(x,yy,lab,(i-1)*6);});
  if(t>=K.cut&&t<K.cut+0.6){const k=seg(t,K.cut,K.cut+0.4);s+=scissors(lerp(150,930,k),byy+540,0,1.6);}
  s+=note(t,K.img-0.1,90,190,'dead weight',{s:56,rot:-4,out:K.cut});
  return s+logo(false);}
// ---------- scene 4: the slow-phone test ----------
function s4(t){let s=bg('bg_grid.jpg');const rot=t*360*0.9;
  // spinner
  let sp='';for(let i=0;i<12;i++){const a=i/12*Math.PI*2,lead=(Math.floor(t*12)%12);const o=0.2+0.8*(((i-lead+12)%12)/11);sp+=`<rect x="-16" y="-230" width="32" height="90" rx="16" fill="${INK}" opacity="${f2(o)}" transform="rotate(${f1(i*30)})"/>`;}
  s+=`<g transform="translate(540,700) scale(${f2(pp(t,K.s4))})">`+stick(`<circle r="270" fill="#F7F5EF"/>`)+sp+'</g>';
  // progress bar crawling
  const pr=0.08+0.27*seg(t,K.s4,K.they+1.5);s+=stick(`<rect x="200" y="1060" width="680" height="60" rx="30" fill="#F7F5EF"/>`)+`<rect x="210" y="1070" width="${f1(660*pr)}" height="40" rx="20" fill="${OR}"/>`+T(540,1170,34,'loading…',{f:'HW',c:'#666',a:'middle'});
  // signal sticker
  if(t>=K.data){const k=pp(t,K.data);s+=sc(860,300,k,stick(`<rect x="770" y="230" width="190" height="140" rx="16" fill="#F7F5EF"/>`)+[0,1,2,3].map(i=>`<rect x="${790+i*30}" y="${330-i*22}" width="20" height="${20+i*22}" rx="4" fill="${i<2?INK:'#d4d0c6'}"/>`).join('')+T(930,330,34,'4G',{f:'IB',c:INK,a:'end'}));}
  s+=note(t,K.mid,80,250,'mid-range phone',{s:48,rot:-4});
  // the queue gets tired and leaves
  const C=[OR,'#4F7CAC',YEL,'#7FA36B','#B07AA1'];
  for(let i=0;i<5;i++){const leave=E.inC(seg(t,K.they+i*0.12,K.they+0.9+i*0.12)),x=260+i*140+leave*900,bob=Math.abs(Math.sin(t*5+i))*(t>=K.wait?10:3);s+=mini(x,1440-bob,C[i],1.15,1-leave*0.6);}
  if(t>=K.wait&&t<K.they+0.4)s+=note(t,K.wait,640,1230,'still waiting…',{s:42,rot:3});
  s+=savePill(t,K.save,K.fill,390,1520);
  return s+logo(false);}
S=[0,K.s2,K.s3,K.s4];SC=[s1,s2,s3,s4];
