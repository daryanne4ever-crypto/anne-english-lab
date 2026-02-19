const student = requireStudent();
if (!student) throw new Error('No student');

const cards = [
  { en:'I', pt:'eu', ipa:'/aɪ/' }, { en:'Me', pt:'mim/me', ipa:'/miː/' }, { en:'My', pt:'meu/minha', ipa:'/maɪ/' },
  { en:'Mine', pt:'meu/minha (pronome)', ipa:'/maɪn/' }, { en:'Myself', pt:'eu mesmo(a)', ipa:'/maɪˈself/' }, { en:'Am', pt:'sou/estou', ipa:'/æm/' },
  { en:'Was', pt:'era/estava', ipa:'/wɒz/' }, { en:'Have', pt:'ter', ipa:'/hæv/' }, { en:'Had', pt:'tinha', ipa:'/hæd/' },
  { en:'Do', pt:'fazer', ipa:'/duː/' }, { en:'Can', pt:'poder', ipa:'/kæn/' }, { en:'Will', pt:'irá / vontade', ipa:'/wɪl/' },
  { en:'Want', pt:'querer', ipa:'/wɒnt/' }, { en:'Need', pt:'precisar', ipa:'/niːd/' }, { en:'Like', pt:'gostar', ipa:'/laɪk/' },
  { en:'Love', pt:'amar', ipa:'/lʌv/' }, { en:'Feel', pt:'sentir', ipa:'/fiːl/' }, { en:'Think', pt:'pensar', ipa:'/θɪŋk/' },
  { en:'Know', pt:'saber', ipa:'/nəʊ/' }, { en:'Believe', pt:'acreditar', ipa:'/bɪˈliːv/' }, { en:'Hope', pt:'esperar', ipa:'/həʊp/' },
  { en:'Live', pt:'morar/viver', ipa:'/lɪv/' }, { en:'Work', pt:'trabalhar', ipa:'/wɜːk/' }, { en:'Study', pt:'estudar', ipa:'/ˈstʌdi/' },
  { en:'Go', pt:'ir', ipa:'/ɡəʊ/' }, { en:'Good', pt:'bom', ipa:'/ɡʊd/' }, { en:'Happy', pt:'feliz', ipa:'/ˈhæpi/' },
  { en:'Tired', pt:'cansado', ipa:'/ˈtaɪəd/' }, { en:'Busy', pt:'ocupado', ipa:'/ˈbɪzi/' }, { en:'Name', pt:'nome', ipa:'/neɪm/' },
  { en:'Home', pt:'casa', ipa:'/həʊm/' }, { en:'Family', pt:'família', ipa:'/ˈfæməli/' }, { en:'Friend', pt:'amigo', ipa:'/frend/' },
  { en:'Job', pt:'trabalho', ipa:'/dʒɒb/' }, { en:'Time', pt:'tempo', ipa:'/taɪm/' }, { en:'Day', pt:'dia', ipa:'/deɪ/' },
  { en:'Life', pt:'vida', ipa:'/laɪf/' }, { en:'Person', pt:'pessoa', ipa:'/ˈpɜːsn/' }, { en:'People', pt:'pessoas', ipa:'/ˈpiːpl/' },
  { en:'Things', pt:'coisas', ipa:'/θɪŋz/' }, { en:'Always', pt:'sempre', ipa:'/ˈɔːlweɪz/' }, { en:'Never', pt:'nunca', ipa:'/ˈnevə/' },
  { en:'Sometimes', pt:'às vezes', ipa:'/ˈsʌmtaɪmz/' }, { en:'Very', pt:'muito', ipa:'/ˈveri/' }, { en:'Really', pt:'realmente', ipa:'/ˈrɪəli/' },
  { en:'Also', pt:'também', ipa:'/ˈɔːlsəʊ/' }, { en:'But', pt:'mas', ipa:'/bʌt/' }, { en:'Because', pt:'porque', ipa:'/bɪˈkɒz/' },
  { en:'So', pt:'então', ipa:'/səʊ/' }, { en:'With', pt:'com', ipa:'/wɪð/' }
];

const grid = document.getElementById('flashGrid');

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = 0.95;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

function render() {
  grid.innerHTML = cards.map((c, i) => `
    <article class="flash-card" data-i="${i}">
      <div class="flash-top">
        <button class="sound-btn" data-sound="${c.en}" title="Ouvir">🔊</button>
        <strong>${c.en}</strong>
      </div>
      <p class="muted hidden-info">${c.pt}</p>
      <p class="muted hidden-info">${c.ipa}</p>
    </article>
  `).join('');
}

grid.addEventListener('click', (e) => {
  const soundBtn = e.target.closest('[data-sound]');
  if (soundBtn) {
    speak(soundBtn.dataset.sound);
    return;
  }

  const card = e.target.closest('.flash-card');
  if (!card) return;

  const infos = card.querySelectorAll('.hidden-info');
  const hidden = infos[0].style.display !== 'block';
  infos.forEach(el => { el.style.display = hidden ? 'block' : 'none'; });

  if (hidden) {
    const i = Number(card.dataset.i);
    addXP(2, `Flashcard aberto: ${cards[i].en}`);
  }
});

document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = '../dashboard.html';
});

render();
