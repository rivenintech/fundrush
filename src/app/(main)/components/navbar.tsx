"use client";

import clsx from "clsx";
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
          <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999">
            <path
              fill="#caf893"
              d="M245.723 160.83c30.075 82.631 11.435 171.114-41.241 234.002-80.777-14.314-151.932-70.115-182.008-152.746C-7.601 159.453 11.039 70.971 63.717 8.084c80.776 14.314 151.93 70.115 182.006 152.746zm252.528 46.939c-55.682-14.868-117.554-.466-161.237 43.217s-58.086 105.555-43.217 161.237c55.682 14.868 117.554.466 161.237-43.217s58.086-105.555 43.217-161.237z"
            ></path>
            <path
              fill="#aeef66"
              d="M455.033 369.006c-38.087 38.087-90.002 53.908-139.585 47.482 35.275-4.566 69.372-20.385 96.469-47.482 39.565-39.565 55.11-94.051 46.643-145.343-.882-5.339-3.936-19.682-4.119-21.543a167.46 167.46 0 0 1 43.809 5.648c14.869 55.683.467 117.555-43.217 161.238zM63.717 8.084a238.36 238.36 0 0 0-7.372 9.263c65.536 22.494 120.718 73.302 146.262 143.483 23.833 65.481 17.068 134.632-12.978 191.813l16.976 39.61c51.048-62.714 68.785-149.915 39.118-231.424C215.647 78.199 144.493 22.398 63.717 8.084z"
            ></path>
            <path d="m214.99 218.12-40.705 77.266a8.087 8.087 0 0 1-7.156 4.318 8.041 8.041 0 0 1-3.055-.603l-80.85-33.027a8.084 8.084 0 1 1 6.115-14.967l74.058 30.252 37.285-70.776a8.084 8.084 0 0 1 10.921-3.385c3.951 2.083 5.468 6.972 3.387 10.922zm-72.343 29.865a8.088 8.088 0 0 0 10.363 4.833 8.084 8.084 0 0 0 4.832-10.362l-14.808-40.682 36.392-69.08a8.085 8.085 0 0 0-14.306-7.535l-29.554 56.1L98.813 80.286c-1.528-4.196-6.168-6.361-10.362-4.832a8.084 8.084 0 0 0-4.832 10.362l36.753 100.972-58.702-23.979a8.085 8.085 0 1 0-6.115 14.967l72.285 29.528 14.807 40.681zm321.982-6.592a8.085 8.085 0 0 0-11.433 0l-46.121 46.118-1.953-40.241a8.079 8.079 0 0 0-8.467-7.682 8.085 8.085 0 0 0-7.683 8.467l2.665 54.894-16.509 16.509a8.083 8.083 0 0 0 5.717 13.8 8.06 8.06 0 0 0 5.717-2.368l16.51-16.508 54.897 2.665a8.084 8.084 0 1 0 .784-16.149l-40.243-1.953 46.121-46.118a8.086 8.086 0 0 0-.002-11.434zm-50.608 108.489-55.208-2.68-2.68-55.204c-.217-4.459-4.007-7.889-8.467-7.682a8.085 8.085 0 0 0-7.683 8.467l3.035 62.531a8.084 8.084 0 0 0 7.683 7.682l62.535 3.035a8.084 8.084 0 0 0 8.467-7.682 8.084 8.084 0 0 0-7.682-8.467zm92.41-54.973c-7.776 30.109-23.571 57.708-45.679 79.814-22.107 22.107-49.708 37.901-79.818 45.676a176.032 176.032 0 0 1-84.557.814L241.58 476.2v27.715a8.084 8.084 0 0 1-16.168 0v-29.619l-26.504-72.275c-40.173-7.835-77.986-25.659-109.601-51.702-33.695-27.755-59.439-64.224-74.451-105.467C-.157 203.611-3.879 159.125 4.091 116.206 11.826 74.552 30.294 35.369 57.498 2.894A8.081 8.081 0 0 1 65.107.125c41.716 7.391 81.05 25.536 113.752 52.474 33.695 27.756 59.439 64.224 74.451 105.468 15.012 41.241 18.734 85.727 10.764 128.646-7.421 39.963-24.722 77.653-50.138 109.325l22.786 62.135 48.134-48.303a175.973 175.973 0 0 1 .758-84.785c7.776-30.109 23.571-57.708 45.679-79.814 22.107-22.105 49.708-37.901 79.818-45.677 29.222-7.545 60.076-7.42 89.231.365a8.084 8.084 0 0 1 5.725 5.725 175.98 175.98 0 0 1 .364 89.225zM207.346 378.07c45.117-61.506 57.023-142.349 30.768-214.475C210.717 88.326 145.377 32.493 66.908 16.913 16.814 79.284 2.65 164.053 30.048 239.321c26.35 72.392 87.796 126.806 162.265 144.72l-19.372-52.825a8.086 8.086 0 0 1 4.807-10.374c4.192-1.54 8.837.616 10.374 4.806l19.224 52.422zm284.248-163.64c-53.362-12.554-110.012 3.419-148.868 42.272-36.575 36.573-52.875 88.917-44.19 139.439l27.186-27.28a8.084 8.084 0 0 1 11.433-.021 8.083 8.083 0 0 1 .021 11.432l-27.137 27.232a158.815 158.815 0 0 0 26.703 2.263c41.675.002 82.467-16.367 112.58-46.478 38.852-38.852 54.827-95.497 42.272-148.859z"></path>
          </svg>
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
