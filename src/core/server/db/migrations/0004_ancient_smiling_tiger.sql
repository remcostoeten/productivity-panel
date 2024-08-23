CREATE TABLE `unique_visits` (
	`user_id` text PRIMARY KEY NOT NULL,
	`visited_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
DROP TABLE `site_visits`;