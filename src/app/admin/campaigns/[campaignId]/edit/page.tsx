import { NewCampaignForm } from "@/app/admin/campaigns/add-edit-form";
import { db } from "@/db/client";

type Props = {
  params: Promise<{ campaignId: string }>;
};

export default async function EditCampaign({ params }: Props) {
  const { campaignId } = await params;

  const categories = await db.query.category.findMany({
    columns: {
      id: true,
      name: true,
      short_description: true,
    },
  });

  const campaign = await db.query.campaign.findFirst({
    where: (campaign, { eq }) => eq(campaign.id, Number(campaignId)),
    columns: {
      title: true,
      goal: true,
      about: true,
      faq: true,
      categoryId: true,
    },
    with: {
      images: true,
    },
  });

  const parsedCampaign = {
    ...campaign,
    faq: JSON.parse(campaign?.faq),
    category: campaign?.categoryId || "",
  };

  return (
    <div className="m-6">
      <NewCampaignForm defaultValues={parsedCampaign} categories={categories} />
    </div>
  );
}
