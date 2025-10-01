import { relations } from 'drizzle-orm';
import { boolean, integer, pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

// Enums
export const gameEnum = pgEnum('game', ['mtg', 'op']);
export const eventModeEnum = pgEnum('event_mode', ['manual', 'tournament']);
export const clockModeEnum = pgEnum('clock_mode', ['countdown', 'countup']);
export const matchOrientationEnum = pgEnum('match_orientation', ['horizontal', 'vertical']);

// Main config table
export const configs = pgTable('configs', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

// Tournament configuration
export const tournamentConfigs = pgTable('tournament_configs', {
	id: serial('id').primaryKey(),
	configId: integer('config_id').references(() => configs.id).notNull(),
	game: gameEnum('game').notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	description: varchar('description', { length: 1000 }),
	days: integer('days').notNull(),
	eventMode: eventModeEnum('event_mode').notNull(),
	defaultClockDuration: integer('default_clock_duration').notNull(),
	defaultClockMode: clockModeEnum('default_clock_mode').notNull(),
	swissRounds: integer('swiss_rounds').notNull(),
	swissRoundTime: integer('swiss_round_time').notNull(),
	cutRounds: integer('cut_rounds').notNull(),
	cutRoundTime: integer('cut_round_time').notNull(),
	playerCount: integer('player_count').notNull(),
});

// Overlay configuration
export const overlayConfigs = pgTable('overlay_configs', {
	id: serial('id').primaryKey(),
	configId: integer('config_id').references(() => configs.id).notNull(),
	matchOrientation: matchOrientationEnum('match_orientation').notNull(),
	cardTimeout: integer('card_timeout').notNull(),
	cardSize: integer('card_size').notNull(),
	clearPreviewOnShow: boolean('clear_preview_on_show').notNull(),
});

// Talents table
export const talents = pgTable('talents', {
	id: serial('id').primaryKey(),
	configId: integer('config_id').references(() => configs.id).notNull(),
	name: varchar('name', { length: 255 }).notNull(),
});

// Relations
export const configsRelations = relations(configs, ({ one, many }) => ({
	tournamentConfig: one(tournamentConfigs),
	overlayConfig: one(overlayConfigs),
	talents: many(talents),
}));

export const tournamentConfigsRelations = relations(tournamentConfigs, ({ one }) => ({
	config: one(configs, {
		fields: [tournamentConfigs.configId],
		references: [configs.id],
	}),
}));

export const overlayConfigsRelations = relations(overlayConfigs, ({ one }) => ({
	config: one(configs, {
		fields: [overlayConfigs.configId],
		references: [configs.id],
	}),
}));

export const talentsRelations = relations(talents, ({ one }) => ({
	config: one(configs, {
		fields: [talents.configId],
		references: [configs.id],
	}),
}));
