import { db } from "@/db/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";
import { Campaign } from "../campaign";

export default async function Page() {
  // Prevent static rendering at build time
  // This is necessary to ensure database data is fetched at runtime
  // https://nextjs.org/docs/app/api-reference/functions/connection
  await connection();

  const categories = (
    await db.query.category.findMany({
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
          limit: 3,
        },
      },
    })
  ).filter((category) => category.campaigns.length > 0);

  return (
    <>
      {categories.map((category) => (
        <section className="space-y-3 border-b border-neutral-400 px-6" key={category.id}>
          <div>
            <h2 className="text-2xl font-bold">{category.name} Campaigns</h2>
            <p className="mt-1.5 text-sm text-neutral-400">{category.short_description}</p>
          </div>
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
