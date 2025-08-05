import clsx from "clsx";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

type SummaryCardProps = {
  data: {
    title: string;
    value: string;
    change: number;
  };
  classname?: string;
  children?: React.ReactNode;
};

export function SummaryCard({ data, classname, children }: SummaryCardProps) {
  return (
    <div className={clsx("bg-muted/50 rounded-xl p-6", classname)}>
      <div className="flex justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2">
            <p className="text-muted-foreground">{data.title}</p>
          </div>
          <p className="mt-1.5 mb-3 font-sans text-3xl font-semibold">{data.value}</p>
          <div className="flex flex-wrap items-center gap-1 text-sm">
            <ChangeBadge change={data.change} />
            <span className="text-muted-foreground">in the last 30 days</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function ChangeBadge({ change }: { change: number }) {
  const isZero = change === 0;
  const isPositive = change > 0;
  const Icon = isZero ? Minus : isPositive ? TrendingUp : TrendingDown;

  return (
    <span
      className={clsx("inline-flex items-center gap-1 text-sm", {
        "text-neutral-500": isZero,
        "text-green-500": isPositive,
        "text-red-500": !isPositive && !isZero,
      })}
    >
      <Icon size={18} />
      <span>{change.toFixed(2)}%</span>
    </span>
  );
}
