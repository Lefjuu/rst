"use client";
import { useState } from "react";
import { Modal } from "@/frontend/components/ui/Modal";
import { UserForm } from "@/frontend/users/components/modals/UserForm";
import { UserSchema } from "@/frontend/users/types";

export const CreateUserModal = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: UserSchema) => {
    console.log("Mock: Would create user with data:", data);
    alert("Mock: User would be created");
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create User
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create New User (Mock)"
      >
        <UserForm onSubmit={handleSubmit} submitText="Create (Mock)" />
      </Modal>
    </>
  );
};
