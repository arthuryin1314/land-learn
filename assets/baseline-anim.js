/* 两种基线动画（可复用组件）
 * mode 'temporal'：时间基线。楼房像素基本不变；农田像素里庄稼在长，间隔越长，两景越不像，干涉图噪声越多。
 * mode 'perp'    ：垂直基线。一个像素里有好几个散射体，回波是它们的叠加（复数相加）。
 *                  换个角度看，散射体之间的距离差变了，叠加结果跟着变 → 两次对不上 → 几何失相干。
 * 相干性数值都是示意（时间：指数衰减；垂直：线性降到临界基线为 0），用来看趋势，不是实测值。
 * 用法：BaselineAnim.mount(rootEl, mode)；容器内需要 canvas、input[type=range]、button.play、.val、.readout
 */
window.BaselineAnim = {
  mount(root, mode) {
    const cv = root.querySelector('canvas'), ctx = cv.getContext('2d');
    const slider = root.querySelector('input[type=range]'), btn = root.querySelector('button.play');
    const valEl = root.querySelector('.val'), out = root.querySelector('.readout');
    const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const W = cv.width, H = cv.height;

    // 固定种子的随机数：保证拖动时噪声图案稳定，只是"坏像素"越来越多
    let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const P = 64, uBad = Array.from({ length: P * P }, rnd), uPh = Array.from({ length: P * P }, rnd);

    function hsl2rgb(h, s, l) {
      const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
      const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return [f(0) * 255, f(8) * 255, f(4) * 255];
    }
    // 干涉图小块：一个沉降漏斗的条纹 + 按 (1-γ) 比例随机替换的噪声像素
    function patch(x0, y0, gamma, title) {
      const img = ctx.createImageData(P, P);
      for (let y = 0; y < P; y++) for (let x = 0; x < P; x++) {
        const k = y * P + x, r2 = ((x - P / 2) ** 2 + (y - P / 2) ** 2) / (P * P / 4);
        let ph = (Math.max(0, 1 - r2) * 2.2 * 2 * Math.PI) % (2 * Math.PI);
        if (uBad[k] > gamma) ph = uPh[k] * 2 * Math.PI;
        const [r, g, b] = hsl2rgb(ph / (2 * Math.PI) * 360, .75, .55);
        img.data.set([r, g, b, 255], k * 4);
      }
      ctx.putImageData(img, x0, y0);
      ctx.fillStyle = css('--muted'); ctx.font = '11px sans-serif'; ctx.fillText(title, x0, y0 - 6);
    }
    function bar(x, y, w, gamma, label) {
      const mut = css('--muted'), acc = css('--accent'), ok = css('--ok');
      ctx.fillStyle = css('--rule'); ctx.fillRect(x, y, w, 12);
      ctx.fillStyle = gamma > .6 ? ok : gamma > .3 ? '#c58a1a' : acc; ctx.fillRect(x, y, w * gamma, 12);
      ctx.fillStyle = mut; ctx.font = '11px sans-serif'; ctx.fillText(label, x, y - 6);
      ctx.fillStyle = css('--fg'); ctx.font = 'bold 13px sans-serif'; ctx.fillText(gamma.toFixed(2), x + w + 8, y + 11);
    }

    /* ---------- 时间基线 ---------- */
    const T0 = Date.UTC(2021, 2, 1);
    const fmt = d => { const t = new Date(T0 + d * 86400000); return `${t.getUTCMonth() + 1}月${t.getUTCDate()}日`; };
    function building(x, y) {
      ctx.fillStyle = '#9a9a92'; ctx.fillRect(x, y, 64, 64);
      ctx.fillStyle = '#5d6d7e';
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) ctx.fillRect(x + 6 + i * 15, y + 6 + j * 15, 8, 8);
    }
    function field(x, y, day) {
      ctx.fillStyle = '#8a6a48'; ctx.fillRect(x, y, 64, 64);
      const h = .12 + .88 * Math.min(1, day / 90), ripe = Math.max(0, Math.min(1, (day - 75) / 30));
      ctx.strokeStyle = `rgb(${70 + 150 * ripe},${150 + 40 * ripe},${50})`; ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) for (let j = 0; j < 3; j++) {
        const bx = x + 5 + i * 7.5, by = y + 22 + j * 20;
        ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + (j - 1) * 1.5 * h, by - 18 * h); ctx.stroke();
      }
      ctx.lineWidth = 1;
    }
    function drawTemporal(dt) {
      const fg = css('--fg'), mut = css('--muted'), acc = css('--accent');
      ctx.fillStyle = css('--card'); ctx.fillRect(0, 0, W, H);
      // 时间轴：12 天一期
      const L = 120, R = W - 40, X = d => L + (R - L) * d / 120, ty = 36;
      ctx.strokeStyle = mut; ctx.beginPath(); ctx.moveTo(L, ty); ctx.lineTo(R, ty); ctx.stroke();
      ctx.font = '11px sans-serif';
      for (let d = 0; d <= 120; d += 12) { ctx.fillStyle = d === 0 || d === dt ? acc : mut; ctx.beginPath(); ctx.arc(X(d), ty, d === 0 || d === dt ? 5 : 2.5, 0, 7); ctx.fill(); }
      ctx.fillStyle = mut; ctx.fillText('拍摄日期（12 天一期）', 8, ty + 4);
      ctx.fillStyle = acc; ctx.fillText('影像 1', X(0) - 16, ty - 10); ctx.fillText('影像 2', X(dt) - 16, ty - 10);
      ctx.strokeStyle = acc; ctx.beginPath(); ctx.moveTo(X(0), ty + 12); ctx.lineTo(X(dt), ty + 12); ctx.stroke();
      ctx.fillText(`时间基线 ${dt} 天`, (X(0) + X(dt)) / 2 - 34, ty + 26);

      const rows = [
        { name: '楼房', y: 92, draw: (x, y) => building(x, y), g: Math.exp(-dt / 1500) },
        { name: '农田', y: 192, draw: (x, y, d) => field(x, y, d), g: Math.exp(-dt / 45) },
      ];
      rows.forEach(r => {
        ctx.fillStyle = fg; ctx.font = 'bold 14px sans-serif'; ctx.fillText(r.name, 16, r.y + 36);
        r.draw(70, r.y, 0); r.draw(150, r.y, dt);
        ctx.fillStyle = mut; ctx.font = '11px sans-serif';
        ctx.fillText(fmt(0), 70, r.y - 6); ctx.fillText(fmt(dt), 150, r.y - 6);
        ctx.fillText('相减 →', 228, r.y + 36);
        patch(280, r.y, r.g, '干涉图');
        bar(380, r.y + 26, 220, r.g, '相干性（示意）');
      });
      valEl.textContent = dt + ' 天';
      const gf = rows[1].g;
      out.innerHTML = gf > .6
        ? `间隔 ${dt} 天：麦子只长了一点，两景还"认得出是同一块地"。农田相干性约 <b>${gf.toFixed(2)}</b>，条纹清楚。`
        : gf > .3
          ? `间隔 ${dt} 天：麦子明显长高了，农田的干涉图开始出现<b>雪花点</b>（相干性约 ${gf.toFixed(2)}）。楼房几乎不受影响。`
          : `间隔 ${dt} 天：麦子从返青长到抽穗、变黄，两景拍的已经"不是同一个东西"。农田<b>时间失相干</b>，条纹几乎看不见（${gf.toFixed(2)}）；楼房仍然清楚（${rows[0].g.toFixed(2)}）。`;
    }

    /* ---------- 垂直基线 ---------- */
    const S1 = { x: 60, y: 120 }, C = { x: 320, y: 252 }, LAM = 20, BC = 70;
    const scat = [[-19, -2], [-11, -6], [-4, -1], [3, -7], [9, -3], [16, -5], [20, -1]].map(([dx, dy]) => ({ x: C.x + dx, y: C.y + dy }));
    const u0 = (() => { const dx = C.x - S1.x, dy = C.y - S1.y, n = Math.hypot(dx, dy); return { x: dx / n, y: dy / n }; })();
    const nrm = { x: u0.y, y: -u0.x };                    // 垂直于视线、指向右上
    function phasors(S) {                                 // 每个散射体相对像素中心的往返相位
      const d0 = Math.hypot(C.x - S.x, C.y - S.y);
      return scat.map(p => 2 * Math.PI * 2 * (Math.hypot(p.x - S.x, p.y - S.y) - d0) / LAM);
    }
    function phasorPlot(cx, cy, phs, title, color) {
      const mut = css('--muted'), L = 13;
      ctx.strokeStyle = css('--rule'); ctx.beginPath(); ctx.arc(cx, cy, 52, 0, 7); ctx.stroke();
      let x = cx - 0, y = cy;
      ctx.strokeStyle = mut;
      phs.forEach(ph => { const nx = x + L * Math.cos(ph), ny = y - L * Math.sin(ph); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(nx, ny); ctx.stroke(); ctx.beginPath(); ctx.arc(nx, ny, 1.6, 0, 7); ctx.fillStyle = mut; ctx.fill(); x = nx; y = ny; });
      ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, 7); ctx.fill();
      ctx.fillStyle = mut; ctx.font = '11px sans-serif'; ctx.fillText(title, cx - 52, cy - 60);
    }
    function drawPerp(b) {
      const fg = css('--fg'), mut = css('--muted'), acc = css('--accent'), blue = '#3a6ea5';
      ctx.fillStyle = css('--card'); ctx.fillRect(0, 0, W, H);
      const S2 = { x: S1.x + nrm.x * b, y: S1.y + nrm.y * b };
      // 地面与像素
      ctx.fillStyle = '#8a6a48'; ctx.globalAlpha = .18; ctx.fillRect(10, C.y, 420, H - C.y); ctx.globalAlpha = 1;
      ctx.strokeStyle = '#8a6a48'; ctx.beginPath(); ctx.moveTo(10, C.y); ctx.lineTo(430, C.y); ctx.stroke();
      ctx.strokeStyle = mut; ctx.setLineDash([3, 3]); ctx.strokeRect(C.x - 24, C.y - 12, 48, 18); ctx.setLineDash([]);
      ctx.fillStyle = mut; ctx.font = '11px sans-serif'; ctx.fillText('一个像素（里面有好几个散射体）', C.x - 70, C.y + 26);
      // 管道（示意）
      ctx.strokeStyle = '#c58a1a'; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.arc(S1.x, S1.y, 7, 0, 7); ctx.stroke(); ctx.setLineDash([]);
      // 视线
      [[S1, blue], [S2, acc]].forEach(([S, c]) => { ctx.strokeStyle = c; ctx.globalAlpha = .7; ctx.beginPath(); ctx.moveTo(S.x, S.y); ctx.lineTo(C.x, C.y); ctx.stroke(); ctx.globalAlpha = 1; });
      // 卫星
      const sat = (S, c, t) => { ctx.fillStyle = c; ctx.fillRect(S.x - 9, S.y - 5, 18, 10); ctx.fillRect(S.x - 24, S.y - 2, 12, 4); ctx.fillRect(S.x + 12, S.y - 2, 12, 4); ctx.font = '12px sans-serif'; ctx.fillText(t, S.x + 28, S.y + 4); };
      sat(S1, blue, '第 1 次'); if (b > 0) sat(S2, acc, '第 2 次');
      if (b > 0) { ctx.strokeStyle = fg; ctx.setLineDash([2, 2]); ctx.beginPath(); ctx.moveTo(S1.x, S1.y); ctx.lineTo(S2.x, S2.y); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = fg; ctx.font = '11px sans-serif'; ctx.fillText('垂直基线', Math.min(S1.x, S2.x) - 8, Math.min(S1.y, S2.y) - 14); }
      scat.forEach(p => { ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(p.x, p.y, 2.6, 0, 7); ctx.fill(); });
      // 回波叠加（复数相加）
      phasorPlot(510, 92, phasors(S1), '第 1 次收到的回波', blue);
      phasorPlot(650, 92, phasors(S2), '第 2 次收到的回波', acc);
      ctx.fillStyle = mut; ctx.font = '11px sans-serif'; ctx.fillText('灰色小箭头 = 每个散射体的回波', 448, 166); ctx.fillText('彩色粗箭头 = 叠加结果', 448, 181);
      const g = Math.max(0, 1 - b / BC);
      patch(450, 214, g, '干涉图');
      bar(540, 240, 120, g, '相干性（示意）');
      valEl.textContent = b === 0 ? '0' : b + (b >= BC ? '（已超临界基线）' : '');
      out.innerHTML = b <= 7
        ? '位置差很小（落在<span style="color:#c58a1a">黄色虚线圈</span>里，相当于 Sentinel-1 的轨道"管道"，示意）：两次看这个像素的角度几乎一样，两个粗箭头基本重合，几何失相干可以忽略。'
        : b < BC * .6
          ? '位置差变大：从新角度看，像素里各散射体到卫星的距离差变了，<b>灰色小箭头的相对方向变了，叠加出的粗箭头也变了</b>。两次的回波开始"对不上"，干涉图出现雪花点。'
          : b < BC
            ? '接近<b>临界基线</b>：两个粗箭头已经没什么关系了，干涉图大部分是噪声。论文里设"垂直基线阈值"（如 P05 的 200 m）就是为了离这里远一点。'
            : '超过<b>临界基线</b>：两次回波完全无关，<b>几何失相干</b>，干涉图全是噪声。';
    }

    const draw = () => (mode === 'temporal' ? drawTemporal : drawPerp)(Number(slider.value));
    let timer = null;
    btn.addEventListener('click', () => {
      if (timer) { clearInterval(timer); timer = null; btn.textContent = '▶ 播放'; return; }
      if (Number(slider.value) >= Number(slider.max)) slider.value = slider.min;
      btn.textContent = '⏸ 暂停';
      timer = setInterval(() => {
        const v = Number(slider.value) + Number(slider.step || 1);
        if (v > Number(slider.max)) { clearInterval(timer); timer = null; btn.textContent = '▶ 播放'; return; }
        slider.value = v; draw();
      }, mode === 'temporal' ? 700 : 90);
    });
    slider.addEventListener('input', draw);
    draw();
  }
};
