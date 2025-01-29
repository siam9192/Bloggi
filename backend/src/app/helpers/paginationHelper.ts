import { IPaginationOptions } from "../interfaces/pagination";

interface IOptionsResult {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}
export const calculatePagination = (
  options: IPaginationOptions,
): IOptionsResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 12;
  const sortBy = options.sortBy || "created_at";
  const sortOrder = options.sortOrder || "desc";
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
