import { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s Campaigns - Fundrush", default: "Campaigns" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto mt-10 max-w-6xl">
      {/* <section>
        <h1>Browse campaigns by category</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur adipiscing elit
        </p>
        <div className="grid grid-cols-6 gap-3">Grid of categories</div>
      </section> */}
      <section className="space-y-6">{children}</section>
    </main>
  );
}
