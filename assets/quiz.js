/* 可复用测验组件
 * 用法：
 * <div class="quiz" data-answer="2">
 *   <p class="q">题目</p>
 *   <div class="opts"><button class="opt">A</button>...</div>
 *   <div class="fb" data-right="答对时的解释" data-wrong="答错时的提示"></div>
 * </div>
 * data-answer 为正确选项的下标（从 0 开始）。页面中如有 #quiz-score，会显示得分。
 */
(function () {
  function init() {
    const quizzes = document.querySelectorAll('.quiz[data-answer]');
    let answered = 0, correct = 0;
    const scoreEl = document.getElementById('quiz-score');
    const update = () => { if (scoreEl) scoreEl.textContent = `已答 ${answered}/${quizzes.length}，首次答对 ${correct}`; };
    quizzes.forEach(qz => {
      const ans = Number(qz.dataset.answer);
      const opts = qz.querySelectorAll('button.opt');
      const fb = qz.querySelector('.fb');
      let first = true;
      opts.forEach((btn, i) => btn.addEventListener('click', () => {
        if (i === ans) {
          btn.classList.add('right');
          opts.forEach(b => b.disabled = true);
          if (fb) { fb.innerHTML = '✓ ' + (fb.dataset.right || '正确。'); fb.classList.add('show'); }
          if (first) correct++;
          answered++; update();
        } else {
          btn.classList.add('wrong'); btn.disabled = true;
          if (fb) { fb.innerHTML = '✗ ' + (fb.dataset.wrong || '再想想。'); fb.classList.add('show'); }
          first = false;
        }
      }));
    });
    update();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
