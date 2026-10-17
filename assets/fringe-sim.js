/* 干涉条纹模拟器（可复用组件）
 * 模型：高斯形"沉降漏斗"，只有垂直运动。
 *   视线向距离变化 ΔR = 沉降量 × cos(θ)         （远离卫星 → ΔR 为正）
 *   干涉相位      Δφ = 4π · ΔR / λ             （往返两趟，所以是 4π 不是 2π）
 *   显示的相位    = Δφ mod 2π  → 色相环一圈 = 一个条纹
 * 用法：FringeSim.mount(containerEl, { lambda: 5.55 })
 * 容器内需要：canvas.map、canvas.profile、input[name=depth]、input[name=inc]、.readout
 */
window.FringeSim = {
  mount(root, opts = {}) {
    const lambda = opts.lambda || 5.55;           // cm，Sentinel-1 C 波段
    const map = root.querySelector('canvas.map');
    const prof = root.querySelector('canvas.profile');
    const depthIn = root.querySelector('input[name=depth]');
    const incIn = root.querySelector('input[name=inc]');
    const out = root.querySelector('.readout');
    const depthLab = root.querySelector('.depth-val');
    const incLab = root.querySelector('.inc-val');

    const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

    function hsl2rgb(h, s, l) {
      const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
      const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return [f(0) * 255, f(8) * 255, f(4) * 255];
    }

    function draw() {
      const D = Number(depthIn.value);               // 中心最大沉降，cm
      const inc = Number(incIn.value) * Math.PI / 180;
      depthLab.textContent = D.toFixed(1) + ' cm';
      incLab.textContent = incIn.value + '°';

      const W = map.width, H = map.height, sigma = W / 6;
      const ctx = map.getContext('2d');
      const img = ctx.createImageData(W, H);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const r2 = (x - W / 2) ** 2 + (y - H / 2) ** 2;
        const sub = D * Math.exp(-r2 / (2 * sigma * sigma));   // 垂直沉降 cm
        const dR = sub * Math.cos(inc);                         // 视线向 cm
        const phase = (4 * Math.PI * dR / lambda) % (2 * Math.PI);
        const [r, g, b] = hsl2rgb(phase / (2 * Math.PI) * 360, 0.75, 0.55);
        const i = (y * W + x) * 4;
        img.data[i] = r; img.data[i + 1] = g; img.data[i + 2] = b; img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke(); ctx.setLineDash([]);

      // 剖面：真实视线向形变 vs 卷绕后的相位
      const pc = prof.getContext('2d'), PW = prof.width, PH = prof.height;
      pc.clearRect(0, 0, PW, PH);
      const fg = css('--fg') || '#222', acc = css('--accent') || '#a33', mut = css('--muted') || '#888';
      const maxR = Math.max(D * Math.cos(inc), lambda / 2);
      const top = 20, bot = PH - 24;
      pc.font = '12px sans-serif'; pc.fillStyle = mut;
      pc.fillText('虚线所在剖面', 6, 14);
      // 真实形变（向下画 = 远离卫星）
      pc.strokeStyle = acc; pc.lineWidth = 2; pc.beginPath();
      for (let x = 0; x < PW; x++) {
        const xx = x / PW * W, r2 = (xx - W / 2) ** 2;
        const dR = D * Math.exp(-r2 / (2 * sigma * sigma)) * Math.cos(inc);
        const yy = top + (dR / maxR) * (bot - top);
        x ? pc.lineTo(x, yy) : pc.moveTo(x, yy);
      }
      pc.stroke();
      // 卷绕相位（锯齿），按 0..λ/2 映射到同一纵轴
      pc.strokeStyle = fg; pc.lineWidth = 1; pc.globalAlpha = .7; pc.beginPath();
      let prev = null;
      for (let x = 0; x < PW; x++) {
        const xx = x / PW * W, r2 = (xx - W / 2) ** 2;
        const dR = D * Math.exp(-r2 / (2 * sigma * sigma)) * Math.cos(inc);
        const w = dR % (lambda / 2);
        const yy = top + (w / maxR) * (bot - top);
        if (prev !== null && Math.abs(w - prev) > lambda / 4) pc.moveTo(x, yy); else (x ? pc.lineTo(x, yy) : pc.moveTo(x, yy));
        prev = w;
      }
      pc.stroke(); pc.globalAlpha = 1;
      pc.fillStyle = acc; pc.fillText('━ 真实视线向形变（解缠后）', 6, PH - 6);
      pc.fillStyle = fg; pc.fillText('━ 干涉图看到的（卷绕相位）', PW / 2, PH - 6);

      const los = D * Math.cos(inc), fringes = los / (lambda / 2);
      out.innerHTML = `中心垂直沉降 <b>${D.toFixed(1)} cm</b> → 视线向距离变化 <b>${los.toFixed(2)} cm</b>`
        + ` → 从边缘数到中心约 <b>${fringes.toFixed(1)}</b> 个条纹（每个条纹 = λ/2 ≈ ${(lambda / 2).toFixed(2)} cm）`;
    }
    depthIn.addEventListener('input', draw);
    incIn.addEventListener('input', draw);
    if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', draw);
    draw();
  }
};
