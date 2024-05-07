import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(ctx) {
    const posts = await getCollection("posts");

    return rss({
        title: "Astro Learner | Blog",
        description: "A blog about Astro",
        site: ctx.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/posts/${post.slug}/`,
        })),
        customData: "<language>en</language>",
    });
}
