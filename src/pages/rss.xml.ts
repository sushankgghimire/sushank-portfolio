import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { profile, SITE_URL } from '../data/profile';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', (p) => !p.data.draft)).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: `${profile.name}: writing on AI engineering`,
    description: 'Field notes on LLM agents, retrieval systems and production AI backends by Sushank Ghimire.',
    site: context.site ?? SITE_URL,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/blog/${p.id}/`,
      categories: p.data.tags,
      author: `${profile.email} (${profile.name})`,
    })),
    customData: '<language>en-us</language>',
    stylesheet: false,
  });
}
