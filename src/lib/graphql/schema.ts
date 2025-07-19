import { db } from "@/db/client";
import { buildSchema } from "drizzle-graphql";
import { GraphQLObjectType, GraphQLSchema } from "graphql";

const { entities } = buildSchema(db);

// GraphQL is only used on the frontend, so don't expose mutations
// and only expose queries that are safe to be used on the client.
export const schema: GraphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      ...entities.queries,
    },
  }),
});
