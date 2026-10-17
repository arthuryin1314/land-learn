/* 相位"时钟"动画（可复用组件）
 * 演示：雷达往返距离取模 → 相位；地面下沉 → 相位指针转动；转满一圈后读数"看不出变化"。
 * 画面比例：为了看得清，波长被放大画成 40 px；地面每下沉 λ/2（≈2.8 cm）移动 20 px，
 * 往返路程多 40 px，正好是一个画面波长，所以画面上的相位关系与真实情况一致。
 * 用法：PhaseAnim.mount(rootEl)
 * 容器内需要：canvas、.caption、.step-label、button.prev/.play/.next、input[name=sink]、.sink-val
 */
window.PhaseAnim = {
  mount(root) {
    const LAMBDA = 5.55;               // cm
    const LPX = 40;                    // 画面上一个波长的像素
    const PX_PER_CM = (LPX / 2) / (LAMBDA / 2);  // 下沉 λ/2 → 20 px
    const SAT_Y = 46, D0 = 260;        // 2*D0 是 LPX 的整数倍 → 初始相位 0
    const cv = root.querySelector('canvas'), ctx = cv.getContext('2d');
    const cap = root.querySelector('.caption'), lab = root.querySelector('.step-label');
    const slider = root.querySelector('input[name=sink]'), sv = root.querySelector('.sink-val');
    const bPrev = root.querySelector('.prev'), bPlay = root.querySelector('.play'), bNext = root.querySelector('.next');

    const steps = [
      { sink: 0, ghost: false, text: '<b>第一次观测。</b>卫星发出电磁波（左边那条向下的波），碰到地面后弹回（右边那条向上的波）。卫星只能读出回波<b>停在一圈中的哪个位置</b>，就是右侧表盘的指针，这叫<b>相位</b>。往返路程里有几千万个波长（画面里大大缩小了），整圈数读不出来，只剩这个"零头"。' },
      { sink: 0, ghost: true, text: '<b>把第一次的读数记下来</b>，就是表盘上的灰色虚线指针。单看它没有意义，就像只看一眼时钟，你不知道是哪一天的 3 点。' },
      { sink: 1, ghost: true, text: '<b>12 天后，地面下沉 1 cm。</b>去程长 1 cm，回程也长 1 cm，<b>往返多了 2 cm</b>。2 ÷ 5.55 ≈ 0.36 圈，所以指针转了约 130°。<b>两根指针的夹角就是干涉测出来的东西。</b>' },
      { sink: LAMBDA / 2, ghost: true, text: '<b>下沉到约 2.8 cm</b>：往返多了约 5.55 cm，正好一个波长，指针<b>转满一整圈，回到原位</b>。只看两根指针，好像什么都没变！在干涉图上，这就是<b>一个完整的色环（条纹）</b>。' },
      { sink: 4, ghost: true, text: '<b>下沉到 4 cm</b>：真实转了 1.44 圈，表盘只显示 0.44 圈，整圈数又丢了。所以要看相邻像素的条纹一圈圈数过去，把丢掉的整圈补回来，这就是<b>相位解缠</b>。' },
      { sink: null, ghost: true, text: '<b>自己试试。</b>拖动下面的滑块，看指针怎么转，注意"真实圈数"和"表盘读数"什么时候开始不一样。' }
    ];

    let step = 0, sink = 0, target = 0, from = 0, t0 = 0, playing = false, timer = null, ghost = false;
    const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

    function go(i) {
      step = Math.max(0, Math.min(steps.length - 1, i));
      const s = steps[step];
      ghost = s.ghost;
      lab.textContent = `第 ${step + 1} / ${steps.length} 步`;
      cap.innerHTML = s.text;
      slider.disabled = s.sink !== null;
      if (s.sink !== null) { from = sink; target = s.sink; t0 = performance.now(); }
      bPrev.disabled = step === 0; bNext.disabled = step === steps.length - 1;
      if (step === steps.length - 1) stop();
    }
    function play() {
      playing = true; bPlay.textContent = '⏸ 暂停';
      if (step === steps.length - 1) go(0);
      clearInterval(timer);
      timer = setInterval(() => { step < steps.length - 1 ? go(step + 1) : stop(); }, 6500);
    }
    function stop() { playing = false; bPlay.textContent = '▶ 播放'; clearInterval(timer); }

    bPrev.onclick = () => { stop(); go(step - 1); };
    bNext.onclick = () => { stop(); go(step + 1); };
    bPlay.onclick = () => playing ? stop() : play();
    slider.oninput = () => { target = from = sink = Number(slider.value); };

    function frame(now) {
      // 平滑过渡下沉量
      if (steps[step].sink !== null) {
        const k = Math.min(1, (now - t0) / 1800), e = k < .5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
        sink = from + (target - from) * e;
        slider.value = sink;
      }
      sv.textContent = sink.toFixed(2) + ' cm';
      draw(now / 1000);
      requestAnimationFrame(frame);
    }

    function draw(t) {
      const W = cv.width, H = cv.height;
      const fg = css('--fg') || '#222', mut = css('--muted') || '#888', acc = css('--accent') || '#a33',
            rule = css('--rule') || '#ccc', card = css('--card') || '#fff', ok = css('--ok') || '#2f6b3a';
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = card; ctx.fillRect(0, 0, W, H);

      const D = D0 + sink * PX_PER_CM, groundY = SAT_Y + D;
      const xDown = 175, xUp = 245, c = 60;   // 波的传播速度（px/s，仅用于画面）
      // 原始地面虚线
      ctx.setLineDash([5, 5]); ctx.strokeStyle = mut; ctx.beginPath();
      ctx.moveTo(90, SAT_Y + D0); ctx.lineTo(330, SAT_Y + D0); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = mut; ctx.font = '12px sans-serif'; ctx.fillText('原来的地面', 335, SAT_Y + D0 + 4);
      // 地面
      ctx.fillStyle = '#8a6a48'; ctx.fillRect(90, groundY, 240, H - groundY);
      ctx.fillStyle = '#fff'; ctx.fillText('地面', 100, groundY + 16);
      if (sink > 0.05) {
        ctx.strokeStyle = acc; ctx.fillStyle = acc; ctx.beginPath();
        ctx.moveTo(320, SAT_Y + D0); ctx.lineTo(320, groundY); ctx.stroke();
        ctx.fillText('下沉 ' + sink.toFixed(1) + ' cm', 335, (SAT_Y + D0 + groundY) / 2 + 18);
      }
      // 卫星
      ctx.fillStyle = fg; ctx.fillRect(195, SAT_Y - 18, 30, 16);
      ctx.fillStyle = '#3a6ea5'; ctx.fillRect(160, SAT_Y - 14, 32, 8); ctx.fillRect(228, SAT_Y - 14, 32, 8);
      ctx.fillStyle = fg; ctx.fillText('卫星', 268, SAT_Y - 6);

      // 去程波：s 为离卫星的距离，路程 = s
      const amp = 9;
      ctx.lineWidth = 2; ctx.strokeStyle = '#3a6ea5'; ctx.beginPath();
      for (let s = 0; s <= D; s += 1) {
        const v = Math.sin(2 * Math.PI * (s - c * t) / LPX);
        const x = xDown + amp * v, y = SAT_Y + s;
        s ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
      // 回程波：路程 = D + (D - s)
      ctx.strokeStyle = ok; ctx.beginPath();
      for (let s = 0; s <= D; s += 1) {
        const v = Math.sin(2 * Math.PI * ((2 * D - s) - c * t) / LPX);
        const x = xUp + amp * v, y = SAT_Y + s;
        s ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = '#3a6ea5'; ctx.fillText('去程 ↓', xDown - 62, SAT_Y + 60);
      ctx.fillStyle = ok; ctx.fillText('↑ 回程', xUp + 18, SAT_Y + 60);
      // 地面反射点
      ctx.strokeStyle = mut; ctx.beginPath(); ctx.moveTo(xDown, groundY); ctx.lineTo(xUp, groundY); ctx.stroke();

      // 表盘
      const cx = 560, cy = 140, R = 88;
      const turnsTrue = 2 * sink / LAMBDA, frac = turnsTrue - Math.floor(turnsTrue + 1e-9);
      ctx.fillStyle = css('--bg') || '#fff'; ctx.strokeStyle = rule; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.fill(); ctx.stroke(); ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * 2 * Math.PI;
        ctx.strokeStyle = mut; ctx.beginPath();
        ctx.moveTo(cx + Math.sin(a) * (R - 8), cy - Math.cos(a) * (R - 8));
        ctx.lineTo(cx + Math.sin(a) * R, cy - Math.cos(a) * R); ctx.stroke();
      }
      ctx.fillStyle = mut; ctx.textAlign = 'center';
      ctx.fillText('0 / 一整圈', cx, cy - R - 8);
      ctx.fillText('半圈', cx, cy + R + 16);
      ctx.fillText('回波相位（零头）', cx, cy + R + 36);
      const needle = (ang, color, dash, w) => {
        ctx.setLineDash(dash); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.beginPath();
        ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(ang) * (R - 14), cy - Math.cos(ang) * (R - 14)); ctx.stroke();
        ctx.setLineDash([]); ctx.lineWidth = 1;
      };
      if (ghost) {
        // 夹角弧（只显示零头部分）
        if (frac > 0.002) {
          ctx.strokeStyle = acc; ctx.lineWidth = 6; ctx.globalAlpha = .35; ctx.beginPath();
          ctx.arc(cx, cy, R - 30, -Math.PI / 2, -Math.PI / 2 + frac * 2 * Math.PI); ctx.stroke();
          ctx.globalAlpha = 1; ctx.lineWidth = 1;
        }
        needle(0, mut, [5, 4], 2);
      }
      needle(frac * 2 * Math.PI, acc, [], 4);
      ctx.fillStyle = acc; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, 2 * Math.PI); ctx.fill();
      ctx.textAlign = 'left';

      // 读数
      ctx.font = '13px sans-serif'; ctx.fillStyle = fg;
      ctx.fillText(`往返路程多出：${(2 * sink).toFixed(2)} cm`, 440, 318);
      ctx.fillText(`真实转了：${turnsTrue.toFixed(2)} 圈`, 440, 338);
      ctx.fillStyle = acc;
      ctx.fillText(`表盘只能显示：${frac.toFixed(2)} 圈`, 440, 358);
      if (turnsTrue >= 0.999) {
        ctx.fillStyle = mut; ctx.fillText(`（丢了 ${Math.floor(turnsTrue + 1e-9)} 整圈 → 要靠解缠补回）`, 440, 378);
      }
    }

    go(0);
    requestAnimationFrame(frame);
  }
};
