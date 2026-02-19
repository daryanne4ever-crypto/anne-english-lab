const s = requireStudent(); if (!s) throw new Error('no student');
const qs = [
{q:'Complete: I ___ happy.',a:['am','is','are','be'],c:0},
{q:'"My name is Ana" significa:',a:['Meu nome é Ana','Minha casa é Ana','Eu gosto de Ana','Eu sou Ana agora'],c:0},
{q:'Pronome para "eu":',a:['I','Me','My','Mine'],c:0},
{q:'"I need help" significa:',a:['Eu preciso de ajuda','Eu amo ajudar','Eu quero casa','Eu estou cansado'],c:0},
{q:'Complete: I ___ in Brazil.',a:['live','lives','living','lived'],c:0}
];
let i=0;const q=document.getElementById('question'),a=document.getElementById('answers'),f=document.getElementById('feedback'),m=document.getElementById('meta');
function r(){q.textContent=qs[i].q;m.textContent=`Questão ${i+1}/${qs.length}`;a.innerHTML=qs[i].a.map((x,j)=>`<button class="btn btn-secondary" data-i="${j}">${x}</button>`).join('');}
a.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(!b)return;const ok=Number(b.dataset.i)===qs[i].c;if(ok){addUnitXP('unit1',15,`Unit1 Quiz Q${i+1}`);f.textContent='Correto! +15 XP (Unit 1)';f.className='feedback good';}else{f.textContent='Incorreto.';f.className='feedback bad';}});
document.getElementById('nextBtn').addEventListener('click',()=>{i=(i+1)%qs.length;f.textContent='';r();});
r();
