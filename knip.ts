export default {
	tags: ['-lintignore', '-knipTestExport'],
	ignoreDependencies: ['cloudflare'],
	ignoreExportsUsedInFile: true,
	entry: ['tests/mocks/**', 'playwright/gallery/main.tsx'],
	ignoreFiles: ['src/client.tsx', 'release.config.js'],
	compilers: {
		css: (text: string): string => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
	},
};
