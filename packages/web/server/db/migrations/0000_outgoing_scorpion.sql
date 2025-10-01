CREATE TYPE "public"."clock_mode" AS ENUM('countdown', 'countup');--> statement-breakpoint
CREATE TYPE "public"."event_mode" AS ENUM('manual', 'tournament');--> statement-breakpoint
CREATE TYPE "public"."game" AS ENUM('mtg', 'op');--> statement-breakpoint
CREATE TYPE "public"."match_orientation" AS ENUM('horizontal', 'vertical');--> statement-breakpoint
CREATE TABLE "configs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "overlay_configs" (
	"id" serial PRIMARY KEY NOT NULL,
	"config_id" integer NOT NULL,
	"match_orientation" "match_orientation" NOT NULL,
	"card_timeout" integer NOT NULL,
	"card_size" integer NOT NULL,
	"clear_preview_on_show" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "talents" (
	"id" serial PRIMARY KEY NOT NULL,
	"config_id" integer NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tournament_configs" (
	"id" serial PRIMARY KEY NOT NULL,
	"config_id" integer NOT NULL,
	"game" "game" NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(1000),
	"days" integer NOT NULL,
	"event_mode" "event_mode" NOT NULL,
	"default_clock_duration" integer NOT NULL,
	"default_clock_mode" "clock_mode" NOT NULL,
	"swiss_rounds" integer NOT NULL,
	"swiss_round_time" integer NOT NULL,
	"cut_rounds" integer NOT NULL,
	"cut_round_time" integer NOT NULL,
	"player_count" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "overlay_configs" ADD CONSTRAINT "overlay_configs_config_id_configs_id_fk" FOREIGN KEY ("config_id") REFERENCES "public"."configs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "talents" ADD CONSTRAINT "talents_config_id_configs_id_fk" FOREIGN KEY ("config_id") REFERENCES "public"."configs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tournament_configs" ADD CONSTRAINT "tournament_configs_config_id_configs_id_fk" FOREIGN KEY ("config_id") REFERENCES "public"."configs"("id") ON DELETE no action ON UPDATE no action;