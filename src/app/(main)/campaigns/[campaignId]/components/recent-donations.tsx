"use client";

import { DonationsQuery } from "@/__generated__/graphql/graphql";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { formatCurrency, getTimeAgo } from "@/lib/formatters";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ArrowRight, HandHeart } from "lucide-react";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { requestRecentDonations } from "../sharedQueries";

export default function RecentDonations({ campaignId }: { campaignId: string }) {
  const increment = 5;

  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["donations", campaignId, increment],
    queryFn: ({ pageParam }) => requestRecentDonations(campaignId, increment, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => lastPageParam + increment,
  });

  const donations = data?.pages?.flatMap((page) => page.donations) ?? [];

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">Recent Donations</h2>
          <RecentDonationsSheet donations={donations} isFetching={isFetching} fetchNextPage={fetchNextPage} />
        </div>
        <p className="text-sm text-neutral-400">Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <ul className="space-y-4">
        {donations?.slice(0, 5).map((donation) => (
          <li className="flex items-center gap-3" key={donation.id}>
            <HandHeart size="36" className="rounded-full p-1.5 text-green-500" />
            <div>
              <p className="font-semibold">{donation.name}</p>
              <p className="text-xs text-neutral-400">Donated {getTimeAgo(donation.donatedAt)}</p>
            </div>
            <p className="ml-auto font-bold">{formatCurrency(donation.amount)}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

function RecentDonationsSheet({
  donations,
  isFetching,
  fetchNextPage,
}: {
  donations: DonationsQuery["donations"];
  isFetching: boolean;
  fetchNextPage: () => void;
}) {
  return (
    <Sheet>
      <SheetTrigger className="flex items-end gap-1 text-green-600">
        See all
        <ArrowRight size="20" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">Recent Donations</SheetTitle>
          <SheetDescription>Help the community by donating to this campaign.</SheetDescription>
        </SheetHeader>

        <ul className="mx-4 space-y-4">
          {donations?.map((donation) => (
            <li className="flex items-center gap-3" key={donation.id}>
              <HandHeart size="36" className="rounded-full p-1.5 text-green-500" />
              <div>
                <p className="font-semibold">{donation.name}</p>
                <p className="text-xs text-neutral-400">Donated {getTimeAgo(donation.donatedAt)}</p>
              </div>
              <p className="ml-auto font-bold">{formatCurrency(donation.amount)}</p>
            </li>
          ))}
        </ul>
        <button
          className="m-4 rounded-lg bg-neutral-800 px-4 py-2 font-semibold text-white duration-200 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={fetchNextPage}
          disabled={isFetching}
        >
          Load More
        </button>
      </SheetContent>
    </Sheet>
  );
}
