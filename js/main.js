/* ==========================================================================
   JIO NEXT - INTERACTIVE CLIENT ENGINE
   High-performance particle canvas, live 5G speed test, plan filters,
   interactive coverage checker, recharge modal, and theme management.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroParticles();
  initSpeedTest();
  initPlanExplorer();
  initCoverageChecker();
  initRechargeModal();
  initThemeToggle();
  initFaqAccordion();
  initMobileMenu();
  init3DTilt();
});

/* --------------------------------------------------------------------------
   1. HERO CANVAS PARTICLE NETWORK (5G MESH SIMULATION)
   -------------------------------------------------------------------------- */
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 12000), 75);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
        color: Math.random() > 0.4 ? 'rgba(0, 114, 255,' : 'rgba(0, 229, 255,'
      });
    }
  }

  window.addEventListener('resize', resize);
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resize();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.85)';
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = (1 - dist / 120) * 0.25;
          ctx.strokeStyle = `rgba(0, 150, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. INTERACTIVE 5G SPEEDOMETER TEST SIMULATOR
   -------------------------------------------------------------------------- */
function initSpeedTest() {
  const startBtn = document.getElementById('start-speedtest-btn');
  const speedVal = document.getElementById('speed-display-value');
  const speedUnit = document.getElementById('speed-display-unit');
  const speedStage = document.getElementById('speed-test-stage');
  const pingVal = document.getElementById('stat-ping');
  const jitterVal = document.getElementById('stat-jitter');
  const uploadVal = document.getElementById('stat-upload');
  const gaugeFill = document.getElementById('speed-gauge-fill');
  const needle = document.getElementById('speed-needle');
  const chartCanvas = document.getElementById('speed-live-chart');

  if (!startBtn || !speedVal) return;

  const maxGaugeCircumference = 565.48; // 2 * PI * 90
  let isTesting = false;

  startBtn.addEventListener('click', () => {
    if (isTesting) return;
    runSimulation();
  });

  function updateGauge(speedMbps) {
    const percent = Math.min(speedMbps / 1500, 1);
    // Gauge covers 240 degrees (approx)
    const offset = maxGaugeCircumference * (1 - percent * 0.75);
    if (gaugeFill) gaugeFill.style.strokeDashoffset = offset;

    // Needle rotates from -120deg to +120deg
    const angle = -120 + percent * 240;
    if (needle) needle.style.transform = `rotate(${angle}deg)`;
  }

  function runSimulation() {
    isTesting = true;
    startBtn.disabled = true;
    startBtn.classList.add('opacity-50', 'cursor-not-allowed');
    startBtn.innerHTML = `<span class="inline-block animate-spin mr-2">⚡</span> Testing True 5G...`;

    // Reset display
    speedVal.textContent = '0';
    pingVal.textContent = '--';
    jitterVal.textContent = '--';
    uploadVal.textContent = '--';
    updateGauge(0);

    const chartPoints = [];
    let chartCtx = null;
    if (chartCanvas) {
      chartCtx = chartCanvas.getContext('2d');
      chartCanvas.width = chartCanvas.parentElement.offsetWidth;
      chartCanvas.height = 60;
    }

    function drawChart() {
      if (!chartCtx || chartPoints.length < 2) return;
      chartCtx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
      chartCtx.beginPath();
      chartCtx.moveTo(0, chartCanvas.height);

      const step = chartCanvas.width / (chartPoints.length - 1);
      chartPoints.forEach((val, idx) => {
        const y = chartCanvas.height - (val / 1500) * (chartCanvas.height - 10);
        chartCtx.lineTo(idx * step, y);
      });

      chartCtx.strokeStyle = '#00e5ff';
      chartCtx.lineWidth = 2.5;
      chartCtx.stroke();
    }

    // Step 1: Ping & Jitter measurement (800ms)
    speedStage.textContent = 'Measuring Ping to Jio Standalone 5G Edge Node...';
    let elapsed = 0;
    const pingTimer = setInterval(() => {
      elapsed += 100;
      pingVal.textContent = Math.floor(3 + Math.random() * 3) + ' ms';
      jitterVal.textContent = (0.5 + Math.random() * 0.8).toFixed(1) + ' ms';

      if (elapsed >= 900) {
        clearInterval(pingTimer);
        startDownloadPhase();
      }
    }, 100);

    // Step 2: Download Speed Ramp up
    function startDownloadPhase() {
      speedStage.textContent = 'Testing Peak Standalone 5G Download Bandwidth...';
      speedUnit.textContent = 'Mbps Download';

      let currentSpeed = 50;
      const targetSpeed = 1248 + Math.floor(Math.random() * 120); // ~1250 - 1368 Mbps!

      const dlInterval = setInterval(() => {
        const step = (targetSpeed - currentSpeed) * 0.12 + Math.random() * 25;
        currentSpeed += step;

        if (currentSpeed >= targetSpeed - 15) {
          currentSpeed = targetSpeed + (Math.random() - 0.5) * 35;
        }

        speedVal.textContent = Math.floor(currentSpeed);
        updateGauge(currentSpeed);
        chartPoints.push(currentSpeed);
        drawChart();
      }, 70);

      setTimeout(() => {
        clearInterval(dlInterval);
        startUploadPhase();
      }, 3500);
    }

    // Step 3: Upload Speed
    function startUploadPhase() {
      speedStage.textContent = 'Testing 5G Carrier Aggregated Upload Speed...';
      let upSpeed = 20;
      const targetUp = 186 + Math.floor(Math.random() * 25);

      const upInterval = setInterval(() => {
        upSpeed += (targetUp - upSpeed) * 0.18 + Math.random() * 10;
        uploadVal.textContent = Math.floor(upSpeed) + ' Mbps';
      }, 100);

      setTimeout(() => {
        clearInterval(upInterval);
        uploadVal.textContent = targetUp + ' Mbps';
        finishTest();
      }, 2000);
    }

    // Step 4: Finish Test
    function finishTest() {
      speedStage.innerHTML = `<span class="text-emerald-400 font-bold">✓ Test Complete:</span> Outstanding! Super-Fast Jio True 5G Ultra-Low Latency.`;
      startBtn.disabled = false;
      startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      startBtn.innerHTML = `Test Again ⚡`;
      isTesting = false;

      showToast(`⚡ Peak 5G Speed: ${speedVal.textContent} Mbps verified!`);
    }
  }
}

/* --------------------------------------------------------------------------
   3. PLAN EXPLORER & CATEGORY FILTERING
   -------------------------------------------------------------------------- */
const PLANS_DATA = [
  {
    id: 'p1',
    category: '5g-prepaid',
    name: 'True 5G Unlimited Binge',
    price: 349,
    validity: '28 Days',
    data: '2 GB/day + Unlimited True 5G',
    badge: 'Most Popular',
    ott: ['JioCinema Premium', 'JioTV', 'JioCloud 100GB'],
    tag: 'trending'
  },
  {
    id: 'p2',
    category: '5g-prepaid',
    name: 'True 5G OTT Super Pack',
    price: 859,
    validity: '84 Days',
    data: '2 GB/day + Unlimited True 5G',
    badge: 'Best Value',
    ott: ['Disney+ Hotstar', 'JioCinema', 'SonyLIV', 'ZEE5'],
    tag: 'ott'
  },
  {
    id: 'p3',
    category: '5g-prepaid',
    name: 'True 5G Annual Freedom',
    price: 3599,
    validity: '365 Days',
    data: '2.5 GB/day + Unlimited True 5G',
    badge: 'Annual Saver',
    ott: ['JioCinema Premium', 'JioCloud 500GB', 'FanCode'],
    tag: 'long-validity'
  },
  {
    id: 'p4',
    category: 'airfiber',
    name: 'JioAirFiber Max Ultra',
    price: 1199,
    validity: 'Monthly Billing',
    data: '100 Mbps Unlimited Wi-Fi 6',
    badge: 'Includes 15+ OTTs',
    ott: ['Netflix Basic', 'Prime Video', 'Disney+ Hotstar', '800+ TV Channels'],
    tag: 'trending'
  },
  {
    id: 'p5',
    category: 'airfiber',
    name: 'JioAirFiber Pro Giga',
    price: 1499,
    validity: 'Monthly Billing',
    data: '300 Mbps Symmetrical + 4K STB',
    badge: 'Ultra Fast',
    ott: ['Netflix Standard', 'Prime Video', 'JioCinema Premium', '1000+ Channels'],
    tag: 'ott'
  },
  {
    id: 'p6',
    category: 'fiber',
    name: 'JioFiber Home GigaPack',
    price: 999,
    validity: '30 Days',
    data: '150 Mbps Symmetric Unlimited',
    badge: 'Zero Lag Fiber',
    ott: ['Prime Video', 'Disney+ Hotstar', 'SonyLIV', 'Discovery+'],
    tag: 'ott'
  },
  {
    id: 'p7',
    category: 'fiber',
    name: 'JioFiber Enterprise 1 Gbps',
    price: 3999,
    validity: '30 Days',
    data: '1 Gbps Ultra Symmetrical Speed',
    badge: 'Creator / Pro',
    ott: ['Netflix Premium 4K', 'Prime Video', 'All 18+ OTTs Included'],
    tag: 'long-validity'
  },
  {
    id: 'p8',
    category: 'roaming',
    name: 'Global Roaming Pass 100+ Nations',
    price: 2799,
    validity: '30 Days',
    data: '5 GB High Speed + 100 Mins Calls',
    badge: 'USA / Europe / Asia',
    ott: ['Free In-flight Wi-Fi', '24x7 Priority Support'],
    tag: 'trending'
  }
];

function initPlanExplorer() {
  const container = document.getElementById('plans-grid-container');
  const catButtons = document.querySelectorAll('[data-plan-cat]');
  const filterPills = document.querySelectorAll('[data-plan-filter]');

  if (!container) return;

  let activeCategory = 'all';
  let activeTag = 'all';

  function renderPlans() {
    container.innerHTML = '';

    const filtered = PLANS_DATA.filter(p => {
      const matchCat = (activeCategory === 'all' || p.category === activeCategory);
      const matchTag = (activeTag === 'all' || p.tag === activeTag);
      return matchCat && matchTag;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          <p class="text-xl font-medium">No plans matching this filter combination.</p>
          <button class="mt-4 px-4 py-2 text-sm bg-blue-600/30 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-600/50" onclick="resetPlanFilters()">View All Plans</button>
        </div>
      `;
      return;
    }

    filtered.forEach(plan => {
      const card = document.createElement('div');
      card.className = 'glass-panel glow-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300';
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between gap-2 mb-4">
            <span class="px-3 py-1 text-xs font-bold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">${plan.badge}</span>
            <span class="text-xs text-slate-400 font-medium">${plan.validity}</span>
          </div>
          
          <h4 class="text-xl font-bold mb-2 text-white">${plan.name}</h4>
          
          <div class="flex items-baseline gap-1 my-4">
            <span class="text-3xl sm:text-4xl font-extrabold text-white">₹${plan.price}</span>
            <span class="text-sm text-slate-400">/ ${plan.validity}</span>
          </div>

          <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800 mb-5">
            <div class="text-xs text-blue-400 uppercase tracking-wider font-semibold mb-1">High-Speed Data</div>
            <div class="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ${plan.data}
            </div>
          </div>

          <div class="mb-6">
            <div class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Digital Perks & OTT</div>
            <div class="flex flex-wrap gap-1.5">
              ${plan.ott.map(app => `<span class="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>${app}</span>`).join('')}
            </div>
          </div>
        </div>

        <button 
          onclick="openRechargeModal('${plan.name}', ${plan.price}, '${plan.validity}')"
          class="w-full py-3 px-4 rounded-xl font-semibold text-sm gradient-jio-btn flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-blue-500/40">
          <span>Recharge Now</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
      `;
      container.appendChild(card);
    });
  }

  window.resetPlanFilters = () => {
    activeCategory = 'all';
    activeTag = 'all';
    catButtons.forEach(b => b.classList.toggle('active', b.dataset.planCat === 'all'));
    filterPills.forEach(p => p.classList.toggle('bg-blue-600', p.dataset.planFilter === 'all'));
    renderPlans();
  };

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.planCat;
      renderPlans();
    });
  });

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('bg-blue-600', 'text-white');
        p.classList.add('bg-white/5', 'text-slate-400');
      });
      pill.classList.remove('bg-white/5', 'text-slate-400');
      pill.classList.add('bg-blue-600', 'text-white');
      activeTag = pill.dataset.planFilter;
      renderPlans();
    });
  });

  renderPlans();
}

/* --------------------------------------------------------------------------
   4. INTERACTIVE 5G COVERAGE / CITY CHECKER
   -------------------------------------------------------------------------- */
const CITIES_DATA = [
  { name: 'Mumbai', state: 'Maharashtra', sa5g: true, avgSpeed: '1,120 Mbps', towerDist: '120 meters', latency: '4 ms', bands: 'n28 (700MHz), n78 (3.5GHz), n258 (26GHz)' },
  { name: 'New Delhi / NCR', state: 'Delhi', sa5g: true, avgSpeed: '1,240 Mbps', towerDist: '95 meters', latency: '3 ms', bands: 'n28, n78, n258' },
  { name: 'Bengaluru', state: 'Karnataka', sa5g: true, avgSpeed: '1,310 Mbps', towerDist: '80 meters', latency: '2 ms', bands: 'n28, n78, n258' },
  { name: 'Hyderabad', state: 'Telangana', sa5g: true, avgSpeed: '1,180 Mbps', towerDist: '140 meters', latency: '4 ms', bands: 'n28, n78' },
  { name: 'Chennai', state: 'Tamil Nadu', sa5g: true, avgSpeed: '1,090 Mbps', towerDist: '110 meters', latency: '5 ms', bands: 'n28, n78' },
  { name: 'Kolkata', state: 'West Bengal', sa5g: true, avgSpeed: '1,050 Mbps', towerDist: '150 meters', latency: '5 ms', bands: 'n28, n78' },
  { name: 'Pune', state: 'Maharashtra', sa5g: true, avgSpeed: '1,150 Mbps', towerDist: '130 meters', latency: '4 ms', bands: 'n28, n78' },
  { name: 'Ahmedabad', state: 'Gujarat', sa5g: true, avgSpeed: '1,210 Mbps', towerDist: '105 meters', latency: '3 ms', bands: 'n28, n78, n258' },
  { name: 'Jaipur', state: 'Rajasthan', sa5g: true, avgSpeed: '980 Mbps', towerDist: '170 meters', latency: '6 ms', bands: 'n28, n78' },
  { name: 'Chandigarh', state: 'Punjab/Haryana', sa5g: true, avgSpeed: '1,140 Mbps', towerDist: '115 meters', latency: '4 ms', bands: 'n28, n78' },
  { name: 'Lucknow', state: 'Uttar Pradesh', sa5g: true, avgSpeed: '1,020 Mbps', towerDist: '160 meters', latency: '5 ms', bands: 'n28, n78' },
  { name: 'Kochi', state: 'Kerala', sa5g: true, avgSpeed: '1,070 Mbps', towerDist: '125 meters', latency: '4 ms', bands: 'n28, n78' },
  { name: 'Indore', state: 'Madhya Pradesh', sa5g: true, avgSpeed: '1,010 Mbps', towerDist: '180 meters', latency: '6 ms', bands: 'n28, n78' }
];

function initCoverageChecker() {
  const input = document.getElementById('coverage-city-input');
  const suggestionsBox = document.getElementById('city-suggestions-box');
  const resultCard = document.getElementById('coverage-result-card');

  if (!input || !resultCard) return;

  function showCity(city) {
    resultCard.classList.remove('hidden');
    resultCard.innerHTML = `
      <div class="glass-panel p-6 border-blue-500/40 relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-2xl font-bold text-white">${city.name}</h4>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-semibold">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> 100% True 5G Active
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-1">${city.state} • Standalone Network Grid</p>
          </div>
          <button onclick="showToast('📍 Auto-locating nearest 5G tower in ${city.name} (${city.towerDist})')" class="px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-300 text-xs font-semibold cursor-pointer">
            Locate Nearest Tower
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
          <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span class="text-xs text-slate-400 block mb-1">Avg 5G Download</span>
            <span class="text-lg font-bold text-cyan-400">${city.avgSpeed}</span>
          </div>
          <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span class="text-xs text-slate-400 block mb-1">Edge Latency</span>
            <span class="text-lg font-bold text-emerald-400">${city.latency}</span>
          </div>
          <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span class="text-xs text-slate-400 block mb-1">Nearest Tower</span>
            <span class="text-lg font-bold text-white">${city.towerDist}</span>
          </div>
          <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span class="text-xs text-slate-400 block mb-1">Architecture</span>
            <span class="text-lg font-bold text-blue-400">Standalone (SA)</span>
          </div>
        </div>

        <div class="mt-4 pt-3 flex items-center justify-between text-xs text-slate-400">
          <span>Active Frequencies: <strong class="text-slate-300">${city.bands}</strong></span>
          <span class="text-emerald-400 font-medium">JioAirFiber Ready ✓</span>
        </div>
      </div>
    `;
    if (suggestionsBox) suggestionsBox.classList.add('hidden');
  }

  // Pre-load Delhi by default
  showCity(CITIES_DATA[1]);

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      if (suggestionsBox) suggestionsBox.classList.add('hidden');
      return;
    }

    const matches = CITIES_DATA.filter(c => c.name.toLowerCase().includes(query) || c.state.toLowerCase().includes(query));
    if (matches.length > 0 && suggestionsBox) {
      suggestionsBox.innerHTML = '';
      suggestionsBox.classList.remove('hidden');
      matches.forEach(city => {
        const item = document.createElement('div');
        item.className = 'px-4 py-2.5 hover:bg-blue-600/20 cursor-pointer flex items-center justify-between border-b border-white/5 last:border-0';
        item.innerHTML = `<span class="text-sm font-medium text-white">${city.name}</span><span class="text-xs text-slate-400">${city.state}</span>`;
        item.addEventListener('click', () => {
          input.value = city.name;
          showCity(city);
        });
        suggestionsBox.appendChild(item);
      });
    } else if (suggestionsBox) {
      suggestionsBox.innerHTML = `<div class="px-4 py-3 text-xs text-slate-400">True 5G is live nationwide! Coverage confirmed for ${query}.</div>`;
      suggestionsBox.classList.remove('hidden');
    }
  });

  document.addEventListener('click', (e) => {
    if (suggestionsBox && !input.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.classList.add('hidden');
    }
  });
}

/* --------------------------------------------------------------------------
   5. RECHARGE MODAL & CHECKOUT SIMULATOR
   -------------------------------------------------------------------------- */
let activeModalPlan = { name: 'True 5G Unlimited Binge', price: 349, validity: '28 Days' };

function initRechargeModal() {
  const modal = document.getElementById('recharge-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const payBtn = document.getElementById('confirm-pay-btn');
  const phoneInput = document.getElementById('recharge-phone-input');
  const promoInput = document.getElementById('promo-code-input');
  const applyPromoBtn = document.getElementById('apply-promo-btn');
  const discountRow = document.getElementById('discount-row');
  const discountAmt = document.getElementById('discount-amount');
  const finalTotal = document.getElementById('final-total-amount');

  if (!modal) return;

  window.openRechargeModal = (name, price, validity) => {
    activeModalPlan = { name, price, validity };
    const titleEl = document.getElementById('modal-plan-title');
    const priceEl = document.getElementById('modal-plan-price');
    const validityEl = document.getElementById('modal-plan-validity');

    if (titleEl) titleEl.textContent = name;
    if (priceEl) priceEl.textContent = `₹${price}`;
    if (validityEl) validityEl.textContent = validity;
    if (finalTotal) finalTotal.textContent = `₹${price}`;
    if (discountRow) discountRow.classList.add('hidden');
    if (promoInput) promoInput.value = '';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (applyPromoBtn) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'JIO5G' || code === 'TRUE5G') {
        const discount = 50;
        const total = Math.max(activeModalPlan.price - discount, 0);
        discountRow.classList.remove('hidden');
        discountAmt.textContent = `-₹${discount}`;
        finalTotal.textContent = `₹${total}`;
        showToast('🎉 Promo code JIO5G applied! ₹50 Instant discount.');
      } else {
        showToast('⚠️ Invalid coupon. Try using code: JIO5G');
      }
    });
  }

  if (payBtn) {
    payBtn.addEventListener('click', () => {
      const phone = phoneInput ? phoneInput.value.trim() : '';
      if (!phone || phone.length < 10) {
        showToast('⚠️ Please enter a valid 10-digit Jio mobile number.');
        if (phoneInput) phoneInput.focus();
        return;
      }

      payBtn.disabled = true;
      payBtn.innerHTML = `<span class="inline-block animate-spin mr-2">🔄</span> Processing Instant Recharge...`;

      setTimeout(() => {
        payBtn.disabled = false;
        payBtn.innerHTML = `Confirm & Pay`;
        closeModal();
        showToast(`✅ Recharge Successful for +91 ${phone}! Plan active.`);
      }, 1500);
    });
  }
}

/* --------------------------------------------------------------------------
   6. THEME TOGGLE (DARK / LIGHT)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('jio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('jio-theme', next);
    updateThemeIcon(next);
    showToast(`Switched to ${next.toUpperCase()} mode`);
  });

  function updateThemeIcon(theme) {
    const sunIcon = toggleBtn.querySelector('.sun-icon');
    const moonIcon = toggleBtn.querySelector('.moon-icon');
    if (sunIcon && moonIcon) {
      if (theme === 'light') {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      }
    }
  }
}

/* --------------------------------------------------------------------------
   7. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');

      // Close all others
      faqItems.forEach(other => {
        const otherContent = other.querySelector('.faq-content');
        const otherIcon = other.querySelector('.faq-icon');
        if (otherContent) otherContent.classList.add('hidden');
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('close-drawer-btn');
  const links = drawer ? drawer.querySelectorAll('a') : [];

  if (!menuBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.add('translate-x-full');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  links.forEach(l => l.addEventListener('click', closeDrawer));
}

/* --------------------------------------------------------------------------
   9. 3D TILT EFFECT ON CARDS
   -------------------------------------------------------------------------- */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 12;
      const rotateY = (x / rect.width) * 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* --------------------------------------------------------------------------
   10. TOAST ALERT SYSTEM
   -------------------------------------------------------------------------- */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="text-blue-400 font-bold text-base">●</span>
    <span class="text-xs sm:text-sm font-medium">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// Global exposure for inline events
window.showToast = showToast;
