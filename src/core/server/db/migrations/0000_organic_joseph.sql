CREATE TABLE `site_visits` (
	`path` text NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`last_visited` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`first_name` text,
	`last_name` text,
	`is_admin` integer DEFAULT 0 NOT NULL,
	`last_sign_in` integer,
	`sign_in_count` integer DEFAULT 0 NOT NULL,
	`profile_image_url` text,
	`email_verified` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `wishlists` (
	`id` text PRIMARY KEY DEFAULT (uuid()) NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`budget` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);