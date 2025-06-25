"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useCreateAddress } from "@/frontend/addresses/hooks/useCreateAddress";
import { CreateAddressParams } from "@/frontend/addresses/types";
import { AddressFormProvider } from "@/frontend/addresses/context/AddressFormProvider";
import { ModalForm } from "@/frontend/addresses/components/modals/ModalForm";

export const CreateAddressModal = () => {
  const params = useParams();
  const user_id = parseInt(params.userId as string);

  const [open, setOpen] = useState(false);
  const { mutate, isPending: isCreatingAddress } = useCreateAddress();

  const submit = (data: CreateAddressParams) => {
    mutate(
      {
        ...data,
        user_id: user_id,
        valid_from: new Date(data.valid_from),
      },
      {
        onSuccess: () => setOpen(false),
      },
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Address
      </button>
      <AddressFormProvider>
        <ModalForm<CreateAddressParams>
          open={open}
          onClose={() => setOpen(false)}
          title="Create New Address"
          isLoading={isCreatingAddress}
          onSubmit={submit}
        />
      </AddressFormProvider>
    </>
  );
};
