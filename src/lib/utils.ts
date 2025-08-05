import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPercentChange(current: number, previous: number): number {
  if (previous === 0) {
    if (current === 0) return 0; // No change
    return 100; // Infinite increase approximated as 100%
  }

  return ((current - previous) / previous) * 100;
}
