import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { User } from "@prisma/client";
import { EditUserModal } from "@/frontend/users/components/modals/EditUserModal";
import { DeleteUserModal } from "@/frontend/users/components/modals/DeleteUserModal";

const useDeleteUser = () => ({
  mutateAsync: async (user_id: number) => {
    console.log("Mock: Deleting user:", user_id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
  isPending: false,
});

interface UserActionsProps {
  user: User;
  onDeleted: () => void;
}

export const UserActions = ({ user, onDeleted }: UserActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
      setDeleteOpen(false);
      onDeleted();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setEditOpen(true);
            setAnchorEl(null);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteOpen(true);
            setAnchorEl(null);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <EditUserModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
      />
      <DeleteUserModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
};
