import { z } from "zod";

export const formSchema = z.object({
  title: z.string().nonempty({ error: "Title is required" }),
  goal: z.coerce.number<number>({ error: "Goal is required" }).min(1, { error: "Goal must be a positive number" }),
  about: z.string().nonempty({ error: "About section is required" }),
  faq: z
    .array(
      z.object({
        question: z.string().nonempty({ error: "Question is required" }),
        answer: z.string().nonempty({ error: "Answer is required" }),
      }),
    )
    .nullable(),
  category: z.string().nonempty({ error: "Category is required" }),
  images: z
    .array(z.file())
    .min(1, { error: "At least one image is required" })
    .refine((files) => files.every((file) => file.size < 4.5 * 1024 * 1024), {
      error: "Each image must be less than 4.5 MB",
    })
    .refine((files) => files.every((file) => file.type.startsWith("image/")), {
      error: "Only image files are allowed",
    }),
});
