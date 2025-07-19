import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { db } from "@/db/client";
import { connection } from "next/server";
import { Campaign } from "../campaigns/campaign";

export default async function RecentCampaigns() {
  // Prevent static rendering at build time
  // This is necessary to ensure database data is fetched at runtime
  // https://nextjs.org/docs/app/api-reference/functions/connection
  await connection();

  const recentCampaigns = await db.query.campaign.findMany({
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
          // blurDataUrl: true,
        },
        limit: 1, // Fetch only the cover image
      },
    },
    orderBy: (campaigns, { desc }) => desc(campaigns.createdAt),
    limit: 10,
  });

  return (
    <Carousel>
      <CarouselContent>
        {recentCampaigns?.map((campaign) => (
          <CarouselItem className="md:basis-1/3" key={campaign.id}>
            <Campaign
              data={{
                id: campaign.id,
                title: campaign.title,
                // TODO: change this after https://orm.drizzle.team/docs/rqb#include-custom-fields (first "IMPORTANT" section)
                raised: campaign.donations.reduce((acc, donation) => acc + donation.amount, 0),
                goal: campaign.goal,
                amount: campaign.donations.length,
                img: campaign.images[0],
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:inline-flex" />
      <CarouselNext className="hidden md:inline-flex" />
    </Carousel>
  );
}
