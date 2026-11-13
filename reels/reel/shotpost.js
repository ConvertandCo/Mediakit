const {chromium}=require('playwright');(async()=>{const ids=process.argv.slice(3),od=process.argv[2];const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
p.on('pageerror',e=>console.log('ERR',e.message));await p.goto('file://'+__dirname+'/posts.html');await p.evaluate(()=>window.ready);
for(const id of ids){await p.evaluate(i=>window.drawPost(i),id);await p.waitForTimeout(150);await p.screenshot({path:`${od}/${id}.png`,clip:{x:0,y:0,width:1080,height:1350}});}
await b.close();})();
