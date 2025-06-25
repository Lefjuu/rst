import { Controller, useFormContext } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";
import { AddressType } from "@prisma/client";
import {
  CreateAddressParams,
  UpdateAddressParams,
} from "@/frontend/addresses/types";
import { AddressPreview } from "@/frontend/addresses/components/AddressPreview";

export const AddressForm = () => {
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useFormContext<CreateAddressParams | UpdateAddressParams>();
  const formData = watch();

  return (
    <>
      <Controller
        name="address_type"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            label="Address Type"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          >
            <MenuItem value={AddressType.HOME}>Home</MenuItem>
            <MenuItem value={AddressType.INVOICE}>Invoice</MenuItem>
            <MenuItem value={AddressType.POST}>Post</MenuItem>
            <MenuItem value={AddressType.WORK}>Work</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name="valid_from"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Valid From"
            type="date"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <TextField
        label="Street"
        fullWidth
        margin="normal"
        error={!!errors.street}
        helperText={errors.street?.message}
        {...register("street")}
      />
      <TextField
        label="Building Number"
        fullWidth
        margin="normal"
        error={!!errors.building_number}
        helperText={errors.building_number?.message}
        {...register("building_number")}
      />
      <TextField
        label="Post Code"
        fullWidth
        margin="normal"
        error={!!errors.post_code}
        helperText={errors.post_code?.message}
        {...register("post_code")}
      />
      <TextField
        label="City"
        fullWidth
        margin="normal"
        error={!!errors.city}
        helperText={errors.city?.message}
        {...register("city")}
      />
      <TextField
        label="Country Code"
        fullWidth
        margin="normal"
        error={!!errors.country_code}
        helperText={errors.country_code?.message}
        {...register("country_code")}
      />
      <AddressPreview
        street={formData.street || ""}
        building_number={formData.building_number || ""}
        post_code={formData.post_code || ""}
        city={formData.city || ""}
        country_code={formData.country_code || ""}
      />
    </>
  );
};
