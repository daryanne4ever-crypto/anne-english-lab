const loginBtn = document.getElementById('loginBtn');
const feedback = document.getElementById('loginFeedback');

loginBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!name || !password) {
    feedback.textContent = 'Preencha nome e senha.';
    feedback.className = 'feedback bad';
    return;
  }

  setStudent(name, password);
  window.location.href = 'dashboard.html';
});
