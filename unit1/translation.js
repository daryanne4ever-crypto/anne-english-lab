const student = requireStudent();
if (!student) throw new Error('No student');

const translationItems = [
  { en: 'I am happy.', pt: ['eu estou feliz', 'estou feliz'] },
  { en: 'I need help.', pt: ['eu preciso de ajuda', 'preciso de ajuda'] },
  { en: 'I like coffee.', pt: ['eu gosto de cafe', 'gosto de cafe'] },
  { en: 'My family lives in Brazil.', pt: ['minha familia mora no brasil', 'a minha familia mora no brasil'] },
  { en: 'I study every single day.', pt: ['eu estudo todos os dias', 'eu estudo cada dia'] },
  { en: 'I am proud of myself.', pt: ['eu tenho orgulho de mim', 'estou orgulhoso de mim', 'estou orgulhosa de mim'] },
  { en: "I study because I want more.", pt: ['eu estudo porque eu quero mais', 'estudo porque quero mais'] },
  { en: "I am tired but I am happy.", pt: ['estou cansado mas estou feliz', 'estou cansada mas estou feliz'] },
  { en: 'I travel because I love nature.', pt: ['eu viajo porque amo a natureza', 'viajo porque amo a natureza'] },
  { en: "I forgot it so I'm sorry.", pt: ['eu esqueci entao desculpe', 'esqueci entao desculpa'] }
];

let idx = 0;
const source = document.getElementById('sourceSentence');
const answerInput = document.getElementById('answerInput');
const feedback = document.getElementById('translationFeedback');

function normalize(v) {
  return v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ').trim();
}

function render() {
  source.textContent = translationItems[idx].en;
  answerInput.value = '';
  feedback.textContent = '';
}

document.getElementById('checkBtn').addEventListener('click', () => {
  const answer = normalize(answerInput.value);
  if (!answer) {
    feedback.textContent = 'Digite uma tradução antes de corrigir.';
    feedback.className = 'feedback bad';
    return;
  }

  const valid = translationItems[idx].pt.map(normalize);
  const ok = valid.some(v => answer.includes(v) || v.includes(answer));

  if (ok) {
    addXP(20, 'Translation quiz correto');
    feedback.textContent = 'Correto! +20 XP';
    feedback.className = 'feedback good';
  } else {
    feedback.textContent = `Incorreto. Sugestão: ${translationItems[idx].pt[0]}`;
    feedback.className = 'feedback bad';
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  idx = (idx + 1) % translationItems.length;
  render();
});

document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = '../dashboard.html';
});

render();
