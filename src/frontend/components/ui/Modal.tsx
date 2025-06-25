import {
  Modal as MuiModal,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { FormEvent, ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  isLoading?: boolean;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  confirmText?: string;
}

export const Modal = ({
  open,
  onClose,
  title,
  children,
  isLoading = false,
  onSubmit,
  confirmText = "Save",
}: ModalProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <MuiModal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" component="h2" mb={2} color="text.primary">
          {title}
        </Typography>
        {children}
        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : confirmText}
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
};
