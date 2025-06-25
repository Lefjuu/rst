import { UserStatus } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  first_name: z.string().optional().nullable(),
  last_name: z.string().min(1, "Last name is required"),
  initials: z.string().optional().nullable(),
  email: z.string().email("Invalid email format"),
  status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE]),
});
