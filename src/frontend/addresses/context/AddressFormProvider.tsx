import type { PropsWithChildren } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { addressSchema } from "@/frontend/addresses/utils";
import { AddressType, UserAddress } from "@prisma/client";
import type { AddressFormParams } from "@/frontend/addresses/types";

interface AddressFormProviderProps extends PropsWithChildren {
  initialValues?: Partial<UserAddress>;
}

export const AddressFormProvider = ({
  children,
  initialValues,
}: AddressFormProviderProps) => {
  const methods = useForm<AddressFormParams>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      user_id: 0,
      address_type: AddressType.HOME,
      street: "",
      building_number: "",
      post_code: "",
      city: "",
      country_code: "",
      ...initialValues,
      valid_from: initialValues?.valid_from
        ? new Date(initialValues.valid_from).toISOString().split("T")[0]
        : initialValues
          ? ""
          : new Date().toISOString().split("T")[0],
    },
    mode: "onChange",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
