/* ═══════════════════════════════════════════════════════════════
   DASHBOARD.JS  — All Dashboard Tab Logic
   THE HUB · Group 22 · FAUM CMP 2022

   Depends on: data.js (Store), auth.js
═══════════════════════════════════════════════════════════════ */

/* ── State ───────────────────────────────────────────────────── */
let _activePage   = 'home';
let _memberFilter = 'all';

/* ── INIT ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 Dashboard DOMContentLoaded event fired');
  console.log('🔐 Checking if logged in...');
  
  // Redirect if not logged in
  if (!Store.isLoggedIn()) {
    console.log('❌ Not logged in, redirecting to index.html');
    window.location.href = 'index.html';
    return;
  }

  console.log('✅ User is logged in');
  setupSidebarUser();
  setupTopbarUser();
  dashNav('home', document.querySelector('[data-page="home"]'));
});

/* ── SIDEBAR USER ────────────────────────────────────────────── */
function setupSidebarUser() {
  const user = Store.getSession();
  if (!user) return;
  const av   = document.getElementById('sidebarAv');
  const name = document.getElementById('sidebarName');
  const role = document.getElementById('sidebarRole');
  if (av)   { av.textContent = user.short || 'G'; av.style.background = user.colorBg || 'rgba(200,75,47,.12)'; av.style.color = user.color || '#c84b2f'; av.style.borderColor = (user.color || '#c84b2f') + '30'; }
  if (name) name.textContent = user.fullName || user.firstName || 'User';
  if (role) role.textContent = (user.roles || [])[0] || user.accountType || 'Visitor';
}

/* ── TOPBAR USER ─────────────────────────────────────────────── */
function setupTopbarUser() {
  const user = Store.getSession();
  if (!user) return;
  const av = document.getElementById('topAvatar');
  if (av) {
    av.textContent   = user.short || 'G';
    av.style.background  = user.colorBg || 'rgba(200,75,47,.12)';
    av.style.color       = user.color || '#c84b2f';
    av.style.borderColor = (user.color || '#c84b2f') + '40';
  }
}

/* ── SIDEBAR TOGGLE (mobile) ─────────────────────────────────── */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
document.addEventListener('click', e => {
  const sidebar  = document.getElementById('sidebar');
  const hamburger = document.querySelector('.topbar-hamburger');
  if (sidebar && !sidebar.contains(e.target) && e.target !== hamburger) {
    sidebar.classList.remove('open');
  }
});

/* ── NAV ─────────────────────────────────────────────────────── */
const PAGE_TITLES = {
  home: 'Home', members: 'Members', projects: 'Projects',
  news: 'News & Updates', profile: 'My Profile', about: 'About'
};

function dashNav(page, btn) {
  _activePage   = page;
  _memberFilter = 'all';

  // Update sidebar active state
  document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Update title
  const titleEl = document.getElementById('dashPageTitle');
  if (titleEl) titleEl.textContent = PAGE_TITLES[page] || page;

  // Clear search
  const search = document.getElementById('dashSearch');
  if (search) search.value = '';

  // Render page
  const content = document.getElementById('dashContent');
  switch (page) {
    case 'home':     renderHome(content);    break;
    case 'members':  renderMembers(content); break;
    case 'projects': renderProjects(content);break;
    case 'news':     renderNews(content);    break;
    case 'profile':  renderProfile(content); break;
    case 'about':    renderAbout(content);   break;
    default:         content.innerHTML = '<div class="state-loading">Page not found.</div>';
  }

  // Close sidebar on mobile after nav
  document.getElementById('sidebar').classList.remove('open');
}

/* ── SEARCH ──────────────────────────────────────────────────── */
function handleDashSearch() {
  const q = (document.getElementById('dashSearch')?.value || '').toLowerCase();
  if (_activePage === 'members') {
    const filtered = Store.getMembers().filter(m =>
      m.name.toLowerCase().includes(q)       ||
      m.roles.some(r => r.toLowerCase().includes(q)) ||
      m.skills.some(s => s.toLowerCase().includes(q))||
      m.id.toLowerCase().includes(q)
    );
    renderMembersGrid(document.getElementById('membersGrid'), filtered);
    const count = document.getElementById('membersCount');
    if (count) count.textContent = filtered.length + ' member' + (filtered.length !== 1 ? 's' : '');
  }
}

/* ════════════════════════════════════════════════
   PAGE RENDERERS
════════════════════════════════════════════════ */

/* ── HOME ────────────────────────────────────────────────────── */
function renderHome(el) {
  const user     = Store.getSession() || {};
  const isGuest  = Store.isGuest();
  const members  = Store.getMembers();
  const accounts = Store.getUsers().length + members.length;
  const hour     = new Date().getHours();
  const greet    = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const displayName = user.fullName || user.firstName || 'Guest';
  const news     = Store.getNews().slice(0, 3);

  el.innerHTML = `
    ${isGuest ? guestGateBanner('Sign in to unlock full profiles, contacts, and project details.') : ''}

    <div class="welcome-banner">
      <div class="wb-left">
        <div class="wb-greeting">${greet} 👋</div>
        <div class="wb-name">${displayName}</div>
        <div class="wb-sub">${
          user.accountType === 'member'
            ? `You're logged in as a Group 22 member · ${(user.roles||[]).join(', ')}`
            : user.accountType === 'guest'
            ? 'Browsing as guest. Create a free account for the full experience.'
            : `Welcome to THE HUB, ${displayName}. Explore Group 22's work.`
        }</div>
      </div>
      <div class="wb-stats">
        <div class="wb-stat-wrap">
          <div class="wb-stat-num">1<span>0</span></div>
          <div class="wb-stat-label">Members</div>
        </div>
        <div class="wb-stat-wrap">
          <div class="wb-stat-num"><span>3</span></div>
          <div class="wb-stat-label">Projects</div>
        </div>
        <div class="wb-stat-wrap">
          <div class="wb-stat-num"><span>${accounts}</span></div>
          <div class="wb-stat-label">Accounts</div>
        </div>
      </div>
    </div>

    <div class="stat-cards">
      <div class="stat-card">
        <div class="stat-card-label">Active Members</div>
        <div class="stat-card-num" style="color:var(--accent)">10</div>
        <div class="stat-card-sub">Group 22 · FAUM CMP 2022</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Projects Running</div>
        <div class="stat-card-num" style="color:#059669">3</div>
        <div class="stat-card-sub">THE HUB, Grade Tracker, CampusConnect</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Latest Update</div>
        <div class="stat-card-num" style="font-size:18px;margin-top:4px">March 2026</div>
        <div class="stat-card-sub">THE HUB v1 launched 🚀</div>
      </div>
    </div>

    <div class="dash-section-title" style="margin-top:4px">Recent News</div>
    <div class="news-list">
      ${news.map(n => newsCardHTML(n)).join('')}
    </div>`;
}

/* ── MEMBERS ─────────────────────────────────────────────────── */
function renderMembers(el) {
  const isGuest = Store.isGuest();
  el.innerHTML = `
    ${isGuest ? guestGateBanner('Contact info is hidden for guests. Create a free account to view emails, phone numbers, and LinkedIn profiles.') : ''}
    <div class="filter-bar">
      <button class="filter-chip active" onclick="setMemberFilter('all',   this)">All</button>
      <button class="filter-chip"        onclick="setMemberFilter('frontend',  this)">Frontend</button>
      <button class="filter-chip"        onclick="setMemberFilter('backend',   this)">Backend</button>
      <button class="filter-chip"        onclick="setMemberFilter('design',    this)">Design</button>
      <button class="filter-chip"        onclick="setMemberFilter('data',      this)">Data</button>
      <button class="filter-chip"        onclick="setMemberFilter('security',  this)">Security</button>
    </div>
    <div class="dash-section-title">
      Group 22 Members
      <span class="dash-section-count" id="membersCount">10 members</span>
    </div>
    <div class="dash-members-grid" id="membersGrid"></div>`;

  renderMembersGrid(document.getElementById('membersGrid'), Store.getMembers());
}

function setMemberFilter(tag, btn) {
  _memberFilter = tag;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const list = tag === 'all' ? Store.getMembers() : Store.getMembers().filter(m => m.filterTag === tag);
  renderMembersGrid(document.getElementById('membersGrid'), list);
  const count = document.getElementById('membersCount');
  if (count) count.textContent = list.length + ' member' + (list.length !== 1 ? 's' : '');
}

function renderMembersGrid(grid, members) {
  if (!grid) return;
  if (!members.length) {
    grid.innerHTML = '<div class="state-empty"><div class="empty-icon">🔍</div><p>No members match that filter.</p></div>';
    return;
  }
  grid.innerHTML = members.map((m, i) => {
    const firstName = m.name.split(' ')[0].toLowerCase();
    const photoPath = `../images/${firstName}.jpeg`;
    return `
      <div class="dash-member-card animate-up" style="animation-delay:${(i * .05).toFixed(2)}s"
           onclick="openMemberModal('${m.id}')">
        <div class="dash-member-photo-wrap">
          <img class="dash-member-photo" src="${photoPath}" alt="${m.name}" loading="lazy"
               onerror="this.style.background='${m.colorBg}'; this.style.visibility='hidden'"/>
          <div class="dash-photo-overlay"></div>
          ${m.isCTO ? '<div class="dash-photo-crown">👑</div>' : ''}
        </div>
        </div>
        <div class="dash-member-info">
          <div class="dash-member-name">${m.name}</div>
          <div class="dash-member-role">${m.roles.join(' · ')}</div>
          <div class="dash-member-skills">
            ${m.skills.slice(0, 3).map(s =>
              `<span class="dash-skill-tag" style="background:${m.colorBg};color:${m.color};border-color:${m.color}40">${s}</span>`
            ).join('')}
            ${m.skills.length > 3 ? `<span class="dash-skill-tag" style="background:var(--surface);color:var(--muted);border-color:var(--border)">+${m.skills.length - 3}</span>` : ''}
          </div>
        </div>
      </div>`;
  }).join('');
}

/* ── PROJECTS ────────────────────────────────────────────────── */
function renderProjects(el) {
  const projects = Store.getProjects();
  el.innerHTML = `
    <div class="dash-section-title">Active Projects <span class="dash-section-count">${projects.length} projects</span></div>
    <div class="projects-grid">
      ${projects.map((p, i) => `
        <div class="project-card animate-up" style="animation-delay:${(i*.1).toFixed(2)}s">
          <div class="project-icon-wrap" style="background:${p.colorBg};border-color:${p.color}40">${p.icon}</div>
          <div class="project-title">${p.title}</div>
          <div class="project-desc">${p.description}</div>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <div class="progress-label">
            <span>Progress</span>
            <span style="color:${p.color};font-weight:600">${p.progress}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${p.progress}%;background:${p.color}"></div>
          </div>
          <div class="project-team">
            ${p.team.map(short => {
              const m = Store.getMembers().find(x => x.short === short);
              return m
                ? `<div class="project-mini-av" style="background:${m.colorBg};color:${m.color}" title="${m.name}">${short}</div>`
                : '';
            }).join('')}
            <span class="project-team-label">${p.team.length} contributors</span>
          </div>
        </div>`).join('')}
    </div>`;
}

/* ── NEWS ────────────────────────────────────────────────────── */
function renderNews(el) {
  const news = Store.getNews();
  el.innerHTML = `
    <div class="dash-section-title">News & Updates <span class="dash-section-count">${news.length} items</span></div>
    <div class="news-list">
      ${news.map((n, i) =>
        `<div class="animate-up" style="animation-delay:${(i*.07).toFixed(2)}s">${newsCardHTML(n)}</div>`
      ).join('')}
    </div>`;
}

function newsCardHTML(n) {
  return `
    <div class="news-card">
      <div class="news-card-icon" style="background:${n.colorBg};border-color:${n.color}30">${n.icon}</div>
      <div>
        <div class="news-card-title">${n.title}</div>
        <div class="news-card-text">${n.text}</div>
        <div class="news-card-date">${n.date}</div>
      </div>
    </div>`;
}

/* ── PROFILE ─────────────────────────────────────────────────── */
function renderProfile(el) {
  const user    = Store.getSession();
  const isGuest = Store.isGuest();

  if (isGuest) {
    el.innerHTML = guestGateBanner('Create a free account to build your profile and connect with Group 22.');
    return;
  }

  // If member, pull full data
  const memberData = user.accountType === 'member' ? Store.getMemberById(user.memberId) : null;
  const skills     = (memberData || user).skills || [];
  const bio        = (memberData || user).bio     || 'No bio added yet.';
  const color      = user.color   || '#c84b2f';
  const colorBg    = user.colorBg || 'rgba(200,75,47,.12)';
  const displayName= user.fullName || [user.firstName, user.lastName].filter(Boolean).join(' ');

  el.innerHTML = `
    <div class="profile-hero-card">
      <div class="profile-big-av" style="background:${colorBg};color:${color};border-color:${color}55">
        ${user.short || 'ME'}
      </div>
      <div>
        <div class="profile-name">${displayName}${user.isCTO ? ' 👑' : ''}</div>
        <div class="profile-role">${(user.roles || []).join(' · ')}</div>
        ${user.matric ? `<div class="profile-matric">${user.matric}</div>` : ''}
        ${user.accountType === 'member' ? '<div class="profile-member-badge">✓ Group 22 Member</div>' : ''}
        <button class="profile-edit-btn" onclick="renderEditProfile()">✎ Edit Profile</button>
      </div>
    </div>

    <div class="profile-section-card">
      <div class="profile-section-label">About</div>
      <p class="profile-bio-text" id="profileBioText">${bio}</p>
    </div>

    <div class="profile-section-card">
      <div class="profile-section-label">Skills</div>
      <div class="profile-skills" id="profileSkillsWrap">
        ${skills.length
          ? skills.map(s => `<span class="profile-skill-tag" style="background:${colorBg};color:${color};border-color:${color}50">${s}</span>`).join('')
          : '<span style="font-size:14px;color:var(--muted)">No skills added yet.</span>'
        }
      </div>
    </div>

    ${memberData?.edu ? `
    <div class="profile-section-card">
      <div class="profile-section-label">Education</div>
      <div class="detail-edu-grid">
        ${memberData.edu.map(e => `
          <div class="detail-edu-card">
            <div class="detail-edu-title">${e.title}</div>
            <div class="detail-edu-sub">${e.sub}</div>
          </div>`).join('')}
      </div>
    </div>` : ''}

    ${user.accountType !== 'member' ? `
    <div class="profile-section-card" id="editProfileForm" style="display:none">
      <div class="profile-section-label">Edit Profile</div>
      <div style="margin-bottom:12px">
        <label style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;display:block;color:var(--muted)">Bio</label>
        <textarea id="editBio" rows="4" style="width:100%;background:var(--surface);border:1.5px solid var(--border);border-radius:8px;padding:11px 14px;font-family:var(--font-body);font-size:14px;resize:vertical;outline:none;color:var(--text)">${bio}</textarea>
      </div>
      <div style="margin-bottom:14px">
        <label style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;display:block;color:var(--muted)">Skills (comma-separated)</label>
        <input id="editSkills" type="text" value="${skills.join(', ')}" style="width:100%;background:var(--surface);border:1.5px solid var(--border);border-radius:8px;padding:11px 14px;font-family:var(--font-body);font-size:14px;outline:none;color:var(--text)" placeholder="e.g. JavaScript, React, Python"/>
      </div>
      <button class="btn btn-primary" onclick="saveProfileEdits()">Save Changes</button>
      <button class="btn btn-ghost" style="margin-left:8px" onclick="document.getElementById('editProfileForm').style.display='none'">Cancel</button>
      <div id="profileSaveMsg" style="font-size:13px;color:var(--green);margin-top:10px;display:none">✓ Profile updated!</div>
    </div>` : ''}`;
}

function renderEditProfile() {
  const form = document.getElementById('editProfileForm');
  if (form) { form.style.display = form.style.display === 'none' ? 'block' : 'none'; }
}

function saveProfileEdits() {
  const user     = Store.getSession();
  const bio      = document.getElementById('editBio')?.value?.trim() || '';
  const skillsRaw= document.getElementById('editSkills')?.value || '';
  const skills   = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);

  Store.updateUser(user.uid, { bio, skills });

  // Update UI
  const bioEl    = document.getElementById('profileBioText');
  const skillsEl = document.getElementById('profileSkillsWrap');
  const color    = user.color || '#c84b2f';
  const colorBg  = user.colorBg || 'rgba(200,75,47,.12)';

  if (bioEl)    bioEl.textContent = bio || 'No bio added yet.';
  if (skillsEl) skillsEl.innerHTML = skills.length
    ? skills.map(s => `<span class="profile-skill-tag" style="background:${colorBg};color:${color};border-color:${color}50">${s}</span>`).join('')
    : '<span style="font-size:14px;color:var(--muted)">No skills added yet.</span>';

  const msg = document.getElementById('profileSaveMsg');
  if (msg) { msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 2500); }
  document.getElementById('editProfileForm').style.display = 'none';
}

/* ── ABOUT ───────────────────────────────────────────────────── */
function renderAbout(el) {
  el.innerHTML = `
    <div class="about-hero-card">
      <div class="about-hero-title">Group 22 · FAUM CMP 2022</div>
      <div class="about-hero-text">THE HUB is our collective digital identity — a living showcase of who we are, what we build, and where we're headed. Built by Group 22, for the whole FAUM community.</div>
    </div>

    <div class="about-info-card">
      <div class="about-info-title">Technology Stack</div>
      <div class="tech-stack-grid" style="margin-top:14px">
        ${[
          ['⚛️','React.js'],['🟢','Node.js'],['🍃','MongoDB'],['🎨','Bootstrap'],
          ['▲','Vercel'],['🐍','Flask'],['🗄️','SQLite'],['🔒','JWT Auth'],
          ['📦','Docker'],['🔥','Firebase']
        ].map(([icon, name]) => `
          <div class="tech-item">
            <div class="tech-item-icon">${icon}</div>
            <div class="tech-item-name">${name}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="about-info-card">
      <div class="about-info-title">Group Leader & CTO 👑</div>
      <div class="about-info-text">
        <strong>Irene Anigo Olong</strong> (BSU/SC/CMP/22/65316) leads Group 22 as Chief Technology Officer and Project Manager, directing all technical decisions while also personally building the frontend.
      </div>
    </div>

    <div class="about-info-card">
      <div class="about-info-title">About THE HUB</div>
      <div class="about-info-text">
        Student groups often struggle to show who their members are, what projects they have done, and achievements in one place. THE HUB solves this with a clean, organised platform for member profiles, project tracking, and news — all in one URL.
      </div>
    </div>`;
}

/* ── MEMBER MODAL (in dashboard) ─────────────────────────────── */
function openMemberModal(memberId) {
  const m = Store.getMemberById(memberId);
  if (!m) return;
  const isAuthed = !Store.isGuest();
  const firstName = m.name.split(' ')[0].toLowerCase();
  const photoPath = `../images/${firstName}.jpeg`;
  const photoBig = `../images/${firstName}.jpeg`;

  const contactHTML = isAuthed
    ? `<div class="contact-list">
        ${m.contact.email ? `<div class="contact-item"><div class="contact-icon">✉</div><div><div class="contact-label">Email</div><div class="contact-value">${m.contact.email}</div></div></div>` : ''}
        ${m.contact.phone ? `<div class="contact-item"><div class="contact-icon">☎</div><div><div class="contact-label">Phone</div><div class="contact-value">${m.contact.phone}</div></div></div>` : ''}
        ${m.contact.linkedin ? `<div class="contact-item"><div class="contact-icon" style="font-size:11px;font-weight:800;color:#0077b5">in</div><div><div class="contact-label">LinkedIn</div><div class="contact-value" style="color:${m.color}">${m.contact.linkedin}</div></div></div>` : ''}
        ${m.contact.Tiktok ? `<div class="contact-item"><div class="contact-icon">♪</div><div><div class="contact-label">TikTok</div><div class="contact-value" style="color:${m.color}">${m.contact.Tiktok}</div></div></div>` : ''}
        ${m.contact.Facebook ? `<div class="contact-item"><div class="contact-icon" style="font-size:12px;font-weight:800;color:#1877f2">f</div><div><div class="contact-label">Facebook</div><div class="contact-value" style="color:${m.color}">${m.contact.Facebook}</div></div></div>` : ''}
        ${m.contact.X ? `<div class="contact-item"><div class="contact-icon" style="font-size:12px;font-weight:800;color:#000">𝕏</div><div><div class="contact-label">X</div><div class="contact-value" style="color:${m.color}">${m.contact.X}</div></div></div>` : ''}
       </div>`
    : `<div class="contact-locked">
        <div class="contact-locked-icon">🔒</div>
        <div class="contact-locked-text"><strong>Sign in to view contact details.</strong></div>
        <button class="btn btn-accent btn-sm" style="margin-top:12px"
                onclick="closeMemberModal();doLogout()">Create Account →</button>
       </div>`;

  document.getElementById('memberModalBox').innerHTML = `
    <div class="detail-banner">
      <img class="detail-banner-img" src="${photoBig}" alt="${m.name}"
           onerror="this.style.background='${m.colorBg}'; this.style.visibility='hidden'"/>
      <div class="detail-banner-overlay"></div>
      <div class="modal-close" onclick="closeMemberModal()"
           style="position:absolute;top:14px;right:14px;z-index:3;background:rgba(0,0,0,.35);border-color:rgba(255,255,255,.2);color:#fff">✕</div>
      <div class="detail-av-wrap">
        <img class="detail-av-img" src="${photoPath}" alt="${m.name}"
             onerror="this.style.background='${m.colorBg}'; this.style.visibility='hidden'"/>
      </div>
    </div>
    <div class="detail-body">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">
        <div>
          <div class="detail-name">${m.name}${m.isCTO ? ' 👑' : ''}</div>
          <div class="detail-id">${m.id}</div>
        </div>
        <span style="padding:4px 12px;background:${m.colorBg};color:${m.color};border:1px solid ${m.color}40;border-radius:100px;font-size:11px;font-weight:700;white-space:nowrap">${m.filterTag}</span>
      </div>
      <div class="detail-roles">
        ${m.roles.map(r => `<span class="detail-role-tag" style="background:${m.colorBg};color:${m.color};border-color:${m.color}40">${r}</span>`).join('')}
        ${m.isLeader ? '<span class="detail-role-tag" style="background:rgba(200,75,47,.1);color:#c84b2f;border-color:rgba(200,75,47,.3)">★ Group Leader</span>' : ''}
      </div>

      <div class="detail-section-label">About</div>
      <p class="detail-bio">${m.bio}</p>

      <div class="detail-section-label">Skills</div>
      <div class="detail-skills">
        ${m.skills.map(s => `<span class="skill-tag" style="background:${m.colorBg};color:${m.color};border-color:${m.color}40">${s}</span>`).join('')}
      </div>

      <div class="detail-section-label">Education & CV</div>
      <div class="detail-edu-grid">
        ${m.edu.map(e => `<div class="detail-edu-card"><div class="detail-edu-title">${e.title}</div><div class="detail-edu-sub">${e.sub}</div></div>`).join('')}
        <div class="detail-edu-card"><div class="detail-edu-title">Group 22 Member</div><div class="detail-edu-sub">FAUM CMP 2022 · Active</div></div>
        <div class="detail-edu-card"><div class="detail-edu-title">THE HUB</div><div class="detail-edu-sub">Core Contributor · 2025–2026</div></div>
      </div>

      <div class="detail-section-label">Contact</div>
      ${contactHTML}
    </div>`;

  document.getElementById('memberModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMemberModal() {
  document.getElementById('memberModal').classList.remove('open');
  document.body.style.overflow = '';
}

function maybeCloseMember(e) {
  if (e.target.id === 'memberModal') closeMemberModal();
}

/* ── SHARED HELPERS ──────────────────────────────────────────── */
function guestGateBanner(msg) {
  return `<div class="guest-gate">
    <div class="guest-gate-icon">✨</div>
    <div class="guest-gate-text"><strong>You're browsing as a guest.</strong> ${msg}</div>
    <button class="btn btn-accent btn-sm" onclick="doLogout()">Create Account →</button>
  </div>`;
}

/* ── KEYBOARD ────────────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMemberModal();
});