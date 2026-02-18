const student = requireStudent();
if (!student) throw new Error('No student');

const cards = [
  { en: 'Happy', pt: 'Feliz' },
  { en: 'Busy', pt: 'Ocupado' },
  { en: 'Because', pt: 'Porque' },
  { en: 'Friend', pt: 'Amigo(a)' },
  { en: 'Believe', pt: 'Acreditar' }
];

let i = 0;
let revealed = false;
const wordEl = document.getElementById('word');
const meaningEl = document.getElementById('meaning');

function render() {
  wordEl.textContent = cards[i].en;
  meaningEl.textContent = revealed ? cards[i].pt : '(oculto)';
}

document.getElementById('revealBtn').addEventListener('click', () => {
  if (!revealed) {
    addXP(5, 'Flashcard revelado');
    revealed = true;
    render();
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  i = (i + 1) % cards.length;
  revealed = false;
  render();
});

document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'dashboard.html';
});

render();
