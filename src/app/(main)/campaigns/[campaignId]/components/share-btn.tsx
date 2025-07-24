"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { BASE_URL } from "@/lib/get-urls";
import { Check, Copy } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FacebookBtn, RedditBtn, TelegramBtn, WhatsAppBtn, XBtn } from "./social-share-btns";

export default function ShareBtn({ title }: { title: string }) {
  const header = { title: "Share This Campaign", description: "Help this campaign reach more people!" };
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="rounded-lg border-2 border-transparent bg-green-950/40 py-3 text-center font-bold text-green-500">
          {/* <Share2 size="16" /> */}
          Share
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-lg">{header.title}</DrawerTitle>
            <DrawerDescription>{header.description}</DrawerDescription>
          </DrawerHeader>
          <Content title={title} />
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="rounded-lg border-2 border-transparent bg-green-950/40 py-3 text-center font-bold text-green-500 duration-300 hover:bg-green-950/90">
        {/* <Share2 size="16" /> */}
        Share
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg">{header.title}</DialogTitle>
          <DialogDescription>{header.description}</DialogDescription>
        </DialogHeader>
        <Content title={title} />
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}

function Content({ title }: { title: string }) {
  const pathname = usePathname();
  const shareUrl = `${BASE_URL}${pathname}`;
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  }

  return (
    <div className="mx-4 space-y-6 md:mx-0">
      <div className="flex w-full items-center">
        <Input type="text" value={shareUrl} readOnly className="rounded-r-none" />
        <Button type="button" variant="outline" className="rounded-l-none" onClick={handleCopy}>
          {copied ? <Check size="16" color="green" /> : <Copy size="16" />}
        </Button>
      </div>

      <div>
        <p className="mb-1.5 font-semibold">Share to</p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:gap-6">
          <FacebookBtn url={shareUrl} />
          <WhatsAppBtn title={title} url={shareUrl} />
          <RedditBtn title={title} url={shareUrl} />
          <XBtn title={title} url={shareUrl} />
          <TelegramBtn title={title} url={shareUrl} />
        </div>
      </div>
    </div>
  );
}
