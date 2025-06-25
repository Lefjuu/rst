"use client";
import { Modal } from "@/frontend/components/ui/Modal";
import { AddressForm } from "@/frontend/addresses/components/AddressForm";
import { useFormContext, FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

interface ModalFormProps<T extends FieldValues> {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  title: string;
  onSubmit: SubmitHandler<T>;
}

export const ModalForm = <T extends FieldValues>({
  open,
  onClose,
  isLoading,
  title,
  onSubmit,
}: ModalFormProps<T>) => {
  const { handleSubmit, reset } = useFormContext<T>();

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <AddressForm />
    </Modal>
  );
};
