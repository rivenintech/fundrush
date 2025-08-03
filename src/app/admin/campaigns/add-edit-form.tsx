"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { formSchema } from "./new/form-schema";

type NewCampaignFormProps = {
  defaultValues?: z.infer<typeof formSchema>;
  categories?: { id: string; name: string; short_description: string }[];
  submitFormAction: (
    values: z.infer<typeof formSchema>,
  ) => Promise<{ errors: { [key: string]: string[] } | undefined }>;
};

export function NewCampaignForm({ defaultValues, categories, submitFormAction }: NewCampaignFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      goal: 1000,
      about: "",
      category: "",
      faq: null,
      images: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);
    toast.warning("Creating new campaigns and editing existing ones is currently disabled to prevent abuse.");
    router.push("/admin/campaigns");
    return;
    const res = await submitFormAction(values);
    setPending(false);
    console.error(res?.errors);

    // TODO: Add error handling and redirect on success
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Write your title here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your campaign goal"
                  min={1}
                  {...field}
                  pattern="[0-9]*" // allow only numbers
                  onChange={(e) => e.target.validity.valid && field.onChange(e.target.value)}
                />
              </FormControl>
              {field.value >= 1 && <FormDescription>{formatCurrency(field.value)}</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea rows={10} placeholder="Describe your campaign in detail to potential donors." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>{categories?.find((cat) => cat.id === field.value)?.short_description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="faq"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FAQ</FormLabel>
              <FormControl>
                <Accordion type="single" collapsible>
                  {field.value?.map((faq, index) => (
                    <AccordionItem value={`faq-${index}`} key={`faq-${index}`}>
                      <AccordionTrigger className="text-base" value="closed">
                        <Input
                          placeholder="Question"
                          value={faq.question}
                          onChange={(e) => {
                            const newFaqs = [...(field.value || [])];
                            newFaqs[index] = { ...newFaqs[index], question: e.target.value };
                            field.onChange(newFaqs);
                          }}
                        />
                      </AccordionTrigger>
                      <AccordionContent className="text-neutral-400">
                        <Textarea
                          placeholder="Answer"
                          value={faq.answer}
                          onChange={(e) => {
                            const newFaqs = [...(field.value || [])];
                            newFaqs[index] = { ...newFaqs[index], answer: e.target.value };
                            field.onChange(newFaqs);
                          }}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </FormControl>
              <FormMessage />
              <Button
                className="mr-auto inline-flex items-center"
                variant="outline"
                type="button"
                onClick={() => form.setValue("faq", [...(form.getValues("faq") || []), { question: "", answer: "" }])}
              >
                <Plus size="16" />
                Add FAQ
              </Button>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field: { onChange } }) => (
            <FormItem>
              {/* <FormLabel>Images</FormLabel> */}
              <FormControl>
                <FileUpload onChange={(files) => onChange(files)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={pending}>
          Create
        </Button>
        <Button type="reset" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
      </form>
    </Form>
  );
}
