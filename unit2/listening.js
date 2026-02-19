const s=requireStudent(); if(!s) throw new Error('no student');
const target='Where is the boarding gate for flight 302?';const spoken=document.getElementById('spoken'),feed=document.getElementById('feedback');
function speak(t){if(!('speechSynthesis' in window)) return; const u=new SpeechSynthesisUtterance(t);u.lang='en-US';window.speechSynthesis.speak(u);} 
const SR=window.SpeechRecognition||window.webkitSpeechRecognition; const rec=SR?new SR():null; if(rec){rec.lang='en-US';rec.onresult=e=>{const txt=e.results?.[0]?.[0]?.transcript||'';spoken.textContent=`Você falou: ${txt}`;const lc=txt.toLowerCase();const ok=lc.includes('boarding')||lc.includes('flight')||lc.includes('gate');if(ok){addUnitXP('unit2',20,'Unit2 Listening');feed.textContent='Boa! +20 XP Unit 2';feed.className='feedback good';}else{feed.textContent='Tente novamente.';feed.className='feedback bad';}}}
document.getElementById('playBtn').addEventListener('click',()=>speak(target));
document.getElementById('recBtn').addEventListener('click',()=>{if(!rec){feed.textContent='SpeechRecognition indisponível';feed.className='feedback bad';return;}try{rec.start()}catch{}});
