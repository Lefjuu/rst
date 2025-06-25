export const USER_QUERY_KEYS = {
  all: (params: { page?: number; pageSize?: number; search?: string }) => [
    "users",
    params.page,
    params.pageSize,
    params.search,
  ],
  list: () => ["users"],
};
