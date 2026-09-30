import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

type Font = { name: string; data: ArrayBuffer; weight: 400 | 500 | 700; style: 'normal' };

let fontsCache: Font[] | null = null;
let portraitCache: string | null = null;

export async function loadFonts(): Promise<Font[]> {
  if (fontsCache) return fontsCache;
  const dir = path.resolve('src/assets/fonts');
  const read = async (file: string) => {
    const buf = await fs.readFile(path.join(dir, file));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  };
  fontsCache = [
    { name: 'Inter Tight', data: await read('InterTight-Regular.woff'), weight: 400, style: 'normal' },
    { name: 'Inter Tight', data: await read('InterTight-Bold.woff'), weight: 700, style: 'normal' },
    { name: 'JetBrains Mono', data: await read('JetBrainsMono-Regular.woff'), weight: 400, style: 'normal' },
  ];
  return fontsCache;
}

export async function loadPortrait(): Promise<string> {
  if (portraitCache) return portraitCache;
  const buf = await sharp(path.resolve('src/assets/sushank-ghimire.png')).resize(240, 240, { fit: 'cover', position: 'top' }).png().toBuffer();
  portraitCache = `data:image/png;base64,${buf.toString('base64')}`;
  return portraitCache;
}

const h = (type: string, props: Record<string, unknown>, ...children: unknown[]) => ({
  type,
  props: { ...props, children: children.length === 0 ? undefined : children.length === 1 ? children[0] : children },
});

export function ogTemplate(opts: { kind: 'home' | 'post'; title: string; subtitle: string; meta?: string; portrait: string }) {
  const { kind, title, subtitle, meta, portrait } = opts;
  const isHome = kind === 'home';
  return h(
    'div',
    {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        background: '#f6f2ea',
        color: '#221f1b',
        fontFamily: 'Inter Tight',
        position: 'relative',
      },
    },
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: '14px', fontFamily: 'JetBrains Mono', fontSize: '22px', color: '#5d574d' } },
        h('div', { style: { width: '12px', height: '12px', borderRadius: '50%', background: '#c4312a' } }),
        isHome ? 'sushankghimire.com.np' : 'sushankghimire.com.np/blog',
      ),
      h('div', { style: { fontFamily: 'JetBrains Mono', fontSize: '22px', color: '#c4312a' } }, meta ?? 'AI engineer'),
    ),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '980px' } },
      h(
        'div',
        {
          style: {
            fontSize: isHome ? '92px' : '60px',
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: isHome ? '-4px' : '-2px',
            color: '#232b55',
          },
        },
        title,
      ),
      h('div', { style: { fontSize: '30px', lineHeight: 1.35, color: '#5d574d', maxWidth: '900px' } }, subtitle),
    ),
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: '20px' } },
      h('img', { src: portrait, width: 72, height: 72, style: { borderRadius: '50%', border: '3px solid #c4312a' } }),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
        h('div', { style: { fontSize: '28px', fontWeight: 700, color: '#232b55' } }, 'Sushank Ghimire'),
        h('div', { style: { fontSize: '22px', color: '#5d574d' } }, 'AI engineer, Kathmandu, Nepal'),
      ),
    ),
  );
}
