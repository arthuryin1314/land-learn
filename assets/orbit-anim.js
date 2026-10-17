/* 升轨 / 降轨动画（可复用组件）
 * 俯视图，上北下南左西右东。卫星沿轨道飞行，右视雷达向飞行方向右侧照射，扫出成像条带。
 * 轨道略有倾斜（升轨向北略偏西，降轨向南略偏西），与 ASF 影像角点坐标一致。
 * 用法：OrbitAnim.mount(rootEl)；容器内需要 canvas、.caption、.step-label、button.prev/.play/.next
 */
window.OrbitAnim = {
  mount(root) {
    const cv = root.querySelector('canvas'), ctx = cv.getContext('2d');
    const cap = root.querySelector('.caption'), lab = root.querySelector('.step-label');
    const bPrev = root.querySelector('.prev'), bPlay = root.querySelector('.play'), bNext = root.querySelector('.next');
    const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const BLUE = '#3a6ea5', GREEN = '#2f6b3a';
    // 轨道：起点、终点（画布坐标）。升轨从下往上，略向左（西）；降轨从上往下，略向左（西）
    const ASC = { a: { x: 215, y: 400 }, b: { x: 185, y: 20 } };
    const DES = { a: { x: 535, y: 20 }, b: { x: 505, y: 400 } };
    const SW = 150; // 条带宽度（画布像素，示意）

    const steps = [
      { show: [], text: '<b>先认方向。</b>地图的惯例是<b>上北、下南、左西、右东</b>（右上角的指南针）。中间那块就是江苏。' },
      { show: ['asc'], text: '<b>升轨：卫星从南往北飞</b>，在图上就是从下往上走。经过江苏时大约是<b>傍晚 6 点</b>。' },
      { show: ['asc', 'ascBeam'], text: 'Sentinel-1 是<b>右视雷达</b>，总是看自己的<b>右手边</b>。想象你面朝北走路，你的右手指向<b>东</b>。所以升轨的雷达波<b>从西边打向东边</b>，拍下的条带在轨道的<b>东侧</b>（蓝色）。' },
      { show: ['des'], text: '<b>降轨：卫星从北往南飞</b>，在图上就是从上往下走。经过江苏时大约是<b>清晨 6 点</b>。' },
      { show: ['des', 'desBeam'], text: '还是看<b>右手边</b>。面朝南走路时，右手指向<b>西</b>。所以降轨的雷达波<b>从东边打向西边</b>，条带在轨道的<b>西侧</b>（绿色）。' },
      { show: ['asc', 'ascBeam', 'des', 'desBeam'], text: '<b>同一块地面被两个方向看：</b>升轨从西往东看，降轨从东往西看。两条视线方向不同，就多了一个方程（第 1 课作业讲过"方程数和未知数"），第 5 课就用它解出垂直和东西两个方向的运动。' }
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
      timer = setInterval(() => { step < steps.length - 1 ? go(step + 1) : stop(); }, 7000);
    }
    function stop() { playing = false; bPlay.textContent = '▶ 播放'; clearInterval(timer); }
    bPrev.onclick = () => { stop(); go(step - 1); };
    bNext.onclick = () => { stop(); go(step + 1); };
    bPlay.onclick = () => playing ? stop() : play();

    const lerp = (p, q, k) => ({ x: p.x + (q.x - p.x) * k, y: p.y + (q.y - p.y) * k });
    function unit(p, q) { const dx = q.x - p.x, dy = q.y - p.y, l = Math.hypot(dx, dy); return { x: dx / l, y: dy / l }; }
    // 屏幕坐标里"右手边"：前进方向 (ux,uy) 顺时针转 90° → (-uy, ux)
    const rightOf = u => ({ x: -u.y, y: u.x });

    function arrow(p, q, color, w, head = 10) {
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      const u = unit(p, q), r = rightOf(u);
      ctx.beginPath(); ctx.moveTo(q.x + u.x * 2, q.y + u.y * 2);
      ctx.lineTo(q.x - u.x * head + r.x * head * .55, q.y - u.y * head + r.y * head * .55);
      ctx.lineTo(q.x - u.x * head - r.x * head * .55, q.y - u.y * head - r.y * head * .55);
      ctx.closePath(); ctx.fill(); ctx.lineWidth = 1;
    }

    function drawTrack(tr, color, label, sub, k, beam) {
      const u = unit(tr.a, tr.b), r = rightOf(u), sat = lerp(tr.a, tr.b, k);
      // 已扫过的成像条带
      if (beam) {
        ctx.fillStyle = color; ctx.globalAlpha = .16;
        const s0 = { x: tr.a.x + r.x * 25, y: tr.a.y + r.y * 25 }, s1 = { x: sat.x + r.x * 25, y: sat.y + r.y * 25 };
        ctx.beginPath(); ctx.moveTo(s0.x, s0.y); ctx.lineTo(s1.x, s1.y);
        ctx.lineTo(s1.x + r.x * SW, s1.y + r.y * SW); ctx.lineTo(s0.x + r.x * SW, s0.y + r.y * SW); ctx.closePath(); ctx.fill();
        ctx.globalAlpha = 1;
        // 当前照射的波束（从卫星指向右侧）
        ctx.fillStyle = color; ctx.globalAlpha = .35;
        ctx.beginPath(); ctx.moveTo(sat.x, sat.y);
        ctx.lineTo(sat.x + r.x * (SW + 25) - u.x * 14, sat.y + r.y * (SW + 25) - u.y * 14);
        ctx.lineTo(sat.x + r.x * (SW + 25) + u.x * 14, sat.y + r.y * (SW + 25) + u.y * 14);
        ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
        // 视线方向箭头
        for (const f of [.25, .55, .85]) {
          const p = lerp(tr.a, tr.b, f), q = { x: p.x + r.x * 22, y: p.y + r.y * 22 };
          arrow({ x: p.x + r.x * 30, y: p.y + r.y * 30 }, { x: p.x + r.x * 30 + r.x * 40, y: p.y + r.y * 30 + r.y * 40 }, color, 2, 8);
        }
      }
      // 轨道
      ctx.setLineDash([6, 5]); ctx.strokeStyle = color; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(tr.a.x, tr.a.y); ctx.lineTo(tr.b.x, tr.b.y); ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth = 1;
      arrow(lerp(tr.a, tr.b, .02), lerp(tr.a, tr.b, .12), color, 3, 12);
      // 卫星
      ctx.save(); ctx.translate(sat.x, sat.y); ctx.rotate(Math.atan2(u.y, u.x) + Math.PI / 2);
      ctx.fillStyle = css('--fg') || '#222'; ctx.fillRect(-9, -7, 18, 14);
      ctx.fillStyle = BLUE; ctx.fillRect(-30, -4, 19, 8); ctx.fillRect(11, -4, 19, 8);
      ctx.restore();
      // "右手边"指示
      if (beam) {
        ctx.fillStyle = color; ctx.font = 'bold 13px sans-serif';
        ctx.fillText(r.x > 0 ? '右手边 →' : '← 右手边', sat.x + r.x * 40 - 28, sat.y + r.y * 40 - 10);
      }
      // 标签
      ctx.font = 'bold 14px sans-serif'; ctx.fillStyle = color;
      const lp = tr.a.y > tr.b.y ? { x: tr.a.x - 70, y: tr.a.y + 2 } : { x: tr.a.x - 125, y: tr.a.y + 26 };
      ctx.fillText(label, lp.x, lp.y - 12);
      ctx.font = '12px sans-serif'; ctx.fillText(sub, lp.x, lp.y + 4);
    }

    function compass(cx, cy, hi) {
      const fg = css('--fg') || '#222', acc = css('--accent') || '#a33';
      ctx.strokeStyle = hi ? acc : fg; ctx.lineWidth = hi ? 2 : 1;
      ctx.beginPath(); ctx.arc(cx, cy, 30, 0, 2 * Math.PI); ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = acc; ctx.beginPath(); ctx.moveTo(cx, cy - 26); ctx.lineTo(cx - 6, cy); ctx.lineTo(cx + 6, cy); ctx.fill();
      ctx.fillStyle = fg; ctx.beginPath(); ctx.moveTo(cx, cy + 26); ctx.lineTo(cx - 6, cy); ctx.lineTo(cx + 6, cy); ctx.fill();
      ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillStyle = acc; ctx.fillText('北', cx, cy - 36);
      ctx.fillStyle = fg; ctx.fillText('南', cx, cy + 48); ctx.fillText('西', cx - 44, cy + 5); ctx.fillText('东', cx + 44, cy + 5);
      ctx.textAlign = 'left';
    }

    function frame(now) {
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = css('--card') || '#fff'; ctx.fillRect(0, 0, W, H);
      // 江苏（示意）
      ctx.fillStyle = '#8a6a48'; ctx.globalAlpha = .15; ctx.fillRect(270, 120, 180, 170); ctx.globalAlpha = 1;
      ctx.strokeStyle = '#8a6a48'; ctx.strokeRect(270, 120, 180, 170);
      ctx.fillStyle = css('--fg') || '#222'; ctx.font = '14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('江苏（示意）', 360, 210); ctx.textAlign = 'left';
      compass(655, 70, step === 0);
      ctx.fillStyle = css('--muted') || '#888'; ctx.font = '12px sans-serif';
      ctx.fillText('俯视图（从天上往下看）', 12, 18);

      const k = ((now - t0) / 4000) % 1;          // 卫星位置循环
      const s = steps[step].show;
      if (s.includes('asc')) drawTrack(ASC, BLUE, '升轨 ↑ 南→北', '傍晚约 6 点', k, s.includes('ascBeam'));
      if (s.includes('des')) drawTrack(DES, GREEN, '降轨 ↓ 北→南', '清晨约 6 点', k, s.includes('desBeam'));
      requestAnimationFrame(frame);
    }
    go(0);
    requestAnimationFrame(frame);
  }
};
