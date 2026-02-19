const s = requireStudent(); if (!s) throw new Error('no student');
const qs = [
{q:'"Passport" em português é:',a:['Passaporte','Bilhete','Mala','Hotel'],c:0},
{q:'Complete: I need to ___ a ticket.',a:['book','cook','read','open'],c:0},
{q:'"Airport" significa:',a:['Aeroporto','Estação','Terminal rodoviário','Porto'],c:0},
{q:'Qual frase é sobre viagem?',a:['I packed my suitcase.','I water my plants.','I clean my room.','I play games.'],c:0},
{q:'Complete: My flight is ___ 8 PM.',a:['at','in','on','for'],c:0}
];
let i=0;const q=document.getElementById('question'),a=document.getElementById('answers'),f=document.getElementById('feedback'),m=document.getElementById('meta');
function r(){q.textContent=qs[i].q;m.textContent=`Questão ${i+1}/${qs.length}`;a.innerHTML=qs[i].a.map((x,j)=>`<button class="btn btn-secondary" data-i="${j}">${x}</button>`).join('');}
a.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(!b)return;const ok=Number(b.dataset.i)===qs[i].c;if(ok){addUnitXP('unit2',15,`Unit2 Quiz Q${i+1}`);f.textContent='Correto! +15 XP (Unit 2)';f.className='feedback good';}else{f.textContent='Incorreto.';f.className='feedback bad';}});
document.getElementById('nextBtn').addEventListener('click',()=>{i=(i+1)%qs.length;f.textContent='';r();});
r();
