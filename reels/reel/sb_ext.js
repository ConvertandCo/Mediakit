// Reel 08 storybook look: warm palette, coral-sleeve hand, ink phone, tags, loops, save button
const CREAM='#F6F0E2',LAV='#A99BD6',LAVD='#8676BF',CORAL='#E8775A',MUST='#E9BC4F',SKY2='#BFD6EA',SAGE2='#A9C38A',SKIN='#F0B39C',SKIND='#D98F78',ROOF2='#6F86B8',BROWN='#5B3A2E',SAND='#E9DCC3';
let SID=0;
function hand(x,y,rot,s=1,press=0){
  const curl=(cx,cy,w,h)=>P(`M${cx-w/2},${cy-h/2+w/2} q0,${-w/2} ${w/2},${-w/2} q${w/2},0 ${w/2},${w/2} l0,${h-w} q0,${w/2} ${-w/2},${w/2} q${-w/2},0 ${-w/2},${-w/2} Z`,SKIN,3.5)+P(`M${cx-w*0.3},${cy+h*0.08} q${w*0.3},${w*0.18} ${w*0.6},0`,'none',2.5);
  return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${f1(rot)}) scale(${f2(s)}) translate(46,-6)">`+
   P('M-130,-900 L170,-900 L160,-330 Q20,-300 -120,-330 Z',CORAL)+P('M-125,-345 Q20,-318 165,-345 L170,-300 Q20,-275 -130,-300 Z','#F28F72')+
   P('M-110,-300 Q-128,-220 -110,-162 Q-60,-122 40,-130 Q122,-138 140,-200 Q150,-262 140,-300 Z',SKIN)+
   P('M-112,-252 Q-162,-212 -140,-168 Q-120,-140 -96,-160 Q-88,-200 -98,-238 Z',SKIN)+P('M-142,-186 q8,10 22,6','none',2.5)+
   P(`M-104,-176 L-102,-44 Q-100,-6 -70,-4 Q-40,-6 -38,-44 L-40,-176 Z`,SKIN)+P('M-94,-112 q24,7 46,0 M-92,-78 q22,6 42,0','none',2.5)+
   P('M-84,-42 Q-84,-20 -70,-18 Q-56,-20 -56,-42 Q-70,-50 -84,-42 Z','#FBE6DD',3)+
   curl(-6,-160,50,78)+curl(46,-156,50,74)+curl(94,-160,44,64)+'</g>';}
// fingertip of hand(): local (-24,-10) after the internal offset
function handAt(tx,ty,rot,s=1){const a=rot*Math.PI/180,lx=-24*s,ly=-12*s;return hand(tx-(lx*Math.cos(a)-ly*Math.sin(a)),ty-(lx*Math.sin(a)+ly*Math.cos(a)),rot,s);}
function tag(x,y,txt,c,k,rot=-4,s=40){if(k<=0)return '';_cv.font=`${s}px HW`;const w=_cv.measureText(txt).width+56;return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${rot}) scale(${f2(clamp(k,0,1.15))})">${R(-w/2,-s*0.9,w,s*1.8,c,10,3.5)}${T(0,s*0.32,s,txt,{f:'HW',c:BROWN})}</g>`;}
function ring(t,t0,cx,cy,rx,ry,c=CORAL,w=6){if(t<t0)return '';const k=E.outC(seg(t,t0,t0+0.45));
  const p=`M${f1(cx-rx*0.9)},${f1(cy-ry*0.4)} C${f1(cx-rx*1.05)},${f1(cy-ry*1.25)} ${f1(cx+rx*1.1)},${f1(cy-ry*1.2)} ${f1(cx+rx*1.02)},${f1(cy+ry*0.1)} C${f1(cx+rx*0.95)},${f1(cy+ry*1.2)} ${f1(cx-rx*1.08)},${f1(cy+ry*1.15)} ${f1(cx-rx)},${f1(cy+ry*0.05)} C${f1(cx-rx*0.95)},${f1(cy-ry*0.6)} ${f1(cx-rx*0.4)},${f1(cy-ry)} ${f1(cx+rx*0.2)},${f1(cy-ry*1.05)}`;
  return `<path d="${p}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="${f2(1-k)}"/>`;}
function inkLine(t,t0,d,c=BROWN,w=5,dur=0.35){if(t<t0)return '';const k=E.outC(seg(t,t0,t0+dur));return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="${f2(1-k)}"/>`;}
function arrowTo(t,t0,x1,y1,x2,y2,lift=60){if(t<t0)return '';const mx=(x1+x2)/2,my=Math.min(y1,y2)-lift;let s=inkLine(t,t0,`M${x1},${y1} Q${f1(mx)},${f1(my)} ${x2},${y2}`,BROWN,4.5);
  if(t>t0+0.32){const a=Math.atan2(y2-my,x2-mx),h=da=>`${f1(x2-24*Math.cos(a+da))},${f1(y2-24*Math.sin(a+da))}`;s+=`<path d="M${h(0.5)} L${x2},${y2} L${h(-0.5)}" fill="none" stroke="${BROWN}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`;}return s;}
// storybook jar of nut butter
function sbJar(x,y,s=1){return `<g transform="translate(${f1(x)},${f1(y)}) scale(${f2(s)})">`+contact(0,64,58,10)+R(-34,-86,68,26,CORAL,6,3.2)+P('M-46,-60 Q-50,-64 -40,-64 L40,-64 Q50,-64 46,-60 L50,40 Q50,62 28,62 L-28,62 Q-50,62 -50,40 Z','#C98B55',3.2,1)+
  R(-46,-28,92,44,CREAM,4,2.8)+T(0,4,26,'NUT',{f:'HW',c:BROWN})+P('M-34,-50 L-34,30','none',0)+`<path d="M-34,-48 L-34,28" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".35"/></g>`;}
// ink-drawn phone; inner is drawn in screen space (sw x sh)
function sbPhone(x,y,w,h,inner,{rot=0}={}){const id='sp'+(SID++),sw=w-32,sh=h-32;
  return `<g transform="rotate(${f2(rot)} ${f1(x+w/2)} ${f1(y+h/2)})">`+contact(x+w/2,y+h+16,w*0.55,18)+P(`M${x+w+3},${y+180} l9,0 l0,90 l-9,0 M${x-3},${y+150} l-9,0 l0,60 l9,0 M${x-3},${y+240} l-9,0 l0,60 l9,0`,'#7C7591',3)+
   R(x,y,w,h,'#4A4458',52,3.6)+R(x+7,y+7,w-14,h-14,'#2F2A38',46,2)+
   `<clipPath id="${id}"><rect x="${x+16}" y="${y+16}" width="${sw}" height="${sh}" rx="36"/></clipPath><g clip-path="url(#${id})"><rect x="${x+16}" y="${y+16}" width="${sw}" height="${sh}" fill="${CREAM}"/><g transform="translate(${x+16},${y+16})">${inner}</g></g>`+
   R(x+16,y+16,sw,sh,'none',36,3)+R(x+w/2-50,y+28,100,28,'#2F2A38',14,2)+`<circle cx="${x+w/2+30}" cy="${y+42}" r="5" fill="#6A6FA8"/>`+
   `<path d="M${x+40},${y+60} L${x+90},${y+30}" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".35"/></g>`;}
function sbSave(t,t0,t1,x,y){const p=E.bk(seg(t,t0,t0+0.35));if(t<t0)return '';const fill=t>=t1,press=t>=t1&&t<t1+0.2?1-0.08*Math.sin(seg(t,t1,t1+0.2)*Math.PI):1;
  return `<g transform="translate(${x},${y}) scale(${f2(clamp(p,0,1.15)*press)})">${R(-170,-52,340,104,fill?CORAL:CREAM,52,3.6)}`+P('M-120,-26 L-86,-26 L-86,28 L-103,14 L-120,28 Z',fill?CREAM:'none',3.4)+T(26,16,46,'Save this',{f:'HW',c:BROWN})+'</g>';}
function skyBg(c1='#F3EBDD',c2='#E8DCC6'){return `<defs><linearGradient id="bgg${SID}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect x="-1500" y="-1500" width="4080" height="5000" fill="url(#bgg${SID++})"/>`;}
function guy(x,y,c,t,o={}){return person(x,y,c,t,o);}
