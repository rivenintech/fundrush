import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db/client";
import { campaign, donations } from "@/lib/db/schema";
import { formatCurrency } from "@/lib/formatters";
import { getPercentChange } from "@/lib/utils";
import { and, avg, count, eq, gte, lte, sql, sum } from "drizzle-orm";
import { Calculator, PiggyBank, Users2 } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DonationTrendsChart } from "./donation-trends-chart";
import { SummaryCard } from "./summary-card";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

  const total = (
    await db
      .select({
        totalAmount: sum(donations.amount),
        donationsNumber: count(donations.id),
        avgDonation: avg(donations.amount),
      })
      .from(campaign)
      .innerJoin(donations, eq(campaign.id, donations.campaignId))
      .where(eq(campaign.authorId, session.user.id))
  )[0];

  const current = (
    await db
      .select({
        totalAmount: sum(donations.amount),
        donationsNumber: count(donations.id),
        avgDonation: avg(donations.amount),
      })
      .from(campaign)
      .innerJoin(donations, eq(campaign.id, donations.campaignId))
      .where(and(eq(campaign.authorId, session.user.id), gte(donations.donatedAt, thirtyDaysAgo)))
  )[0];

  const previous = (
    await db
      .select({
        totalAmount: sum(donations.amount),
        donationsNumber: count(donations.id),
        avgDonation: avg(donations.amount),
      })
      .from(campaign)
      .innerJoin(donations, eq(campaign.id, donations.campaignId))
      .where(
        and(
          eq(campaign.authorId, session.user.id),
          gte(donations.donatedAt, sixtyDaysAgo),
          lte(donations.donatedAt, thirtyDaysAgo),
        ),
      )
  )[0];

  async function fetchDailyStats(
    type: "totalAmount" | "donationsNumber" | "avgDonation",
    timeRange: "30d" | "90d" | "7d",
  ) {
    "use server";

    if (!session) {
      redirect("/login");
    }

    const startDate = new Date();
    const endDate = new Date();

    switch (timeRange) {
      case "30d":
        startDate.setDate(startDate.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(startDate.getDate() - 90);
        break;
      case "7d":
        startDate.setDate(startDate.getDate() - 7);
        break;
    }

    const statColumn =
      type === "avgDonation"
        ? avg(donations.amount).mapWith(Number).as("data")
        : type === "totalAmount"
          ? sum(donations.amount).mapWith(Number).as("data")
          : count(donations.id).as("data");

    return await db
      .select({
        date: sql`date_trunc('day', ${donations.donatedAt})`.mapWith(String).as("date"),
        stat: statColumn,
      })
      .from(campaign)
      .innerJoin(donations, eq(campaign.id, donations.campaignId))
      .where(
        and(
          eq(campaign.authorId, session.user.id),
          gte(donations.donatedAt, startDate),
          lte(donations.donatedAt, endDate),
        ),
      )
      .groupBy(sql`date_trunc('day', ${donations.donatedAt})`)
      .orderBy(sql`date`);
  }

  const amountChange = getPercentChange(Number(current.totalAmount), Number(previous.totalAmount));
  const donationsChange = getPercentChange(Number(current.donationsNumber), Number(previous.donationsNumber));
  const avgDonationChange = getPercentChange(Number(current.avgDonation), Number(previous.avgDonation));

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          data={{
            title: "Total Funds Raised",
            value: formatCurrency(Number(total.totalAmount)),
            change: amountChange,
          }}
        >
          <PiggyBank size={40} className="rounded-full bg-cyan-400/15 p-1.5 text-cyan-400" />
        </SummaryCard>
        <SummaryCard
          data={{
            title: "Number of Donations",
            value: total.donationsNumber.toString(),
            change: donationsChange,
          }}
        >
          <Users2 size={40} className="rounded-full bg-purple-400/15 p-1.5 text-purple-400" />
        </SummaryCard>
        <SummaryCard
          classname="lg:col-span-2 xl:col-span-1"
          data={{
            title: "Average Donation",
            value: formatCurrency(Number(total.avgDonation)),
            change: avgDonationChange,
          }}
        >
          <Calculator size={40} className="rounded-full bg-emerald-400/15 p-1.5 text-emerald-400" />
        </SummaryCard>
      </div>
      <DonationTrendsChart fetchStatsAction={fetchDailyStats} />
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
