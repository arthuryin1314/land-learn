/* 轨道 → frame → 子带 → burst 动画（可复用组件）
 * 事实依据：frame 约 250 km（距离向）× 180 km（方位向），3 个子带重叠约 2 km，每个子带 8–10 个 burst（P06 p.3）；
 * 江苏升轨 69 的 frame 编号 94/99/104/109 来自 ASF 查询（data/asf_s1_slc_jiangsu_bbox_queried_2026-10-16.csv）。
 * 用法：SlicingAnim.mount(rootEl)；容器内需要 canvas、.caption、.step-label、button.prev/.play/.next
 */
window.SlicingAnim = {
  mount(root) {
    const cv = root.querySelector('canvas'), ctx = cv.getContext('2d');
    const cap = root.querySelector('.caption'), lab = root.querySelector('.step-label');
    const bPrev = root.querySelector('.prev'), bPlay = root.querySelector('.play'), bNext = root.querySelector('.next');
    const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const BLUE = '#3a6ea5', SW = ['#3a6ea5', '#c58a1a', '#2f6b3a'];
    const W = cv.width, H = cv.height;

    const steps = [
      { scene: 'paths', text: '<b>第 1 层：轨道（path）。</b>卫星每 12 天把同一组路线重复飞一遍，一共 175 条。每条路线有固定编号。江苏上空主要是升轨 <b>142、69、171</b> 三条（第 4 节的表）。每条轨道是一条长长的带子，宽约 250 km。' },
      { scene: 'frames', text: '<b>第 2 层：frame（景）。</b>一条轨道太长，数据要切成一块块分发。沿轨道每约 180 km 切一块，这一块就是一个 frame。轨道 69 经过江苏的 frame 编号是 <b>94、99、104、109</b>（ASF 实查）。P06 在轨道 69 上用了其中 3 个。' },
      { scene: 'swaths', text: '<b>第 3 层：子带（sub-swath）。</b>把一个 frame 放大：它横向分成 3 条，叫 <b>IW1、IW2、IW3</b>，相邻两条重叠约 2 km（P06 p.3）。IW1 离轨道最近，入射角小；IW3 最远，入射角大。这就是第 1 课说的"同一景里入射角从 29° 变到 46°"。' },
      { scene: 'bursts', text: '<b>第 4 层：burst。</b>每条子带再纵向切成 8–10 小块，每块叫一个 burst（P06 p.3）。IW 模式拍摄时，雷达在三条子带之间<b>轮流切换</b>，每次拍一小段，所以数据天然就是一块块的 burst（看亮起来的顺序）。' },
      { scene: 'code', text: '<b>用程序员的话说</b>，就是一个嵌套结构。P06 说"6 个 frame、3 条轨道"，就是从 3 个 path 里各取了 1–3 个 frame，拼起来盖住江苏。' },
      { scene: 'why', text: '<b>为什么要知道 burst？</b>相邻 burst 的接缝处很娇气：配准要精确到<b>千分之一像元</b>，否则接缝处会出现相位跳变（P06 p.4，所以 P06 专门做了三级配准）。另外，新的数据产品已经改成以 burst 为单位来编号和分发，ASF 的结果表里就有 burst 编号。' }
    ];
    let step = 0, playing = false, timer = null, t0 = performance.now();

    function go(i) {
      step = Math.max(0, Math.min(steps.length - 1, i));
      lab.textContent = `第 ${step + 1} / ${steps.length} 步`;
      cap.innerHTML = steps[step].text;
      bPrev.disabled = step === 0; bNext.disabled = step === steps.length - 1;
      t0 = performance.now();
      if (step === steps.length - 1) stop();
    }
    function play() {
      playing = true; bPlay.textContent = '⏸ 暂停';
      if (step === steps.length - 1) go(0);
      clearInterval(timer);
      timer = setInterval(() => { step < steps.length - 1 ? go(step + 1) : stop(); }, 8000);
    }
    function stop() { playing = false; bPlay.textContent = '▶ 播放'; clearInterval(timer); }
    bPrev.onclick = () => { stop(); go(step - 1); };
    bNext.onclick = () => { stop(); go(step + 1); };
    bPlay.onclick = () => playing ? stop() : play();

    const fg = () => css('--fg') || '#222', mut = () => css('--muted') || '#888', acc = () => css('--accent') || '#a33';
    function text(s, x, y, o = {}) {
      ctx.font = (o.bold ? 'bold ' : '') + (o.size || 13) + 'px sans-serif';
      ctx.fillStyle = o.color || fg(); ctx.textAlign = o.align || 'left'; ctx.fillText(s, x, y); ctx.textAlign = 'left';
    }
    // 倾斜的轨道带（升轨，向北略偏西）：用旋转坐标系画
    const TILT = -0.08;
    function inStrip(cx, fn) {
      ctx.save(); ctx.translate(cx, H / 2); ctx.rotate(TILT); fn(); ctx.restore();
    }
    function jiangsu() {
      ctx.fillStyle = '#8a6a48'; ctx.globalAlpha = .15; ctx.fillRect(250, 110, 230, 190); ctx.globalAlpha = 1;
      ctx.strokeStyle = '#8a6a48'; ctx.strokeRect(250, 110, 230, 190);
      text('江苏（示意）', 365, 290, { align: 'center', color: '#8a6a48' });
    }

    function scenePaths(k) {
      jiangsu();
      const paths = [{ x: 255, n: '142' }, { x: 365, n: '69' }, { x: 475, n: '171' }];
      paths.forEach((p, i) => inStrip(p.x, () => {
        ctx.fillStyle = BLUE; ctx.globalAlpha = .12 + .06 * i; ctx.fillRect(-68, -H, 136, 2 * H); ctx.globalAlpha = 1;
        ctx.strokeStyle = BLUE; ctx.setLineDash([5, 4]); ctx.strokeRect(-68, -H, 136, 2 * H); ctx.setLineDash([]);
        // 卫星沿带子向上移动
        const y = H / 2 - ((k + i * .33) % 1) * H;
        ctx.fillStyle = fg(); ctx.fillRect(-7, y - 6, 14, 12);
        ctx.fillStyle = BLUE; ctx.fillRect(-24, y - 3, 15, 6); ctx.fillRect(9, y - 3, 15, 6);
      }));
      paths.forEach(p => text('path ' + p.n, p.x - 4, 30, { bold: true, color: BLUE, align: 'center' }));
      text('↑ 飞行方向（升轨）', 600, 400, { color: mut() });
      ctx.fillStyle = css('--card') || '#fff'; ctx.fillRect(225, 390, 280, 22);
      text('相邻轨道互相重叠，所以三条就能盖住全省', 365, 405, { align: 'center', color: mut(), size: 12 });
    }

    function sceneFrames(k) {
      jiangsu();
      inStrip(365, () => {
        ctx.fillStyle = BLUE; ctx.globalAlpha = .1; ctx.fillRect(-60, -H, 120, 2 * H); ctx.globalAlpha = 1;
        const fh = 92, names = ['94', '99', '104', '109'];
        names.forEach((n, i) => {
          const y = 130 - (i + 1) * fh + 46;
          const lit = Math.floor(k * 4) % 4 === i;
          ctx.fillStyle = BLUE; ctx.globalAlpha = lit ? .45 : .2; ctx.fillRect(-60, y, 120, fh - 4); ctx.globalAlpha = 1;
          ctx.strokeStyle = BLUE; ctx.lineWidth = 2; ctx.strokeRect(-60, y, 120, fh - 4); ctx.lineWidth = 1;
          text('frame ' + n, 0, y + fh / 2 + 3, { align: 'center', bold: true, color: lit ? fg() : BLUE });
        });
      });
      text('path 69（一条轨道）', 440, 40, { bold: true, color: BLUE });
      // 尺寸标注
      ctx.strokeStyle = acc(); ctx.beginPath(); ctx.moveTo(470, 140); ctx.lineTo(470, 228); ctx.stroke();
      text('约 180 km', 478, 188, { color: acc() });
      text('（沿飞行方向）', 478, 205, { color: mut(), size: 11 });
      ctx.beginPath(); ctx.moveTo(300, 385); ctx.lineTo(420, 385); ctx.stroke();
      text('约 250 km（横向）', 360, 405, { color: acc(), align: 'center' });
      text('编号从南往北增大；', 560, 300, { color: mut(), size: 12 });
      text('每次飞过都按同样的位置切块', 560, 318, { color: mut(), size: 12 });
    }

    // 放大后的一个 frame
    const F = { x: 120, y: 40, w: 400, h: 330 };
    function frameBox() {
      ctx.strokeStyle = BLUE; ctx.lineWidth = 2; ctx.strokeRect(F.x, F.y, F.w, F.h); ctx.lineWidth = 1;
      text('一个 frame（放大）', F.x, F.y - 10, { bold: true, color: BLUE });
      // 轨道与视线
      ctx.setLineDash([5, 4]); ctx.strokeStyle = BLUE; ctx.beginPath(); ctx.moveTo(F.x - 60, F.y + F.h + 20); ctx.lineTo(F.x - 60, F.y - 10); ctx.stroke(); ctx.setLineDash([]);
      text('卫星轨道 ↑', F.x - 100, F.y + F.h + 40, { color: BLUE });
      text('雷达朝右看 →', F.x + F.w + 10, F.y + F.h + 8, { color: mut(), size: 12 });
    }
    function swathRects() {
      const w = F.w / 3, ov = 10;   // 重叠（放大示意）
      return [0, 1, 2].map(i => ({ x: F.x + i * w - (i ? ov / 2 : 0), w: w + (i && i < 2 ? ov : ov / 2), i }));
    }
    function sceneSwaths(k) {
      frameBox();
      const rs = swathRects();
      rs.forEach(r => {
        ctx.fillStyle = SW[r.i]; ctx.globalAlpha = .22; ctx.fillRect(r.x, F.y, r.w, F.h); ctx.globalAlpha = 1;
        text('IW' + (r.i + 1), r.x + r.w / 2, F.y + F.h / 2, { align: 'center', bold: true, size: 20, color: SW[r.i] });
      });
      // 重叠区标注
      [1, 2].forEach(i => {
        const x = F.x + i * F.w / 3;
        ctx.fillStyle = acc(); ctx.globalAlpha = .5; ctx.fillRect(x - 5, F.y, 10, F.h); ctx.globalAlpha = 1;
      });
      text('重叠约 2 km', F.x + F.w / 3, F.y + F.h + 20, { align: 'center', color: acc(), size: 12 });
      text('近：入射角小（约 29°）', F.x + 4, F.y + 22, { color: mut(), size: 12 });
      text('远：入射角大（约 46°）', F.x + F.w - 4, F.y + 22, { color: mut(), size: 12, align: 'right' });
    }
    function sceneBursts(k) {
      frameBox();
      const rs = swathRects(), nb = 9, bh = F.h / nb, stagger = [0, bh / 3, 2 * bh / 3];
      const order = Math.floor(k * nb * 3 * 1.0) % (nb * 3);   // 依次点亮：IW1 b1, IW2 b1, IW3 b1, IW1 b2 ...
      ctx.save(); ctx.beginPath(); ctx.rect(F.x, F.y, F.w, F.h); ctx.clip();
      rs.forEach(r => {
        for (let b = 0; b < nb + 1; b++) {
          const y = F.y + F.h - (b + 1) * bh - stagger[r.i] + bh / 2;
          if (y < F.y - 2 || y + bh > F.y + F.h + bh) continue;
          const idx = b * 3 + r.i, lit = idx <= order;
          ctx.fillStyle = SW[r.i]; ctx.globalAlpha = lit ? (idx === order ? .7 : .3) : .07;
          ctx.fillRect(r.x + 2, Math.max(F.y, y), r.w - 4, Math.min(bh - 3, F.y + F.h - Math.max(F.y, y)));
          ctx.globalAlpha = 1;
          ctx.strokeStyle = SW[r.i]; ctx.strokeRect(r.x + 2, Math.max(F.y, y), r.w - 4, Math.min(bh - 3, F.y + F.h - Math.max(F.y, y)));
        }
      });
      ctx.restore();
      rs.forEach(r => text('IW' + (r.i + 1), r.x + r.w / 2, F.y + F.h + 20, { align: 'center', bold: true, color: SW[r.i] }));
      text('每条子带 8–10 个 burst', F.x + F.w + 10, F.y + 40, { color: fg(), size: 13 });
      text('亮起的顺序就是', F.x + F.w + 10, F.y + 70, { color: mut(), size: 12 });
      text('雷达拍摄的顺序：', F.x + F.w + 10, F.y + 88, { color: mut(), size: 12 });
      text('IW1 → IW2 → IW3 → IW1 …', F.x + F.w + 10, F.y + 106, { color: mut(), size: 12 });
    }
    function sceneCode() {
      const lines = [
        ['path 69（一条轨道）', 0, BLUE],
        ['├─ frame 94', 1, fg()], ['├─ frame 99', 1, fg()],
        ['├─ frame 104', 1, fg()],
        ['│   ├─ IW1 ── burst 1, burst 2, … burst 9', 2, SW[0]],
        ['│   ├─ IW2 ── burst 1, burst 2, … burst 9', 2, SW[1]],
        ['│   └─ IW3 ── burst 1, burst 2, … burst 9', 2, SW[2]],
        ['└─ frame 109', 1, fg()]
      ];
      ctx.font = '15px monospace';
      lines.forEach((l, i) => { ctx.fillStyle = l[2]; ctx.fillText(l[0], 70, 70 + i * 30); });
      ctx.fillStyle = mut(); ctx.font = '13px monospace';
      ctx.fillText('data[path][frame][subswath][burst]', 70, 330);
      text('P06：3 个 path × 1–3 个 frame = 6 个 frame，盖住全省', 70, 370, { color: acc(), bold: true });
    }
    function sceneWhy(k) {
      // 两个 burst 及接缝
      const x = 70, w = 300, h = 120;
      ctx.fillStyle = SW[0]; ctx.globalAlpha = .25; ctx.fillRect(x, 80, w, h); ctx.fillRect(x, 80 + h - 14, w, h); ctx.globalAlpha = 1;
      ctx.strokeStyle = SW[0]; ctx.strokeRect(x, 80, w, h); ctx.strokeRect(x, 80 + h - 14, w, h);
      text('burst 1', x + w / 2, 140, { align: 'center', bold: true, color: SW[0] });
      text('burst 2', x + w / 2, 80 + h + 70, { align: 'center', bold: true, color: SW[0] });
      const pulse = .4 + .4 * Math.sin(k * Math.PI * 2);
      ctx.fillStyle = acc(); ctx.globalAlpha = pulse; ctx.fillRect(x, 80 + h - 14, w, 14); ctx.globalAlpha = 1;
      text('← 接缝（相邻 burst 的重叠区）', x + w + 10, 80 + h - 14, { color: acc(), size: 13, bold: true });
      text('配准要精确到千分之一像元，', x + w + 10, 80 + h + 6, { color: acc(), size: 13 });
      text('否则这里会出现相位跳变（P06 p.4）', x + w + 10, 80 + h + 24, { color: acc(), size: 13 });
      text('好消息：HyP3 这类干涉图生成服务会自动完成配准，', 360, 360, { align: 'center', color: mut() });
      text('你需要知道它存在，看到相关报错时能明白是哪一环出了问题。', 360, 382, { align: 'center', color: mut() });
    }

    function frame(now) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = css('--card') || '#fff'; ctx.fillRect(0, 0, W, H);
      const k = ((now - t0) / 6000) % 1;
      const s = steps[step].scene;
      ({ paths: scenePaths, frames: sceneFrames, swaths: sceneSwaths, bursts: sceneBursts, code: sceneCode, why: sceneWhy })[s](k);
      requestAnimationFrame(frame);
    }
    go(0);
    requestAnimationFrame(frame);
  }
};
