import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const fileExtensionMap = {
  ts: "typescript",
  js: "javascript",
  css: "css",
  less: "less",
  scss: "scss",
  json: "json",
  html: "html",
};
