import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFullDateFromDate(date: Date) {
  return `${date.getFullYear()} - ${date.getMonth()} - ${date.getDate()}`
}
