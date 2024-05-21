import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Use this object to send drizzle queries to your DB
// export const db = drizzle(sql,{schema});

const sql = neon<boolean, boolean>(process.env.POSTGRES_URL!);
export const db = drizzle(sql, { schema });
