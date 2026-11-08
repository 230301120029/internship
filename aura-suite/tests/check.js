const fs=require('fs'),path=require('path');let bad=0;
const ok=(c,m)=>{if(!c){console.error('FAIL',m);bad++}else console.log('ok  ',m)};
for(const a of['skycast','taskly']){
  for(const f of['index.html','manifest.webmanifest','sw.js','icon.svg','netlify.toml','netlify/functions/ai.js'])ok(fs.existsSync(path.join(a,f)),a+'/'+f+' exists');
  const h=fs.readFileSync(path.join(a,'index.html'),'utf8'),s=h.split('<script>')[1].split('</script>')[0];
  try{new Function(s);ok(true,a+' script parses')}catch(e){ok(false,a+' script: '+e.message)}
  JSON.parse(fs.readFileSync(path.join(a,'manifest.webmanifest'),'utf8'));ok(!/localStorage\.setItem\(.*key/i.test(h),a+' has no embedded secrets');
  const m=require('./../'+a+'/netlify/functions/ai.js');
  m.handler({httpMethod:'GET',headers:{}}).then(r=>ok(r.statusCode==405,a+' AI function rejects GET'));
  m.handler({httpMethod:'POST',headers:{},body:'{"prompt":"hi"}'}).then(r=>ok(r.statusCode==503,a+' AI function is safe without a key'));
}
process.on('exit',()=>process.exit(bad?1:0));
