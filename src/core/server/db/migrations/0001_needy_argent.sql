CREATE TABLE `personal_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`recipient_id` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`expires_at` integer,
	`is_active` integer DEFAULT true NOT NULL,
	`is_urgent` integer DEFAULT false NOT NULL,
	`created_by` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `global_messages` ADD `is_urgent` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `global_messages` ADD `created_by` text NOT NULL;