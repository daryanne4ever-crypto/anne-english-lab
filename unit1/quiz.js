const student = requireStudent();
if (!student) throw new Error('No student');

const quizzes = [
  // Nível 1 (1-10) pronomes/palavras simples
  { q:'Qual é o pronome para "eu"?', a:['You','I','He','They'], c:1, level:1 },
  { q:'Qual palavra significa "meu"?', a:['Mine','My','Me','Your'], c:1, level:1 },
  { q:'Complete: "___ am happy."', a:['I','Me','My','Mine'], c:0, level:1 },
  { q:'Qual palavra significa "casa"?', a:['Family','Home','Friend','Job'], c:1, level:1 },
  { q:'Qual palavra significa "feliz"?', a:['Tired','Busy','Happy','Cold'], c:2, level:1 },
  { q:'Complete: "This is ___."', a:['my','mine','me','i'], c:1, level:1 },
  { q:'Qual palavra significa "com"?', a:['Because','With','So','But'], c:1, level:1 },
  { q:'Qual palavra significa "nunca"?', a:['Always','Never','Sometimes','Really'], c:1, level:1 },
  { q:'Qual palavra significa "também"?', a:['Also','But','So','Will'], c:0, level:1 },
  { q:'Qual frase está correta?', a:['I am good.','Me am good.','My am good.','Mine am good.'], c:0, level:1 },

  // Nível 2 (11-20) verbos básicos/frases curtas
  { q:'Tradução de "I need help."', a:['Eu preciso de ajuda.','Eu gosto de café.','Eu estou em casa.','Eu tenho tempo.'], c:0, level:2 },
  { q:'Complete: "I ___ music."', a:['need','love','was','had'], c:1, level:2 },
  { q:'Qual verbo em "I work hard"?', a:['I','work','hard','none'], c:1, level:2 },
  { q:'Tradução de "I can cook."', a:['Eu posso cozinhar.','Eu posso correr.','Eu posso ler.','Eu posso beber.'], c:0, level:2 },
  { q:'Complete: "I ___ here."', a:['live','lives','living','lived'], c:0, level:2 },
  { q:'Qual frase está correta?', a:['I am busy.','I busy am.','Am I busy.','Busy I am.'], c:0, level:2 },
  { q:'Tradução de "I study English."', a:['Eu estudo inglês.','Eu ensino inglês.','Eu gosto de inglês.','Eu esqueço inglês.'], c:0, level:2 },
  { q:'Complete: "I ___ time."', a:['have','has','am','are'], c:0, level:2 },
  { q:'Qual forma correta?', a:['I did it.','I do it yesterday.','I done it.','I dided it.'], c:0, level:2 },
  { q:'Tradução de "I go now."', a:['Eu vou agora.','Eu fui ontem.','Eu irei amanhã.','Eu estou indo depois.'], c:0, level:2 },

  // Nível 3 (21-30) adjetivos/frases médias
  { q:'Tradução de "My house is very small."', a:['Minha casa é muito pequena.','Minha casa é muito grande.','Minha casa é azul.','Minha casa está longe.'], c:0, level:3 },
  { q:'Qual adjetivo em "very busy person"?', a:['very','busy','person','am'], c:1, level:3 },
  { q:'Complete: "My friend is very ___."', a:['tall','home','study','because'], c:0, level:3 },
  { q:'Tradução de "I feel happy today."', a:['Eu me sinto feliz hoje.','Eu fico triste hoje.','Eu trabalho hoje.','Eu estudo hoje.'], c:0, level:3 },
  { q:'Complete: "My favorite color is ___."', a:['friend','blue','time','job'], c:1, level:3 },
  { q:'Qual frase está correta?', a:['I am proud of myself.','I proud of myself.','I am proud myself of.','Proud I am of.'], c:0, level:3 },
  { q:'Tradução de "I enjoy reading good books."', a:['Eu gosto de ler bons livros.','Eu compro livros caros.','Eu não leio livros.','Eu vendo livros.'], c:0, level:3 },
  { q:'Complete: "I have many great ___."', a:['friends','friend','friending','friendly'], c:0, level:3 },
  { q:'Tradução de "I am waiting for you."', a:['Estou esperando você.','Estou chamando você.','Estou vendo você.','Estou seguindo você.'], c:0, level:3 },
  { q:'Qual frase está correta?', a:['I think about my future.','I think in my future.','I think my future about.','I about think future.'], c:0, level:3 },

  // Nível 4 (31-40) advérbios/rotina
  { q:'Qual advérbio em "I always wake up early"?', a:['always','wake','up','early'], c:0, level:4 },
  { q:'Tradução de "I really love my job."', a:['Eu realmente amo meu trabalho.','Eu procuro meu trabalho.','Eu perdi meu trabalho.','Eu troquei meu trabalho.'], c:0, level:4 },
  { q:'Complete: "I ___ wake up early."', a:['always','neverly','good','person'], c:0, level:4 },
  { q:'Qual frase expressa rotina?', a:['I study every single day.','I am hungry now.','I found a key.','I bought a car.'], c:0, level:4 },
  { q:'Tradução de "I was born in July."', a:['Eu nasci em julho.','Eu moro em julho.','Eu trabalho em julho.','Eu viajo em julho.'], c:0, level:4 },
  { q:'Complete: "I am listening ___ music."', a:['at','to','for','from'], c:1, level:4 },
  { q:'Qual frase está correta?', a:['I can speak a little.','I can speaks a little.','I can speaking little.','I can spoke little.'], c:0, level:4 },
  { q:'Tradução de "I work at the bank."', a:['Eu trabalho no banco.','Eu estudo no banco.','Eu durmo no banco.','Eu corro no banco.'], c:0, level:4 },
  { q:'Complete: "I hope to ___ you."', a:['see','seen','saw','seeing'], c:0, level:4 },
  { q:'Qual palavra é advérbio?', a:['really','friend','family','person'], c:0, level:4 },

  // Nível 5 (41-50) conectores/complexas
  { q:'Conector em "I am tired but I am happy"?', a:['and','but','so','because'], c:1, level:5 },
  { q:'Tradução de "I study because I want more."', a:['Eu estudo porque quero mais.','Eu estudo e quero menos.','Eu estudo mas durmo.','Eu estudo sem motivo.'], c:0, level:5 },
  { q:'Complete: "I am hungry ___ I will eat."', a:['because','so','but','also'], c:1, level:5 },
  { q:'Qual frase usa "also" corretamente?', a:['I like tea and also coffee.','I also like and tea coffee.','I tea also coffee like.','Also I tea like coffee and.'], c:0, level:5 },
  { q:'Tradução de "I work hard but I rest."', a:['Eu trabalho duro, mas descanso.','Eu trabalho e nunca descanso.','Eu descanso e não trabalho.','Eu descanso porque trabalho pouco.'], c:0, level:5 },
  { q:'Complete: "I stay home because it is ___."', a:['sunny','raining','small','blue'], c:1, level:5 },
  { q:'Qual frase está correta?', a:['I am free so let us go.','I am free because let us go.','I am free but let us go because.','I free am so go let us.'], c:0, level:5 },
  { q:'Tradução de "I forgot it so I am sorry."', a:['Eu esqueci, então desculpe.','Eu lembrei, então obrigado.','Eu achei, então feliz.','Eu perdi, então corro.'], c:0, level:5 },
  { q:'Complete: "I play games but I ___."', a:['study','studies','studied','studying'], c:0, level:5 },
  { q:'Conector em "I help people because it is right"?', a:['because','also','but','so'], c:0, level:5 }
];

let idx = 0;
let answeredCurrent = false;

const qText = document.getElementById('questionText');
const answersEl = document.getElementById('answers');
const feedback = document.getElementById('quizFeedback');
const meta = document.getElementById('quizMeta');

function getLevelLabel(questionLevel) {
  return `Nível ${questionLevel} · Questão ${idx + 1}/50`;
}

function renderQuestion() {
  const q = quizzes[idx];
  answeredCurrent = false;
  meta.textContent = getLevelLabel(q.level);
  qText.textContent = q.q;
  answersEl.innerHTML = q.a.map((ans, i) => `<button class="btn btn-secondary" data-i="${i}">${ans}</button>`).join('');
}

answersEl.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-i]');
  if (!btn || answeredCurrent) return;

  const selected = Number(btn.dataset.i);
  const q = quizzes[idx];
  answeredCurrent = true;

  if (selected === q.c) {
    const updated = addXP(15, `Quiz principal correto (Q${idx + 1})`);
    updated.quizCorrectCount = (updated.quizCorrectCount || 0) + 1;
    const levelByCorrect = Math.floor(updated.quizCorrectCount / 10) + 1;
    updated.level = Math.max(updated.level, levelByCorrect);
    saveCurrentStudent(updated);

    feedback.textContent = `Resposta correta! +15 XP | Acertos no quiz: ${updated.quizCorrectCount} | Nível: ${updated.level}`;
    feedback.className = 'feedback good';
  } else {
    feedback.textContent = 'Resposta incorreta. Tente a próxima questão.';
    feedback.className = 'feedback bad';
  }
});

document.getElementById('nextQuizBtn').addEventListener('click', () => {
  idx = (idx + 1) % quizzes.length;
  feedback.textContent = '';
  renderQuestion();
});

document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = '../dashboard.html';
});

renderQuestion();
