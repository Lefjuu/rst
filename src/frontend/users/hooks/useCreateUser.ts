import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/backend/users/services";
import { handleServerAction } from "@/frontend/utils/serverActionHandler";
import { CreateUserParams } from "@/backend/users/types";
import { USER_QUERY_KEYS } from "@/frontend/users/consts";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserParams) => {
      return await handleServerAction(createUser(data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.list(),
      });
    },
  });
};
