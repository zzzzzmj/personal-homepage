(() => {
  const config = window.PORTFOLIO_CONFIG || {};
  document.querySelectorAll('[data-config]').forEach((node) => {
    const value = node.dataset.config
      .split('.')
      .reduce((current, key) => current && current[key], config);
    if (typeof value === 'string' && value.trim()) node.textContent = value;
  });

  document.querySelectorAll('[data-config-href]').forEach((node) => {
    const value = node.dataset.configHref
      .split('.')
      .reduce((current, key) => current && current[key], config);
    if (typeof value === 'string' && value.trim()) {
      node.href = value;
      node.removeAttribute('data-placeholder');
    }
  });

  const ageNode = document.querySelector('[data-profile-age]');
  if (ageNode) {
    const explicitAge = String(config.profile?.age || '').trim();
    const birthday = String(config.profile?.birthday || '').trim();
    if (explicitAge) {
      ageNode.textContent = explicitAge;
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
      const birthDate = new Date(`${birthday}T00:00:00`);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const birthdayPassed = today.getMonth() > birthDate.getMonth()
        || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
      if (!birthdayPassed) age -= 1;
      if (Number.isFinite(age) && age >= 0) ageNode.textContent = `${age} 岁`;
    }
  }

  const awardList = document.querySelector('[data-awards]');
  if (awardList && Array.isArray(config.profile?.awards) && config.profile.awards.length) {
    awardList.replaceChildren(...config.profile.awards.map((award) => {
      const item = document.createElement('li');
      const year = document.createElement('span');
      const content = document.createElement('p');
      const title = document.createElement('b');
      const detail = document.createElement('small');
      const entry = typeof award === 'string' ? { title: award } : award;
      year.textContent = entry.year || '—';
      title.textContent = entry.title || '';
      detail.textContent = entry.detail || '';
      content.append(title, detail);
      item.append(year, content);
      return item;
    }));
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const toast = document.querySelector('.toast');
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2400);
  };

  document.querySelectorAll('[data-placeholder]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showToast('这里已预留位置，补充真实信息后即可替换。');
    });
  });

  document.querySelectorAll('.filter-button').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('.filter-button').forEach((item) => item.classList.toggle('active', item === button));
      document.querySelectorAll('.problem-row').forEach((row) => {
        row.hidden = filter !== 'all' && row.dataset.category !== filter;
      });
    });
  });

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const source = document.querySelector(button.dataset.copy);
      if (!source) return;
      try {
        await navigator.clipboard.writeText(source.innerText);
        button.textContent = '已复制 ✓';
        window.setTimeout(() => (button.textContent = '复制代码'), 1800);
      } catch {
        showToast('复制失败，请手动选择代码。');
      }
    });
  });

  const progress = document.querySelector('.reading-progress i');
  if (progress) {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  document.querySelectorAll('.home-entry').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
})();
