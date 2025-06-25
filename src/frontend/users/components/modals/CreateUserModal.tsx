"use client";
import { useState } from "react";
import { Modal } from "@/frontend/components/ui/Modal";
import { UserForm } from "@/frontend/users/components/modals/UserForm";
import { UserSchema } from "@/frontend/users/types";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/frontend/users/utils";
import { UserStatus } from "@/backend/users/types";

export const CreateUserModal = () => {
  const [open, setOpen] = useState(false);
  const methods = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      status: UserStatus.ACTIVE,
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    methods.reset();
  };

  const onSubmit = (data: UserSchema) => {
    console.log("Mock: Would create user with data:", data);
    alert("Mock: User would be created");
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create User
      </button>

      <FormProvider {...methods}>
        <Modal
          open={open}
          onClose={handleClose}
          title="Create New User (Mock)"
          onSubmit={methods.handleSubmit(onSubmit)}
          confirmText="Create (Mock)"
        >
          <UserForm />
        </Modal>
      </FormProvider>
    </>
  );
};
