import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFullDateFromDate(date: Date) {
  return `${date.getFullYear()} - ${date.getMonth()} - ${date.getDate()}`
}

export function getUniqId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}