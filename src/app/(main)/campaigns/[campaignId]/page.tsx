import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { db } from "@/db/client";
import { User2 } from "lucide-react";
import { Metadata } from "next";
import CampaignTabs from "./components/campaign-info-tabs";
import { DonatePanelDesktop, DonatePanelMobile } from "./components/donate-panel";
import CampaignImages from "./components/image-carousel";
import RecentDonations from "./components/recent-donations";

async function fetchCampaignData(campaignId: string) {
  const campaignSingle = await db.query.campaign.findFirst({
    columns: {
      id: true,
      title: true,
      about: true,
      faq: true,
      goal: true,
    },
    with: {
      category: {
        columns: {
          name: true,
        },
      },
      author: {
        columns: {
          name: true,
        },
      },
      images: {
        columns: {
          pathname: true,
          alt: true,
          blurDataUrl: true,
        },
      },
    },
    where: (campaign, { eq }) => eq(campaign.id, Number(campaignId)),
  });

  return campaignSingle;
}

type Props = { params: Promise<{ campaignId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { campaignId } = await params;
  const campaignSingle = await fetchCampaignData(campaignId);

  return {
    title: campaignSingle?.title,
    description: campaignSingle?.about.substring(0, 150),
  };
}

export default async function Page({ params }: Props) {
  const { campaignId } = await params;
  const queryClient = new QueryClient();
  const campaignSingle = await fetchCampaignData(campaignId);

  if (!campaignSingle) return null;

  // Prefetch data for client components
  // await queryClient.prefetchQuery({
  //   queryKey: ["donations", campaignId],
  //   queryFn: () => requestRecentDonations(campaignId, 5, 0),
  // });

  return (
    <main className="container mx-auto flex max-w-6xl flex-col gap-10 px-6 md:mt-10 md:flex-row md:px-0">
      <section className="space-y-6 md:w-[60%]">
        <div>
          <CampaignImages images={campaignSingle.images} />
        </div>
        <DonatePanelMobile campaignId={campaignId} title={campaignSingle.title} />
        <div className="flex items-center gap-1.5 border-b border-neutral-800 pb-6">
          <User2 size="28" className="rounded-full bg-neutral-800 p-1.5" />
          <p className="text-neutral-400">
            <span className="font-semibold text-white">{campaignSingle.author?.name}</span> created this fundraiser.
          </p>
        </div>
        <CampaignTabs faq={campaignSingle.faq} about={campaignSingle.about} />
      </section>
      <aside className="top-28 h-full space-y-12 text-white md:sticky md:w-[40%]">
        <DonatePanelDesktop campaignId={campaignId} title={campaignSingle.title} />
        <div className="rounded-lg bg-neutral-900 p-6">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <RecentDonations campaignId={campaignId} />
          </HydrationBoundary>
        </div>
      </aside>
    </main>
  );
}
