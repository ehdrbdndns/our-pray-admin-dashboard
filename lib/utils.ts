import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFullDateFromDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export function getFullTimeFromDate(date: Date) {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export function getFullDateTimeFromDate(date: Date) {
  return `${getFullDateFromDate(date)} ${getFullTimeFromDate(date)}`
}

export function createUniqId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function XSSFilter(content: string) {
  return content.replace(/</g, "<").replace(/>/g, ">");
}