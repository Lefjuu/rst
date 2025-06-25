import { z } from "zod";
import { AddressType } from "@prisma/client";

export const addressSchema = z.object({
  user_id: z.number(),
  address_type: z.nativeEnum(AddressType),
  valid_from: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD"),
  post_code: z
    .string()
    .min(1, "Post code is required")
    .max(10, "Post code is too long"),
  city: z.string().min(1, "City is required").max(60, "City is too long"),
  country_code: z
    .string()
    .min(2, "Country code is too short")
    .max(3, "Country code must be 2–3 letters"),
  street: z
    .string()
    .min(1, "Street is required")
    .max(100, "Street is too long"),
  building_number: z
    .string()
    .min(1, "Building number is required")
    .max(20, "Building number is too long"),
});

export const parseSearchParam = (
  param: string | string[] | undefined,
  defaultValue: number,
): number => {
  const value = Array.isArray(param) ? param[0] : param;
  return value ? parseInt(value) || defaultValue : defaultValue;
};

export type AddressSchema = z.infer<typeof addressSchema>;
