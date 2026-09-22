import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cloudflare } from '@cloudflare/vite-plugin';
import { redwood } from 'rwsdk/vite';
import { defineConfig, loadEnv } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => {
	// Gallery mode: plain React dev server for the Playwright CT component gallery.
	// Skips @cloudflare/vite-plugin to avoid the remote proxy session that the AI
	// binding (remote: true) requires, which needs CLOUDFLARE_API_TOKEN in CI.
	if (mode === 'gallery') {
		return {
			css: { modules: { localsConvention: 'camelCase' } },
			resolve: { alias: { '@': path.resolve(__dirname, './src') } },
		};
	}

	const env = loadEnv(mode, process.cwd(), '');
	const tunnelHost = env.VITE_BASE_URL ? new URL(env.VITE_BASE_URL).host : null;

	return {
		css: {
			modules: {
				localsConvention: 'camelCase',
			},
		},
		plugins: [
			cloudflare({
				viteEnvironment: { name: 'worker' },
			}),
			redwood(),
		],
		server: {
			...(tunnelHost && {
				cors: false,
				allowedHosts: [tunnelHost],
				hmr: {
					host: tunnelHost,
					protocol: 'wss',
				},
			}),
		},
	};
});
