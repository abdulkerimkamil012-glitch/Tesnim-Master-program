/* Tesnim cloud add-on: login + automatic sync + roles. Edit ONLY the two lines below. */
(function () {
  'use strict';
  var SB_URL = 'https://xdjfiiuqiecntyuarvkq.supabase.co', SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkamZpaXVxaWVjbnR5dWFydmtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDM2NDcsImV4cCI6MjEwNjMxOTY0N30.kyiKWvh8OvQQG7vVtLHddc-Sksk_2U3ZVI42o3V51as';
  var SH = ['tesnim_programs', 'tesnim_pages', 'tesnim_trash', 'tesnim_removed_seeds'];
  var MI = ['tesnim_log', 'tesnim_dayov', 'tesnim_first'];
  var PERMS = [['add', '＋ መጨመር'], ['edit', '✎ አርትዕ'], ['del', '🗑 መሰረዝ'], ['trash', '♻ ቆሻሻ መጣያ'], ['dash', '◔ አጠቃላይ ውጤት'], ['rep', '📋 ሪፖርቶች'], ['set', '⚙ ቅንብሮች'], ['stat', '📊 ስታትስቲክስ'], ['cal', '📅 ቀን መቁጠሪያ']];
  var ls = window.localStorage, rawSet = Storage.prototype.setItem, rawRem = Storage.prototype.removeItem;
  var tok = ls.getItem('tesnim_token'), me = null, cur = { sv: 0, mv: 0 }, ready = false, timer = null;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  function api(fn, args) {
    return fetch(SB_URL + '/rest/v1/rpc/' + fn, { method: 'POST', headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(args || {}) })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.message || 'error'); return j; }); });
  }
  function sig() { return cur.sv + ':' + cur.mv + ':' + JSON.stringify([me.programs, me.perms, me.is_admin]); }
  function canShared() { return me.is_admin || (me.programs === 'all' && (me.perms.add || me.perms.edit || me.perms.del)); }

  // Every app save to localStorage is pushed to the cloud a moment later
  Storage.prototype.setItem = function (k, v) {
    rawSet.call(this, k, v);
    if (ready && this === ls && (SH.indexOf(k) > -1 || MI.indexOf(k) > -1)) { clearTimeout(timer); timer = setTimeout(push, 1200); }
  };
  function pick(keys) { var o = {}; keys.forEach(function (k) { var v = ls.getItem(k); if (v != null) o[k] = v; }); return o; }
  function push() {
    timer = null; if (!me) return;
    var sh = canShared();
    api('app_put', { p_tok: tok, p_shared: sh ? pick(SH) : null, p_mine: pick(MI) }).then(function (r) {
      cur.mv = r.mv; if (sh) cur.sv = r.sv; rawSet.call(ls, 'tesnim_cv', sig());
    }).catch(function () { clearTimeout(timer); timer = setTimeout(push, 10000); });
  }
  function apply(d) {
    SH.forEach(function (k) {
      var v = d.shared[k];
      if (k === 'tesnim_programs' && v != null && me.programs !== 'all') {
        var ids = me.programs || [];
        try { v = JSON.stringify(JSON.parse(v).filter(function (p) { return ids.indexOf(p.id) > -1; })); } catch (e) { v = '[]'; }
      }
      if (v == null) rawRem.call(ls, k); else rawSet.call(ls, k, v);
    });
    MI.forEach(function (k) { var v = d.mine[k]; if (v == null) rawRem.call(ls, k); else rawSet.call(ls, k, v); });
    rawSet.call(ls, 'tesnim_cv', sig());
  }
  function safe() {
    var a = document.activeElement;
    return !timer && !(a && /INPUT|TEXTAREA/.test(a.tagName)) && !document.querySelector('.overlay.open,#detailView.open');
  }
  function classes() {
    var b = document.body; b.classList.add('cloud', 'pb');
    if (me.is_admin) b.classList.add('is-admin');
    else PERMS.forEach(function (p) { if (!me.perms[p[0]]) b.classList.add('no-' + p[0]); });
  }
  function logout() {
    api('app_put', { p_tok: tok, p_shared: null, p_mine: pick(MI) }).catch(function () { }).then(function () {
      SH.concat(MI, ['tesnim_token', 'tesnim_cv']).forEach(function (k) { rawRem.call(ls, k); }); location.reload();
    });
  }
  function start(d) {
    me = d.user; cur = { sv: d.sv, mv: d.mv }; classes(); chip();
    if (me.is_admin && d.sv === 0) { ready = true; push(); rawSet.call(ls, 'tesnim_cv', sig()); return unveil(); }
    if (ls.getItem('tesnim_cv') !== sig()) { apply(d); return location.reload(); }
    ready = true; unveil();
    setInterval(function () {
      api('app_get', { p_tok: tok }).then(function (n) {
        me = n.user; var old = cur; cur = { sv: n.sv, mv: n.mv };
        if (ls.getItem('tesnim_cv') !== sig()) { if (safe()) { apply(n); location.reload(); } else cur = old; }
      }).catch(function (e) { if (/auth/.test(e.message)) { ls.removeItem('tesnim_token'); location.reload(); } });
    }, 8000);
  }

  // ---------- UI ----------
  var css = document.createElement('style');
  css.textContent = '.pb{padding-bottom:64px}' +
    '#cl-veil,#cl-login,#cl-admin{position:fixed;inset:0;z-index:60;background:#0c2a20;color:#eaf3e6;font-family:inherit;overflow-y:auto}' +
    '#cl-login{display:flex;align-items:center;justify-content:center;padding:24px}#cl-login form{width:100%;max-width:340px;display:flex;flex-direction:column;gap:12px}' +
    '#cl-login h2,#cl-admin h2{margin:0 0 6px;font-size:22px}.cl-in{padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:#fff;font-size:16px;width:100%;box-sizing:border-box}' +
    '.cl-btn{padding:13px 16px;border-radius:14px;border:0;background:#ffba00;color:#3b2a00;font-weight:700;font-size:15px}.cl-btn.g{background:#ffffff22;color:#fff}.cl-btn.r{background:#c0392b;color:#fff}' +
    '#cl-chip{position:fixed;bottom:10px;left:50%;transform:translateX(-50%);z-index:30;display:flex;gap:8px;align-items:center;padding:6px 8px 6px 14px;border-radius:99px;background:#0c2a20ee;color:#eaf3e6;font-size:13px;box-shadow:0 2px 12px #0006}#cl-chip button{border:0;border-radius:99px;padding:7px 12px;background:#ffffff22;color:#fff;font-size:13px}' +
    '#cl-admin .in{max-width:560px;margin:0 auto;padding:20px 16px 60px}.cl-row{display:flex;gap:8px;align-items:center;justify-content:space-between;padding:12px;margin:8px 0;border-radius:14px;background:#ffffff14}' +
    '.cl-chk{display:flex;gap:10px;align-items:center;padding:7px 0;font-size:15px}.cl-chk input{width:20px;height:20px}#cl-err{color:#ff9d8f;min-height:18px;font-size:14px}.cl-box{max-height:220px;overflow-y:auto;padding:4px 12px;border-radius:12px;background:#ffffff0d}' +
    'body:not(.is-admin) #importBtn,body:not(.is-admin) #exportBtn{display:none}.no-add #addBtn,.no-add #addPageBtn{display:none}.no-edit .edit,.no-edit [data-pgedit],.no-edit .dtab[data-tab=edit]{display:none}' +
    '.no-del .del,.no-del [data-pgdel],.no-del #etDelete,.no-del .trash-purge,.no-del #trashClearAll{display:none}.no-trash #trashBtn{display:none}.no-dash .ringcard{display:none}.no-rep #dayRepBtn,.no-rep #weekBtn{display:none}' +
    '.no-set #remindBtn{display:none}.no-set.no-trash #settingsBtn,.no-set.no-trash #settingsPanel{display:none}.no-stat [data-openstat],.no-stat .dtab[data-tab=stat]{display:none}.no-cal [data-opencal],.no-cal .dtab[data-tab=cal]{display:none}.no-cal.no-stat.no-edit #detailView{display:none!important}';
  document.head.appendChild(css);
  function el(id, html) { var d = document.createElement('div'); d.id = id; d.innerHTML = html || ''; document.body.appendChild(d); return d; }
  function unveil() { var v = $('cl-veil'); if (v) v.remove(); }
  function chip() {
    el('cl-chip', '<span>👤 ' + esc(me.username) + '</span>' + (me.is_admin ? '<button id="cl-adm">👑 ተጠቃሚዎች</button>' : '') + '<button id="cl-out">ውጣ</button>');
    $('cl-out').onclick = logout; if (me.is_admin) $('cl-adm').onclick = admin;
  }
  function login() {
    unveil();
    el('cl-login', '<form id="cl-f"><h2>🌿 ግባ</h2><input class="cl-in" id="cl-u" placeholder="የተጠቃሚ ስም" autocapitalize="none" autocomplete="username"><input class="cl-in" id="cl-p" type="password" placeholder="የይለፍ ቃል" autocomplete="current-password"><div id="cl-err"></div><button class="cl-btn" type="submit">ግባ</button></form>');
    $('cl-f').onsubmit = function (e) {
      e.preventDefault(); $('cl-err').textContent = '...';
      api('app_login', { p_user: $('cl-u').value.trim(), p_pass: $('cl-p').value }).then(function (r) { rawSet.call(ls, 'tesnim_token', r.token); location.reload(); })
        .catch(function (x) { $('cl-err').textContent = /bad/.test(x.message) ? 'ስሙ ወይም የይለፍ ቃሉ ትክክል አይደለም' : 'ግንኙነት አልተሳካም — ቅንብሩን ያረጋግጡ'; });
    };
  }

  // ---------- admin: users, roles, which programs each user sees ----------
  function admin() {
    var box = el('cl-admin', '<div class="in"><p>...</p></div>');
    function close() { box.remove(); }
    function list() {
      api('admin_list', { p_tok: tok }).then(function (us) {
        box.innerHTML = '<div class="in"><h2>👑 ተጠቃሚዎች</h2>' + us.map(function (u) { return '<div class="cl-row"><span><b>' + esc(u.username) + '</b>' + (u.is_admin ? ' 👑' : '') + '</span><span><button class="cl-btn g" data-e="' + u.id + '">አርትዕ</button> <button class="cl-btn r" data-d="' + u.id + '">🗑</button></span></div>'; }).join('') +
          '<p><button class="cl-btn" id="cl-new">＋ አዲስ ተጠቃሚ</button> <button class="cl-btn g" id="cl-x">ዝጋ</button></p></div>';
        $('cl-x').onclick = close; $('cl-new').onclick = function () { form(null); };
        box.querySelectorAll('[data-e]').forEach(function (b) { b.onclick = function () { form(us.filter(function (u) { return u.id === b.dataset.e; })[0]); }; });
        box.querySelectorAll('[data-d]').forEach(function (b) { b.onclick = function () { if (confirm('ይህ ተጠቃሚ ይሰረዝ?')) api('admin_delete', { p_tok: tok, p_id: b.dataset.d }).then(list).catch(function (e) { alert(e.message); }); }; });
      }).catch(function (e) { box.innerHTML = '<div class="in"><p>' + esc(e.message) + '</p><button class="cl-btn g" id="cl-x">ዝጋ</button></div>'; $('cl-x').onclick = close; });
    }
    function form(u) {
      u = u || { username: '', is_admin: false, perms: {}, programs: [] };
      var progs = []; try { progs = JSON.parse(ls.getItem('tesnim_programs') || '[]'); } catch (e) { }
      var all = u.programs === 'all';
      box.innerHTML = '<div class="in"><h2>' + (u.id ? 'አርትዕ' : 'አዲስ ተጠቃሚ') + '</h2>' +
        '<input class="cl-in" id="f-u" placeholder="የተጠቃሚ ስም" value="' + esc(u.username) + '" autocapitalize="none"><br><br><input class="cl-in" id="f-p" type="text" placeholder="' + (u.id ? 'የይለፍ ቃል (ባዶ = አይቀየርም)' : 'የይለፍ ቃል') + '" autocomplete="off">' +
        '<label class="cl-chk"><input type="checkbox" id="f-a"' + (u.is_admin ? ' checked' : '') + '> 👑 አስተዳዳሪ (ሁሉንም ያያል)</label><h3>ፈቃዶች</h3>' +
        PERMS.map(function (p) { return '<label class="cl-chk"><input type="checkbox" data-p="' + p[0] + '"' + (u.perms[p[0]] ? ' checked' : '') + '> ' + p[1] + '</label>'; }).join('') +
        '<h3>የሚያያቸው ፕሮግራሞች</h3><label class="cl-chk"><input type="checkbox" id="f-all"' + (all ? ' checked' : '') + '> ሁሉም ፕሮግራሞች</label><div class="cl-box" id="f-list">' +
        progs.map(function (p) { return '<label class="cl-chk"><input type="checkbox" data-g="' + esc(p.id) + '"' + (all || (u.programs || []).indexOf(p.id) > -1 ? ' checked' : '') + '> ' + esc(p.name) + '</label>'; }).join('') + '</div>' +
        '<div id="cl-err"></div><p><button class="cl-btn" id="f-s">አስቀምጥ</button> <button class="cl-btn g" id="f-c">ተመለስ</button></p></div>';
      $('f-all').onchange = function () { box.querySelectorAll('[data-g]').forEach(function (c) { c.checked = $('f-all').checked; }); };
      $('f-c').onclick = list;
      $('f-s').onclick = function () {
        var perms = {}; box.querySelectorAll('[data-p]').forEach(function (c) { perms[c.dataset.p] = c.checked; });
        var ids = []; box.querySelectorAll('[data-g]').forEach(function (c) { if (c.checked) ids.push(c.dataset.g); });
        api('admin_save', { p_tok: tok, p_id: u.id || null, p_username: $('f-u').value, p_pass: $('f-p').value, p_admin: $('f-a').checked, p_perms: perms, p_programs: $('f-all').checked ? 'all' : ids })
          .then(list).catch(function (e) { $('cl-err').textContent = /duplicate/.test(e.message) ? 'ይህ ስም ተይዟል' : e.message; });
      };
    }
    list();
  }

  // ---------- boot ----------
  if (SB_URL.indexOf('YOUR-') === 0) return;   // not configured yet: app works as before
  el('cl-veil');
  if (!tok) return login();
  api('app_get', { p_tok: tok }).then(start).catch(function (e) {
    if (/auth/.test(e.message)) { ls.removeItem('tesnim_token'); return login(); }
    ready = false; unveil();   // offline: app keeps working from this phone's copy
  });
})();
