import * as dbSchema from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { buildSchema } from "drizzle-graphql";
import { drizzle } from "drizzle-orm/neon-http";
import { GraphQLSchema } from "graphql";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema: dbSchema });

export const schema: GraphQLSchema = buildSchema(db).schema;
