"use client";

import { authClient } from "@/lib/auth/auth-client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = authClient.useSession();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Clean up when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 h-24 border-b-2 bg-neutral-950">
      <nav className="container m-auto flex h-full items-center gap-16 px-6 font-semibold">
        <Link href="/" className="inline-flex items-center gap-3 font-bold tracking-wider">
          <Image src="/icon.svg" alt="FundRush Logo" width={40} height={40} />
          FundRush
        </Link>
        <button
          id="toggleMenu"
          className={clsx("relative ml-auto grid size-6 place-content-center md:hidden", {
            "hamburger-toggle": isMenuOpen,
          })}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <div className="h-0.75 w-6 rounded-full bg-white transition-all duration-150 before:absolute before:left-0 before:h-0.75 before:w-6 before:-translate-y-2 before:rounded-full before:bg-white before:transition-all before:duration-150 before:content-[''] after:absolute after:right-0 after:h-0.75 after:w-6 after:translate-y-2 after:rounded-full after:bg-white after:transition-all after:duration-150 after:content-['']"></div>
        </button>
        <div
          className={clsx(
            "absolute top-full left-0 flex grow flex-col items-center justify-center gap-8 bg-neutral-950 duration-150 max-md:h-[calc(100vh-5.9rem)] max-md:w-full max-md:text-xl md:static md:flex md:flex-row md:justify-between md:bg-transparent",
            { flex: isMenuOpen, hidden: !isMenuOpen },
          )}
        >
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <Link href="/campaigns" onClick={() => setIsMenuOpen(false)}>
              Campaigns
            </Link>
            <Link href="/#faq" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </Link>
          </div>
          {data ? (
            <Link
              href="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="border-primary rounded-lg border-2 px-4 py-2 text-white duration-300 hover:border-green-500 hover:text-green-500"
            >
              Admin Panel
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                Log In
              </Link>
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg border-2 border-transparent bg-green-500 px-4 py-2 text-black duration-300 hover:border-green-500 hover:bg-transparent hover:text-white"
              >
                Start Fundraiser
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
