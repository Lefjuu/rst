import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getUsers } from "@/backend/users/services";
import { handleServerAction } from "@/frontend/utils/serverActionHandler";
import { USER_QUERY_KEYS } from "@/frontend/users/consts";

type GetUsersParams = {
  page?: number;
  pageSize?: number;
  search?: string;
};

export const useGetUsers = ({ page, pageSize, search }: GetUsersParams) => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.all({ page, pageSize, search }),
    queryFn: () => handleServerAction(getUsers({ page, pageSize })),
    enabled: !!page && !!pageSize,
    placeholderData: keepPreviousData,
  });
};
