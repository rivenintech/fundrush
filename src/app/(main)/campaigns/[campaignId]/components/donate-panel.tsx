import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { requestDonationProgress } from "../sharedQueries";
import DonationsProgress from "./donation-progress";
import ShareBtn from "./share-btn";

export async function DonatePanel({ campaignId, title }: { campaignId: string; title: string }) {
  const queryClient = new QueryClient();

  // Prefetch data for client components
  await queryClient.prefetchQuery({
    queryKey: ["donationProgress", campaignId],
    queryFn: () => requestDonationProgress(campaignId),
  });

  return (
    <div className="space-y-6 rounded-lg md:bg-neutral-900 md:p-6">
      <h1 className="text-2xl font-extrabold">{title}</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DonationsProgress campaignId={campaignId} />
      </HydrationBoundary>
      <div className="flex w-full flex-col gap-3">
        <button className="rounded-lg border-2 border-transparent bg-green-500 py-3 text-center font-bold text-black duration-300 hover:border-green-500 hover:bg-transparent hover:text-white">
          Donate Now
        </button>
        <ShareBtn title={title} />
      </div>
    </div>
  );
}
