import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { DeleteDialog } from "@/frontend/components/ui/DeleteDialog";
import { UserAddress } from "@prisma/client";
import { useDeleteAddress } from "@/frontend/addresses/hooks/useDeleteAddress";
import { EditAddressModal } from "@/frontend/addresses/components/modals/EditAddressModal";

interface AddressActionsProps {
  address: UserAddress;
  user_id: number;
}

export const AddressActions = ({ address, user_id }: AddressActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { mutate, isPending } = useDeleteAddress();

  const handleDelete = () => {
    mutate(
      {
        user_id: user_id,
        address_type: address.address_type,
        valid_from: address.valid_from,
      },
      {
        onSuccess: () => {
          setDeleteOpen(false);
        },
      },
    );
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

      <EditAddressModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        address={address}
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Address"
        content={`Are you sure you want to delete this ${address.address_type} address?`}
        isLoading={isPending}
      />
    </>
  );
};
