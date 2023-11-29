import { defineConfig } from "astro/config";
//import { vite } from "astro";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  server: { port: 8000, host: true },
  // vite: {
  //	  optimizeDeps: {
  //		  include: ["nanostores"],
  //	  },
  //},
  outDir: "./static",
});
