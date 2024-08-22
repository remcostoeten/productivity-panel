ALTER TABLE `site_visits` ADD `user_id` text;--> statement-breakpoint
ALTER TABLE `site_visits` ADD `ip_address` text;--> statement-breakpoint
ALTER TABLE `site_visits` ADD `user_agent` text;--> statement-breakpoint
ALTER TABLE `site_visits` ADD `referrer` text;--> statement-breakpoint
ALTER TABLE `site_visits` ADD `path` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `show_preloader` integer DEFAULT true NOT NULL;