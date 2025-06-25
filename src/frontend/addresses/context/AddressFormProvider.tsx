import type { PropsWithChildren } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { addressSchema, isAddressType } from "@/frontend/addresses/utils";
import { UserAddress } from "@prisma/client";
import type { AddressFormParams } from "@/frontend/addresses/types";
import { AddressType } from "@/backend/addresses/types";

interface AddressFormProviderProps extends PropsWithChildren {
  initialValues?: Partial<UserAddress>;
}

export const AddressFormProvider = ({
  children,
  initialValues,
}: AddressFormProviderProps) => {
  const rawType = initialValues?.address_type ?? "";
  const safeAddressType: AddressType = isAddressType(rawType)
    ? (rawType as AddressType)
    : AddressType.HOME;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { address_type: _discarded, ...safeInitialValues } =
    initialValues ?? {};

  const methods = useForm<AddressFormParams>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      user_id: 0,
      address_type: safeAddressType,
      street: "",
      building_number: "",
      post_code: "",
      city: "",
      country_code: "",
      ...safeInitialValues,
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
