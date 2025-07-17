"use client";

import { formatCurrency } from "@/lib/formatters";
import { useQuery } from "@tanstack/react-query";
import { HeartHandshake } from "lucide-react";
import { requestDonationProgress } from "../sharedQueries";

export default function DonationsProgress({ campaignId }: { campaignId: string }) {
  const { data } = useQuery({
    queryKey: ["donationProgress", campaignId],
    queryFn: () => requestDonationProgress(campaignId),
  });

  const campaign = data?.campaignSingle;

  if (!campaign) return null;

  const raised = campaign.donations.reduce((acc, donation) => acc + donation.amount, 0);
  const percentage = (raised / campaign.goal) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <p className="text-neutral-400">
          <span className="text-xl font-bold text-green-500">{formatCurrency(raised)}</span> raised from
        </p>
        <p className="ml-auto font-semibold text-white">{formatCurrency(campaign.goal)}</p>
      </div>
      <div className="flex-start flex h-4 w-full overflow-hidden rounded-lg bg-neutral-800 text-xs font-medium">
        <div
          className="flex h-full items-center justify-center overflow-hidden rounded-lg bg-green-500 text-white transition-all"
          style={{
            width: `${percentage}%`,
            transitionDuration: "2500ms",
          }}
        >
          {percentage >= 5 && <span className="font-semibold">{percentage.toFixed(0)}%</span>}
        </div>
      </div>
      <div className="flex items-baseline justify-end gap-1 text-sm">
        {campaign.donations ? (
          <>
            <HeartHandshake size="16" className="self-center" />
            <p className="font-semibold">{campaign.donations.length}</p>
            <p className="text-neutral-400">donation{campaign.donations.length === 1 ? "" : "s"}</p>
          </>
        ) : (
          <p className="font-semibold">Be the first to donate!</p>
        )}
      </div>
    </div>
  );
}
