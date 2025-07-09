import { graphql } from "@/__generated__/graphql";
import { Campaign } from "@/app/campaigns/campaign";
import { GRAPHQL_URL } from "@/lib/graphql-queries";
import { QueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import { Metadata } from "next";

const query = graphql(`
  query Category($where: CategoryFilters, $orderBy: CampaignOrderBy) {
    categorySingle(where: $where) {
      id
      name
      campaigns(orderBy: $orderBy) {
        id
        title
        goal
        donations {
          amount
        }
      }
    }
  }
`);

async function fetchCategoryData(categoryId: string) {
  const queryClient = new QueryClient();

  const { categorySingle } = await queryClient.fetchQuery({
    queryKey: ["categorySingle", categoryId],
    queryFn: async () =>
      await request(GRAPHQL_URL, query, {
        where: {
          id: {
            eq: categoryId,
          },
        },
        orderBy: {
          createdAt: {
            direction: "desc",
            priority: 0,
          },
        },
      }),
  });

  return categorySingle;
}

type Props = { params: Promise<{ categoryId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoryId } = await params;
  const categorySingle = await fetchCategoryData(categoryId);

  return {
    title: categorySingle?.name,
    // description: categorySingle.description, TODO
  };
}

export default async function Page({ params }: Props) {
  const { categoryId } = await params;
  const categorySingle = await fetchCategoryData(categoryId);

  if (!categorySingle) {
    return <div className="text-center text-2xl">Category not found</div>;
  }

  return (
    <section className="space-y-3 border-b border-neutral-400 py-3" key={categorySingle.id}>
      <h2 className="text-2xl font-bold">{categorySingle.name} Campaigns</h2>
      <div className="grid grid-cols-3 gap-3">
        {categorySingle.campaigns.map((campaign) => (
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
    </section>
  );
}
