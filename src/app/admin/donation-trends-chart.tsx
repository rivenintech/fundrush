"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/formatters";
import { useQuery } from "@tanstack/react-query";
import { Calculator, PiggyBank, Users2 } from "lucide-react";
import { useState } from "react";

const chartConfig = {
  totalAmount: {
    label: "Total Amount",
    color: "var(--color-cyan-400)",
  },
  donationsNumber: {
    label: "Donations",
    color: "var(--color-purple-400)",
  },
  avgDonation: {
    label: "Average Donation",
    color: "var(--color-emerald-400)",
  },
} satisfies ChartConfig;

export function DonationTrendsChart({
  fetchStatsAction,
}: {
  fetchStatsAction: (
    type: "totalAmount" | "donationsNumber" | "avgDonation",
    timeRange: "30d" | "90d" | "7d",
  ) => Promise<{ date: string; stat: number }[]>;
}) {
  const [timeRange, setTimeRange] = useState("90d");
  const [type, setType] = useState<"totalAmount" | "donationsNumber" | "avgDonation">("totalAmount");
  const placeholderData = [
    {
      date: new Date(Date.now() - 46 * 24 * 60 * 60 * 1000).toISOString(),
      stat: 0,
    },
  ];

  const { data } = useQuery({
    queryKey: ["dailyStats", timeRange, type],
    queryFn: () => fetchStatsAction(type, timeRange as "30d" | "90d" | "7d"),
    placeholderData: (prev) => prev || placeholderData,
  });

  return (
    <Card className="pt-0">
      <CardHeader className="flex flex-col items-center gap-2 space-y-0 border-b py-5 md:flex-row">
        <div className="mr-auto grid flex-1 gap-1">
          <CardTitle>Donation Trends</CardTitle>
          <CardDescription>
            {type === "totalAmount" && "Total funds raised"}
            {type === "donationsNumber" && "Number of donations"}
            {type === "avgDonation" && "Average donation amount"}
            {" over the past "}
            {timeRange === "90d" ? "3 months" : timeRange === "30d" ? "30 days" : "7 days"}.
          </CardDescription>
        </div>
        <div className="flex flex-col gap-2 max-md:w-full lg:flex-row">
          <Select value={type} onValueChange={(v) => setType(v as "totalAmount" | "donationsNumber" | "avgDonation")}>
            <SelectTrigger className="flex w-full rounded-lg lg:w-[210px]" aria-label="Select a value">
              <SelectValue placeholder="Total Amount" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="totalAmount" className="rounded-lg">
                <PiggyBank size={14} />
                Total Funds Raised
              </SelectItem>
              <SelectItem value="donationsNumber" className="rounded-lg">
                <Users2 size={14} />
                Number of Donations
              </SelectItem>
              <SelectItem value="avgDonation" className="rounded-lg">
                <Calculator size={14} />
                Average Donation
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="flex w-full rounded-lg lg:w-[160px]" aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={`var(--color-${type})`} stopOpacity={0.8} />
                <stop offset="95%" stopColor={`var(--color-${type})`} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  nameKey={type}
                  indicator="line"
                  valueFormatter={type != "donationsNumber" ? formatCurrency : undefined}
                />
              }
            />
            <Area dataKey="stat" type="natural" fill="url(#fillGradient)" stroke={`var(--color-${type})`} stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
