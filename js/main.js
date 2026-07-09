/* ===================================================
   il PhotoWedd — Main JavaScript
   予約フォームの検証・送信、UI制御、GA4計測を担当
=================================================== */

// GAS Webアプリの公開URL（デプロイ後に書き換える）
// gas/Code.gs を「ウェブアプリ」としてデプロイし、発行されたURLをここに設定する
const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbx37-qd30VoPi0b6eCUEYe0zluojY2gFOl6aaR_dlsmMxZQ7Ef-zJl8XV7jhj5cXGLv/exec';

/* ---------- GA4 送信ヘルパー ---------- */
function trackEvent(eventName, label) {
  if (typeof gtag !== 'function') return;
  gtag('event', eventName, { event_category: 'LP', event_label: label || '' });
}

/* ---------- data-gtag 属性のクリックを自動計測 ---------- */
document.querySelectorAll('[data-gtag]').forEach((el) => {
  el.addEventListener('click', () => {
    const [eventName, label] = el.dataset.gtag.split(':');
    trackEvent(eventName, label);
  });
});

/* ---------- スクロール到達率の計測（25/50/75/100%） ---------- */
(function initScrollTracking() {
  const fired = new Set();
  const marks = [25, 50, 75, 100];
  function onScroll() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const percent = Math.round((window.scrollY / docHeight) * 100);
    marks.forEach((mark) => {
      if (percent >= mark && !fired.has(mark)) {
        fired.add(mark);
        trackEvent('scroll', `depth-${mark}`);
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---------- スクロール連動フェードイン ---------- */
(function initFadeIn() {
  const targets = document.querySelectorAll('.js-fade');
  if (!targets.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  targets.forEach((el) => observer.observe(el));
})();

/* ---------- FAQアコーディオン ---------- */
(function initFaqAccordion() {
  document.querySelectorAll('.c-faq-item__q').forEach((question) => {
    const answer = question.nextElementSibling;
    answer.style.maxHeight = '0px';

    function toggle() {
      const isOpen = question.getAttribute('aria-expanded') === 'true';
      question.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = isOpen ? '0px' : `${answer.scrollHeight}px`;
    }

    question.addEventListener('click', toggle);
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
})();

/* ---------- アンカーリンクのスムーススクロール ---------- */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---------- ページトップへ戻るボタン ---------- */
(function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  function update() {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', update, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  update();
})();

/* ---------- 予約フォーム：検証・送信 ---------- */
(function initReservationForm() {
  const form = document.getElementById('reserve-form');
  if (!form) return;

  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('reserve-submit');
  let hasStartedForm = false;
  let isSubmitting = false;

  // 入力開始時に一度だけ form_start を計測
  form.addEventListener(
    'input',
    () => {
      if (hasStartedForm) return;
      hasStartedForm = true;
      trackEvent('form_start', 'reserve-form');
    },
    { once: true }
  );

  // 簡易サニタイズ（HTMLタグ無効化）
  function sanitize(value) {
    return String(value).replace(/[<>]/g, '');
  }

  const validators = {
    name: (v) => v.trim().length > 0,
    kana: (v) => /^[゠-ヿー\s]+$/.test(v.trim()) && v.trim().length > 0,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    tel: (v) => /^0\d{9,10}$/.test(v.replace(/-/g, '').trim()),
    plan: (v) => v.trim().length > 0,
    date: (v) => v.trim().length > 0,
    contact: () => !!form.querySelector('input[name="contact"]:checked'),
    agree: () => form.querySelector('#f-agree').checked,
  };

  function setError(fieldName, hasError) {
    const errorEl = document.getElementById(`err-${fieldName}`);
    const inputEl = form.querySelector(`[name="${fieldName}"]`);
    if (errorEl) errorEl.classList.toggle('is-visible', hasError);
    if (inputEl && inputEl.type !== 'radio' && inputEl.type !== 'checkbox') {
      inputEl.classList.toggle('is-error', hasError);
    }
  }

  function validateForm() {
    let isValid = true;
    Object.keys(validators).forEach((fieldName) => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      const value = input && input.type !== 'radio' && input.type !== 'checkbox' ? input.value : '';
      const passed = validators[fieldName](value);
      setError(fieldName, !passed);
      if (!passed) isValid = false;
    });
    return isValid;
  }

  function showStatus(message) {
    statusEl.textContent = message;
    statusEl.classList.add('is-visible', 'c-form__status--error');
  }

  function hideStatus() {
    statusEl.textContent = '';
    statusEl.classList.remove('is-visible', 'c-form__status--error');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // 二重送信防止

    hideStatus();
    if (!validateForm()) {
      showStatus('入力内容をご確認ください。');
      return;
    }

    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';

    const formData = new FormData(form);
    const payload = {
      name: sanitize(formData.get('name')),
      kana: sanitize(formData.get('kana')),
      email: sanitize(formData.get('email')),
      tel: sanitize(formData.get('tel')),
      plan: sanitize(formData.get('plan')),
      date: sanitize(formData.get('date')),
      contact: sanitize(formData.get('contact')),
      message: sanitize(formData.get('message') || ''),
    };

    trackEvent('form_submit', 'reserve-form');

    try {
      // Content-Type: text/plain にすることでCORSプリフライトを回避し、
      // Google Apps Script Webアプリへ直接POSTできる。
      const response = await fetch(GAS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status === 'success') {
        trackEvent('reservation_complete', result.reservationNumber || '');
        window.location.href = `thanks.html?no=${encodeURIComponent(result.reservationNumber || '')}`;
      } else {
        throw new Error(result.message || '送信に失敗しました。');
      }
    } catch (err) {
      showStatus('送信に失敗しました。時間をおいて再度お試しいただくか、LINEよりご連絡ください。');
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'この内容で予約する';
    }
  });
})();
