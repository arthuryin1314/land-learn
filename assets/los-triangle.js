/* 视线向投影三角形（可复用组件）
 * 演示：地面垂直下沉 d，卫星沿视线方向只能"看到"d 在视线上的投影 d·cosθ。
 * θ = 入射角 = 雷达视线与地面铅垂线的夹角（平坦地面）。
 * 用法：LosTriangle.mount(rootEl)；容器内需要 svg、input[name=theta]、input[name=d]、.theta-val、.d-val、.readout
 */
window.LosTriangle = {
  mount(root) {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = root.querySelector('svg');
    const thIn = root.querySelector('input[name=theta]'), dIn = root.querySelector('input[name=d]');
    const thV = root.querySelector('.theta-val'), dV = root.querySelector('.d-val'), out = root.querySelector('.readout');
    const P = { x: 380, y: 200 }, L = 190, K = 13;   // K：每 cm 画多少像素（放大）

    const el = (tag, attrs, text) => {
      const e = document.createElementNS(NS, tag);
      for (const k in attrs) e.setAttribute(k, attrs[k]);
      if (text != null) e.textContent = text;
      svg.appendChild(e); return e;
    };
    const arc = (cx, cy, r, a0, a1) => {           // 角度：从"正下方"顺时针为正（屏幕坐标）
      const p = a => [cx + r * Math.sin(a), cy + r * Math.cos(a)];
      const [x0, y0] = p(a0), [x1, y1] = p(a1);
      return `M${x0},${y0} A${r},${r} 0 0 ${a1 > a0 ? 0 : 1} ${x1},${y1}`;
    };

    function draw() {
      const th = Number(thIn.value) * Math.PI / 180, d = Number(dIn.value);
      thV.textContent = thIn.value + '°'; dV.textContent = d.toFixed(1) + ' cm';
      svg.innerHTML = '';
      const u = { x: Math.sin(th), y: Math.cos(th) };            // 视线方向：卫星 → 地面（向右下）
      const S = { x: P.x - u.x * L, y: P.y - u.y * L };          // 卫星
      const Q = { x: P.x, y: P.y + d * K };                      // 下沉后的点
      const proj = (Q.x - P.x) * u.x + (Q.y - P.y) * u.y;        // = d*K*cosθ
      const F = { x: P.x + u.x * proj, y: P.y + u.y * proj };    // Q 在视线上的投影点

      // 地面
      el('rect', { x: 40, y: P.y, width: 600, height: 170, fill: '#8a6a48', opacity: .18 });
      el('line', { x1: 40, y1: P.y, x2: 640, y2: P.y, stroke: '#8a6a48', 'stroke-width': 2 });
      el('text', { x: 48, y: P.y - 8, class: 'lt-mut' }, '原来的地面');
      // 铅垂线（虚线，向上）
      el('line', { x1: P.x, y1: P.y, x2: P.x, y2: P.y - 175, class: 'lt-dash' });
      el('text', { x: P.x + 6, y: P.y - 160, class: 'lt-mut' }, '铅垂线（竖直向上）');
      // 视线（卫星→P，并延长到 F 之后）
      const ext = Math.max(proj + 30, 60);
      el('line', { x1: S.x, y1: S.y, x2: P.x + u.x * ext, y2: P.y + u.y * ext, class: 'lt-los' });
      el('text', { x: (S.x + P.x) / 2 - 92, y: (S.y + P.y) / 2, class: 'lt-blue' }, '雷达视线（LOS）');
      // 卫星
      el('rect', { x: S.x - 14, y: S.y - 8, width: 28, height: 14, fill: 'currentColor', class: 'lt-fg' });
      el('rect', { x: S.x - 44, y: S.y - 5, width: 28, height: 7, fill: '#3a6ea5' });
      el('rect', { x: S.x + 16, y: S.y - 5, width: 28, height: 7, fill: '#3a6ea5' });
      el('text', { x: S.x + 50, y: S.y + 4, class: 'lt-fg-t' }, '卫星');
      // 入射角 θ（铅垂线 与 指向卫星方向 的夹角）
      el('path', { d: arc(P.x, P.y, 46, Math.PI, Math.PI + th), class: 'lt-arc' });
      el('text', { x: P.x - 16 - 30 * Math.sin(th / 2), y: P.y - 52, class: 'lt-acc' }, 'θ 入射角');

      if (d > 0.05) {
        // 三角形：P→Q（垂直沉降，斜边）、P→F（视线向分量）、F→Q（垂直于视线，看不见）
        el('line', { x1: P.x, y1: P.y, x2: Q.x, y2: Q.y, class: 'lt-red' });
        el('line', { x1: P.x, y1: P.y, x2: F.x, y2: F.y, class: 'lt-blueb' });
        el('line', { x1: F.x, y1: F.y, x2: Q.x, y2: Q.y, class: 'lt-gray' });
        // 直角标记在 F
        const s = 9, n = { x: (Q.x - F.x), y: (Q.y - F.y) }, nl = Math.hypot(n.x, n.y) || 1;
        const a = { x: -u.x * s, y: -u.y * s }, b = { x: n.x / nl * s, y: n.y / nl * s };
        el('path', { d: `M${F.x + a.x},${F.y + a.y} L${F.x + a.x + b.x},${F.y + a.y + b.y} L${F.x + b.x},${F.y + b.y}`, class: 'lt-thin' });
        // θ 在 P 点下方（垂直沉降方向 与 视线方向 的夹角，同一个 θ）
        if (d * K > 40) el('path', { d: arc(P.x, P.y, 28, 0, th), class: 'lt-arc' });
        if (d * K > 40) el('text', { x: P.x + 6 + 16 * Math.sin(th / 2), y: P.y + 44, class: 'lt-acc' }, 'θ');
        el('circle', { cx: P.x, cy: P.y, r: 4, class: 'lt-dot' });
        el('circle', { cx: Q.x, cy: Q.y, r: 4, fill: '#a3301f' });
        el('text', { x: Q.x - 120, y: Q.y + 4, class: 'lt-red-t' }, '下沉后的点');
        el('text', { x: P.x - 104, y: (P.y + Q.y) / 2 + 30, class: 'lt-red-t' }, '垂直沉降 d');
        el('text', { x: (P.x + F.x) / 2 + 12, y: (P.y + F.y) / 2 - 4, class: 'lt-blue' }, '视线向 = d·cosθ');
        el('text', { x: (F.x + Q.x) / 2 + 10, y: (F.y + Q.y) / 2 + 16, class: 'lt-mut' }, 'd·sinθ（雷达看不到）');
      }

      const c = Math.cos(th), sn = Math.sin(th), los = d * c;
      out.innerHTML =
        `垂直沉降 <b>${d.toFixed(1)} cm</b> × cos ${thIn.value}°（=${c.toFixed(3)}）→ 卫星量到视线向 <b>${los.toFixed(2)} cm</b>`
        + `<br>反过来：已知视线向 ${los.toFixed(2)} cm → 垂直沉降 = ${los.toFixed(2)} ÷ ${c.toFixed(3)} = <b>${d.toFixed(1)} cm</b>`
        + `<br><span style="color:var(--muted)">垂直于视线的那部分 d·sinθ = ${(d * sn).toFixed(2)} cm，雷达测不到</span>`;
    }
    thIn.addEventListener('input', draw); dIn.addEventListener('input', draw);
    draw();
  }
};
