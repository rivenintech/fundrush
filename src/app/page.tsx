import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Spotlight } from "@/components/ui/spotlight-new";
import { db } from "@/db/client";
import { CheckCircle, HeartHandshake, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Image1 from "../../public/images/1.jpg";
import Image2 from "../../public/images/2.jpg";
import Image3 from "../../public/images/3.jpg";
import Image4 from "../../public/images/4.jpg";
import Image5 from "../../public/images/5.jpg";
import Image6 from "../../public/images/6.jpg";
import Image7 from "../../public/images/7.jpg";
import { Campaign } from "./campaigns/campaign";

const faq = [
  {
    question: "Do you take any fees from donations?",
    answer: "No, we do not charge any platform fees. However, standard payment processing fees may apply.",
  },
  {
    question: "How can I start a fundraising campaign?",
    answer:
      "You can create a campaign by signing up for an account and following the step-by-step campaign creation process.",
  },
  {
    question: "Is it free to create a fundraising campaign?",
    answer: "Yes, creating and hosting a campaign on our platform is completely free.",
  },
  {
    question: "How do I know my donation is secure?",
    answer:
      "We use industry-standard encryption and secure payment gateways to protect your personal and financial information.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit and debit cards, as well as PayPal and other popular online payment methods.",
  },
  {
    question: "Can I share a campaign on social media?",
    answer: "Absolutely! Every campaign page includes easy sharing options for popular social media platforms.",
  },
  {
    question: "How can I track the progress of a campaign?",
    answer: "Campaign pages display live updates and fundraising progress to keep you informed.",
  },
  {
    question: "Can I fundraise for causes outside my country?",
    answer: "Yes, our platform supports campaigns globally, but please review local laws and regulations.",
  },
];

export default async function Home() {
  const recentCampaigns = await db.query.campaign.findMany({
    columns: {
      id: true,
      title: true,
      goal: true,
    },
    with: {
      donations: {
        columns: {
          amount: true,
        },
      },
    },
    orderBy: (campaigns, { desc }) => desc(campaigns.createdAt),
    limit: 10,
  });

  return (
    <main className="space-y-20">
      <section className="relative flex h-[calc(100vh-6rem)] max-h-[900px] min-h-[500px] flex-col justify-between space-y-10 overflow-hidden">
        <Spotlight gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 92%, 0.15) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)" />
        <div className="container mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-20 px-6 md:flex-row">
          <div className="space-y-6 md:w-1/2">
            <h1 className="text-4xl font-bold tracking-wide md:text-5xl">Because a Better World Starts With You</h1>
            <p className="text-neutral-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam similique quae minus inventore
              necessitatibus dignissimos esse suscipit illo? Ipsum, architecto.
            </p>
            <Link
              href="/campaigns"
              className="block w-fit rounded-lg border-2 border-transparent bg-green-500 px-8 py-3 font-bold text-black duration-300 hover:border-green-500 hover:bg-transparent hover:text-white"
            >
              Donate Now
            </Link>
          </div>
          <div className="hidden w-1/2 md:block">
            <div className="grid grid-cols-4 items-center gap-3">
              <div className="mt-6 space-y-3">
                <Image
                  src={Image6}
                  sizes="512px"
                  quality={100}
                  className="h-64 w-32 overflow-hidden rounded-xl object-cover"
                  alt="A volunteer hugging another person."
                  placeholder="blur"
                />
                <Image
                  src={Image4}
                  sizes="256px"
                  quality={100}
                  className="size-32 overflow-hidden rounded-xl object-cover"
                  alt="Hands painted with red paint forming a heart shape."
                  placeholder="blur"
                />
              </div>
              <div className="mb-6 space-y-3">
                <Image
                  src={Image3}
                  sizes="256px"
                  quality={100}
                  className="size-32 overflow-hidden rounded-xl object-cover"
                  alt="A group of smiling children running towards the camera."
                  placeholder="blur"
                />
                <Image
                  src={Image5}
                  sizes="512px"
                  quality={100}
                  className="h-64 w-32 overflow-hidden rounded-xl object-cover"
                  alt="Group of volunteers moving boxes from a truck."
                  placeholder="blur"
                />
              </div>
              <div className="space-y-3">
                <Image
                  src={Image1}
                  sizes="512px"
                  quality={100}
                  className="h-64 w-32 overflow-hidden rounded-xl object-cover"
                  alt="A group of children smiling at the camera"
                  placeholder="blur"
                />
                <Image
                  src={Image2}
                  sizes="256px"
                  quality={100}
                  className="size-32 overflow-hidden rounded-xl object-cover"
                  alt="A volunteer helps a smiling man in a wheelchair outside."
                  placeholder="blur"
                />
              </div>
              <Image
                src={Image7}
                sizes="512px"
                quality={100}
                className="h-64 w-32 overflow-hidden rounded-xl object-cover"
                alt="Smiling woman holding a box with 'Donate' text on it."
                placeholder="blur"
              />
            </div>
          </div>
        </div>
        <div className="bg-green-700/30">
          <div className="container mx-auto flex max-w-7xl flex-col justify-between text-sm text-green-300 md:flex-row">
            <div className="flex items-center gap-3 p-4">
              <HeartHandshake size={30} />
              <p>100% of Donations Go to the Cause</p>
            </div>
            <div className="flex items-center gap-3 p-4">
              <Zap size={30} />
              <p>Start a Campaign in Under 2 Minutes</p>
            </div>
            <div className="flex items-center gap-3 p-4">
              <CheckCircle size={30} />
              <p>Verified Campaigns, Real People</p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-6xl px-6">
        <div className="space-y-3">
          <div className="text-center">
            <h3 className="text-3xl font-bold tracking-wider md:text-4xl">Recent Campaigns</h3>
            <p className="text-neutral-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <Carousel>
            <CarouselContent>
              {recentCampaigns?.map((campaign) => (
                <CarouselItem className="md:basis-1/3" key={campaign.id}>
                  <Campaign
                    data={{
                      id: campaign.id,
                      title: campaign.title,
                      // TODO: change this when https://github.com/drizzle-team/drizzle-graphql/issues/14
                      raised: campaign.donations.reduce((acc, donation) => acc + donation.amount, 0),
                      goal: campaign.goal,
                      amount: campaign.donations.length,
                    }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:inline-flex" />
            <CarouselNext className="hidden md:inline-flex" />
          </Carousel>
        </div>
      </section>
      <section className="relative flex h-[40rem] items-center justify-center overflow-hidden">
        <Spotlight gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 92%, 0.15) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)" />
        <div className="space-y-3 px-6 text-center">
          <h3 className="text-xl font-semibold text-neutral-300 md:text-2xl">
            Join our community of donors and help us build a better future.
          </h3>
          <p className="bg-opacity-50 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
            $1,500,000+
          </p>
          <p className="text-neutral-400">Raised to help those in need. Join the cause!</p>
          <div className="relative">
            <Link
              href="/campaigns"
              className="peer mx-auto mt-10 block w-fit rounded-lg border-2 border-transparent bg-green-500 px-8 py-3 font-bold text-black duration-300 hover:border-green-500 hover:bg-transparent hover:text-white"
            >
              Donate Now
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2200 1466"
              width="158"
              height="105"
              className="absolute -top-12 left-14 hidden text-neutral-500 duration-300 peer-hover:text-white md:block"
            >
              <path
                fillRule="evenodd"
                fill="currentColor"
                d="m1981.6 1020c0.8 2.2-1.7 4.5-6.4 6.8q-1.8 0.8-3.9 1.6-2.2 0.8-4.7 1.8c-3.2 1.2-6.9 2.4-10.9 3.6-3.9 1.3-8.1 2.6-12.4 3.9-4.3 1.3-8.8 2.8-13.2 4.1-4.5 1.5-8.9 3-13.2 4.4-4.3 1.5-8.5 2.9-12.4 4.3-3.9 1.4-7.5 2.8-10.8 4q-1.3 0.5-2.4 0.9-1.2 0.4-2.3 0.9-2.1 0.8-3.9 1.6c-2.5 0.9-4.4 1.7-5.7 2.2-1.4 0.5-2.1 0.8-2.1 0.8 0 0-2.3 0.9-6.6 2.5-4.2 1.5-10.2 4.1-17.6 7.2-14.6 6.3-34.2 16.1-54.1 28.6-20.1 12.3-40.2 27.5-57 42.4-2.2 1.8-4.1 3.8-6.2 5.6q-2.9 2.8-5.8 5.5c-3.7 3.7-7.3 7.1-10.5 10.5-3.2 3.5-6.2 6.6-8.9 9.6-2.6 3.1-5 5.9-7.1 8.3-7.8 10.8-18.9 25.9-30.4 44.2q-0.5 0.8-1.1 1.7-0.5 0.8-1 1.7-1.1 1.8-2.2 3.6c-1.4 2.4-2.9 4.8-4.3 7.2q-2.1 3.8-4.2 7.6c-0.7 1.3-1.5 2.5-2.2 3.9q-1 1.9-2 3.9c-1.4 2.6-2.8 5.3-4.2 8q-2 4.1-4 8.2l-1 2.1-0.5 1.1c-1.4 2.8-3.6 5.7-6.8 8-3.2 2.2-7.1 3.5-10.6 3.7-3.5 0.2-6.9-0.5-9.9-1.9-3.1-1.5-6-3.7-8.2-6.8-2.2-3.2-3.5-7-3.7-10.5q-0.1-1.2 0-2.4 0-0.6 0.1-1.2v-0.3-0.3l0.4-2.5q0.6-4.9 1.3-9.9 1.4-9.9 2.7-19.9 1.8-9.9 3.6-19.7 0.9-4.9 1.8-9.8 1.1-4.8 2.2-9.6c1.5-6.3 2.9-12.6 4.4-18.6q2.5-9.1 4.9-17.8 0.6-2.1 1.2-4.2c0.4-1.4 0.8-2.8 1.2-4.2q1.4-4.1 2.7-8.1 1.3-4 2.5-7.7c0.9-2.6 1.6-5.1 2.6-7.4q2.7-7.2 5.1-13.5c6.3-17.2 13.3-34.2 22-50.7 0.6-1 1.1-2.1 1.6-3.1l1.7-3.1 3.5-6.1c0.5-1 1.1-2 1.7-3.1l1.3-2.1q-6.4 1.3-13.3 2.5c-21.6 3.8-46.3 7.3-71.2 9.8-24.9 2.5-50.1 4.1-72.5 4.9-22.5 0.7-42.2 0.8-56.3 0.5-7.1-0.1-12.7-0.2-16.6-0.3-3.9-0.1-6-0.2-6-0.2 0 0-6.8-0.4-19.1-1-6.1-0.4-13.5-1-22.1-1.6q-6.5-0.5-13.8-1.2-3.6-0.3-7.5-0.6-3.8-0.3-7.8-0.8c-21.5-2.2-46.9-5.1-74.7-9.8-7-1.2-14.1-2.3-21.3-3.8q-5.4-1-10.9-2.1-5.6-1.2-11.1-2.4-2.8-0.6-5.6-1.2c-1.9-0.4-3.8-0.9-5.7-1.3q-5.6-1.4-11.3-2.8c-3.8-0.9-7.7-2-11.5-3q-2.9-0.7-5.8-1.5c-1.9-0.5-3.8-1.1-5.7-1.7q-5.8-1.7-11.6-3.4-5.8-1.9-11.6-3.8-2.9-0.9-5.8-1.9-2.9-1-5.8-2c-3.9-1.4-7.8-2.8-11.6-4.2-7.7-3.1-15.4-6-23-9.4l-5.7-2.4-2.8-1.3-2.8-1.3q-5.7-2.7-11.3-5.4c-1.8-0.8-3.7-1.8-5.5-2.7l-5.5-2.9c-3.7-1.9-7.3-3.8-10.9-5.9q-5.3-3.1-10.6-6.1c-1.8-1-3.6-2.1-5.3-3.2-1.7-1.1-3.5-2.1-5.2-3.2-6.9-4.4-13.5-9-20-13.7-6.5-4.7-12.8-9.5-18.8-14.4q-7.1-5.9-13.8-12-0.2 0.1-0.5 0.2c-8.2 3.2-16.5 6-24.8 8.9-8.4 2.6-16.7 5.3-25.2 7.6-4.2 1.2-8.4 2.4-12.6 3.5l-12.7 3.2c-8.5 2-16.9 4.1-25.5 5.8-2.9 0.6-5.9 1.3-9 1.9q-4.6 0.8-9.6 1.8c-6.5 1.2-13.5 2.3-20.8 3.6-3.6 0.6-7.4 1.1-11.2 1.7-3.8 0.6-7.7 1.2-11.7 1.8q-5.9 0.8-12.1 1.7c-4.2 0.5-8.4 1.1-12.7 1.6-17.3 2.1-35.9 3.8-55.6 4.5-19.7 0.7-40.5 0.5-62.2-1.8-21.6-2.3-44.2-6.7-66.5-14.6-11.1-4-22.2-8.8-32.9-14.7-10.6-5.9-20.9-12.9-30.5-20.8-9.6-7.9-18.5-16.9-26.4-26.6-7.9-9.7-14.9-20.2-20.8-31-6-10.9-11-22.2-15-33.7-4.1-11.5-7.2-23.2-9.6-34.9-4.8-23.4-6.6-46.8-6.3-69.5 0.3-22.7 2.7-44.8 6.6-65.7 3.8-20.8 8.8-40.4 14.1-58.7 5.2-18.3 10.7-35.4 15.9-51.2 5.3-15.7 10.2-30.3 14.6-43.6 4.4-13.2 8.2-25 11.4-35.4 1.5-5.1 3-9.9 4.2-14.3q1.9-6.5 3.4-11.8c1.9-7.1 3.3-12.5 4.2-15.9q1.1-5.2 2.2-10.3c0.4-1.7 0.8-3.4 1.1-5q0.5-2.5 1-4.9c0.7-3.3 1.2-6.5 1.8-9.7 0.6-3.2 1-6.4 1.5-9.5 1.9-12.6 3.1-24.9 3.4-37.5 0.3-12.6-0.3-25.5-2.7-39q-0.3-1.2-0.5-2.5c-0.1-0.9-0.4-1.7-0.5-2.6q-0.6-2.5-1.2-5.1c-0.4-1.7-1-3.4-1.5-5.1-0.6-1.7-1-3.5-1.6-5.2q-1-2.6-2-5.2-0.5-1.3-1-2.7-0.6-1.2-1.2-2.5-1.3-2.6-2.5-5.3-1.4-2.6-2.9-5.2c-4-6.9-9-13.7-15.2-20.2-6.2-6.5-13.6-12.7-22.3-18.3-17.3-11.1-40-19.7-67-22.8-13.5-1.7-28-1.8-43.3-0.2-7.6 0.8-15.3 2-23.3 3.9q-3 0.8-6.1 1.6c-2 0.5-4 0.9-6.1 1.6q-3 0.9-6.1 1.8-1.6 0.5-3.2 1-1.5 0.5-3.1 1.1c-16.7 5.6-33.9 13.3-51.6 22.8-17.7 9.5-35.8 21.1-54.8 34.1-19.1 13.1-39.3 22.8-48.4 21.6-5.6-0.7-6.5-5.6 7.2-19.7 6.9-7 17.4-16.4 33.3-28.3 3.9-3 8.3-6.1 12.9-9.4 2.4-1.6 4.9-3.2 7.4-5 2.5-1.7 5.1-3.4 7.9-5.1 11-7 23.8-14.4 38.7-21.6 7.3-3.7 17.3-8.1 29.9-13 12.6-4.7 27.7-9.4 45.7-13 17.9-3.4 38.5-5 60.8-3.1 11.1 0.9 22.6 2.8 34.4 5.8 5.9 1.5 11.8 3.3 17.7 5.5 3 1 6 2.2 8.9 3.4 1.5 0.6 3 1.3 4.5 2q2.2 0.9 4.4 2c11.8 5.7 23.3 13.1 34 22.2 10.6 9.1 20.4 20.1 28.1 32.7 7.8 12.5 13.7 26.5 17.6 41.1 4 14.7 6 29.9 6.6 45.2 1.1 30.6-3.4 61.7-10.7 92-3.6 15.1-7.6 30.2-12.2 45.2-4.4 15.1-9.2 30-14.1 45-9.6 29.3-18.6 55.7-26.2 81.1-1 3.1-1.9 6.3-2.8 9.4-0.9 3.1-1.8 6.2-2.6 9.3-1.7 6.2-3.4 12.3-4.8 18.5q-1.1 4.5-2.2 9.1-1 4.5-2 9c-0.6 3.1-1.3 6.1-1.8 9.1l-0.9 4.5-0.7 4.4c-3.9 24-5.5 48.1-4.2 72.7q1 18.4 4.7 37.2c2.5 12.5 6.1 25.1 10.9 37.6 6.7 16.9 15.6 32.8 26.7 46.7 11.1 14 24.5 25.6 39.1 35 14.6 9.4 30.6 16.1 46.6 20.9 8.1 2.5 16.2 4.3 24.3 5.8 4 0.8 8.1 1.4 12.1 2 4 0.5 8 1.1 11.9 1.5 4 0.4 8 0.6 11.9 0.9 3.9 0.2 7.8 0.5 11.6 0.6 7.7 0.2 15.2 0.2 22.5 0 14.7-0.4 28.6-1.4 41.6-2.7 12.9-1.3 24.8-3 35.6-4.6q8.1-1.3 15.4-2.4c4.8-0.8 9.3-1.6 13.4-2.4 15.8-2.8 31.6-5.5 47.3-8.7 10.7-2 27.3-5.6 48.1-11.4 2.5-0.8 5.2-1.5 7.9-2.3q4.1-1.3 8.3-2.6c4.6-1.3 9.2-2.9 14-4.6-6.6-7.3-12.7-14.6-18.2-21.9-15.8-20.8-27.4-40.8-35.2-57.1-4.2-8.3-8.5-17.8-12.4-28.3-3.9-10.5-7.4-22.1-10.2-34.7-0.7-3.2-1.4-6.4-2-9.7-0.5-3.3-1.1-6.6-1.6-10-0.9-6.9-1.6-13.9-1.8-21.1q-0.2-2.7-0.3-5.5 0-2.7 0-5.5c-0.1-3.7 0.1-7.4 0.3-11.1 0-1.9 0.2-3.8 0.3-5.7q0.2-2.8 0.4-5.7 0.3-2.8 0.6-5.7c0.3-1.9 0.5-3.9 0.8-5.8 2.2-15.4 5.7-31.2 11.1-46.9 2.6-7.8 5.9-15.6 9.4-23.4 1.8-3.8 3.6-7.7 5.7-11.5 1.9-3.8 4.1-7.5 6.3-11.3 9-14.9 19.8-29.2 32.6-42.1l2.4-2.4 2.5-2.3c1.7-1.6 3.3-3.2 5-4.7q2.7-2.2 5.3-4.4l1.3-1.1 1.4-1.1 2.7-2.1c3.6-2.8 7.5-5.4 11.2-8 4-2.5 7.9-5 12-7.2 4-2.4 8.2-4.3 12.4-6.4 4.3-2 8.6-3.8 13-5.4 8.8-3.3 17.9-5.9 27.1-7.7 18.4-3.7 37.4-4.5 56.1-2.1 9.3 1.3 18.6 3.4 27.6 6.3 9 3 17.7 6.9 25.9 11.7 2.1 1.2 4.1 2.4 6.1 3.7l2.9 2 2.9 2.1c1.9 1.3 3.7 2.9 5.6 4.3 1.8 1.5 3.5 3.2 5.2 4.7l2.6 2.4c0.8 0.8 1.6 1.7 2.4 2.5q2.4 2.5 4.7 5.1 2.2 2.6 4.4 5.3 1.1 1.3 2.1 2.6l1.9 2.8c1.3 1.9 2.6 3.7 3.9 5.6q1.7 2.8 3.4 5.7c0.6 0.9 1.2 1.9 1.7 2.8l1.5 3c1 1.9 2 3.8 2.9 5.8q1.3 2.9 2.6 5.9c0.4 1 0.9 1.9 1.3 2.9l1.1 3q1.1 3 2.1 5.9 1 3 1.9 6c4.8 15.8 7 31.6 7.7 46.7 0 1.9 0.2 3.8 0.2 5.7q0 2.8 0 5.5 0 1.4 0 2.8-0.1 1.4-0.1 2.7-0.2 2.8-0.3 5.5c-0.2 3.6-0.6 7.1-0.9 10.6-0.4 3.4-0.8 6.9-1.3 10.2-2 13.4-5.1 25.9-8.7 37.3-10.6 35.1-28.4 67.3-50.7 95.6-22.3 28.3-48.9 52.8-78.5 73.1-1.9 1.3-3.8 2.5-5.6 3.7-1.9 1.3-3.8 2.5-5.7 3.6l-11.4 7c-1.9 1.2-3.8 2.2-5.8 3.3l-5.8 3.2c-1.9 1.1-3.9 2.2-5.8 3.3l-6 3-5.9 3-3 1.5-2.7 1.2q3.9 3.3 7.9 6.4c10.4 8.1 21 15.4 31.6 21.9 21.4 13.2 42.9 23.7 62.9 32 20.1 8.3 38.7 14.4 54.6 19.1 13.6 4.1 27.4 7.4 41.3 10.4 13.9 2.8 27.9 5.4 42 7.3 16.1 2.3 37.4 5.2 61.1 7.7 23.8 2.5 50 4.6 75.6 6.1 51.2 3.1 100.2 2.5 123.5 2.2l10.3 0.1 10.3-0.1c6.9-0.1 13.8-0.2 20.7-0.5 35.1 0.2 62.3-0.5 83-1q-0.8-0.9-1.6-1.7c-6.6-7.7-12.4-15.8-17.6-24-6-9.8-13.2-23.1-19.7-38.5-6.7-15.3-12.8-32.7-18.1-50.5-5-17.1-9.4-34.4-12.6-50.4q-0.6-3-1.3-6-0.4-2.8-0.9-5.6l-0.4-2.8c-0.1-0.5-0.2-1-0.2-1.4l0.1-1q0.2-2 0.4-4.1c0-1.5 0.5-2.2 0.9-3.2l0.5-1.4c0.2-0.5 0.3-1 0.6-1.3q0.6-1.1 1.2-2.1c0.2-0.4 0.5-0.7 0.7-0.9l0.6-0.9c0.2-0.2 0.5-0.6 0.7-0.8l0.6-0.7 0.7-0.6 0.6-0.6q0.7-0.6 1.3-1c0.2-0.2 0.3-0.3 0.8-0.6 0.5-0.3 1.2-0.7 1.6-1 0.3-0.1 0.3-0.1 0.5-0.1l0.4-0.1 1-0.1q0.9 0 1.8-0.1 1.9-0.1 3.6-0.3 3.6-0.2 6.9-0.5 0.8 0 1.6-0.1c0.1-0.1 0.5 0.2 0.8 0.4l0.8 0.5q0.9 0.4 1.7 0.9 3.4 2 6.6 3.8 11.5 10.5 22.4 20.4c1.8 1.6 3.6 3.3 5.4 4.8q2.6 2.3 5.3 4.6 1.3 1.1 2.6 2.3 1.3 1 2.6 2.1 2.6 2.1 5.2 4.1 5.1 4.1 9.8 7.9 0.5 0.4 1 0.8 0.5-0.2 0.9-0.2c1.7-0.2 2.9 0.6 2.9 3q2.4 1.8 4.7 3.5 4.5 3.4 8.8 6.6 1 0.8 2.1 1.6 1 0.7 2.1 1.4 2.1 1.5 4.1 2.9c5.4 3.7 10.3 7.1 14.8 10.2q6.9 4.4 12.4 7.9c3.7 2.3 6.9 4.5 9.8 6.1q8.5 5.1 11.4 6.8 3.7 2 7.2 3.9 2.9 1.4 5.7 2.9 1-0.1 2-0.2l1-0.1c0.4 0 0.8 0 1.2 0.2 1 0.3 2.1 1.2 2.8 2.3 0.4 0.7 0.6 1.4 0.7 2q3.4 1.9 6.9 3.9c4.6 2.4 9.3 5 14.5 7.7q3.8 2.1 8 4.4 4.3 2 9.1 4.4 4.8 2.2 10.1 4.8 1.4 0.6 2.8 1.3 1.4 0.6 2.8 1.2 2.9 1.2 6 2.5 6.1 2.6 13.1 5.4c4.7 1.8 9.7 3.6 15 5.5 21.3 7.4 48.1 15.5 83.1 21.6 8.8 1.5 16.3 7 17.8 13.6 0.7 3.2 0 6.5-4.2 8.7 2.1 1 3.2 2.1 3.6 3.2zm-1000-194.9c12.3 20.9 27.5 40.3 44.3 57.6q0.5-0.2 1.1-0.4c1.6-0.7 3.3-1.5 4.9-2.3q5-2.2 10.1-4.6 4.9-2.5 10-5.1c1.7-0.8 3.5-1.7 5.2-2.6q2.5-1.4 5-2.8 2.6-1.4 5.2-2.9 1.3-0.7 2.6-1.4c0.8-0.5 1.6-1 2.5-1.5q5.1-3.1 10.2-6.3c1.8-1 3.4-2.2 5.1-3.3q2.6-1.6 5.1-3.4c6.7-4.6 13.4-9.6 19.9-14.9 3.3-2.6 6.5-5.4 9.8-8.1 3.1-2.9 6.4-5.7 9.5-8.7 6.2-5.9 12.3-12.1 18.1-18.6 11.6-13.1 22.4-27.3 31.6-42.5 18.5-30.2 30.6-64.6 33.4-98.8 0.1-2.1 0.3-4.3 0.4-6.4q0.1-3.1 0.2-6.3c0.1-2.1 0-4.2 0-6.3-0.1-1 0-2.1-0.1-3.1l-0.2-3.1c-0.1-4.2-0.7-8.3-1.1-12.4q-0.5-3-0.9-6l-0.3-1.5-0.3-1.5-0.6-3c-1.7-7.8-3.8-15.5-6.7-22.6-2.9-7.2-6.1-14-10.1-20-3.9-6.2-8.2-11.8-13-16.6l-1.8-1.9c-0.6-0.6-1.2-1.1-1.9-1.7q-1.8-1.6-3.7-3.3c-2.6-2-5.2-4-7.9-5.8-10.9-7.1-22.9-11.4-34.5-13.8-11.8-2.5-23.2-2.9-33.6-2.1-10.4 0.7-19.8 2.5-27.9 4.8-7.1 2-14 4.5-20.6 7.6-1.7 0.7-3.3 1.6-5 2.4-1.7 0.9-3.3 1.7-4.9 2.6l-4.9 2.7-4.7 3c-12.4 8.1-23.8 18-33.9 29.2-4.8 5.6-9.9 11.9-14.9 19.2-4.9 7.2-9.6 15.4-14 24.4-8.8 18-15.8 39.5-19.2 63-1.7 11.8-2.4 24.1-2.1 36.6 0.1 3.1 0.4 6.2 0.5 9.4 0.1 1.5 0.3 3.1 0.5 4.7q0.2 2.3 0.5 4.7c0.9 6.3 1.9 12.7 3.3 19.1 1.4 6.4 3.2 12.8 5 19.1 2.1 6.4 4.2 12.7 6.8 19 2.4 6.2 5.3 12.4 8.2 18.5 1.6 3 3.1 6.1 4.7 9.1l2.5 4.5zm870.4 167.7c-0.3 0.9-0.6 2-0.9 2.9q-1.6 5-3.4 10.3c-1.7 5.5-3.6 11.2-5.5 17q0.1-0.3 0.1-0.5-0.3 0.6-0.6 1.1c-0.1 0.3 0 0.6 0.1 0.7 0.1 0 0.1 0 0.2 0 0.4-0.1 1-0.4 1.6-0.7q0.3-0.1 0.6-0.2c0.1 0 0.1 0 0.2-0.1l0.7-0.6 1.3-1.2 5.5-4.8c8.7-6.9 15.8-12.4 21.4-16.5-6.7-2.2-13.8-4.6-21.3-7.4zm-49-20.2c0.1 2.5-0.7 5.1-1.9 6.8q-5.3 7-10.8 14.5c-7.3 9.9-14.8 20.3-22.3 30.9-15 21.3-30 43.3-42.6 63.1q-4.8 7.4-9 14.3c37.7-40.5 85.7-92.2 110.7-119.1q-3.7-1.6-7.5-3.2c-5.5-2.2-11-4.7-16.6-7.3zm-58.9-0.3q6.6-7.8 13.1-15.6l0.5-0.5 0.1-0.1 0.4-0.4c0.1-0.1 0-0.2-0.1-0.1h-0.2l-0.2 0.1-0.2 0.1h-0.1l-0.2 0.1-1.2 0.6c-13.3 6.5-25.6 12.5-36.4 17.8q-7.5 3.7-14.5 7.1-3.5 1.7-6.9 3.3-0.3 0.2-0.7 0.4 0.8 1.1 1.6 2.3c0.5 0.7 1.1 1.5 1.6 2.2q0.9 1.2 1.9 2.3 0.9 1.2 1.9 2.5c0.6 0.8 1.4 1.6 2.1 2.4q1.1 1.3 2.2 2.6 1.5 1.5 3 3c0.4 0.5 0.8 0.9 1.2 1.3q0.7 0.6 1.3 1.2 0.6 0.6 1.3 1.2c9.3-11.1 18.9-22.4 28.5-33.8zm9.4 15.9c0.1 0.5 1.3 0.9 2.2 0.3 0.4-0.2 0.9-0.7 1.4-1.2q0.7-0.6 1.4-1.2 1.4-1.2 2.6-2.3 2.3-2.1 4.1-3.7c2.2-1.9 3.6-3.1 4.9-4 1.8-1.3 6.7-5.3 12.5-10.1q0.6-0.5 1.1-1l0.6-0.4 0.3-0.3q0.2-0.2 0.4-0.3-1.9-0.9-3.7-1.9-2.7-1.4-5.5-2.8-2.7 3.3-5.5 6.7-1.5 1.7-2.9 3.5l-1.4 1.7q-1.2 1.6-2.5 3.2c-3.2 4.1-5.7 7.4-7.4 9.8q-1.3 1.9-2 3c-0.2 0.4-0.5 0.7-0.6 1zm-11.9-47.7q-7.5-4.6-15-9.2-0.2 0.3-0.4 0.5-4.3 5.6-8.7 11.4-3.5 4.6-7.1 9.2-1.5 2.1-3.1 4.2-0.9 1.2-2 2.6-0.5 0.7-1 1.4c-0.2 0.2-0.4 0.5-0.5 0.7-0.2 0.3-0.2 0.6-0.1 0.9 0.2 0.6 1 1 1.6 0.7 0.7-0.3 1.3-0.6 1.9-0.9q1.8-0.9 3.6-1.9c1.8-0.9 3.4-1.7 5-2.4q6.6-3.2 12.9-6.2c6-2.9 11.8-5.6 17.6-8.3q-2.4-1.4-4.7-2.7zm-59.3-21.9c0.3 0.4 0.8 0.7 1.4 0.7 0.6 0 1.1-0.4 1.6-0.6q3.2-1.3 7-3 0.9-0.4 1.9-0.8 2-0.8 4.1-1.7 0.5-0.2 1-0.4c-2.4-1.7-4.7-3.5-6.9-5.3q-1.7-1.3-3.4-2.6-0.4 0.7-0.8 1.4-0.2 0.4-0.4 0.7l-0.2 0.4-0.2 0.3q-0.2 0.4-0.4 0.8-1 1.8-2 3.6c0 0-0.1 0.1-0.2 0.3q-0.8 1.5-2.1 3.7c-0.2 0.4-0.4 0.7-0.6 1.2-0.2 0.4-0.1 0.9 0.2 1.3zm-18.6 2.7c0.3-1.1 0.8-2.3 1.6-3.7 3.7-6.2 7.8-12.9 12.1-20.2q0.4-0.6 0.7-1.2-0.1-0.1-0.2-0.2-2.3-1.9-4.6-3.9-2.3-1.9-4.6-3.9l-1.1-1-0.5-0.4-0.9-0.9-2-1.8q-1-0.9-2-1.9-2-2-4.2-4c-2.8-2.5-5.7-5.4-8.6-7.9l-1.8-1.6-0.4-0.4c-0.2-0.1-0.3-0.3-0.5-0.3-0.2 0-0.4 0.1-0.5 0.3-0.1 0.2 0 0.5 0 0.7q0.6 2.7 1.3 5.4c0.9 3.6 1.8 7.1 2.8 10.3 1 3.2 2 6.2 3 8.8q0.4 1 0.8 2l0.3 0.9q0.4 1.1 0.8 2.2c1.1 3.1 2.1 6.2 3.2 9.1q2.7 7.1 5.3 13.6zm8 17.9c4.2 9.1 8.3 16.4 11.5 21.8 3.5-4.5 7-8.9 10.5-13.4q2.9-3.7 5.8-7.4 1.9-2.3 3.8-4.7c2.4-3 5-6.1 7.7-9.4q0.5-0.4 1.4-1.3 0.4-0.4 0.9-0.9c0.2-0.2 0.4-0.4 0.5-0.6q0-0.2 0-0.3 0 0-0.1-0.1-0.1-0.1-0.3-0.2c-0.7 0.1-1.6 0.5-2.7 0.9q-0.5 0.1-1 0.3-2.6 1.1-5.4 2.2-9.3 3.8-19.5 8c-2.1 0.8-4.3 1.8-6.1 2.2-0.9 0.1-1.9 0.4-2.6 0.3l-1.2 0.1c-0.3 0-0.6-0.1-1-0.1-1.4-0.1-2.3-0.4-3.4-0.6q-0.2-0.1-0.4-0.1 0.8 1.7 1.6 3.3zm64.1 83.5c-2.9 2.8-5.5 6.1-8.4 9.2q-1 1.2-2.1 2.4l-1.1 1.2-1 1.2q-2 2.5-4 5-1 1.2-2 2.5-1.1 1.2-2 2.5-0.7 1.1-1.4 2.1l-1 1.4c-1.2 1.8-2.5 3.7-3.7 5.7q-1.9 3-3.7 6.1c-1.3 2.1-2.4 4.3-3.6 6.4q-0.9 1.6-1.8 3.2c-0.6 1.1-1.2 2.2-1.8 3.4q-1.7 3.3-3.4 6.8c-8.7 17.6-16 37-22.2 56.1 11-20.4 23.5-40.1 35.2-58 12-18.1 23.3-34.3 32.3-46.8q11.1-16 22.5-31.8c0 0-11.7 6.2-26.8 21.4zm-64 139.8c-1.9-1.4-3.5-3.5-4.4-6q-0.1-0.2-0.2-0.5-0.4 1.5-0.8 2.9-0.4 1.8-0.9 3.7-0.9 3.6-1.8 7.2-0.4 1.9-0.9 3.7 4.4-5.5 9-11zm136.6-111.3c1.9-1.2 4-2.5 6.3-3.8q0-0.1 0.1-0.2 0-0.8 0.1-1.8c0.1-0.7 0.4-1.5 0.5-2.3 1.5-4.5 4.1-12.1 7.4-22.2q0.6-1.8 1.3-3.8 0.1-0.5 0.3-1l0.1-0.2q0.1-0.1 0.1-0.3 0.1-0.1 0.2-0.3l0.1-0.1c0-0.1 0-0.2 0.1-0.3q0.4-0.9 0.7-1.9c0.1-0.4 0.4-0.8 0.3-1.1-0.1-0.2-0.3-0.3-0.5-0.4-0.1 0-0.3 0.1-0.4 0.2-0.9 0.9-2 2-3.3 3.3l-0.5 0.5-2.5 2.7q-2.5 2.7-5 5.4-5.1 5.4-10.1 10.8c-6.6 7.1-13.1 14.2-19.3 20.8-10.1 10.9-19.2 20.7-26 28.3 7.3-5.2 14.1-9.7 19.9-13.4q3.8-2.3 7.5-4.7l7.6-4.8c2.5-1.5 4.9-3.2 7.5-4.7q3.8-2.3 7.5-4.7zm100.5-38.6l4.6-0.6c-7.9-2-18-4.8-29.7-8.4-1.9 2.3-4 4.9-6.3 7.6-3.6 4.2-7.5 8.7-11.7 13.3 3-1 5.9-1.9 8.7-2.9 4.8-1.6 9.5-2.9 13.7-4.1 2.2-0.6 4.2-1.2 6.2-1.7q3-0.7 5.6-1.3c3.5-0.8 6.5-1.5 8.9-1.9z"
              />
            </svg>
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-6xl px-6">
        <div className="space-y-3 text-center">
          <h3 className="text-3xl font-bold tracking-wider md:text-4xl" id="faq">
            Frequently Asked Questions
          </h3>
          <p className="text-neutral-400">
            Have another question? Contact us at{" "}
            <a href="mailto:#" className="underline">
              help@fundrush.com
            </a>
          </p>
        </div>
        <Accordion type="single" collapsible>
          {faq.map((faq, index) => (
            <AccordionItem value={`faq-${index}`} key={`faq-${index}`}>
              <AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-neutral-400">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
