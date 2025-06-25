"use client";
import { useFormContext } from "react-hook-form";
import { TextField, MenuItem, Box } from "@mui/material";
import { UserSchema } from "@/frontend/users/types";
import { UserStatus } from "@prisma/client";

export const UserForm = () => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<UserSchema>();

  return (
    <Box component="div">
      <TextField
        label="First Name"
        fullWidth
        margin="normal"
        error={!!errors.first_name}
        helperText={errors.first_name?.message}
        {...register("first_name")}
      />

      <TextField
        label="Last Name"
        fullWidth
        margin="normal"
        required
        error={!!errors.last_name}
        helperText={errors.last_name?.message}
        {...register("last_name")}
      />

      <TextField
        label="Initials"
        fullWidth
        margin="normal"
        error={!!errors.initials}
        helperText={errors.initials?.message}
        {...register("initials")}
      />

      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        required
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />

      <TextField
        select
        label="Status"
        fullWidth
        margin="normal"
        defaultValue={getValues("status") || UserStatus.ACTIVE}
        error={!!errors.status}
        helperText={errors.status?.message}
        {...register("status")}
      >
        <MenuItem value={UserStatus.ACTIVE}>Active</MenuItem>
        <MenuItem value={UserStatus.INACTIVE}>Inactive</MenuItem>
      </TextField>
    </Box>
  );
};
