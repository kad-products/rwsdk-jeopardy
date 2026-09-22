import { expect, test } from '@playwright/test';

test('host view — contestant is making a selection', async ({ mount }) => {
	const component = await mount('views/__shells__/_host-shell/ContestantChoosingClue');
	await expect(component).toHaveScreenshot();
});

test('host view — contestant has buzzed in and is answering', async ({ mount }) => {
	const component = await mount('views/__shells__/_host-shell/ContestantBuzzedIn');
	await expect(component).toHaveScreenshot();
});
