"use server";
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { UserAddress } from "@prisma/client";
import { actionWrapper, Context } from "@/backend/utils/action";
import {
  PaginatedResult,
  paginatePrismaQuery,
  paginationSchema,
  validateParams,
} from "@/backend/utils/pagination";
import {
  CreateAddressParams,
  DeleteAddressParams,
  GetAddressesParams,
} from "@/backend/addresses/types";
import { getAuthenticatedUser } from "@/backend/auth/user";
import { APIError, HttpStatusCode } from "@/backend/utils/errors";
import { ADDRESS_SERVER_ACTION_NAMES } from "@/backend/addresses/consts";
import { UpdateAddressParams } from "@/frontend/addresses/types";

export const getAddresses = async (
  params: GetAddressesParams,
): Promise<PaginatedResult<UserAddress>> => {
  try {
    return await validateParams(
      paginationSchema,
      { page: params.page, pageSize: params.pageSize },
      async (validatedParams) => {
        return paginatePrismaQuery<UserAddress>(
          prisma.userAddress,
          {
            where: { user_id: params.user_id },
            orderBy: { valid_from: "desc" },
          },
          validatedParams,
        );
      },
    );
  } catch (error) {
    console.error("getAddresses error:", error);
    throw new APIError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "Failed to fetch addresses",
    );
  }
};

export const createAddress = actionWrapper(
  ADDRESS_SERVER_ACTION_NAMES.createAddress,
  async (
    { userAuthData }: Context,
    data: CreateAddressParams,
  ): Promise<void> => {
    try {
      if (!userAuthData)
        throw new APIError(HttpStatusCode.UNAUTHORIZED, "Unauthorized");
      await getAuthenticatedUser(userAuthData);

      const newAddress = await prisma.userAddress.create({
        data: {
          ...data,
          valid_from: new Date(data.valid_from),
        },
      });
      revalidatePath(`/users/${newAddress.user_id}/addresses`);
    } catch (error) {
      console.error("createAddress error:", error);
      throw new APIError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "Failed to create address",
      );
    }
  },
);

export const updateAddress = actionWrapper(
  ADDRESS_SERVER_ACTION_NAMES.updateAddress,
  async (
    { userAuthData }: Context,
    {
      address_type,
      building_number,
      city,
      country_code,
      post_code,
      street,
      user_id,
      valid_from,
      original_valid_from,
    }: UpdateAddressParams,
  ): Promise<void> => {
    try {
      if (!userAuthData)
        throw new APIError(HttpStatusCode.UNAUTHORIZED, "Unauthorized");
      await getAuthenticatedUser(userAuthData);

      await prisma.userAddress.updateMany({
        where: {
          user_id,
          address_type,
          valid_from: new Date(original_valid_from),
        },
        data: {
          building_number,
          city,
          country_code,
          post_code,
          street,
          ...(valid_from ? { valid_from: new Date(valid_from) } : {}),
        },
      });
      revalidatePath(`/users/${user_id}/addresses`);
    } catch (error) {
      console.error("updateAddress error:", error);
      throw new APIError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "Failed to update address",
      );
    }
  },
);

export const deleteAddress = actionWrapper(
  ADDRESS_SERVER_ACTION_NAMES.deleteAddress,
  async (
    { userAuthData }: Context,
    { user_id, address_type, valid_from }: DeleteAddressParams,
  ): Promise<void> => {
    try {
      if (!userAuthData)
        throw new APIError(HttpStatusCode.UNAUTHORIZED, "Unauthorized");
      await getAuthenticatedUser(userAuthData);

      await prisma.userAddress.delete({
        where: {
          user_id_address_type_valid_from: {
            user_id,
            address_type,
            valid_from,
          },
        },
      });
      revalidatePath(`/users/${user_id}/addresses`);
    } catch (error) {
      console.error("deleteAddress error:", error);
      throw new APIError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "Failed to delete address",
      );
    }
  },
);
