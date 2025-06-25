import { GetAddressesParams } from "@/backend/addresses/types";

export const ADDRESS_QUERY_KEYS = {
  all: (params: GetAddressesParams) => [
    "addresses",
    params.user_id,
    params.page,
    params.pageSize,
  ],
  list: (user_id: number) => ["addresses", user_id],
  detail: (user_id: number, addressType: string, validFrom: Date) => [
    "addresses",
    user_id,
    addressType,
    validFrom,
  ],
};
