import { userSchema } from "@/frontend/users/utils";
import { z } from "zod";

export type UserSchema = z.infer<typeof userSchema>;
