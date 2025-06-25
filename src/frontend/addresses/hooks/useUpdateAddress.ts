import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAddress } from "@/backend/addresses/services/services";
import { UpdateAddressParams } from "@/frontend/addresses/types";
import { ADDRESS_QUERY_KEYS } from "@/frontend/addresses/consts";
import { toast } from "react-hot-toast";

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UpdateAddressParams) => {
      return await updateAddress(params);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ADDRESS_QUERY_KEYS.list(variables.user_id),
      });
      toast.success("Address updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update address. Please try again.");
    },
  });
};
