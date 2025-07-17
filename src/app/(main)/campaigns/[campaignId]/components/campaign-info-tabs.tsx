"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ParsedFaq = { question: string; answer: string }[];
type Props = { about: string; faq: "Faq" | null };

export default function CampaignTabs({ about, faq }: Props) {
  const parsedFaq: ParsedFaq = JSON.parse(faq || "[]");

  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="gap-5 bg-transparent">
        <TabsTrigger value="about" className="text-base font-semibold">
          About
        </TabsTrigger>
        <TabsTrigger value="faq" className="text-base font-semibold">
          FAQ
        </TabsTrigger>
        {/* <TabsTrigger value="updates" className="text-base font-semibold">
          Updates
        </TabsTrigger>
        <TabsTrigger value="contact" className="text-base font-semibold">
          Contact
        </TabsTrigger> */}
      </TabsList>
      {/* TODO: Implement markdown support */}
      <TabsContent value="about">{about}</TabsContent>
      <TabsContent value="faq">
        <Accordion type="single" collapsible>
          {parsedFaq.map((faq, index) => (
            <AccordionItem value={`faq-${index}`} key={`faq-${index}`}>
              <AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>
      {/* <TabsContent value="updates"></TabsContent> */}
      {/* <TabsContent value="contact"></TabsContent> */}
    </Tabs>
  );
}
