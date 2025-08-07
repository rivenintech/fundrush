"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth/auth-client";
import { getURL } from "@/lib/get-urls";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { data } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("👋 You've been logged out. See you soon!");
          router.push("/login"); // redirect to login page
        },
      },
    });
  };

  if (!data?.user) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserData user={data.user} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserData user={data.user} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function UserData({ user }: { user: { name: string; email: string; image?: string | null } }) {
  return (
    <>
      <div className="relative flex size-8 shrink-0 overflow-hidden rounded-full">
        <Image src={getURL("avatar", user.image)} alt="Your profile picture" width={32} height={32} />
        <div className="bg-muted flex size-full items-center justify-center rounded-full">{user.name.charAt(0)}</div>
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="text-muted-foreground truncate text-xs">{user.email}</span>
      </div>
    </>
  );
}
