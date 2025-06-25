import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAddress } from "@/backend/addresses/services/services";
import { ADDRESS_QUERY_KEYS } from "../consts";
import { CreateAddressParams } from "@/backend/addresses/types";
import { toast } from "react-hot-toast";

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAddressParams) => {
      return await createAddress(data);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ADDRESS_QUERY_KEYS.list(variables.user_id),
      });
      toast.success("Address created successfully!");
    },
    onError: () => {
      toast.error("Failed to create address. Please try again.");
    },
  });
};
