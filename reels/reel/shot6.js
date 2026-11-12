const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));await p.goto('file://'+__dirname+'/'+(process.env.PG||'decoy.html')+'');await p.evaluate(()=>window.ready);
const ts=process.argv.slice(2).map(Number);for(const t of ts){await p.evaluate(t=>window.render(t),t);await p.screenshot({path:`${process.env.OD||'chk6'}/d_${t}.png`});}await b.close();})();
