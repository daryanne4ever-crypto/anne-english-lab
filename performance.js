const session = getSession();
const roleHint = document.getElementById('roleHint');
const studentSummary = document.getElementById('studentSummary');
const teacherSummary = document.getElementById('teacherSummary');

if (session?.role === 'teacher') {
  requireTeacher();
  roleHint.textContent = 'Área exclusiva da professora.';
  studentSummary.style.display = 'none';
  teacherSummary.style.display = 'block';

  const students = getAllStudents();
  const list = document.getElementById('studentsList');
  if (!students.length) {
    list.innerHTML = '<li>Nenhum aluno cadastrado ainda.</li>';
  } else {
    list.innerHTML = students
      .map((s, i) => `<li><strong>#${i + 1} ${s.name}</strong> — XP: ${s.xp} | Nível: ${s.level} | Streak: ${s.streak} | Atividades: ${s.completedActivities}</li>`)
      .join('');
  }
} else {
  const student = requireStudent();
  if (student) {
    roleHint.textContent = 'Resumo individual do aluno.';
    document.getElementById('studentName').textContent = student.name;
    document.getElementById('studentXP').textContent = student.xp;
    document.getElementById('studentLevel').textContent = student.level;
    document.getElementById('studentActivities').textContent = student.completedActivities;
    document.getElementById('levelProgress').style.width = `${student.xp % 100}%`;

    const logEl = document.getElementById('activityLog');
    if (!student.activityLog.length) {
      logEl.innerHTML = '<li>Nenhuma atividade registrada ainda.</li>';
    } else {
      logEl.innerHTML = student.activityLog
        .slice(0, 30)
        .map(item => `<li><strong>${item.activity}</strong> — +${item.xp} XP <span class="muted">(${new Date(item.at).toLocaleString()})</span></li>`)
        .join('');
    }
  }
}

document.getElementById('backBtn').addEventListener('click', () => {
  if (session?.role === 'teacher') {
    window.location.href = 'index.html';
  } else {
    window.location.href = 'dashboard.html';
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  logoutSession();
  window.location.href = 'index.html';
});
