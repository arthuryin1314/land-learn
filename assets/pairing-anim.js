/* "每期往后配 k 对"逐步动画（可复用组件）
 * 8 期影像排在时间轴上（12 天一期）。逐对演示：第 i 期依次和它后面的 1…k 期配成一对，
 * 每一对 = 两景相减 = 产出一张干涉图（下方列表里多一张）。
 * 用法：PairingAnim.mount(rootEl)；容器内需要 canvas、input[name=k]、.k-val、button.play、button.step、button.reset、.readout
 */
window.PairingAnim = {
  mount(root) {
    const cv = root.querySelector('canvas'), ctx = cv.getContext('2d');
    const kIn = root.querySelector('input[name=k]'), kV = root.querySelector('.k-val');
    const bPlay = root.querySelector('button.play'), bStep = root.querySelector('button.step'), bReset = root.querySelector('button.reset');
    const out = root.querySelector('.readout');
    const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const SPAN = ['#3a6ea5', '#2f8a5a', '#8a4fb0'];   // 间隔 12 / 24 / 36 天的弧线颜色
    const W = cv.width, H = cv.height, N = 8, L = 60, R = W - 60, X = i => L + (R - L) * i / (N - 1), TY = 150;
    const T0 = Date.UTC(2021, 0, 3);
    const date = i => { const t = new Date(T0 + i * 12 * 86400000); return `${t.getUTCMonth() + 1}/${t.getUTCDate()}`; };
    let pairs = [], shown = 0, timer = null;

    function build() {
      const k = Number(kIn.value); pairs = [];
      for (let i = 0; i < N; i++) for (let m = 1; m <= k && i + m < N; m++) pairs.push([i, i + m]);
      shown = 0; kV.textContent = k + ' 对';
    }
    function draw() {
      const fg = css('--fg'), mut = css('--muted'), acc = css('--accent'), blue = '#3a6ea5';
      ctx.fillStyle = css('--card'); ctx.fillRect(0, 0, W, H);
      const cur = shown > 0 ? pairs[shown - 1] : null;
      // 已配好的对：弧线
      pairs.slice(0, shown).forEach(([a, b], n) => {
        const isCur = n === shown - 1, mx = (X(a) + X(b)) / 2, r = (X(b) - X(a)) / 2;
        ctx.strokeStyle = isCur ? acc : SPAN[b - a - 1]; ctx.lineWidth = isCur ? 3 : 2; ctx.globalAlpha = isCur ? 1 : .85;
        ctx.beginPath(); ctx.ellipse(mx, TY - 22, r, Math.min(95, 22 + r * .55), 0, Math.PI, 2 * Math.PI); ctx.stroke();
        ctx.globalAlpha = 1; ctx.lineWidth = 1;
        if (isCur) { ctx.fillStyle = acc; ctx.font = 'bold 12px sans-serif'; ctx.fillText(`相隔 ${(b - a) * 12} 天`, mx - 28, TY - 30 - Math.min(95, 22 + r * .55)); }
      });
      // 时间轴与影像
      ctx.strokeStyle = mut; ctx.beginPath(); ctx.moveTo(L - 20, TY + 22); ctx.lineTo(R + 20, TY + 22); ctx.stroke();
      for (let i = 0; i < N; i++) {
        const on = cur && (i === cur[0] || i === cur[1]), base = cur && i === cur[0];
        ctx.fillStyle = on ? acc : '#8a8a80'; ctx.globalAlpha = on ? 1 : .75;
        ctx.fillRect(X(i) - 16, TY - 22, 32, 40); ctx.globalAlpha = 1;
        ctx.strokeStyle = base ? fg : 'transparent'; ctx.lineWidth = 2; ctx.strokeRect(X(i) - 18, TY - 24, 36, 44); ctx.lineWidth = 1;
        ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif'; ctx.fillText(String(i + 1), X(i) - 4, TY + 3);
        ctx.fillStyle = mut; ctx.font = '11px sans-serif'; ctx.fillText(date(i), X(i) - 13, TY + 38);
      }
      ctx.fillStyle = mut; ctx.font = '11px sans-serif'; ctx.fillText('每个方块 = 一景影像（一期），12 天一期', L - 20, TY + 56);
      for (let m = 1; m <= Number(kIn.value); m++) { const lx = R - 250 + (m - 1) * 90; ctx.fillStyle = SPAN[m - 1]; ctx.fillRect(lx, TY + 48, 14, 8); ctx.fillStyle = mut; ctx.fillText(`隔 ${m * 12} 天`, lx + 18, TY + 56); }
      // 干涉图列表
      const gy = TY + 76; ctx.fillStyle = fg; ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`产出的干涉图：${shown} 张`, L - 20, gy);
      pairs.slice(0, shown).forEach(([a, b], n) => {
        const col = n % 11, row = Math.floor(n / 11), x = L - 20 + col * 58, y = gy + 10 + row * 26;
        ctx.fillStyle = n === shown - 1 ? acc : SPAN[b - a - 1]; ctx.globalAlpha = n === shown - 1 ? 1 : .8;
        ctx.fillRect(x, y, 52, 20); ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff'; ctx.font = '11px sans-serif'; ctx.fillText(`${a + 1}–${b + 1}`, x + 14, y + 14);
      });
    }
    function caption() {
      const k = Number(kIn.value), total = pairs.length;
      if (shown === 0) { out.innerHTML = `点"下一步"或"播放"。规则：<b>每一期都和它后面的 ${k} 期各配一对</b>。"配一对"就是挑出两景，相减得到一张干涉图（第 1 课）。`; return; }
      const [a, b] = pairs[shown - 1], m = b - a;
      let s = `第 ${a + 1} 期和它后面<b>第 ${m} 期</b>（第 ${b + 1} 期）配成一对 → 两景相减 → 干涉图「${a + 1}–${b + 1}」，时间基线 ${m * 12} 天。`;
      if (m === k || b === N - 1) s += a + 1 < N - 1 ? `<br>第 ${a + 1} 期配完了，轮到第 ${a + 2} 期。` : '';
      if (shown === total) s = `完成：${N} 期影像，每期往后配 ${k} 对 → <b>${total} 张干涉图</b>。最后几期后面没那么多期可配，所以比 ${N}×${k} = ${N * k} 少一点。<br>` +
        (k === 1 ? '只配 1 对时，弧线连成一条链，<b>没有任何三角形</b>（下面的模拟器会告诉你这为什么不行）。' : `看弧线：「1–2」「2–3」「1–3」围成了一个<b>三角形</b>。配得越多，三角形越多，干涉图（和 HyP3 额度）也越多。`);
      out.innerHTML = s;
    }
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } bPlay.textContent = '▶ 播放'; };
    const step = () => { if (shown < pairs.length) { shown++; draw(); caption(); } if (shown >= pairs.length) stop(); };
    bStep.addEventListener('click', () => { stop(); step(); });
    bPlay.addEventListener('click', () => {
      if (timer) { stop(); return; }
      if (shown >= pairs.length) { shown = 0; }
      bPlay.textContent = '⏸ 暂停'; step(); timer = setInterval(step, 1300);
    });
    bReset.addEventListener('click', () => { stop(); shown = 0; draw(); caption(); });
    kIn.addEventListener('input', () => { stop(); build(); draw(); caption(); });
    build(); draw(); caption();
  }
};
