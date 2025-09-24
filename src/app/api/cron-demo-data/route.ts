import { db } from "@/lib/db/client";
import { donations } from "@/lib/db/schema";
import { faker } from "@faker-js/faker";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Make sure this request is authorized
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const now = Date.now();
  const ninetyDaysAgo = now - 90 * 24 * 60 * 60 * 1000;
  const campaignIds = await db.query.campaign.findMany({
    columns: {
      id: true,
    },
  });

  // Delete all existing donations
  await db.delete(donations);

  // Add new donations to each campaign with fake data
  for (const { id: campaignId } of campaignIds) {
    const donationsNumber = faker.number.int({ min: 100, max: 150 });

    const generatedDonations = Array.from({ length: donationsNumber }, () => ({
      amount: faker.number.float({ min: 5, max: 250, fractionDigits: 2 }),
      name: faker.person.fullName(),
      campaignId: campaignId,
      donatedAt: faker.date.between({ from: ninetyDaysAgo, to: now }),
    }));

    await db.insert(donations).values(generatedDonations);
  }

  return Response.json({ success: true, campaignIds: campaignIds });
}
