import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(ctx) {
    return rss({
        title: "Astro Learner | Blog",
        description: "A blog about Astro",
        site: ctx.site,
        items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")),
        customData: "<language>en</language>",
    });
}
