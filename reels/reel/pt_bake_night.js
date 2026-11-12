// static painted night: balcony parapet in front, old buildings across the lane, string lights. 1080x1920.
(function(){const f1=n=>Math.round(n*10)/10;const R=document.getElementById('root');const BL=window.BLUR||0;
let defs=document.querySelector('defs');defs.insertAdjacentHTML('beforeend',`<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1430"/><stop offset=".6" stop-color="#1c2347"/><stop offset="1" stop-color="#2b2a4a"/></linearGradient>
<radialGradient id="win" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#FFD58A" stop-opacity=".9"/><stop offset="1" stop-color="#FFB04A" stop-opacity="0"/></radialGradient>
<filter id="bl" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="${BL}"/></filter>`);
const L=G(BL?{filter:'url(#bl)'}:{},R);
$('rect',{x:-40,y:-40,width:1160,height:2000,fill:'url(#sky)'},L);
for(let i=0;i<40;i++){const x=(i*157)%1080,y=(i*271)%700;$('circle',{cx:x,cy:y,r:(i%3)?1.4:2.2,fill:'#F4EBDD',opacity:.25+(i%4)*.12},L);}
// moon haze
$('circle',{cx:860,cy:260,r:60,fill:'#F4E9CF',opacity:.85},L);$('circle',{cx:860,cy:260,r:160,fill:'#F4E9CF',opacity:.08,filter:'url(#soft)'},L);
// far buildings
const bld=(x,y,w,h,c)=>{plaster(`M${x},${y} H${x+w} V1500 H${x} Z`,c,L,{dark:.6,light:.12,chips:false});};
bld(-40,560,360,0,'#2c2c45');bld(300,700,300,0,'#33304a');bld(580,480,280,0,'#2a2a42');bld(840,640,280,0,'#302d48');
// water tank + antenna
$('path',{d:'M640,420 H760 V480 H640 Z',fill:'#1f1f33',stroke:'#0d0c18','stroke-width':3},L);$('path',{d:'M110,560 V470 M90,490 H130 M95,510 H125',stroke:'#0d0c18','stroke-width':4},L);
// lit windows
[[60,640,70,90],[190,640,70,90],[60,800,70,90],[340,780,60,80],[460,780,60,80],[340,930,60,80],[620,560,60,80],[740,560,60,80],[620,700,60,80],[880,720,70,90],[1000,720,60,90],[880,880,70,90],[190,960,70,90],[740,860,60,80]].forEach(([x,y,w,h],i)=>{
 const lit=[0,2,4,6,7,9,12].includes(i);$('rect',{x,y,width:w,height:h,fill:lit?'#E9B460':'#191a2c',opacity:lit?.9:1},L);if(lit)$('rect',{x:x-40,y:y-40,width:w+80,height:h+80,fill:'url(#win)',opacity:.35},L);
 $('path',{d:`M${x+w/2},${y} V${y+h} M${x},${y+h/2} H${x+w}`,stroke:'#0e0d18','stroke-width':4},L);});
// string lights across
const sl=(x1,y1,x2,y2,s,n,ph)=>{$('path',{d:`M${x1},${y1} Q${(x1+x2)/2},${y1+s} ${x2},${y2}`,stroke:'#0b0a14','stroke-width':3,fill:'none'},L);
 for(let i=1;i<n;i++){const u=i/n,x=(1-u)*(1-u)*x1+2*u*(1-u)*(x1+x2)/2+u*u*x2,y=(1-u)*(1-u)*y1+2*u*(1-u)*(y1+s)+u*u*y2,c=['#FFD27A','#FF8A6B','#9BE0C8','#FFE9B0'][(i+ph)%4];
  $('circle',{cx:x,cy:y,r:18,fill:c,opacity:.28,filter:'url(#soft4)'},L);$('circle',{cx:x,cy:y,r:5.5,fill:c},L);}};
sl(-40,900,1120,860,140,26,0);sl(-40,1040,1120,1000,110,24,2);
// foreground: parapet wall and floor of our balcony
plaster('M-20,1250 H1100 V1940 H-20 Z','#3f5d6e',R,{dark:.7,light:.18});$('rect',{x:-20,y:1250,width:1120,height:700,fill:'#0b0f1e',opacity:.35},R);
$('path',{d:'M-20,1236 H1100 V1268 H-20 Z',fill:'#5a7484',stroke:'#0b0d18','stroke-width':4,filter:'url(#pe)'},R);
// railing posts on parapet
for(let x=20;x<1080;x+=70)$('path',{d:`M${x},1236 V1090`,stroke:'#0f1220','stroke-width':6},R);$('path',{d:'M-20,1090 H1100',stroke:'#0f1220','stroke-width':8},R);
// pot plant (tulsi)
const PL=G({},R);$('path',{d:'M110,1236 L130,1150 H230 L250,1236 Z',fill:'#9a4f35',stroke:'#140c08','stroke-width':3.5,filter:'url(#pe)'},PL);
for(let i=0;i<9;i++){const a=-1.9+i*0.22;$('path',{d:`M180,1150 Q${180+Math.cos(a)*40},${1150+Math.sin(a)*60} ${f1(180+Math.cos(a)*90)},${f1(1150+Math.sin(a)*110)}`,stroke:'#1f3a26','stroke-width':5,fill:'none'},PL);
 $('ellipse',{cx:f1(180+Math.cos(a)*92),cy:f1(1150+Math.sin(a)*112),rx:14,ry:8,fill:'#3f6a45',stroke:'#10200f','stroke-width':2,transform:`rotate(${a*57} ${f1(180+Math.cos(a)*92)} ${f1(1150+Math.sin(a)*112)})`},PL);}
$('rect',{x:0,y:0,width:1080,height:1920,filter:'url(#grain)'},R);
window.ready=document.fonts.ready;})();
