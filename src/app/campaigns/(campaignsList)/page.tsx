import { graphql } from "@/__generated__/graphql";
import { GRAPHQL_URL } from "@/lib/graphql-queries";
import { QueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Campaign } from "../campaign";

const query = graphql(`
  query categoriesWithCampaigns($limit: Int, $orderBy: CampaignOrderBy) {
    category {
      name
      id
      campaigns(limit: $limit, orderBy: $orderBy) {
        id
        goal
        donations {
          amount
        }
        title
      }
    }
  }
`);

export default async function Page() {
  const queryClient = new QueryClient();

  const { category: categories } = await queryClient.fetchQuery({
    queryKey: ["categoriesWithCampaigns"],
    queryFn: async () =>
      await request(GRAPHQL_URL, query, {
        limit: 3,
        orderBy: {
          createdAt: {
            direction: "desc",
            priority: 0,
          },
        },
      }),
  });

  return (
    <>
      {categories.map((category) => (
        <section className="space-y-3 border-b border-neutral-400 py-3" key={category.id}>
          <h2 className="text-2xl font-bold">{category.name} Campaigns</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {category.campaigns.map((campaign) => (
              <Campaign
                key={campaign.id}
                data={{
                  id: campaign.id,
                  title: campaign.title,
                  raised: campaign.donations.reduce((acc, donation) => acc + donation.amount, 0),
                  goal: campaign.goal,
                  amount: campaign.donations.length,
                }}
              />
            ))}
          </div>
          <Link
            href={`/campaigns/category/${category.id}`}
            className="flex items-center justify-end gap-1 text-neutral-400"
          >
            <span>Show more</span>
            <ArrowRight size="20" className="self-baseline-last" />
          </Link>
        </section>
      ))}
    </>
  );
}
