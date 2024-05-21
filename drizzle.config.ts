import { env } from "~/env";

// export default {
//   schema: "./src/server/db/schema.ts",
//   driver: "pg",
//   dbCredentials: {
//     connectionString: env.POSTGRES_URL,
//   },
//   tablesFilter: ["toysnpark_*"],
// } satisfies Config;

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  
  out: './drizzle/migrations',

  tablesFilter: ["toysnpark_*"],
});
