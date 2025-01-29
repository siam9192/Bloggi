import { IPaginationOptions } from "../interfaces/pagination";
import { paginationOptionKeys } from "./constant";

export function generateSlug(name: string) {
  return name
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim(); // Remove leading/trailing spaces
}

export const getPaginationOptions = (query: any) => {
  const object: any = {};

  for (const key in query) {
    if (paginationOptionKeys.includes(key)) {
      object[key] = query[key];
    } else {
      continue;
    }
  }

  return object as IPaginationOptions;
};

export const validateDate = (date: string) => {
  return !isNaN(new Date(date).getTime());
};
