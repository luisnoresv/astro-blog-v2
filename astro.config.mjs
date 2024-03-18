import db from "@astrojs/db";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    db(),
    react({ include: ["**/react/*"] }),
    solidJs({ include: ["**/solid/*", "**/node_modules/@suid/material/**"] }),
  ],
  output: "server",
});
