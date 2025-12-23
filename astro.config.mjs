// @ts-check

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://meshum.dev",
	prefetch: true,
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
	trailingSlash: "never"
});
