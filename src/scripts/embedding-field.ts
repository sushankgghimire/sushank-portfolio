import { Renderer, Camera, Transform, Geometry, Program, Mesh } from 'ogl';

const POINT_VERT = /* glsl */ `
attribute vec3 position;
attribute vec3 target;
attribute float seed;
attribute float cid;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uMix;
uniform float uDpr;
varying float vAlpha;
varying float vCid;
varying float vMix;
void main() {
  float m = smoothstep(0.0, 1.0, clamp((uMix - seed * 0.35) / 0.65, 0.0, 1.0));
  vec3 p = mix(position, target, m);
  p += 0.05 * vec3(sin(uTime * 0.9 + seed * 40.0), cos(uTime * 0.7 + seed * 30.0), sin(uTime * 0.5 + seed * 20.0));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = (1.4 + seed * 2.4) * uDpr;
  gl_PointSize = size * (6.5 / -mv.z);
  vAlpha = clamp(1.15 - (-mv.z - 4.5) / 5.0, 0.2, 1.0);
  vCid = cid;
  vMix = m;
}
`;

const POINT_FRAG = /* glsl */ `
precision highp float;
varying float vAlpha;
varying float vCid;
varying float vMix;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float a = smoothstep(0.5, 0.12, d) * vAlpha;
  vec3 cyan = vec3(0.133, 0.827, 0.933);
  vec3 violet = vec3(0.655, 0.545, 0.980);
  vec3 grey = vec3(0.62, 0.66, 0.76);
  float t = mod(vCid, 3.0) / 2.0;
  vec3 clustered = mix(cyan, violet, t);
  vec3 col = mix(grey, clustered, vMix);
  gl_FragColor = vec4(col * a, a);
}
`;

const LINE_VERT = /* glsl */ `
attribute vec3 position;
attribute vec3 target;
attribute float seed;
attribute float cid;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uMix;
varying float vAlpha;
varying float vCid;
void main() {
  float m = smoothstep(0.0, 1.0, clamp((uMix - seed * 0.35) / 0.65, 0.0, 1.0));
  vec3 p = mix(position, target, m);
  p += 0.05 * vec3(sin(uTime * 0.9 + seed * 40.0), cos(uTime * 0.7 + seed * 30.0), sin(uTime * 0.5 + seed * 20.0));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  vAlpha = smoothstep(0.55, 1.0, uMix) * 0.22;
  vCid = cid;
}
`;

const LINE_FRAG = /* glsl */ `
precision highp float;
varying float vAlpha;
varying float vCid;
void main() {
  vec3 cyan = vec3(0.133, 0.827, 0.933);
  vec3 violet = vec3(0.655, 0.545, 0.980);
  vec3 col = mix(cyan, violet, mod(vCid, 3.0) / 2.0);
  gl_FragColor = vec4(col * vAlpha, vAlpha);
}
`;

export function mount(host: HTMLElement, canvas: HTMLCanvasElement) {
  const dpr = Math.min(1.5, window.devicePixelRatio || 1);
  const renderer = new Renderer({ canvas, dpr, alpha: true, antialias: false, depth: false, premultipliedAlpha: true });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);

  const camera = new Camera(gl, { fov: 38, near: 0.1, far: 100 });
  camera.position.set(0, 0, 7);
  const scene = new Transform();

  const N = 4096;
  const CL = 6;
  const centers: [number, number, number][] = Array.from({ length: CL }, (_, i) => {
    const a = (i / CL) * Math.PI * 2 + 0.4;
    return [Math.cos(a) * 1.7, Math.sin(a) * 1.25 + (i % 2 ? 0.35 : -0.35), Math.sin(a * 2) * 0.7];
  });
  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) * 0.5;

  const scatter = new Float32Array(N * 3);
  const target = new Float32Array(N * 3);
  const seed = new Float32Array(N);
  const cid = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const u = Math.random();
    const v = Math.random();
    const th = 2 * Math.PI * u;
    const ph = Math.acos(2 * v - 1);
    const r = 2.7 * Math.cbrt(Math.random());
    scatter.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)], i * 3);
    const c = i % CL;
    const cc = centers[c];
    target.set([cc[0] + gauss(), cc[1] + gauss(), cc[2] + gauss()], i * 3);
    seed[i] = Math.random();
    cid[i] = c;
  }

  const uniforms = { uTime: { value: 0 }, uMix: { value: 0 }, uDpr: { value: dpr } };

  const pointGeo = new Geometry(gl, {
    position: { size: 3, data: scatter },
    target: { size: 3, data: target },
    seed: { size: 1, data: seed },
    cid: { size: 1, data: cid },
  });
  const pointProg = new Program(gl, { vertex: POINT_VERT, fragment: POINT_FRAG, uniforms, transparent: true, depthTest: false, depthWrite: false });
  new Mesh(gl, { mode: gl.POINTS, geometry: pointGeo, program: pointProg }).setParent(scene);

  // Lines between random members of the same cluster. They only show once clustered.
  const L = 720;
  const per = N / CL;
  const lp = new Float32Array(L * 2 * 3);
  const lt = new Float32Array(L * 2 * 3);
  const ls = new Float32Array(L * 2);
  const lc = new Float32Array(L * 2);
  for (let k = 0; k < L; k++) {
    const c = k % CL;
    const a = c + CL * Math.floor(Math.random() * per);
    const b = c + CL * Math.floor(Math.random() * per);
    [a, b].forEach((idx, slot) => {
      const o = (k * 2 + slot) * 3;
      lp.set(scatter.subarray(idx * 3, idx * 3 + 3), o);
      lt.set(target.subarray(idx * 3, idx * 3 + 3), o);
      ls[k * 2 + slot] = seed[idx];
      lc[k * 2 + slot] = c;
    });
  }
  const lineGeo = new Geometry(gl, {
    position: { size: 3, data: lp },
    target: { size: 3, data: lt },
    seed: { size: 1, data: ls },
    cid: { size: 1, data: lc },
  });
  const lineProg = new Program(gl, { vertex: LINE_VERT, fragment: LINE_FRAG, uniforms, transparent: true, depthTest: false, depthWrite: false });
  new Mesh(gl, { mode: gl.LINES, geometry: lineGeo, program: lineProg }).setParent(scene);

  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.perspective({ aspect: w / h });
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  // Pointer parallax, eased.
  let tx = 0;
  let ty = 0;
  let rx = 0;
  let ry = 0;
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
    ty = ((e.clientY - r.top) / r.height - 0.5) * 0.6;
  };
  const onLeave = () => {
    tx = 0;
    ty = 0;
  };
  host.addEventListener('pointermove', onMove, { passive: true });
  host.addEventListener('pointerleave', onLeave);

  let visible = true;
  const io = new IntersectionObserver((es) => {
    visible = es.some((e) => e.isIntersecting);
  });
  io.observe(host);

  const stateEl = host.querySelector<HTMLElement>('[data-field-state]');
  let lastMix = 0;
  let lastLabel = '';
  let raf = 0;
  const t0 = performance.now();

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    const t = (now - t0) / 1000;
    uniforms.uTime.value = t;
    // Slow breathing between scattered tokens and semantic clusters, with holds at both ends.
    const s = 0.5 + 0.5 * Math.sin(t * 0.32 - Math.PI / 2);
    const mix = smoothstep(0.12, 0.88, s);
    uniforms.uMix.value = mix;
    if (stateEl) {
      const label = mix > 0.95 ? 'state: clustered' : mix < 0.05 ? 'state: raw tokens' : mix > lastMix ? 'state: clustering' : 'state: scattering';
      if (label !== lastLabel) {
        stateEl.textContent = label;
        lastLabel = label;
      }
    }
    lastMix = mix;

    rx += (ty * 0.5 - rx) * 0.04;
    ry += (tx * 0.5 - ry) * 0.04;
    scene.rotation.x = rx + Math.sin(t * 0.12) * 0.08;
    scene.rotation.y = ry + t * 0.09;

    renderer.render({ scene, camera });
    if (!host.hasAttribute('data-ready')) host.setAttribute('data-ready', '');
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    host.removeEventListener('pointermove', onMove);
    host.removeEventListener('pointerleave', onLeave);
  };
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
