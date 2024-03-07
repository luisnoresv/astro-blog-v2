import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    author: reference("team"),
    image: z.string(),
    tags: z.array(z.string()),
  }),
});

const teamCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      hierarchy: z.number(),
      name: z.string(),
      bio: z.string(),
      email: z.string(),
      role: z.enum([
        "Founder & Editor-in-Chief",
        "Lead Writer",
        "Tech Analyst",
        "Content Creator",
      ]),
      headshot: image(),
    }),
});

export const collections = {
  blog: blogCollection,
  team: teamCollection,
};
