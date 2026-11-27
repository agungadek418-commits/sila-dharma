/**
 * APP.JS — STT SILA DHARMA (versi multi-halaman)
 * Dipakai bersama oleh semua halaman. Tiap bagian hanya jalan kalau elemennya ada di halaman tersebut.
 * Urutan script di HTML: /js/assets-map.js -> /js/data.js -> /js/app.js
 */
(function () {
  'use strict';

  var D = window.STT_DATA;
  var PAGE = document.body.getAttribute('data-page') || 'beranda';

  // Transisi antar halaman: pakai View Transitions bawaan browser jika ada, kalau tidak pakai fade
  var NATIVE_VT = 'PageRevealEvent' in window;
  if (!NATIVE_VT) document.documentElement.classList.add('no-vt');

  // URL bersih (tanpa .html). Tiap halaman = folder berisi index.html
  var ROUTES = {
    'beranda': '/',
    'tentang': '/tentang/',
    'organisasi': '/organisasi/',
    'kegiatan': '/kegiatan/',
    'galeri': '/galeri/',
    'berita': '/berita/',
    'anggota': '/anggota/',
    'kontak': '/kontak/'
  };

  function routeHref(r) { return ROUTES[r] || '/'; }
  function assetUrl(p) { return (window.ASSET_MAP && window.ASSET_MAP[p]) || p; }
  function byId(id) { return document.getElementById(id); }
  function icons() { if (window.lucide) window.lucide.createIcons(); }

  // Link lama berbentuk index.html#tentang atau diarahkan ke halaman barunya
  if (PAGE === 'beranda' && window.location.hash) {
    var parts = window.location.hash.slice(1).split(':');
    if (parts[0] !== 'beranda' && ROUTES[parts[0]]) {
      window.location.replace(ROUTES[parts[0]]);
      return;
    }
  }

  // ---------- Toast ----------
  function showToast(msg) {
    var t = byId('site-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'site-toast';
      t.className = 'toast-notice';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove('show'); }, 3400);
  }

  // ---------- Gambar statis (logo, foto) diisi dari ASSET_MAP ----------
  function initAssets() {
    document.querySelectorAll('img[data-asset]').forEach(function (img) {
      img.src = assetUrl(img.getAttribute('data-asset'));
    });
  }

  // ---------- Navigasi, drawer mobile, back to top ----------
  function initChrome() {
    var navKey = PAGE;
    document.querySelectorAll('.desktop-nav-link').forEach(function (a) {
      a.classList.toggle('active', a.dataset.route === navKey);
    });
    document.querySelectorAll('.bottom-nav-item').forEach(function (a) {
      a.classList.toggle('active', a.dataset.route === navKey);
    });
    document.querySelectorAll('.drawer-link').forEach(function (a) {
      var act = a.dataset.route === navKey;
      a.classList.toggle('text-white', act);
      a.classList.toggle('text-[#A3A3A3]', !act);
    });

    var menuBtn = byId('mobile-menu-btn');
    var mobileMenu = byId('mobile-menu');
    if (menuBtn && mobileMenu) {
      // Buka/tutup menu + kunci scroll halaman di belakangnya
      var backdrop = document.createElement('div');
      backdrop.className = 'menu-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
      var setMenu = function (open) {
        backdrop.classList.toggle('show', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        mobileMenu.classList.toggle('hidden', !open);
        document.body.classList.toggle('menu-open', open);
      };
      menuBtn.addEventListener('click', function () {
        setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) setMenu(false);
      });
      mobileMenu.addEventListener('click', function (e) {
        if (e.target.closest('a')) setMenu(false);
      });
      // klik di mana saja di luar menu (area gelap, header, dll.) menutup menu
      document.addEventListener('click', function (e) {
        if (mobileMenu.classList.contains('hidden')) return;
        if (mobileMenu.contains(e.target) || menuBtn.contains(e.target)) return;
        setMenu(false);
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth >= 1024) setMenu(false);
      });
    }

    var siteHeader = document.querySelector('body > header');
    if (siteHeader) {
      var onScroll = function () { siteHeader.classList.toggle('is-scrolled', window.scrollY > 24); };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    var btt = byId('back-to-top');
    if (btt) {
      window.addEventListener('scroll', function () { btt.classList.toggle('visible', window.scrollY > 360); }, { passive: true });
      btt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }
  }

  // ---------- Dropdown kustom (menggantikan tampilan <select> bawaan browser) ----------
  function initSelects() {
    var CHEV = '<svg class="cs-chev" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7.5l5 5 5-5"/></svg>';
    var CHECK = '<svg class="cs-check" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 10.5l3.5 3.5 7.5-8"/></svg>';

    document.querySelectorAll('select').forEach(function (sel, n) {
      if (sel.dataset.csReady) return;
      sel.dataset.csReady = '1';

      var label = sel.id ? document.querySelector('label[for="' + sel.id + '"]') : null;
      var wrap = document.createElement('div');
      wrap.className = 'cs' + (sel.classList.contains('w-full') ? ' cs-block' : '');
      sel.parentNode.insertBefore(wrap, sel);
      wrap.appendChild(sel);
      sel.classList.add('cs-native');
      sel.tabIndex = -1;
      sel.setAttribute('aria-hidden', 'true');

      var menuId = 'cs-menu-' + n;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cs-btn';
      btn.setAttribute('aria-haspopup', 'listbox');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', menuId);
      if (label && label.textContent.trim()) btn.setAttribute('aria-label', label.textContent.trim());
      btn.innerHTML = '<span class="cs-val"></span>' + CHEV;

      var menu = document.createElement('ul');
      menu.id = menuId;
      menu.className = 'cs-menu';
      menu.setAttribute('role', 'listbox');
      menu.tabIndex = -1;
      wrap.appendChild(btn);
      wrap.appendChild(menu);

      var active = sel.selectedIndex;

      function build() {
        menu.innerHTML = Array.prototype.map.call(sel.options, function (o, i) {
          return '<li role="option" id="' + menuId + '-' + i + '" class="cs-opt" data-i="' + i + '"' +
            (o.disabled ? ' aria-disabled="true"' : '') + '><span>' + o.textContent + '</span>' + CHECK + '</li>';
        }).join('');
        sync();
      }
      function sync() {
        var cur = sel.options[sel.selectedIndex];
        btn.querySelector('.cs-val').textContent = cur ? cur.textContent : '';
        Array.prototype.forEach.call(menu.children, function (li, i) {
          li.setAttribute('aria-selected', String(i === sel.selectedIndex));
        });
      }
      function highlight(i) {
        active = Math.max(0, Math.min(sel.options.length - 1, i));
        Array.prototype.forEach.call(menu.children, function (li, k) { li.classList.toggle('is-active', k === active); });
        var el = menu.children[active];
        if (el) {
          menu.setAttribute('aria-activedescendant', el.id);
          var top = el.offsetTop, bottom = top + el.offsetHeight;
          if (top < menu.scrollTop) menu.scrollTop = top - 6;
          else if (bottom > menu.scrollTop + menu.clientHeight) menu.scrollTop = bottom - menu.clientHeight + 6;
        }
      }
      function isOpen() { return wrap.classList.contains('open'); }
      function open() {
        if (isOpen()) return;
        document.querySelectorAll('.cs.open').forEach(function (w) { w.classList.remove('open'); });
        var r = btn.getBoundingClientRect();
        var need = Math.min(menu.scrollHeight, 260) + 16;
        var below = window.innerHeight - r.bottom;
        wrap.classList.toggle('up', below < need && r.top > below);
        wrap.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        highlight(sel.selectedIndex);
        menu.focus({ preventScroll: true });
      }
      function close(refocus) {
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        if (refocus) btn.focus();
      }
      function choose(i) {
        var o = sel.options[i];
        if (!o || o.disabled) return;
        var changed = sel.selectedIndex !== i;
        sel.selectedIndex = i;
        sync();
        close(true);
        if (changed) sel.dispatchEvent(new Event('change', { bubbles: true }));
      }

      btn.addEventListener('click', function () { if (isOpen()) close(false); else open(); });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(); }
      });
      menu.addEventListener('click', function (e) {
        var li = e.target.closest('.cs-opt');
        if (li) choose(parseInt(li.dataset.i, 10));
      });
      menu.addEventListener('mousemove', function (e) {
        var li = e.target.closest('.cs-opt');
        if (li && !li.classList.contains('is-active')) highlight(parseInt(li.dataset.i, 10));
      });
      menu.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); highlight(active + 1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(active - 1); }
        else if (e.key === 'Home') { e.preventDefault(); highlight(0); }
        else if (e.key === 'End') { e.preventDefault(); highlight(sel.options.length - 1); }
        else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(active); }
        else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true); }
        else if (e.key === 'Tab') { close(false); }
        else if (e.key.length === 1) {
          var ch = e.key.toLowerCase();
          for (var k = 1; k <= sel.options.length; k++) {
            var idx = (active + k) % sel.options.length;
            if (sel.options[idx].textContent.trim().toLowerCase().indexOf(ch) === 0) { highlight(idx); break; }
          }
        }
      });
      document.addEventListener('mousedown', function (e) { if (isOpen() && !wrap.contains(e.target)) close(false); });
      if (sel.form) sel.form.addEventListener('reset', function () { setTimeout(sync, 0); });

      build();
    });
  }

  // ---------- Transisi halaman (fallback fade untuk browser tanpa View Transitions) ----------
  function initPageTransitions() {
    if (NATIVE_VT) return;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) document.documentElement.classList.remove('page-leaving');
    });
    if (reduced) return;
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      var url;
      try { url = new URL(a.href, window.location.href); } catch (err) { return; }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      e.preventDefault();
      document.documentElement.classList.add('page-leaving');
      setTimeout(function () { window.location.href = url.href; }, 220);
    });
  }

  // ---------- Scroll reveal ----------
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    els.forEach(function (el) { obs.observe(el); });
  }

  // ---------- Hero carousel (auto scroll 3 detik + fade halus, titik penanda saja) ----------
  function initHero() {
    var heroImg = byId('hero-slide-img');
    if (!heroImg) return;

    var slides = D.heroSlides;
    var count = slides.length;
    var slideIdx = 0;
    var heroBox = heroImg.parentElement;
    var heroText = heroBox.querySelector('.relative.z-10');
    var HERO_INTERVAL = 3000;
    var FADE_MS = 450;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null;
    var paused = false;
    var busy = false;

    heroImg.style.transition = 'opacity ' + FADE_MS + 'ms ease, transform 3600ms ease-out';
    heroText.style.transition = 'opacity ' + FADE_MS + 'ms ease, transform ' + FADE_MS + 'ms ease';

    function render() {
      var s = slides[slideIdx];
      heroImg.src = assetUrl(s.image);
      byId('hero-slide-title').textContent = s.title;
      byId('hero-slide-subtitle').textContent = s.subtitle;
      var cta = byId('hero-slide-cta');
      cta.href = routeHref(s.ctaRoute);
      cta.querySelector('span').textContent = s.ctaLabel;
      byId('hero-dots').innerHTML = slides.map(function (_, i) {
        return '<button type="button" data-slide-dot="' + i + '" class="h-2 rounded-full transition-all cursor-pointer ' + (i === slideIdx ? 'w-6 bg-white' : 'w-2 bg-white/40') + '" aria-label="Slide ' + (i + 1) + '"></button>';
      }).join('');
    }

    function go(i) {
      var next = (i + count) % count;
      if (busy || next === slideIdx) return;
      if (reduced) { slideIdx = next; render(); return; }
      busy = true;
      heroImg.style.opacity = '0';
      heroText.style.opacity = '0';
      heroText.style.transform = 'translateY(8px)';
      setTimeout(function () {
        slideIdx = next;
        render();
        heroImg.style.transform = 'scale(1.04)';
        var show = function () {
          requestAnimationFrame(function () {
            heroImg.style.opacity = '0.8';
            heroImg.style.transform = 'scale(1)';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
            setTimeout(function () { busy = false; }, FADE_MS);
          });
        };
        if (heroImg.complete) show(); else { heroImg.onload = show; heroImg.onerror = show; }
      }, FADE_MS);
    }

    function stop() { clearInterval(timer); timer = null; }
    function start() {
      stop();
      if (reduced || paused || document.hidden) return;
      timer = setInterval(function () { go(slideIdx + 1); }, HERO_INTERVAL);
    }

    render();

    byId('hero-dots').addEventListener('click', function (e) {
      var dot = e.target.closest('[data-slide-dot]');
      if (dot) { go(parseInt(dot.dataset.slideDot, 10)); start(); }
    });

    heroBox.addEventListener('mouseenter', function () { paused = true; stop(); });
    heroBox.addEventListener('mouseleave', function () { paused = false; start(); });
    heroBox.addEventListener('focusin', function () { paused = true; stop(); });
    heroBox.addEventListener('focusout', function () { paused = false; start(); });
    heroBox.addEventListener('touchstart', function () { stop(); }, { passive: true });
    heroBox.addEventListener('touchend', function () { start(); }, { passive: true });
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
    start();
  }

  // ---------- Peta interaktif (Leaflet) ----------
  function initMap() {
    var mapEl = byId('banjar-map');
    if (!mapEl || !window.L) return;

    var center = D.org.mapCenter;
    var map = L.map('banjar-map', { zoomControl: false }).setView(center, D.org.mapZoom);
    var markers = [];
    var isSatellite = true;

    var satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; World Imagery', maxZoom: 19
    }).addTo(map);
    var streetLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; World Street Map', maxZoom: 19
    });

    function renderMarkers(cat, query) {
      markers.forEach(function (m) { map.removeLayer(m); });
      markers = [];
      var q = (query || '').trim().toLowerCase();
      var pts = D.mapPoints.filter(function (p) {
        return (cat === 'Semua' || p.category === cat) &&
          (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
      });
      pts.forEach(function (p) {
        var icon = L.divIcon({
          className: '',
          html: '<div class="custom-map-pin"><span>' + p.shortCode + '</span></div>',
          iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -34]
        });
        var marker = L.marker(p.coords, { icon: icon }).addTo(map);
        marker.bindPopup('<div style="min-width:190px"><p style="font-size:10px;font-weight:700;text-transform:uppercase;color:#404040;margin:0 0 3px">' + p.category + '</p><p style="font-size:13px;font-weight:800;color:#0A0A0A;margin:0 0 4px">' + p.name + '</p><p style="font-size:12px;color:#404040;margin:0;line-height:1.4">' + p.desc + '</p></div>');
        markers.push(marker);
      });
      if (pts.length === 1) {
        map.flyTo(pts[0].coords, 16, { duration: 0.6 });
        markers[0].openPopup();
      }
    }
    renderMarkers('Semua', '');

    byId('map-zoom-in').addEventListener('click', function () { map.zoomIn(); });
    byId('map-zoom-out').addEventListener('click', function () { map.zoomOut(); });
    byId('map-recenter').addEventListener('click', function () { map.flyTo(center, 15, { duration: 0.6 }); });

    byId('map-layer-toggle').addEventListener('click', function () {
      if (isSatellite) {
        map.removeLayer(satelliteLayer);
        streetLayer.addTo(map);
        byId('map-layer-label').textContent = 'Mode: Peta Jalan';
      } else {
        map.removeLayer(streetLayer);
        satelliteLayer.addTo(map);
        byId('map-layer-label').textContent = 'Mode: Satelit';
      }
      isSatellite = !isSatellite;
    });

    var sel = byId('map-category-select');
    var search = byId('map-search-input');
    sel.addEventListener('change', function () { renderMarkers(sel.value, search.value); });
    search.addEventListener('input', function () { renderMarkers(sel.value, search.value); });
  }

  // ---------- Beranda ----------
  function initHome() {
    var sotk = byId('home-sotk-slider');
    if (sotk) {
      sotk.innerHTML = D.sotk.map(function (p) {
        return '<article class="sotk-card">' +
          '<div class="aspect-[4/4.2] bg-[#E5E5E5] overflow-hidden"><img src="' + assetUrl(p.photo) + '" alt="' + p.nama + '" class="w-full h-full object-cover" loading="lazy"/></div>' +
          '<div class="bg-[#0A0A0A] text-white text-center px-3 py-4">' +
          '<h3 class="text-sm font-extrabold uppercase tracking-tight truncate">' + p.nama + '</h3>' +
          '<p class="mt-0.5 text-xs text-[#D4D4D4] truncate">' + p.jabatan + '</p></div></article>';
      }).join('');
      var prev = byId('sotk-prev'), next = byId('sotk-next');
      if (prev) prev.addEventListener('click', function () { sotk.scrollBy({ left: -240, behavior: 'smooth' }); });
      if (next) next.addEventListener('click', function () { sotk.scrollBy({ left: 240, behavior: 'smooth' }); });
    }

    var stats = byId('home-stats-grid');
    if (stats) {
      stats.innerHTML = D.membershipStats.map(function (s) {
        return '<div class="flex flex-col items-center p-4 rounded-2xl bg-[#F5F5F5] border border-[#E5E5E5]">' +
          '<div class="w-12 h-12 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center mb-3"><i data-lucide="' + s.icon + '" class="w-6 h-6"></i></div>' +
          '<p class="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">' + s.value + '</p>' +
          '<p class="mt-1 text-xs sm:text-sm font-bold text-[#0A0A0A]">' + s.label + '</p>' +
          '<p class="text-[11px] text-[#404040]">' + s.note + '</p></div>';
      }).join('');
    }

    var events = byId('home-events-grid');
    if (events) {
      events.innerHTML = D.events.slice(0, 3).map(function (ev) {
        return '<article class="rounded-2xl overflow-hidden border border-[#E5E5E5] bg-white flex flex-col">' +
          '<div class="media-zoom aspect-[16/10] block"><img src="' + assetUrl(ev.image) + '" alt="' + ev.title + '" loading="lazy"/></div>' +
          '<div class="p-5 flex flex-col flex-1">' +
          '<div class="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#404040]"><span>' + ev.category + '</span><span class="bg-[#0A0A0A] text-white px-2 py-0.5 rounded">' + ev.statusLabel + '</span></div>' +
          '<h3 class="mt-3 text-base font-bold text-[#0A0A0A] leading-snug">' + ev.title + '</h3>' +
          '<p class="mt-2 text-xs text-[#404040] flex-1">' + ev.summary + '</p>' +
          '<div class="mt-4 pt-3 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#404040]"><span>' + ev.date + '</span><span>' + ev.location + '</span></div></div></article>';
      }).join('');
    }
  }

  // ---------- Struktur Organisasi ----------
  function initOrganization() {
    var stage = byId('org-inti-stage');
    if (stage) {
      var list = D.sotk, n = list.length, active = 0;
      stage.innerHTML = list.map(function (p, i) {
        return '<div class="cflow-card" data-i="' + i + '" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + ' dari ' + n + '">' +
          '<img src="' + assetUrl(p.photo) + '" alt="' + p.nama + '" loading="lazy" draggable="false"/>' +
          '<div class="cflow-info"><h3>' + p.nama + '</h3><p>' + p.jabatan + '</p></div></div>';
      }).join('');
      var cards = Array.prototype.slice.call(stage.children);
      var swiped = false;

      var layout = function () {
        var step = cards[0].offsetWidth * 0.6;
        cards.forEach(function (card, i) {
          var d = i - active;
          if (d > n / 2) d -= n;
          if (d < -n / 2) d += n;
          var abs = Math.abs(d);
          var scale = abs === 0 ? 1 : abs === 1 ? 0.84 : 0.7;
          var x = Math.max(-2, Math.min(2, d)) * step;
          card.style.transform = 'translateX(calc(-50% + ' + x + 'px)) scale(' + scale + ')';
          card.style.zIndex = String(10 - abs);
          card.style.opacity = abs === 0 ? '1' : abs === 1 ? '0.8' : abs === 2 ? '0.45' : '0';
          card.style.pointerEvents = abs > 2 ? 'none' : 'auto';
          card.classList.toggle('is-active', abs === 0);
          card.setAttribute('aria-hidden', abs === 0 ? 'false' : 'true');
        });
      };
      var go = function (i) { active = (i + n) % n; layout(); };

      cards.forEach(function (card) {
        card.addEventListener('click', function () {
          if (swiped) { swiped = false; return; }
          go(Number(card.dataset.i));
        });
      });
      var prevBtn = byId('org-inti-prev'), nextBtn = byId('org-inti-next');
      if (prevBtn) prevBtn.addEventListener('click', function () { go(active - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { go(active + 1); });
      stage.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
      });
      // geser (swipe) di layar sentuh
      var startX = null;
      stage.addEventListener('pointerdown', function (e) { startX = e.clientX; swiped = false; });
      stage.addEventListener('pointerup', function (e) {
        if (startX === null) return;
        var dx = e.clientX - startX; startX = null;
        if (Math.abs(dx) > 40) { swiped = true; go(active + (dx < 0 ? 1 : -1)); }
      });
      stage.addEventListener('pointercancel', function () { startX = null; });
      window.addEventListener('resize', layout);
      layout();
    }
    var bidang = byId('org-bidang-grid');
    if (bidang) {
      bidang.innerHTML = D.bidang.map(function (b, idx) {
        return '<article class="rounded-xl border border-[#E5E5E5] bg-[#F5F5F5] p-6 flex flex-col justify-between">' +
          '<div><span class="text-[11px] font-bold uppercase tracking-widest text-[#404040]">Bidang 0' + (idx + 1) + '</span>' +
          '<h3 class="mt-2 text-lg font-bold text-[#0A0A0A]">' + b.nama + '</h3>' +
          '<p class="mt-2 text-sm text-[#404040]">' + b.deskripsi + '</p></div>' +
          '<div class="mt-5 pt-3 border-t border-[#E5E5E5]"><p class="text-[11px] uppercase text-[#404040]">Koordinator</p><p class="text-sm font-bold text-[#0A0A0A]">' + b.koordinator + '</p></div></article>';
      }).join('');
    }
  }

  // ---------- Kegiatan (daftar) ----------
  function initEvents() {
    var grid = byId('events-grid');
    if (!grid) return;
    var empty = byId('events-empty');
    var status = 'all';

    function render() {
      var list = D.events.filter(function (e) { return status === 'all' || e.status === status; });
      if (!list.length) { grid.innerHTML = ''; empty.classList.remove('hidden'); return; }
      empty.classList.add('hidden');
      grid.innerHTML = list.map(function (ev) {
        return '<article class="rounded-2xl overflow-hidden border border-[#E5E5E5] bg-white flex flex-col">' +
          '<div class="media-zoom aspect-[16/9] block"><img src="' + assetUrl(ev.image) + '" alt="' + ev.title + '" loading="lazy"/></div>' +
          '<div class="p-6 flex flex-col flex-1">' +
          '<div class="flex items-center justify-between text-xs font-bold"><span class="bg-[#0A0A0A] text-white px-2.5 py-0.5 rounded">' + ev.statusLabel + '</span><span class="text-[#404040]">' + ev.category + '</span></div>' +
          '<h2 class="mt-3 text-lg font-bold text-[#0A0A0A]">' + ev.title + '</h2>' +
          '<p class="mt-2 text-sm text-[#404040] flex-1">' + ev.summary + '</p>' +
          '<div class="mt-4 pt-4 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-2 text-xs text-[#404040]">' +
          '<span>' + ev.date + ' · ' + ev.time + '</span><span>' + ev.location + '</span></div></div></article>';
      }).join('');
    }

    document.querySelectorAll('[data-event-status]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-event-status]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        status = btn.dataset.eventStatus;
        render();
      });
    });
    render();
  }

  // ---------- Galeri + Lightbox ----------
  function initGallery() {
    var grid = byId('gallery-masonry');
    if (!grid) return;
    var empty = byId('gallery-empty');
    var lb = byId('gallery-lightbox');
    var cat = 'Semua', year = 'Semua', filtered = [], idx = 0;
    var PAGE_SIZE = 6, shown = PAGE_SIZE;

    // Tombol "Lihat Lebih Banyak" dibuat otomatis di bawah grid
    var more = byId('gallery-more');
    if (!more) {
      more = document.createElement('div');
      more.id = 'gallery-more';
      more.className = 'mt-10 flex justify-center';
      more.innerHTML = '<button type="button" id="gallery-more-btn" class="btn-outline"></button>';
      grid.parentNode.insertBefore(more, grid.nextSibling);
    }
    var moreBtn = byId('gallery-more-btn');

    function render() {
      filtered = D.gallery.filter(function (item) {
        return (cat === 'Semua' || item.category === cat) && (year === 'Semua' || item.year === year);
      });
      byId('gallery-count').textContent = filtered.length + ' Dokumentasi';
      if (!filtered.length) { grid.innerHTML = ''; more.classList.add('hidden'); empty.classList.remove('hidden'); return; }
      empty.classList.add('hidden');
      grid.innerHTML = filtered.slice(0, shown).map(function (item, i) {
        var badge = item.type === 'video' ? '<span class="absolute top-3 left-3 bg-[#0A0A0A] text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase inline-flex items-center gap-1"><i data-lucide="play" class="w-3 h-3"></i> Video · ' + item.duration + '</span>' : '';
        return '<figure class="masonry-item rounded-2xl overflow-hidden border border-[#E5E5E5] bg-white">' +
          '<button type="button" data-lb-index="' + i + '" class="media-zoom relative block w-full aspect-[3/4] text-left cursor-pointer"><img src="' + assetUrl(item.src) + '" alt="' + item.title + '" loading="lazy"/>' + badge + '</button>' +
          '<figcaption class="p-4 flex items-start justify-between gap-2"><div><p class="text-[11px] font-bold uppercase text-[#404040]">' + item.category + ' · ' + item.year + '</p><h3 class="mt-0.5 text-sm font-bold text-[#0A0A0A]">' + item.title + '</h3></div>' +
          '<button type="button" data-lb-index="' + i + '" class="p-1 text-[#0A0A0A] cursor-pointer" aria-label="Perbesar"><i data-lucide="maximize-2" class="w-4 h-4"></i></button></figcaption></figure>';
      }).join('');
      var canExpand = filtered.length > shown;
      var canCollapse = !canExpand && filtered.length > PAGE_SIZE;
      more.classList.toggle('hidden', !canExpand && !canCollapse);
      moreBtn.dataset.mode = canExpand ? 'more' : 'less';
      moreBtn.textContent = canExpand
        ? 'Lihat Lebih Banyak (' + (filtered.length - shown) + ' lagi)'
        : 'Lihat Lebih Sedikit';
      icons();
    }

    moreBtn.addEventListener('click', function () {
      if (moreBtn.dataset.mode === 'less') {
        shown = PAGE_SIZE;
        render();
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        shown += PAGE_SIZE;
        render();
      }
    });

    function update() {
      var it = filtered[idx];
      if (!it) return;
      byId('lightbox-img').src = assetUrl(it.src);
      byId('lightbox-img').alt = it.title;
      byId('lightbox-meta').textContent = it.category + ' · ' + it.year;
      byId('lightbox-title').textContent = it.title;
      byId('lightbox-caption').textContent = it.caption;
      byId('lightbox-counter').textContent = (idx + 1) + ' / ' + filtered.length;
      var vl = byId('lightbox-video-link');
      if (it.type === 'video' && it.videoUrl) { vl.href = it.videoUrl; vl.classList.remove('hidden'); }
      else { vl.classList.add('hidden'); }
    }
    function prev() { if (!filtered.length) return; idx = (idx - 1 + filtered.length) % filtered.length; update(); }
    function next() { if (!filtered.length) return; idx = (idx + 1) % filtered.length; update(); }
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }

    grid.addEventListener('click', function (e) {
      var t = e.target.closest('[data-lb-index]');
      if (!t) return;
      idx = parseInt(t.dataset.lbIndex, 10);
      update();
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    byId('lightbox-close').addEventListener('click', close);
    byId('lightbox-prev').addEventListener('click', prev);
    byId('lightbox-next').addEventListener('click', next);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });

    document.querySelectorAll('[data-gallery-cat]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-gallery-cat]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        cat = btn.dataset.galleryCat;
        shown = PAGE_SIZE;
        render();
      });
    });
    byId('gallery-year-filter').addEventListener('change', function (e) { year = e.target.value; shown = PAGE_SIZE; render(); });
    render();
  }

  // ---------- Berita ----------
  function initNews() {
    var grid = byId('news-grid');
    if (!grid) return;
    var empty = byId('news-empty');
    var modal = byId('article-modal');
    var cat = 'Semua', query = '';

    function render() {
      var q = query.trim().toLowerCase();
      var list = D.news.filter(function (n) {
        return (cat === 'Semua' || n.category === cat) && (!q || n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q));
      });
      if (!list.length) { grid.innerHTML = ''; empty.classList.remove('hidden'); return; }
      empty.classList.add('hidden');
      grid.innerHTML = list.map(function (n) {
        return '<article class="rounded-2xl overflow-hidden border border-[#E5E5E5] bg-white flex flex-col">' +
          '<div class="media-zoom aspect-[16/9]"><img src="' + assetUrl(n.image) + '" alt="' + n.title + '" loading="lazy"/></div>' +
          '<div class="p-6 flex flex-col flex-1"><div class="flex justify-between text-xs font-bold text-[#404040]"><span class="text-[#0A0A0A]">' + n.category + '</span><span>' + n.date + '</span></div>' +
          '<h2 class="mt-2.5 text-lg font-bold text-[#0A0A0A]">' + n.title + '</h2><p class="mt-2 text-sm text-[#404040] flex-1">' + n.summary + '</p>' +
          '<div class="mt-5 pt-4 border-t border-[#E5E5E5]"><button type="button" data-read-article="' + n.id + '" class="text-xs font-bold uppercase tracking-wider text-[#0A0A0A] inline-flex items-center gap-1.5 cursor-pointer">Baca Selengkapnya <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></button></div></div></article>';
      }).join('');
      icons();
    }

    function close() { modal.classList.remove('open'); document.body.style.overflow = ''; }

    grid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-read-article]');
      if (!btn) return;
      var it = D.news.find(function (x) { return x.id === btn.dataset.readArticle; });
      if (!it) return;
      byId('article-modal-body').innerHTML =
        '<div class="rounded-xl overflow-hidden aspect-[16/9] mb-5"><img src="' + assetUrl(it.image) + '" alt="' + it.title + '" class="w-full h-full object-cover"/></div>' +
        '<p class="text-xs font-bold uppercase text-[#404040]">' + it.category + ' · ' + it.date + '</p>' +
        '<h2 class="mt-2 text-2xl font-extrabold text-[#0A0A0A]">' + it.title + '</h2>' +
        '<div class="mt-4 space-y-3 text-sm text-[#404040] leading-relaxed">' + it.content.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    byId('close-article-modal').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });

    document.querySelectorAll('[data-news-cat]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-news-cat]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        cat = btn.dataset.newsCat;
        render();
      });
    });
    byId('news-search').addEventListener('input', function (e) { query = e.target.value; render(); });
    render();
  }

  // ---------- Anggota ----------
  function initMembers() {
    var grid = byId('members-grid');
    if (!grid) return;
    var empty = byId('members-empty');
    var status = 'Semua', query = '';

    function render() {
      var q = query.trim().toLowerCase();
      var list = D.members.filter(function (m) {
        return (status === 'Semua' || m.status === status) && (!q || m.nama.toLowerCase().includes(q) || m.jabatan.toLowerCase().includes(q));
      });
      byId('member-count').textContent = list.length + ' Anggota Ditampilkan';
      if (!list.length) { grid.innerHTML = ''; empty.classList.remove('hidden'); return; }
      empty.classList.add('hidden');
      grid.innerHTML = list.map(function (m) {
        return '<article class="rounded-xl overflow-hidden border border-[#E5E5E5] bg-white">' +
          '<div class="aspect-[4/4.2] bg-[#E5E5E5]"><img src="' + assetUrl(m.photo) + '" alt="' + m.nama + '" class="w-full h-full object-cover" loading="lazy"/></div>' +
          '<div class="p-4"><span class="inline-block text-[10px] font-bold uppercase border border-[#0A0A0A] px-2 py-0.5 rounded">' + m.status + '</span>' +
          '<h2 class="mt-2 text-sm font-bold text-[#0A0A0A]">' + m.nama + '</h2><p class="text-xs text-[#404040]">' + m.jabatan + '</p></div></article>';
      }).join('');
    }

    document.querySelectorAll('[data-member-status]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-member-status]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        status = btn.dataset.memberStatus;
        render();
      });
    });
    byId('member-search').addEventListener('input', function (e) { query = e.target.value; render(); });
    render();
  }

  // ---------- Form Aspirasi & Kontak ----------
  function initContact() {
    var form = byId('contact-form');
    if (!form) return;
    var DRAFT_KEY = 'stt_sila_dharma_lokapaksa_draft';
    var fields = ['contact-name', 'contact-email', 'contact-subject', 'contact-message'];

    try {
      var saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
      fields.forEach(function (id) { var el = byId(id); if (el && saved[id]) el.value = saved[id]; });
    } catch (err) {}

    function setErr(id, msg) {
      var inp = byId(id), er = byId(id + '-error');
      if (inp) inp.classList.toggle('has-error', Boolean(msg));
      if (er) { er.textContent = msg || ''; er.classList.toggle('hidden', !msg); }
    }
    function check(id) {
      var v = (byId(id).value || '').trim();
      if (id === 'contact-name' && v.length < 2) { setErr(id, 'Nama lengkap minimal 2 karakter.'); return false; }
      if (id === 'contact-email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setErr(id, 'Masukkan email yang valid.'); return false; }
      if (id === 'contact-subject' && v.length < 3) { setErr(id, 'Subjek minimal 3 karakter.'); return false; }
      if (id === 'contact-message' && v.length < 10) { setErr(id, 'Isi pesan minimal 10 karakter.'); return false; }
      setErr(id, '');
      return true;
    }

    fields.forEach(function (id) {
      var el = byId(id);
      el.addEventListener('input', function () {
        try {
          var d = {};
          fields.forEach(function (f) { d[f] = byId(f).value; });
          localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
        } catch (err) {}
      });
      el.addEventListener('blur', function () { check(id); });
    });

    // Teks tujuan (nomor & email pengurus) diambil dari js/data.js
    var waDisp = byId('contact-wa-display'), mailDisp = byId('contact-email-display');
    if (waDisp && D.org.whatsappDisplay) waDisp.textContent = D.org.whatsappDisplay;
    if (mailDisp && D.org.email) mailDisp.textContent = D.org.email;

    function buildMessage() {
      var name = byId('contact-name').value.trim();
      var email = byId('contact-email').value.trim();
      var subject = byId('contact-subject').value.trim();
      var msg = byId('contact-message').value.trim();
      return { name: name, email: email, subject: subject, message: msg };
    }

    function sendWhatsApp(m) {
      var num = String(D.org.whatsappNumber || '').replace(/\D/g, '');
      if (num.charAt(0) === '0') num = '62' + num.slice(1);
      if (num.length < 9) { showToast('Nomor WhatsApp pengurus belum diisi. Isi whatsappNumber di js/data.js.'); return false; }
      var text = '*Aspirasi / Pesan — STT Sila Dharma*\n\n' +
        'Nama: ' + m.name + '\n' +
        (m.email ? 'Email: ' + m.email + '\n' : '') +
        'Kategori/Subjek: ' + m.subject + '\n\n' +
        'Pesan:\n' + m.message;
      window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      return true;
    }

    function sendEmail(m) {
      var to = String(D.org.emailTo || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) { showToast('Email pengurus belum diisi. Isi emailTo di js/data.js.'); return false; }
      var body = 'Nama: ' + m.name + '\n' +
        (m.email ? 'Email: ' + m.email + '\n' : '') +
        'Kategori/Subjek: ' + m.subject + '\n\n' +
        m.message;
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent('[Aspirasi STT Sila Dharma] ' + m.subject) + '&body=' + encodeURIComponent(body);
      return true;
    }

    function handleSend(method) {
      var ok = true;
      fields.forEach(function (id) { if (!check(id)) ok = false; });
      if (!ok) { showToast('Mohon lengkapi kolom formulir dengan benar.'); return; }
      var m = buildMessage();
      var sent = method === 'whatsapp' ? sendWhatsApp(m) : sendEmail(m);
      if (!sent) return;
      byId('contact-success').classList.remove('hidden');
      showToast(method === 'whatsapp' ? 'Membuka WhatsApp dengan pesan Anda...' : 'Membuka aplikasi email dengan pesan Anda...');
    }

    form.addEventListener('submit', function (e) { e.preventDefault(); });
    form.querySelectorAll('[data-send]').forEach(function (btn) {
      btn.addEventListener('click', function () { handleSend(btn.dataset.send); });
    });
  }

  // ---------- Start ----------
  initAssets();
  document.addEventListener('DOMContentLoaded', function () {
    initAssets();
    initChrome();
    initSelects();
    initPageTransitions();
    initHero();
    initMap();
    initHome();
    initOrganization();
    initEvents();
    initGallery();
    initNews();
    initMembers();
    initContact();
    initReveal();
    icons();
  });
})();