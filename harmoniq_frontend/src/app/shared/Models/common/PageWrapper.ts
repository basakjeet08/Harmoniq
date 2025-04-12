export interface Pageable {
  pageNumber: number;
  pageSize: number;
}

export interface PageWrapper<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
}
