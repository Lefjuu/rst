"use client";
import { Modal } from "@/frontend/components/ui/Modal";
import { UserForm } from "@/frontend/users/components/modals/UserForm";
import { UserSchema } from "@/frontend/users/types";
import { User } from "@prisma/client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/frontend/users/utils";
import { useEffect } from "react";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

export const EditUserModal = ({ open, onClose, user }: EditUserModalProps) => {
  const methods = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (open) {
      methods.reset(user);
    }
  }, [open, user, methods]);

  const onSubmit = (data: UserSchema) => {
    console.log("Mock: Would update user with data:", data);
    alert(`Mock: User ${user.first_name} ${user.last_name} would be updated`);
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <Modal
        open={open}
        onClose={onClose}
        title={`Edit ${user.first_name} ${user.last_name} (Mock)`}
        onSubmit={methods.handleSubmit(onSubmit)}
        confirmText="Update (Mock)"
      >
        <UserForm />
      </Modal>
    </FormProvider>
  );
};
