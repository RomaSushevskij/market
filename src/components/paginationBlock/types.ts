export type PaginationBlockProps = {
  onPageChange: (pageNumber: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  itemsTotalCount: number;
  pageSize: number;
  currentPage: number;
};
