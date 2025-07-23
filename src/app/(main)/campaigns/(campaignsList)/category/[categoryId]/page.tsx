import { Campaign } from "@/app/(main)/campaigns/campaign";
import { db } from "@/db/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
          images: {
            columns: {
              pathname: true,
              alt: true,
              blurDataUrl: true,
            },
            limit: 1, // Fetch only the cover image
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
    description: categorySingle?.short_description,
  };
}

export default async function Page({ params }: Props) {
  const { categoryId } = await params;
  const categorySingle = await fetchCategoryData(categoryId);

  if (!categorySingle) {
    notFound();
  }

  return (
    <section className="space-y-3 px-6">
      <div>
        <h1 className="text-center text-2xl font-bold md:text-4xl">{categorySingle.name} Campaigns</h1>
        <p className="mt-1.5 text-center text-sm text-neutral-400 md:hidden">{categorySingle.short_description}</p>
      </div>
      <p className="hidden text-center text-neutral-400 md:block">{categorySingle.description}</p>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {categorySingle.campaigns.map((campaign) => (
          <Campaign
            key={campaign.id}
            data={{
              id: campaign.id,
              title: campaign.title,
              raised: campaign.donations.reduce((acc, donation) => acc + donation.amount, 0),
              goal: campaign.goal,
              amount: campaign.donations.length,
              img: campaign.images[0],
            }}
            headingLevel={3}
          />
        ))}
      </div>
    </section>
  );
}
