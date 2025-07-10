import { db } from "@/db/client";
import { buildSchema } from "drizzle-graphql";
import { GraphQLSchema } from "graphql";

export const schema: GraphQLSchema = buildSchema(db).schema;
