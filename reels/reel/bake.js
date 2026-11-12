// bake a static painted layer to PNG: node bake.js <page.html> <out.png> <w> <h>
const {chromium}=require('playwright');(async()=>{const [pg,out,w,h]=process.argv.slice(2);const b=await chromium.launch();
const p=await b.newPage({viewport:{width:+w,height:+h}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/'+pg);await p.evaluate(()=>window.ready);await p.waitForTimeout(300);
await p.screenshot({path:out,omitBackground:true,clip:{x:0,y:0,width:+w,height:+h}});await b.close();console.log('baked',out);})();
