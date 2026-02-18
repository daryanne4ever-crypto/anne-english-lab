const STORAGE_KEY = 'english_lab_student';

const defaultStudent = {
  name: '',
  level: 1,
  xp: 0,
  streak: 1,
  completedActivities: 0,
  activityLog: []
};

function getStudent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultStudent };
    return { ...defaultStudent, ...JSON.parse(raw) };
  } catch {
    return { ...defaultStudent };
  }
}

function saveStudent(student) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
}

function setStudent(name, password) {
  const student = getStudent();
  student.name = name;
  student.password = password;
  saveStudent(student);
}

function addXP(amount, activityName) {
  const student = getStudent();
  student.xp += amount;
  student.level = Math.floor(student.xp / 100) + 1;
  student.completedActivities += 1;
  student.activityLog.unshift({
    activity: activityName,
    xp: amount,
    at: new Date().toISOString()
  });
  saveStudent(student);
  return student;
}

function logoutStudent() {
  localStorage.removeItem(STORAGE_KEY);
}

function requireStudent(redirectTo = 'index.html') {
  const student = getStudent();
  if (!student.name) {
    window.location.href = redirectTo;
    return null;
  }
  return student;
}
