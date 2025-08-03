import Image1 from "@/../public/images/7.jpg";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { TabsComponent } from "./components/tabs";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="my-12 flex min-h-[calc(100vh-12rem-6rem)] w-full items-center justify-center px-6">
      <div className="grid max-w-3xl rounded-lg bg-neutral-900 md:grid-cols-2">
        <TabsComponent />
        <Image
          src={Image1}
          alt="Smiling woman holding a box with 'Donate' text on it."
          className="hidden h-full rounded-r-lg object-cover md:block"
          placeholder="blur"
          sizes="600px"
          quality={100}
        />
      </div>
    </div>
  );
}
