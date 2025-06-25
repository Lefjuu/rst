"use server";
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import { actionWrapper, Context } from "../../utils/action";
import { APIError, HttpStatusCode } from "../../utils/errors";
import {
  PaginatedResult,
  paginatePrismaQuery,
  paginationSchema,
  validateParams,
} from "../../utils/pagination";
import { USER_SERVER_ACTION_NAMES } from "../consts/consts";
import { CreateUserParams, GetUsersParams } from "../types";
import { getAuthenticatedUser } from "../../auth/user";

export const getUsers = actionWrapper(
  USER_SERVER_ACTION_NAMES.getUsers,
  async (
    { userAuthData }: Context,
    params: GetUsersParams,
  ): Promise<PaginatedResult<User>> =>
    validateParams(paginationSchema, params, async (validatedParams) => {
      if (!userAuthData)
        throw new APIError(HttpStatusCode.UNAUTHORIZED, "Unauthorized");
      await getAuthenticatedUser(userAuthData);

      return paginatePrismaQuery<User>(
        prisma.user,
        { orderBy: { id: "asc" } },
        validatedParams,
      );
    }),
);

export const createUser = actionWrapper(
  USER_SERVER_ACTION_NAMES.createUser,
  async (
    { userAuthData }: Context,
    data: CreateUserParams,
  ): Promise<number> => {
    if (!userAuthData)
      throw new APIError(HttpStatusCode.UNAUTHORIZED, "Unauthorized");
    await getAuthenticatedUser(userAuthData);

    const user = await prisma.user.create({ data });
    revalidatePath("/");
    return user.id;
  },
);
