import { expect, test } from '@playwright/test';

test('board selection — several clues used across categories', async ({ mount }) => {
	const component = await mount('components/play/board/WithUsedClues');
	await expect(component).toHaveScreenshot();
});
