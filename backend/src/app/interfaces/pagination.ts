export interface IPaginationOptions {
  page: string | number;
  limit: number;
  sortBy: string | undefined;
  sortOrder: string;
}

enum sortOrder {}
// ASC = ''
