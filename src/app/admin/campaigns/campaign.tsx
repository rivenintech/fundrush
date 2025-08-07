import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import { getURL } from "@/lib/get-urls";
import { HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { JSX } from "react";

type Campaign = {
  id: number;
  title: string;
  amount: number;
  raised: number;
  goal: number;
  img: {
    pathname: string;
    alt: string;
    blurDataUrl: string;
  };
};
export async function Campaign({ data, headingLevel = 2 }: { data: Campaign; headingLevel?: number }) {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  return (
    <article className="group rounded-lg bg-neutral-900/50 p-2">
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 rounded-xl bg-neutral-800/90 px-3 py-2 text-xs">
          <HeartHandshake size={14} />
          <span>
            {data.amount} donation{data.amount === 1 ? "" : "s"}
          </span>
        </div>
        <div className="aspect-video">
          <Image
            src={getURL("image", data.img.pathname)}
            alt={data.img.alt}
            className="object-cover duration-200 group-hover:scale-105"
            fill
            placeholder="blur"
            blurDataURL={data.img.blurDataUrl}
          />
        </div>
      </div>
      <div className="space-y-3 p-4">
        <HeadingTag className="font-semibold">{data.title}</HeadingTag>
        <div className="flex-start flex h-2 w-full overflow-hidden rounded-lg bg-neutral-800 text-xs font-medium">
          <div
            className="flex h-full items-center justify-center overflow-hidden rounded-lg bg-green-500 text-white transition-all"
            style={{
              width: `${(data.raised / data.goal) * 100}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-400">
            <span className="text-base font-semibold text-white">{formatCurrency(data.raised)}</span> Raised
          </p>
          <p className="text-sm text-neutral-400">
            <span className="text-base font-semibold text-white">{formatCurrency(data.goal)}</span> Goal
          </p>
        </div>
        <div className="mt-6 flex justify-between">
          <Link href={`/admin/campaigns/${data.id}/edit`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Link href={`/campaigns/${data.id}`}>
            <Button variant="default">Go to Campaign</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
