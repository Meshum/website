// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
    site: 'https://meshum.dev',
    integrations: [
		sitemap(),
		partytown({
			config: {
				forward: ['clarity']
			}
		})
	],
    vite: {
        plugins: [tailwindcss()]
    }
});
