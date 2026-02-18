import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import {
  getDatabase,
  ref,
  set,
  update,
  onValue,
  query,
  orderByChild,
  limitToLast
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

const firebaseConfig = {
  apiKey: window.__FIREBASE_API_KEY || '',
  authDomain: window.__FIREBASE_AUTH_DOMAIN || '',
  projectId: window.__FIREBASE_PROJECT_ID || '',
  storageBucket: window.__FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: window.__FIREBASE_MESSAGING_SENDER_ID || '',
  appId: window.__FIREBASE_APP_ID || '',
  databaseURL: window.__FIREBASE_DATABASE_URL || ''
};

const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.appId);

let app;
let auth;
let db;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getDatabase(app);
}

const lessons = [
  { en: 'Hi, I am new here.', pt: 'Oi, eu sou novo aqui.', keywords: ['hi', 'new', 'here'], cat: 'Greetings' },
  { en: 'My name is Ana.', pt: 'Meu nome é Ana.', keywords: ['name', 'ana'], cat: 'Self Intro' },
  { en: 'I am from Brazil.', pt: 'Eu sou do Brasil.', keywords: ['from', 'brazil'], cat: 'Origin' },
  { en: 'I am a student.', pt: 'Eu sou estudante.', keywords: ['student'], cat: 'Occupation' },
  { en: 'I love music and sports.', pt: 'Eu adoro música e esportes.', keywords: ['love', 'music', 'sports'], cat: 'Hobbies' }
];

const state = {
  currentLesson: 0,
  XP: 0,
  lessonsCompleted: 0,
  streak: 0,
  uid: null,
  email: null,
  localRanking: []
};

const el = {
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  loginBtn: document.getElementById('login-button'),
  registerBtn: document.getElementById('register-button'),
  authFeedback: document.getElementById('auth-feedback'),
  userBadge: document.getElementById('user-badge'),
  lessonCategory: document.getElementById('lesson-category'),
  lessonTitle: document.getElementById('lesson-title'),
  lessonTranslation: document.getElementById('lesson-translation'),
  progressBar: document.getElementById('progress-bar'),
  listenBtn: document.getElementById('listen-btn'),
  recordBtn: document.getElementById('start-recording'),
  nextBtn: document.getElementById('next-btn'),
  result: document.getElementById('result'),
  rankings: document.getElementById('rankings'),
  feedback: document.getElementById('feedback-box'),
  xp: document.getElementById('xp'),
  level: document.getElementById('level'),
  lessons: document.getElementById('lessons'),
  streak: document.getElementById('streak')
};

function updateUI() {
  const lesson = lessons[state.currentLesson];
  el.lessonCategory.textContent = lesson.cat;
  el.lessonTitle.textContent = lesson.en;
  el.lessonTranslation.textContent = lesson.pt;
  el.progressBar.style.width = `${(state.currentLesson / lessons.length) * 100}%`;

  el.xp.textContent = state.XP;
  el.level.textContent = calculateLevel();
  el.lessons.textContent = state.lessonsCompleted;
  el.streak.textContent = state.streak;
  el.userBadge.textContent = state.email || 'Anonymous user';
}

function navigateTo(screen) {
  const ids = {
    lesson: 'lesson-card',
    ranking: 'ranking-container',
    login: 'login-overlay'
  };
  const target = document.getElementById(ids[screen]);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setFeedback(text, ok = true) {
  el.feedback.className = `feedback ${ok ? 'success' : 'error'}`;
  el.feedback.textContent = text;
}

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ').trim();
}

function checkPronunciation(spokenText) {
  const lesson = lessons[state.currentLesson];
  const speech = normalize(spokenText);
  const hits = lesson.keywords.filter((k) => speech.includes(k));
  const ratio = hits.length / lesson.keywords.length;

  if (ratio >= 0.6) {
    calculateXP(25);
    state.lessonsCompleted += 1;
    setFeedback(`Muito bem! Você acertou ${Math.round(ratio * 100)}%.`);
    trackLessonProgress(lesson.en);
  } else {
    calculateXP(5);
    setFeedback(`Continue praticando. Similaridade: ${Math.round(ratio * 100)}%.`, false);
  }

  updateUI();
  syncUserStats();
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => el.recordBtn.classList.add('recording');
  recognition.onend = () => el.recordBtn.classList.remove('recording');
  recognition.onerror = (e) => setFeedback(`Erro de reconhecimento: ${e.error}`, false);
  recognition.onresult = (event) => {
    const speechResult = event.results?.[0]?.[0]?.transcript || '';
    el.result.textContent = speechResult || 'Sem resultado de fala.';
    checkPronunciation(speechResult);
  };
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function calculateXP(points) {
  state.XP += points;
}

function calculateLevel() {
  return Math.floor(state.XP / 100) + 1;
}

function trackLessonProgress() {
  state.streak = Math.max(1, state.streak);
}

function nextLesson() {
  state.currentLesson = (state.currentLesson + 1) % lessons.length;
  updateUI();
}

async function createOrLogin(email, password, mode = 'login') {
  if (!isFirebaseConfigured) {
    state.email = email || 'local@user';
    state.uid = `local-${state.email}`;
    el.authFeedback.textContent = 'Modo local ativo (sem Firebase configurado).';
    updateUI();
    return;
  }

  try {
    if (mode === 'register') {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
    el.authFeedback.textContent = 'Autenticação realizada com sucesso.';
  } catch (error) {
    el.authFeedback.textContent = `Erro de autenticação: ${error.message}`;
  }
}

function syncUserStats() {
  if (!isFirebaseConfigured || !state.uid) {
    const existing = state.localRanking.find((u) => u.uid === state.uid);
    const payload = {
      uid: state.uid,
      email: state.email || 'local@user',
      XP: state.XP,
      lessonsCompleted: state.lessonsCompleted,
      streak: state.streak
    };
    if (existing) {
      Object.assign(existing, payload);
    } else {
      state.localRanking.push(payload);
    }
    renderLocalRanking();
    return;
  }

  const userRef = ref(db, `rankings/${state.uid}`);
  update(userRef, {
    email: state.email || 'anonymous',
    XP: state.XP,
    lessonsCompleted: state.lessonsCompleted,
    streak: state.streak,
    updatedAt: Date.now()
  });
}

function renderLocalRanking() {
  const players = [...state.localRanking].sort((a, b) => b.XP - a.XP).slice(0, 10);
  el.rankings.innerHTML = players.map((player, index) => {
    const me = player.uid === state.uid ? 'user-position' : '';
    return `<li class="${me}"><span>#${index + 1} ${player.email}</span><strong>${player.XP} XP</strong></li>`;
  }).join('') || '<li>Sem ranking ainda.</li>';
}

function subscribeRanking() {
  if (!isFirebaseConfigured) {
    renderLocalRanking();
    return;
  }

  const rankingsRef = query(ref(db, 'rankings'), orderByChild('XP'), limitToLast(20));
  onValue(rankingsRef, (snapshot) => {
    const val = snapshot.val() || {};
    const players = Object.values(val).sort((a, b) => b.XP - a.XP).slice(0, 10);
    el.rankings.innerHTML = players.map((player, index) => {
      const me = player.email === state.email ? 'user-position' : '';
      return `<li class="${me}"><span>#${index + 1} ${player.email}</span><strong>${player.XP} XP</strong></li>`;
    }).join('') || '<li>Sem ranking ainda.</li>';
  });
}

function initializeAnonymousIfNeeded() {
  if (!isFirebaseConfigured) return;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      state.uid = user.uid;
      state.email = user.email || 'anonymous@firebase';
      updateUI();
      const userRef = ref(db, `rankings/${state.uid}`);
      await set(userRef, {
        email: state.email,
        XP: state.XP,
        lessonsCompleted: state.lessonsCompleted,
        streak: state.streak,
        createdAt: Date.now()
      });
    } else {
      await signInAnonymously(auth);
    }
  });
}

el.loginBtn.addEventListener('click', () => {
  const email = el.email.value.trim();
  const password = el.password.value.trim();
  if (!email || !password) {
    el.authFeedback.textContent = 'Preencha email e senha.';
    return;
  }
  createOrLogin(email, password, 'login');
});

el.registerBtn.addEventListener('click', () => {
  const email = el.email.value.trim();
  const password = el.password.value.trim();
  if (!email || !password) {
    el.authFeedback.textContent = 'Preencha email e senha.';
    return;
  }
  createOrLogin(email, password, 'register');
});

el.listenBtn.addEventListener('click', () => speak(lessons[state.currentLesson].en));
el.recordBtn.addEventListener('click', () => {
  if (!recognition) {
    setFeedback('Seu navegador não suporta SpeechRecognition.', false);
    return;
  }
  try {
    recognition.start();
  } catch {
    setFeedback('Reconhecimento já em execução.', false);
  }
});
el.nextBtn.addEventListener('click', nextLesson);

window.updateUI = updateUI;
window.navigateTo = navigateTo;
window.speak = speak;
window.calculateXP = calculateXP;
window.calculateLevel = calculateLevel;
window.trackLessonProgress = trackLessonProgress;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

initializeAnonymousIfNeeded();
subscribeRanking();
updateUI();
