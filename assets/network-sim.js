/* 干涉配对网络模拟器（可复用组件）
 * 横轴：拍摄日期；纵轴：垂直基线（卫星位置偏差，模拟值）。每条线 = 一个干涉对。
 * 可调：每期向后配几对（k）、是否剔除"两景都在夏季（6–9 月）"的干涉对（P06 的做法）。
 * 统计：干涉对数、HyP3 额度（每对 10）、网络被切成几段（连通分量）、可做相位闭合检查的三角形数。
 * 用法：NetworkSim.mount(rootEl)；容器内需要 canvas、input[name=k]、input[name=summer]、.k-val、.readout
 */
window.NetworkSim = {
  mount(root) {
    const cv = root.querySelector('canvas'), ctx = cv.getContext('2d');
    const kIn = root.querySelector('input[name=k]'), sIn = root.querySelector('input[name=summer]');
    const kV = root.querySelector('.k-val'), out = root.querySelector('.readout');
    const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

    // 两年、12 天一期；垂直基线用固定种子的伪随机数（Sentinel-1 轨道控制得很紧，基线大多在 ±100 m 以内）
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const gauss = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
    const start = new Date(Date.UTC(2021, 0, 3)), N = 61;
    const dates = Array.from({ length: N }, (_, i) => {
      const d = new Date(start.getTime() + i * 12 * 86400000);
      return { i, d, m: d.getUTCMonth() + 1, b: Math.max(-110, Math.min(110, gauss() * 40)) };
    });
    const summer = m => m >= 6 && m <= 9;

    function build(k, dropSummer) {
      const pairs = [];
      for (let i = 0; i < N; i++) for (let j = i + 1; j <= Math.min(N - 1, i + k); j++) {
        if (dropSummer && summer(dates[i].m) && summer(dates[j].m)) continue;
        pairs.push([i, j]);
      }
      // 连通分量（并查集）
      const p = dates.map((_, i) => i), f = x => p[x] === x ? x : (p[x] = f(p[x]));
      pairs.forEach(([a, b]) => { p[f(a)] = f(b); });
      const comps = new Map(); dates.forEach((_, i) => { const r = f(i); comps.set(r, (comps.get(r) || 0) + 1); });
      const isolated = [...comps.values()].filter(v => v === 1).length;
      // 三角形（i<j<l 且三条边都在）
      const set = new Set(pairs.map(([a, b]) => a + '-' + b)); let tri = 0;
      for (const [a, b] of pairs) for (let l = b + 1; l <= Math.min(N - 1, a + k); l++) if (set.has(b + '-' + l) && set.has(a + '-' + l)) tri++;
      return { pairs, comps: comps.size, isolated, tri, root: f };
    }

    function draw() {
      const k = Number(kIn.value), dropS = sIn.checked; kV.textContent = k + ' 对';
      const net = build(k, dropS);
      const W = cv.width, H = cv.height, L = 50, R = W - 20, T = 20, B = H - 40;
      const fg = css('--fg') || '#222', mut = css('--muted') || '#888', acc = css('--accent') || '#a33', card = css('--card') || '#fff';
      ctx.clearRect(0, 0, W, H); ctx.fillStyle = card; ctx.fillRect(0, 0, W, H);
      const X = i => L + (R - L) * i / (N - 1), Y = b => T + (B - T) * (1 - (b + 120) / 240);
      // 夏季背景
      dates.forEach((d, i) => { if (summer(d.m)) { ctx.fillStyle = '#c58a1a'; ctx.globalAlpha = .1; ctx.fillRect(X(i) - 4, T, 8, B - T); ctx.globalAlpha = 1; } });
      // 坐标轴
      ctx.strokeStyle = mut; ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.lineTo(R, B); ctx.stroke();
      ctx.fillStyle = mut; ctx.font = '11px sans-serif';
      [-100, 0, 100].forEach(b => { ctx.fillText(b + ' m', 8, Y(b) + 4); ctx.setLineDash([2, 4]); ctx.beginPath(); ctx.moveTo(L, Y(b)); ctx.lineTo(R, Y(b)); ctx.stroke(); ctx.setLineDash([]); });
      ['2021-01', '2021-07', '2022-01', '2022-07', '2023-01'].forEach((s, n) => ctx.fillText(s, L + (R - L) * n / 4 - 18, B + 16));
      ctx.fillText('垂直基线', 4, T - 6); ctx.fillText('拍摄日期 →', R - 60, B + 32);
      ctx.fillStyle = '#c58a1a'; ctx.fillText('浅黄色竖条 = 夏季（6–9 月）', L + 6, B + 32);
      // 连通分量配色：最大的那一段用蓝色，其余用强调色
      const sizes = {}; dates.forEach((_, i) => { const r = net.root(i); sizes[r] = (sizes[r] || 0) + 1; });
      const main = Object.keys(sizes).reduce((a, b) => sizes[a] >= sizes[b] ? a : b);
      net.pairs.forEach(([a, b]) => {
        ctx.strokeStyle = String(net.root(a)) === main ? '#3a6ea5' : acc; ctx.globalAlpha = .55;
        ctx.beginPath(); ctx.moveTo(X(a), Y(dates[a].b)); ctx.lineTo(X(b), Y(dates[b].b)); ctx.stroke(); ctx.globalAlpha = 1;
      });
      dates.forEach((d, i) => {
        const iso = sizes[net.root(i)] === 1;
        ctx.fillStyle = iso ? acc : fg; ctx.beginPath(); ctx.arc(X(i), Y(d.b), iso ? 4.5 : 3, 0, 2 * Math.PI); ctx.fill();
        if (iso) { ctx.strokeStyle = acc; ctx.beginPath(); ctx.arc(X(i), Y(d.b), 7, 0, 2 * Math.PI); ctx.stroke(); }
      });

      const warn = net.comps > 1
        ? `<b style="color:var(--accent)">⚠ 网络被切成了 ${net.comps} 段</b>（其中 ${net.isolated} 期成了"孤岛"，红圈）。不同段之间没有干涉对相连，彼此的形变就没法接起来。`
        : '<b style="color:var(--ok)">✓ 网络是连通的</b>：任意两期之间都能通过干涉对一步步连起来。';
      const loop = net.tri === 0
        ? '<b style="color:var(--accent)">没有任何三角形</b>：做不了相位闭合检查，解缠错了也发现不了。'
        : `有 <b>${net.tri}</b> 个三角形可以做相位闭合检查。`;
      out.innerHTML = `61 期影像（两年、12 天一期，模拟）→ <b>${net.pairs.length}</b> 个干涉对 → HyP3 约 <b>${net.pairs.length * 10}</b> 个额度（单个 frame，80 m）。<br>${warn}<br>${loop}`;
    }
    kIn.addEventListener('input', draw); sIn.addEventListener('change', draw);
    draw();
  }
};
