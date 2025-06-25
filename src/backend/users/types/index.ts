import { Prisma } from "@prisma/client";

export type GetUsersParams = {
  page?: number;
  pageSize?: number;
};

export type CreateUserParams = Prisma.UserCreateInput;

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
