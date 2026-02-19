const s=requireStudent(); if(!s) throw new Error('no student');
const cards=[{en:'Passport',pt:'Passaporte',ipa:'/ˈpɑːspɔːt/'},{en:'Boarding pass',pt:'Cartão de embarque',ipa:'/ˈbɔːdɪŋ pɑːs/'},{en:'Suitcase',pt:'Mala',ipa:'/ˈsuːtkeɪs/'},{en:'Customs',pt:'Alfândega',ipa:'/ˈkʌstəmz/'},{en:'Gate',pt:'Portão de embarque',ipa:'/ɡeɪt/'}];
const g=document.getElementById('grid');
function speak(t){if(!('speechSynthesis' in window)) return; const u=new SpeechSynthesisUtterance(t);u.lang='en-US';window.speechSynthesis.speak(u);} 
g.innerHTML=cards.map((c,i)=>`<article class="flash-card" data-i="${i}"><div class="flash-top"><button class="sound-btn" data-sound="${c.en}">🔊</button><strong>${c.en}</strong></div><p class="hidden-info muted">${c.pt}</p><p class="hidden-info muted">${c.ipa}</p></article>`).join('');
g.addEventListener('click',e=>{const sbtn=e.target.closest('[data-sound]');if(sbtn){speak(sbtn.dataset.sound);return;}const card=e.target.closest('.flash-card');if(!card)return;card.querySelectorAll('.hidden-info').forEach(x=>x.style.display=x.style.display==='block'?'none':'block');addUnitXP('unit2',2,'Unit2 Flashcard');});
