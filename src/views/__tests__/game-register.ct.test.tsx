import { expect, test } from '@playwright/test';
import type { ContestantRegistration, DisplayRegistration, Permission } from '@/types';

// ── Shared fixtures ───────────────────────────────────────────────────────────

const GAME_URL = 'https://example.com/games/mock-id/register';

const CONTESTANTS = {
	none: [] as ContestantRegistration[],
	one: [{ sessionId: 'c1', name: 'Alice' }] as ContestantRegistration[],
	many: [
		{ sessionId: 'c1', name: 'Alice' },
		{ sessionId: 'c2', name: 'Bob' },
	] as ContestantRegistration[],
};

const PERMISSIONS = {
	host: ['games:host'] as Permission[],
	none: [] as Permission[],
};

const DISPLAY: DisplayRegistration = { sessionId: 'display-session' };

// ── Unregistered user: page-level option visibility ───────────────────────────

type UnregisteredCase = {
	label: string;
	hasHost: boolean;
	hasDisplay: boolean;
	userPermissions: Permission[];
	contestants: ContestantRegistration[];
};

// biome-ignore format: compact table layout — each row is one test case
const UNREGISTERED_CASES: UnregisteredCase[] = [
	// ── no slots taken ──────────────────────────────────────────────────────────
	{ label: 'no slots taken | host perm | no contestants', hasHost: false, hasDisplay: false, userPermissions: PERMISSIONS.host, contestants: CONTESTANTS.none },
	{ label: 'no slots taken | host perm | 1 contestant',   hasHost: false, hasDisplay: false, userPermissions: PERMISSIONS.host, contestants: CONTESTANTS.one  },
	{ label: 'no slots taken | host perm | 2 contestants',  hasHost: false, hasDisplay: false, userPermissions: PERMISSIONS.host, contestants: CONTESTANTS.many },
	{ label: 'no slots taken | no perm  | no contestants',  hasHost: false, hasDisplay: false, userPermissions: PERMISSIONS.none, contestants: CONTESTANTS.none },
	{ label: 'no slots taken | no perm  | 1 contestant',    hasHost: false, hasDisplay: false, userPermissions: PERMISSIONS.none, contestants: CONTESTANTS.one  },
	{ label: 'no slots taken | no perm  | 2 contestants',   hasHost: false, hasDisplay: false, userPermissions: PERMISSIONS.none, contestants: CONTESTANTS.many },
	// ── host slot taken ─────────────────────────────────────────────────────────
	{ label: 'host taken | host perm | no contestants',     hasHost: true,  hasDisplay: false, userPermissions: PERMISSIONS.host, contestants: CONTESTANTS.none },
	{ label: 'host taken | host perm | 1 contestant',       hasHost: true,  hasDisplay: false, userPermissions: PERMISSIONS.host, contestants: CONTESTANTS.one  },
	{ label: 'host taken | host perm | 2 contestants',      hasHost: true,  hasDisplay: false, userPermissions: PERMISSIONS.host, contestants: CONTESTANTS.many },
	{ label: 'host taken | no perm  | no contestants',      hasHost: true,  hasDisplay: false, userPermissions: PERMISSIONS.none, contestants: CONTESTANTS.none },
	{ label: 'host taken | no perm  | 1 contestant',        hasHost: true,  hasDisplay: false, userPermissions: PERMISSIONS.none, contestants: CONTESTANTS.one  },
	{ label: 'host taken | no perm  | 2 contestants',       hasHost: true,  hasDisplay: false, userPermissions: PERMISSIONS.none, contestants: CONTESTANTS.many },
	// ── display slot taken ──────────────────────────────────────────────────────
	{ label: 'display taken | host perm | no contestants',  hasHost: false, hasDisplay: true,  userPermissions: PERMISSIONS.host, contestants: CONTESTANTS.none },
	{ label: 'display taken | host perm | 1 contestant',    hasHost: false, hasDisplay: true,  userPermissions: PERMISSIONS.host, contestants: CONTESTANTS.one  },
	{ label: 'display taken | host perm | 2 contestants',   hasHost: false, hasDisplay: true,  userPermissions: PERMISSIONS.host, contestants: CONTESTANTS.many },
	{ label: 'display taken | no perm  | no contestants',   hasHost: false, hasDisplay: true,  userPermissions: PERMISSIONS.none, contestants: CONTESTANTS.none },
	{ label: 'display taken | no perm  | 1 contestant',     hasHost: false, hasDisplay: true,  userPermissions: PERMISSIONS.none, contestants: CONTESTANTS.one  },
	{ label: 'display taken | no perm  | 2 contestants',    hasHost: false, hasDisplay: true,  userPermissions: PERMISSIONS.none, contestants: CONTESTANTS.many },
	// ── both slots taken ────────────────────────────────────────────────────────
	{ label: 'both taken | host perm | no contestants',     hasHost: true,  hasDisplay: true,  userPermissions: PERMISSIONS.host, contestants: CONTESTANTS.none },
	{ label: 'both taken | host perm | 1 contestant',       hasHost: true,  hasDisplay: true,  userPermissions: PERMISSIONS.host, contestants: CONTESTANTS.one  },
	{ label: 'both taken | host perm | 2 contestants',      hasHost: true,  hasDisplay: true,  userPermissions: PERMISSIONS.host, contestants: CONTESTANTS.many },
	{ label: 'both taken | no perm  | no contestants',      hasHost: true,  hasDisplay: true,  userPermissions: PERMISSIONS.none, contestants: CONTESTANTS.none },
	{ label: 'both taken | no perm  | 1 contestant',        hasHost: true,  hasDisplay: true,  userPermissions: PERMISSIONS.none, contestants: CONTESTANTS.one  },
	{ label: 'both taken | no perm  | 2 contestants',       hasHost: true,  hasDisplay: true,  userPermissions: PERMISSIONS.none, contestants: CONTESTANTS.many },
];

for (const { label, ...props } of UNREGISTERED_CASES) {
	test(`registration page — ${label}`, async ({ mount }) => {
		const component = await mount('views/__shells__/_register-shell/Default', { ...props, gameRegistrationUrl: GAME_URL });
		await expect(component).toHaveScreenshot();
	});
}

// ── Registered user: current user role views ──────────────────────────────────

test('registration page — registered as display', async ({ mount }) => {
	const component = await mount('views/__shells__/_register-shell/Default', {
		currentUserRole: 'display',
		hasHost: false,
		hasDisplay: true,
		contestants: CONTESTANTS.none,
		userPermissions: PERMISSIONS.host,
		gameRegistrationUrl: GAME_URL,
	});
	await expect(component).toHaveScreenshot();
});

test('registration page — registered as contestant', async ({ mount }) => {
	const component = await mount('views/__shells__/_register-shell/Default', {
		currentUserRole: 'contestant',
		hasHost: false,
		hasDisplay: false,
		contestants: CONTESTANTS.none,
		userPermissions: PERMISSIONS.host,
		gameRegistrationUrl: GAME_URL,
	});
	await expect(component).toHaveScreenshot();
});

test('registration page — registered as host | no display registered', async ({ mount }) => {
	const component = await mount('views/__shells__/_register-shell/Default', {
		currentUserRole: 'host',
		hasHost: true,
		hasDisplay: false,
		contestants: CONTESTANTS.none,
		userPermissions: PERMISSIONS.host,
		gameRegistrationUrl: GAME_URL,
	});
	await expect(component).toHaveScreenshot();
});

test('registration page — registered as host | display registered | fewer than 2 contestants', async ({ mount }) => {
	const component = await mount('views/__shells__/_register-shell/Default', {
		currentUserRole: 'host',
		hasHost: true,
		hasDisplay: true,
		display: DISPLAY,
		contestants: CONTESTANTS.one,
		userPermissions: PERMISSIONS.host,
		gameRegistrationUrl: GAME_URL,
	});
	await expect(component).toHaveScreenshot();
});

test('registration page — registered as host | display registered | 2+ contestants', async ({ mount }) => {
	const component = await mount('views/__shells__/_register-shell/Default', {
		currentUserRole: 'host',
		hasHost: true,
		hasDisplay: true,
		display: DISPLAY,
		contestants: CONTESTANTS.many,
		userPermissions: PERMISSIONS.host,
		gameRegistrationUrl: GAME_URL,
	});
	await expect(component).toHaveScreenshot();
});
