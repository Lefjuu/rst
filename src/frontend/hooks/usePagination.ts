import { useState } from "react";

import type { PaginationState } from "@tanstack/react-table";

interface UsePaginationArgs {
  initialPageSize?: number;
}

export interface Pagination {
  setPagination: (
    value: ((prevState: PaginationState) => PaginationState) | PaginationState,
  ) => void;
  pageIndex: number;
  pageSize: number;
  enforceValidPageIndex: ({
    isDataFetchingFinished,
    totalPages,
  }: {
    isDataFetchingFinished: boolean;
    totalPages?: number;
  }) => void;
}

export const usePagination = (config?: UsePaginationArgs): Pagination => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: config?.initialPageSize ?? 10,
  });

  const enforceValidPageIndex = ({
    isDataFetchingFinished,
    totalPages,
  }: {
    isDataFetchingFinished: boolean;
    totalPages?: number;
  }) => {
    if (totalPages && totalPages < pageIndex + 1 && isDataFetchingFinished) {
      setPagination((prev) => ({
        pageSize: prev.pageSize,
        pageIndex: totalPages ? totalPages - 1 : 0,
      }));
    }
  };

  return { pageIndex, pageSize, setPagination, enforceValidPageIndex };
};
