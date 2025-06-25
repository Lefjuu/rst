import { AddressType, UserAddress } from "@prisma/client";

export type GetAddressesParams = {
  user_id: number;
  page?: number;
  pageSize?: number;
};

export type CreateAddressParams = Omit<
  UserAddress,
  "created_at" | "updated_at"
>;

export type DeleteAddressParams = {
  user_id: number;
  address_type: AddressType;
  valid_from: Date;
};
