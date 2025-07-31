import { db } from "@/lib/db/client";
import { Campaign } from "./campaign";

export default async function CampaignsList() {
  const campaigns = await db.query.campaign.findMany({
    where: (campaign, { eq }) => eq(campaign.authorId, 1),
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
  });

  return (
    <section className="m-3">
      <h1 className="text-3xl font-bold">All Your Campaigns ({campaigns.length})</h1>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {campaigns.map((campaign) => (
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
          ></Campaign>
        ))}
      </div>
    </section>
  );
}
