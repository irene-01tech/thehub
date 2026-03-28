/* ═══════════════════════════════════════════════════════════════
   LANDING.JS  — Landing Page Logic
   THE HUB · Group 22 · FAUM CMP 2022

   Depends on: data.js (Store), auth.js
═══════════════════════════════════════════════════════════════ */

/* ── CURSOR ──────────────────────────────────────────────────── */
function initCursor() {
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('curRing');
  if (!cur || !ring) return;
  document.addEventListener('mousemove', e => {
    cur.style.left  = e.clientX + 'px';
    cur.style.top   = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });
  document.addEventListener('mousedown', () => {
    cur.style.transform = 'translate(-50%,-50%) scale(2)';
  });
  document.addEventListener('mouseup', () => {
    cur.style.transform = 'translate(-50%,-50%) scale(1)';
  });
}

/* ── NAV SCROLL ──────────────────────────────────────────────── */
function initNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ── MOBILE NAV ──────────────────────────────────────────────── */
function toggleMobileNav() {
  const menu = document.getElementById('mobileNav');
  if (menu) menu.classList.toggle('open');
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  const menu = document.getElementById('mobileNav');
  if (menu) menu.classList.remove('open');
}

/* ── MEMBERS LANDING GRID ────────────────────────────────────── */
function buildLandingGrid() {
  const grid = document.getElementById('landingMembersGrid');
  if (!grid) return;

  const members = Store.getMembers();
  // Leader goes first, takes 2 columns
  const leader  = members.find(m => m.isLeader);
  const rest    = members.filter(m => !m.isLeader);
  const ordered = leader ? [leader, ...rest] : members;

  grid.innerHTML = ordered.map((m, i) => {
    const isLeader = m.isLeader;
    const delay    = (i * 0.07).toFixed(2);
    const firstName = m.name.split(' ')[0].toLowerCase();
    const photoPath = `images/${firstName}.jpeg`;
    return `
      <div class="member-card-landing${isLeader ? ' leader' : ''}"
           style="animation: fadeUp .55s ${delay}s ease both; opacity: 0"
           onclick="openMemberModal('${m.id}')">
        ${isLeader ? '<div class="crown-badge" title="Group Leader &amp; CTO">👑</div>' : ''}
        <img class="member-card-photo"
             src="${photoPath}"
             alt="${m.name}"
             loading="lazy"
             onerror="this.style.background='${m.colorBg}'; this.style.visibility='hidden'"/>
        <div class="member-card-info">
          <div class="member-card-name">${m.name}</div>
          <div class="member-card-role">${m.roles.join(' · ')}</div>
          <div class="member-card-cta">View Profile →</div>
        </div>
      </div>`;
  }).join('');

  // Mini avatars in features panel
  buildMiniAvatars(members.slice(0, 8));
}

function buildMiniAvatars(members) {
  const row = document.getElementById('featMiniAvatars');
  if (!row) return;
  row.innerHTML = members.map(m =>
    `<div class="feat-mini-av" style="background:${m.colorBg};color:${m.color}" title="${m.name}">${m.short}</div>`
  ).join('') + `<div class="feat-mini-av" style="background:rgba(255,255,255,.07);color:rgba(255,255,255,.4)">+${Store.getMembers().length - 8}</div>`;
}

/* ── MEMBER DETAIL MODAL ─────────────────────────────────────── */
function openMemberModal(memberId) {
  const m         = Store.getMemberById(memberId);
  if (!m) return;
  const isAuthed  = Store.isLoggedIn() && !Store.isGuest();
  const firstName = m.name.split(' ')[0].toLowerCase();
  const photoPath = `images/${firstName}.jpeg`;
  const photoBig  = `images/${firstName}.jpeg`;

  const contactHTML = isAuthed
    ? `<div class="contact-list">
        ${m.contact.email ? `<div class="contact-item">
          <div class="contact-icon">✉</div>
          <div><div class="contact-label">Email</div><div class="contact-value">${m.contact.email}</div></div>
        </div>` : ''}
        ${m.contact.phone ? `<div class="contact-item">
          <div class="contact-icon">☎</div>
          <div><div class="contact-label">Phone</div><div class="contact-value">${m.contact.phone}</div></div>
        </div>` : ''}
        ${m.contact.linkedin ? `<div class="contact-item">
          <div class="contact-icon" style="font-size:11px;font-weight:800;color:#0077b5">in</div>
          <div><div class="contact-label">LinkedIn</div><div class="contact-value" style="color:${m.color}">${m.contact.linkedin}</div></div>
        </div>` : ''}
        ${m.contact.Tiktok ? `<div class="contact-item">
          <div class="contact-icon">♪</div>
          <div><div class="contact-label">TikTok</div><div class="contact-value" style="color:${m.color}">${m.contact.Tiktok}</div></div>
        </div>` : ''}
        ${m.contact.Facebook ? `<div class="contact-item">
          <div class="contact-icon" style="font-size:12px;font-weight:800;color:#1877f2">f</div>
          <div><div class="contact-label">Facebook</div><div class="contact-value" style="color:${m.color}">${m.contact.Facebook}</div></div>
        </div>` : ''}
        ${m.contact.X ? `<div class="contact-item">
          <div class="contact-icon" style="font-size:12px;font-weight:800;color:#000">𝕏</div>
          <div><div class="contact-label">X</div><div class="contact-value" style="color:${m.color}">${m.contact.X}</div></div>
        </div>` : ''}
       </div>`
    : `<div class="contact-locked">
        <div class="contact-locked-icon">🔒</div>
        <div class="contact-locked-text">
          <strong>Sign in to view contact details.</strong><br>
          Create a free account to access emails, phone numbers, and LinkedIn profiles.
        </div>
        <button class="btn btn-accent btn-sm" style="margin-top:14px"
                onclick="closeMemberModal();openAuth('register')">
          Create Account →
        </button>
       </div>`;

  document.getElementById('memberModalBox').innerHTML = `
    <div class="detail-banner">
      <img class="detail-banner-img" src="${photoBig}" alt="${m.name}"
           onerror="this.style.background='${m.colorBg}'; this.style.visibility='hidden'"/>
      <div class="detail-banner-overlay"></div>
      <div class="modal-close" onclick="closeMemberModal()" style="position:absolute;top:14px;right:14px;z-index:3">✕</div>
      <div class="detail-av-wrap">
        <img class="detail-av-img" src="${photoUrl}" alt="${m.name}"
             onerror="this.style.background='${m.colorBg}'"/>
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
        ${m.edu.map(e => `
          <div class="detail-edu-card">
            <div class="detail-edu-title">${e.title}</div>
            <div class="detail-edu-sub">${e.sub}</div>
          </div>`).join('')}
        <div class="detail-edu-card">
          <div class="detail-edu-title">Group 22 Member</div>
          <div class="detail-edu-sub">FAUM CMP 2022 · Active</div>
        </div>
        <div class="detail-edu-card">
          <div class="detail-edu-title">THE HUB</div>
          <div class="detail-edu-sub">Core Contributor · 2025–2026</div>
        </div>
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

/* ── INTERSECTION OBSERVER — animate on scroll ───────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.member-card-landing, .stat-block, .feat-row').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

/* ── PAGE INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Store === 'undefined') {
    console.error('❌ Store not defined - waiting for data.js to load');
    setTimeout(() => location.reload(), 500);
    return;
  }
  initCursor();
  initNavScroll();
  initAuth();        // from auth.js
  buildLandingGrid();
  initScrollAnimations();

  // If already logged in as a real user, show a "Go to Dashboard" button
  const session = Store.getSession();
  if (session && session.accountType !== 'guest') {
    const navCta = document.querySelector('.nav-cta');
    if (navCta) {
      navCta.textContent = 'Dashboard →';
      navCta.onclick     = () => { window.location.href = 'dashboard.html'; };
    }
  }
});