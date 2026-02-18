const student = requireStudent();
if (!student) throw new Error('No student');

const target = 'I am learning English every day.';
const targetEl = document.getElementById('targetPhrase');
const spokenEl = document.getElementById('spoken');
const evalEl = document.getElementById('evaluation');

targetEl.textContent = target;

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

function normalize(t) {
  return t.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ').trim();
}

function similarity(spoken, expected) {
  const a = normalize(spoken);
  const b = normalize(expected);
  const aWords = a.split(' ').filter(Boolean);
  const bWords = b.split(' ').filter(Boolean);
  const match = bWords.filter(w => aWords.includes(w)).length;
  return Math.round((match / (bWords.length || 1)) * 100);
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const spoken = event.results?.[0]?.[0]?.transcript || '';
    spokenEl.textContent = `Você falou: ${spoken}`;
    const score = similarity(spoken, target);

    if (score >= 60) {
      addXP(20, `Listening Practice (${score}%)`);
      evalEl.textContent = `Boa resposta! Avaliação automática: ${score}% (+20 XP)`;
      evalEl.className = 'feedback good';
    } else {
      evalEl.textContent = `Continue treinando. Avaliação automática: ${score}%`;
      evalEl.className = 'feedback bad';
    }
  };

  recognition.onerror = () => {
    evalEl.textContent = 'Erro ao gravar resposta. Tente novamente.';
    evalEl.className = 'feedback bad';
  };
}

document.getElementById('playBtn').addEventListener('click', () => speakText(target));
document.getElementById('recordBtn').addEventListener('click', () => {
  if (!recognition) {
    evalEl.textContent = 'SpeechRecognition indisponível no navegador.';
    evalEl.className = 'feedback bad';
    return;
  }
  try { recognition.start(); } catch {}
});
document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'dashboard.html';
});
