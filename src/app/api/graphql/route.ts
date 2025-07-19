import { schema } from "@/lib/graphql/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloArmor } from "@escape.tech/graphql-armor";
import { NextRequest } from "next/server";

// https://escape.tech/graphql-armor
const armor = new ApolloArmor();

const server = new ApolloServer({
  schema,
  ...armor.protect(),
  introspection: process.env.NODE_ENV !== "production",
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

// TODO: Change to this after: https://github.com/apollo-server-integrations/apollo-server-integration-next/issues/229
// export { handler as GET, handler as POST };
export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
