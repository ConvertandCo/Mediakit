// ===== Reel 11 — The sign-up wall, paper-collage style (timed to the script; retime when the VO lands) =====
const K={a:0.1,ck:0.6,acct:1.0,left:2.4,s2:3.3,n18:3.5,abandon:5.0,said:6.4,forced:7.3,s3:9.0,came:9.2,form:10.5,s4:12.0,guest:12.2,otp:13.7,pw:14.9,offer:16.2,paid:17.2,
 s5:18.6,pay:18.8,payClick:19.35,save:20.0,fill:20.5},END=21.6;
CAP=[[0.1,'You asked them'],[1.0,'to create an account.'],[2.4,'They left.'],[3.1,''],[3.5,'18% of shoppers'],[5.0,'who abandoned checkout'],[6.4,'said it was because'],[7.3,'they were forced to sign up.'],[8.8,''],
 [9.2,'They came to buy…'],[10.5,'not to fill in a form.'],[11.8,''],[12.2,'Turn on guest checkout.'],[13.7,'Use a phone OTP'],[14.9,'instead of a password.'],[16.2,'Offer the account'],[17.2,'after they’ve paid.'],[18.4,''],
 [18.8,'Let them pay first.'],[20.0,'Save this.'],[20.8,'']];
const ptf=(cx,cy,sc,rot=0)=>`translate(${f1(cx)},${f1(cy)}) rotate(${f2(rot)}) scale(${f3(sc)}) translate(-200,-395)`;
const wpt=(cx,cy,sc,px,py)=>({x:cx+(px-200)*sc,y:cy+(py-395)*sc});
function topBar(){return `<rect x="0" y="0" width="400" height="104" fill="#fff"/>`+T(22,38,17,'9:41',{c:'#111'})+`<rect x="140" y="12" width="120" height="34" rx="17" fill="#000"/>`+
  `<rect x="14" y="56" width="372" height="42" rx="12" fill="#EFEFED"/>`+T(200,83,15,'convertandco.com',{f:'IR',c:'#555',a:'middle'});}
function bagPage(press){let s=`<rect width="400" height="790" fill="#fff"/>`+topBar()+demoBadge(16,120);
  s+=T(20,196,28,'Your bag',{f:'IB',c:'#111'});
  s+=`<rect x="20" y="222" width="110" height="110" rx="12" fill="url(#img)"/>`+jar(75,292,0.85)+T(148,262,19,'Classic nut butter',{c:'#222'})+T(148,292,15,'350 g · Qty 1',{f:'IR',c:'#777'})+T(148,324,20,'₹899',{f:'IB',c:'#111'});
  s+=`<rect x="20" y="370" width="360" height="1.5" fill="#E6E4DE"/>`+T(20,410,17,'Subtotal',{f:'IR',c:'#555'})+T(380,410,17,'₹899',{f:'IB',c:'#111',a:'end'})+T(20,444,17,'Delivery',{f:'IR',c:'#555'})+T(380,444,17,'Free',{f:'IM',c:GRN,a:'end'});
  s+=`<g transform="translate(200,711) scale(${f2(1-0.05*press)}) translate(-200,-711)"><rect x="20" y="680" width="360" height="62" rx="14" fill="#111"/>`+T(200,719,20,'Checkout',{c:'#fff',a:'middle'})+'</g>';
  return s;}
function phoneAt(cx,cy,sc,rot,inner,id){return `<g transform="${ptf(cx,cy,sc,rot)}"><g filter="url(#cut)"><rect x="-14" y="-14" width="428" height="818" rx="66" fill="url(#fr)"/><rect x="-7" y="-7" width="414" height="804" rx="59" fill="#0b0b0c"/></g>`+
  `<clipPath id="${id}"><rect x="0" y="0" width="400" height="790" rx="52"/></clipPath><g clip-path="url(#${id})">${inner}</g></g>`;}
function field(x,y,w,label,val='',{h=64,s=22}={}){return T(x,y-12,s*0.8,label,{f:'IM',c:'#666'})+`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#fff" stroke="#CFCBC2" stroke-width="2"/>`+(val?T(x+18,y+h*0.62,s,val,{f:'IR',c:'#999'}):'');}
// =================== scene 1: the wall ===================
function s1(t){let s=bg('bg_grid.jpg');const cx=540,cy=930,sc=1.3;
  const gone=E.inC(seg(t,K.left,K.left+0.55)),tx=1500*gone,rot=-1.5+30*gone;
  const press=t>=K.ck&&t<K.ck+0.2?Math.sin(seg(t,K.ck,K.ck+0.2)*Math.PI):0;
  // ghost outline where the shopper used to be
  if(t>=K.left+0.15){const o=E.outC(seg(t,K.left+0.15,K.left+0.45));s+=`<g opacity="${f2(o)}" transform="translate(${cx},${cy}) rotate(-1.5)"><rect x="${-214*sc}" y="${-409*sc}" width="${428*sc}" height="${818*sc}" rx="${66*sc}" fill="none" stroke="#8a877f" stroke-width="5" stroke-dasharray="20 14"/></g>`;}
  s+=`<g transform="translate(${f1(tx)},${f1(-120*gone)}) rotate(${f2(rot*0.3)} ${cx} ${cy})">`;
  s+=phoneAt(cx,cy,sc,-1.5,bagPage(press),'p1');
  if(t>=K.a+0.2&&t<K.ck+0.5){const b=wpt(cx,cy,sc,260,711),m=E.io(seg(t,K.a+0.2,K.ck));s+=cursor(lerp(b.x+200,b.x,m),lerp(b.y+220,b.y,m),press);}
  // the account form slams down over the checkout
  if(t>=K.acct){const k=seg(t,K.acct,K.acct+0.2),z=lerp(1.7,1,E.outC(k)),sh=t<K.acct+0.45?Math.sin((t-K.acct)*70)*8*(1-seg(t,K.acct+0.2,K.acct+0.45)):0;
    s+=`<g transform="translate(${f1(540+sh)},960) rotate(-3) scale(${f3(z)})" opacity="${f2(clamp(k*3))}"><g filter="url(#cut)"><rect x="-320" y="-400" width="640" height="800" fill="${PAPER}"/></g>`+
       T(-260,-300,54,'Create an account',{f:'SF',c:INK})+T(-260,-252,24,'to continue to checkout',{f:'IR',c:'#777'})+
       field(-260,-180,520,'Full name')+field(-260,-60,520,'Email')+field(-260,60,520,'Password','••••••••')+field(-260,180,520,'Confirm password','••••••••')+
       `<rect x="-260" y="290" width="520" height="70" rx="12" fill="${OR}"/>`+T(0,335,24,'Sign up',{f:'IB',c:'#fff',a:'middle'})+'</g>';}
  s+='</g>';
  if(t>=K.left+0.2)s+=note(t,K.left+0.2,300,360,'They left.',{s:84,rot:-4});
  return s+logo(false);}
// =================== scene 2: 18 in 100 ===================
function s2(t){let s=bg('bg_cork.jpg')+logo(true);const zoom=1+0.035*seg(t,K.s2,K.s3);
  s+=`<g transform="translate(540,900) scale(${f3(zoom)}) translate(-540,-900)">`;
  const cp=E.out4(seg(t,K.s2,K.s2+0.35));
  s+=`<g transform="translate(160,${f1(230-(1-cp)*80)}) rotate(1.2)" opacity="${f2(cp)}" filter="url(#shd)"><image href="assets/clip.png" x="0" y="0" width="760" height="980"/>`+
     T(380,90,22,'CHECKOUT ABANDONMENT RESEARCH',{f:'LB',c:'#555',a:'middle',ls:4})+T(380,170,48,'Why did they leave?',{f:'SF',c:INK,a:'middle'})+`<rect x="40" y="208" width="680" height="3" fill="#333"/>`;
  // 100 shoppers who abandoned; 18 of them light up
  const gx=95,gy=300,sp=44;s+=`<rect x="${gx-34}" y="${gy-34}" width="${sp*9+68}" height="${sp*9+68}" fill="#fff" opacity=".9"/>`;
  for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,d=(r+c)/18;const p=E.bk(seg(t,K.n18-0.25+d*0.5,K.n18-0.05+d*0.5));if(p<=0)continue;
    const on=i<18&&t>=K.n18+0.45+i*0.06,x=gx+c*sp,y=gy+r*sp;
    s+=`<circle cx="${x}" cy="${y}" r="${f1(15*clamp(p,0,1.2))}" fill="${on?OR:'#D9D4C8'}"/>`;}
  const cnt=Math.min(18,Math.max(0,Math.floor((t-(K.n18+0.45))/0.06)+1));
  if(t>=K.n18+0.4){s+=T(600,470,150,cnt+'%',{f:'MK',c:OR,a:'middle'});}
  s+=T(gx+sp*4.5,gy+sp*9+90,34,'100 shoppers who abandoned checkout',{f:'HW',c:'#444',a:'middle',o:E.outC(seg(t,K.abandon,K.abandon+0.3))});
  if(t>=K.abandon+0.1)s+=stroke(t,K.abandon+0.1,`M${gx-20},${gy+sp*9+105} L${gx+sp*9+20},${gy+sp*9+102}`,OR,5,0.3);
  if(t>=K.said)s+=loop(t,K.said,gx+sp*4.5,gy+sp*0.5,sp*5.6,sp*1.35,INK,5);
  s+='</g>';
  s+=note(t,K.forced,375,1075,'“The site wanted me to create an account”',{s:32,rot:-3,c:'#fff'});
  s+=note(t,K.forced+0.35,620,880,'forced sign-up',{s:50,rot:5});
  s+='</g>';
  s+=T(540,1290,17,'BAYMARD INSTITUTE · CHECKOUT ABANDONMENT SURVEY',{f:'LB',c:'#d9d2c3',a:'middle',ls:2,o:cp});
  return s;}
// =================== scene 3: came to buy, not to fill in a form ===================
function bag(x,y,s=1,rot=0){return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})" filter="url(#cut)"><path d="M-70,-120 C-70,-200 70,-200 70,-120" fill="none" stroke="#7a5a3a" stroke-width="14"/>`+jar(-30,-90,1.1)+
  `<path d="M-150,-120 L150,-120 L170,200 L-170,200 Z" fill="#C79A63"/><rect x="-150" y="-120" width="300" height="20" fill="#B5875A"/>`+T(0,70,40,'convertandco',{f:'HW',c:'#5a3e22',a:'middle'})+'</g>';}
function s3(t){let s=bg('bg_yellow.jpg');const z=1+0.04*seg(t,K.s3,K.s4);
  s+=`<g transform="translate(540,960) scale(${f3(z)}) translate(-540,-960)">`;
  const bp=E.bk(seg(t,K.s3,K.s3+0.4));s+=`<g transform="translate(300,${f1(lerp(1300,980,clamp(bp,0,1.1)))})">${bag(0,0,1.15,-6)}</g>`;
  s+=note(t,K.came,80,330,'came to buy',{s:66,rot:-4,c:'#fff'});
  if(t>=K.form){const u=E.io(seg(t,K.form,K.form+1.0)),H=lerp(120,1180,u);
    const F=['Full name','Email','Password','Confirm password','Date of birth','Phone number','Address','Security question'];
    s+=`<g transform="translate(560,300) rotate(3)"><g filter="url(#cut)"><rect x="0" y="0" width="440" height="${f1(H)}" fill="#fff"/></g>`+T(30,64,34,'Sign up',{f:'SF',c:INK});
    F.forEach((l,i)=>{const y=110+i*130;if(y+90<H)s+=field(30,y+20,380,l,'',{h:54,s:20});});
    s+=`<rect x="0" y="${f1(H-18)}" width="440" height="18" fill="#E9E6DE"/></g>`;
    if(t>=K.form+1.05)s+=xMark(t,K.form+1.05,780,890,230,OR,16);}
  s+='</g>';
  return s+logo(false);}
// =================== scene 4: three fixes, camera moves card to card ===================
function card(t,t0,cy,n,title,sub,inner){if(t<t0)return '';const p=E.bk(seg(t,t0,t0+0.35));
  return `<g transform="translate(540,${cy}) scale(${f2(clamp(p,0,1.15))}) rotate(${n===2?1:-1})"><g filter="url(#cut)"><rect x="-410" y="-150" width="820" height="300" fill="#F3EEE2"/></g>`+
   `<circle cx="-340" cy="-78" r="34" fill="${OR}"/>`+T(-340,-64,38,String(n),{f:'MK',c:'#fff',a:'middle'})+T(-284,-62,46,title,{f:'SF',c:INK})+T(-284,-18,24,sub,{f:'IR',c:'#777'})+inner+'</g>';}
function s4(t){let s=bg('bg_grid.jpg');
  const Y=[520,900,1280];const m1=E.io(seg(t,K.otp-0.25,K.otp+0.25)),m2=E.io(seg(t,K.offer-0.25,K.offer+0.25)),out=E.io(seg(t,K.paid+0.55,K.paid+1.1));
  let fy=lerp(lerp(Y[0],Y[1],m1),Y[2],m2);fy=lerp(fy,900,out);const z=lerp(1.16,1,out);
  s+=`<g transform="translate(540,${f1(lerp(840,940,out))}) scale(${f3(z)}) translate(-540,${f1(-fy)})">`;
  // 1 guest checkout: toggle switches on
  const on=E.io(seg(t,K.guest+0.6,K.guest+0.85));
  s+=card(t,K.guest,Y[0],1,'Guest checkout','No account needed to pay',
    `<rect x="-284" y="30" width="420" height="64" rx="12" fill="#fff" stroke="#CFCBC2" stroke-width="2"/>`+T(-264,71,24,'Continue as guest',{f:'IM',c:'#333'})+
    `<rect x="210" y="28" width="130" height="68" rx="34" fill="${on>0.5?OR:'#CFCBC2'}"/><circle cx="${f1(lerp(244,306,on))}" cy="62" r="26" fill="#fff"/>`);
  // 2 phone OTP: digits fill, password slip struck out
  let dg='';const D='482917';for(let i=0;i<6;i++){const x=-284+i*76,k=t>=K.otp+0.45+i*0.1;dg+=`<rect x="${x}" y="22" width="62" height="78" rx="10" fill="#fff" stroke="${k?OR:'#CFCBC2'}" stroke-width="${k?3:2}"/>`+(k?T(x+31,74,36,D[i],{f:'IB',c:'#111',a:'middle'}):'');}
  let pw='';if(t>=K.pw){const p=E.bk(seg(t,K.pw,K.pw+0.3));pw=`<g transform="translate(300,-100) rotate(8) scale(${f2(clamp(p,0,1.2))})"><g filter="url(#cut)"><rect x="-120" y="-40" width="240" height="80" fill="#fff"/></g>`+T(-100,-6,20,'Password',{f:'IM',c:'#666'})+T(-100,24,24,'••••••••',{f:'IR',c:'#999'})+
     stroke(t,K.pw+0.35,'M-110,4 L110,-2',OR,9,0.2)+'</g>';}
  s+=card(t,K.otp,Y[1],2,'Phone OTP','+91 98••• •••21 · code sent',dg+pw);
  // 3 account after payment
  let a3='';if(t>=K.offer+0.3)a3+=`<g opacity="${f2(E.outC(seg(t,K.offer+0.3,K.offer+0.6)))}"><circle cx="-262" cy="62" r="24" fill="${GRN}"/>`+stroke(t,K.offer+0.4,'M-274,62 L-265,72 L-249,52','#fff',6,0.2)+T(-226,72,28,'Order placed',{f:'IB',c:'#111'})+'</g>';
  if(t>=K.paid){const p=E.bk(seg(t,K.paid,K.paid+0.35));a3+=`<g transform="translate(240,60) rotate(-4) scale(${f2(clamp(p,0,1.2))})"><g filter="url(#shd)"><rect x="-150" y="-62" width="300" height="124" rx="16" fill="#111"/></g>`+
     T(0,-16,20,'Save your details?',{f:'IM',c:'#fff',a:'middle'})+`<rect x="-110" y="4" width="220" height="44" rx="22" fill="${OR}"/>`+T(0,33,18,'Create account',{f:'IB',c:'#fff',a:'middle'})+'</g>';}
  s+=card(t,K.offer,Y[2],3,'Account after payment','Ask once the order is placed',a3);
  s+='</g>';
  return s+logo(false);}
// =================== scene 5: let them pay first ===================
function s5(t){let s=bg('bg_grid.jpg');const ap=E.bk(seg(t,K.s5,K.s5+0.4));
  const paid=t>=K.payClick,press=t>=K.payClick&&t<K.payClick+0.2?Math.sin(seg(t,K.payClick,K.payClick+0.2)*Math.PI):0;
  s+=`<g transform="translate(540,900) rotate(-3) scale(${f2(clamp(ap,0,1.15)*(1-0.06*press))})"><g filter="url(#cut)"><rect x="-330" y="-95" width="660" height="190" rx="28" fill="${paid?OR:'#111'}"/></g>`+
     (paid?T(0,24,68,'Paid',{f:'IB',c:'#fff',a:'middle'})+stroke(t,K.payClick+0.05,'M120,-6 L150,24 L200,-36','#fff',12,0.25):T(0,26,68,'Pay ₹899',{f:'IB',c:'#fff',a:'middle'}))+'</g>';
  if(paid){const k=E.outC(seg(t,K.payClick,K.payClick+0.4));for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const r1=360+60*k,r2=360+130*k;
    s+=`<line x1="${f1(540+r1*Math.cos(a))}" y1="${f1(900+r1*Math.sin(a)*0.5)}" x2="${f1(540+r2*Math.cos(a))}" y2="${f1(900+r2*Math.sin(a)*0.5)}" stroke="${INK}" stroke-width="7" stroke-linecap="round" opacity="${f2(1-seg(t,K.payClick+0.3,K.payClick+0.6))}"/>`;}}
  if(t>=K.pay&&t<K.payClick+0.5){const m=E.io(seg(t,K.pay,K.payClick));s+=cursor(lerp(900,640,m),lerp(1350,930,m),press);}
  s+=note(t,K.pay,140,400,'Let them pay first.',{s:72,rot:-3});
  if(t>=K.payClick+0.4){const p=E.outC(seg(t,K.payClick+0.4,K.payClick+0.7));s+=T(540,1180,40,'then offer the account →',{f:'HW',c:'#555',a:'middle',o:p});}
  s+=savePill(t,K.save,K.fill,390,1430);
  return s+logo(false);}
S=[0,K.s2,K.s3,K.s4,K.s5];SC=[s1,s2,s3,s4,s5];
