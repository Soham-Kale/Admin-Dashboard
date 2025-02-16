import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

const OfflineMessage: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "#fff",
        color: "#000",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          textAlign: "center",
          padding: 3,
          borderRadius: 2,
          maxWidth: 400,
          width: "90%",
        }}
      >
        <Typography variant="h5" gutterBottom>
          You're Offline
        </Typography>
        <Typography variant="body1" paragraph>
          You are not connected to the internet. Please connect to the internet
          and try again.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff69b4",
            color: "#fff",
            width: "100%",
            "&:hover": {
              backgroundColor: "#ff4785",
            },
          }}
          onClick={() => window.location.reload()}
        >
          Reload
        </Button>
      </Paper>
    </Box>
  );
};

export default OfflineMessage;