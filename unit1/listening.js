const student = requireStudent();
if (!student) throw new Error('No student');

const WORDS = [
  'I','Me','My','Mine','Myself','Am','Was','Have','Had','Do','Can','Will','Want','Need','Like','Love','Feel','Think','Know','Believe','Hope','Live','Work','Study','Go','Good','Happy','Tired','Busy','Name','Home','Family','Friend','Job','Time','Day','Life','Person','People','Things','Always','Never','Sometimes','Very','Really','Also','But','Because','So','With'
];

const SHORT = [
  'I am happy.', 'I love music.', 'My name is...', 'I need help.', 'I feel tired.', 'I live here.', 'This is mine.', 'I am busy.', 'I work hard.', 'I like coffee.',
  'I can cook.', 'Time is short.', 'I am ready.', 'My family matters.', 'I study English.', 'I am home.', 'I want that.', 'I feel good.', 'I have time.', 'I did it.',
  'See me now.', 'I am cold.', 'My dog plays.', 'I know him.', 'I hate waiting.', 'I believe you.', 'Life is good.', 'I am student.', 'Help me please.', 'I go now.'
];

const MEDIUM = [
  'I really love my job.', 'I am a very busy person.', 'My family lives in Brazil.', 'I want to travel soon.', 'I need to sleep now.', 'I feel happy today, thanks.',
  'I have a big green car.', 'My house is very small.', 'I study every single day.', "I don't know the answer.", 'I am drinking some water.', 'My friend is very tall.',
  'I always wake up early.', 'I like to eat pasta.', 'I was born in July.', 'I am learning new things.', 'My mother is a teacher.', 'I have two young brothers.',
  'I want a new phone.', 'I am waiting for you.', 'My favorite color is blue.', 'I hope to see you.', 'I can speak a little.', 'I work at the bank.',
  'I am proud of myself.', 'I think about my future.', 'My cat sleeps all day.', 'I enjoy reading good books.', 'I am listening to music.', 'I have many great friends.'
];

const CONNECTORS = [
  "I am tired but I'm happy.", 'I study because I want more.', "I am hungry so I'll eat.", 'I like tea and also coffee.', 'I work hard but I rest.',
  'I am late so I run.', "I stay home because it's raining.", 'I have a car and a bike.', 'I love dogs but not cats.', 'I am sick so I stay.',
  'I learn fast because I practice.', 'I am tall and also strong.', 'I want money so I work.', "I like her but she's shy.", "I read books because they're good.",
  'I am calm and very patient.', 'I lost my key so sad.', 'I go out but I return.', 'I exercise because it is healthy.', 'I speak English and also Spanish.',
  "I am free so let's go.", 'I tried but I failed today.', 'I sing because I am happy.', 'I have dreams and big goals.', 'I am alone but not lonely.',
  'I am smart so I win.', 'I cry because I am human.', 'I cook well and also clean.', 'I need rest so I sleep.', 'I like winter but love summer.',
  'I study because I need knowledge.', "I am here and I'm ready.", "I forgot it so I'm sorry.", 'I play games but I study.', 'I travel because I love nature.',
  'I am young and also brave.', 'I am broke so I save.', 'I smile but I am nervous.', "I help people because it's right.", 'I write poems and also stories.'
];

function getByCategory(cat) {
  if (cat === 'short') return SHORT;
  if (cat === 'medium') return MEDIUM;
  if (cat === 'connectors') return CONNECTORS;
  return [...SHORT, ...MEDIUM, ...CONNECTORS];
}

const categoryEl = document.getElementById('category');
const targetEl = document.getElementById('targetPhrase');
const spokenEl = document.getElementById('spoken');
const evalEl = document.getElementById('evaluation');
const counterEl = document.getElementById('phraseCounter');
const phraseListEl = document.getElementById('phraseList');
const wordButtonsEl = document.getElementById('wordButtons');

let phrasePool = getByCategory('all');
let idx = 0;

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

function normalize(t) {
  return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ').trim();
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const c = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + c);
    }
  }
  return dp[m][n];
}

function similarity(spoken, expected) {
  const a = normalize(spoken);
  const b = normalize(expected);
  if (!a && !b) return 100;
  if (!a || !b) return 0;
  const d = levenshtein(a, b);
  return Math.max(0, Math.round((1 - d / Math.max(a.length, b.length)) * 100));
}

function renderTarget() {
  const phrase = phrasePool[idx] || '-';
  targetEl.textContent = phrase;
  counterEl.textContent = `Frase ${idx + 1} de ${phrasePool.length}`;
}

function renderPhraseList() {
  phraseListEl.innerHTML = phrasePool.map((p, i) => `<li><button class="btn btn-secondary" data-pick="${i}">${i + 1}. ${p}</button></li>`).join('');
}

function renderWords() {
  wordButtonsEl.innerHTML = WORDS.map((w, i) => `<button class="btn btn-secondary" data-word="${w}">${i + 1}. ${w}</button>`).join('');
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
    const target = phrasePool[idx] || '';
    const score = similarity(spoken, target);

    if (score >= 80) {
      addXP(20, `Listening excelente (${score}%)`);
      evalEl.textContent = `Excelente! Score: ${score}% (+20 XP)`;
      evalEl.className = 'feedback good';
    } else if (score >= 55) {
      addXP(10, `Listening bom (${score}%)`);
      evalEl.textContent = `Bom! Score: ${score}% (+10 XP)`;
      evalEl.className = 'feedback good';
    } else {
      evalEl.textContent = `Score: ${score}%. Continue treinando.`;
      evalEl.className = 'feedback bad';
    }
  };

  recognition.onerror = () => {
    evalEl.textContent = 'Erro ao gravar resposta. Tente novamente.';
    evalEl.className = 'feedback bad';
  };
}

document.getElementById('playBtn').addEventListener('click', () => speakText(phrasePool[idx] || ''));
document.getElementById('recordBtn').addEventListener('click', () => {
  if (!recognition) {
    evalEl.textContent = 'SpeechRecognition indisponível no navegador.';
    evalEl.className = 'feedback bad';
    return;
  }
  try { recognition.start(); } catch {}
});

document.getElementById('nextBtn').addEventListener('click', () => {
  idx = (idx + 1) % phrasePool.length;
  renderTarget();
});

document.getElementById('randomBtn').addEventListener('click', () => {
  idx = Math.floor(Math.random() * phrasePool.length);
  renderTarget();
});

categoryEl.addEventListener('change', () => {
  phrasePool = getByCategory(categoryEl.value);
  idx = 0;
  renderTarget();
  renderPhraseList();
});

phraseListEl.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-pick]');
  if (!btn) return;
  idx = Number(btn.dataset.pick);
  renderTarget();
  speakText(phrasePool[idx]);
});

wordButtonsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-word]');
  if (!btn) return;
  speakText(btn.dataset.word);
});

document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = '../dashboard.html';
});

renderWords();
renderTarget();
renderPhraseList();
