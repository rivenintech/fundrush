import { db } from "@/db/client";
import { campaign, campaignImages } from "@/db/schema";
import { put } from "@vercel/blob";
import { redirect } from "next/navigation";
import { getPlaiceholder } from "plaiceholder";
import z from "zod";
import { NewCampaignForm } from "../add-edit-form";
import { formSchema } from "./form-schema";

export default async function Page() {
  const categories = await db.query.category.findMany({
    columns: {
      id: true,
      name: true,
      short_description: true,
    },
  });

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
    await insertCampaignData(formData);

    redirect("/admin/campaigns");
    // redirect(`/admin/campaigns/${campaignId}`);
  }

  return (
    <div className="m-6">
      <NewCampaignForm categories={categories} submitFormAction={processFormSubmission} />
    </div>
  );
}

async function insertCampaignData(formData: z.infer<typeof formSchema>) {
  "use server";

  // Upload images to Vercel Blob
  const uploadedFiles = await Promise.all(
    formData.images.map(async (file) => {
      const blob = await put(`test/${file.name}`, file, {
        access: "public",
        addRandomSuffix: true,
      });
      return blob;
    }),
  );

  // Generate blur data URLs for the uploaded images
  const blurDataUrls = await Promise.all(
    uploadedFiles.map(async (file) => {
      // Download the file to generate the blur data URL
      const buffer = await fetch(file.url).then(async (res) => Buffer.from(await res.arrayBuffer()));
      const { base64 } = await getPlaiceholder(buffer, { format: ["webp"] });
      return {
        pathname: file.pathname,
        blurDataUrl: base64,
      };
    }),
  );

  // TODO: Add transaction handling when neon driver supports it
  // Insert campaign data into the database
  const insertedCampaign = await db
    .insert(campaign)
    .values({
      title: formData.title,
      goal: formData.goal,
      about: formData.about,
      faq: formData.faq,
      authorId: 1, // TODO: Replace with actual author ID logic
      categoryId: "animals", // TODO: Replace with actual category ID logic
    })
    .returning({ campaignId: campaign.id });

  // Insert uploaded images into the database
  blurDataUrls.forEach(async (img) => {
    await db.insert(campaignImages).values({
      campaignId: insertedCampaign[0].campaignId,
      alt: "Campaign Image", // TODO: Replace with actual alt text logic
      pathname: img.pathname,
      blurDataUrl: img.blurDataUrl,
    });
  });

  return insertedCampaign[0].campaignId;
}
