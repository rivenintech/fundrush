import { formatCurrency } from "@/lib/formatters";
import { HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Campaign = {
  id: number;
  title: string;
  amount: number;
  raised: number;
  goal: number;
};
export function Campaign({ data }: { data: Campaign }) {
  return (
    <Link href={`/campaigns/${data.id}`}>
      <article className="group rounded-lg bg-neutral-900/50 p-2">
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 rounded-xl bg-neutral-800/90 px-3 py-2 text-xs">
            <HeartHandshake size={14} />
            <span>
              {data.amount} donation{data.amount === 1 ? "" : "s"}
            </span>
          </div>
          <Image src="/images/2.jpg" width={5472} height={3648} alt="" className="duration-200 group-hover:scale-105" />
        </div>
        <div className="space-y-3 p-4">
          <h3 className="font-semibold">{data.title}</h3>
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
        </div>
      </article>
    </Link>
  );
}
