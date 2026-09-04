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
        background: 'linear-gradient(135deg, #0a0b10 0%, #11131a 60%, #0f1320 100%)',
        color: '#e7e9f0',
        fontFamily: 'Inter Tight',
        position: 'relative',
      },
    },
    h('div', {
      style: {
        position: 'absolute',
        top: '-140px',
        right: '-120px',
        width: '520px',
        height: '520px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(34,211,238,0) 65%)',
      },
    }),
    h('div', {
      style: {
        position: 'absolute',
        bottom: '-200px',
        left: '30%',
        width: '560px',
        height: '560px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.16) 0%, rgba(167,139,250,0) 65%)',
      },
    }),
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: '14px', fontFamily: 'JetBrains Mono', fontSize: '22px', color: '#8b91a3', letterSpacing: '1px' } },
        h('div', { style: { width: '12px', height: '12px', borderRadius: '50%', background: '#34d399' } }),
        isHome ? 'sushankghimire.com.np' : 'sushankghimire.com.np/blog',
      ),
      h('div', { style: { fontFamily: 'JetBrains Mono', fontSize: '22px', color: '#22d3ee', letterSpacing: '1px' } }, meta ?? 'AI ENGINEER'),
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
            color: '#ffffff',
          },
        },
        title,
      ),
      h('div', { style: { fontSize: '30px', lineHeight: 1.35, color: '#a3a8b8', maxWidth: '900px' } }, subtitle),
    ),
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: '20px' } },
      h('img', { src: portrait, width: 72, height: 72, style: { borderRadius: '50%', border: '3px solid #22d3ee' } }),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
        h('div', { style: { fontSize: '28px', fontWeight: 700, color: '#ffffff' } }, 'Sushank Ghimire'),
        h('div', { style: { fontSize: '22px', color: '#8b91a3' } }, 'AI Engineer, Kathmandu, Nepal'),
      ),
    ),
  );
}
