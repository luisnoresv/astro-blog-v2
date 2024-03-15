import { Feedback, db } from "astro:db";

export default async function () {
  await db.insert(Feedback).values([
    {
      author: "John Doe",
      body: "This tech blog is awesome",
    },
    {
      author: "Jane Doe",
      body: "I love the stuff that they writting here",
    },
    {
      author: "Luis Nores",
      body: "I love how they handle different topics",
    },
  ]);
}
