import { column, defineDb, defineTable } from "astro:db";

// https://astro.build/db/config

const Feedback = defineTable({
  columns: {
    author: column.text({}),
    body: column.text(),
    postedDate: column.date({ default: new Date() }),
  },
});

export default defineDb({
  tables: { Feedback },
});
