import { Campaign } from "@/app/campaigns/campaign";
import { db } from "@/db/client";
import { Metadata } from "next";

async function fetchCategoryData(categoryId: string) {
  const categorySingle = await db.query.category.findFirst({
    with: {
      campaigns: {
        columns: {
          id: true,
          title: true,
          goal: true,
        },
        with: {
          donations: {
            columns: {
              amount: true,
            },
          },
        },
        orderBy: (campaigns, { desc }) => desc(campaigns.createdAt),
      },
    },
    where: (category, { eq }) => eq(category.id, categoryId),
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
