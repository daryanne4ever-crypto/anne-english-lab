const student = requireStudent();
if (!student) throw new Error('No student');

const quizzes = [
  {
    question: 'Qual frase significa "Eu estou feliz"?',
    answers: ['I am hungry.', 'I am happy.', 'I am tired.', 'I am late.'],
    correct: 1
  },
  {
    question: 'Complete: "My name ___ Anne."',
    answers: ['am', 'are', 'is', 'be'],
    correct: 2
  },
  {
    question: 'Tradução de "I need help" é:',
    answers: ['Eu preciso de ajuda', 'Eu gosto de estudar', 'Eu estou cansado', 'Eu sou médico'],
    correct: 0
  }
];

let idx = 0;
const qText = document.getElementById('questionText');
const answersEl = document.getElementById('answers');
const feedback = document.getElementById('quizFeedback');

function renderQuestion() {
  const q = quizzes[idx];
  qText.textContent = q.question;
  answersEl.innerHTML = q.answers
    .map((ans, i) => `<button class="btn btn-secondary" data-i="${i}">${ans}</button>`)
    .join('');
}

answersEl.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-i]');
  if (!btn) return;
  const selected = Number(btn.dataset.i);
  const q = quizzes[idx];

  if (selected === q.correct) {
    addXP(15, 'Quiz correto');
    feedback.textContent = 'Resposta correta! +15 XP';
    feedback.className = 'feedback good';
  } else {
    feedback.textContent = 'Resposta incorreta. Tente a próxima.';
    feedback.className = 'feedback bad';
  }
});

document.getElementById('nextQuizBtn').addEventListener('click', () => {
  idx = (idx + 1) % quizzes.length;
  feedback.textContent = '';
  renderQuestion();
});

document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'dashboard.html';
});

renderQuestion();
