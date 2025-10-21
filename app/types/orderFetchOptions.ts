export interface OrderFetchOptions {
  page?: number;
  itemsPerPage?: number;
  sortBy?: Array<{ key: string; order: "asc" | "desc" }>;
}
