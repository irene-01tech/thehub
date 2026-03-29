
/* ─── AVATAR helper (DiceBear — swap with real photo URLs) ───── */
const PHOTO_BASE = 'https://api.dicebear.com/7.x/notionists/svg?scale=95&backgroundColor=';

/* ─── SEED: GROUP 22 MEMBERS ──────────────────────────────────── */
const SEED_MEMBERS = [
  {
    id: 'BSU/SC/CMP/22/65229',
    name: 'Sughter Abraham Hian',
    short: 'SAH',
    roles: ['Tech Content Creator'],
    bio: 'Sughter creates engaging tech videos that simplify complex concepts for developers and beginners alike. With strong expertise in real-world systems, he combines his knowledge with storytelling to educate, inspire, and build a growing tech community.',
    skills: ['Technical Content Creation', 'Video Editing','Public Speaking', 'Git'],
    color: '#7c6ef5',
    colorBg: 'rgba(124,110,245,.12)',
    filterTag: 'backend',
    isLeader: false,
    isCTO: false,
    photoBg: 'b6e3f4',
    username: 'sughter.hian',
    password: 'pass123',
    edu: [
      { title: 'B.Sc. Computer Science', sub: 'Benue State University · 2022–present' },
      { title: 'WAEC', sub: '2021 · 9 Credits' }
    ],
    contact: { email: 'Sughterabraham02@gmail.com', phone: '+234 706 574 7874', Tiktok: 'www.tiktok.com/@presidoab' }
  },
  {
    id: 'BSU/SC/CMP/22/65314',
    name: 'Victor Ifeanyi Oliaku',
    short: 'VIO',
    roles: ['Frontend- Developer'],
    bio: 'Victor bridges frontend and backend with equal confidence. He turns complex requirements into clean, working applications across the full technology stack.',
    skills: ['HTML','CSS', 'MySQL', 'JavaScript'],
    color: '#059669',
    colorBg: 'rgba(5,150,105,.12)',
    filterTag: 'backend',
    isLeader: false,
    isCTO: false,
    photoBg: 'c0aede',
    username: 'victor.oliaku',
    password: 'pass123',
    edu: [
      { title: 'B.Sc. Computer Science', sub: 'Benue State University · 2022–present' },
      { title: 'WAEC', sub: '2020 · 8 Credits' }
    ],
    contact: { email: 'victoroliaku@gmail.com', phone: '+234 811 819 1198', linkedin: 'https://www.linkedin.com/feed/' }
  },
  {
    id: 'BSU/SC/CMP/22/65315',
    name: 'Adole Israel Ologba',
    short: 'AIO',
    roles: ['Backend Developer', 'DevOps'],
    bio: 'Adole keeps infrastructure solid and pipelines green. He owns deployment, cloud setup, and ensures Group 22 projects are always live and performant.',
    skills: [ 'Docker', 'CI/CD', 'Python'],
    color: '#d97706',
    colorBg: 'rgba(217,119,6,.12)',
    filterTag: 'backend',
    isLeader: false,
    isCTO: false,
    photoBg: 'd1d4f9',
    username: 'adole.ologba',
    password: 'pass123',
    edu: [
      { title: 'B.Sc. Computer Science', sub: 'Benue State University · 2022–present' },
      { title: 'WAEC', sub: '2021 · 9 Credits' }
    ],
    contact: { email: 'adole.ologba@faum.edu.ng', phone: '+234 810 000 0003', linkedin: 'linkedin.com/in/adole-ologba' }
  },
  {
    id: 'BSU/SC/CMP/22/65316',
    name: 'Irene Anigo Olong',
    short: 'IAO',
    roles: ['Chief Technology Officer', 'Project Manager', 'Frontend Dev'],
    bio: 'Irene leads Group 22 as Chief Technology Officer. She sets technical direction, manages the project roadmap, and personally drives frontend development — all at once, all exceptionally well.',
    skills: ['React.js', 'CSS', 'Figma', 'Agile', 'Team Leadership', 'UI Dev'],
    color: '#c84b2f',
    colorBg: 'rgba(200,75,47,.12)',
    filterTag: 'frontend',
    isLeader: true,
    isCTO: true,
    photoBg: 'ffd5dc',
    username: 'irene.olong',
    password: 'pass123',
    edu: [
      { title: 'B.Sc. Computer Science', sub: 'Benue State University · 2022–present' },
      { title: 'WAEC', sub: '2020 · 10 Credits' }
    ],
    contact: { email: 'olongirene@gmail.com', phone: '+234 912 518 1985', linkedin: 'linkedin.com/in/irene-olong' }
  },
  {
    id: 'BSU/SC/CMP/22/65317',
    name: 'Nelson Ekah Omafu',
    short: 'NEO',
    roles: ['Database Administrator'],
    bio: 'Nelson designs clean, fast database schemas. He ensures every query performs and every byte of data is exactly where it should be — structured, indexed, and secure.',
    skills: ['MySQL', 'PostgreSQL', 'SQL', 'Data Modeling'],
    color: '#0891b2',
    colorBg: 'rgba(8,145,178,.12)',
    filterTag: 'backend',
    isLeader: false,
    isCTO: false,
    photoBg: 'ffdfbf',
    username: 'nelson.omafu',
    password: 'pass123',
    edu: [
      { title: 'B.Sc. Computer Science', sub: 'Benue State University · 2022–present' },
      { title: 'WAEC', sub: '2020 · 8 Credits' }
    ],
    contact: { email: 'nelson.omafu@faum.edu.ng', phone: '+234 810 000 0005', linkedin: 'linkedin.com/in/nelson-omafu' }
  },
  {
    id: 'BSU/SC/CMP/22/65318',
    name: 'Moses Valentino Onah',
    short: 'MVO',
    roles: ['Mobile Developer'],
    bio: 'Moses creates mobile experiences that feel native on every device. His React Native and Android skills make Group 22 products accessible to everyone, everywhere.',
    skills: ['React Native', 'Android', 'Kotlin', 'Firebase', 'UI/UX'],
    color: '#7c3aed',
    colorBg: 'rgba(124,58,237,.12)',
    filterTag: 'frontend',
    isLeader: false,
    isCTO: false,
    photoBg: 'c1f4e1',
    username: 'moses.onah',
    password: 'pass123',
    edu: [
      { title: 'B.Sc. Computer Science', sub: 'Benue State University · 2022–present' },
      { title: 'WAEC', sub: '2020 · 8 Credits' }
    ],
    contact: { email: 'onahmoses118@gmail.com', phone: '+234 814 316 7438', linkedin: 'linkedin.com/in/moses-onah' }
  },
  {
    id: 'BSU/SC/CMP/22/65319',
    name: 'Emmanuel Goodluck Onah',
    short: 'EGO',
    roles: ['DevOps Engineer', 'Cloud'],
    bio: 'Emmanuel runs the pipes. CI/CD, AWS, Docker, monitoring — he makes sure every deployment is clean and every release reaches users without a hitch.',
    skills: ['AWS', 'Docker', 'GitHub Actions', 'CI/CD', 'Linux'],
    color: '#047857',
    colorBg: 'rgba(4,120,87,.12)',
    filterTag: 'backend',
    isLeader: false,
    isCTO: false,
    photoBg: 'ffd700',
    username: 'emmanuel.onah',
    password: 'pass123',
    edu: [
      { title: 'B.Sc. Computer Science', sub: 'Benue State University · 2022–present' },
      { title: 'WAEC', sub: '2020 · 9 Credits' }
    ],
    contact: { email: 'emmanuel.onah@faum.edu.ng', phone: '+234 810 000 0007', linkedin: 'linkedin.com/in/emmanuel-g-onah' }
  },
  {
    id: 'BSU/SC/CMP/22/65320',
    name: 'Dominic John Onah',
    short: 'DJO',
    roles: ['UI/UX Designer'],
    bio: 'Dominic is Group 22\'s design voice. From research to pixel-perfect prototypes, he ensures everything the group ships looks great and works even better.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'CSS'],
    color: '#db2777',
    colorBg: 'rgba(219,39,119,.12)',
    filterTag: 'design',
    isLeader: false,
    isCTO: false,
    photoBg: 'e8d5c4',
    username: 'dominic.onah',
    password: 'pass123',
    edu: [
      { title: 'B.Sc. Computer Science', sub: 'Benue State University · 2022–present' },
      { title: 'WAEC', sub: '2020 · 7 Credits' }
    ],
    contact: { email: 'dominic.onah@faum.edu.ng', phone: '+234 810 000 0008', linkedin: 'linkedin.com/in/dominic-j-onah' }
  },
  {
    id: 'FAUM/SC/CMP/22/65321',
    name: 'Praise Ohegwu Onah',
    short: 'POO',
    roles: ['Frontend Developer', 'Data Analyst'],
    bio: 'Praise owns the frontend and the numbers. She builds beautiful interfaces with React and Bootstrap, then backs every design decision with data-driven insight.',
    skills: ['React', 'Bootstrap', 'CSS', 'Python', 'Power BI', 'Pandas'],
    color: '#b45309',
    colorBg: 'rgba(180,83,9,.12)',
    filterTag: 'frontend',
    isLeader: false,
    isCTO: false,
    photoBg: 'dce8ff',
    username: 'praise.onah',
    password: 'pass123',
    edu: [
      { title: 'B.Sc. Computer Science', sub: 'Benue State University · 2022–present' },
      { title: 'WAEC', sub: '2020 · 9 Credits' }
    ],
    contact: { email: 'onahpraiz@gmail.com', phone: '+234 904 147 3952', Facebook: 'https://www.facebook.com/share/18PZ9L1vkh/' }
  },
  {
   id: 'BSU/SC/CMP/22/65322',
    name: 'Elijah Ofu Ondoma',
    short: 'EOO',
    roles: ['Cybersecurity Analyst'],
    bio: 'Elijah is the group\'s security backbone. He hunts vulnerabilities before attackers do, ensuring every product Group 22 ships is hardened, audited, and safe.',
    skills: ['Network Security', 'Ethical Hacking', 'Kali Linux', 'Python', 'CTF'],
    color: '#1d4ed8',
    colorBg: 'rgba(29,78,216,.12)',
    filterTag: 'security',
    isLeader: false,
    isCTO: false,
    photoBg: 'f4d5b6',
    username: 'elijah.ondoma',
    password: 'pass123',
    edu: [
      { title: 'B.Sc. Computer Science', sub: 'Benue State University · 2022–present' },
      { title: 'WAEC', sub: '2020 · 8 Credits' }
    ],
    contact: { email: 'elijahondoma@gmail.com', phone: '+234 9154149751', linkedin: 'https://www.linkedin.com/in/elijah-ofu-ondoma-6b11a5368?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', X: 'https://x.com/_TheJade_' }
  }
];

/* ─── SEED: PROJECTS ──────────────────────────── */
const SEED_PROJECTS = [
  {
    id: 'proj-1',
    title: 'THE HUB',
    icon: '🏫',
    color: '#c84b2f',
    colorBg: 'rgba(200,75,47,.08)',
    description: 'A unified web platform for Group 22 to showcase members, projects, and achievements. Full authentication, rich profiles, and project tracking.',
    tags: ['HTML/CSS', 'JavaScript', 'LocalStorage'],
    progress: 75,
    status: 'active',
    team: ['IAO', 'POO', 'DJO', 'VIO']
  },
  {
    id: 'proj-2',
    title: 'BSU Grade Tracker',
    icon: '📊',
    color: '#059669',
    colorBg: 'rgba(5,150,105,.08)',
    description: 'Track semester grades, calculate CGPA, and visualise academic performance over time with predictive insights and smart alerts.',
    tags: ['Python', 'SQLite', 'Chart.js'],
    progress: 10,
    status: 'active',
    team: ['NEO', 'AIO', 'EGO']
  },
  {
    id: 'proj-3',
    title: 'CampusConnect',
    icon: '🤝',
    color: '#d97706',
    colorBg: 'rgba(217,119,6,.08)',
    description: 'Peer-to-peer skill exchange platform where BSU students can offer and request tutoring, collaboration, and mentorship.',
    tags: ['React Native', 'Firebase', 'Redux'],
    progress: 30,
    status: 'active',
    team: ['MVO', 'SAH', 'EOO']
  }
];

/* ─── SEED: NEWS ──────────────────────────────── */
const SEED_NEWS = [
  {
    id: 'news-1',
    title: 'THE HUB is live! 🚀',
    icon: '🚀',
    color: '#c84b2f',
    colorBg: 'rgba(200,75,47,.08)',
    text: 'Group 22 officially launched THE HUB — featuring authentication, rich member profiles, project tracking, and a completely redesigned UI.',
    date: 'March 2026',
    pinned: true
  },
  {
    id: 'news-2',
    title: 'Group 22 wins Departmental Hackathon',
    icon: '🏆',
    color: '#d97706',
    colorBg: 'rgba(217,119,6,.08)',
    text: 'First place at the BSU Computer Science departmental hackathon. Group 22 presented CampusConnect to a panel of lecturers and industry professionals.',
    date: 'February 2026',
    pinned: false
  },
  {
    id: 'news-3',
    title: 'Irene Olong appointed CTO 👑',
    icon: '👑',
    color: '#c84b2f',
    colorBg: 'rgba(200,75,47,.08)',
    text: 'Irene Anigo Olong has officially been appointed Chief Technology Officer of Group 22, leading technical strategy alongside her Project Manager and Frontend Dev roles.',
    date: 'January 2026',
    pinned: false
  },
  {
    id: 'news-4',
    title: 'Grade Tracker hits 50% milestone',
    icon: '💻',
    color: '#059669',
    colorBg: 'rgba(5,150,105,.08)',
    text: 'Nelson and Adole shipped the core GPA calculation engine for BSU Grade Tracker. The visual dashboard is the next sprint.',
    date: 'March 2026',
    pinned: false
  },
  {
    id: 'news-5',
    title: 'Security audit complete 🔒',
    icon: '🔒',
    color: '#1d4ed8',
    colorBg: 'rgba(29,78,216,.08)',
    text: 'Elijah completed the first comprehensive security audit of OrgPortfolio, identifying and patching 3 vulnerabilities before launch.',
    date: 'February 2026',
    pinned: false
  }
];

/* ═══════════════════════════════════════════════
   STORE  — localStorage-backed data layer
═══════════════════════════════════════════════ */
const Store = (() => {

  const KEYS = {
    MEMBERS:  'op_members',
    PROJECTS: 'op_projects',
    NEWS:     'op_news',
    USERS:    'op_users',       // registered (non-member) accounts
    SESSION:  'op_session',     // logged-in user object
    SEEDED:   'op_seeded'       // flag: has seed data been loaded?
  };

  /* ── helpers ── */
  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  }
  function write(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  /* ── seed once ── */
  function init() {
    console.log('🔧 Store.init() called');
    if (!read(KEYS.SEEDED)) {
      write(KEYS.MEMBERS,  SEED_MEMBERS);
      write(KEYS.PROJECTS, SEED_PROJECTS);
      write(KEYS.NEWS,     SEED_NEWS);
      write(KEYS.USERS,    []);
      write(KEYS.SEEDED,   true);
      console.log('✅ Data seeded to localStorage');
    } else {
      console.log('✅ Data already seeded');
    }
  }

  /* ── MEMBERS ── */
  function getMembers()       { return read(KEYS.MEMBERS) || SEED_MEMBERS; }
  function getMemberById(id)  { return getMembers().find(m => m.id === id) || null; }
  function getMemberByUsername(u) { return getMembers().find(m => m.username === u) || null; }

  /* ── PROJECTS ── */
  function getProjects()      { return read(KEYS.PROJECTS) || SEED_PROJECTS; }

  /* ── NEWS ── */
  function getNews()          { return read(KEYS.NEWS) || SEED_NEWS; }

  /* ── REGISTERED USERS (non-member accounts) ── */
  function getUsers()         { return read(KEYS.USERS) || []; }
  function saveUsers(arr)     { write(KEYS.USERS, arr); }

  function registerUser(data) {
    const users = getUsers();
    if (users.find(u => u.email === data.email)) {
      return { ok: false, message: 'An account with this email already exists.' };
    }
    const newUser = {
      uid:         'u-' + Date.now(),
      firstName:   data.firstName,
      lastName:    data.lastName,
      email:       data.email,
      password:    data.password,   // plain text — fine for a JS/localStorage demo
      matric:      data.matric || '',
      department:  data.department || 'Computer Science',
      accountType: data.accountType || 'student',
      bio:         '',
      skills:      [],
      color:       '#c84b2f',
      colorBg:     'rgba(200,75,47,.12)',
      createdAt:   new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);
    return { ok: true, user: newUser };
  }

  function updateUser(uid, patch) {
    const users = getUsers();
    const idx   = users.findIndex(u => u.uid === uid);
    if (idx === -1) return false;
    users[idx] = { ...users[idx], ...patch };
    saveUsers(users);
    // Update session if it's the same user
    const session = getSession();
    if (session && session.uid === uid) {
      setSession({ ...session, ...patch });
    }
    return true;
  }

  /* ── SESSION ── */
  function getSession()       { return read(KEYS.SESSION); }
  function setSession(user)   { write(KEYS.SESSION, user); }
  function clearSession()     { localStorage.removeItem(KEYS.SESSION); }
  function isLoggedIn()       { return !!getSession(); }
  function isGuest()          { const s = getSession(); return s && s.accountType === 'guest'; }
  function isMember()         { const s = getSession(); return s && s.accountType === 'member'; }

  /* ── AUTH ── */
  function login(identifier, password) {
    console.log('🔐 Attempting login with:', identifier);
    // Try member accounts first (by username or matric)
    const member = getMembers().find(m =>
      m.username === identifier.trim().toLowerCase() ||
      m.id.toLowerCase() === identifier.trim().toLowerCase()
    );
    if (member) {
      console.log('✅ Member found:', member.name);
      if (member.password !== password) {
        console.log('❌ Wrong password');
        return { ok: false, message: 'Wrong password.' };
      }
      const sessionUser = {
        uid:         'member-' + member.short,
        firstName:   member.name.split(' ')[0],
        lastName:    member.name.split(' ').slice(1).join(' '),
        fullName:    member.name,
        short:       member.short,
        email:       member.contact.email,
        accountType: 'member',
        matric:      member.id,
        color:       member.color,
        colorBg:     member.colorBg,
        roles:       member.roles,
        isLeader:    member.isLeader,
        isCTO:       member.isCTO,
        memberId:    member.id
      };
      setSession(sessionUser);
      console.log('✅ Session set for:', member.name);
      return { ok: true, user: sessionUser, member };
    }

    // Try registered user accounts (by email)
    const users = getUsers();
    const user  = users.find(u => u.email.toLowerCase() === identifier.trim().toLowerCase());
    if (!user) {
      console.log('❌ No account found');
      return { ok: false, message: 'No account found with that email or username.' };
    }
    if (user.password !== password) {
      console.log('❌ Wrong password for registered user');
      return { ok: false, message: 'Incorrect password.' };
    }

    const sessionUser = {
      ...user,
      fullName: user.firstName + ' ' + user.lastName,
      short:    (user.firstName[0] + user.lastName[0]).toUpperCase()
    };
    setSession(sessionUser);
    console.log('✅ Session set for registered user:', user.firstName);
    return { ok: true, user: sessionUser };
  }

  function guestSession() {
    setSession({
      uid: 'guest',
      fullName: 'Guest',
      short: 'G',
      accountType: 'guest',
      color: '#888',
      colorBg: 'rgba(136,136,136,.1)',
      roles: ['Visitor']
    });
  }

  function logout() { clearSession(); }

  /* ── PUBLIC API ── */
  return {
    init,
    getMembers, getMemberById, getMemberByUsername,
    getProjects,
    getNews,
    getUsers, registerUser, updateUser,
    getSession, setSession, clearSession, isLoggedIn, isGuest, isMember,
    login, guestSession, logout,
    PHOTO_BASE: PHOTO_BASE
  };
})();

/* Auto-init on load */
console.log('🚀 Loading data.js - calling Store.init()');
Store.init();
console.log('✅ Store is ready');