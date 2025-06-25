import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "@/backend/addresses/services/services";
import { DeleteAddressParams } from "@/backend/addresses/types";
import { ADDRESS_QUERY_KEYS } from "@/frontend/addresses/consts";
import { toast } from "react-hot-toast";

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: DeleteAddressParams) => {
      return await deleteAddress(params);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ADDRESS_QUERY_KEYS.list(variables.user_id),
      });
      toast.success("Address deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete address. Please try again.");
    },
  });
};
