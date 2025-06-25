import { useQuery } from "@tanstack/react-query";
import { UserAddress } from "@prisma/client";
import { PaginatedResult } from "@/backend/utils/pagination";
import { getAddresses } from "@/backend/addresses/services/services";
import { GetAddressesParams } from "@/backend/addresses/types";
import { ADDRESS_QUERY_KEYS } from "@/frontend/addresses/consts";

export const useGetAddresses = ({
  user_id,
  page,
  pageSize,
}: GetAddressesParams) => {
  return useQuery<PaginatedResult<UserAddress>>({
    queryKey: ADDRESS_QUERY_KEYS.all({ user_id, page, pageSize }),
    queryFn: async () => {
      const result = await getAddresses({ user_id, page, pageSize });
      return result;
    },
  });
};
