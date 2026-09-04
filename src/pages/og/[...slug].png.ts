import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { loadFonts, loadPortrait, ogTemplate } from '../../lib/og';

type Props = { kind: 'home' | 'post'; title: string; subtitle: string; meta?: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog', (p) => !p.data.draft);
  return [
    {
      params: { slug: 'home' },
      props: {
        kind: 'home',
        title: 'Sushank Ghimire',
        subtitle: 'AI engineer building LLM agents, RAG systems and document intelligence in production.',
        meta: 'AI ENGINEER',
      } satisfies Props,
    },
    ...posts.map((p) => ({
      params: { slug: p.id },
      props: {
        kind: 'post',
        title: p.data.title,
        subtitle: p.data.description,
        meta: p.data.pubDate.toISOString().slice(0, 10),
      } satisfies Props,
    })),
  ];
};

export const GET: APIRoute<Props> = async ({ props }) => {
  const [fonts, portrait] = await Promise.all([loadFonts(), loadPortrait()]);
  const svg = await satori(ogTemplate({ ...props, portrait }) as never, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
