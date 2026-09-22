import { expect, test } from '@playwright/test';

test('contestant view — active contestant making a selection', async ({ mount }) => {
	const component = await mount('views/__shells__/_contestant-shell/ActiveContestantChoosingClue');
	await expect(component).toHaveScreenshot();
});

test('contestant view — clue selected, buzzer ready', async ({ mount }) => {
	const component = await mount('views/__shells__/_contestant-shell/ClueSelectedBuzzerReady');
	await expect(component).toHaveScreenshot();
});
