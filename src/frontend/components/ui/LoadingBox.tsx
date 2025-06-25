import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export const LoadingBox = ({ children }: { children?: React.ReactNode }) => (
  <Box
    sx={{
      bgcolor: "background.paper",
      borderRadius: 2,
      boxShadow: 2,
      p: 4,
      minHeight: 240,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
  >
    {children ? (
      children
    ) : (
      <>
        <CircularProgress size={48} sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          Loading...
        </Typography>
      </>
    )}
  </Box>
);
