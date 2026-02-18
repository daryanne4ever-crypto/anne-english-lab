const student = requireStudent();
if (!student) throw new Error('No student');

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
    .slice(0, 20)
    .map(item => `<li><strong>${item.activity}</strong> — +${item.xp} XP <span class="muted">(${new Date(item.at).toLocaleString()})</span></li>`)
    .join('');
}

document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'dashboard.html';
});
