import * as React from "react"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { env } from "@/env.mjs"
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(
  input: string | number | Date,
  format: string = 'ddd, MMM D, YYYY h:mm A'
): string {
  const date: Dayjs = dayjs(input)
  return `${date.format(format)}`
}

export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[]
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}
