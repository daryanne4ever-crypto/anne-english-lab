const STUDENTS_KEY = 'english_lab_students';
const SESSION_KEY = 'english_lab_session';

const TEACHER_CREDENTIALS = {
  username: 'professora.anne',
  password: 'Anne@2024'
};

const defaultUnitProgress = {
  xp: 0,
  level: 1,
  completedActivities: 0,
  activityLog: []
};

const defaultStudent = {
  name: '',
  level: 1,
  xp: 0,
  streak: 1,
  completedActivities: 0,
  activityLog: [],
  quizCorrectCount: 0,
  unitProgress: {
    unit1: { ...defaultUnitProgress },
    unit2: { ...defaultUnitProgress }
  }
};

function ensureUnitProgressShape(progress) {
  return {
    unit1: { ...defaultUnitProgress, ...(progress?.unit1 || {}) },
    unit2: { ...defaultUnitProgress, ...(progress?.unit2 || {}) }
  };
}

function getStudentsMap() {
  try {
    const raw = localStorage.getItem(STUDENTS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

function saveStudentsMap(students) {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

function normalizeStudentName(name) {
  return name.trim().toLowerCase();
}

function setStudent(name, password) {
  const students = getStudentsMap();
  const key = normalizeStudentName(name);

  const existing = students[key] || { ...defaultStudent, name: name.trim() };
  students[key] = {
    ...defaultStudent,
    ...existing,
    unitProgress: ensureUnitProgressShape(existing.unitProgress),
    name: name.trim(),
    password
  };

  saveStudentsMap(students);
  localStorage.setItem(SESSION_KEY, JSON.stringify({ role: 'student', studentKey: key }));
  return students[key];
}

function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getStudent() {
  const session = getSession();
  if (!session || session.role !== 'student' || !session.studentKey) return { ...defaultStudent };
  const students = getStudentsMap();
  const student = { ...defaultStudent, ...(students[session.studentKey] || {}) };
  student.unitProgress = ensureUnitProgressShape(student.unitProgress);
  return student;
}

function saveCurrentStudent(student) {
  const session = getSession();
  if (!session || session.role !== 'student') return;
  const students = getStudentsMap();
  students[session.studentKey] = {
    ...defaultStudent,
    ...student,
    unitProgress: ensureUnitProgressShape(student.unitProgress)
  };
  saveStudentsMap(students);
}

function addXP(amount, activityName) {
  const student = getStudent();
  if (!student.name) return { ...defaultStudent };
  student.xp += amount;
  const levelByXP = Math.floor(student.xp / 100) + 1;
  student.level = Math.max(student.level || 1, levelByXP);
  student.completedActivities += 1;
  student.activityLog.unshift({
    activity: activityName,
    xp: amount,
    at: new Date().toISOString()
  });
  saveCurrentStudent(student);
  return student;
}

function addUnitXP(unit, amount, activityName) {
  const student = getStudent();
  if (!student.name) return { ...defaultUnitProgress };
  student.unitProgress = ensureUnitProgressShape(student.unitProgress);
  const target = student.unitProgress[unit] || { ...defaultUnitProgress };
  target.xp += amount;
  target.level = Math.floor(target.xp / 100) + 1;
  target.completedActivities += 1;
  target.activityLog.unshift({ activity: activityName, xp: amount, at: new Date().toISOString() });
  student.unitProgress[unit] = target;
  saveCurrentStudent(student);
  return target;
}

function getUnitProgress(unit) {
  const student = getStudent();
  student.unitProgress = ensureUnitProgressShape(student.unitProgress);
  return student.unitProgress[unit] || { ...defaultUnitProgress };
}

function loginTeacher(username, password) {
  const ok = username.trim() === TEACHER_CREDENTIALS.username && password === TEACHER_CREDENTIALS.password;
  if (ok) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ role: 'teacher' }));
  }
  return ok;
}

function getAllStudents() {
  return Object.values(getStudentsMap()).sort((a, b) => b.xp - a.xp);
}

function logoutSession() {
  localStorage.removeItem(SESSION_KEY);
}

function requireStudent(redirectTo = 'index.html') {
  const session = getSession();
  if (!session || session.role !== 'student') {
    window.location.href = redirectTo;
    return null;
  }
  const student = getStudent();
  if (!student.name) {
    window.location.href = redirectTo;
    return null;
  }
  return student;
}

function requireTeacher(redirectTo = 'index.html') {
  const session = getSession();
  if (!session || session.role !== 'teacher') {
    window.location.href = redirectTo;
    return false;
  }
  return true;
}
