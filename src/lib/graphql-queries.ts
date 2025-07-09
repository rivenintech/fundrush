import { graphql } from "@/__generated__/graphql/gql";
import request from "graphql-request";

export const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/graphql`;

export const requestCampaigns = async (limit: number | null = null) => {
  const query = graphql(`
    query Campaign($limit: Int) {
      campaign(limit: $limit) {
        id
        title
        category {
          name
        }
        goal
        donations {
          amount
        }
      }
    }
  `);

  return request(GRAPHQL_URL, query, { limit });
};
