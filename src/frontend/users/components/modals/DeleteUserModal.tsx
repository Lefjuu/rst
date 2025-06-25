import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const DeleteUserModal = ({
  open,
  onClose,
  onConfirm,
  isLoading,
}: DeleteUserModalProps) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        width: 400,
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ color: "text.primary" }}
      >
        Delete User
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: "text.secondary" }}>
        Are you sure you want to delete this user? This action cannot be undone.
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        marginTop={4}
      >
        <Button variant="outlined" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={20} />}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </Stack>
    </Box>
  </Modal>
);
