import { IPaginationOptions } from "../interfaces/pagination";

interface IOptionsResult {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  orderBy: string;
}
export const calculatePagination = (
  options: IPaginationOptions,
): IOptionsResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 12;
  const sortBy = options.sortBy || "created_at";
  const orderBy = options.orderBy || "desc";
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
    sortBy,
    orderBy,
  };
};
