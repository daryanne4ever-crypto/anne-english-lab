const student = requireStudent();
if (student) {
  document.getElementById('name').textContent = student.name;
  document.getElementById('level').textContent = student.level;
  document.getElementById('xp').textContent = student.xp;
  document.getElementById('streak').textContent = student.streak;
  document.getElementById('activities').textContent = student.completedActivities;
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  logoutSession();
  window.location.href = 'index.html';
});
