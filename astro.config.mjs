import { defineConfig } from 'astro/config';
import remarkToc from "remark-toc";
import { transformerNotationDiff, transformerNotationHighlight, transformerNotationWordHighlight } from "@shikijs/transformers";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.jhamill.tech",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [
      remarkToc,
    ],
    shikiConfig: {
      theme: 'catppuccin-mocha',
      wrap: true,
      transformers: [transformerNotationDiff(), transformerNotationHighlight(), transformerNotationWordHighlight()]
    }
  }
});
