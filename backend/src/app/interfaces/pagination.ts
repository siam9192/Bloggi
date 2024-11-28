export interface IPaginationOptions {
  page: string | number;
  limit: number;
  sortBy: string | undefined;
  orderBy: string;
}

enum OrderBy {}
// ASC = ''
