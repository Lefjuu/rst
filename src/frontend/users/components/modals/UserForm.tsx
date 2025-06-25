"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, MenuItem, Box } from "@mui/material";
import { UserSchema } from "@/frontend/users/types";
import { userSchema } from "@/frontend/users/utils";
import { UserStatus } from "@/backend/users/types";

interface UserFormProps {
  defaultValues?: Partial<UserSchema>;
  onSubmit: (data: UserSchema) => void;
  submitText?: string;
}

export const UserForm = ({ defaultValues, onSubmit }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValues,
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
        error={!!errors.status}
        helperText={errors.status?.message}
        {...register("status")}
        defaultValue={defaultValues?.status || UserStatus.ACTIVE}
      >
        <MenuItem value={UserStatus.ACTIVE}>Active</MenuItem>
        <MenuItem value={UserStatus.INACTIVE}>Inactive</MenuItem>
      </TextField>
    </Box>
  );
};
