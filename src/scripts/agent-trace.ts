const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function mount(root: HTMLElement) {
  const lines = [...root.querySelectorAll<HTMLElement>('[data-trace-line]')];
  const status = root.querySelector<HTMLElement>('[data-trace-status]');
  const texts = lines.map((l) => l.querySelector<HTMLElement>('[data-trace-text]')!.textContent!.trim());
  if (!lines.length) return;

  let visible = false;
  let alive = true;
  const io = new IntersectionObserver((es) => {
    visible = es.some((e) => e.isIntersecting);
  });
  io.observe(root);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) visible = false;
  });

  const untilVisible = async () => {
    while (alive && (!visible || document.hidden)) await wait(250);
  };

  const type = async (el: HTMLElement, text: string) => {
    el.textContent = '';
    el.setAttribute('data-typing', '');
    const perChar = Math.max(6, Math.min(22, 900 / text.length));
    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      if (i % 2 === 0) await wait(perChar);
    }
    el.removeAttribute('data-typing');
  };

  const run = async () => {
    while (alive) {
      await untilVisible();
      lines.forEach((l) => l.setAttribute('data-hidden', ''));
      if (status) status.textContent = 'running';
      const t0 = performance.now();
      for (let i = 0; i < lines.length; i++) {
        await untilVisible();
        const line = lines[i];
        const text = line.querySelector<HTMLElement>('[data-trace-text]')!;
        line.removeAttribute('data-hidden');
        await type(text, texts[i]);
        await wait(line.classList.contains('role-tool') ? 520 : 260);
      }
      if (status) status.textContent = `done in ${((performance.now() - t0) / 1000).toFixed(1)} s`;
      await wait(6000);
    }
  };

  run();
  return () => {
    alive = false;
    io.disconnect();
  };
}
