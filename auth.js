/* ═══════════════════════════════════════════════════════════════
   AUTH.JS  — Login · Register · Logout · Modal Control
   THE HUB · Group 22 · FAUM CMP 2022

   Depends on: data.js  (Store)
═══════════════════════════════════════════════════════════════ */

/* ── State ───────────────────────────────────────────────────── */
let _selectedRole = 'student';

/* ── Open / Close modal ──────────────────────────────────────── */
function openAuth(tab = 'login') {
  switchAuthTab(tab);
  document.getElementById('authModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAuth() {
  document.getElementById('authModal').classList.remove('open');
  document.body.style.overflow = '';
  clearAuthErrors();
}

function maybeCloseAuth(e) {
  if (e.target.id === 'authModal') closeAuth();
}

function switchAuthTab(tab) {
  document.getElementById('loginPanel').style.display    = tab === 'login'    ? 'block' : 'none';
  document.getElementById('registerPanel').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('authTabLogin').classList.toggle('active',    tab === 'login');
  document.getElementById('authTabRegister').classList.toggle('active', tab === 'register');
  clearAuthErrors();
}

function clearAuthErrors() {
  ['liErr', 'regErr', 'regOk'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.className = el.className.replace(' show', ''); el.textContent = ''; }
  });
  document.querySelectorAll('.field-input').forEach(el => el.classList.remove('has-error'));
}

/* ── Quick-fill chips ────────────────────────────────────────── */
function buildQuickChips() {
  if (typeof Store === 'undefined') {
    console.warn('⚠️ Store not yet defined, skipping buildQuickChips');
    return;
  }
  const wrap = document.getElementById('quickChips');
  if (!wrap) return;
  wrap.innerHTML = Store.getMembers().map(m =>
    `<button class="quick-chip" onclick="quickFill('${m.username}')">${m.name.split(' ')[0]}</button>`
  ).join('');
}

function quickFill(username) {
  const el = document.getElementById('liIdentifier');
  const pw = document.getElementById('liPassword');
  if (el) el.value = username;
  if (pw) pw.value = 'pass123';
  // Auto-login after setting credentials
  setTimeout(() => doLogin(), 100);
}

/* ── LOGIN ───────────────────────────────────────────────────── */
function doLogin() {
  const identifier = (document.getElementById('liIdentifier')?.value || '').trim();
  const password   = (document.getElementById('liPassword')?.value   || '');
  const errEl      = document.getElementById('liErr');

  console.log('🔑 doLogin called with identifier:', identifier);

  if (!identifier || !password) {
    console.log('❌ Missing identifier or password');
    showAuthError(errEl, 'Please enter your username/email and password.');
    return;
  }

  setButtonLoading('liBtn', true);

  // Small delay to feel like a real request
  setTimeout(() => {
    console.log('📡 Calling Store.login...');
    const result = Store.login(identifier, password);
    console.log('📤 Store.login result:', result);
    setButtonLoading('liBtn', false);

    if (!result.ok) {
      console.log('❌ Login failed:', result.message);
      showAuthError(errEl, result.message);
      document.getElementById('liIdentifier')?.classList.add('has-error');
      document.getElementById('liPassword')?.classList.add('has-error');
      return;
    }

    console.log('✅ Login successful, redirecting to dashboard');
    closeAuth();
    goToDashboard();
  }, 500);
}

/* ── GUEST ───────────────────────────────────────────────────── */
function guestEnter() {
  if (typeof Store === 'undefined') {
    console.error('❌ Store not yet defined');
    return;
  }
  Store.guestSession();
  closeAuth();
  goToDashboard();
}

/* ── REGISTER ────────────────────────────────────────────────── */
function pickRole(role) {
  _selectedRole = role;
  document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
  const card = document.getElementById('rc-' + role);
  if (card) card.classList.add('active');
}

function doRegister() {
  const firstName  = (document.getElementById('regFirst')?.value  || '').trim();
  const lastName   = (document.getElementById('regLast')?.value   || '').trim();
  const matric     = (document.getElementById('regMatric')?.value || '').trim();
  const email      = (document.getElementById('regEmail')?.value  || '').trim();
  const department = (document.getElementById('regDept')?.value   || '').trim();
  const password   = (document.getElementById('regPass')?.value   || '');
  const confirm    = (document.getElementById('regPass2')?.value  || '');
  const errEl      = document.getElementById('regErr');
  const okEl       = document.getElementById('regOk');

  // Validate
  if (!firstName || !lastName) {
    showAuthError(errEl, 'Please enter your first and last name.'); return;
  }
  if (!email || !email.includes('@')) {
    showAuthError(errEl, 'Please enter a valid email address.'); return;
  }
  if (!matric) {
    showAuthError(errEl, 'Please enter your matric number.'); return;
  }
  if (password.length < 6) {
    showAuthError(errEl, 'Password must be at least 6 characters.'); return;
  }
  if (password !== confirm) {
    showAuthError(errEl, 'Passwords do not match.'); return;
  }

  setButtonLoading('regBtn', true);

  setTimeout(() => {
    const result = Store.registerUser({
      firstName, lastName, email, matric, department,
      password, accountType: _selectedRole
    });
    setButtonLoading('regBtn', false);

    if (!result.ok) {
      showAuthError(errEl, result.message); return;
    }

    // Auto-login after register
    okEl.textContent = '✓ Account created! Signing you in...';
    okEl.classList.add('show');

    setTimeout(() => {
      Store.login(email, password);
      closeAuth();
      goToDashboard();
    }, 1200);
  }, 600);
}

/* ── LOGOUT ──────────────────────────────────────────────────── */
function doLogout() {
  Store.logout();
  // Go back to landing page
  window.location.href = window.location.pathname.includes('dashboard')
    ? '../index.html'
    : 'index.html';
}

/* ── REDIRECT TO DASHBOARD ───────────────────────────────────── */
function goToDashboard() {
  // Redirect to the dashboard in the same site root
  const base = window.location.pathname.replace(/\/[^/]*$/, '/');
  const redirectUrl = base + 'dashboard.html';
  console.log('🚀 Redirecting to dashboard:', redirectUrl);
  console.log('📍 Current pathname:', window.location.pathname);
  window.location.href = redirectUrl;
}

/* ── REDIRECT TO LANDING (if not logged in) ──────────────────── */
function requireAuth() {
  if (!Store.isLoggedIn()) {
    const base = window.location.pathname.includes('/pages/') ? '../' : './';
    window.location.href = base + 'index.html';
    return false;
  }
  return true;
}

/* ── HELPERS ─────────────────────────────────────────────────── */
function showAuthError(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
}

function setButtonLoading(id, loading) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.disabled = loading;
  btn.textContent = loading ? 'Please wait...' : btn.dataset.label || btn.textContent;
}

/* ── KEYBOARD SHORTCUT ───────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeAuth();
    closeMemberModal && closeMemberModal();
  }
  if (e.key === 'Enter') {
    const authModal = document.getElementById('authModal');
    if (authModal && authModal.classList.contains('open')) {
      const loginPanel = document.getElementById('loginPanel');
      if (loginPanel && loginPanel.style.display !== 'none') doLogin();
      else doRegister();
    }
  }
});

/* ── INIT (called by landing.js) ─────────────────────────────── */
function initAuth() {
  if (typeof Store === 'undefined') {
    console.warn('⚠️ Store not defined yet in initAuth, retrying...');
    setTimeout(() => initAuth(), 100);
    return;
  }
  buildQuickChips();
  // If already logged in, landing page redirects to dashboard
  if (Store.isLoggedIn() && !Store.isGuest()) {
    // Only auto-redirect on the landing page
    if (!window.location.pathname.includes('dashboard')) {
      goToDashboard();
    }
  }
}