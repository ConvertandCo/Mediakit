// motion-blurred render: 4 sub-frames per output frame across a 180-degree shutter, averaged by ffmpeg
const {chromium}=require('playwright');const {spawn}=require('child_process');const fs=require('fs');
const [page,f0,f1,name]=[process.argv[2],Number(process.argv[3]),Number(process.argv[4]),process.argv[5]];const SUB=4;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/'+page);await p.evaluate(()=>window.ready);
const tmp=`out/${name}.tmp.mp4`,fin=`out/${name}.mp4`;
const ff=spawn('ffmpeg',['-y','-hide_banner','-loglevel','error','-f','image2pipe','-framerate',String(30*SUB),'-c:v','mjpeg','-i','-',
 '-vf',`tmix=frames=${SUB},select='not(mod(n+1\\,${SUB}))',setpts=N/30/TB`,'-r','30','-c:v','libx264','-preset','slow','-crf','16','-pix_fmt','yuv420p','-g','60',tmp]);
let err='';ff.stderr.on('data',d=>err+=d);const done=new Promise(r=>ff.on('close',r));
for(let k=f0;k<f1;k++){for(let j=0;j<SUB;j++){const t=(k+(j-(SUB-1)/2)*0.5/SUB)/30;await p.evaluate(t=>window.render(t),Math.max(0,t));
  const buf=await p.screenshot({type:'jpeg',quality:94});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}}
ff.stdin.end();if(await done!==0){console.error(err);process.exit(1);}fs.renameSync(tmp,fin);console.log(name,'done',f1-f0);await b.close();})();
