import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://webnostra.pro',
  trailingSlash: 'always',
  build: {
    format: 'directory', // /cases/good-karma/ вместо /cases/good-karma.html
  },
  integrations: [
    mdx(),
    sitemap({
      // Блог пока скрыт из sitemap до первых постов.
      // Paid-лендинги /performance/ads/* тоже исключаем — они для платного трафика.
      filter: (page) => !page.includes('/blog/') && !page.includes('/performance/ads/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        // Сюда можно добавить страницы, которые не генерируются Astro напрямую
      ],
    }),
  ],
  // vite config — esbuild-минификация CSS по умолчанию, достаточно для старта
});
