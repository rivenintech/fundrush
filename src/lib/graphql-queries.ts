import { graphql } from "@/__generated__/graphql/gql";
import request from "graphql-request";
import { GRAPHQL_URL } from "./get-urls";

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
