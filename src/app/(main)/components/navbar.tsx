"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <nav className="container m-auto flex h-full items-center justify-between px-6 font-semibold">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/icon.svg" alt="FundRush Logo" width={40} height={40} />
          <p className="font-bold tracking-wider">FundRush</p>
        </Link>
        <button
          id="toggleMenu"
          className={clsx("relative grid size-6 place-content-center md:hidden", {
            "hamburger-toggle": isMenuOpen,
          })}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <div className="h-0.75 w-6 rounded-full bg-white transition-all duration-150 before:absolute before:left-0 before:h-0.75 before:w-6 before:-translate-y-2 before:rounded-full before:bg-white before:transition-all before:duration-150 before:content-[''] after:absolute after:right-0 after:h-0.75 after:w-6 after:translate-y-2 after:rounded-full after:bg-white after:transition-all after:duration-150 after:content-['']"></div>
        </button>
        <ul
          className={clsx(
            "absolute top-full left-0 flex w-full flex-col items-center justify-center gap-8 bg-neutral-950 font-semibold duration-150 max-md:h-[calc(100vh-5.9rem)] max-md:text-xl md:static md:flex md:flex-row md:justify-end md:bg-transparent",
            { flex: isMenuOpen, hidden: !isMenuOpen },
          )}
        >
          <li>
            <Link href="/campaigns" onClick={() => setIsMenuOpen(false)}>
              Campaigns
            </Link>
          </li>
          <li>
            <Link href="/#faq" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
