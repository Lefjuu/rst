import { AddressType } from "@prisma/client";

export type GetAddressesParams = {
  user_id: number;
  page?: number;
  pageSize?: number;
};

export type CreateAddressParams = {
  user_id: number;
  address_type: AddressType;
  valid_from: string;
  post_code: string;
  city: string;
  country_code: string;
  street: string;
  building_number: string;
};

export type UpdateAddressParams = {
  user_id: number;
  address_type: AddressType;
  valid_from: string | null;
  post_code: string;
  city: string;
  country_code: string;
  street: string;
  building_number: string;
  original_valid_from: string;
};

export type AddressPreviewProps = {
  street: string;
  building_number: string;
  post_code: string;
  city: string;
  country_code: string;
};

export type AddressFormParams = Omit<
  CreateAddressParams | UpdateAddressParams,
  "valid_from"
> & {
  valid_from: string;
};
