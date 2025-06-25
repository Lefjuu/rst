"use client";
import { useUpdateAddress } from "@/frontend/addresses/hooks/useUpdateAddress";
import { UserAddress } from "@prisma/client";
import { UpdateAddressParams } from "@/frontend/addresses/types";
import { AddressFormProvider } from "@/frontend/addresses/context/AddressFormProvider";

import { ModalForm } from "@/frontend/addresses/components/modals/ModalForm";

interface EditAddressModalProps {
  open: boolean;
  onClose: () => void;
  address: UserAddress;
}

export const EditAddressModal = ({
  open,
  onClose,
  address,
}: EditAddressModalProps) => {
  const { mutate, isPending } = useUpdateAddress();

  const submit = (data: UpdateAddressParams) => {
    mutate(
      {
        ...data,
        user_id: address.user_id,
        address_type: address.address_type,
        valid_from: data.valid_from
          ? new Date(data.valid_from).toISOString()
          : null,
        original_valid_from: address.valid_from.toISOString(),
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <AddressFormProvider initialValues={address}>
      <ModalForm<UpdateAddressParams>
        open={open}
        onClose={onClose}
        title={`Edit ${address.address_type} Address`}
        isLoading={isPending}
        onSubmit={submit}
      />
    </AddressFormProvider>
  );
};
