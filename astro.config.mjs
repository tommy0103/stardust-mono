// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import rehypeMathjax from 'rehype-mathjax/chtml';
import remarkMath from 'remark-math';
import remarkBlockquoteBreaks from './src/remark/remark-blockquote-breaks.mjs';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    rehypePlugins: [[rehypeMathjax, {
      chtml: {
        fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
      }
    }]],
    /* remark-math 需先于其它会改写文本的插件 */
    remarkPlugins: [remarkMath, remarkBlockquoteBreaks],
  },

  adapter: vercel()
});