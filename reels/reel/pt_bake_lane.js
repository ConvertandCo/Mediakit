// static painted lane for "Nobody came": facade at the end of a narrow lane, side walls in perspective
(function(){const sv=document.getElementById('sv'),st=document.getElementById('stage');
const X0=-660,Y0=-700,W=2400,H=3600;st.style.width=W+'px';st.style.height=H+'px';sv.setAttribute('width',W);sv.setAttribute('height',H);sv.setAttribute('viewBox',`${X0} ${Y0} ${W} ${H}`);
const R=document.getElementById('root');
// ---- far facade (x 0..1080) ----
plaster('M-10,-720 H1090 V1460 H-10 Z','#B9946A',R,{dark:.8,light:.35});
$('rect',{x:0,y:-720,width:1080,height:2180,fill:'url(#wallshade)'},R);
[[110,452,26,260],[300,452,18,200],[820,402,22,240],[930,402,14,150],[40,-300,30,220],[700,-180,20,200]].forEach(([x,y,w,h])=>$('rect',{x,y,width:w,height:h,fill:'url(#drip)',filter:'url(#soft4)'},R));
// upper floor: balcony rail + door
const UF=G({},R);plaster('M380,-560 H700 V-200 H380 Z','#4E6E52',UF,{dark:.6,light:.25,chips:false});$('path',{d:'M540,-556 V-204',stroke:'#21160f','stroke-width':5,filter:'url(#pe)'},UF);
$('path',{d:'M330,-200 H750 V-170 H330 Z',fill:'#6b5140',filter:'url(#pe)'},UF);for(let x=345;x<740;x+=26)$('path',{d:`M${x},-170 V-80`,stroke:'#24170f','stroke-width':4},UF);$('path',{d:'M330,-80 H750',stroke:'#24170f','stroke-width':6},UF);
// windows
const W1=G({},R);plaster('M70,150 H330 V430 H70 Z','#3B2A20',W1,{dark:.5,light:.12,chips:false});$('path',{d:'M88,168 H312 V414 H88 Z',fill:'#1d130e'},W1);
$('path',{d:'M88,168 H160 V414 H88 Z',fill:'#5E7F5B',filter:'url(#pe)'},W1);for(let x=180;x<312;x+=22)$('path',{d:`M${x},170 V412`,stroke:'#120b08','stroke-width':5,filter:'url(#pe)'},W1);
$('path',{d:'M60,436 H342 L330,452 H72 Z',fill:'#6f5340',filter:'url(#pe)'},W1);
const W2=G({},R);plaster('M760,170 H960 V400 H760 Z','#6E8F6A',W2,{dark:.6,light:.25});$('path',{d:'M860,175 V395',stroke:'#2a1d17','stroke-width':4,filter:'url(#pe)'},W2);
// teal band around shop
plaster('M150,520 H930 V1360 H150 Z','#4F8580',R,{dark:.6,light:.3,chips:false});
// signboard brackets (frame drawn live)
for(const x of [270,810])$('path',{d:`M${x},540 V560 M${x-12},540 H${x+12}`,stroke:'#3a2618','stroke-width':6,filter:'url(#pe)'},R);
// shop interior
$('path',{d:'M220,760 H860 V1340 H220 Z',fill:'url(#inside)',filter:'url(#pe)'},R);
$('path',{d:'M220,760 L262,790 V1340 H220 Z',fill:'#2f4846',filter:'url(#pe)'},R);$('path',{d:'M860,760 L818,790 V1340 H860 Z',fill:'#6c9a94',filter:'url(#pe)'},R);
const IN=G({},R);$('path',{d:'M262,1000 H818',stroke:'#3b2a1f','stroke-width':8},IN);$('path',{d:'M262,860 H818',stroke:'#3b2a1f','stroke-width':7},IN);
const jar=(x,y,w,h,c)=>{$('rect',{x,y,width:w,height:h,rx:10,fill:c,opacity:.8,filter:'url(#pe)'},IN);$('rect',{x:x+6,y:y+8,width:6,height:h-20,rx:3,fill:'#fff',opacity:.3},IN);$('rect',{x:x-3,y:y-14,width:w+6,height:16,rx:4,fill:'#5a3a26'},IN)};
[[290,920,52,78,'#C98B3A'],[358,935,46,63,'#A9502E'],[420,915,56,83,'#D6B35A'],[490,930,48,68,'#7d6a32'],[640,925,50,73,'#B76A35'],[704,940,44,58,'#8F7A3B'],[760,918,54,80,'#C98B3A'],
 [300,800,44,58,'#9c4d2c'],[372,790,50,68,'#C98B3A'],[640,795,46,63,'#D6B35A'],[720,800,50,58,'#A9502E']].forEach(a=>jar(...a));
$('path',{d:'M240,1150 H840 V1340 H240 Z',fill:'#5b3b25',filter:'url(#pe)'},IN);$('path',{d:'M240,1150 H840 V1340 H240 Z',fill:'#000',filter:'url(#mot)',opacity:.6},IN);
$('path',{d:'M232,1140 H848 V1162 H232 Z',fill:'#7a5136',filter:'url(#pe)'},IN);
$('path',{d:'M196,722 H884 V760 H196 Z',fill:'#58625f',filter:'url(#pe)'},R);
// plinth
plaster('M-10,1340 H1090 V1460 H-10 Z','#8C7457',R,{dark:.8,light:.25});$('path',{d:'M-10,1340 H1090',stroke:'#2e2017','stroke-width':6,filter:'url(#pe)'},R);
// ---- perspective helpers: u 0 far..1 near, v 0 bottom..1 top ----
const VP=[540,900];const proj=(xf,yf,xn)=>{const s=(yf-VP[1])/(xf-VP[0]);return yf+s*(xn-xf);};
const LW=(u,v)=>{const x=lerp(0,-660,u),yb=lerp(1460,proj(0,1460,-660),u),yt=lerp(-720,proj(0,-720,-660),u);return [x,lerp(yb,yt,v)];};
const RW=(u,v)=>{const x=lerp(1080,1740,u),yb=lerp(1460,proj(1080,1460,1740),u),yt=lerp(-720,proj(1080,-720,1740),u);return [x,lerp(yb,yt,v)];};
const quad=(F,u0,u1,v0,v1)=>{const a=F(u0,v0),b=F(u1,v0),c=F(u1,v1),d=F(u0,v1);return `M${a} L${b} L${c} L${d} Z`;};
// ground (lane floor)
const gb=proj(0,1460,-660);plaster(`M0,1460 H1080 L1740,${gb} V2900 H-660 V${gb} Z`,'#6B5A48',R,{dark:.8,light:.2});
$('path',{d:`M0,1460 H1080 L1740,${gb} V2900 H-660 V${gb} Z`,fill:'#120b07',opacity:.25},R);
// drain line down the middle
$('path',{d:`M540,1460 L540,2900`,stroke:'#2a1d14','stroke-width':10,opacity:.35,filter:'url(#pe)'},R);
// left wall (ochre, darker: in shade)
plaster(quad(LW,0,1,-0.05,1.05),'#A07E58',R,{dark:.85,light:.25});$('path',{d:quad(LW,0,1,-0.05,1.05),fill:'#120b07',opacity:.32},R);
plaster(quad(LW,.25,.55,0,.42),'#3f5d58',R,{dark:.6,light:.2,chips:false});$('path',{d:quad(LW,.29,.51,.02,.38),fill:'#140d09',opacity:.85},R);
plaster(quad(LW,.62,.9,.55,.75),'#5E7F5B',R,{dark:.6,light:.2,chips:false});
$('path',{d:quad(LW,0,1,0,.06),fill:'#4a3a2c',opacity:.7},R);
// right wall (sunlit, warm)
plaster(quad(RW,0,1,-0.05,1.05),'#C9A579',R,{dark:.7,light:.4});
plaster(quad(RW,.18,.42,.5,.78),'#7a5a3c',R,{dark:.5,light:.15,chips:false});$('path',{d:quad(RW,.2,.4,.52,.76),fill:'#1a110c',opacity:.8},R);
plaster(quad(RW,.55,.85,0,.45),'#8a4b33',R,{dark:.6,light:.2,chips:false});
$('path',{d:quad(RW,0,1,0,.06),fill:'#5a4532',opacity:.7},R);
// wall seams where lane meets facade
$('path',{d:'M0,-720 V1460 M1080,-720 V1460',stroke:'#1d130c','stroke-width':6,opacity:.6,filter:'url(#pe)'},R);
// overhead wires across the lane
[[-660,-300,1740,-200,260],[-660,-100,1740,-260,320],[-660,-450,1740,60,240],[-660,150,900,-720,300],[200,-720,1740,250,200]].forEach(([x1,y1,x2,y2,s])=>$('path',{d:`M${x1},${y1} Q${(x1+x2)/2},${Math.max(y1,y2)+s} ${x2},${y2}`,stroke:'#140c08','stroke-width':4.5,fill:'none',opacity:.9},R));
// grain
$('rect',{x:X0,y:Y0,width:W,height:H,filter:'url(#grain)'},R);
window.ready=document.fonts.ready;})();
