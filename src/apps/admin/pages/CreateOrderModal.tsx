import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

interface CreateOrderModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateOrderModal = ({ open, onClose }: CreateOrderModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          maxWidth: "900px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Create New Order
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {/* Left Side */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Order Details
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Select
                fullWidth
                size="small"
                value=""
                displayEmpty
                sx={{
                  bgcolor: "#F9FAFB",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E5E7EB",
                  },
                }}
              >
                <MenuItem disabled value="">
                  Select Customer
                </MenuItem>
              </Select>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Select
                fullWidth
                size="small"
                value=""
                displayEmpty
                sx={{
                  bgcolor: "#F9FAFB",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E5E7EB",
                  },
                }}
              >
                <MenuItem disabled value="">
                  Payment Type
                </MenuItem>
              </Select>

              <Select
                fullWidth
                size="small"
                value=""
                displayEmpty
                sx={{
                  bgcolor: "#F9FAFB",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E5E7EB",
                  },
                }}
              >
                <MenuItem disabled value="">
                  Order Type
                </MenuItem>
              </Select>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Order Time & Date
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                value="12/12/2020"
                sx={{
                  bgcolor: "#F9FAFB",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E5E7EB",
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                value="12:00 PM"
                sx={{
                  bgcolor: "#F9FAFB",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E5E7EB",
                  },
                }}
              />
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Order Status
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Select
                fullWidth
                size="small"
                value="pending"
                sx={{
                  bgcolor: "#F9FAFB",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E5E7EB",
                  },
                }}
              >
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Order Note
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Write order note..."
              sx={{
                bgcolor: "#F9FAFB",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E7EB",
                },
              }}
            />
          </Grid>

          {/* Right Side */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Items
            </Typography>

            <TextField
              fullWidth
              size="small"
              placeholder="Search product name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                bgcolor: "#F9FAFB",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E7EB",
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
                bgcolor: "#F9FAFB",
                borderRadius: "8px",
                border: "1px dashed #E5E7EB",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  mb: 2,
                  bgcolor: "#F3F4F6",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                🛍️
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Add Products to Your Order
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Search and add products to this order.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 3,
            borderTop: "1px solid #E5E7EB",
            pt: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: "#E5E7EB",
              color: "text.primary",
              "&:hover": {
                borderColor: "#D1D5DB",
                bgcolor: "#F9FAFB",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#591849",
              "&:hover": {
                bgcolor: "#4A1038",
              },
            }}
          >
            Create Order
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrderModal;
