import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const compareArrays = (a: any[], b: any[]) => {
  return a.toString() === b.toString();
};


export function formatPhoneNumber(value: string) {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, "");

  // Format based on digit count
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return value;

  let formatted = "";
  if (match[1]) {
    formatted += `(${match[1]}`;
  }
  if (match[1] && match[1].length === 3) {
    formatted += `) `;
  }
  if (match[2]) {
    formatted += match[2];
  }
  if (match[2] && match[2].length === 3) {
    formatted += `-`;
  }
  if (match[3]) {
    formatted += match[3];
  }

  return formatted;
}
