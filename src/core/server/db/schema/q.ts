import { on } from "events"
import { Settings } from "lucide-react"
import { join } from "path"
import { from } from "svix/dist/openapi/rxjsStub"
import { users } from "./users"
import { Alice } from "next/font/google"

- users
id | username | password | updated_at | created_at
-----------
1,quinten,doiwakd

- user_profiles
id | userid | firstname | lastname | bio | updated_at | created_at
-----------
1,1,Quinten,Peels,Hello There

- Settings
id | userid | key | value
-----------
1,123,allow_notifications,true
1,123,show_preloader,false

select * from users left join user_profiles users.id on user_profiles.user_id




- users
id | username | password | updated_at | created_at
-----------
1, john, doe
2, alice, smith
3, george, clooney

- user_profiles
id | userid | firstname | lastname | bio | updated_at | created_at
-----------
1,3,Quinten,Peels,Hello There
2,1,John,Doe
3,2,Alice,Smith

- Settings
id | userid | key | value
-----------
1,123,allow_notifications,true
1,123,show_preloader,false

select 


// export const users = sqliteTable("users", {
//     id: text("id").primaryKey(),
//     email: text("email").notNull().unique(),
//     username: text("username").unique(),
//     firstName: text("first_name"),
//     lastName: text("last_name"),
//     bio: text("bio"),
//     dateOfBirth: integer("date_of_birth"),
//     isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
//     profileImageUrl: text("profile_image_url"),
//     lastSignIn: integer("last_sign_in"),
//     signInCount: integer("sign_in_count").notNull().default(0),
//     emailVerified: integer("email_verified", { mode: "boolean" })
//       .notNull()
//       .default(false),
//     createdAt: integer("created_at")
//       .notNull()
//       .default(sql`(strftime('%s', 'now'))`),
//     updatedAt: integer("updated_at")
//       .notNull()
//       .default(sql`(strftime('%s', 'now'))`),
//     showPreloader: integer("show_preloader", { mode: "boolean" })
//       .notNull()
//       .default(true),
//     allowNotifications: integer("allow_notifications", { mode: "boolean" })
//       .notNull()
//       .default(true),
//   });
  