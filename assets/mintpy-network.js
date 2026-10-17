/* 仿 MintPy plot_network.py 的"network"图（可复用组件，数据为模拟）
 * MintPy 原图：横轴日期、纵轴垂直基线 [m]；黑点 = 影像；实线 = 保留的干涉对，按平均空间相干性着色
 * （默认色表 RdBu_truncate：红 = 低、蓝 = 高）；虚线 = 被剔除的干涉对（"Ifgram dropped"）。
 * 剔除规则仿 MintPy 的 coherence-based 网络修正（mintpy.network.coherenceBased，默认关闭，需手动设为 yes；阈值 minCoherence 默认 0.7）：
 *   平均相干性 < 0.7 且不在最小生成树（权重 = 1/相干性）里的干涉对被剔除。P08 就用了这套规则（P08 p.4）。
 * 依据：MintPy smallbaselineApp.cfg 第 1 节、utils/plot.py 中 plot_network()。
 * 用法：MintpyNetwork.mount(rootEl)；容器内需要 canvas、input[name=k]、.k-val、.readout、.tip
 */
window.MintpyNetwork = {
  mount(root) {
    const cv = root.querySelector('canvas'), ctx = cv.getContext('2d');
    const kIn = root.querySelector('input[name=k]'), kV = root.querySelector('.k-val');
    const out = root.querySelector('.readout'), tip = root.querySelector('.tip');
    const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const W = cv.width, H = cv.height, L = 58, R = W - 90, T = 22, B = H - 42;

    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const gauss = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
    const N = 61, t0 = Date.UTC(2021, 0, 3);
    const dates = Array.from({ length: N }, (_, i) => { const d = new Date(t0 + i * 12 * 86400000); return { i, d, m: d.getUTCMonth() + 1, b: Math.max(-110, Math.min(110, gauss() * 40)) }; });
    const noise = Array.from({ length: N * 8 }, gauss);
    const summer = m => m >= 6 && m <= 9;
    const X = i => L + (R - L) * i / (N - 1), Y = b => T + (B - T) * (1 - (b + 125) / 250);
    const fmt = d => `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;

    // 相干性色表：红(低) → 浅灰 → 蓝(高)，范围 0.2–1.0（仿 MintPy 默认显示范围）
    const C0 = [178, 34, 34], C1 = [215, 212, 200], C2 = [33, 102, 172];
    const mix = (a, b, t) => a.map((v, n) => Math.round(v + (b[n] - v) * t));
    const color = c => { const t = Math.max(0, Math.min(1, (c - .2) / .8)); const rgb = t < .5 ? mix(C0, C1, t / .5) : mix(C1, C2, (t - .5) / .5); return `rgb(${rgb})`; };

    let net = null;
    function build(k) {
      const pairs = [];
      for (let i = 0; i < N; i++) for (let j = i + 1; j <= Math.min(N - 1, i + k); j++) {
        // 模拟农田为主的区域：间隔越长越低；任一景在夏季再打折
        let c = .92 * Math.exp(-(j - i) * 12 / 70);
        if (summer(dates[i].m) || summer(dates[j].m)) c *= .72;
        c = Math.max(.15, Math.min(.98, c + noise[i * 8 + (j - i)] * .04));
        pairs.push({ a: i, b: j, c });
      }
      // 最小生成树（Kruskal，权重 = 1/相干性）
      const p = dates.map((_, i) => i), f = x => p[x] === x ? x : (p[x] = f(p[x]));
      [...pairs].sort((u, v) => v.c - u.c).forEach(e => { const ra = f(e.a), rb = f(e.b); if (ra !== rb) { p[ra] = rb; e.mst = true; } });
      pairs.forEach(e => { e.drop = e.c < .7 && !e.mst; });
      return pairs;
    }
    function draw(hi) {
      const fg = css('--fg'), mut = css('--muted');
      ctx.fillStyle = css('--card'); ctx.fillRect(0, 0, W, H);
      dates.forEach((d, i) => { if (summer(d.m)) { ctx.fillStyle = '#c58a1a'; ctx.globalAlpha = .08; ctx.fillRect(X(i) - 4, T, 8, B - T); ctx.globalAlpha = 1; } });
      ctx.strokeStyle = mut; ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.lineTo(R, B); ctx.stroke();
      ctx.fillStyle = mut; ctx.font = '11px sans-serif';
      [-100, -50, 0, 50, 100].forEach(b => ctx.fillText(String(b), L - 30, Y(b) + 4));
      ctx.fillText('垂直基线 [m]', 4, T - 8);
      ['2021-01', '2021-07', '2022-01', '2022-07', '2023-01'].forEach((s, n) => ctx.fillText(s, L + (R - L) * n / 4 - 20, B + 16));
      ctx.fillStyle = '#8a5f10'; ctx.fillText('浅黄竖条 = 夏季 6–9 月', L + 6, B + 32);
      // 先画被剔除的（虚线），再画保留的（实线）
      net.filter(e => e.drop).forEach(e => { ctx.strokeStyle = mut; ctx.globalAlpha = .55; ctx.setLineDash([4, 3]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(e.a), Y(dates[e.a].b)); ctx.lineTo(X(e.b), Y(dates[e.b].b)); ctx.stroke(); });
      ctx.setLineDash([]); ctx.globalAlpha = 1;
      net.filter(e => !e.drop).forEach(e => { ctx.strokeStyle = color(e.c); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(e.a), Y(dates[e.a].b)); ctx.lineTo(X(e.b), Y(dates[e.b].b)); ctx.stroke(); });
      if (hi) { ctx.strokeStyle = fg; ctx.lineWidth = 3.5; ctx.setLineDash(hi.drop ? [4, 3] : []); ctx.beginPath(); ctx.moveTo(X(hi.a), Y(dates[hi.a].b)); ctx.lineTo(X(hi.b), Y(dates[hi.b].b)); ctx.stroke(); ctx.setLineDash([]); }
      ctx.lineWidth = 1;
      dates.forEach((d, i) => { ctx.fillStyle = css('--card'); ctx.beginPath(); ctx.arc(X(i), Y(d.b), 4.5, 0, 7); ctx.fill(); ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(X(i), Y(d.b), 3, 0, 7); ctx.fill(); });
      // 色条
      const cx = R + 26, cy0 = T + 10, ch = B - T - 30;
      for (let y = 0; y < ch; y++) { ctx.fillStyle = color(.2 + .8 * (1 - y / ch)); ctx.fillRect(cx, cy0 + y, 14, 1); }
      ctx.fillStyle = mut; ctx.font = '11px sans-serif';
      [1, .6, .2].forEach(v => ctx.fillText(v.toFixed(1), cx + 18, cy0 + ch * (1 - (v - .2) / .8) + 4));
      ctx.save(); ctx.translate(cx + 52, cy0 + ch / 2 + 40); ctx.rotate(-Math.PI / 2); ctx.fillText('平均空间相干性', 0, 0); ctx.restore();
    }
    function update() {
      const k = Number(kIn.value); kV.textContent = k + ' 对'; net = build(k); draw();
      const nd = net.filter(e => e.drop).length;
      out.innerHTML = `${N} 期 × 每期往后配 ${k} 对 → <b>${net.length}</b> 个干涉对；按 MintPy 的相干性规则（阈值 0.7 + 最小生成树，P08 用的就是这套）剔除 <b>${nd}</b> 个（虚线），保留 ${net.length - nd} 个。` +
        '<br>注意虚线多集中在<b>夏季</b>和<b>间隔长</b>的对上；剔掉后网络仍然是连通的，因为最小生成树里的对一个都不删。';
    }
    cv.addEventListener('mousemove', ev => {
      const r = cv.getBoundingClientRect(), sx = cv.width / r.width, mx = (ev.clientX - r.left) * sx, my = (ev.clientY - r.top) * sx;
      let best = null, bd = 9;
      net.forEach(e => {   // 点到线段距离
        const x1 = X(e.a), y1 = Y(dates[e.a].b), x2 = X(e.b), y2 = Y(dates[e.b].b), dx = x2 - x1, dy = y2 - y1;
        const t = Math.max(0, Math.min(1, ((mx - x1) * dx + (my - y1) * dy) / (dx * dx + dy * dy)));
        const d = Math.hypot(mx - x1 - t * dx, my - y1 - t * dy); if (d < bd) { bd = d; best = e; }
      });
      draw(best);
      if (best) {
        tip.style.display = 'block';
        tip.style.left = (ev.clientX - r.left + 14) + 'px'; tip.style.top = (ev.clientY - r.top + 14) + 'px';
        tip.innerHTML = `${fmt(dates[best.a].d)} → ${fmt(dates[best.b].d)}<br>间隔 ${(best.b - best.a) * 12} 天 · 相干性 ${best.c.toFixed(2)}<br>${best.drop ? '已剔除（<0.7 且不在最小生成树里）' : best.mst && best.c < .7 ? '保留（相干性低，但在最小生成树里）' : '保留'}`;
      } else tip.style.display = 'none';
    });
    cv.addEventListener('mouseleave', () => { tip.style.display = 'none'; draw(); });
    kIn.addEventListener('input', update);
    update();
  }
};
