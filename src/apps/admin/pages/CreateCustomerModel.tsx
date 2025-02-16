import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Switch,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CreateCustomerModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateCustomerModal = ({ open, onClose }: CreateCustomerModalProps) => {
  const [addAddress, setAddAddress] = useState(false);
  const [sameAsCustomerAddress, setSameAsCustomerAddress] = useState(false);
  const [phoneCode, setPhoneCode] = useState("+234");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          p: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 0,
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Add a New Customer
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "#6B7280" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Typography variant="subtitle2" sx={{ color: "#6B7280", mb: 2 }}>
          Customer Information
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            placeholder="Customer Name"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#F9FAFB",
                borderRadius: "8px",
              },
            }}
          />

          <TextField
            fullWidth
            placeholder="Customer Email"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#F9FAFB",
                borderRadius: "8px",
              },
            }}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <Select
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
              size="small"
              sx={{
                width: "100px",
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#F9FAFB",
                  borderRadius: "8px",
                },
              }}
            >
              <MenuItem value="+234">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <img
                    src="/path-to-nigeria-flag.png"
                    alt="NG"
                    style={{ width: 20, height: 15 }}
                  />
                  +234
                </Box>
              </MenuItem>
              {/* Add more country codes as needed */}
            </Select>

            <TextField
              fullWidth
              placeholder="8023456789"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#F9FAFB",
                  borderRadius: "8px",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Add Address
            </Typography>
            <Switch
              checked={addAddress}
              onChange={(e) => setAddAddress(e.target.checked)}
              size="small"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#4F46E5",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#4F46E5",
                },
              }}
            />
          </Box>

          {addAddress && (
            <>
              <TextField
                fullWidth
                placeholder="Building No, Street Address"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#F9FAFB",
                    borderRadius: "8px",
                  },
                }}
              />

              <TextField
                fullWidth
                placeholder="City"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#F9FAFB",
                    borderRadius: "8px",
                  },
                }}
              />

              <Box sx={{ display: "flex", gap: 2 }}>
                <Select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  fullWidth
                  size="small"
                  displayEmpty
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#F9FAFB",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <MenuItem disabled value="">
                    Country
                  </MenuItem>
                  {/* Add country options */}
                </Select>

                <Select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  fullWidth
                  size="small"
                  displayEmpty
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#F9FAFB",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <MenuItem disabled value="">
                    State
                  </MenuItem>
                  {/* Add state options */}
                </Select>
              </Box>

              <Typography variant="subtitle2" sx={{ color: "#6B7280", mt: 2 }}>
                Billing Address
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Same as Customer Address
                </Typography>
                <Switch
                  checked={sameAsCustomerAddress}
                  onChange={(e) => setSameAsCustomerAddress(e.target.checked)}
                  size="small"
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#4F46E5",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#4F46E5",
                    },
                  }}
                />
              </Box>
            </>
          )}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 3,
              justifyContent: "flex-start",
            }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: "#6B7280",
                borderColor: "#E5E7EB",
                "&:hover": {
                  borderColor: "#D1D5DB",
                  bgcolor: "#F9FAFB",
                },
                textTransform: "none",
                minWidth: "100px",
                borderRadius: "8px",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#4F46E5",
                "&:hover": {
                  bgcolor: "#4338CA",
                },
                textTransform: "none",
                minWidth: "100px",
                borderRadius: "8px",
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomerModal;
