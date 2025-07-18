import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/admin">Dashboard</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/admin/campaigns">Your Campaigns</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>New Campaign</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
}
