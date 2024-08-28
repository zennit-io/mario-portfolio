import type { SearchParams } from "@/types";
import { parseSearchParams } from "@/utils";

type PaginationParams = SearchParams<"pageSize" | "page">;

export const extractPaginationParams = ({
  pageSize,
  page,
}: PaginationParams) => {
  return {
    page: Number(parseSearchParams(page, "single", "1")),
    pageSize: Number(parseSearchParams(pageSize, "single", "20")),
  };
};
