"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, getTimeAgo } from "@/lib/formatters";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, HeartHandshake } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Lightbox, {
  ContainerRect,
  isImageFitCover,
  isImageSlide,
  SlideImage,
  ThumbnailsRef,
  useLightboxProps,
} from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { requestDonationProgress, requestRecentDonations } from "./sharedQueries";

type ParsedFaq = { question: string; answer: string }[];
type Props = { about: string; faq: "Faq" | null };
export function CampaignTabs({ about, faq }: Props) {
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

export function RecentDonations({ campaignId }: { campaignId: string }) {
  const { data } = useQuery({
    queryKey: ["donations", campaignId],
    queryFn: () => requestRecentDonations(campaignId),
  });

  const donations = data?.donations;

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">Recent Donations</h2>
          <RecentDonationsSheet campaignId={campaignId} />
        </div>
        <p className="text-sm text-neutral-400">Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <ul className="space-y-4">
        {donations?.map((donation) => (
          <li className="flex items-center gap-3" key={donation.id}>
            <div className="size-8 rounded-full bg-green-500" />
            <div>
              <p className="font-semibold">{donation.name}</p>
              <p className="text-xs text-neutral-400">Donated {getTimeAgo(donation.donatedAt)}</p>
            </div>
            <p className="ml-auto font-bold">{formatCurrency(donation.amount)}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export function RecentDonationsSheet({ campaignId }: { campaignId: string }) {
  // TODO: Change to useInfiniteQuery
  const { data } = useQuery({
    queryKey: ["donations", campaignId],
    queryFn: () => requestRecentDonations(campaignId),
  });

  const donations = data?.donations;

  return (
    <Sheet>
      <SheetTrigger className="flex items-end gap-1 text-green-600">
        See all
        <ArrowRight size="20" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">Recent Donations</SheetTitle>
          <SheetDescription>Help the community by donating to this campaign.</SheetDescription>
        </SheetHeader>

        <ul className="mx-4 space-y-4">
          {donations?.map((donation) => (
            <li className="flex items-center gap-3" key={donation.id}>
              <div className="size-8 rounded-full bg-green-500" />
              <div>
                <p className="font-semibold">{donation.name}</p>
                <p className="text-xs text-neutral-400">Donated {getTimeAgo(donation.donatedAt)}</p>
              </div>
              <p className="ml-auto font-bold">{formatCurrency(donation.amount)}</p>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}

export function DonationsProgress({ campaignId }: { campaignId: string }) {
  const { data } = useQuery({
    queryKey: ["donationProgress", campaignId],
    queryFn: () => requestDonationProgress(campaignId),
  });

  const campaign = data?.campaignSingle;

  if (!campaign) return null;

  const raised = campaign.donations.reduce((acc, donation) => acc + donation.amount, 0);

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <p className="text-neutral-400">
          <span className="text-xl font-bold text-green-500">{formatCurrency(raised)}</span> raised from
        </p>
        <p className="ml-auto font-semibold text-white">{formatCurrency(campaign.goal)}</p>
      </div>
      <div className="flex-start flex h-4 w-full overflow-hidden rounded-lg bg-neutral-800 text-xs font-medium">
        <div
          className="flex h-full items-center justify-center overflow-hidden rounded-lg bg-green-500 text-white transition-all"
          style={{
            width: `${(raised / campaign.goal) * 100}%`,
            transitionDuration: "2500ms",
          }}
        >
          <span className="font-semibold">{(raised / campaign.goal) * 100}%</span>
        </div>
      </div>
      <div className="flex items-baseline justify-end gap-1 text-sm">
        {campaign.donations ? (
          <>
            <HeartHandshake size="16" className="self-center" />
            <p className="font-semibold">{campaign.donations.length}</p>
            <p className="text-neutral-400">donation{campaign.donations.length === 1 ? "" : "s"}</p>
          </>
        ) : (
          <p className="font-semibold">Be the first to donate!</p>
        )}
      </div>
    </div>
  );
}

export function CampaignImages({ images }: { images: SlideImage[] }) {
  const thumbnailsRef = useRef<ThumbnailsRef>(null);

  // On mobile screens, hide the thumbnails
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        thumbnailsRef.current?.hide();
      } else {
        thumbnailsRef.current?.show();
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Lightbox
      plugins={[Inline, Thumbnails]}
      thumbnails={{ ref: thumbnailsRef }}
      inline={{
        style: { width: "100%", aspectRatio: "4 / 3" },
      }}
      styles={{ slide: { padding: 0, borderRadius: "0.5rem" } }}
      slides={images}
      render={{ slide: NextJsImage }}
    />
  );
}

function isNextJsImage(slide: SlideImage) {
  return isImageSlide(slide) && typeof slide.width === "number" && typeof slide.height === "number";
}

export default function NextJsImage({ slide, rect }: { slide: SlideImage; rect: ContainerRect }) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  const width = !cover ? Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width)) : rect.width;

  return (
    <Image
      alt={slide.alt || ""}
      src={slide.src}
      width={slide.width}
      height={slide.height}
      draggable={false}
      placeholder={slide.blurDataURL ? "blur" : undefined}
      blurDataURL={slide.blurDataURL || undefined}
      style={{
        objectFit: cover ? "cover" : "contain",
        cursor: click ? "pointer" : undefined,
      }}
      sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
    />
  );
}
