const STORAGE_KEY = 'smart_budget_india_v2';
  const APP_VERSION = '6.10';
  const WHATS_NEW = ['One Income window: salary, target saving, extra income and history together', 'Dashboard income shows Salary + Extra, tap the amount or Edit to open it', 'Extra income removed from the side menu'];

  const formatINR = (num) => {
    const val = Math.round(Number(num) || 0);
    const sign = val < 0 ? '-' : '';
    return sign + '₹' + Math.abs(val).toLocaleString('en-IN');
  };

  const getInitialMonthKey = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  };

  const getPrevMonthKey = (ym) => {
    const [y, m] = ym.split('-').map(Number);
    const d = new Date(y, m - 2, 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  };

  const formatMonthDisplay = (ym) => {
    const [y, m] = ym.split('-').map(Number);
    const date = new Date(y, m - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const createDefaultState = () => {
    const curMonth = getInitialMonthKey();
    const prevMonth = getPrevMonthKey(curMonth);
    return {
      theme: 'light',
      selectedMonth: curMonth,
      months: {
        [prevMonth]: {
          income: 58000,
          targetSavingPct: 25,
          salarySavings: 5000,
          categories: [
            { id: 'cat_1', name: 'Rent & Bills', icon: '🏠', limit: 15000, color: '#6366f1' },
            { id: 'cat_2', name: 'Groceries & Rashan', icon: '🛒', limit: 8000, color: '#10b981' },
            { id: 'cat_3', name: 'Food & Dining', icon: '🍔', limit: 5000, color: '#f59e0b' },
            { id: 'cat_4', name: 'Travel & Fuel', icon: '⛽', limit: 4000, color: '#3b82f6' },
            { id: 'cat_5', name: 'Shopping & Misc', icon: '🛍️', limit: 5000, color: '#ec4899' }
          ],
          expenses: [
            { id: 'exp_p1', catId: 'cat_1', amount: 14500, note: 'Rent & Utilities', date: `${prevMonth}-05` },
            { id: 'exp_p2', catId: 'cat_2', amount: 7200, note: 'Monthly Groceries', date: `${prevMonth}-12` },
            { id: 'exp_p3', catId: 'cat_3', amount: 4800, note: 'Dining & Snacks', date: `${prevMonth}-18` }
          ],
          upcomingPlans: []
        },
        [curMonth]: {
          income: 60000,
          targetSavingPct: 25,
          salarySavings: 5000,
          categories: [
            { id: 'cat_1', name: 'Rent & Bills', icon: '🏠', limit: 15000, color: '#6366f1' },
            { id: 'cat_2', name: 'Groceries & Rashan', icon: '🛒', limit: 8000, color: '#10b981' },
            { id: 'cat_3', name: 'Food & Dining', icon: '🍔', limit: 5000, color: '#f59e0b' },
            { id: 'cat_4', name: 'Travel & Fuel', icon: '⛽', limit: 4000, color: '#3b82f6' },
            { id: 'cat_5', name: 'Shopping & Misc', icon: '🛍️', limit: 5000, color: '#ec4899' }
          ],
          expenses: [
            { id: 'exp_1', catId: 'cat_1', amount: 12500, note: 'House Rent + Electricity', date: `${curMonth}-05` },
            { id: 'exp_2', catId: 'cat_2', amount: 4200, note: 'Monthly Supermarket Rashan', date: `${curMonth}-07` }
          ],
          upcomingPlans: [
            { id: 'pl_1', title: 'Car Insurance Renewal', amount: 8500, date: `${curMonth}-25`, marked: true, note: 'Due soon, added to budget' },
            { id: 'pl_2', title: 'Vacation Trip Booking', amount: 12000, date: `${curMonth}-28`, marked: false, note: 'Pending confirmation' }
          ]
        }
      },
      funds: [
        {
          id: 'fund_1',
          name: 'Emergency Fund',
          icon: '🛡️',
          target: 100000,
          balance: 32000,
          history: [
            { id: 'fh_1', type: 'add', amount: 25000, month: prevMonth, date: `${prevMonth}-05`, note: 'Previous savings' },
            { id: 'fh_2', type: 'add', amount: 7000, month: curMonth, date: `${curMonth}-02`, note: 'Monthly SIP' }
          ]
        }
      ],
      udhaar: [
        {
          id: 'ud_1',
          type: 'lent',
          person: 'Rahul Sharma',
          totalAmount: 10000,
          paidAmount: 4000,
          date: `${curMonth}-03`,
          notes: 'Given via UPI for medical emergency.',
          history: [
            { id: 'uh_1', action: 'Initial Lent', amount: 10000, date: `${curMonth}-03`, note: 'UPI' },
            { id: 'uh_2', action: 'Received Back', amount: 4000, date: `${curMonth}-09`, note: 'Cash' }
          ]
        }
      ],
      notes: [
        { id: 'note_1', title: 'Tax Saving 80C', body: 'Invest in ELSS mutual funds and PPF before March.', date: '2026-11-01', pinned: true },
        { id: 'note_2', title: 'Credit Card Due Dates', body: 'HDFC Card statement generates on 15th of every month.', date: '2026-11-05', pinned: false }
      ]
    };
  };

  const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };

  const createEmptyState = () => {
    const cur = getInitialMonthKey();
    return {
      theme: 'light', selectedMonth: cur, pin: null, lastBackup: null,
      months: { [cur]: { income: 0, targetSavingPct: 20, salarySavings: 0, upcomingPlans: [], expenses: [],
        categories: [
          { id: 'cat_1', name: 'Rent & Bills', icon: '🏠', limit: 5000, color: '#6366f1' },
          { id: 'cat_2', name: 'Groceries & Rashan', icon: '🛒', limit: 5000, color: '#10b981' },
          { id: 'cat_3', name: 'Food & Dining', icon: '🍔', limit: 3000, color: '#f59e0b' },
          { id: 'cat_4', name: 'Travel & Fuel', icon: '⛽', limit: 3000, color: '#3b82f6' },
          { id: 'cat_5', name: 'Shopping & Misc', icon: '🛍️', limit: 3000, color: '#ec4899' }
        ] } },
      funds: [], udhaar: [], notes: []
    };
  };

  let appState = null;
  let activeMainTab = 'budget';
  let activeUdhaarSubTab = 'lent';

  const loadState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        appState = JSON.parse(raw);
        if (appState.appVersion !== APP_VERSION) { try { localStorage.setItem(STORAGE_KEY + '_autobackup', raw); } catch (e) {} }
      } else {
        appState = createEmptyState();
        appState.setupDone = false;
        saveState();
      }
    } catch (e) {
      appState = createEmptyState();
    }
    if (!appState.notes) appState.notes = [];
    if (appState.setupDone === undefined) appState.setupDone = true;
    ensureMonthExists(appState.selectedMonth);
  };

  const saveState = () => {
    try {
      appState.appVersion = APP_VERSION;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      showToast('Storage warning: Could not save locally');
    }
  };

  const ensureMonthExists = (ym) => {
    if (!appState.months[ym]) {
      const existingKeys = Object.keys(appState.months).sort();
      const templateMonth = existingKeys.length ? appState.months[existingKeys[existingKeys.length - 1]] : null;
      appState.months[ym] = {
        income: templateMonth ? templateMonth.income : 50000,
        targetSavingPct: templateMonth ? templateMonth.targetSavingPct : 20,
        salarySavings: 0,
        categories: templateMonth
          ? templateMonth.categories.map(c => ({ ...c }))
          : [
              { id: 'cat_1', name: 'Rent & Bills', icon: '🏠', limit: 15000, color: '#6366f1' },
              { id: 'cat_2', name: 'Groceries', icon: '🛒', limit: 8000, color: '#10b981' }
            ],
        expenses: [],
        upcomingPlans: []
      };
      saveState();
    }
  };

  const getCurrentMonthData = () => {
    ensureMonthExists(appState.selectedMonth);
    return appState.months[appState.selectedMonth];
  };

  let toastTimer = null;
  const showToast = (msg) => {
    const el = document.getElementById('toastMsg');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2300);
  };

  const applyTheme = () => {
    document.documentElement.setAttribute('data-theme', appState.theme);
    document.documentElement.setAttribute('data-palette', appState.palette || 'indigo');
    document.documentElement.setAttribute('data-amoled', appState.amoled ? '1' : '0');
    const isDark = appState.theme === 'dark';
    document.getElementById('themeIconSun').style.display = isDark ? 'block' : 'none';
    document.getElementById('themeIconMoon').style.display = isDark ? 'none' : 'block';
  };

  document.getElementById('themeToggleBtn').addEventListener('click', () => {
    appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
    saveState();
    applyTheme();
    showToast(appState.theme === 'dark' ? 'Dark Mode On 🌙' : 'Day Mode On ☀️');
  });

  const shiftMonth = (delta) => {
    const [y, m] = appState.selectedMonth.split('-').map(Number);
    const d = new Date(y, m - 1 + delta, 1);
    const nextYm = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    appState.selectedMonth = nextYm;
    ensureMonthExists(nextYm);
    saveState();
    renderAll();
  };

  document.getElementById('prevMonthBtn').addEventListener('click', () => shiftMonth(-1));
  document.getElementById('nextMonthBtn').addEventListener('click', () => shiftMonth(1));

  const goBack = () => history.back();
  const switchMainTab = (tabName) => {
    navPush(tabName);
    activeMainTab = tabName;
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.getElementById('quickAddFab').style.display = tabName === 'budget' ? 'flex' : 'none';
    renderAll();
  };

  const getMonthlyFundContribution = (ym) => {
    let total = 0;
    appState.funds.forEach(fund => {
      (fund.history || []).forEach(entry => {
        if (entry.month === ym) {
          if (entry.type === 'add') total += Number(entry.amount);
          if (entry.type === 'withdraw') total -= Number(entry.amount);
        }
      });
    });
    return total;
  };

  // Compute exact financial metrics for any given month key (ym)
  const getMonthMetrics = (ym) => {
    const mData = appState.months[ym];
    if (!mData) return null;
    const income = (Number(mData.income) || 0) + (mData.extraIncome || []).reduce((s, x) => s + Number(x.amount), 0);
    const targetPct = Number(mData.targetSavingPct) || 0;
    const targetAmt = Math.round((income * targetPct) / 100);

    const categoryExpenses = (mData.expenses || []).reduce((sum, e) => sum + Number(e.amount), 0);
    const markedPlansExpenses = (mData.upcomingPlans || [])
      .filter(p => p.marked && !planHasExpense(p))
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const totalExpenses = categoryExpenses + markedPlansExpenses;

    // Total Saved = Net Funds added this month + Monthly Salary Savings
    const netFundsThisMonth = Math.max(0, getMonthlyFundContribution(ym));
    const salarySavings = salaryNet(ym, mData);
    const totalSavedInFunds = netFundsThisMonth + salarySavings;

    // Unspent Cash = Income - Total Spent - Saved in Funds & Salary
    const unspentCash = income - totalExpenses - totalSavedInFunds;

    // Net Actual Saving (Profit / Loss of the month) = Income - Total Spent = Saved in Funds + Unspent Cash
    const netActualSaving = income - totalExpenses;
    const actualSavingPct = income > 0 ? Math.round((netActualSaving / income) * 100) : 0;

    return {
      income,
      targetPct,
      targetAmt,
      totalExpenses,
      netFundsThisMonth,
      salarySavings,
      totalSavedInFunds,
      unspentCash,
      netActualSaving,
      actualSavingPct
    };
  };

  const renderBudgetTab = () => {
    const curYm = appState.selectedMonth;
    const mData = getCurrentMonthData();
    const metrics = getMonthMetrics(curYm);

    // 1. Previous Month Profit / Loss / Overspent Banner
    const prevYm = getPrevMonthKey(curYm);
    const prevMetrics = getMonthMetrics(prevYm);
    const prevStrip = document.getElementById('prevMonthSummaryStrip');
    const prevLabel = document.getElementById('prevMonthSummaryLabel');
    const prevVal = document.getElementById('prevMonthSummaryVal');

    if (prevMetrics && (prevMetrics.income > 0 || prevMetrics.totalExpenses > 0)) {
      prevStrip.style.display = 'flex';
      prevStrip.classList.remove('profit', 'loss');
      const prevName = formatMonthDisplay(prevYm);
      if (prevMetrics.netActualSaving >= 0) {
        prevStrip.classList.add('profit');
        prevLabel.innerHTML = `📈 ${prevName} Profit / Saved:`;
        prevVal.style.color = 'var(--success)';
        prevVal.textContent = `+${formatINR(prevMetrics.netActualSaving)} (${prevMetrics.actualSavingPct}%)`;
      } else {
        prevStrip.classList.add('loss');
        prevLabel.innerHTML = `📉 ${prevName} Loss / Overspent:`;
        prevVal.style.color = 'var(--danger)';
        prevVal.textContent = `${formatINR(prevMetrics.netActualSaving)} (Over by ${formatINR(Math.abs(prevMetrics.netActualSaving))})`;
      }
    } else {
      prevStrip.style.display = 'none';
    }

    // 2. Main Hero Numbers
    document.getElementById('displayIncome').textContent = formatINR(metrics.income);
    const _ex = (getCurrentMonthData().extraIncome || []).reduce((s, x) => s + Number(x.amount), 0), _bd = document.getElementById('incomeBreakdown');
    if (_bd) { _bd.style.display = _ex > 0 ? 'block' : 'none'; _bd.textContent = `Salary ${formatINR(metrics.income - _ex)} + Extra ${formatINR(_ex)}`; }
    document.getElementById('displayTargetPct').textContent = `${metrics.targetPct}% (${formatINR(metrics.targetAmt)})`;

    document.getElementById('statExpenses').textContent = formatINR(metrics.totalExpenses);
    document.getElementById('statFundAlloc').textContent = formatINR(metrics.totalSavedInFunds);
    document.getElementById('statFundBreakdown').textContent =
      `Funds: ${formatINR(metrics.netFundsThisMonth)} • Salary: ${formatINR(metrics.salarySavings)}`;

    document.getElementById('statCashLeft').textContent = formatINR(metrics.unspentCash);
    document.getElementById('statCashLeft').style.color = metrics.unspentCash < 0 ? 'var(--danger)' : 'var(--text-primary)';

    document.getElementById('statTotalActual').textContent = `${formatINR(metrics.netActualSaving)} (${metrics.actualSavingPct}%)`;
    document.getElementById('statTotalActual').style.color = metrics.netActualSaving < 0 ? 'var(--danger)' : 'var(--success)';

    // 3. Progress Ring
    const ringCircle = document.getElementById('savingRingCircle');
    const circumference = 238.76;
    const clampedPct = Math.max(0, Math.min(100, metrics.actualSavingPct));
    const offset = circumference - (clampedPct / 100) * circumference;
    ringCircle.style.strokeDashoffset = offset;
    document.getElementById('ringActualPct').textContent = `${metrics.actualSavingPct}%`;
    document.getElementById('ringSubLabel').textContent = metrics.netActualSaving < 0 ? 'Loss' : 'Net Save';

    // 4. Bottom Status Banner
    const banner = document.getElementById('savingStatusBanner');
    const statusText = document.getElementById('savingStatusText');
    const diffText = document.getElementById('savingDiffText');
    const diff = metrics.netActualSaving - metrics.targetAmt;

    banner.classList.remove('warning', 'danger');
    if (metrics.netActualSaving < 0) {
      ringCircle.style.stroke = 'var(--danger)';
      banner.classList.add('danger');
      statusText.textContent = `Loss / Overspent by ${formatINR(Math.abs(metrics.netActualSaving))}!`;
      diffText.textContent = formatINR(metrics.netActualSaving);
    } else if (metrics.actualSavingPct < metrics.targetPct) {
      ringCircle.style.stroke = 'var(--warning)';
      banner.classList.add('warning');
      statusText.textContent = `Below ${metrics.targetPct}% saving goal (Need ${formatINR(Math.abs(diff))} more)`;
      diffText.textContent = formatINR(diff);
    } else {
      ringCircle.style.stroke = 'var(--success)';
      statusText.textContent = `Profit! Exceeding ${metrics.targetPct}% goal by`;
      diffText.textContent = `+${formatINR(diff)}`;
    }

    // 5. Category List
    const container = document.getElementById('categoryListContainer');
    if (!mData.categories.length) {
      container.innerHTML = `<div class="empty-state">No categories yet. Tap <strong>+ Category</strong> to create one.</div>`;
      return;
    }

    container.innerHTML = mData.categories.map(cat => {
      const catExpenses = mData.expenses.filter(e => e.catId === cat.id);
      const spent = catExpenses.reduce((s, e) => s + Number(e.amount), 0);
      const limit = Number(cat.limit) || 0;
      const remaining = limit - spent;
      const pct = limit > 0 ? Math.min(100, Math.round((spent / limit) * 100)) : (spent > 0 ? 100 : 0);

      let barColor = cat.color || 'var(--accent)';
      if (limit > 0 && spent > limit) barColor = 'var(--danger)';
      else if (limit > 0 && spent >= limit * 0.8) barColor = 'var(--warning)';

      return `
        <div class="cat-card" onclick="openCategoryPage('${cat.id}')">
          <div class="cat-top">
            <div class="cat-info">
              <div class="cat-icon">${cat.icon || '📁'}</div>
              <div>
                <div class="cat-name">${escapeHtml(cat.name)}</div>
                <div class="cat-sub">${catExpenses.length} entries • Limit: ${formatINR(limit)}</div>
              </div>
            </div>
            <div class="cat-actions" onclick="event.stopPropagation()">
              <button class="mini-icon-btn" title="Add Expense" onclick="openQuickExpenseModal('${cat.id}')">
                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <button class="mini-icon-btn" title="Edit Category" onclick="openCategoryModal('${cat.id}')">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
            </div>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${pct}%; background:${barColor};"></div>
          </div>
          <div class="cat-footer">
            <span>Spent: <strong style="color:var(--text-primary);">${formatINR(spent)}</strong> (${pct}%)</span>
            <span style="color:${remaining < 0 ? 'var(--danger)' : 'var(--success)'};">
              ${remaining < 0 ? 'Over by ' + formatINR(Math.abs(remaining)) : 'Left: ' + formatINR(remaining)}
            </span>
          </div>
        </div>
      `;
    }).join('');
  };

  const renderFundsTab = () => {
    const mData = getCurrentMonthData();
    const salarySavings = salaryNet(appState.selectedMonth, mData);
    document.getElementById('displaySalarySavings').textContent = formatINR(salarySavings);
    const _sp = getSalaryPool(); document.getElementById('salaryTotalLine').innerHTML = `Balance (all time): <span style="color:var(--success)">${formatINR(_sp.left)}</span><br><span style="font-weight:500;color:var(--text-secondary)">Saved ${formatINR(_sp.saved)} − Spent ${formatINR(_sp.spent)}</span>`;

    const totalAll = appState.funds.reduce((s, f) => s + Number(f.balance), 0);
    const monthAdded = Math.max(0, getMonthlyFundContribution(appState.selectedMonth));

    document.getElementById('totalAllFunds').textContent = formatINR(totalAll);
    document.getElementById('fundMonthName').textContent = formatMonthDisplay(appState.selectedMonth);
    document.getElementById('thisMonthFundAdded').textContent = formatINR(monthAdded);

    const container = document.getElementById('fundsListContainer');
    if (!appState.funds.length) {
      container.innerHTML = `<div class="empty-state">No savings funds created yet. Tap <strong>+ New Fund</strong> to start!</div>`;
      return;
    }

    const fc = (f) => fundStatus(f), counts = { active: 0, completed: 0 }; appState.funds.forEach(f => { counts[fc(f).done ? 'completed' : 'active']++; });
    document.getElementById('fundFilterChips').innerHTML = [['active', 'Active', counts.active], ['completed', 'Completed', counts.completed], ['all', 'All', appState.funds.length]].map(([v, t, n]) => `<button class="btn-secondary" style="padding:6px 14px;font-size:.78rem;${fundFilter === v ? 'background:var(--accent-soft);color:var(--accent);border-color:var(--accent)' : ''}" onclick="fundFilter='${v}';renderFundsTab()">${t} (${n})</button>`).join('');
    const list = appState.funds.filter(f => fundFilter === 'all' || (fundFilter === 'completed') === fc(f).done);
    if (!list.length) { container.innerHTML = `<div class="empty-state">No ${fundFilter} funds.</div>`; return; }
    container.innerHTML = list.map(fund => {
      const st = fundStatus(fund), target = Number(fund.target) || 0;
      return `<div class="fund-card" data-id="${fund.id}" onclick="fundCardTap('${fund.id}')">
        <div class="fund-header"><div class="fund-title-group"><div class="fund-emoji">${fund.icon || '💰'}</div><div><div style="font-weight:800;font-size:.98rem">${escapeHtml(fund.name)}</div><div style="font-size:.74rem;color:var(--text-muted)">${target > 0 ? `Goal ${formatINR(target)} · ${st.pct}%` : 'Open-ended fund'}</div></div></div>
          <div style="display:flex;align-items:center;gap:8px"><span class="fund-tag">${st.label}</span><span class="drag-handle" onpointerdown="fundDragStart(event,'${fund.id}')" onclick="event.stopPropagation()" title="Drag to reorder">⠿</span></div></div>
        <div class="fund-balance">${formatINR(fund.balance)}</div>
        ${target > 0 ? `<div class="progress-track"><div class="progress-fill" style="width:${st.pct}%;background:var(--accent)"></div></div>` : ''}
        ${fund.targetDate ? `<div style="font-size:.74rem;color:var(--text-secondary)">Target date ${fund.targetDate}</div>` : ''}
      </div>`;
    }).join('');
  };

  /* ---- [FUNDS] status, sheet, hold menu, drag ---- */
  let fundFilter = 'active', lpFired = false;
  const fundStatus = (f) => {
    const target = Number(f.target) || 0, bal = Number(f.balance) || 0, pct = target > 0 ? Math.min(100, Math.round(bal / target * 100)) : 0;
    if (f.done || (target > 0 && bal >= target)) return { done: true, pct: target > 0 ? 100 : pct, label: 'Completed' };
    if (!f.targetDate || !(target > 0)) return { done: false, pct, label: 'Active' };
    const start = Number(String(f.id).split('_')[1]) || Date.now(), end = new Date(f.targetDate + 'T23:59:59').getTime(), now = Date.now();
    if (now > end) return { done: false, pct, label: 'Behind' };
    const exp = Math.min(1, (now - start) / Math.max(1, end - start)) * 100;
    return { done: false, pct, label: pct + 5 >= exp ? 'On track' : 'Behind' };
  };
  const fundCardTap = (id) => { if (lpFired) { lpFired = false; return; } openFundSheet(id); };
  const openFundSheet = (id) => {
    const f = appState.funds.find(x => x.id === id); if (!f) return;
    const st = fundStatus(f), target = Number(f.target) || 0, left = Math.max(0, target - f.balance);
    let plan = '';
    if (target > 0 && !st.done && f.targetDate) { const days = Math.ceil((new Date(f.targetDate + 'T23:59:59') - Date.now()) / 86400000); plan = days > 0 ? `Save ${formatINR(Math.ceil(left / Math.max(1, days / 30)))} per month to reach it by ${f.targetDate}` : 'Target date has passed'; }
    const hist = (f.history || []).slice().sort((p, q) => (q.date || '').localeCompare(p.date || ''));
    openModal(`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px"><div style="display:flex;align-items:center;gap:10px"><div class="fund-emoji">${f.icon || '💰'}</div><div style="font-weight:800;font-size:1.05rem">${escapeHtml(f.name)}</div></div><span class="fund-tag">${st.label}</span></div>
      <div style="font-size:2rem;font-weight:800">${formatINR(f.balance)}</div>
      ${target > 0 ? `<div style="font-size:.8rem;color:var(--text-secondary)">of ${formatINR(target)} target</div><div class="progress-track" style="margin:10px 0 6px"><div class="progress-fill" style="width:${st.pct}%;background:var(--accent)"></div></div><div style="display:flex;justify-content:space-between;font-size:.76rem;color:var(--text-secondary)"><span>${st.pct}% reached</span><span>${st.done ? 'Goal reached' : formatINR(left) + ' to go'}</span></div>` : '<div style="font-size:.8rem;color:var(--text-secondary)">No target set</div>'}
      ${plan ? `<div style="font-size:.8rem;margin-top:10px;padding:10px 12px;border-radius:12px;background:var(--accent-soft)">${plan}</div>` : ''}
      <div style="display:flex;gap:10px;margin:14px 0"><button class="btn-primary" style="flex:1;justify-content:center;padding:12px" onclick="closeModal();setTimeout(()=>openFundTxnModal('${f.id}','add'),140)">Add money</button><button class="btn-secondary" style="flex:1;justify-content:center;padding:12px" onclick="closeModal();setTimeout(()=>openFundTxnModal('${f.id}','withdraw'),140)">Withdraw</button></div>
      <div style="font-weight:800;font-size:.84rem;margin-bottom:4px">History</div>
      <div style="max-height:28vh;overflow-y:auto">${hist.length ? hist.map(x => { const ts = Number(String(x.id).split('_')[1]); return `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 0;border-bottom:1px solid var(--border-color);font-size:.82rem"><div><div style="font-weight:700">${x.type === 'add' ? 'Added' : 'Withdrawn'}${x.note ? ' · ' + escapeHtml(x.note) : ''}</div><div style="color:var(--text-muted);font-size:.72rem">${x.date || ''}${ts > 1e12 ? ' · ' + fmtTs(ts) : ''}</div></div><div style="display:flex;align-items:center;gap:8px"><strong style="color:${x.type === 'add' ? 'var(--success)' : 'var(--danger)'}">${x.type === 'add' ? '+' : '−'}${formatINR(x.amount)}</strong><button class="btn-secondary" style="padding:4px 9px;font-size:.7rem" onclick="delFundHistory('${f.id}','${x.id}')">Delete</button></div></div>`; }).join('') : '<div style="font-size:.8rem;color:var(--text-muted)">No transactions yet.</div>'}</div>
      <div style="display:flex;gap:10px;margin-top:14px"><button class="btn-secondary" style="flex:1;justify-content:center;padding:11px" onclick="closeModal();setTimeout(()=>openFundModal('${f.id}'),140)">Edit fund</button><button class="btn-secondary" style="flex:1;justify-content:center;padding:11px" onclick="toggleFundDone('${f.id}')">${f.done ? 'Reopen fund' : 'Mark as completed'}</button></div>`);
  };
  const toggleFundDone = (id) => { const f = appState.funds.find(x => x.id === id); if (!f) return; f.done = !f.done; saveState(); renderAll(); closeModal(); showToast(f.done ? 'Fund marked as completed' : 'Fund reopened'); };
  const delFundHistory = (fid, hid) => confirmAction('Delete this entry?', 'The fund balance will be adjusted back.', () => {
    const f = appState.funds.find(x => x.id === fid), x = f && (f.history || []).find(y => y.id === hid); if (!x) return;
    f.balance = Number(f.balance) + (x.type === 'add' ? -Number(x.amount) : Number(x.amount)); f.history = f.history.filter(y => y.id !== hid);
    saveState(); renderAll(); openFundSheet(fid); showToast('Entry deleted');
  });
  const openFundActions = (id) => { const f = appState.funds.find(x => x.id === id); if (!f) return;
    const b = (t, fn) => `<button class="btn-secondary" style="width:100%;justify-content:center;padding:13px;margin-bottom:8px" onclick="closeModal();setTimeout(()=>${fn},140)">${t}</button>`;
    openModal(head(escapeHtml(f.name)) + b('Add money', `openFundTxnModal('${id}','add')`) + b('Withdraw', `openFundTxnModal('${id}','withdraw')`) + b('Edit', `openFundModal('${id}')`) + b('Delete', `deleteFund('${id}')`)); };
  const initFundGestures = () => {
    const el = document.getElementById('fundsListContainer'); if (!el || el._g) return; el._g = true; let timer = null, sx = 0, sy = 0, card = null;
    const clear = () => { clearTimeout(timer); if (card) card.classList.remove('lifted'); card = null; };
    el.addEventListener('pointerdown', (e) => { if (e.target.closest('.drag-handle')) return; card = e.target.closest('.fund-card'); if (!card) return; sx = e.clientX; sy = e.clientY;
      timer = setTimeout(() => { lpFired = true; card.classList.add('lifted'); try { navigator.vibrate && navigator.vibrate(18); } catch (x) {} const id = card.dataset.id; openFundActions(id); setTimeout(() => { lpFired = false; }, 600); }, 480); });
    el.addEventListener('pointermove', (e) => { if (Math.abs(e.clientX - sx) > 9 || Math.abs(e.clientY - sy) > 9) clear(); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => el.addEventListener(t, () => { clearTimeout(timer); if (card) { const c = card; setTimeout(() => c.classList.remove('lifted'), 250); } }));
  };
  const fundDragStart = (e, id) => {
    e.preventDefault(); e.stopPropagation(); const handle = e.currentTarget, card = handle.closest('.fund-card'), list = card.parentElement, startY = e.clientY;
    try { handle.setPointerCapture(e.pointerId); } catch (x) {} card.classList.add('lifted'); card.style.zIndex = 5; card.style.transition = 'none';
    const move = (ev) => { card.style.transform = `translateY(${ev.clientY - startY}px) scale(1.02)`; };
    const up = (ev) => { handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); handle.removeEventListener('pointercancel', up);
      const others = [...list.children].filter(x => x !== card); let before = null; for (const x of others) { const r = x.getBoundingClientRect(); if (ev.clientY < r.top + r.height / 2) { before = x; break; } }
      const f = appState.funds.splice(appState.funds.findIndex(x => x.id === id), 1)[0];
      let idx = before ? appState.funds.findIndex(x => x.id === before.dataset.id) : (others.length ? appState.funds.findIndex(x => x.id === others[others.length - 1].dataset.id) + 1 : appState.funds.length);
      appState.funds.splice(idx, 0, f); saveState(); renderFundsTab(); };
    handle.addEventListener('pointermove', move); handle.addEventListener('pointerup', up); handle.addEventListener('pointercancel', up);
  };

  const getReminderBadgeHtml = (plan) => {
    if (plan.marked) {
      return `<span class="reminder-pill reminder-done">✓ Added to Total</span>`;
    }
    if (!plan.date) {
      return `<span class="reminder-pill reminder-upcoming">🔔 Reminder</span>`;
    }
    const todayStr = new Date().toISOString().slice(0, 10);
    if (plan.date <= todayStr) {
      return `<span class="reminder-pill reminder-due">⚠️ Due Today / Overdue</span>`;
    }
    return `<span class="reminder-pill reminder-upcoming">🔔 Upcoming Reminder</span>`;
  };

  const renderUpcomingPlansTab = () => {
    const mData = getCurrentMonthData();
    const allP = mData.upcomingPlans || [];
    const plans = allP.filter(p => planFilter === 'all' || (planFilter === 'completed' ? p.marked : !p.marked));

    const markedTotal = allP.filter(p => p.marked).reduce((s, p) => s + Number(p.amount), 0);
    const unmarkedTotal = allP.filter(p => !p.marked).reduce((s, p) => s + Number(p.amount), 0);
    const unmarkedCount = allP.filter(p => !p.marked).length;
    const pc = (v, t, n) => `<button class="btn-secondary" style="padding:6px 14px;font-size:.78rem;${planFilter === v ? 'background:var(--accent-soft);color:var(--accent);border-color:var(--accent)' : ''}" onclick="planFilter='${v}';renderUpcomingPlansTab()">${t} (${n})</button>`;
    document.getElementById('planFilterChips').innerHTML = pc('pending', 'Pending', unmarkedCount) + pc('completed', 'Completed', allP.length - unmarkedCount) + pc('all', 'All', allP.length);

    document.getElementById('plansMarkedTotal').textContent = formatINR(markedTotal);
    document.getElementById('plansUnmarkedTotal').textContent = formatINR(unmarkedTotal);

    const navBadge = document.getElementById('plansNavBadge');
    if (unmarkedCount > 0) {
      navBadge.style.display = 'flex';
      navBadge.textContent = unmarkedCount;
    } else {
      navBadge.style.display = 'none';
    }

    const container = document.getElementById('upcomingPlansContainer');
    if (!plans.length) {
      container.innerHTML = `<div class="empty-state">${allP.length ? 'No ' + planFilter + ' plans.' : 'No upcoming plans or bills added yet. Tap <strong>+ Add Plan</strong>.'}</div>`;
      return;
    }

    container.innerHTML = plans.map(p => `
      <div class="card" style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:12px 14px;">
        <div style="display:flex; align-items:center; gap:11px; flex:1; min-width:0;">
          <input type="checkbox" ${p.marked ? 'checked' : ''} onchange="togglePlanMarked('${p.id}')" style="width:20px; height:20px; accent-color:var(--accent); cursor:pointer; flex-shrink:0;" title="Check to include in total spent" />
          <div style="min-width:0;cursor:pointer;flex:1" onclick="openPlanDetail('${p.id}')">
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <span style="font-weight:800; font-size:0.92rem; ${p.marked ? 'text-decoration:line-through; opacity:0.7;' : ''}">${escapeHtml(p.title)}</span>
              ${getReminderBadgeHtml(p)}
            </div>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-top:3px;">📅 Date: ${p.date || 'N/A'}</div>
            ${p.note ? `<div style="font-size:0.74rem; color:var(--text-secondary); margin-top:2px;">📝 ${escapeHtml(p.note)}</div>` : ''}
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;">
          <div style="font-weight:800; font-size:0.94rem; color:${p.marked ? 'var(--danger)' : 'var(--text-secondary)'}; margin-right:2px;">${formatINR(p.amount)}</div>
          ${!p.marked && p.date ? `<button class="mini-icon-btn" title="Add to calendar" onclick="addPlanToCalendar('${p.id}')">📅</button>` : ''}
          <button class="mini-icon-btn" title="Edit Plan" onclick="openUpcomingPlanModal('${p.id}')">✏️</button>
          <button class="mini-icon-btn" style="color:var(--danger);" title="Delete Plan" onclick="deleteUpcomingPlan('${p.id}')">🗑️</button>
        </div>
      </div>
    `).join('');
  };

  /* ---- [PLAN DETAIL] details, extra charge, history ---- */
  const openPlanDetail = (id) => {
    const p = (getCurrentMonthData().upcomingPlans || []).find(x => x.id === id); if (!p) return;
    const cat = getCurrentMonthData().categories.find(x => x.id === p.catId), row = (l, v) => `<div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-color);font-size:.86rem"><span style="color:var(--text-secondary)">${l}</span><strong>${v}</strong></div>`;
    openModal(head(escapeHtml(p.title)) + `<div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:6px"><div style="font-size:1.6rem;font-weight:800">${formatINR(p.amount)}</div><span style="font-size:.74rem;font-weight:700;padding:4px 10px;border-radius:20px;border:1px solid var(--border-color)">${p.marked ? 'Completed' : 'Pending'}</span></div>
      ${row('Date', p.date || 'Not set')}${row('Category', cat ? escapeHtml(cat.name) : 'Not set')}${p.note ? row('Note', escapeHtml(p.note)) : ''}
      <div style="display:flex;gap:10px;margin:12px 0"><button class="btn-primary" style="flex:1;justify-content:center;padding:11px" onclick="closeModal();setTimeout(()=>togglePlanMarked('${p.id}'),140)">${p.marked ? 'Mark as pending' : 'Mark as done'}</button><button class="btn-secondary" style="flex:1;justify-content:center;padding:11px" onclick="closeModal();setTimeout(()=>openUpcomingPlanModal('${p.id}'),140)">Edit</button></div>
      <div style="font-weight:800;font-size:.84rem;margin:6px 0">Add charge</div>
      <div style="display:flex;gap:8px"><input id="pcAmt" type="number" inputmode="decimal" min="1" class="form-input" placeholder="Amount" style="flex:1"><input id="pcNote" class="form-input" placeholder="Note (e.g. late fee)" style="flex:1.4"></div>
      <button class="btn-secondary" style="justify-content:center;padding:10px;width:100%;margin-top:8px" onclick="addPlanCharge('${p.id}')">Add to plan amount</button>
      <div style="font-weight:800;font-size:.84rem;margin:16px 0 6px">History</div>
      <div style="max-height:30vh;overflow-y:auto">${(p.history || []).length ? p.history.map(x => `<div style="display:flex;justify-content:space-between;gap:10px;padding:7px 0;border-bottom:1px solid var(--border-color);font-size:.8rem"><span>${escapeHtml(x.text)}</span><span style="color:var(--text-muted);white-space:nowrap">${fmtTs(x.ts)}</span></div>`).join('') : '<div style="font-size:.8rem;color:var(--text-muted)">No history yet. Changes from now on will be recorded here.</div>'}</div>`);
  };
  const addPlanCharge = (id) => {
    const p = (getCurrentMonthData().upcomingPlans || []).find(x => x.id === id), amt = Number($v('pcAmt')), note = $v('pcNote').trim();
    if (!p || !(amt > 0)) { showToast('Enter a valid charge amount'); return; }
    p.amount = Number(p.amount) + amt; planLog(p, 'charge', `+${money(amt)}${note ? ' · ' + note : ''} (now ${money(p.amount)})`);
    if (p.marked) syncPlanExpense(p);
    saveState(); renderAll(); openPlanDetail(id); showToast('Charge added');
  };

  const switchUdhaarSubTab = (sub) => {
    activeUdhaarSubTab = sub;
    document.getElementById('segLentBtn').classList.toggle('active', sub === 'lent');
    document.getElementById('segBorrowedBtn').classList.toggle('active', sub === 'borrowed');
    document.getElementById('udhaarListHeading').textContent =
      sub === 'lent' ? 'People who owe you' : 'People you owe';
    renderUdhaarTab();
  };

  const renderUdhaarTab = () => { return renderUdhaarTabV5(); /* old renderer below is unused */
    renderUdDueSummary();
    let lentPending = 0;
    let borrowedPending = 0;

    appState.udhaar.forEach(item => {
      const rem = Math.max(0, Number(item.totalAmount) - Number(item.paidAmount));
      if (item.type === 'lent') lentPending += rem;
      else borrowedPending += rem;
    });

    document.getElementById('summaryLentPending').textContent = formatINR(lentPending);
    document.getElementById('summaryBorrowedPending').textContent = formatINR(borrowedPending);

    const filtered = appState.udhaar.filter(u => u.type === activeUdhaarSubTab);
    const container = document.getElementById('udhaarListContainer');

    if (!filtered.length) {
      container.innerHTML = `<div class="empty-state">No records in this section. Tap <strong>+ Add Entry</strong> to log one.</div>`;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const total = Number(item.totalAmount) || 0;
      const paid = Number(item.paidAmount) || 0;
      const remaining = Math.max(0, total - paid);
      const isSettled = remaining === 0;
      const pct = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 100;

      return `
        <div class="udhaar-card">
          <div class="udhaar-top">
            <div>
              <div style="font-weight:800; font-size:0.98rem;">${escapeHtml(item.person)}</div>
              <div style="font-size:0.73rem; color:var(--text-muted); margin-top:2px;">Date: ${item.date || 'N/A'}</div>${dueTag(item)}
            </div>
            <span class="badge ${isSettled ? 'badge-settled' : 'badge-pending'}">
              ${isSettled ? 'Settled ✓' : 'Pending'}
            </span>
          </div>

          <div class="udhaar-amounts">
            <div>
              <div class="u-col-label">Total</div>
              <div class="u-col-val">${formatINR(total)}</div>
            </div>
            <div>
              <div class="u-col-label">${item.type === 'lent' ? 'Received' : 'Paid'}</div>
              <div class="u-col-val" style="color:var(--success);">${formatINR(paid)}</div>
            </div>
            <div>
              <div class="u-col-label">Remaining</div>
              <div class="u-col-val" style="color:${isSettled ? 'var(--text-muted)' : 'var(--danger)'};">${formatINR(remaining)}</div>
            </div>
          </div>

          <div class="progress-track">
            <div class="progress-fill" style="width:${pct}%; background:var(--success);"></div>
          </div>

          ${item.notes ? `<div style="font-size:0.76rem; color:var(--text-secondary);">📝 ${escapeHtml(item.notes)}</div>` : ''}

          <div class="udhaar-actions">
            ${!isSettled ? `
              <button class="btn-primary" style="flex:1; justify-content:center;" onclick="openUdhaarPaymentModal('${item.id}')">
                + ${item.type === 'lent' ? 'Receive Payment' : 'Pay Back'}
              </button>
            ` : `<div style="flex:1; font-size:0.78rem; color:var(--success); font-weight:700;">All Clear!</div>`}
            <button class="eye-btn" title="View & Edit" onclick="openUdhaarEyeModal('${item.id}')">👁️ Details</button>
          </div>
        </div>
      `;
    }).join('');
  };

  /* ==========================================================================
     CALCULATOR LOGIC
     ========================================================================== */
  let calcCurrent = '0';
  let calcPrev = '';
  let calcOperator = null;
  let calcShouldReset = false;
  let calcHistory = [];

  const updateCalcDisplay = () => {
    const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    document.getElementById('calcExpression').textContent =
      calcOperator ? `${calcPrev} ${opSymbols[calcOperator] || calcOperator}` : '';
    document.getElementById('calcResult').textContent = calcCurrent;
  };

  const calcAppendDigit = (digit) => {
    if (calcShouldReset) {
      calcCurrent = digit === '00' ? '0' : digit;
      calcShouldReset = false;
    } else if (calcCurrent === '0') {
      calcCurrent = digit === '00' ? '0' : digit;
    } else {
      if (calcCurrent.length < 14) calcCurrent += digit;
    }
    updateCalcDisplay();
  };

  const calcAppendDot = () => {
    if (calcShouldReset) {
      calcCurrent = '0.';
      calcShouldReset = false;
    } else if (!calcCurrent.includes('.')) {
      calcCurrent += '.';
    }
    updateCalcDisplay();
  };

  const calcAppendOp = (op) => {
    if (calcOperator && !calcShouldReset) {
      calcEvaluate(true);
    }
    calcPrev = calcCurrent;
    calcOperator = op;
    calcShouldReset = true;
    updateCalcDisplay();
  };

  const calcPercent = () => {
    const val = parseFloat(calcCurrent);
    if (isNaN(val)) return;
    if (calcPrev && calcOperator) {
      const base = parseFloat(calcPrev);
      calcCurrent = String(Number(((base * val) / 100).toFixed(4)));
    } else {
      calcCurrent = String(Number((val / 100).toFixed(4)));
    }
    updateCalcDisplay();
  };

  const calcBackspace = () => {
    if (calcShouldReset) return;
    if (calcCurrent.length <= 1 || (calcCurrent.length === 2 && calcCurrent.startsWith('-'))) {
      calcCurrent = '0';
    } else {
      calcCurrent = calcCurrent.slice(0, -1);
    }
    updateCalcDisplay();
  };

  const calcClear = () => {
    calcCurrent = '0';
    calcPrev = '';
    calcOperator = null;
    calcShouldReset = false;
    updateCalcDisplay();
  };

  const calcEvaluate = (chaining = false) => {
    if (!calcOperator || calcPrev === '') return;
    const a = parseFloat(calcPrev);
    const b = parseFloat(calcCurrent);
    let res = 0;

    if (calcOperator === '+') res = a + b;
    else if (calcOperator === '-') res = a - b;
    else if (calcOperator === '*') res = a * b;
    else if (calcOperator === '/') {
      if (b === 0) {
        showToast('Cannot divide by zero');
        calcClear();
        return;
      }
      res = a / b;
    }

    res = Math.round(res * 10000) / 10000;
    const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    const record = `${a} ${opSymbols[calcOperator]} ${b} = ${res}`;
    calcHistory.unshift(record);
    if (calcHistory.length > 6) calcHistory.pop();
    renderCalcHistory();

    calcCurrent = String(res);
    calcPrev = '';
    calcOperator = null;
    calcShouldReset = !chaining;
    updateCalcDisplay();
  };

  const renderCalcHistory = () => {
    const el = document.getElementById('calcHistoryList');
    if (!el) return;
    if (!calcHistory.length) {
      el.innerHTML = `<div style="font-size:0.78rem; color:var(--text-muted); text-align:center; padding:8px;">No calculations yet</div>`;
      return;
    }
    el.innerHTML = calcHistory.map(item => {
      const ans = item.split('=')[1].trim();
      return `
        <div class="history-item" style="padding:8px 12px; cursor:pointer;" onclick="loadCalcFromHistory('${ans}')">
          <span style="color:var(--text-secondary); font-size:0.8rem;">${escapeHtml(item.split('=')[0])}=</span>
          <strong style="color:var(--accent);">${escapeHtml(ans)}</strong>
        </div>
      `;
    }).join('');
  };

  const loadCalcFromHistory = (val) => {
    calcCurrent = val;
    calcShouldReset = false;
    updateCalcDisplay();
    showToast(`Loaded ${val}`);
  };

  const clearCalcHistory = () => {
    calcHistory = [];
    renderCalcHistory();
  };

  const copyCalcResult = () => {
    const ta = document.createElement('textarea');
    ta.value = calcCurrent;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(`Copied ${calcCurrent} 📋`);
  };

  const useCalcForExpense = () => {
    if (calcOperator) calcEvaluate();
    const num = Math.round(Math.abs(parseFloat(calcCurrent) || 0));
    openQuickExpenseModal('', num > 0 ? num : '');
  };

  const useCalcForPlan = () => {
    if (calcOperator) calcEvaluate();
    const num = Math.round(Math.abs(parseFloat(calcCurrent) || 0));
    openUpcomingPlanModal(null, num > 0 ? num : '');
  };

  /* ==========================================================================
     NOTES & SETTINGS
     ========================================================================== */
  const renderNotesTab = () => {
    const container = document.getElementById('notesListContainer');
    const searchInput = document.getElementById('noteSearchInput');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let notes = [...(appState.notes || [])];

    if (query) {
      notes = notes.filter(n =>
        (n.title || '').toLowerCase().includes(query) ||
        (n.body || '').toLowerCase().includes(query)
      );
    }

    notes.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || (b.updated || tsFromId(b.id)) - (a.updated || tsFromId(a.id)));

    if (!notes.length) {
      container.innerHTML = `<div class="empty-state" style="padding:16px;">No notes found. Tap <strong>+ New Note</strong> to create one.</div>`;
      return;
    }

    container.innerHTML = notes.map(n => `<div class="history-item" onclick="openNotePage('${n.id}')" style="flex-direction:column;align-items:flex-start;gap:4px;cursor:pointer;border:${n.pinned ? '1px solid var(--accent)' : '1px solid transparent'}"><div style="display:flex;justify-content:space-between;width:100%;gap:8px"><div style="font-weight:800;font-size:.95rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(n.title || 'Untitled')}</div>${n.pinned ? '<span style="font-size:.9rem">📌</span>' : ''}</div><div style="font-size:.8rem;color:var(--text-secondary);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;white-space:pre-line">${escapeHtml((n.body || '').slice(0, 160))}</div><div style="font-size:.7rem;color:var(--text-muted)">${fmtTs(n.updated || tsFromId(n.id) || Date.now())}</div></div>`).join('');
  };

  const renderAll = () => {
    document.getElementById('currentMonthLabel').textContent = formatMonthDisplay(appState.selectedMonth);
    renderBudgetTab();
    renderFundsTab();
    renderUpcomingPlansTab();
    renderUdhaarTab();
    renderTxns();
    renderCatPage();
    initFundGestures();
    renderDashUdhaar();
    renderBell();
    renderNotesTab();
    renderCharts();
    renderDaily();
    renderBackupReminder();
    renderPinStatus();
    renderAbout();
    renderPlanCheck();
    document.body.classList.toggle('no-anim', !!appState.noAnim);
  };

  const openModal = (html) => {
    const backdrop = document.getElementById('modalBackdrop');
    const sheet = document.getElementById('modalSheetContent');
    clearTimeout(window._mTimer);
    sheet.innerHTML = `<div class="modal-handle"></div>` + html;
    backdrop.style.display = 'flex';
    if (window._pb) { clearTimeout(window._pb); window._pb = null; modalPushed = true; } else if (!modalPushed) { history.pushState({ m: 1 }, ''); modalPushed = true; }
    requestAnimationFrame(() => backdrop.classList.add('open'));
  };

  const closeModal = () => {
    if (window._rrc) { window._rrc = false; renderAll(); }
    const backdrop = document.getElementById('modalBackdrop');
    if (modalPushed) { modalPushed = false; window._pb = setTimeout(() => { window._pb = null; ignorePop++; history.back(); }, 60); }
    backdrop.classList.remove('open');
    clearTimeout(window._mTimer); window._mTimer = setTimeout(() => { backdrop.style.display = 'none'; }, 260);
  };

  const closeModalOnBackdrop = (e) => {
    if (e.target.id === 'modalBackdrop') closeModal();
  };

  const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  const _old_openIncomeModal = () => {
    const mData = getCurrentMonthData();
    openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Edit Income & Saving Target</h3>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label">Monthly Income (₹) - ${formatMonthDisplay(appState.selectedMonth)}</label>
        <input type="number" inputmode="decimal" id="inpIncome" class="form-input" value="${mData.income}" min="0" />
      </div>
      <div class="form-group">
        <label class="form-label">Target Saving Percentage (%)</label>
        <input type="number" inputmode="decimal" id="inpTargetPct" class="form-input" value="${mData.targetSavingPct}" min="0" max="100" />
      </div>
      <button class="btn-primary" style="justify-content:center; padding:12px;" onclick="saveIncomeSettings()">Save Changes</button>
    `);
  };

  const _old_saveIncomeSettings = () => {
    const mData = getCurrentMonthData();
    mData.income = Math.max(0, Number(document.getElementById('inpIncome').value) || 0);
    mData.targetSavingPct = Math.max(0, Math.min(100, Number(document.getElementById('inpTargetPct').value) || 0));
    saveState();
    closeModal();
    renderAll();
    showToast('Income & Target updated!');
  };

  const _old_openSalarySavingModal = () => {
    const mData = getCurrentMonthData();
    openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Monthly Salary Savings</h3>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <p style="font-size:0.78rem; color:var(--text-secondary);">
        Save money directly from your salary. This amount is tracked under <strong>Saved in Funds & Salary</strong> and will <strong>not</strong> be counted as an expense.
      </p>
      <div class="form-group">
        <label class="form-label">Current Saved Amount (₹)</label>
        <input type="number" inputmode="decimal" id="salarySavingInp" class="form-input" value="${mData.salarySavings || 0}" min="0" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Or Add Extra Amount Now (₹)</label>
        <input type="number" inputmode="decimal" id="salarySavingAddInp" class="form-input" placeholder="e.g. 2000" min="0" />
      </div>
      <button class="btn-primary" style="justify-content:center; padding:12px;" onclick="saveSalarySavingAmount()">Save Salary Savings</button>
    `);
  };

  const saveSalarySavingAmount = () => {
    const mData = getCurrentMonthData();
    const baseVal = Math.max(0, Number(document.getElementById('salarySavingInp').value) || 0);
    const addVal = Math.max(0, Number(document.getElementById('salarySavingAddInp').value) || 0);
    mData.salarySavings = baseVal + addVal;
    saveState();
    closeModal();
    renderAll();
    showToast('Salary savings updated!');
  };

  /* ==========================================================================
     UPCOMING PLANS: ADD & EDIT MODAL
     ========================================================================== */
  const openUpcomingPlanModal = (planId = null, prefillAmount = '') => {
    const mData = getCurrentMonthData();
    const plan = planId ? (mData.upcomingPlans || []).find(p => p.id === planId) : null;
    const defaultDate = `${appState.selectedMonth}-${String(new Date().getDate()).padStart(2, '0')}`;
    const amtValue = plan ? plan.amount : prefillAmount;

    openModal(`
      <div class="modal-header">
        <h3 class="modal-title">${plan ? '✏️ Edit Upcoming Plan / Bill' : 'Add Upcoming Plan / Bill'}</h3>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label">Plan / Bill Title</label>
        <input type="text" id="planTitle" class="form-input" value="${plan ? escapeHtml(plan.title) : ''}" placeholder="e.g. Electricity Bill or EMI" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Amount (₹)</label>
        <input type="number" inputmode="decimal" id="planAmt" oninput="updatePlanWarn('${plan ? plan.id : ''}')" class="form-input" value="${amtValue}" placeholder="e.g. 2500" />
      </div>
      <div class="form-group">
        <label class="form-label">Due / Reminder Date</label>
        <input type="date" id="planDate" class="form-input" value="${plan && plan.date ? plan.date : defaultDate}" />
      </div>
      <div class="form-group">
        <label class="form-label">Notes / Reminder Info</label>
        <input type="text" id="planNote" class="form-input" value="${plan && plan.note ? escapeHtml(plan.note) : ''}" placeholder="e.g. Pay before due date" />
      </div>
      <div class="form-group">
        <label class="form-label">Category (mark karne par yahin judega)</label>
        <select id="planCat" onchange="updatePlanWarn('${plan ? plan.id : ''}')" class="form-input"><option value="">— Choose later —</option>${mData.categories.map(c => `<option value="${c.id}" ${plan && plan.catId === c.id ? 'selected' : ''}>${c.icon} ${escapeHtml(c.name)}</option>`).join('')}</select>
      </div>
      <div id="planWarn" style="font-size:.78rem;line-height:1.5;margin-bottom:8px"></div>
      <div style="display:flex; gap:10px;">
        ${plan ? `<button class="btn-danger" onclick="deleteUpcomingPlan('${plan.id}'); closeModal();">Delete</button>` : ''}
        <button class="btn-primary" style="flex:1; justify-content:center; padding:12px;" onclick="saveUpcomingPlan('${plan ? plan.id : ''}')">
          ${plan ? 'Update Plan' : 'Save Upcoming Plan'}
        </button>
      </div>
    `);
    setTimeout(() => updatePlanWarn(planId || ''), 0);
  };

  let planFilter = 'pending';
  const planLog = (p, type, text) => { (p.history = p.history || []).unshift({ id: 'ph_' + Date.now() + Math.random().toString(36).slice(2, 5), type, text, ts: Date.now() }); };
  const fmtTs = (ts) => new Date(ts).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true });
  const saveUpcomingPlan = (planId = '') => {
    const title = document.getElementById('planTitle').value.trim();
    const amount = Number(document.getElementById('planAmt').value);
    const date = document.getElementById('planDate').value;
    const note = document.getElementById('planNote').value.trim();
    const catId = document.getElementById('planCat').value;

    if (!title || !amount || amount <= 0) {
      showToast('Enter title and valid amount');
      return;
    }

    const mData = getCurrentMonthData();
    if (!mData.upcomingPlans) mData.upcomingPlans = [];

    if (planId) {
      const existing = mData.upcomingPlans.find(p => p.id === planId);
      if (existing) {
        if (Number(existing.amount) !== amount) planLog(existing, 'amount', `Amount ${money(existing.amount)} → ${money(amount)}`);
        if ((existing.date || '') !== date) planLog(existing, 'date', `Date ${existing.date || 'none'} → ${date || 'none'}`);
        if (existing.title !== title) planLog(existing, 'edit', `Title changed to "${title}"`);
        existing.title = title;
        existing.amount = amount;
        existing.date = date;
        existing.note = note;
        existing.catId = catId;
        if (existing.marked) syncPlanExpense(existing);
      }
      showToast('Plan updated!');
    } else {
      mData.upcomingPlans.unshift({
        id: 'pl_' + Date.now(),
        title,
        amount,
        date,
        marked: false,
        note,
        catId,
        history: [{ id: 'ph_' + Date.now(), type: 'created', text: 'Plan created · ' + money(amount), ts: Date.now() }]
      });
      showToast('Upcoming plan added!');
    }

    saveState();
    closeModal();
    renderAll();
  };

  const togglePlanMarked = (planId) => {
    const mData = getCurrentMonthData();
    const plan = (mData.upcomingPlans || []).find(p => p.id === planId);
    if (plan && !plan.marked && !plan.catId) { openPlanCatPick(planId); return; }
    if (plan) {
      plan.marked = !plan.marked;
      planLog(plan, plan.marked ? 'marked' : 'unmarked', plan.marked ? 'Marked as done' : 'Marked as pending');
      syncPlanExpense(plan);
      saveState();
      renderAll();
      showToast(plan.marked ? 'Plan marked & included in Total!' : 'Plan unmarked (excluded from Total)');
    }
  };

  const _deleteUpcomingPlan = (planId) => {
    const mData = getCurrentMonthData();
    const _pl = (mData.upcomingPlans || []).find(p => p.id === planId); if (_pl) removePlanExpense(_pl);
    mData.upcomingPlans = (mData.upcomingPlans || []).filter(p => p.id !== planId);
    saveState();
    renderAll();
    showToast('Plan deleted');
  };

  /* ==========================================================================
     EXPENSES & CATEGORIES
     ========================================================================== */
  const openQuickExpenseModal = (preselectedCatId = '', prefillAmount = '') => {
    const mData = getCurrentMonthData();
    if (!mData.categories.length) {
      showToast('Create a category first!');
      openCategoryModal();
      return;
    }
    const today = `${appState.selectedMonth}-${String(new Date().getDate()).padStart(2, '0')}`;
    const options = mData.categories.map(c =>
      `<option value="${c.id}" ${c.id === preselectedCatId ? 'selected' : ''}>${c.icon} ${escapeHtml(c.name)}</option>`
    ).join('');

    openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Add Expense (${formatMonthDisplay(appState.selectedMonth)})</h3>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label">Amount (₹)</label>
        <input type="number" inputmode="decimal" id="expAmt" class="form-input" value="${prefillAmount}" placeholder="e.g. 500" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Category</label>
        <select id="expCat" class="form-select">${options}</select>
      </div>
      <div class="form-group">
        <label class="form-label">Item name</label>
        <input type="text" id="expNote" class="form-input" placeholder="e.g. Vegetables & Milk" />
      </div>
      <div class="form-group"><label class="form-label">Notes (optional)</label><textarea id="expDesc" class="form-textarea" rows="2" placeholder="Any extra details"></textarea></div>
      <div class="form-group"><label class="form-label">Payment method</label><select id="expPay" class="form-select">${["Cash","UPI","Card","Other"].map(p => `<option ${p === ('Cash') ? "selected" : ""}>${p}</option>`).join("")}</select></div>
      <div class="form-group">
        <label class="form-label">Date</label>
        <input type="date" id="expDate" class="form-input" value="${today}" /><label class="form-label" style="margin-top:6px">Time</label><input type="time" id="expTime" class="form-input" value="${nowHM()}" />
      </div>
      <button class="btn-primary" style="justify-content:center; padding:12px;" onclick="saveNewExpense()">Save Expense</button>
    `);
  };

  // Puts an expense into the month matching its date (creates month if needed)
  const placeExpense = (exp, srcCat) => {
    const ym = (exp.date || '').slice(0, 7);
    const target = /^\d{4}-\d{2}$/.test(ym) ? ym : appState.selectedMonth;
    ensureMonthExists(target);
    const tm = appState.months[target];
    let cat = tm.categories.find(c => c.id === exp.catId) || (srcCat && tm.categories.find(c => c.name === srcCat.name)) || tm.categories[0];
    if (!cat) { cat = { id: 'cat_' + Date.now(), name: 'Other', icon: '📦', limit: 5000, color: '#64748b' }; tm.categories.push(cat); }
    exp.catId = cat.id;
    tm.expenses.unshift(exp);
    return target;
  };

  const saveNewExpense = () => {
    const amount = Number(document.getElementById('expAmt').value);
    const catId = document.getElementById('expCat').value;
    const note = document.getElementById('expNote').value.trim();
    const date = document.getElementById('expDate').value || todayStr();
    if (!amount || amount <= 0) { showToast('Please enter a valid amount'); return; }
    const srcCat = getCurrentMonthData().categories.find(c => c.id === catId);
    const target = placeExpense({ id: 'exp_' + Date.now(), catId, amount, note: note || 'Expense', date, time: $v('expTime') || nowHM(), desc: $v('expDesc').trim(), pay: $v('expPay') }, srcCat);
    saveState(); closeModal(); renderAll();
    showToast(target === appState.selectedMonth ? `Added ${formatINR(amount)} expense!` : `Saved in ${formatMonthDisplay(target)}`);
  };

  const openEditExpenseModal = (expId, catId) => {
    const mData = getCurrentMonthData();
    const e = mData.expenses.find(x => x.id === expId);
    if (!e) return;
    const options = mData.categories.map(c => `<option value="${c.id}" ${c.id === e.catId ? 'selected' : ''}>${c.icon} ${escapeHtml(c.name)}</option>`).join('');
    openModal(`
      <div class="modal-header"><h3 class="modal-title">Edit Expense</h3><button class="close-btn" onclick="closeModal()">✕</button></div>
      <div class="form-group"><label class="form-label">Amount (₹)</label><input type="number" inputmode="decimal" id="expAmt" class="form-input" value="${e.amount}" /></div>
      <div class="form-group"><label class="form-label">Category</label><select id="expCat" class="form-select">${options}</select></div>
      <div class="form-group"><label class="form-label">Item name</label><input type="text" id="expNote" class="form-input" value="${escapeHtml(e.note)}" /></div>
      <div class="form-group"><label class="form-label">Notes (optional)</label><textarea id="expDesc" class="form-textarea" rows="2">${escapeHtml(e.desc || '')}</textarea></div>
      <div class="form-group"><label class="form-label">Payment method</label><select id="expPay" class="form-select">${["Cash","UPI","Card","Other"].map(p => `<option ${p === (e.pay || 'Cash') ? "selected" : ""}>${p}</option>`).join("")}</select></div>
      <div class="form-group"><label class="form-label">Date</label><input type="date" id="expDate" class="form-input" value="${e.date || ''}" /><label class="form-label" style="margin-top:6px">Time</label><input type="time" id="expTime" class="form-input" value="${e.time || timeFromId(e.id)}" /></div>
      <button class="btn-primary" style="justify-content:center; padding:12px;" onclick="saveExpenseEdit('${e.id}')">Save Changes</button>
    `);
  };

  const saveExpenseEdit = (expId) => {
    const mData = getCurrentMonthData();
    const old = mData.expenses.find(x => x.id === expId);
    if (!old) return;
    const amount = Number(document.getElementById('expAmt').value);
    if (!amount || amount <= 0) { showToast('Please enter a valid amount'); return; }
    const catId = document.getElementById('expCat').value;
    const srcCat = mData.categories.find(c => c.id === catId);
    mData.expenses = mData.expenses.filter(x => x.id !== expId);
    const nn = { id: old.id, catId, amount, note: document.getElementById('expNote').value.trim() || 'Expense', date: document.getElementById('expDate').value || old.date, time: $v('expTime') || old.time, desc: $v('expDesc').trim(), pay: $v('expPay'), history: (old.history || []).slice() };
    const ch = []; if (Number(old.amount) !== amount) ch.push(`Amount ${money(old.amount)} → ${money(amount)}`); if (old.note !== nn.note) ch.push(`Item name changed to "${nn.note}"`); if (old.catId !== catId) ch.push('Category changed'); if ((old.date || '') !== nn.date) ch.push(`Date ${old.date || 'none'} → ${nn.date}`); if ((old.pay || '') !== nn.pay) ch.push(`Payment ${old.pay || 'not set'} → ${nn.pay}`); if ((old.desc || '') !== nn.desc) ch.push('Notes updated');
    ch.forEach(t => nn.history.unshift({ text: t, ts: Date.now() }));
    const target = placeExpense(nn, srcCat);
    saveState(); closeModal(); renderAll();
    showToast(target === appState.selectedMonth ? 'Expense updated' : `Moved to ${formatMonthDisplay(target)}`);
  };

  const openCategoryModal = (catId = null) => {
    const mData = getCurrentMonthData();
    const cat = catId ? mData.categories.find(c => c.id === catId) : null;
    const icons = ['🏠', '🛒', '🍔', '⛽', '🛍️', '💊', '📱', '🎬', '🎓', '✈️', '💡', '🎁'];
    const selectedIcon = cat ? cat.icon : '🛒';

    openModal(`
      <div class="modal-header">
        <h3 class="modal-title">${cat ? 'Edit Category' : 'New Expense Category'}</h3>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label">Category Name</label>
        <input type="text" id="catNameInp" class="form-input" value="${cat ? escapeHtml(cat.name) : ''}" placeholder="e.g. Medical" />
      </div>
      <div class="form-group">
        <label class="form-label">Monthly Budget Limit (₹)</label>
        <input type="number" inputmode="decimal" id="catLimitInp" class="form-input" value="${cat ? cat.limit : 5000}" min="0" />
      </div>
      <div class="form-group">
        <label class="form-label">Select Icon</label>
        <input type="hidden" id="catIconInp" value="${selectedIcon}" />
        <div class="emoji-picker">
          ${icons.map(ic => `<button type="button" class="emoji-opt ${ic === selectedIcon ? 'selected' : ''}" onclick="selectEmoji(this, 'catIconInp', '${ic}')">${ic}</button>`).join('')}
        </div>
      </div>
      <div style="display:flex; gap:10px; margin-top:4px;">
        ${cat ? `<button class="btn-danger" onclick="deleteCategory('${cat.id}')">Delete</button>` : ''}
        <button class="btn-primary" style="flex:1; justify-content:center; padding:12px;" onclick="saveCategory('${cat ? cat.id : ''}')">Save Category</button>
      </div>
    `);
  };

  const selectEmoji = (btn, hiddenInputId, emoji) => {
    btn.parentElement.querySelectorAll('.emoji-opt').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById(hiddenInputId).value = emoji;
  };

  const saveCategory = (catId) => {
    const name = document.getElementById('catNameInp').value.trim();
    const limit = Math.max(0, Number(document.getElementById('catLimitInp').value) || 0);
    const icon = document.getElementById('catIconInp').value || '📁';

    if (!name) {
      showToast('Category name is required');
      return;
    }

    const mData = getCurrentMonthData();
    if (catId) {
      const target = mData.categories.find(c => c.id === catId);
      if (target) {
        target.name = name;
        target.limit = limit;
        target.icon = icon;
      }
    } else {
      mData.categories.push({ id: 'cat_' + Date.now(), name, icon, limit, color: '#6366f1' });
    }

    saveState();
    closeModal();
    renderAll();
    showToast(catId ? 'Category updated!' : 'New category created!');
  };

  const _deleteCategory = (catId) => {
    const mData = getCurrentMonthData();
    mData.categories = mData.categories.filter(c => c.id !== catId);
    mData.expenses = mData.expenses.filter(e => e.catId !== catId);
    saveState();
    closeModal();
    renderAll();
    showToast('Category deleted');
  };

  const openCategoryDetailModal = (catId) => {
    const mData = getCurrentMonthData();
    const cat = mData.categories.find(c => c.id === catId);
    if (!cat) return;
    const list = mData.expenses.filter(e => e.catId === catId);

    openModal(`
      <div class="modal-header">
        <h3 class="modal-title">${cat.icon} ${escapeHtml(cat.name)} Entries</h3>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px; max-height:48vh; overflow-y:auto;">
        ${list.length ? list.map(e => `
          <div class="history-item">
            <div>
              <div style="font-weight:700;">${escapeHtml(e.note)}</div>
              <div style="font-size:0.72rem; color:var(--text-muted);">${e.date || ''}</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <strong>${formatINR(e.amount)}</strong>
              <button class="mini-icon-btn" onclick="openEditExpenseModal('${e.id}', '${cat.id}')">✏️</button>
              <button class="mini-icon-btn" style="color:var(--danger);" onclick="deleteExpenseEntry('${e.id}', '${cat.id}')">🗑️</button>
            </div>
          </div>
        `).join('') : `<div style="text-align:center; padding:16px; color:var(--text-muted); font-size:0.84rem;">No expenses in this category.</div>`}
      </div>
      <button class="btn-primary" style="justify-content:center; padding:12px;" onclick="openQuickExpenseModal('${cat.id}')">+ Add Expense Here</button>
    `);
  };

  const _deleteExpenseEntry = (expId, catId) => {
    const mData = getCurrentMonthData();
    mData.expenses = mData.expenses.filter(e => e.id !== expId);
    saveState();
    renderAll();
    if (activeTabName() === 'budget') openCategoryDetailModal(catId);
    showToast('Expense removed');
  };

  /* ==========================================================================
     FUNDS MANAGEMENT
     ========================================================================== */
  const openFundModal = (fundId = null) => {
    const fund = fundId ? appState.funds.find(f => f.id === fundId) : null;
    const icons = ['🛡️', '🏍️', '✈️', '💍', '🏡', '💻', '🎓', '📈', '💰', '🏦'];
    const selectedIcon = fund ? fund.icon : '💰';

    openModal(`
      <div class="modal-header">
        <h3 class="modal-title">${fund ? 'Edit Fund' : 'Create New Savings Fund'}</h3>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label">Fund Name</label>
        <input type="text" id="fundNameInp" class="form-input" value="${fund ? escapeHtml(fund.name) : ''}" placeholder="e.g. Emergency Fund" />
      </div>
      <div class="form-group">
        <label class="form-label">Target Goal Amount (₹)</label>
        <input type="number" inputmode="decimal" id="fundTargetInp" class="form-input" value="${fund ? fund.target : 50000}" min="0" />
      </div>
      <div class="form-group">
        <label class="form-label">Target date (optional)</label>
        <input type="date" id="fundDateInp" class="form-input" value="${fund && fund.targetDate ? fund.targetDate : ''}" />
      </div>
      ${!fund ? `
        <div class="form-group">
          <label class="form-label">Starting Balance (₹)</label>
          <input type="number" inputmode="decimal" id="fundStartInp" class="form-input" value="0" min="0" />
        </div>
      ` : ''}
      <div class="form-group">
        <label class="form-label">Choose Icon</label>
        <input type="hidden" id="fundIconInp" value="${selectedIcon}" />
        <div class="emoji-picker">
          ${icons.map(ic => `<button type="button" class="emoji-opt ${ic === selectedIcon ? 'selected' : ''}" onclick="selectEmoji(this, 'fundIconInp', '${ic}')">${ic}</button>`).join('')}
        </div>
      </div>
      <div style="display:flex; gap:10px;">
        ${fund ? `<button class="btn-danger" onclick="deleteFund('${fund.id}')">Delete</button>` : ''}
        <button class="btn-primary" style="flex:1; justify-content:center; padding:12px;" onclick="saveFund('${fund ? fund.id : ''}')">Save Fund</button>
      </div>
    `);
  };

  const saveFund = (fundId) => {
    const name = document.getElementById('fundNameInp').value.trim();
    const target = Math.max(0, Number(document.getElementById('fundTargetInp').value) || 0);
    const icon = document.getElementById('fundIconInp').value || '💰';
    const targetDate = document.getElementById('fundDateInp').value;

    if (!name) {
      showToast('Enter a fund name');
      return;
    }

    if (fundId) {
      const f = appState.funds.find(x => x.id === fundId);
      if (f) { f.name = name; f.target = target; f.icon = icon; f.targetDate = targetDate; }
    } else {
      const startBal = Math.max(0, Number(document.getElementById('fundStartInp').value) || 0);
      appState.funds.push({
        id: 'fund_' + Date.now(),
        name,
        icon,
        target,
        targetDate,
        balance: startBal,
        history: startBal > 0 ? [{ id: 'fh_' + Date.now(), type: 'add', amount: startBal, month: appState.selectedMonth, date: `${appState.selectedMonth}-${String(new Date().getDate()).padStart(2, '0')}`, note: 'Opening Balance' }] : []
      });
    }

    saveState();
    closeModal();
    renderAll();
    showToast(fundId ? 'Fund updated!' : 'New Fund created!');
  };

  const _deleteFund = (fundId) => {
    appState.funds = appState.funds.filter(f => f.id !== fundId);
    saveState();
    closeModal();
    renderAll();
    showToast('Fund deleted');
  };

  const openFundTxnModal = (fundId, type) => {
    const fund = appState.funds.find(f => f.id === fundId);
    if (!fund) return;
    const isAdd = type === 'add';

    openModal(`
      <div class="modal-header">
        <h3 class="modal-title">${isAdd ? `+ Add Money to ${escapeHtml(fund.name)}` : `- Withdraw from ${escapeHtml(fund.name)}`}</h3>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label">Amount (₹)</label>
        <input type="number" inputmode="decimal" id="fundTxnAmt" class="form-input" placeholder="e.g. 2000" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Note</label>
        <input type="text" id="fundTxnNote" class="form-input" placeholder="${isAdd ? 'Monthly deposit' : 'Withdrawal'}" />
      </div>
      <button class="btn-primary" style="justify-content:center; padding:12px;" onclick="processFundTxn('${fund.id}', '${type}')">
        ${isAdd ? 'Confirm Deposit' : 'Confirm Withdrawal'}
      </button>
    `);
  };

  const processFundTxn = (fundId, type) => {
    const fund = appState.funds.find(f => f.id === fundId);
    const amt = Number(document.getElementById('fundTxnAmt').value);
    const note = document.getElementById('fundTxnNote').value.trim();

    if (!amt || amt <= 0) {
      showToast('Enter a valid amount');
      return;
    }
    if (type === 'withdraw' && amt > fund.balance) {
      showToast('Insufficient balance');
      return;
    }

    if (type === 'add') fund.balance += amt;
    else fund.balance -= amt;

    fund.history = fund.history || [];
    fund.history.unshift({
      id: 'fh_' + Date.now(),
      time: nowHM(),
      type,
      amount: amt,
      month: appState.selectedMonth,
      date: `${appState.selectedMonth}-${String(new Date().getDate()).padStart(2, '0')}`,
      note: note || (type === 'add' ? 'Deposit' : 'Withdrawal')
    });

    saveState();
    closeModal();
    renderAll();
    showToast(type === 'add' ? `Added ${formatINR(amt)}!` : `Withdrew ${formatINR(amt)}`);
  };

  const openFundHistoryModal = (fundId) => {
    const fund = appState.funds.find(f => f.id === fundId);
    if (!fund) return;
    const hist = fund.history || [];

    openModal(`
      <div class="modal-header">
        <h3 class="modal-title">${fund.icon} ${escapeHtml(fund.name)} History</h3>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px; max-height:52vh; overflow-y:auto;">
        ${hist.length ? hist.map(h => `
          <div class="history-item">
            <div>
              <div style="font-weight:700;">${escapeHtml(h.note)}</div>
              <div style="font-size:0.72rem; color:var(--text-muted);">${h.date}</div>
            </div>
            <strong style="color:${h.type === 'add' ? 'var(--success)' : 'var(--danger)'};">
              ${h.type === 'add' ? '+' : '-'}${formatINR(h.amount)}
            </strong>
          </div>
        `).join('') : `<div style="text-align:center; padding:16px; color:var(--text-muted);">No transactions yet.</div>`}
      </div>
    `);
  };

  /* ==========================================================================
     UDHAAR MANAGEMENT
     ========================================================================== */
  const openNewUdhaarModal = () => {
    const today = new Date().toISOString().slice(0, 10);
    openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Add Borrow / Lend Entry</h3>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label">Transaction Type</label>
        <select id="udType" class="form-select" onchange="document.getElementById('udDueLbl').textContent = this.value === 'borrowed' ? 'I will pay back by (optional)' : 'Expected back by (optional)'">
          <option value="lent" ${activeUdhaarSubTab === 'lent' ? 'selected' : ''}>Lent (I will receive)</option>
          <option value="borrowed" ${activeUdhaarSubTab === 'borrowed' ? 'selected' : ''}>Borrowed (I have to pay)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Person Name</label>
        <input type="text" id="udPerson" class="form-input" placeholder="e.g. Suresh Kumar" />
      </div>
      <div class="form-group">
        <label class="form-label">Total Amount (₹)</label>
        <input type="number" inputmode="decimal" id="udTotal" class="form-input" placeholder="e.g. 5000" />
      </div>
      <div class="form-group">
        <label class="form-label">Date</label>
        <input type="date" id="udDate" class="form-input" value="${today}" /><label class="form-label" style="margin-top:6px">Time</label><input type="time" id="udTime" class="form-input" value="${nowHM()}" />
      </div>
      <div class="form-group">
        <label class="form-label" id="udDueLbl">${activeUdhaarSubTab === 'borrowed' ? 'I will pay back by (optional)' : 'Expected back by (optional)'}</label>
        <input type="date" id="udDue" class="form-input" />
        <div style="display:flex;gap:6px;margin-top:6px">${[7, 15, 30].map(n => `<button type="button" class="btn-secondary" style="padding:6px 10px;font-size:.74rem" onclick="setUdDue('udDue',${n})">${n} din baad</button>`).join('')}</div>
      </div>
      <div class="form-group">
        <label class="form-label">Notes / Reason</label>
        <textarea id="udNotes" class="form-textarea" rows="2" placeholder="Write details..."></textarea>
      </div>
      <button class="btn-primary" style="justify-content:center; padding:12px;" onclick="saveNewUdhaar()">Save Entry</button>
    `);
  };

  const saveNewUdhaar = () => {
    const type = document.getElementById('udType').value;
    const person = document.getElementById('udPerson').value.trim();
    const totalAmount = Number(document.getElementById('udTotal').value);
    const date = document.getElementById('udDate').value;
    const notes = document.getElementById('udNotes').value.trim();
    const due = document.getElementById('udDue').value;

    if (!person || !totalAmount || totalAmount <= 0) {
      showToast('Enter person name and valid amount');
      return;
    }

    appState.udhaar.unshift({
      id: 'ud_' + Date.now(),
      type,
      person,
      totalAmount,
      paidAmount: 0,
      date,
      due,
      time: $v('udTime') || nowHM(),
      notes,
      history: [{ id: 'uh_' + Date.now(), action: type === 'lent' ? 'Initial Lent' : 'Initial Borrowed', amount: totalAmount, date, time: $v('udTime') || nowHM(), note: notes || 'Created' }]
    });

    activeUdhaarSubTab = type;
    saveState();
    closeModal();
    switchUdhaarSubTab(type);
    showToast('Entry saved!');
  };

  const openUdhaarPaymentModal = (id) => {
    const item = appState.udhaar.find(u => u.id === id);
    if (!item) return;
    const remaining = Math.max(0, item.totalAmount - item.paidAmount);
    const today = new Date().toISOString().slice(0, 10);

    openModal(`
      <div class="modal-header">
        <h3 class="modal-title">${item.type === 'lent' ? `Receive from ${escapeHtml(item.person)}` : `Pay back ${escapeHtml(item.person)}`}</h3>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <div style="font-size:0.82rem; color:var(--text-secondary);">Remaining: <strong style="color:var(--danger);">${formatINR(remaining)}</strong></div>
      <div class="form-group">
        <label class="form-label">Amount (₹)</label>
        <input type="number" inputmode="decimal" id="udPayAmt" class="form-input" value="${remaining}" max="${remaining}" min="1" />
      </div>
      <div class="form-group">
        <label class="form-label">Date</label>
        <input type="date" id="udPayDate" class="form-input" value="${today}" /><label class="form-label" style="margin-top:6px">Time</label><input type="time" id="udPayTime" class="form-input" value="${nowHM()}" />
      </div>
      <div class="form-group">
        <label class="form-label">Payment Note</label>
        <input type="text" id="udPayNote" class="form-input" placeholder="e.g. UPI / Cash" />
      </div>
      <button class="btn-primary" style="justify-content:center; padding:12px;" onclick="saveUdhaarPayment('${item.id}')">Record Payment</button>
    `);
  };

  const saveUdhaarPayment = (id) => {
    const item = appState.udhaar.find(u => u.id === id);
    const amt = Number(document.getElementById('udPayAmt').value);
    const date = document.getElementById('udPayDate').value;
    const note = document.getElementById('udPayNote').value.trim();
    const remaining = Math.max(0, item.totalAmount - item.paidAmount);

    if (!amt || amt <= 0 || amt > remaining) {
      showToast('Enter valid amount');
      return;
    }

    item.paidAmount += amt;
    item.history = item.history || [];
    item.history.unshift({
      id: 'uh_' + Date.now(),
      action: item.type === 'lent' ? 'Received Back' : 'Paid Back',
      amount: amt,
      date,
      time: $v('udPayTime') || nowHM(),
      note: note || 'Payment'
    });

    saveState();
    closeModal();
    renderAll();
    showToast(`Recorded ${formatINR(amt)}!`);
  };

  const openUdhaarEyeModal = (id) => {
    const item = appState.udhaar.find(u => u.id === id);
    if (!item) return;

    openModal(`
      <div class="modal-header">
        <h3 class="modal-title">👁️ Details & Notes</h3>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label">Person Name</label>
        <input type="text" id="editUdPerson" class="form-input" value="${escapeHtml(item.person)}" />
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div class="form-group">
          <label class="form-label">Total (₹)</label>
          <input type="number" inputmode="decimal" id="editUdTotal" class="form-input" value="${item.totalAmount}" />
        </div>
        <div class="form-group"><label class="form-label">Cleared</label><div class="form-input" style="opacity:.75">${formatINR(item.paidAmount)} (via payments)</div></div>
      </div>
      <div class="form-group">
        <label class="form-label">Notes</label>
        <textarea id="editUdNotes" class="form-textarea" rows="3">${escapeHtml(item.notes || '')}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">${item.type === 'borrowed' ? 'I will pay back by' : 'Expected back by'}</label>
        <input type="date" id="editUdDue" class="form-input" value="${item.due || ''}" />
        <div style="display:flex;gap:6px;margin-top:6px">${[7, 15, 30].map(n => `<button type="button" class="btn-secondary" style="padding:6px 10px;font-size:.74rem" onclick="setUdDue('editUdDue',${n})">${n} din baad</button>`).join('')}</div>
      </div>
      ${udHistHtml(item)}
      <div style="display:flex; gap:10px; margin-top:6px;">
        <button class="btn-danger" onclick="deleteUdhaarEntry('${item.id}')">Delete</button>
        <button class="btn-primary" style="flex:1; justify-content:center; padding:12px;" onclick="saveUdhaarEdits('${item.id}')">Save Changes</button>
      </div>
    `);
  };

  const saveUdhaarEdits = (id) => {
    const item = appState.udhaar.find(u => u.id === id);
    if (!item) return;
    item.person = document.getElementById('editUdPerson').value.trim();
    item.totalAmount = Math.max(0, Number(document.getElementById('editUdTotal').value) || 0);
    item.paidAmount = Math.min(item.paidAmount, item.totalAmount);
    item.notes = document.getElementById('editUdNotes').value.trim();
    item.due = document.getElementById('editUdDue').value;

    saveState();
    closeModal();
    renderAll();
    showToast('Loan updated!');
  };

  const _deleteUdhaarEntry = (id) => {
    appState.udhaar = appState.udhaar.filter(u => u.id !== id);
    saveState();
    closeModal();
    renderAll();
    showToast('Record deleted');
  };

  /* ==========================================================================
     NOTES & BACKUP
     ========================================================================== */
  const openNoteModal = (noteId = null) => {
    const note = noteId ? (appState.notes || []).find(n => n.id === noteId) : null;

    openModal(`
      <div class="modal-header">
        <h3 class="modal-title">${note ? 'Edit Financial Note' : 'New Financial Note'}</h3>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label">Title / Heading</label>
        <input type="text" id="noteTitle" class="form-input" value="${note ? escapeHtml(note.title) : ''}" placeholder="e.g. SIP Investment Plan" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Note Content / Details</label>
        <textarea id="noteBody" class="form-textarea" rows="5" placeholder="Write important details, reminders, or notes here...">${note ? escapeHtml(note.body) : ''}</textarea>
      </div>
      <button class="btn-primary" style="justify-content:center; padding:12px;" onclick="saveNote('${note ? note.id : ''}')">Save Note</button>
    `);
  };

  const saveNote = (noteId) => {
    const title = document.getElementById('noteTitle').value.trim();
    const body = document.getElementById('noteBody').value.trim();
    const today = new Date().toISOString().slice(0, 10);

    if (!title) {
      showToast('Note title is required');
      return;
    }

    if (!appState.notes) appState.notes = [];

    if (noteId) {
      const n = appState.notes.find(x => x.id === noteId);
      if (n) { n.title = title; n.body = body; n.date = today; }
    } else {
      appState.notes.unshift({ id: 'note_' + Date.now(), title, body, date: today, pinned: false });
    }

    saveState();
    closeModal();
    renderAll();
    showToast('Note saved successfully!');
  };

  const togglePinNote = (noteId) => {
    const n = (appState.notes || []).find(x => x.id === noteId);
    if (n) {
      n.pinned = !n.pinned;
      saveState();
      renderNotesTab();
      showToast(n.pinned ? 'Note pinned 📌' : 'Note unpinned');
    }
  };

  const copyNoteText = (noteId) => {
    const n = (appState.notes || []).find(x => x.id === noteId);
    if (!n) return;
    const text = `${n.title}
${n.body}`;
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Note copied to clipboard 📋');
  };

  const _deleteNote = (noteId) => {
    appState.notes = (appState.notes || []).filter(n => n.id !== noteId);
    saveState();
    renderAll();
    showToast('Note deleted');
  };

  let selectedBackupDirHandle = null;

  const initBackupDefaults = () => {
    const nameInp = document.getElementById('backupCustomFileName');
    if (nameInp && !nameInp.value.trim()) {
      const stamp = new Date().toISOString().slice(0, 10);
      nameInp.value = `SmartBudget_Backup_${stamp}`;
    }
  };

  const getSanitizedBackupFileName = () => {
    const nameInp = document.getElementById('backupCustomFileName');
    const stamp = new Date().toISOString().slice(0, 10);
    let raw = nameInp ? nameInp.value.trim() : '';
    if (!raw) raw = `SmartBudget_Backup_${stamp}`;
    raw = raw.replace(/\.json$/i, '').replace(/[\\/:*?"<>|]/g, '_');
    return `${raw}.json`;
  };

  const selectBackupFolder = async () => {
    const displayInp = document.getElementById('backupFolderDisplay');
    if ('showDirectoryPicker' in window) {
      try {
        const dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
        selectedBackupDirHandle = dirHandle;
        if (displayInp) displayInp.value = `📁 Selected: ${dirHandle.name}/`;
        showToast(`Folder selected: ${dirHandle.name}`);
      } catch (err) {
        if (err.name !== 'AbortError') {
          showToast('Folder selection cancelled');
        }
      }
    } else {
      if (displayInp) displayInp.value = 'Browser "Save As" dialog will open';
      showToast('Click Save Backup to choose folder & name');
    }
  };

  const exportBackupJSON = async () => {
    const fileName = getSanitizedBackupFileName();
    const dataStr = JSON.stringify(appState, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });

    // Case 1: User already picked a folder via Directory Picker
    if (selectedBackupDirHandle) {
      try {
        const fileHandle = await selectedBackupDirHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
        markBackupDone(); showToast(`Saved "${fileName}" in ${selectedBackupDirHandle.name}/ ✓`);
        return;
      } catch (err) {
        selectedBackupDirHandle = null;
      }
    }

    // Case 2: Modern File System Access "Save As" Picker (lets user manually choose folder & filename)
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [{
            description: 'SmartBudget JSON Backup',
            accept: { 'application/json': ['.json'] }
          }]
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        const displayInp = document.getElementById('backupFolderDisplay');
        if (displayInp) displayInp.value = `Saved as: ${handle.name}`;
        markBackupDone(); showToast(`Backup saved: ${handle.name} ✓`);
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    // Case 3: Fallback standard browser download with custom filename
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    markBackupDone(); showToast(`Downloaded "${fileName}" ✓`);
  };

  const shareBackupFile = async () => {
    const file = new File([JSON.stringify(appState, null, 2)], getSanitizedBackupFileName(), { type: 'application/json' });
    try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file] }); markBackupDone(); } else showToast('Sharing is not supported on this phone. Use the Backup button.'); }
    catch (e) { if (e.name !== 'AbortError') showToast('Could not share'); }
  };
  const applyRestoredData = (parsed) => {
    if (!parsed || typeof parsed !== 'object' || !parsed.months || typeof parsed.months !== 'object' || !Object.values(parsed.months).every(m => m && Array.isArray(m.categories) && Array.isArray(m.expenses)) || (parsed.udhaar && !Array.isArray(parsed.udhaar)) || (parsed.funds && !Array.isArray(parsed.funds))) { showToast('This backup file is not valid. Nothing was changed.'); return; }
    if (!parsed || !parsed.months || !parsed.funds || !parsed.udhaar) {
      throw new Error('Invalid format');
    }
    appState = parsed;
    if (!appState.notes) appState.notes = [];
    saveState();
    applyTheme();
    renderAll();
    showToast('Backup restored successfully! ✓');
  };

  const triggerRestorePicker = async () => {
    if ('showOpenFilePicker' in window) {
      try {
        const [fileHandle] = await window.showOpenFilePicker({
          multiple: false,
          types: [{
            description: 'SmartBudget JSON Backup',
            accept: { 'application/json': ['.json'] }
          }]
        });
        const file = await fileHandle.getFile();
        const text = await file.text();
        applyRestoredData(JSON.parse(text));
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }
    document.getElementById('restoreFileInput').click();
  };

  const importBackupJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        applyRestoredData(JSON.parse(e.target.result));
      } catch (err) {
        showToast('Invalid backup file!');
      }
      event.target.value = '';
    };
    reader.readAsText(file);
  };

  const _resetToDemoData = () => {
    appState = createDefaultState();
    saveState();
    applyTheme();
    renderAll();
    showToast('Demo data loaded!');
  };

  const _clearAllData = () => {
    const curMonth = appState.selectedMonth;
    appState = {
      theme: appState.theme,
      selectedMonth: curMonth, pin: null, lastBackup: appState.lastBackup,
      months: { [curMonth]: { income: 0, targetSavingPct: 20, salarySavings: 0, categories: [], expenses: [], upcomingPlans: [] } },
      funds: [],
      udhaar: [],
      notes: []
    };
    saveState();
    renderAll();
    showToast('All data cleared!');
  };


  /* ==========================================================================
     ADDED FEATURES: confirm, charts, CSV, PIN lock, backup reminder
     ========================================================================== */
  let _confirmFn = null;
  const confirmAction = (title, msg, fn, label = 'Yes, Delete') => {
    _confirmFn = fn;
    openModal(`
      <div class="modal-header"><h3 class="modal-title">${title}</h3><button class="close-btn" onclick="closeModal()">✕</button></div>
      <p style="font-size:.88rem;color:var(--text-secondary);line-height:1.5;margin-bottom:14px;">${msg}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <button class="btn-secondary" style="justify-content:center;padding:12px;" onclick="closeModal()">Cancel</button>
        <button class="btn-danger" style="justify-content:center;padding:12px;" onclick="runConfirm()">${label}</button>
      </div>`);
  };
  const runConfirm = () => { const f = _confirmFn; _confirmFn = null; closeModal(); if (f) { snap(); f(); showUndo('Deleted'); } };

  const deleteCategory = (id) => {
    const m = getCurrentMonthData(); const c = m.categories.find(x => x.id === id);
    const n = m.expenses.filter(e => e.catId === id).length;
    confirmAction('Delete category?', `"${escapeHtml(c ? c.name : '')}" and its ${n} expense entries will be deleted permanently.`, () => _deleteCategory(id));
  };
  const deleteFund = (id) => confirmAction('Delete fund?', 'This fund and its full history will be deleted.', () => _deleteFund(id));
  const deleteUdhaarEntry = (id) => confirmAction('Delete record?', 'This loan record and its history will be deleted.', () => _deleteUdhaarEntry(id));
  const deleteNote = (id) => confirmAction('Delete note?', 'This note will be deleted.', () => _deleteNote(id));
  const deleteUpcomingPlan = (id) => confirmAction('Delete plan?', 'This upcoming plan will be deleted.', () => _deleteUpcomingPlan(id));
  const clearAllData = () => confirmAction('Clear ALL data?', 'Everything (expenses, funds, loans, notes) will be erased. Take a backup first if unsure.', () => { _clearAllData(); }, 'Yes, Clear All');
  const resetToDemoData = () => confirmAction('Load demo data?', 'Your current data will be REPLACED with sample demo data.', () => { _resetToDemoData(); }, 'Yes, Replace');

  /* ---------- Charts (pure SVG) ---------- */
  const renderCharts = () => {
    const mData = getCurrentMonthData();
    const spent = mData.categories.map(c => ({ c, v: mData.expenses.filter(e => e.catId === c.id).reduce((s, e) => s + Number(e.amount), 0) })).filter(x => x.v > 0);
    const total = spent.reduce((s, x) => s + x.v, 0);
    const donut = document.getElementById('donutChart');
    if (!total) {
      donut.innerHTML = '<div style="font-size:.8rem;color:var(--text-muted);padding:8px 0;">No expenses this month yet.</div>';
    } else {
      const PAL = ['#6d5efc', '#f472b6', '#10b981', '#f59e0b', '#38bdf8', '#ef4444', '#a855f7', '#14b8a6', '#eab308', '#fb7185']; spent.sort((p, q) => q.v - p.v); spent.forEach((x, i) => { x.col = PAL[i % PAL.length]; });
      const R = 42, C = 2 * Math.PI * R; let acc = 0;
      const arcs = spent.map(x => { const seg = x.v / total * C; const el = `<circle cx="60" cy="60" r="${R}" fill="none" stroke="${x.col}" stroke-width="18" stroke-dasharray="${seg} ${C - seg}" stroke-dashoffset="${-acc}" transform="rotate(-90 60 60)"/>`; acc += seg; return el; }).join('');
      const legend = spent.sort((a, b) => b.v - a.v).map(x => `<div class="legend-row"><span class="legend-dot" style="background:${x.col}"></span><span style="flex:1">${x.c.icon} ${escapeHtml(x.c.name)}</span><strong>${formatINR(x.v)}</strong><span style="color:var(--text-muted);width:34px;text-align:right">${Math.round(x.v / total * 100)}%</span></div>`).join('');
      donut.innerHTML = `<div style="display:flex;justify-content:center;"><svg viewBox="0 0 120 120" width="170" height="170">${arcs}<text x="60" y="58" text-anchor="middle" style="fill:var(--text-muted);font-size:8px">Spent</text><text x="60" y="71" text-anchor="middle" style="fill:var(--text-primary);font-size:11px;font-weight:800">${formatINR(total)}</text></svg></div>${legend}`;
    }
    // bars: last 6 months
    const [y, m] = appState.selectedMonth.split('-').map(Number);
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(y, m - 1 - i, 1);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const mt = getMonthMetrics(ym);
      data.push({ lbl: d.toLocaleDateString('en-US', { month: 'short' }), inc: mt ? mt.income : 0, exp: mt ? mt.totalExpenses : 0 });
    }
    const max = Math.max(1, ...data.map(d => Math.max(d.inc, d.exp)));
    const H = 110, bw = 14;
    const bars = data.map((d, i) => {
      const x = 12 + i * 50, hi = d.inc / max * H, he = d.exp / max * H;
      return `<rect x="${x}" y="${H - hi + 8}" width="${bw}" height="${hi}" rx="3" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1"/>
        <rect x="${x + bw + 3}" y="${H - he + 8}" width="${bw}" height="${he}" rx="3" style="fill:var(--danger)"/>
        <text x="${x + bw}" y="${H + 22}" text-anchor="middle" style="fill:var(--text-muted);font-size:9px">${d.lbl}</text>`;
    }).join('');
    document.getElementById('barChart').innerHTML = `<svg viewBox="0 0 312 135" width="100%">${bars}</svg>
      <div style="display:flex;gap:14px;font-size:.74rem;color:var(--text-secondary);justify-content:center"><span><span class="legend-dot" style="background:var(--accent);display:inline-block"></span> Income</span><span><span class="legend-dot" style="background:var(--danger);display:inline-block"></span> Spent</span></div>`;
  };

  /* ---------- CSV export ---------- */
  const exportCSV = () => {
    const rows = [['Type', 'Month', 'Date', 'Category', 'Note', 'Amount']];
    Object.keys(appState.months).sort().forEach(ym => {
      const mo = appState.months[ym];
      rows.push(['Income', ym, '', '', 'Monthly income', mo.income || 0]);
      (mo.extraIncome || []).forEach(x => rows.push(['Income', ym, x.date || '', '', x.note || 'Extra income', x.amount]));
      (mo.expenses || []).slice().sort((a, b) => (a.date || '').localeCompare(b.date || '')).forEach(e => {
        const c = mo.categories.find(x => x.id === e.catId);
        rows.push(['Expense', ym, e.date || '', c ? c.name : '', e.note || '', e.amount]);
      });
    });
    const esc = v => { v = String(v == null ? '' : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    const csv = '\ufeff' + rows.map(r => r.map(esc).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = `SmartBudget_${todayStr()}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    showToast('CSV downloaded ✓');
  };

  /* ---------- Backup reminder ---------- */
  const markBackupDone = () => { appState.lastBackup = todayStr(); saveState(); renderBackupReminder(); };
  const daysSinceBackup = () => appState.lastBackup ? Math.floor((Date.now() - new Date(appState.lastBackup + 'T00:00:00').getTime()) / 864e5) : null;
  const backupDays = () => appState.backupDays === undefined ? 14 : Number(appState.backupDays);
  const setBackupDays = (n) => { appState.backupDays = n; saveState(); renderAll(); };
  const renderBackupReminder = () => {
    const hasData = Object.values(appState.months).some(mo => (mo.expenses || []).length) || appState.udhaar.length || appState.funds.length || (appState.notes || []).length;
    const d = daysSinceBackup();
    const el = document.getElementById('backupReminder');
    if (hasData && backupDays() > 0 && (d === null || d >= backupDays())) {
      el.style.display = 'block';
      el.innerHTML = d === null ? '⚠️ <strong>No backup yet.</strong> Tap to take a backup now.' : `⚠️ Last backup was <strong>${d} days ago</strong>. Tap to back up.`;
    } else el.style.display = 'none';
    const info = document.getElementById('lastBackupInfo');
    if (info) info.textContent = d === null ? 'Last backup: never' : `Last backup: ${appState.lastBackup} (${d} day${d === 1 ? '' : 's'} ago)`;
  };

  /* ---------- PIN lock (convenience lock, not encryption) ---------- */
  const hashPin = (p) => { let h1 = 0xdeadbeef, h2 = 0x41c6ce57; const s = 'sb|' + p;
    for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return String(4294967296 * (2097151 & h2) + (h1 >>> 0)); };
  let lockEntry = '';
  const renderPinDots = () => { document.getElementById('pinDots').innerHTML = [0, 1, 2, 3].map(i => `<span class="pin-dot ${i < lockEntry.length ? 'on' : ''}"></span>`).join(''); };
  const buildKeypad = () => {
    const keys = ['1','2','3','4','5','6','7','8','9','','0','del'];
    document.getElementById('keypad').innerHTML = keys.map(k => k === '' ? '<span></span>' : `<button class="key" onclick="pinKey('${k}')">${k === 'del' ? '⌫' : k}</button>`).join('');
  };
  const showLock = () => { lockEntry = ''; renderPinDots(); document.getElementById('lockMsg').textContent = ''; document.getElementById('lockScreen').style.display = 'flex'; };
  const pinKey = (k) => {
    if (k === 'del') lockEntry = lockEntry.slice(0, -1); else if (lockEntry.length < 4) lockEntry += k;
    renderPinDots();
    if (lockEntry.length === 4) {
      if (hashPin(lockEntry) === appState.pin) { document.getElementById('lockScreen').style.display = 'none'; lockEntry = ''; setTimeout(showDueAlert, 300); runPendingAction(); }
      else { const box = document.querySelector('.lock-box'); box.classList.add('shake'); document.getElementById('lockMsg').textContent = 'Wrong PIN';
        setTimeout(() => { box.classList.remove('shake'); lockEntry = ''; renderPinDots(); }, 350); }
    }
  };
  const forgotPin = () => {
    openModal(head('PIN bhool gaye?') + (appState.pinRecovery ? `
      <div class="form-group"><label class="form-label">Recovery code</label><input id="rcCode" class="form-input" placeholder="ABC-123" autocapitalize="characters"></div>
      ${pinInput('rcNew', 'New 4-digit PIN')}
      <button class="btn-primary" style="justify-content:center;padding:12px;margin-bottom:10px" onclick="resetPinWithCode()">Reset PIN (keeps your data)</button>` : '<p style="font-size:.8rem;color:var(--text-secondary);margin-bottom:10px">No recovery code was created for this PIN.</p>') + `
      <button class="btn-danger" style="justify-content:center;padding:12px" onclick="eraseWithBackup()">No code? Back up, then erase data</button>`);
  };
  const resetPinWithCode = () => {
    const c = $v('rcCode').trim().toUpperCase(), n = $v('rcNew');
    if (hashPin('rc|' + c) !== appState.pinRecovery) { showToast('Wrong code'); return; }
    if (!/^\d{4}$/.test(n)) { showToast('PIN must be 4 digits'); return; }
    appState.pin = hashPin(n); const code = makeRecoveryCode(); appState.pinRecovery = hashPin('rc|' + code); saveState();
    document.getElementById('lockScreen').style.display = 'none'; renderPinStatus(); showRecoveryCode(code);
  };
  const eraseWithBackup = () => {
    if (!window._ok) { askConfirm('A backup file will download first, then all data will be erased. Continue?', 'window._ok=true;eraseWithBackup();window._ok=false'); return; }
    const blob = new Blob([JSON.stringify(appState, null, 2)], { type: 'application/json' }), url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = `SmartBudget_PreReset_${todayStr()}.json`; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => { URL.revokeObjectURL(url); _clearAllData(); applyTheme(); closeModal(); document.getElementById('lockScreen').style.display = 'none'; showToast('Backup downloaded, data erased'); }, 1200);
  };
  const renderPinStatus = () => { const el = document.getElementById('pinStatus'); if (el) el.textContent = appState.pin ? '🔒 PIN lock is ON (also locks after 30 sec away from app).' : 'PIN lock is OFF. Note: this is a privacy lock, not encryption.'; };
  const pinInput = (id, label) => `<div class="form-group"><label class="form-label">${label}</label><input type="password" inputmode="numeric" maxlength="4" id="${id}" class="form-input" placeholder="••••" /></div>`;
  const openPinModal = () => openModal(`
    <div class="modal-header"><h3 class="modal-title">${appState.pin ? 'Change PIN' : 'Set 4-digit PIN'}</h3><button class="close-btn" onclick="closeModal()">✕</button></div>
    ${appState.pin ? pinInput('pinOld', 'Current PIN') : ''}${pinInput('pinNew', 'New PIN')}${pinInput('pinNew2', 'Confirm New PIN')}
    <p style="font-size:.74rem;color:var(--text-muted);margin-bottom:10px;">You get a recovery code when you save a PIN. Write it down so you can reset the PIN if you forget it.</p>
    <button class="btn-primary" style="justify-content:center;padding:12px;" onclick="savePin()">Save PIN</button>`);
  const savePin = () => {
    const v = id => (document.getElementById(id) || {}).value || '';
    if (appState.pin && hashPin(v('pinOld')) !== appState.pin) { showToast('Current PIN is wrong'); return; }
    if (!/^\d{4}$/.test(v('pinNew'))) { showToast('PIN must be 4 digits'); return; }
    if (v('pinNew') !== v('pinNew2')) { showToast('PINs do not match'); return; }
    appState.pin = hashPin(v('pinNew'));
    const code = makeRecoveryCode(); appState.pinRecovery = hashPin('rc|' + code);
    saveState(); renderPinStatus(); showRecoveryCode(code);
  };
  const makeRecoveryCode = () => { const ch = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let c = ''; for (let i = 0; i < 6; i++) c += ch[Math.floor(Math.random() * ch.length)]; return c.slice(0, 3) + '-' + c.slice(3); };
  const showRecoveryCode = (code) => openModal(head('🔑 Recovery code') + `
    <p style="font-size:.82rem;color:var(--text-secondary);margin-bottom:10px">PIN saved. <strong>Write this code down</strong>. It resets your PIN and keeps your data if you forget it. It will not be shown again.</p>
    <div style="font-size:2rem;font-weight:800;letter-spacing:4px;text-align:center;padding:14px;border-radius:14px;background:var(--accent-soft);margin-bottom:12px">${code}</div>
    <button class="btn-secondary" style="justify-content:center;padding:12px;margin-bottom:8px" onclick="navigator.clipboard && navigator.clipboard.writeText('${code}'); showToast('Code copied')">📋 Copy</button>
    <button class="btn-primary" style="justify-content:center;padding:12px" onclick="closeModal()">I have written it down</button>`);
  const openRemovePinModal = () => {
    if (!appState.pin) { showToast('No PIN is set'); return; }
    openModal(`<div class="modal-header"><h3 class="modal-title">Remove PIN</h3><button class="close-btn" onclick="closeModal()">✕</button></div>
      ${pinInput('pinOld', 'Enter current PIN')}
      <button class="btn-danger" style="justify-content:center;padding:12px;" onclick="removePin()">Remove PIN</button>`);
  };
  const removePin = () => {
    if (hashPin(document.getElementById('pinOld').value) !== appState.pin) { showToast('Wrong PIN'); return; }
    appState.pin = null; saveState(); closeModal(); renderPinStatus(); showToast('PIN removed');
  };
  let hiddenAt = 0;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hiddenAt = Date.now();
    else if (appState && appState.pin && hiddenAt && Date.now() - hiddenAt > 30000) showLock();
  });


  /* ==========================================================================
     ADDED v3: daily limit, search, extra income, split, shopping, report, undo, share, themes
     ========================================================================== */
  const money = (n) => formatINR(n);
  const $v = (id) => (document.getElementById(id) || {}).value || '';
  const head = (t) => `<div class="modal-header"><h3 class="modal-title">${t}</h3><button class="close-btn" onclick="closeModal()">✕</button></div>`;
  const catOptions = () => getCurrentMonthData().categories.map(c => `<option value="${c.id}">${c.icon} ${escapeHtml(c.name)}</option>`).join('');

  /* ---- Undo ---- */
  let undoSnap = null, undoTimer = null;
  const snap = () => { undoSnap = JSON.stringify(appState); };
  const showUndo = (msg) => { const b = document.getElementById('undoBar'); document.getElementById('undoMsg').textContent = msg; b.style.display = 'flex'; clearTimeout(undoTimer); undoTimer = setTimeout(() => { b.style.display = 'none'; }, 7000); };
  const doUndo = () => { if (!undoSnap) return; appState = JSON.parse(undoSnap); undoSnap = null; saveState(); applyTheme(); renderAll(); document.getElementById('undoBar').style.display = 'none'; showToast('Restored ✓'); };
  const deleteExpenseEntry = (expId, catId) => { snap(); _deleteExpenseEntry(expId, catId); showUndo('Expense deleted'); };

  /* ---- Daily limit ---- */
  const renderDaily = () => {
    const el = document.getElementById('dailyCard');
    if (appState.selectedMonth !== getInitialMonthKey()) { el.style.display = 'none'; return; }
    const mt = getMonthMetrics(appState.selectedMonth); if (!mt || mt.income <= 0) { el.style.display = 'none'; return; }
    const now = new Date(), left = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate() + 1;
    const today = todayStr();
    const todaySpent = getCurrentMonthData().expenses.filter(e => e.date === today).reduce((s, e) => s + Number(e.amount), 0);
    const target = Math.max(0, mt.income - mt.targetAmt);
    const avail = target - mt.totalExpenses;
    const perDay = Math.floor((avail + 0) / left);
    el.style.display = 'block';
    el.innerHTML = avail < 0
      ? `🚨 You are <strong>${money(-avail)}</strong> over your savings target. Try to spend less today.`
      : `📅 <strong>Today's limit: ${money(perDay)}</strong> (${left} days left)<br><span style="color:var(--text-secondary)">Spent today: ${money(todaySpent)} ${todaySpent > perDay ? '⚠️ over limit' : '✓'}</span>`;
  };

  /* ---- Search ---- */
  const openSearchModal = () => {
    openModal(head('🔍 Search') + `<input id="srQ" class="form-input" placeholder="Note, category ya amount..." oninput="runSearch()" style="margin-bottom:8px">
      <input id="srFrom" type="date" class="form-input" onchange="runSearch()" style="margin-bottom:8px"><div id="srOut" style="max-height:46vh;overflow-y:auto"></div>`);
    runSearch();
  };
  const runSearch = () => {
    const q = $v('srQ').toLowerCase().trim(), from = $v('srFrom'); let rows = [];
    Object.keys(appState.months).forEach(ym => { const mo = appState.months[ym]; (mo.expenses || []).forEach(e => { const c = mo.categories.find(x => x.id === e.catId); rows.push({ e, c: c ? c.name : '', i: c ? c.icon : '' }); }); });
    rows = rows.filter(r => (!from || (r.e.date || '') >= from) && (!q || (r.e.note || '').toLowerCase().includes(q) || r.c.toLowerCase().includes(q) || String(r.e.amount).includes(q)));
    rows.sort((a, b) => (b.e.date || '').localeCompare(a.e.date || ''));
    const tot = rows.reduce((s, r) => s + Number(r.e.amount), 0);
    document.getElementById('srOut').innerHTML = `<div style="font-size:.78rem;color:var(--text-secondary);margin-bottom:6px">${rows.length} results · Total ${money(tot)}</div>` +
      rows.slice(0, 100).map(r => `<div class="row-item"><div><strong>${escapeHtml(r.e.note)}</strong><div style="font-size:.7rem;color:var(--text-muted)">${r.i} ${escapeHtml(r.c)} · ${r.e.date || ''}</div></div><strong>${money(r.e.amount)}</strong></div>`).join('');
  };

  /* ---- Extra income ---- */
  const _old_openExtraIncomeModal = () => {
    const mo = getCurrentMonthData(); const list = mo.extraIncome || [];
    openModal(head('💵 Extra Income (' + formatMonthDisplay(appState.selectedMonth) + ')') + `
      <div class="form-group"><label class="form-label">Amount (₹)</label><input id="eiAmt" type="number" inputmode="decimal" class="form-input"></div>
      <div class="form-group"><label class="form-label">Source (freelance, bonus, refund...)</label><input id="eiNote" class="form-input"></div>
      <button class="btn-primary" style="justify-content:center;padding:12px;margin-bottom:12px" onclick="saveExtraIncome()">Add Income</button>
      ${list.map(x => `<div class="row-item"><span>${escapeHtml(x.note)} <small style="color:var(--text-muted)">${x.date}</small></span><span><strong>${money(x.amount)}</strong> <button class="mini-icon-btn" onclick="delExtraIncome('${x.id}')">🗑️</button></span></div>`).join('')}`);
  };
  const _old_saveExtraIncome = () => {
    const a = Number($v('eiAmt')); if (!a || a <= 0) { showToast('Enter valid amount'); return; }
    const mo = getCurrentMonthData(); if (!mo.extraIncome) mo.extraIncome = [];
    mo.extraIncome.unshift({ id: 'ei_' + Date.now(), amount: a, note: $v('eiNote').trim() || 'Extra income', date: todayStr(), time: nowHM() });
    saveState(); renderAll(); openExtraIncomeModal(); showToast('Income added');
  };
  const _old_delExtraIncome = (id) => {};

  /* ---- Split (creates loan entries) ---- */
  const openSplitModal = () => openModal(head('👥 Split Expense') + `
    <div class="form-group"><label class="form-label">What for?</label><input id="spTitle" class="form-input" placeholder="e.g. Dinner, Trip petrol"></div>
    <div class="form-group"><label class="form-label">Total bill (₹)</label><input id="spTotal" type="number" inputmode="decimal" class="form-input"></div>
    <div class="form-group"><label class="form-label">Other people (comma se alag)</label><input id="spPeople" class="form-input" placeholder="Rahul, Amit"></div>
    <div class="form-group"><label class="form-label">Who paid?</label><input id="spPayer" class="form-input" placeholder="Leave empty if you paid, or type a name"></div>
    <div class="form-group"><label class="form-label">Add my share as an expense (category)</label><select id="spCat"><option value="">Do not add</option>${catOptions()}</select></div>
    <p id="spPrev" style="font-size:.78rem;color:var(--text-secondary);margin-bottom:8px">Barabar hissa: sab ka total ÷ log. Loans tab mein entries ban jaayengi.</p>
    <button class="btn-primary" style="justify-content:center;padding:12px" onclick="saveSplit()">Split</button>`);
  const saveSplit = () => {
    const total = Number($v('spTotal')), title = $v('spTitle').trim() || 'Split';
    const ppl = $v('spPeople').split(',').map(s => s.trim()).filter(Boolean), payer = $v('spPayer').trim();
    if (!total || !ppl.length) { showToast('Amount aur kam se kam 1 person'); return; }
    const share = Math.round(total / (ppl.length + 1)), date = todayStr(), mk = (person, type, amt) => ({ id: 'ud_' + Date.now() + Math.random().toString(36).slice(2, 6), type, person, totalAmount: amt, paidAmount: 0, date, notes: 'Split: ' + title, history: [{ id: 'uh_' + Date.now() + Math.random().toString(36).slice(2, 5), action: type === 'lent' ? 'Initial Lent' : 'Initial Borrowed', amount: amt, date, note: 'Split' }] });
    snap();
    if (!payer) ppl.forEach(p => appState.udhaar.push(mk(p, 'lent', share)));
    else appState.udhaar.push(mk(payer, 'borrowed', share));
    const cid = $v('spCat');
    if (cid) placeExpense({ id: 'exp_' + Date.now(), catId: cid, amount: share, note: title + ' (my share)', date }, null);
    saveState(); closeModal(); renderAll(); showUndo(`Split done: har ek ka hissa ${money(share)}`);
  };

  /* ---- Shopping list ---- */
  const openShoppingModal = () => {
    const l = appState.shopping || [];
    openModal(head('🛒 Shopping List') + `<div style="display:flex;gap:6px;margin-bottom:10px"><input id="shName" class="form-input" placeholder="Item"><input id="shPrice" type="number" inputmode="decimal" class="form-input" placeholder="₹" style="max-width:80px"><button class="btn-primary" onclick="addShop()">+</button></div>
      <div style="max-height:34vh;overflow-y:auto">${l.map(x => `<div class="row-item"><label style="display:flex;gap:8px;align-items:center;flex:1"><input type="checkbox" ${x.done ? 'checked' : ''} onchange="toggleShop('${x.id}')"><span style="${x.done ? 'text-decoration:line-through;opacity:.6' : ''}">${escapeHtml(x.name)}</span></label><span>${x.price ? money(x.price) : ''} <button class="mini-icon-btn" onclick="delShop('${x.id}')">🗑️</button></span></div>`).join('') || '<div style="color:var(--text-muted);font-size:.82rem">The list is empty.</div>'}</div>
      <div class="form-group" style="margin-top:10px"><label class="form-label">Ticked items ko expense banao</label><select id="shCat">${catOptions()}</select></div>
      <button class="btn-secondary" style="justify-content:center;padding:12px;width:100%" onclick="shopToExpense()">✓ Ticked → Expense (${money(l.filter(x => x.done).reduce((s, x) => s + Number(x.price || 0), 0))})</button>`);
  };
  const addShop = () => { const n = $v('shName').trim(); if (!n) return; (appState.shopping = appState.shopping || []).push({ id: 'sh_' + Date.now(), name: n, price: Number($v('shPrice')) || 0, done: false }); saveState(); openShoppingModal(); };
  const toggleShop = (id) => { const x = appState.shopping.find(i => i.id === id); x.done = !x.done; saveState(); openShoppingModal(); };
  const delShop = (id) => { snap(); appState.shopping = appState.shopping.filter(i => i.id !== id); saveState(); openShoppingModal(); showUndo('Item removed'); };
  const shopToExpense = () => {
    const done = (appState.shopping || []).filter(x => x.done); const sum = done.reduce((s, x) => s + Number(x.price || 0), 0);
    if (!done.length || !sum) { showToast('Tick items with a price'); return; }
    snap(); placeExpense({ id: 'exp_' + Date.now(), catId: $v('shCat'), amount: sum, note: 'Shopping: ' + done.map(x => x.name).join(', ').slice(0, 60), date: todayStr() }, null);
    appState.shopping = appState.shopping.filter(x => !x.done); saveState(); closeModal(); renderAll(); showUndo('Expense added ' + money(sum));
  };

  /* ---- Report share ---- */
  const buildReport = () => {
    const ym = appState.selectedMonth, mo = getCurrentMonthData(), mt = getMonthMetrics(ym);
    const lines = mo.categories.map(c => [c, mo.expenses.filter(e => e.catId === c.id).reduce((s, e) => s + Number(e.amount), 0)]).filter(x => x[1] > 0).map(([c, v]) => `${c.icon} ${c.name}: ${money(v)} / ${money(c.limit)}`);
    return `📊 SmartBudget - ${formatMonthDisplay(ym)}\n\nIncome: ${money(mt.income)}\nKharch: ${money(mt.totalExpenses)}\nBachat: ${money(mt.netActualSaving)} (${mt.actualSavingPct}%)\n\n${lines.join('\n')}`;
  };
  const rpSet = (p) => { rpPeriod = p; document.querySelectorAll('.rpChip').forEach(b => { const on = b.dataset.p === p; b.style.background = on ? 'var(--accent-soft)' : ''; b.style.color = on ? 'var(--accent)' : ''; b.style.borderColor = on ? 'var(--accent)' : ''; }); };
  const openReportModal = () => {
    const cb = (id, t, on = true) => `<label style="display:flex;align-items:center;gap:8px;font-size:.85rem;padding:5px 0"><input type="checkbox" id="${id}" ${on ? 'checked' : ''}> ${t}</label>`;
    openModal(head('Report') + `<div style="font-weight:800;font-size:.82rem;margin-bottom:6px">Period</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">${PERIODS.map(([v, t]) => `<button class="btn-secondary rpChip" data-p="${v}" style="padding:6px 12px;font-size:.76rem" onclick="rpSet('${v}')">${t}</button>`).join('')}</div>
      <div style="font-weight:800;font-size:.82rem;margin:14px 0 4px">Include</div>
      ${cb('rpSum', 'Summary')}${cb('rpCats', 'Category-wise budget')}
      <div style="font-size:.78rem;color:var(--text-secondary);margin-top:4px">Transactions</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;column-gap:8px">${cb('rpTx_out', 'Expenses')}${cb('rpTx_inc', 'Income')}${cb('rpTx_fund', 'Funds')}${cb('rpTx_ud', 'Loans')}</div>
      ${cb('rpFunds', 'Funds overview', false)}${cb('rpUd', 'Loans overview', false)}${cb('rpPlans', 'Upcoming plans', false)}${cb('rpNotes', 'Notes', false)}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px"><button class="btn-primary" style="justify-content:center;padding:12px" onclick="sharePDF()">Generate PDF</button><button class="btn-secondary" style="justify-content:center;padding:12px" onclick="downloadCSV()">Download CSV</button></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px"><button class="btn-secondary" style="justify-content:center;padding:12px" onclick="shareReport()">Share text</button><button class="btn-secondary" style="justify-content:center;padding:12px" onclick="copyReport()">Copy text</button></div>`);
    rpSet(rpPeriod);
  };
  const copyReport = () => { const ta = document.createElement('textarea'); ta.value = buildReport(); document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); showToast('Copied 📋'); };
  const shareReport = async () => { try { if (navigator.share) await navigator.share({ text: buildReport() }); else { window.open('https://wa.me/?text=' + encodeURIComponent(buildReport())); } } catch (e) {} };


  /* ---- PDF report: full details, multi-page (canvas -> JPEG -> PDF, offline) ---- */
  const buildPDF = (o) => {
    const ym = appState.selectedMonth, mo = getCurrentMonthData(), mt = getMonthMetrics(ym);
    const acc = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#6366f1';
    const pages = []; let g, y;
    const F = (w, sz) => { g.font = `${w} ${sz}px sans-serif`; };
    const newPage = () => { const cv = document.createElement('canvas'); cv.width = 1190; cv.height = 1684; g = cv.getContext('2d'); g.scale(2, 2); g.fillStyle = '#fff'; g.fillRect(0, 0, 595, 842); pages.push(cv); y = 44; };
    const need = (h) => { if (y + h > 802) newPage(); };
    const fit = (t, w) => { F('normal', 11); t = String(t); if (g.measureText(t).width <= w) return t; while (t.length > 1 && g.measureText(t + '…').width > w) t = t.slice(0, -1); return t + '…'; };
    const sec = (t) => { need(56); y += 12; g.fillStyle = acc; g.fillRect(32, y - 12, 4, 16); g.fillStyle = '#0f172a'; F('bold', 14); g.fillText(t, 42, y); y += 20; };
    const row = (l, r, c = '#0f172a', b = 'normal', x = 32, lw = 380) => { need(18); F(b, 11); g.fillStyle = c; g.fillText(fit(l, lw), x, y); g.textAlign = 'right'; g.fillText(r, 563, y); g.textAlign = 'left'; y += 17; };
    const bar = (p) => { need(12); g.fillStyle = '#e2e8f0'; g.fillRect(32, y - 6, 531, 6); g.fillStyle = p >= 1 ? '#dc2626' : p >= .8 ? '#f59e0b' : '#10b981'; g.fillRect(32, y - 6, 531 * Math.min(1, p), 6); y += 12; };
    const wrap = (t, x = 32, w = 531, c = '#475569') => { String(t || '').split('\n').forEach(par => { let ln = ''; const put = () => { need(14); F('normal', 10.5); g.fillStyle = c; g.fillText(ln, x, y); y += 14; };
      par.split(' ').forEach(wd => { F('normal', 10.5); const test = ln ? ln + ' ' + wd : wd; if (g.measureText(test).width > w && ln) { put(); ln = wd; } else ln = test; }); put(); }); };
    const gap = (n = 6) => { y += n; };

    newPage(); g.fillStyle = acc; g.fillRect(0, 0, 595, 84);
    g.fillStyle = '#fff'; F('bold', 24); g.fillText('SmartBudget Report', 32, 42); F('normal', 14); g.fillText(`${periodLabel(o.period || 'month')}  ·  Generated ${todayStr()}`, 32, 66); y = 112;
    [['Total Income', mt.income, '#0f172a'], ['Total Spent', mt.totalExpenses, '#dc2626'], ['Net Saved', mt.netActualSaving, mt.netActualSaving >= 0 ? '#059669' : '#dc2626'], ['Unspent Cash', mt.unspentCash, '#0f172a']].forEach(([l, v, c], i) => {
      const x = 32 + i * 135; g.fillStyle = '#f1f5f9'; g.fillRect(x, y, 126, 56); g.fillStyle = '#64748b'; F('normal', 10.5); g.fillText(l, x + 9, y + 18); g.fillStyle = c; F('bold', 16); g.fillText(money(v), x + 9, y + 42); });
    y += 80;
    const extra = (mo.extraIncome || []).reduce((s, x) => s + Number(x.amount), 0), catExp = mo.expenses.reduce((s, e) => s + Number(e.amount), 0), planExp = mt.totalExpenses - catExp;
    if (o.sum) {
    sec('Summary · ' + formatMonthDisplay(ym));
    row('Base income / salary', money(mo.income)); if (extra) row('Extra income', money(extra));
    row('Expenses (entries)', money(catExp)); row('Marked upcoming plans', money(planExp)); row('Total spent', money(mt.totalExpenses), '#dc2626', 'bold');
    row('Saved in funds this month', money(mt.netFundsThisMonth)); row('Salary savings', money(mt.salarySavings));
    row(`Saving target (${mt.targetPct}%)`, money(mt.targetAmt)); row('Actual saving', `${money(mt.netActualSaving)} (${mt.actualSavingPct}%)`, mt.netActualSaving >= 0 ? '#059669' : '#dc2626', 'bold');
    }

    if (o.cats) {
    sec('Category budget · ' + formatMonthDisplay(ym));
    mo.categories.forEach(c => { const v = mo.expenses.filter(e => e.catId === c.id).reduce((s, e) => s + Number(e.amount), 0), p = c.limit > 0 ? v / c.limit : 0;
      row(`${c.icon} ${c.name}`, `${money(v)} / ${money(c.limit)}  (${Math.round(p * 100)}%)`, p >= 1 ? '#dc2626' : '#0f172a'); bar(p); });
    }

    if (o.sum && extra) { sec('Extra income'); mo.extraIncome.forEach(x => row(`${x.date}   ${x.note}`, money(x.amount), '#059669')); }

    if (o.tx && o.tx.length) {
      const rows = collectTxns(o.period).filter(r => o.tx.includes(r.k)), lab = { out: 'Expense', inc: 'Income', fund: 'Fund', ud: 'Loans' };
      sec(`Transactions · ${periodLabel(o.period)} (${rows.length})`);
      need(24); g.fillStyle = '#f1f5f9'; g.fillRect(32, y - 12, 531, 18); g.fillStyle = '#475569'; F('bold', 10); g.fillText('DATE', 38, y); g.fillText('TYPE', 108, y); g.fillText('DETAILS', 170, y); g.textAlign = 'right'; g.fillText('AMOUNT', 557, y); g.textAlign = 'left'; y += 14;
      let tin = 0, tout = 0;
      rows.forEach((r, i) => { need(20); if (i % 2) { g.fillStyle = '#f8fafc'; g.fillRect(32, y - 12, 531, 18); } F('normal', 10); g.fillStyle = '#64748b'; g.fillText(r.date || '', 38, y); g.fillStyle = '#0f172a'; g.fillText(lab[r.k], 108, y); g.fillText(fit(r.title + (r.sub ? ' · ' + r.sub : ''), 270), 170, y);
        g.fillStyle = r.k === 'out' ? '#dc2626' : r.k === 'inc' ? '#059669' : '#0f172a'; g.textAlign = 'right'; g.fillText((r.k === 'out' ? '-' : r.k === 'inc' ? '+' : '') + money(r.amt), 557, y); g.textAlign = 'left'; y += 18; if (r.k === 'out') tout += r.amt; if (r.k === 'inc') tin += r.amt; });
      if (!rows.length) row('No transactions in this period', ''); else { gap(4); row('Total income', money(tin), '#059669', 'bold'); row('Total expense', money(tout), '#dc2626', 'bold'); }
    }

    if (o.plans) { sec('Upcoming plans'); (mo.upcomingPlans || []).forEach(p => { row(`${p.title}  ·  ${p.date || ''}`, `${money(p.amount)}  ${p.marked ? '✓ counted' : '• pending'}`, p.marked ? '#0f172a' : '#64748b', 'bold'); if (p.note) wrap(p.note, 40, 520); });
      if (!(mo.upcomingPlans || []).length) row('No plans this month', ''); }

    if (o.funds) { sec('Funds & savings'); appState.funds.forEach(f => { row(`${f.icon} ${f.name}`, `${money(f.balance)} / ${money(f.target)}`, '#0f172a', 'bold'); bar(f.target > 0 ? f.balance / f.target : 0);
        (f.history || []).forEach(h => row(`${h.date}  ${h.type === 'add' ? '＋ Added' : '－ Withdrawn'}  ${h.note || ''}`, money(h.amount), h.type === 'add' ? '#059669' : '#dc2626', 'normal', 40, 360)); gap(); });
      if (!appState.funds.length) row('No funds', ''); }

    if (o.ud) { sec('Loans (lent / borrowed)');
      const pend = t => appState.udhaar.filter(u => u.type === t).reduce((s, u) => s + u.totalAmount - u.paidAmount, 0);
      row('Pending to receive (lent)', money(pend('lent')), '#059669', 'bold'); row('Pending to pay (borrowed)', money(pend('borrowed')), '#dc2626', 'bold'); gap();
      appState.udhaar.forEach(u => { row(`${u.person}  (${u.type === 'lent' ? 'Diya' : 'Liya'})  ·  ${u.date}`, `Pending ${money(u.totalAmount - u.paidAmount)} / ${money(u.totalAmount)}`, '#0f172a', 'bold'); if (u.notes) wrap(u.notes, 40, 520);
        (u.history || []).forEach(h => row(`${h.date}  ${h.action}${h.note ? ' – ' + h.note : ''}`, money(h.amount), '#475569', 'normal', 40, 360)); gap(); });
      if (!appState.udhaar.length) row('No loan records', ''); }

    if (o.notes) { sec('Notes'); (appState.notes || []).forEach(n => { row(n.title, n.date || '', '#0f172a', 'bold'); wrap(n.body, 40, 520); gap(); }); if (!(appState.notes || []).length) row('No notes', ''); }

    pages.forEach((cv, i) => { const c = cv.getContext('2d'); c.fillStyle = '#94a3b8'; c.font = '10px sans-serif'; c.fillText('SmartBudget · ' + formatMonthDisplay(ym), 32, 828); c.textAlign = 'right'; c.fillText(`Page ${i + 1} / ${pages.length}`, 563, 828); c.textAlign = 'left'; });
    return pages;
  };
  const makePDF = (jpgs, w, h) => {
    const enc = new TextEncoder(), parts = [], offs = []; let len = 0, n = jpgs.length;
    const push = (d) => { const b = typeof d === 'string' ? enc.encode(d) : d; parts.push(b); len += b.length; };
    const obj = (i, fn) => { offs[i] = len; push(`${i} 0 obj\n`); fn(); push('\nendobj\n'); };
    push('%PDF-1.4\n');
    obj(1, () => push('<< /Type /Catalog /Pages 2 0 R >>'));
    obj(2, () => push(`<< /Type /Pages /Kids [${jpgs.map((_, i) => `${3 + i * 3} 0 R`).join(' ')}] /Count ${n} >>`));
    const cs = 'q 595 0 0 842 0 0 cm /Im0 Do Q';
    jpgs.forEach((jpg, i) => { const p = 3 + i * 3;
      obj(p, () => push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 ${p + 2} 0 R >> >> /Contents ${p + 1} 0 R >>`));
      obj(p + 1, () => push(`<< /Length ${cs.length} >>\nstream\n${cs}\nendstream`));
      obj(p + 2, () => { push(`<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`); push(jpg); push('\nendstream'); }); });
    const xref = len, total = 3 + n * 3; push(`xref\n0 ${total}\n0000000000 65535 f \n`);
    for (let i = 1; i < total; i++) push(String(offs[i]).padStart(10, '0') + ' 00000 n \n');
    push(`trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
    return new Blob(parts, { type: 'application/pdf' });
  };
  const sharePDF = async () => {
    const ck = id => (document.getElementById(id) || {}).checked;
    const cvs = buildPDF({ period: rpPeriod, sum: ck('rpSum'), cats: ck('rpCats'), tx: ['out', 'inc', 'fund', 'ud'].filter(k => ck('rpTx_' + k)), plans: ck('rpPlans'), funds: ck('rpFunds'), ud: ck('rpUd'), notes: ck('rpNotes') });
    const jpgs = cvs.map(cv => { const bin = atob(cv.toDataURL('image/jpeg', 0.9).split(',')[1]), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; });
    const blob = makePDF(jpgs, 1190, 1684), name = `SmartBudget_${rpPeriod}_${todayStr()}.pdf`, file = new File([blob], name, { type: 'application/pdf' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: name }); return; } catch (e) { if (e.name === 'AbortError') return; } }
    const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
    showToast('PDF downloaded. Share it from Files.');
  };

  /* ---- Share backup ---- */
  const shareBackup = async () => {
    const name = getSanitizedBackupFileName(), file = new File([JSON.stringify(appState, null, 2)], name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: 'SmartBudget Backup' }); markBackupDone(); showToast('Backup shared ✓'); } catch (e) {} }
    else { showToast('Sharing is not available here, downloading instead'); exportBackupJSON(); }
  };

  /* ---- Themes ---- */
  const PALS = { indigo: '#6366f1', ocean: '#0891b2', sunset: '#ea580c', forest: '#059669', violet: '#7c3aed', slate: '#334155' };
  const openThemeModal = () => openModal(head('🎨 Themes') + `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px">${Object.keys(PALS).map(k => `<div class="swatch ${(appState.palette || 'indigo') === k ? 'sel' : ''}" style="background:${PALS[k]}" onclick="setPalette('${k}')">${k}</div>`).join('')}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><button class="btn-secondary" style="justify-content:center;padding:12px" onclick="appState.theme=appState.theme==='dark'?'light':'dark';saveState();applyTheme();openThemeModal()">${appState.theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</button>
    <button class="btn-secondary" style="justify-content:center;padding:12px" onclick="appState.amoled=!appState.amoled;appState.theme='dark';saveState();applyTheme();openThemeModal()">${appState.amoled ? '✓ ' : ''}AMOLED Black</button></div>`);
  const setPalette = (k) => { appState.palette = k; saveState(); applyTheme(); openThemeModal(); };

  /* ==========================================================================
     v4 ADDITIONS  (har hissa label ke saath, taaki aage badalna aasan ho)
     ========================================================================== */

  /* ---- [PLANS] plan <-> category expense link ---- */
  const planHasExpense = (p) => !!(p.expId && Object.values(appState.months).some(m => (m.expenses || []).some(e => e.id === p.expId)));
  const removePlanExpense = (plan) => {
    Object.values(appState.months).forEach(m => { m.expenses = (m.expenses || []).filter(e => e.planId !== plan.id); });
    plan.expId = null;
  };
  const syncPlanExpense = (plan) => {
    removePlanExpense(plan);
    if (!plan.marked || !plan.catId) return;
    const srcCat = getCurrentMonthData().categories.find(c => c.id === plan.catId);
    const exp = { id: 'exp_' + Date.now(), catId: plan.catId, amount: Number(plan.amount), note: plan.title + ' (plan)', date: plan.date || todayStr(), planId: plan.id };
    placeExpense(exp, srcCat);
    plan.expId = exp.id;
  };
  const _openPlanCatPick = (planId) => openModal(head('Kaunsi category mein?') + `
    <div class="form-group"><select id="pickCat" class="form-input">${catOptions()}</select></div>
    <button class="btn-primary" style="justify-content:center;padding:12px" onclick="savePlanCatPick('${planId}',false)">Add to category</button>
    <button class="btn-secondary" style="justify-content:center;padding:12px" onclick="savePlanCatPick('${planId}',true)">Total only</button>`);
  const openPlanCatPick = (planId) => { window._rrc = true; _openPlanCatPick(planId); };
  const savePlanCatPick = (planId, skip) => {
    window._rrc = false;
    const plan = (getCurrentMonthData().upcomingPlans || []).find(p => p.id === planId);
    if (!plan) return;
    plan.catId = skip ? '' : $v('pickCat'); plan.marked = true; planLog(plan, 'marked', 'Marked as done'); syncPlanExpense(plan);
    saveState(); closeModal(); renderAll(); showToast('Plan marked ✓');
  };

  /* ---- [SALARY SAVINGS] kul jama, kharch, history ---- */
  const _old_getSalaryPool = () => {
    let saved = 0, spent = 0;
    Object.values(appState.months).forEach(m => { saved += Number(m.salarySavings) || 0; (m.salarySpend || []).forEach(s => spent += Number(s.amount)); });
    return { saved, spent, left: saved - spent };
  };
  const _old_findSalarySpend = (id) => { for (const ym of Object.keys(appState.months)) { const s = (appState.months[ym].salarySpend || []).find(x => x.id === id); if (s) return { s, ym }; } return null; };
  const _old_openSalarySpendModal = (id = '') => {
    const f = id ? findSalarySpend(id) : null, s = f ? f.s : null;
    openModal(head(s ? '✏️ Edit spend' : '➖ Spend from Salary Savings') + `
      <p style="font-size:.78rem;color:var(--text-secondary)">Saved now: <strong>${money(getSalaryPool().left)}</strong></p>
      <div class="form-group"><label class="form-label">Amount (₹)</label><input id="ssAmt" type="number" inputmode="decimal" class="form-input" value="${s ? s.amount : ''}"></div>
      <div class="form-group"><label class="form-label">Note</label><input id="ssNote" class="form-input" value="${s ? escapeHtml(s.note) : ''}" placeholder="e.g. Phone repair"></div>
      <button class="btn-primary" style="justify-content:center;padding:12px" onclick="saveSalarySpend('${id}')">Save</button>`);
  };
  const _old_saveSalarySpend = (id) => {
    const amt = Number($v('ssAmt')), note = $v('ssNote').trim() || 'Spend';
    if (!amt || amt <= 0) { showToast('Enter a valid amount'); return; }
    const f = id ? findSalarySpend(id) : null;
    if (f) { f.s.amount = amt; f.s.note = note; }
    else { const m = getCurrentMonthData(); (m.salarySpend = m.salarySpend || []).unshift({ id: 'ss_' + Date.now(), amount: amt, note, date: todayStr() }); }
    saveState(); closeModal(); renderAll(); showToast('Salary savings update ✓');
  };
  const _old_openSalaryHistoryModal = () => {
    const rows = []; Object.values(appState.months).forEach(m => (m.salarySpend || []).forEach(s => rows.push(s)));
    rows.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    openModal(head('🧾 Spend history') + (rows.length ? rows.map(s => `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border-color)"><div><div style="font-weight:700;font-size:.85rem">${escapeHtml(s.note)}</div><div style="font-size:.72rem;color:var(--text-muted)">${s.date || ''}</div></div><div style="display:flex;gap:6px;align-items:center"><strong style="color:var(--danger)">${money(s.amount)}</strong><button class="btn-secondary" style="padding:6px 8px" onclick="openSalarySpendModal('${s.id}')">✏️</button><button class="btn-secondary" style="padding:6px 8px" onclick="delSalarySpend('${s.id}')">🗑️</button></div></div>`).join('') : '<p style="color:var(--text-secondary);font-size:.85rem">No spends yet.</p>'));
  };
  const _old_delSalarySpend = (id) => {
    const f = findSalarySpend(id); if (!f) return;
    appState.months[f.ym].salarySpend = appState.months[f.ym].salarySpend.filter(x => x.id !== id);
    saveState(); renderAll(); openSalaryHistoryModal();
  };

  /* ---- [MENU] upar ☰ ---- */
  /* ---- [PLANS] budget check: pending plans se budget bachega ya nahi ---- */
  const planCheckData = (extraAmt = 0, extraCat = '', skipId = '') => {
    const m = getCurrentMonthData(), mt = getMonthMetrics(appState.selectedMonth);
    const pend = (m.upcomingPlans || []).filter(p => !p.marked && p.id !== skipId).map(p => ({ amount: Number(p.amount), catId: p.catId }));
    if (extraAmt > 0) pend.push({ amount: extraAmt, catId: extraCat });
    const total = pend.reduce((s, p) => s + p.amount, 0), after = mt.netActualSaving - total;
    const over = [];
    m.categories.forEach(c => {
      const spent = m.expenses.filter(e => e.catId === c.id).reduce((s, e) => s + Number(e.amount), 0);
      const add = pend.filter(p => p.catId === c.id).reduce((s, p) => s + p.amount, 0);
      if (add > 0 && Number(c.limit) > 0 && spent + add > c.limit) over.push(`${c.icon} ${escapeHtml(c.name)}: ${money(spent + add - c.limit)} limit se zyada`);
    });
    return { total, after, over, target: mt.targetAmt, count: pend.length };
  };
  const planVerdict = (d) => d.after < 0 ? ['var(--danger)', `🚨 Budget se bahar: ${money(-d.after)} kam padega`] : d.after < d.target ? ['var(--warning)', `⚠️ Bachega ${money(d.after)}, lekin saving target ${money(d.target)} se kam`] : ['var(--success)', `✅ Budget mein hai: ${money(d.after)} bachega`];
  const renderPlanCheck = () => {
    const el = document.getElementById('planCheck'); if (!el) return;
    const d = planCheckData();
    if (!d.count) { el.innerHTML = ''; return; }
    const [col, msg] = planVerdict(d);
    el.innerHTML = `<div class="card" style="border-color:${col}"><div style="font-weight:800;font-size:.9rem">📊 Budget check (${d.count} pending plan, ${money(d.total)})</div>
      <div style="color:${col};font-weight:700;font-size:.85rem;margin-top:4px">${msg}</div>
      <div style="font-size:.74rem;color:var(--text-secondary);margin-top:4px">By month end, if all pending plans happen.</div>
      ${d.over.length ? `<div style="font-size:.78rem;margin-top:6px;color:var(--danger)">${d.over.join('<br>')}</div>` : ''}</div>`;
  };
  const updatePlanWarn = (planId) => {
    const el = document.getElementById('planWarn'); if (!el) return;
    const amt = Number($v('planAmt')), existing = planId ? (getCurrentMonthData().upcomingPlans || []).find(p => p.id === planId) : null;
    if (!amt || amt <= 0 || (existing && existing.marked)) { el.innerHTML = ''; return; }
    const d = planCheckData(amt, $v('planCat'), planId), [col, msg] = planVerdict(d);
    el.innerHTML = `<span style="color:${col};font-weight:700">${msg}</span>${d.over.length ? '<br><span style="color:var(--danger)">' + d.over.join('<br>') + '</span>' : ''}`;
  };

  /* ---- [SETTINGS] about, animation, auto-backup ---- */
  const setTextSize = (k) => { appState.textSize = k; saveState(); renderAll(); };
  const getStorageInfo = () => { let b = 0; try { b = (localStorage.getItem(STORAGE_KEY) || '').length * 2; } catch (e) {} return { kb: Math.round(b / 1024), pct: Math.min(100, Math.round(b / 5242880 * 100)) }; };
  const renderAbout = () => {
    const v = document.getElementById('appVerLabel'); if (!v) return;
    document.documentElement.style.fontSize = { sm: '90%', md: '100%', lg: '112%' }[appState.textSize || 'md'];
    document.getElementById('textSizeBtns').innerHTML = [['sm', 'Small'], ['md', 'Medium'], ['lg', 'Large']].map(([k, t]) => `<button class="btn-secondary" style="flex:1;justify-content:center;padding:9px;${(appState.textSize || 'md') === k ? 'background:var(--accent-soft);color:var(--accent);border-color:var(--accent)' : ''}" onclick="setTextSize('${k}')">${t}</button>`).join('');
    document.getElementById('backupDaysBtns').innerHTML = [[7, '7 days'], [14, '14 days'], [30, '30 days'], [0, 'Off']].map(([n, t]) => `<button class="btn-secondary" style="flex:1;justify-content:center;padding:8px 4px;font-size:.78rem;${backupDays() === n ? 'background:var(--accent-soft);color:var(--accent);border-color:var(--accent)' : ''}" onclick="setBackupDays(${n})">${t}</button>`).join('');
    const si = getStorageInfo(); document.getElementById('storageLine').textContent = `Storage: ${si.kb} KB used of about 5 MB (${si.pct}%)`;
    v.textContent = 'v' + APP_VERSION;
    document.getElementById('whatsNewList').innerHTML = WHATS_NEW.map(x => `<li>${escapeHtml(x)}</li>`).join('');
    document.getElementById('calHideBtn').textContent = appState.calHide === false ? '👁️ Calendar shows name and amount (hide)' : '🙈 Calendar hides name and amount (show)';
    document.getElementById('dueAlertBtn').textContent = appState.noAlert !== false ? '🔕 Popup alert on open is off (turn on)' : '🔔 Popup alert on open is on (turn off)';
    document.getElementById('animBtn').textContent = appState.noAnim ? '✨ Turn animations on' : '🚫 Turn animations off';
  };
  const toggleAnim = () => { appState.noAnim = !appState.noAnim; saveState(); renderAll(); };
  const downloadAutoBackup = () => {
    let raw = null; try { raw = localStorage.getItem(STORAGE_KEY + '_autobackup'); } catch (e) {}
    if (!raw) { showToast('No auto-backup found'); return; }
    const url = URL.createObjectURL(new Blob([raw], { type: 'application/json' })), a = document.createElement('a');
    a.href = url; a.download = 'SmartBudget_AutoBackup.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
    showToast('Downloaded ✓');
  };
  const restoreAutoBackup = () => {
    let raw = null; try { raw = localStorage.getItem(STORAGE_KEY + '_autobackup'); } catch (e) {}
    if (!raw) { showToast('No auto-backup found'); return; }
    if (!window._ok) { askConfirm('Current data will be replaced by the pre-update backup. Continue?', 'window._ok=true;restoreAutoBackup();window._ok=false'); return; }
    try { applyRestoredData(JSON.parse(raw)); } catch (e) { showToast('Backup kharab hai'); }
  };

  /* ==========================================================================
     [UDHAAR] due date tag
     ========================================================================== */
  const setUdDue = (id, days) => { const d = new Date(); d.setDate(d.getDate() + days); document.getElementById(id).value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  const daysFromToday = (ymd) => Math.round((new Date(ymd + 'T00:00:00') - new Date(todayStr() + 'T00:00:00')) / 86400000);
  const udSettled = (u) => Number(u.totalAmount) - Number(u.paidAmount) <= 0;
  const dueTag = (u) => {
    if (!u.due || udSettled(u)) return '';
    const d = daysFromToday(u.due);
    const [c, t] = d < 0 ? ['var(--danger)', `${-d} din late`] : d === 0 ? ['var(--warning)', 'Due today'] : d <= 3 ? ['var(--warning)', `${d} days left`] : ['var(--text-muted)', `${d} days left`];
    return `<div style="margin-top:4px;font-size:.72rem;font-weight:700;color:${c}">● ${u.type === 'lent' ? 'Expected back' : 'Pay back by'}: ${u.due} (${t})</div>`;
  };
  const renderUdDueSummary = () => {
    const el = document.getElementById('udhaarDueSummary'); if (!el) return;
    const pend = appState.udhaar.filter(u => u.due && !udSettled(u));
    const od = pend.filter(u => daysFromToday(u.due) < 0).length, td = pend.filter(u => daysFromToday(u.due) === 0).length;
    el.innerHTML = (od || td) ? `<div class="card" style="padding:10px 14px;margin-bottom:10px;border-color:${od ? 'var(--danger)' : 'var(--warning)'}"><span style="font-weight:800;font-size:.85rem">${od ? od + ' overdue' : ''}${od && td ? ', ' : ''}${td ? td + ' aaj due' : ''}</span></div>` : '';
  };

  /* ==========================================================================
     [TRANSACTIONS] sab kuch ek list mein
     ========================================================================== */
  let txQ = '', txType = 'all', txPeriod = 'month', rpPeriod = 'month';
  let txFilter = { period: 'month', from: '', to: '', types: [], cats: [], pays: [] }, _tf = null;
  const pad2 = (n) => String(n).padStart(2, '0'), ymdOf = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  const PERIODS = [['today', 'Today'], ['yesterday', 'Yesterday'], ['7d', 'Last 7 days'], ['month', 'This month'], ['lastmonth', 'Last month'], ['all', 'All time']];
  const prevMonthKey = () => { const [y, m] = appState.selectedMonth.split('-').map(Number); return ymdOf(new Date(y, m - 2, 1)).slice(0, 7); };
  const periodLabel = (p) => p === 'custom' ? `${txFilter.from || '...'} to ${txFilter.to || 'today'}` : p === 'month' ? formatMonthDisplay(appState.selectedMonth) : p === 'lastmonth' ? formatMonthDisplay(prevMonthKey()) : ((PERIODS.find(x => x[0] === p) || [])[1] || '');
  const inPeriod = (date, p) => {
    if (p === 'all') return true; if (!date) return false; const t = todayStr(), n = new Date();
    if (p === 'today') return date === t;
    if (p === 'yesterday') { n.setDate(n.getDate() - 1); return date === ymdOf(n); }
    if (p === '7d') { n.setDate(n.getDate() - 6); return date >= ymdOf(n) && date <= t; }
    if (p === 'month') return date.slice(0, 7) === appState.selectedMonth;
    if (p === 'lastmonth') return date.slice(0, 7) === prevMonthKey();
    if (p === 'custom') return (!txFilter.from || date >= txFilter.from) && (!txFilter.to || date <= txFilter.to);
    return true;
  };
  const TX_ICON = {
    out: '<path d="M7 17 17 7M8 7h9v9"/>', inc: '<path d="M17 7 7 17M16 17H7V8"/>',
    fund: '<path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>', ud: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'
  };
  const collectTxns = (period = txFilter.period) => {
    const rows = [], cur = appState.selectedMonth;
    Object.keys(appState.months).forEach(ym => {
      const m = appState.months[ym];
      if (Number(m.income) > 0) rows.push({ k: 'inc', date: ym + '-01', title: 'Monthly income', sub: 'Salary', amt: Number(m.income), sign: 1 });
      (m.extraIncome || []).forEach(x => rows.push({ k: 'inc', ei: x, ym, date: x.date || ym + '-01', title: x.note || 'Extra income', sub: 'Income', amt: Number(x.amount), sign: 1, del: x.id, tm: x.time || timeFromId(x.id) }));
      (m.expenses || []).forEach(e => { const c = (m.categories || []).find(c => c.id === e.catId); rows.push({ k: 'out', ex: e, ym, date: e.date || ym + '-01', title: e.note || (c ? c.name : 'Kharch'), sub: c ? c.name : 'Kharch', amt: Number(e.amount), sign: -1, exp: e.id, cat: e.catId, tm: e.time || timeFromId(e.id) }); });
    });
    (appState.funds || []).forEach(f => (f.history || []).forEach(h => { rows.push({ k: 'fund', fid: f.id, hid: h.id, ftype: h.type, note: h.note, date: h.date, title: f.name, sub: h.type === 'add' ? 'Added to fund' : 'Fund se nikala', amt: Number(h.amount), sign: h.type === 'add' ? 0 : 0, tag: h.type === 'add' ? '+' : '−', tm: h.time || timeFromId(h.id) }); }));
    appState.udhaar.forEach(u => (u.history || []).forEach(h => { rows.push({ k: 'ud', uid: u.id, hid: h.id, utype: u.type, act: h.action, note: h.note, date: h.date || '', title: u.person, sub: `${u.type === 'lent' ? 'Loans diya' : 'Loans liya'} · ${h.action || ''}`, amt: Number(h.amount), sign: 0, tm: h.time || timeFromId(h.id) }); }));
    return rows.filter(r => inPeriod(r.date, period)).sort((x, y) => (y.date || '').localeCompare(x.date || ''));
  };

  /* ==========================================================================
     [TXN DETAILS] kisi bhi transaction par tap -> details + history
     ========================================================================== */
  let _txView = [];
  const tsFromId = (id) => { const m = String(id || '').match(/_(\d{13})/); return m ? Number(m[1]) : 0; };
  const findExpense = (id) => { for (const ym of Object.keys(appState.months)) { const e = (appState.months[ym].expenses || []).find(x => x.id === id); if (e) return { e, ym, cat: appState.months[ym].categories.find(c => c.id === e.catId) }; } return null; };
  const shRow = (l, v) => v ? `<div style="display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid var(--border-color);font-size:.86rem"><span style="color:var(--text-secondary)">${l}</span><strong style="text-align:right">${v}</strong></div>` : '';
  const shHist = (items) => `<div style="font-weight:800;font-size:.84rem;margin:16px 0 4px">History</div>` + items.sort((p, q) => q.ts - p.ts).map(x => `<div style="display:flex;justify-content:space-between;gap:10px;padding:7px 0;border-bottom:1px solid var(--border-color);font-size:.8rem"><span>${escapeHtml(x.text)}</span><span style="color:var(--text-muted);white-space:nowrap">${x.ts ? fmtTs(x.ts) : ''}</span></div>`).join('');
  const shHead = (sign, amt, tag, title) => `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px"><div style="font-weight:800;font-size:1.02rem;min-width:0;overflow:hidden;text-overflow:ellipsis">${escapeHtml(title)}</div><span class="fund-tag">${tag}</span></div><div style="font-size:2rem;font-weight:800;margin-bottom:6px">${sign}${formatINR(amt)}</div>`;
  const shBtns = (list) => `<div style="display:flex;gap:10px;margin-top:16px">${list.map(([t, fn, cls]) => `<button class="${cls || 'btn-secondary'}" style="flex:1;justify-content:center;padding:12px" onclick="closeModal();setTimeout(()=>{${fn}},140)">${t}</button>`).join('')}</div>`;
  const goExpense = (id) => { const f = findExpense(id); if (!f) return; if (f.ym !== appState.selectedMonth) { appState.selectedMonth = f.ym; saveState(); renderAll(); } openCategoryPage(f.e.catId); };
  const openExpenseSheet = (id) => {
    const f = findExpense(id); if (!f) return; const e = f.e, created = tsFromId(e.id);
    openModal(shHead('−', e.amount, 'Expense', e.note || 'Expense') + shRow('Category', f.cat ? escapeHtml(f.cat.name) : '') + shRow('Payment', escapeHtml(e.pay || '')) + shRow('Date', e.date || '') + shRow('Time', e.time || '') + shRow('Notes', e.desc ? escapeHtml(e.desc) : '')
      + shHist((e.history || []).concat(created ? [{ text: 'Created', ts: created }] : [])) + (activeTabName() === 'catdetail' ? '' : shBtns([['Open category', `goExpense('${e.id}')`, 'btn-primary']])));
  };
  const openTxnSheet = (i) => {
    const r = _txView[i]; if (!r) return;
    if (r.k === 'out' && r.ex) return openExpenseSheet(r.ex.id);
    if (r.k === 'inc') { const x = r.ei, ts = x ? tsFromId(x.id) : 0;
      return openModal(shHead('+', r.amt, 'Income', r.title) + shRow('Date', r.date || '') + shRow('Note', x && x.note ? escapeHtml(x.note) : '') + (x ? '' : '<p style="font-size:.8rem;color:var(--text-secondary);margin-top:8px">This is your monthly salary.</p>') + (ts ? shHist([{ text: 'Created', ts }]) : '')
        + shBtns([['Open income', 'openIncomeModal()', 'btn-primary']])); }
    if (r.k === 'fund') { const ts = tsFromId(r.hid);
      return openModal(shHead(r.ftype === 'add' ? '+' : '−', r.amt, 'Fund', r.title) + shRow('Type', r.ftype === 'add' ? 'Added to fund' : 'Withdrawn') + shRow('Date', r.date || '') + shRow('Note', r.note ? escapeHtml(r.note) : '') + (ts ? shHist([{ text: 'Created', ts }]) : '') + shBtns([['Open fund', `openFundSheet('${r.fid}')`, 'btn-primary']])); }
    const ts = tsFromId(r.hid);
    openModal(shHead('', r.amt, 'Loan', r.title) + shRow('Type', r.utype === 'lent' ? 'Lent (to receive)' : 'Borrowed (to pay)') + shRow('Entry', escapeHtml(r.act || '')) + shRow('Date', r.date || '') + shRow('Note', r.note ? escapeHtml(r.note) : '') + (ts ? shHist([{ text: 'Created', ts }]) : '') + shBtns([['Open loans', "switchMainTab('udhaar')", 'btn-primary']]));
  };
  const TX_PERIODS = PERIODS.concat([['custom', 'Custom range']]);
  const txCount = () => (txFilter.period !== 'month' ? 1 : 0) + txFilter.types.length + txFilter.cats.length + txFilter.pays.length;
  const txClear = (kind, val) => { if (kind === 'period') { txFilter.period = 'month'; txFilter.from = ''; txFilter.to = ''; } else if (kind === 'all') txFilter = { period: 'month', from: '', to: '', types: [], cats: [], pays: [] }; else txFilter[kind] = txFilter[kind].filter(x => x !== val); renderTxns(); };
  const TX_TYPES = [['out', 'Expense'], ['inc', 'Income'], ['fund', 'Fund'], ['ud', 'Loans']];
  const openTxFilter = () => {
    _tf = JSON.parse(JSON.stringify(txFilter));
    const names = []; Object.values(appState.months).forEach(m => (m.categories || []).forEach(c => { if (!names.includes(c.name)) names.push(c.name); }));
    const grp = (title, kind, list, single) => `<div style="font-weight:800;font-size:.82rem;margin:14px 0 6px">${title}</div><div style="display:flex;flex-wrap:wrap;gap:6px">${list.map(([v, t]) => `<button class="btn-secondary tfb" data-k="${kind}" data-v="${escapeHtml(String(v))}" style="padding:7px 12px;font-size:.78rem" onclick="tfPick('${kind}',this.dataset.v,${single ? 'true' : 'false'})">${escapeHtml(t)}</button>`).join('')}</div>`;
    openModal(head('Filter') + grp('Period', 'period', TX_PERIODS, true) + `<div style="display:flex;gap:8px;margin-top:8px"><div style="flex:1"><label class="form-label">From</label><input id="tfFrom" type="date" class="form-input" value="${_tf.from}" onchange="tfDate()"></div><div style="flex:1"><label class="form-label">To</label><input id="tfTo" type="date" class="form-input" value="${_tf.to}" onchange="tfDate()"></div></div>`
      + grp('Type', 'types', TX_TYPES) + grp('Category (expenses)', 'cats', names.map(n => [n, n])) + grp('Payment (expenses)', 'pays', ['Cash', 'UPI', 'Card', 'Other', 'Not set'].map(p => [p, p]))
      + `<div style="display:flex;gap:10px;margin-top:16px"><button class="btn-secondary" style="flex:1;justify-content:center;padding:12px" onclick="tfReset()">Reset</button><button class="btn-primary" style="flex:1;justify-content:center;padding:12px" onclick="tfApply()">Apply</button></div>`);
    tfStyle();
  };
  const tfStyle = () => document.querySelectorAll('.tfb').forEach(b => { const k = b.dataset.k, v = b.dataset.v, on = k === 'period' ? _tf.period === v : _tf[k].includes(v); b.style.background = on ? 'var(--accent-soft)' : ''; b.style.color = on ? 'var(--accent)' : ''; b.style.borderColor = on ? 'var(--accent)' : ''; });
  const tfPick = (k, v, single) => { if (single) _tf.period = v; else _tf[k] = _tf[k].includes(v) ? _tf[k].filter(x => x !== v) : _tf[k].concat(v); tfStyle(); };
  const tfDate = () => { _tf.from = document.getElementById('tfFrom').value; _tf.to = document.getElementById('tfTo').value; if (_tf.from || _tf.to) _tf.period = 'custom'; tfStyle(); };
  const tfReset = () => { _tf = { period: 'month', from: '', to: '', types: [], cats: [], pays: [] }; txFilter = JSON.parse(JSON.stringify(_tf)); closeModal(); renderTxns(); };
  const tfApply = () => { if (_tf.period === 'custom' && !_tf.from && !_tf.to) { showToast('Pick a from or to date'); return; } if (_tf.period !== 'custom') { _tf.from = ''; _tf.to = ''; } txFilter = JSON.parse(JSON.stringify(_tf)); closeModal(); renderTxns(); };
  const renderTxns = () => {
    const el = document.getElementById('txList'); if (!el) return;
    const q = txQ.trim().toLowerCase(), F = txFilter;
    const rows = collectTxns().filter(r => (!F.types.length || F.types.includes(r.k)) && (!F.cats.length || (r.k === 'out' && F.cats.includes(r.sub))) && (!F.pays.length || (r.k === 'out' && F.pays.includes((r.ex && r.ex.pay) || 'Not set'))) && (!q || `${r.title} ${r.sub} ${r.amt}`.toLowerCase().includes(q)));
    _txView = rows;
    document.getElementById('txIn').textContent = money(rows.filter(r => r.k === 'inc').reduce((t, r) => t + r.amt, 0));
    document.getElementById('txOut').textContent = money(rows.filter(r => r.k === 'out').reduce((t, r) => t + r.amt, 0));
    const n = txCount(), fb = document.getElementById('txFilterBtn'); fb.textContent = n ? `Filter (${n})` : 'Filter'; fb.style.background = n ? 'var(--accent-soft)' : ''; fb.style.color = n ? 'var(--accent)' : '';
    const ch = (t, k, v) => `<button class="btn-secondary" style="padding:5px 10px;font-size:.72rem" onclick="txClear('${k}','${escapeHtml(String(v || ''))}')">${escapeHtml(t)} ✕</button>`;
    document.getElementById('txActive').innerHTML = n ? (F.period !== 'month' ? ch(periodLabel(F.period), 'period') : '') + F.types.map(t => ch((TX_TYPES.find(x => x[0] === t) || [, t])[1], 'types', t)).join('') + F.cats.map(c => ch(c, 'cats', c)).join('') + F.pays.map(p => ch(p, 'pays', p)).join('') + `<button class="btn-secondary" style="padding:5px 10px;font-size:.72rem" onclick="txClear('all')">Clear all</button>` : '';
    if (!rows.length) { el.innerHTML = '<div class="empty-state">No transactions found.</div>'; return; }
    const col = { out: 'var(--danger)', inc: 'var(--success)', fund: 'var(--accent)', ud: 'var(--warning)' }, groups = {}, order = [];
    rows.forEach((r, ri) => { const k = r.date || 'No date'; if (!groups[k]) { groups[k] = []; order.push(k); } groups[k].push([r, ri]); });
    el.innerHTML = order.map(dt => { const g = groups[dt], sp = g.filter(x => x[0].k === 'out').reduce((t, x) => t + x[0].amt, 0), inc = g.filter(x => x[0].k === 'inc').reduce((t, x) => t + x[0].amt, 0), lab = /^\d{4}-/.test(dt) ? new Date(dt + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) : dt;
      return `<div><div style="display:flex;justify-content:space-between;font-size:.76rem;font-weight:700;color:var(--text-secondary);margin:8px 2px 6px"><span>${lab}</span><span>${inc ? `<span style="color:var(--success)">+${money(inc)}</span> ` : ''}${sp ? `<span style="color:var(--danger)">−${money(sp)}</span>` : ''}</span></div>` + g.map(([r, ri]) => {
        const sign = r.k === 'out' ? '−' : r.k === 'inc' ? '+' : (r.tag || '');
        return `<div class="card" style="padding:10px 12px;display:flex;align-items:center;gap:12px;cursor:pointer;margin-bottom:6px" onclick="openTxnSheet(${ri})">
          <div style="width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:${col[r.k]}"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">${TX_ICON[r.k]}</svg></div>
          <div style="flex:1;min-width:0"><div style="font-weight:700;font-size:.88rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(r.title)}</div><div style="font-size:.72rem;color:var(--text-muted)">${escapeHtml(r.sub)}${r.tm ? ' · ' + fmt12(r.tm) : ''}</div></div>
          <div style="font-weight:800;color:${col[r.k]}">${sign}${money(r.amt)}</div></div>`; }).join('') + '</div>'; }).join('');
  };

  /* ---- [REMINDERS] A: app kholte hi alert, B: Calendar (.ics) ---- */
  let dueAlertShown = false;
  const toggleCalHide = () => { appState.calHide = appState.calHide === false ? true : false; saveState(); renderAll(); };
  const toggleDueAlert = () => { appState.noAlert = appState.noAlert === false; saveState(); renderAll(); };
  const allPlans = () => { const r = []; Object.values(appState.months).forEach(m => (m.upcomingPlans || []).forEach(p => r.push(p))); return r; };
  const showDueAlert = () => {
    if (dueAlertShown || appState.noAlert !== false) return; dueAlertShown = true;
    const t = todayStr(), d3 = new Date(); d3.setDate(d3.getDate() + 3);
    const lim = `${d3.getFullYear()}-${String(d3.getMonth() + 1).padStart(2, '0')}-${String(d3.getDate()).padStart(2, '0')}`;
    const pend = allPlans().filter(p => !p.marked && p.date);
    const od = pend.filter(p => p.date < t), td = pend.filter(p => p.date === t), up = pend.filter(p => p.date > t && p.date <= lim);
    const udp = appState.udhaar.filter(u => u.due && !udSettled(u)), udo = udp.filter(u => daysFromToday(u.due) < 0), udt = udp.filter(u => daysFromToday(u.due) >= 0 && daysFromToday(u.due) <= 3);
    if (!od.length && !td.length && !up.length && !udo.length && !udt.length) return;
    const udBlk = (ttl, col, arr) => arr.length ? `<div style="margin-bottom:10px"><div style="font-weight:800;color:${col};font-size:.85rem">${ttl}</div>${arr.map(u => `<div style="display:flex;justify-content:space-between;font-size:.84rem;padding:4px 0"><span>${escapeHtml(u.person)} <span style="color:var(--text-muted)">(${u.type === 'lent' ? 'lene' : 'dene'}, ${u.due})</span></span><strong>${money(Number(u.totalAmount) - Number(u.paidAmount))}</strong></div>`).join('')}</div>` : '';
    const blk = (ttl, col, arr) => arr.length ? `<div style="margin-bottom:10px"><div style="font-weight:800;color:${col};font-size:.85rem">${ttl}</div>${arr.map(p => `<div style="display:flex;justify-content:space-between;font-size:.84rem;padding:4px 0"><span>${escapeHtml(p.title)} <span style="color:var(--text-muted)">(${p.date})</span></span><strong>${money(p.amount)}</strong></div>`).join('')}</div>` : '';
    openModal(head('🔔 Reminders') + blk('⚠️ Overdue', 'var(--danger)', od) + blk('📌 Due today', 'var(--warning)', td) + blk('⏳ 3 din ke andar', 'var(--accent)', up) + udBlk('💸 Loans overdue', 'var(--danger)', udo) + udBlk('💸 Loans due soon', 'var(--warning)', udt) + `<button class="btn-primary" style="justify-content:center;padding:12px" onclick="closeModal();switchMainTab('plans')">Plans dekho</button>`);
  };
  const addPlanToCalendar = (id) => {
    const p = allPlans().find(x => x.id === id); if (!p || !p.date) { showToast('This plan has no date'); return; }
    const hide = appState.calHide !== false, ymd = p.date.replace(/-/g, '');
    const nx = new Date(p.date + 'T00:00:00'); nx.setDate(nx.getDate() + 1);
    const end = `${nx.getFullYear()}${String(nx.getMonth() + 1).padStart(2, '0')}${String(nx.getDate()).padStart(2, '0')}`;
    const esc = (x) => String(x).replace(/\\/g, '\\\\').replace(/[,;]/g, '\\$&').replace(/\n/g, '\\n');
    const title = hide ? 'Payment due' : `${p.title} - ${money(p.amount)}`;
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//SmartBudget//EN', 'BEGIN:VEVENT', `UID:${p.id}@smartbudget`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
      `DTSTART;VALUE=DATE:${ymd}`, `DTEND;VALUE=DATE:${end}`, `SUMMARY:${esc(title)}`,
      'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${esc(title)}`, 'TRIGGER:-PT15H', 'END:VALARM',
      'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${esc(title)}`, 'TRIGGER:PT9H', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })), a = document.createElement('a');
    a.href = url; a.download = 'reminder.ics'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
    showToast('Open the file, then in Calendar "Phone/Device" chuno');
  };

  /* ==========================================================================
     v5.0  helpers, udhaar, alerts, setup, back button
     ========================================================================== */
  const nowHM = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
  const fmt12 = (hm) => { if (!hm) return ''; const [h, m] = hm.split(':').map(Number); return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; };
  const timeFromId = (id) => { const n = Number(String(id || '').split('_')[1]); if (!n || n < 1e12) return ''; const d = new Date(n); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
  const askConfirm = (msg, code) => openModal(head('Please confirm') + `<p style="font-size:.88rem;margin:6px 0 14px">${escapeHtml(msg)}</p><div style="display:flex;gap:10px"><button class="btn-secondary" style="flex:1;justify-content:center" onclick="closeModal()">Cancel</button><button class="btn-primary" style="flex:1;justify-content:center" onclick="closeModal();setTimeout(()=>{${code}},300)">Yes</button></div>`);
  document.addEventListener('click', (e) => { const b = e.target.closest('#modalSheetContent .btn-primary'); if (!b) return; if (b._lock) { e.stopImmediatePropagation(); e.preventDefault(); return; } b._lock = true; setTimeout(() => { b._lock = false; }, 800); }, true);

  /* ---- [UDHAAR] grouped list, search, history, remind ---- */
  let udQ = '', udShowSettled = false;
  const udRem = (u) => Math.max(0, Number(u.totalAmount) - Number(u.paidAmount));
  const udCard = (item) => {
    const total = Number(item.totalAmount) || 0, paid = Number(item.paidAmount) || 0, rem = udRem(item), done = rem === 0, pct = total > 0 ? Math.min(100, Math.round(paid / total * 100)) : 100;
    return `<div class="udhaar-card"><div class="udhaar-top"><div><div style="font-weight:800;font-size:.98rem">${escapeHtml(item.person)}</div><div style="font-size:.73rem;color:var(--text-muted);margin-top:2px">Date: ${item.date || 'N/A'}${item.time ? ' · ' + fmt12(item.time) : ''}</div>${dueTag(item)}</div><span class="badge ${done ? 'badge-settled' : 'badge-pending'}">${done ? 'Settled' : 'Pending'}</span></div>
      <div class="udhaar-amounts"><div><div class="u-col-label">Total</div><div class="u-col-val">${formatINR(total)}</div></div><div><div class="u-col-label">${item.type === 'lent' ? 'Received' : 'Paid'}</div><div class="u-col-val" style="color:var(--success)">${formatINR(paid)}</div></div><div><div class="u-col-label">Remaining</div><div class="u-col-val" style="color:${done ? 'var(--text-muted)' : 'var(--danger)'}">${formatINR(rem)}</div></div></div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%;background:var(--success)"></div></div>
      ${item.notes ? `<div style="font-size:.76rem;color:var(--text-secondary)">${escapeHtml(item.notes)}</div>` : ''}
      <div class="udhaar-actions">${!done ? `<button class="btn-primary" style="flex:1;justify-content:center" onclick="openUdhaarPaymentModal('${item.id}')">+ ${item.type === 'lent' ? 'Receive Payment' : 'Pay Back'}</button><button class="eye-btn" onclick="remindUdhaar('${item.id}')">Remind</button>` : '<div style="flex:1;font-size:.78rem;color:var(--success);font-weight:700">All clear</div>'}<button class="eye-btn" onclick="openUdhaarEyeModal('${item.id}')">Details</button></div></div>`;
  };
  let udFilter = 'active';
  const renderUdhaarTabV5 = () => {
    renderUdDueSummary();
    let lp = 0, bp = 0; appState.udhaar.forEach(u => { if (u.type === 'lent') lp += udRem(u); else bp += udRem(u); });
    document.getElementById('summaryLentPending').textContent = formatINR(lp); document.getElementById('summaryBorrowedPending').textContent = formatINR(bp);
    const q = udQ.trim().toLowerCase(), c = document.getElementById('udhaarListContainer');
    const list = appState.udhaar.filter(u => u.type === activeUdhaarSubTab && (!q || `${u.person} ${u.notes || ''}`.toLowerCase().includes(q)));
    const pend = list.filter(u => udRem(u) > 0), setl = list.filter(u => udRem(u) === 0);
    document.getElementById('udFilterChips').innerHTML = [['active', 'Active', pend.length], ['completed', 'Completed', setl.length], ['all', 'All', list.length]].map(([v, t, n]) => `<button class="btn-secondary" style="padding:6px 14px;font-size:.78rem;${udFilter === v ? 'background:var(--accent-soft);color:var(--accent);border-color:var(--accent)' : ''}" onclick="udFilter='${v}';renderUdhaarTab()">${t} (${n})</button>`).join('');
    const showP = udFilter !== 'completed', showS = udFilter !== 'active';
    if (!list.length) { c.innerHTML = '<div class="empty-state">No records here. Tap <strong>+ Add Entry</strong> to log one.</div>'; return; }
    const key = (u) => u.due ? daysFromToday(u.due) : 99999, groups = {};
    pend.forEach(u => { const k = u.person.trim().toLowerCase(); (groups[k] = groups[k] || []).push(u); });
    const gl = Object.values(groups).map(g => { g.sort((a, b) => key(a) - key(b)); return g; }).sort((a, b) => key(a[0]) - key(b[0]));
    let h = !showP ? '' : gl.map(g => (g.length > 1 ? `<div style="display:flex;justify-content:space-between;font-weight:800;font-size:.85rem;padding:4px 4px 0"><span>${escapeHtml(g[0].person)} (${g.length} entries)</span><span style="color:var(--danger)">${formatINR(g.reduce((t, u) => t + udRem(u), 0))} pending</span></div>` : '') + g.map(udCard).join('')).join('');
    if (showS && setl.length) h += (showP && gl.length ? '<div style="font-weight:800;font-size:.8rem;color:var(--text-secondary);margin:6px 4px 0">Completed</div>' : '') + setl.map(udCard).join('');
    if (!h) h = `<div class="empty-state">No ${udFilter} loans here.</div>`;
    c.innerHTML = h;
  };
  const udHistHtml = (item) => `<div style="margin:8px 0"><div style="font-weight:800;font-size:.82rem;margin-bottom:4px">History</div>${(item.history || []).map(h => { const pay = /Back/.test(h.action || ''); return `<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;font-size:.78rem;padding:5px 0;border-bottom:1px solid var(--border-color)"><div><div style="font-weight:700">${escapeHtml(h.action || '')}${h.note && h.note !== 'Payment' && h.note !== 'Created' ? ' · ' + escapeHtml(h.note) : ''}</div><div style="color:var(--text-muted);font-size:.7rem">${h.date || ''}${(h.time || timeFromId(h.id)) ? ' · ' + fmt12(h.time || timeFromId(h.id)) : ''}</div></div><div style="display:flex;gap:5px;align-items:center"><strong>${formatINR(h.amount)}</strong>${pay ? `<button class="btn-secondary" style="padding:4px 8px" onclick="openUdPayEdit('${item.id}','${h.id}')">Edit</button><button class="btn-secondary" style="padding:4px 8px" onclick="askConfirm('Delete this payment?','delUdPay(\\'${item.id}\\',\\'${h.id}\\')')">Del</button>` : ''}</div></div>`; }).join('')}</div>`;
  const openUdPayEdit = (id, hid) => { const it = appState.udhaar.find(u => u.id === id), h = it && it.history.find(x => x.id === hid); if (!h) return; openModal(head('Edit payment') + `<div class="form-group"><label class="form-label">Amount</label><input id="upAmt" type="number" inputmode="decimal" class="form-input" value="${h.amount}"></div><div class="form-group"><label class="form-label">Date</label><input id="upDate" type="date" class="form-input" value="${h.date || ''}"><label class="form-label" style="margin-top:6px">Time</label><input id="upTime" type="time" class="form-input" value="${h.time || timeFromId(h.id)}"></div><button class="btn-primary" style="justify-content:center;padding:12px" onclick="saveUdPayEdit('${id}','${hid}')">Save</button>`); };
  const saveUdPayEdit = (id, hid) => { const it = appState.udhaar.find(u => u.id === id), h = it.history.find(x => x.id === hid), a = Number($v('upAmt')); if (!a || a <= 0 || it.paidAmount - h.amount + a > it.totalAmount) { showToast('Invalid amount'); return; } it.paidAmount = it.paidAmount - h.amount + a; h.amount = a; h.date = $v('upDate') || h.date; h.time = $v('upTime') || h.time; saveState(); renderAll(); openUdhaarEyeModal(id); };
  const delUdPay = (id, hid) => { const it = appState.udhaar.find(u => u.id === id), h = it && it.history.find(x => x.id === hid); if (!h) return; it.paidAmount = Math.max(0, it.paidAmount - h.amount); it.history = it.history.filter(x => x.id !== hid); saveState(); renderAll(); openUdhaarEyeModal(id); };
  const remindUdhaar = async (id) => { const u = appState.udhaar.find(x => x.id === id); if (!u) return; const t = `Hi ${u.person}, a gentle reminder about ${formatINR(udRem(u))}${u.due ? ' (due ' + u.due + ')' : ''}. Thanks!`; try { if (navigator.share) await navigator.share({ text: t }); else { await navigator.clipboard.writeText(t); showToast('Message copied'); } } catch (e) {} };
  const renderDashUdhaar = () => { const el = document.getElementById('dashUdhaar'); if (!el) return; let l = 0, b = 0; appState.udhaar.forEach(u => { if (u.type === 'lent') l += udRem(u); else b += udRem(u); }); el.innerHTML = (l || b) ? `<div class="card" style="padding:12px 14px;cursor:pointer" onclick="switchMainTab('udhaar')"><div style="display:flex;justify-content:space-between"><div><div class="label-xs">To receive</div><div style="font-weight:800;color:var(--success)">${formatINR(l)}</div></div><div style="text-align:right"><div class="label-xs">To pay</div><div style="font-weight:800;color:var(--danger)">${formatINR(b)}</div></div></div></div>` : ''; };

  /* ---- [ALERTS] bell ---- */
  const getAlerts = () => {
    const a = [], m = getCurrentMonthData(), mt = getMonthMetrics(appState.selectedMonth), mk = appState.selectedMonth;
    const when = (d) => d < 0 ? `${-d} day${d === -1 ? '' : 's'} overdue` : d === 0 ? 'Due today' : `Due in ${d} day${d === 1 ? '' : 's'}`;
    allPlans().filter(p => !p.marked && p.date).forEach(p => { const d = daysFromToday(p.date); if (d <= 3) a.push({ key: 'plan:' + p.id, ic: 'clock', title: p.title, detail: when(d), amt: Number(p.amount), go: 'plans' }); });
    appState.udhaar.filter(u => u.due && udRem(u) > 0).forEach(u => { const d = daysFromToday(u.due); if (d <= 3) a.push({ key: 'ud:' + u.id, ic: 'users', title: u.person, detail: (u.type === 'lent' ? 'To receive · ' : 'To pay · ') + when(d), amt: udRem(u), go: 'udhaar' }); });
    (m.categories || []).forEach(c => { const sp = m.expenses.filter(e => e.catId === c.id).reduce((x, e) => x + Number(e.amount), 0); if (Number(c.limit) > 0 && sp > c.limit) a.push({ key: 'cat:' + c.id + ':' + mk, ic: 'warn', title: c.name + ' over limit', detail: `Spent ${formatINR(sp)} of ${formatINR(c.limit)}`, amt: sp - c.limit, go: 'budget' }); });
    if (mt.netActualSaving < 0) a.push({ key: 'over:' + mk, ic: 'warn', title: 'Overspent this month', detail: 'Spending is more than income', amt: -mt.netActualSaving, go: 'budget' });
    const bd = appState.lastBackup ? -daysFromToday(appState.lastBackup) : null;
    if (backupDays() > 0 && (bd === null || bd >= backupDays())) a.push({ key: 'backup', ic: 'save', title: 'Backup', detail: bd === null ? 'No backup taken yet' : `Last backup ${bd} days ago`, amt: 0, go: 'settings' });
    const sInfo = getStorageInfo(); if (sInfo.pct >= 70) a.push({ key: 'storage', ic: 'warn', title: 'Storage almost full', detail: `Using ${sInfo.pct}% of local storage. Take a backup.`, amt: 0, go: 'settings' });
    return a.filter(x => !(appState.alertsDismissed || []).includes(x.key));
  };
  const dismissAlert = (k) => { (appState.alertsDismissed = appState.alertsDismissed || []).push(k); saveState(); renderBell(); openAlerts(); };
  const dismissAll = () => { appState.alertsDismissed = (appState.alertsDismissed || []).concat(getAlerts().map(x => x.key)); saveState(); renderBell(); openAlerts(); };
  const AL_ICON = { clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>', warn: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>', save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8"/>' };
  const renderBell = () => { const b = document.getElementById('bellBadge'); if (!b) return; const seen = appState.alertsSeen || [], n = getAlerts().filter(x => !seen.includes(x.key)).length; b.style.display = n ? 'flex' : 'none'; b.textContent = n > 9 ? '9+' : n; };
  const openAlerts = () => {
    const a = getAlerts();
    openModal(head('Alerts') + (a.length ? a.map(x => `<div onclick="closeModal();switchMainTab('${x.go}')" style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border-color);cursor:pointer;color:var(--text-primary)">
      <div style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:var(--bg-card-alt);flex-shrink:0"><svg width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">${AL_ICON[x.ic]}</svg></div>
      <div style="flex:1;min-width:0"><div style="font-weight:700;font-size:.9rem">${escapeHtml(x.title)}</div><div style="font-size:.76rem;color:var(--text-secondary)">${escapeHtml(x.detail)}</div></div>
      ${x.amt ? `<div style="font-weight:800;font-size:.82rem;padding:4px 10px;border-radius:20px;border:1px solid var(--border-color)">${formatINR(x.amt)}</div>` : ''}<button class="btn-secondary" style="padding:4px 9px;font-size:.7rem" onclick="event.stopPropagation();dismissAlert('${x.key}')">Dismiss</button></div>`).join('') + `<button class="btn-secondary" style="width:100%;justify-content:center;padding:11px;margin-top:12px" onclick="dismissAll()">Dismiss all</button>` : '<p style="color:var(--text-secondary);font-size:.88rem;padding:10px 0">You are all caught up.</p>'));
    appState.alertsSeen = a.map(x => x.key); saveState(); renderBell();
  };

  /* ---- [RECURRING] har mahine apne aap jodne wale kharche ---- */
  const applyRecurring = () => {
    const cur = todayStr().slice(0, 7), day = Number(todayStr().slice(8, 10)); if (!(appState.recurring || []).length) return;
    ensureMonthExists(cur); const m = appState.months[cur]; let ch = false;
    appState.recurring.forEach(r => { if (day >= r.day && !m.expenses.some(e => e.recId === r.id) && m.categories.some(c => c.id === r.catId)) { m.expenses.push({ id: 'exp_' + Date.now() + r.id, catId: r.catId, amount: r.amount, note: r.title + ' (recurring)', date: `${cur}-${String(r.day).padStart(2, '0')}`, recId: r.id }); ch = true; } });
    if (ch) saveState();
  };
  const openRecurringModal = () => openModal(head('Recurring expenses') + `<p style="font-size:.78rem;color:var(--text-secondary);margin-bottom:8px">Added automatically every month on the chosen day.</p>` +
    (appState.recurring || []).map(r => `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border-color);font-size:.86rem"><span>${escapeHtml(r.title)} · day ${r.day}</span><span><strong>${formatINR(r.amount)}</strong> <button class="btn-secondary" style="padding:4px 8px" onclick="delRecurring('${r.id}')">Delete</button></span></div>`).join('') + `
    <div class="form-group" style="margin-top:12px"><input id="rcTitle" class="form-input" placeholder="Title (e.g. Rent)"></div>
    <div class="form-group"><input id="rcAmt" type="number" inputmode="decimal" min="1" class="form-input" placeholder="Amount"></div>
    <div class="form-group"><select id="rcCat" class="form-input">${catOptions()}</select></div>
    <div class="form-group"><input id="rcDay" type="number" inputmode="numeric" min="1" max="28" class="form-input" placeholder="Day of month (1-28)"></div>
    <button class="btn-primary" style="justify-content:center;padding:12px" onclick="saveRecurring()">Add</button>`);
  const saveRecurring = () => { const t = $v('rcTitle').trim(), a = Number($v('rcAmt')), dy = Number($v('rcDay')); if (!t || !(a > 0) || !(dy >= 1 && dy <= 28)) { showToast('Fill title, amount and day (1-28)'); return; } (appState.recurring = appState.recurring || []).push({ id: 'rc' + Date.now(), title: t, amount: a, catId: $v('rcCat'), day: dy }); applyRecurring(); saveState(); renderAll(); openRecurringModal(); };
  const delRecurring = (id) => { appState.recurring = appState.recurring.filter(r => r.id !== id); saveState(); openRecurringModal(); };

  /* ---- [INSIGHTS] graphs ---- */
  const openInsights = () => {
    const m = getCurrentMonthData(), keys = Object.keys(appState.months).sort().slice(-6), mets = keys.map(k => getMonthMetrics(k));
    const sp = (mo, id) => mo.expenses.filter(e => e.catId === id).reduce((x, e) => x + Number(e.amount), 0);
    const rows = (m.categories || []).map(c => ({ n: c.name, v: sp(m, c.id), l: Number(c.limit) || 0 })).filter(r => r.v > 0).sort((p, q) => q.v - p.v);
    const mx = Math.max(1, ...rows.map(r => Math.max(r.v, r.l))), tm = Math.max(1, ...mets.map(x => Math.max(x.income, x.totalExpenses))), pm = appState.months[prevMonthKey()];
    const cmp = pm ? (m.categories || []).map(c => { const pc = pm.categories.find(x => x.name === c.name), cur = sp(m, c.id), prev = pc ? sp(pm, pc.id) : 0; return { n: c.name, d: cur - prev, cur, prev }; }).filter(r => r.cur || r.prev).sort((p, q) => Math.abs(q.d) - Math.abs(p.d)).slice(0, 6) : [];
    const pay = {}; m.expenses.forEach(e => { const k = e.pay || 'Not set'; pay[k] = (pay[k] || 0) + Number(e.amount); }); const pays = Object.entries(pay).sort((p, q) => q[1] - p[1]), pmx = Math.max(1, ...pays.map(x => x[1]));
    const bar = (n, v, mxv, extra = '') => `<div style="margin-bottom:9px"><div style="display:flex;justify-content:space-between;font-size:.78rem"><span>${escapeHtml(n)}</span><span>${formatINR(v)}${extra}</span></div><div style="height:8px;border-radius:8px;background:var(--bg-card-alt);overflow:hidden"><div style="height:100%;width:${Math.round(v / mxv * 100)}%;background:var(--accent)"></div></div></div>`;
    const H = (t) => `<div style="font-weight:800;font-size:.85rem;margin:16px 0 8px">${t}</div>`;
    openModal(head('Insights') + `<div style="font-weight:800;font-size:.85rem;margin-bottom:8px">This month by category</div>` + (rows.length ? rows.map(r => bar(r.n, r.v, mx, r.l ? ' / ' + formatINR(r.l) : '')).join('') : '<p style="font-size:.82rem;color:var(--text-secondary)">No expenses yet.</p>')
      + H('Income vs expense') + `<div style="display:flex;align-items:flex-end;gap:8px;height:120px">${keys.map((k, i) => `<div style="flex:1;text-align:center;font-size:.64rem;color:var(--text-secondary)"><div style="display:flex;align-items:flex-end;justify-content:center;gap:3px;height:96px"><div style="width:42%;height:${Math.max(3, Math.round(mets[i].income / tm * 92))}px;background:var(--text-muted);border-radius:4px 4px 0 0;opacity:.55"></div><div style="width:42%;height:${Math.max(3, Math.round(mets[i].totalExpenses / tm * 92))}px;background:var(--accent);border-radius:4px 4px 0 0"></div></div>${k.slice(5)}/${k.slice(2, 4)}</div>`).join('')}</div><div style="font-size:.7rem;color:var(--text-muted);margin-top:4px">Grey: income · Colored: expense</div>`
      + H('Compared with last month') + (cmp.length ? cmp.map(r => `<div style="display:flex;justify-content:space-between;font-size:.82rem;padding:5px 0;border-bottom:1px solid var(--border-color)"><span>${escapeHtml(r.n)}</span><strong>${r.d === 0 ? 'Same' : formatINR(Math.abs(r.d)) + (r.d > 0 ? ' more' : ' less')}</strong></div>`).join('') : '<p style="font-size:.82rem;color:var(--text-secondary)">No data for the previous month.</p>')
      + H('By payment method') + (pays.length ? pays.map(x => bar(x[0], x[1], pmx)).join('') : '<p style="font-size:.82rem;color:var(--text-secondary)">No expenses yet.</p>')
      + H('Spending trend') + `<div style="display:flex;align-items:flex-end;gap:8px;height:110px">${keys.map((k, i) => `<div style="flex:1;text-align:center;font-size:.64rem;color:var(--text-secondary)"><div style="height:${Math.max(3, Math.round(mets[i].totalExpenses / tm * 80))}px;border-radius:6px 6px 0 0;background:var(--grad);margin-bottom:4px"></div>${k.slice(5)}/${k.slice(2, 4)}</div>`).join('')}</div>`);
  };

  /* ---- [SETUP] first launch ---- */
  const SETUP_CATS = [['Rent & Bills', '🏠', 30, '#6366f1'], ['Groceries', '🛒', 15, '#10b981'], ['Transport', '🚗', 8, '#f59e0b'], ['Food & Dining', '🍽️', 10, '#ef4444'], ['Shopping', '🛍️', 8, '#ec4899'], ['Health', '💊', 5, '#14b8a6'], ['Education', '📚', 5, '#8b5cf6'], ['Entertainment', '🎬', 5, '#0ea5e9']];
  const openSetupModal = () => openModal(head('Welcome to SmartBudget') + `<p style="font-size:.82rem;color:var(--text-secondary);margin-bottom:10px">Quick setup. You can change everything later.</p><div class="form-group"><label class="form-label">Monthly income (₹)</label><input id="suInc" type="number" inputmode="decimal" class="form-input" placeholder="e.g. 30000"></div><div class="form-group"><label class="form-label">Saving target (%)</label><input id="suPct" type="number" inputmode="decimal" class="form-input" value="20"></div><div class="form-group"><label class="form-label">Categories</label>${SETUP_CATS.map((c, i) => `<label style="display:flex;gap:8px;align-items:center;padding:4px 0;font-size:.86rem"><input type="checkbox" class="suCat" value="${i}" ${i < 4 ? 'checked' : ''}> ${c[1]} ${c[0]}</label>`).join('')}</div><button class="btn-primary" style="justify-content:center;padding:12px;margin-bottom:8px" onclick="saveSetup()">Start</button><button class="btn-secondary" style="justify-content:center" onclick="appState.setupDone=true;saveState();closeModal();renderAll()">Skip for now</button>`);
  const saveSetup = () => { const inc = Number($v('suInc')); if (!inc || inc <= 0) { showToast('Enter your monthly income'); return; } const m = getCurrentMonthData(); m.income = inc; m.targetSavingPct = Number($v('suPct')) || 20; const ch = [...document.querySelectorAll('.suCat:checked')].map(x => SETUP_CATS[x.value]); m.categories = ch.map((c, i) => ({ id: 'cat_' + Date.now() + i, name: c[0], icon: c[1], limit: Math.round(inc * c[2] / 100 / 100) * 100, color: c[3] })); appState.setupDone = true; saveState(); closeModal(); renderAll(); };

  const goHome = () => { switchMainTab('budget'); window.scrollTo(0, 0); document.querySelectorAll('main,.app-main').forEach(e => { e.scrollTop = 0; }); };


  /* ==========================================================================
     [CATEGORY PAGE] poora naya screen, category ki saari details
     ========================================================================== */
  let catPageId = null;
  let catFrom = 'budget';
  const openCategoryPage = (catId) => { catFrom = activeTabName(); catPageId = catId; renderCatPage(true); switchMainTab('catdetail'); window.scrollTo(0, 0); };
  const renderCatPage = (force) => {
    const el = document.getElementById('tab-catdetail'); if (!el || (!force && activeTabName() !== 'catdetail')) return;
    const m = getCurrentMonthData(), cat = (m.categories || []).find(x => x.id === catPageId);
    if (!cat) { if (activeTabName() === 'catdetail') goBack(); return; }
    const list = m.expenses.filter(e => e.catId === cat.id).sort((p, q) => (q.date || '').localeCompare(p.date || ''));
    const spent = list.reduce((s, e) => s + Number(e.amount), 0), lim = Number(cat.limit) || 0, pct = lim ? Math.round(spent / lim * 100) : 0, left = lim - spent;
    const [yy, mm] = appState.selectedMonth.split('-').map(Number), days = new Date(yy, mm, 0).getDate(), per = Array(days).fill(0);
    list.forEach(e => { const dd = Number((e.date || '').slice(8, 10)); if (dd >= 1 && dd <= days) per[dd - 1] += Number(e.amount); });
    const mx = Math.max(1, ...per), groups = {};
    list.forEach(e => { (groups[e.date || 'No date'] = groups[e.date || 'No date'] || []).push(e); });
    const stat = (l, v) => `<div style="flex:1"><div style="font-size:.68rem;color:var(--text-muted)">${l}</div><div style="font-weight:800;font-size:.95rem">${v}</div></div>`;
    el.innerHTML = `<div class="page-title" style="display:flex;align-items:center;gap:10px"><button class="menu-btn" onclick="goBack()" aria-label="Back">←</button>${escapeHtml(cat.name)}<span style="margin-left:auto;font-size:.76rem;font-weight:600;color:var(--text-muted)">${formatMonthDisplay(appState.selectedMonth)}</span></div>
      <div class="card" style="padding:16px">
        <div style="display:flex;gap:10px">${stat('Spent', formatINR(spent))}${stat('Limit', lim ? formatINR(lim) : 'Not set')}${stat(left >= 0 ? 'Remaining' : 'Over by', lim ? formatINR(Math.abs(left)) : '-')}</div>
        <div style="height:8px;border-radius:8px;background:var(--bg-card-alt);margin-top:12px;overflow:hidden"><div style="height:100%;width:${Math.min(100, pct)}%;background:var(--accent)"></div></div>
        <div style="display:flex;justify-content:space-between;font-size:.74rem;color:var(--text-secondary);margin-top:6px"><span>${lim ? pct + '% of limit used' : 'No limit set'}</span><span>${list.length} entr${list.length === 1 ? 'y' : 'ies'}${list.length ? ' · avg ' + formatINR(spent / list.length) : ''}</span></div>
      </div>
      <div class="card" style="padding:14px"><div style="font-weight:800;font-size:.85rem;margin-bottom:8px">Spending by day</div>
        <div style="display:flex;align-items:flex-end;gap:2px;height:70px">${per.map(v => `<div style="flex:1;height:${v ? Math.max(4, Math.round(v / mx * 66)) : 2}px;border-radius:3px 3px 0 0;background:${v ? 'var(--accent)' : 'var(--bg-card-alt)'}"></div>`).join('')}</div>
        <div style="display:flex;justify-content:space-between;font-size:.64rem;color:var(--text-muted);margin-top:4px"><span>1</span><span>${days}</span></div></div>
      <div style="display:flex;gap:10px"><button class="btn-primary" style="flex:1;justify-content:center;padding:12px" onclick="openQuickExpenseModal('${cat.id}')">Add expense</button><button class="btn-secondary" style="flex:1;justify-content:center;padding:12px" onclick="openCategoryModal('${cat.id}')">Edit category</button></div>
      ${Object.keys(groups).length ? Object.keys(groups).map(dt => { const g = groups[dt], tot = g.reduce((s, e) => s + Number(e.amount), 0), lab = /^\d{4}-/.test(dt) ? new Date(dt + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) : dt;
        return `<div><div style="display:flex;justify-content:space-between;font-size:.76rem;font-weight:700;color:var(--text-secondary);margin:6px 2px"><span>${lab}</span><span>${formatINR(tot)}</span></div>${g.map(e => `<div class="card" style="padding:10px 12px;display:flex;align-items:center;gap:10px;margin-bottom:6px"><div style="flex:1;min-width:0;cursor:pointer" onclick="openExpenseSheet('${e.id}')"><div style="font-weight:700;font-size:.88rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(e.note || 'Expense')}</div>${e.desc ? `<div style="font-size:.72rem;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(e.desc)}</div>` : ''}</div><strong>${formatINR(e.amount)}</strong><button class="btn-secondary" style="padding:5px 9px;font-size:.72rem" onclick="openEditExpenseModal('${e.id}','${cat.id}')">Edit</button><button class="btn-secondary" style="padding:5px 9px;font-size:.72rem" onclick="deleteExpenseEntry('${e.id}','${cat.id}')">Delete</button></div>`).join('')}</div>`; }).join('') : '<div class="empty-state">No expenses in this category yet.</div>'}`;
  };

  /* ==========================================================================
     [SIDE MENU] right se slide hone wala menu + About
     ========================================================================== */
  let sidePushed = false;
  const SVG = (p) => `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">${p}</svg>`;
  const MENU_ACTIONS = { calc: () => switchMainTab('calc'), notes: () => switchMainTab('notes'), shop: () => openShoppingModal(), split: () => openSplitModal(), search: () => openSearchModal(), insights: () => openInsights(), recurring: () => openRecurringModal(), report: () => openReportModal(), backup: () => switchMainTab('settings'), settings: () => switchMainTab('settings'), themes: () => openThemeModal(), about: () => openAbout() };
  const menuGo = (k) => { closeMenu(); setTimeout(MENU_ACTIONS[k], 120); };
  const openMenu = () => {
    const it = (k, ic, t) => `<button class="sm-item" onclick="menuGo('${k}')">${SVG(ic)}<span>${t}</span></button>`;
    document.getElementById('sidePanel').innerHTML = `<div class="sm-top"><div class="brand-logo" style="width:44px;height:44px;font-size:1.3rem">₹</div><div><div style="font-weight:800">SmartBudget</div><div style="font-size:.72rem;opacity:.75">Version ${APP_VERSION}</div></div></div>
      <div class="sm-label">Tools</div>
      ${it('calc', '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01"/>', 'Calculator')}${it('notes', '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>', 'Notes')}${it('shop', '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>', 'Shopping list')}${it('split', '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>', 'Split bill')}${it('search', '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>', 'Search')}
      <div class="sm-label">Money</div>
      ${it('insights', '<path d="M3 3v18h18M7 14l4-4 3 3 5-6"/>', 'Insights')}${it('recurring', '<path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"/>', 'Recurring expenses')}
      <div class="sm-label">Data</div>
      ${it('report', '<path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>', 'Report (PDF)')}${it('backup', '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8"/>', 'Backup &amp; Restore')}
      <div class="sm-label">App</div>
      ${it('settings', '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>', 'Settings')}${it('themes', '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z"/>', 'Themes')}${it('about', '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>', 'About')}`;
    document.getElementById('sideRoot').classList.add('open');
    if (!sidePushed) { history.pushState({ s: 1 }, ''); sidePushed = true; }
  };
  const hideMenuNow = () => document.getElementById('sideRoot').classList.remove('open');
  const closeMenu = () => { hideMenuNow(); if (sidePushed) { sidePushed = false; setTimeout(() => { ignorePop++; history.back(); }, 60); } };
  const openAbout = () => openModal(head('About') + `<div style="text-align:center;padding:6px 0 4px"><div class="brand-logo" style="width:64px;height:64px;font-size:1.9rem;margin:0 auto 10px">₹</div><div style="font-weight:800;font-size:1.15rem">SmartBudget</div><div style="font-size:.8rem;color:var(--text-secondary)">Version ${APP_VERSION}</div></div>
    <p style="font-size:.86rem;line-height:1.55;margin:12px 0">A simple personal money manager: monthly budget, category limits, savings funds, upcoming plans, loans (lent and borrowed), notes and PDF reports.</p>
    <div style="font-size:.84rem;line-height:1.6;padding:12px;border-radius:14px;background:var(--bg-card-alt)"><strong>Your data stays on this phone.</strong> Nothing is uploaded to any server. It works offline. Take a backup from Settings regularly, because clearing browser data removes the app data.</div>`);

  /* ---- [BACK BUTTON] ---- */
  let modalPushed = false, ignorePop = 0, navSilent = false;
  const parentOf = (t) => t === 'noteedit' ? 'notes' : (t === 'catdetail' && catFrom && catFrom !== 'budget' && catFrom !== 'catdetail' ? catFrom : null);
  const activeTabName = () => { const e = document.querySelector('.tab-pane.active'); return e ? e.id.replace('tab-', '') : 'budget'; };
  let tabPushed = false;
  const navPush = (tab) => { if (navSilent) return; if (tab !== 'budget' && activeTabName() === 'budget') { history.pushState({ t: 1 }, ''); tabPushed = true; } else if (tab === 'budget' && tabPushed) { tabPushed = false; ignorePop++; history.back(); } };
  const hideModalNow = () => { if (window._rrc) { window._rrc = false; renderAll(); } const b = document.getElementById('modalBackdrop'); b.classList.remove('open'); clearTimeout(window._mTimer); window._mTimer = setTimeout(() => { b.style.display = 'none'; }, 260); };
  let exiting = false;
  const hideExitDlg = () => document.getElementById('exitDlg').classList.remove('open');
  const exitApp = () => { exiting = true; hideExitDlg(); try { window.close(); } catch (e) {} history.back(); setTimeout(() => history.back(), 120); };
  window.addEventListener('popstate', () => {
    if (exiting) return;
    if (ignorePop > 0) { ignorePop--; return; }
    if (sidePushed) { sidePushed = false; hideMenuNow(); return; }
    if (document.getElementById('exitDlg').classList.contains('open')) { history.pushState({ g: 1 }, ''); hideExitDlg(); return; }
    if (modalPushed) { modalPushed = false; hideModalNow(); return; }
    if (document.getElementById('lockScreen').style.display !== 'none' && document.getElementById('lockScreen').style.display !== '') { history.pushState({ g: 1 }, ''); return; }
    if (activeTabName() !== 'budget') { const par = parentOf(activeTabName()); if (par) { navSilent = true; switchMainTab(par); navSilent = false; history.pushState({ t: 1 }, ''); tabPushed = true; return; } tabPushed = false; navSilent = true; switchMainTab('budget'); navSilent = false; return; }
    history.pushState({ g: 1 }, '');
    document.getElementById('exitDlg').classList.add('open');
  });
  history.replaceState({ h: 1 }, ''); history.pushState({ g: 1 }, '');

  /* ---- [ICONS] UI emoji -> ek jaise line icons (category/fund icons wale emoji nahi badalte) ---- */
  const UI_ICONS = {
    '✏️': '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>', '🗑️': '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5"/>',
    '⚠️': '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>', '🚨': '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>',
    '🔔': '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>', '🔕': '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18M3 3l18 18"/>',
    '📅': '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>', '📌': '<path d="M12 17v5M9 3h6l-1 7 3 3H7l3-3z"/>', '📝': '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6"/>',
    '🔒': '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>', '🔍': '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>', '➖': '<path d="M5 12h14"/>', '🧾': '<path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2zM9 8h6M9 12h6"/>',
    '💸': '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4"/>', '📤': '<path d="M12 15V3m0 0L8 7m4-4 4 4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>', '👁️': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>', '🙈': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zM3 3l18 18"/>',
    '🌙': '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>', '☀️': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', '♻️': '<path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"/>', '⬇️': '<path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16"/>', '✨': '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>', '🚫': '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>'
  };
  const UI_RE = new RegExp(Object.keys(UI_ICONS).join('|'), 'g'), SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'OPTION', 'TITLE', 'INPUT']);
  const iconify = (root) => {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), hits = [];
    while (w.nextNode()) { const n = w.currentNode; if (n.parentNode && !SKIP.has(n.parentNode.tagName) && UI_RE.test(n.nodeValue)) hits.push(n); UI_RE.lastIndex = 0; }
    hits.forEach(n => { const frag = document.createDocumentFragment(); let last = 0, m; UI_RE.lastIndex = 0;
      while ((m = UI_RE.exec(n.nodeValue))) { frag.appendChild(document.createTextNode(n.nodeValue.slice(last, m.index))); const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('width', '1.05em'); s.setAttribute('height', '1.05em'); s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor'); s.setAttribute('stroke-width', '2'); s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round'); s.style.cssText = 'vertical-align:-.15em;margin-right:.25em;flex-shrink:0'; s.innerHTML = UI_ICONS[m[0]]; frag.appendChild(s); last = m.index + m[0].length; }
      frag.appendChild(document.createTextNode(n.nodeValue.slice(last))); n.parentNode.replaceChild(frag, n); });
  };
  let _icoBusy = false;
  const startIconify = () => { iconify(document.body); new MutationObserver(() => { if (_icoBusy) return; _icoBusy = true; requestAnimationFrame(() => { iconify(document.body); _icoBusy = false; }); }).observe(document.body, { childList: true, subtree: true, characterData: true }); };


  /* ==========================================================================
     [SALARY SAVINGS LEDGER] Add / Spent ki list, balance = Add - Spent
     ========================================================================== */
  const migrateSalary = () => {
    const L = [];
    Object.keys(appState.months).sort().forEach(ym => { const m = appState.months[ym];
      if (Number(m.salarySavings) > 0) L.push({ id: 'sl_' + (Date.now() + L.length), type: 'add', amount: Number(m.salarySavings), note: 'Earlier savings', date: ym + '-01', time: '' });
      (m.salarySpend || []).forEach((s, i) => L.push({ id: 'sl_' + (Date.now() + 500 + L.length), type: 'spend', amount: Number(s.amount), note: s.note || 'Spent', date: s.date || ym + '-01', time: '' })); });
    appState.salaryLedger = L; saveState();
  };
  const salaryNet = (ym, mData) => { if (!appState.salaryLedger) migrateSalary(); let n = 0; appState.salaryLedger.forEach(x => { if ((x.date || '').slice(0, 7) === ym) n += x.type === 'add' ? Number(x.amount) : -Number(x.amount); }); return Math.max(0, n); };
  const getSalaryPool = () => { if (!appState.salaryLedger) migrateSalary(); let saved = 0, spent = 0; appState.salaryLedger.forEach(x => { if (x.type === 'add') saved += Number(x.amount); else spent += Number(x.amount); }); return { saved, spent, left: saved - spent }; };
  const slForm = (type) => { const add = type === 'add';
    openModal(head(add ? 'Add to Salary Savings' : 'Spent from Salary Savings') + `<p style="font-size:.78rem;color:var(--text-secondary);margin-bottom:8px">Balance now: <strong>${money(getSalaryPool().left)}</strong></p>
      <div class="form-group"><label class="form-label">Amount (₹)</label><input id="slAmt" type="number" inputmode="decimal" min="1" class="form-input"></div>
      <div class="form-group"><label class="form-label">Note</label><input id="slNote" class="form-input" placeholder="${add ? 'e.g. November savings' : 'e.g. Phone repair'}"></div>
      <div class="form-group"><label class="form-label">Date</label><input id="slDate" type="date" class="form-input" value="${todayStr()}"><label class="form-label" style="margin-top:6px">Time</label><input id="slTime" type="time" class="form-input" value="${nowHM()}"></div>
      <button class="btn-primary" style="justify-content:center;padding:12px" onclick="saveSalaryEntry('${type}')">Save</button>`); };
  const openSalarySavingModal = () => slForm('add');
  const openSalarySpendModal = () => slForm('spend');
  const saveSalaryEntry = (type) => {
    const amt = Number($v('slAmt')); if (!(amt > 0)) { showToast('Enter a valid amount'); return; }
    if (type === 'spend' && amt > getSalaryPool().left) { showToast('Not enough balance in Salary Savings'); return; }
    if (!appState.salaryLedger) migrateSalary();
    appState.salaryLedger.unshift({ id: 'sl_' + Date.now(), type, amount: amt, note: $v('slNote').trim() || (type === 'add' ? 'Savings' : 'Spent'), date: $v('slDate') || todayStr(), time: $v('slTime') || nowHM() });
    saveState(); closeModal(); renderAll(); showToast(type === 'add' ? 'Added to savings' : 'Spent from savings');
  };
  const openSalaryHistoryModal = () => {
    if (!appState.salaryLedger) migrateSalary();
    const chrono = appState.salaryLedger.slice().sort((p, q) => ((p.date || '') + (p.time || '')).localeCompare((q.date || '') + (q.time || '')) || tsFromId(p.id) - tsFromId(q.id)); let bal = 0; const withBal = chrono.map(x => { bal += x.type === 'add' ? Number(x.amount) : -Number(x.amount); return { x, bal }; }).reverse();
    openModal(head('Salary Savings history') + `<p style="font-size:.78rem;color:var(--text-secondary)">Entries cannot be edited. If something is wrong, delete it and add it again. Deleted entries are noted at the bottom.</p>` + (withBal.length ? withBal.map(({ x, bal }) => `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:9px 0;border-bottom:1px solid var(--border-color)"><div style="min-width:0"><div style="font-weight:700;font-size:.86rem">${escapeHtml(x.note)}</div><div style="font-size:.72rem;color:var(--text-muted)">${x.date || ''}${x.time ? ' · ' + fmt12(x.time) : ''} · Balance ${money(bal)}</div></div><div style="display:flex;align-items:center;gap:8px"><strong style="color:${x.type === 'add' ? 'var(--success)' : 'var(--danger)'}">${x.type === 'add' ? '+' : '−'}${money(x.amount)}</strong><button class="btn-secondary" style="padding:4px 9px;font-size:.7rem" onclick="askConfirm('Delete this entry?','delSalaryEntry(\\'${x.id}\\')')">Delete</button></div></div>`).join('') : '<p style="font-size:.85rem;color:var(--text-secondary);margin-top:10px">No entries yet.</p>')
      + ((appState.salaryAudit || []).length ? `<div style="font-weight:800;font-size:.82rem;margin:14px 0 4px">Deleted entries</div>` + appState.salaryAudit.map(x => `<div style="font-size:.74rem;color:var(--text-muted);padding:3px 0">${escapeHtml(x.text)} · ${fmtTs(x.ts)}</div>`).join('') : ''));
  };
  const delSalaryEntry = (id) => { const x = appState.salaryLedger.find(y => y.id === id); if (!x) return; (appState.salaryAudit = appState.salaryAudit || []).unshift({ text: `${x.type === 'add' ? 'Add' : 'Spent'} ${money(x.amount)} (${x.note}, ${x.date})`, ts: Date.now() }); appState.salaryLedger = appState.salaryLedger.filter(y => y.id !== id); saveState(); renderAll(); openSalaryHistoryModal(); };

  /* ==========================================================================
     [NOTES EDITOR] poora screen, auto-save
     ========================================================================== */
  let _note = null, _noteTimer = null;
  const noteWords = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);
  const openNotePage = (id = null) => {
    if (!appState.notes) appState.notes = [];
    _note = id ? appState.notes.find(n => n.id === id) : { id: 'note_' + Date.now(), title: '', body: '', date: todayStr(), pinned: false, updated: Date.now(), isNew: true };
    if (!_note) return; const el = document.getElementById('tab-noteedit');
    el.innerHTML = `<div class="page-title" style="display:flex;align-items:center;gap:10px"><button class="menu-btn" onclick="closeNotePage()" aria-label="Back">←</button><span style="flex:1">Note</span><button class="menu-btn" id="notePinBtn" onclick="toggleNotePin()" aria-label="Pin">${_note.pinned ? '📌' : '📍'}</button><button class="menu-btn" onclick="deleteNotePage()" aria-label="Delete">🗑️</button></div>
      <div class="card" style="padding:16px;display:flex;flex-direction:column;gap:10px"><input id="noteTitle" class="form-input" style="font-size:1.25rem;font-weight:800;border:0;background:none;padding:4px 0" placeholder="Title" value="${escapeHtml(_note.title)}" oninput="noteChanged()"><textarea id="noteBody" class="form-textarea" style="min-height:52vh;border:0;background:none;padding:4px 0;resize:none;font-size:.95rem;line-height:1.6" placeholder="Start writing..." oninput="noteChanged()">${escapeHtml(_note.body)}</textarea><div id="noteMeta" style="font-size:.72rem;color:var(--text-muted)"></div></div>`;
    noteMeta(); switchMainTab('noteedit'); window.scrollTo(0, 0); if (_note.isNew) setTimeout(() => document.getElementById('noteTitle').focus(), 250);
  };
  const noteMeta = () => { const m = document.getElementById('noteMeta'); if (m && _note) m.textContent = `${_note.isNew ? 'Not saved yet' : 'Edited ' + fmtTs(_note.updated || tsFromId(_note.id))} · ${noteWords(_note.body)} words`; };
  const noteChanged = () => { clearTimeout(_noteTimer); _noteTimer = setTimeout(saveNoteNow, 350); _note.body = document.getElementById('noteBody').value; noteMeta(); };
  const saveNoteNow = () => { if (!_note) return; _note.title = document.getElementById('noteTitle').value.trim(); _note.body = document.getElementById('noteBody').value;
    if (!_note.title && !_note.body.trim()) return; _note.updated = Date.now(); if (_note.isNew) { delete _note.isNew; appState.notes.unshift(_note); } saveState(); noteMeta(); renderNotesTab(); };
  const closeNotePage = () => { clearTimeout(_noteTimer); if (document.getElementById('noteTitle')) saveNoteNow(); _note = null; switchMainTab('notes'); };
  const toggleNotePin = () => { _note.pinned = !_note.pinned; saveNoteNow(); if (!_note.isNew) saveState(); document.getElementById('notePinBtn').textContent = _note.pinned ? '📌' : '📍'; };
  const deleteNotePage = () => askConfirm('Delete this note?', 'removeNote()');
  const removeNote = () => { clearTimeout(_noteTimer); if (_note && !_note.isNew) appState.notes = appState.notes.filter(n => n.id !== _note.id); _note = null; saveState(); renderNotesTab(); switchMainTab('notes'); showToast('Note deleted'); };


  /* ---- [CSV] Report ke tick-boxes ke hisaab se spreadsheet file ---- */
  const downloadCSV = () => {
    const types = ['out', 'inc', 'fund', 'ud'].filter(k => { const b = document.getElementById('rpTx_' + k); return b && b.checked; });
    if (!types.length) { showToast('Select at least one transaction type'); return; }
    const rows = collectTxns(rpPeriod).filter(r => types.includes(r.k)).sort((p, q) => (p.date || '').localeCompare(q.date || ''));
    const q = (v) => `"${String(v === undefined || v === null ? '' : v).replace(/"/g, '""')}"`, hm = (ts) => ts ? new Date(ts).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '';
    const lines = [['Date', 'Time', 'Type', 'Title', 'Category', 'Payment', 'Amount', 'Notes']];
    rows.forEach(r => { let type = '', cat = '', pay = '', time = '', notes = '';
      if (r.k === 'out') { type = 'Expense'; cat = r.sub; pay = (r.ex && r.ex.pay) || ''; time = (r.ex && r.ex.time) || ''; notes = (r.ex && r.ex.desc) || ''; }
      else if (r.k === 'inc') { type = 'Income'; notes = (r.ei && r.ei.note) || ''; time = hm(tsFromId(r.ei && r.ei.id)); }
      else if (r.k === 'fund') { type = r.ftype === 'add' ? 'Fund deposit' : 'Fund withdrawal'; time = hm(tsFromId(r.hid)); notes = r.note || ''; }
      else { type = r.utype === 'lent' ? 'Loan lent' : 'Loan borrowed'; time = hm(tsFromId(r.hid)); notes = r.note || r.act || ''; }
      lines.push([r.date, time, type, r.title, cat, pay, r.amt, notes]); });
    const url = URL.createObjectURL(new Blob(['\uFEFF' + lines.map(l => l.map(q).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' })), el = document.createElement('a');
    el.href = url; el.download = `SmartBudget_${rpPeriod}_${todayStr()}.csv`; document.body.appendChild(el); el.click(); el.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
    showToast(rows.length ? `CSV downloaded (${rows.length} rows)` : 'CSV downloaded (no rows for this period)');
  };

  /* ---- [SHORTCUTS] icon dabakar rakhne par seedha screen ---- */
  let pendingAction = new URLSearchParams(location.search).get('action');
  const runPendingAction = () => { const act = pendingAction; if (!act) return; pendingAction = null; try { history.replaceState(history.state, '', location.pathname); } catch (e) {}
    setTimeout(() => { if (act === 'add') openQuickExpenseModal(); else if (act === 'txns') switchMainTab('txns'); }, 1400); };


  /* ==========================================================================
     [INCOME WINDOW] salary + target + extra income + history, ek hi window
     ========================================================================== */
  const openIncomeModal = () => {
    const m = getCurrentMonthData(), ex = m.extraIncome || [], exTotal = ex.reduce((s, x) => s + Number(x.amount), 0), sal = Number(m.income) || 0;
    const hist = (m.incomeLog || []).concat(ex.map(x => ({ text: `Extra income added ${money(x.amount)} · ${x.note}`, ts: tsFromId(x.id) }))).filter(x => x.ts).sort((p, q) => q.ts - p.ts);
    openModal(head('Income · ' + formatMonthDisplay(appState.selectedMonth)) + `<div style="font-size:2rem;font-weight:800">${formatINR(sal + exTotal)}</div><div style="font-size:.78rem;color:var(--text-secondary);margin-bottom:10px">Salary ${formatINR(sal)} + Extra ${formatINR(exTotal)}</div>
      <div class="form-group"><label class="form-label">Monthly salary (₹)</label><input type="number" inputmode="decimal" id="inpIncome" class="form-input" value="${sal}" min="0"></div>
      <div class="form-group"><label class="form-label">Target saving (%)</label><input type="number" inputmode="decimal" id="inpTargetPct" class="form-input" value="${m.targetSavingPct}" min="0" max="100"></div>
      <button class="btn-primary" style="justify-content:center;padding:12px;width:100%" onclick="saveIncomeAll()">Save salary and target</button>
      <div style="font-weight:800;font-size:.86rem;margin:18px 0 6px">Extra income</div>
      ${ex.length ? ex.map(x => `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border-color)"><div style="min-width:0"><div style="font-weight:700;font-size:.86rem">${escapeHtml(x.note)}</div><div style="font-size:.72rem;color:var(--text-muted)">${x.date || ''}${x.time ? ' · ' + fmt12(x.time) : ''}</div></div><div style="display:flex;align-items:center;gap:8px"><strong style="color:var(--success)">+${money(x.amount)}</strong><button class="btn-secondary" style="padding:4px 9px;font-size:.7rem" onclick="delExtraIncome('${x.id}')">Delete</button></div></div>`).join('') : '<div style="font-size:.8rem;color:var(--text-muted);padding:4px 0">No extra income this month.</div>'}
      <div style="display:flex;gap:8px;margin-top:12px"><div class="form-group" style="flex:1;margin:0"><label class="form-label">Amount (₹)</label><input id="eiAmt" type="number" inputmode="decimal" class="form-input"></div><div class="form-group" style="flex:1.3;margin:0"><label class="form-label">Source</label><input id="eiNote" class="form-input" placeholder="Bonus, freelance..."></div></div>
      <div style="display:flex;gap:8px;margin-top:8px"><div class="form-group" style="flex:1;margin:0"><label class="form-label">Date</label><input id="eiDate" type="date" class="form-input" value="${todayStr()}"></div><div class="form-group" style="flex:1;margin:0"><label class="form-label">Time</label><input id="eiTime" type="time" class="form-input" value="${nowHM()}"></div></div>
      <button class="btn-secondary" style="justify-content:center;padding:11px;width:100%;margin-top:10px" onclick="saveExtraIncome()">Add extra income</button>
      <div style="font-weight:800;font-size:.86rem;margin:18px 0 4px">History</div>
      <div style="max-height:24vh;overflow-y:auto">${hist.length ? hist.map(x => `<div style="display:flex;justify-content:space-between;gap:10px;padding:7px 0;border-bottom:1px solid var(--border-color);font-size:.78rem"><span>${escapeHtml(x.text)}</span><span style="color:var(--text-muted);white-space:nowrap">${fmtTs(x.ts)}</span></div>`).join('') : '<div style="font-size:.78rem;color:var(--text-muted)">No history yet. Changes from now on are recorded here.</div>'}</div>`);
  };
  const openExtraIncomeModal = () => openIncomeModal();
  const saveIncomeAll = () => {
    const m = getCurrentMonthData(), s = Math.max(0, Number($v('inpIncome')) || 0), t = Math.max(0, Math.min(100, Number($v('inpTargetPct')) || 0)); m.incomeLog = m.incomeLog || [];
    if (s !== Number(m.income)) m.incomeLog.unshift({ text: `Salary ${money(m.income)} → ${money(s)}`, ts: Date.now() });
    if (t !== Number(m.targetSavingPct)) m.incomeLog.unshift({ text: `Target saving ${m.targetSavingPct}% → ${t}%`, ts: Date.now() });
    m.income = s; m.targetSavingPct = t; saveState(); renderAll(); openIncomeModal(); showToast('Income updated');
  };
  const saveExtraIncome = () => {
    const amt = Number($v('eiAmt')); if (!(amt > 0)) { showToast('Enter a valid amount'); return; }
    const m = getCurrentMonthData(); if (!m.extraIncome) m.extraIncome = [];
    m.extraIncome.unshift({ id: 'ei_' + Date.now(), amount: amt, note: $v('eiNote').trim() || 'Extra income', date: $v('eiDate') || todayStr(), time: $v('eiTime') || nowHM() });
    saveState(); renderAll(); openIncomeModal(); showToast('Extra income added');
  };
  const delExtraIncome = (id) => { snap(); const m = getCurrentMonthData(), x = (m.extraIncome || []).find(y => y.id === id); if (!x) return; (m.incomeLog = m.incomeLog || []).unshift({ text: `Extra income deleted ${money(x.amount)} · ${x.note}`, ts: Date.now() }); m.extraIncome = m.extraIncome.filter(y => y.id !== id); saveState(); renderAll(); openIncomeModal(); showUndo('Income deleted'); };

  window.onload = () => {
    startIconify();
    loadState();
    applyRecurring();
    applyTheme();
    initBackupDefaults();
    buildKeypad();
    renderAll();
    if (appState.pin) showLock(); else runPendingAction();
    if (!appState.pin) setTimeout(() => { if (appState.setupDone === false) openSetupModal(); else renderBell(); }, 1500);
    (() => { const sp = document.getElementById('splash'); if (!sp) return; if (appState.noAnim) { sp.remove(); return; } setTimeout(() => { sp.classList.add('hide'); setTimeout(() => sp.remove(), 400); }, 1250); })();
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(() => {});
  };
