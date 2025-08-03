import { NewCampaignForm } from "@/app/admin/campaigns/add-edit-form";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { formSchema } from "../../new/form-schema";

type Props = {
  params: Promise<{ campaignId: string }>;
};

export default async function EditCampaign({ params }: Props) {
  const { campaignId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

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

  async function processFormSubmission(submittedData: any) {
    "use server";
    const validatedFormData = formSchema.safeParse(submittedData);

    if (!validatedFormData.success) {
      return {
        errors: validatedFormData.error.flatten().fieldErrors,
      };
    }

    const formData = validatedFormData.data;
    console.log("Form Data:", formData);
    // const campaignId = await insertCampaignData(formData);
    // await insertCampaignData(formData);

    redirect("/admin/campaigns");
    // redirect(`/admin/campaigns/${campaignId}`);
  }

  return (
    <div className="m-6">
      <NewCampaignForm
        defaultValues={parsedCampaign}
        categories={categories}
        submitFormAction={processFormSubmission}
      />
    </div>
  );
}
