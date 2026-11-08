const hits={};
const SYS='You are a concise, friendly weather assistant. Use only the weather data provided. Answer in under 70 words with practical advice.';
exports.handler=async ev=>{
  const h={'Content-Type':'application/json'},out=(s,o)=>({statusCode:s,headers:h,body:JSON.stringify(o)});
  if(ev.httpMethod!=='POST')return out(405,{error:'POST only'});
  const ip=ev.headers['x-nf-client-connection-ip']||'x',n=Date.now();
  hits[ip]=(hits[ip]||[]).filter(t=>n-t<6e4);
  if(hits[ip].length>=10)return out(429,{error:'Too many requests'});hits[ip].push(n);
  const key=process.env.GEMINI_API_KEY;if(!key)return out(503,{error:'AI not configured'});
  let b;try{b=JSON.parse(ev.body||'{}')}catch{return out(400,{error:'Bad JSON'})}
  const prompt=String(b.prompt||'').slice(0,3000);if(!prompt)return out(400,{error:'Missing prompt'});
  try{
    const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+(process.env.GEMINI_MODEL||'gemini-2.0-flash')+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},body:JSON.stringify({systemInstruction:{parts:[{text:SYS}]},contents:[{parts:[{text:prompt}]}]})});
    const t=(await r.json()).candidates?.[0]?.content?.parts?.[0]?.text;if(!t)throw 0;
    return out(200,{text:t.slice(0,2000)});
  }catch{return out(502,{error:'AI unavailable'})}
};
