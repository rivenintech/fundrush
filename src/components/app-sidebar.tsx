"use client";

import { ChevronsLeftIcon, Frame, LifeBuoy, Plus } from "lucide-react";
import * as React from "react";

import { NavCampaigns } from "@/components/nav-campaigns";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
  ],
  navCampaigns: [
    {
      name: "Your Campaigns",
      url: "/admin/campaigns",
      icon: Frame,
    },
  ],
};

export function AppSidebar({ children, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
      <SidebarHeader>
        <SidebarMenu className="gap-4">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image src="/icon.svg" alt="fundrush logo" width="40" height="40" className="size-7" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="font-semibold">Fundrush</span>
                  <span className="text-foreground/70 text-xs">Exit admin dashboard</span>
                </div>
                <ChevronsLeftIcon className="size-4" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="bg-primary text-primary-foreground transition-colors duration-200">
              <Link href="/admin/campaigns/new">
                <Plus className="size-4" />
                <span className="font-medium">New campaign</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavCampaigns nav={data.navCampaigns} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
