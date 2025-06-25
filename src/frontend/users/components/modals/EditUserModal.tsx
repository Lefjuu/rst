"use client";
import { Modal } from "@/frontend/components/ui/Modal";
import { UserForm } from "@/frontend/users/components/modals/UserForm";
import { UserSchema } from "@/frontend/users/types";
import { User } from "@prisma/client";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

export const EditUserModal = ({ open, onClose, user }: EditUserModalProps) => {
  const handleSubmit = (data: UserSchema) => {
    console.log("Mock: Would update user with data:", data);
    alert(`Mock: User ${user.first_name} ${user.last_name} would be updated`);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Edit ${user.first_name} ${user.last_name} (Mock)`}
    >
      <UserForm
        defaultValues={user}
        onSubmit={handleSubmit}
        submitText="Update (Mock)"
      />
    </Modal>
  );
};
