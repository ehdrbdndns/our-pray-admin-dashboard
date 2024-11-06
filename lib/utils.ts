import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

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

export function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.type;
    if (["image/png", "image/jpg", "image/jpeg"].includes(fileType)) return true;
  }
  return false;
}

export function checkFileSize(file: File, maxFileSize: number) {
  if (file?.size) {
    console.log(file.size);
    return file.size < maxFileSize;
  }

  return false;
}

export function createImageZodSchema(maxFileSize: number) {
  return (
    z.any()
      .refine((file: File) => file === undefined, "파일을 등록해야 합니다.")
      .refine((file: File) => checkFileSize(file, maxFileSize), `파일 크기가 ${maxFileSize / 1024}Byte 보다 작아야 합니다.`)
      .refine((file: File) => checkFileType(file), "(png, jpg, jpeg) 파일만 업로드 가능합니다.")
  )
}