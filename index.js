const loginBtn = document.getElementById('loginBtn');
const teacherLoginBtn = document.getElementById('teacherLoginBtn');
const feedback = document.getElementById('loginFeedback');

loginBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!name || !password) {
    feedback.textContent = 'Preencha nome e senha do aluno.';
    feedback.className = 'feedback bad';
    return;
  }

  setStudent(name, password);
  window.location.href = 'dashboard.html';
});

teacherLoginBtn.addEventListener('click', () => {
  const teacherUser = document.getElementById('teacherUser').value.trim();
  const teacherPass = document.getElementById('teacherPass').value;

  if (!teacherUser || !teacherPass) {
    feedback.textContent = 'Preencha usuário e senha da professora.';
    feedback.className = 'feedback bad';
    return;
  }

  const ok = loginTeacher(teacherUser, teacherPass);
  if (!ok) {
    feedback.textContent = 'Credenciais da professora inválidas.';
    feedback.className = 'feedback bad';
    return;
  }

  feedback.textContent = 'Login da professora efetuado.';
  feedback.className = 'feedback good';
  window.location.href = 'performance.html';
});
