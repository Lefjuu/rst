/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { APIError, HttpStatusCode } from "./errors";

export const paginationSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  pageSize: z.number().int().min(1).max(100).optional().default(10),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

interface PrismaModel<T> {
  findMany: (args?: any) => Promise<T[]>;
  count: (args?: any) => Promise<number>;
}

interface PrismaQueryArgs {
  where?: Record<string, any>;
  orderBy?: Record<string, any> | Record<string, any>[];
  include?: Record<string, any>;
  select?: Record<string, any>;
}

export const paginatePrismaQuery = async <T>(
  model: PrismaModel<T>,
  query: PrismaQueryArgs = {},
  pagination: PaginationParams,
): Promise<PaginatedResult<T>> => {
  const page = pagination.page || 1;
  const pageSize = pagination.pageSize || 10;
  const skip = (page - 1) * pageSize;

  const [data, total] = await Promise.all([
    model.findMany({
      ...query,
      skip,
      take: pageSize,
    }),
    model.count({ where: query.where }),
  ]);

  return {
    data,
    total,
    page,
    pageSize,
  };
};

export const validateParams = async <T extends z.ZodTypeAny, U>(
  schema: T,
  params: unknown,
  action: (validatedParams: z.infer<T>) => Promise<U>,
): Promise<U> => {
  const validationResult = schema.safeParse(params);
  if (!validationResult.success) {
    throw new APIError(HttpStatusCode.BAD_REQUEST, "Invalid parameters");
  }
  return action(validationResult.data);
};
