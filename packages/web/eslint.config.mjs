// @ts-check
import { createNuxtConfig } from '@stream-keepr/eslint/nuxt';
import * as drizzle from 'eslint-plugin-drizzle';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(createNuxtConfig(
	{
		plugins: {
			drizzle,
		},
		...drizzle.configs.recommended.rules,
	},
));
