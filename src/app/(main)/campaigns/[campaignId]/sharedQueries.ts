import { graphql } from "@/__generated__/graphql";
import { GRAPHQL_URL } from "@/lib/get-urls";
import request from "graphql-request";

export const requestDonationProgress = async (id: string) => {
  const query = graphql(`
    query DonationProgress($where: CampaignFilters) {
      campaignSingle(where: $where) {
        goal
        donations {
          amount
        }
      }
    }
  `);

  return request(GRAPHQL_URL, query, {
    where: {
      id: {
        eq: Number(id),
      },
    },
  });
};

export const requestRecentDonations = async (id: string, limit: number, offset: number) => {
  const query = graphql(`
    query Donations($limit: Int, $offset: Int, $where: DonationsFilters, $orderBy: DonationsOrderBy) {
      donations(limit: $limit, offset: $offset, where: $where, orderBy: $orderBy) {
        amount
        donatedAt
        id
        name
      }
    }
  `);

  return request(GRAPHQL_URL, query, {
    where: {
      campaignId: {
        eq: Number(id),
      },
    },
    limit: limit,
    offset: offset,
    orderBy: {
      donatedAt: {
        direction: "desc",
        priority: 1,
      },
    },
  });
};
