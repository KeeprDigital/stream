import process from 'node:process';
import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

export default defineConfig({
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
	schema: './server/db/schema/*',
	out: './server/db/migrations',
	dialect: 'postgresql',
	verbose: true,
	strict: true,
});
