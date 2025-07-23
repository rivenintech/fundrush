"use client";

import { Button } from "@/components/ui/button";
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
import { BASE_URL } from "@/lib/get-urls";
import { Check, Copy } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FacebookBtn, RedditBtn, TelegramBtn, WhatsAppBtn, XBtn } from "./social-share-btns";

export function MobileShareDrawer({ title }: { title: string }) {
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
    <Drawer>
      <DrawerTrigger className="w-full rounded-lg border-2 border-transparent bg-green-950/40 px-8 py-3 text-center font-bold text-green-500">
        Share
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-lg">Share This Campaign</DrawerTitle>
          <DrawerDescription>Help this campaign reach more people!</DrawerDescription>
        </DrawerHeader>
        <div className="mx-4 space-y-6">
          <div className="flex w-full items-center">
            <Input type="text" value={shareUrl} readOnly className="rounded-r-none" />
            <Button type="button" variant="outline" className="rounded-l-none" onClick={handleCopy}>
              {copied ? <Check size="16" color="green" /> : <Copy size="16" />}
            </Button>
          </div>

          <div>
            <p className="mb-1.5 font-semibold">Share to</p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              <FacebookBtn url={shareUrl} />
              <WhatsAppBtn title={title} url={shareUrl} />
              <RedditBtn title={title} url={shareUrl} />
              <XBtn title={title} url={shareUrl} />
              <TelegramBtn title={title} url={shareUrl} />
            </div>
          </div>
        </div>
        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  );
}
