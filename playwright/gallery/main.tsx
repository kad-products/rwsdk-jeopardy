/// <reference types="vite/client" />
import '../../src/styles/main.css';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';

const stories = import.meta.glob('../../src/**/*.story.{tsx,jsx}');
const id = (f: string) => f.replace(/^(\.\.\/)+src\//, '').replace(/\.story\.\w+$/, '');

async function resolve(storyId: string) {
	const sep = storyId.lastIndexOf('/');
	const [path, name] = [storyId.slice(0, sep), storyId.slice(sep + 1)];
	const file = Object.keys(stories).find(f => id(f) === path || id(f).endsWith('/' + path));
	const mod = (file && (await stories[file]())) as Record<string, unknown> | undefined;
	return (mod?.[name] ?? mod?.default) as React.ComponentType<Record<string, unknown>> | undefined;
}

const rootEl = document.getElementById('root')!;
let root: Root | undefined;

(window as unknown as Record<string, unknown>).mount = async ({ story, props }: { story: string; props?: Record<string, unknown> }) => {
	const Story = await resolve(story);
	if (!Story) throw new Error(`Unknown story: ${story}`);
	root ??= createRoot(rootEl);
	flushSync(() => root!.render(<Story {...props} />));
};

(window as unknown as Record<string, unknown>).unmount = async () => {
	root?.unmount();
	root = undefined;
};
