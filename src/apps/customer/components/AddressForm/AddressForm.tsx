import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { societies } from "../../../../shared/utils/societies"; 
import location from "/images/icons/location-marker.svg";
import CloseIcon from '@mui/icons-material/Close';
interface AddressFormData {
  society: string;
  wing: string;
  flatNumber: string;
}
 
interface AddressFormProps{
  open: boolean;
  closeModal: () => void;
  onSubmit: (address: AddressFormData) => void 
  editAddress?: AddressFormData | null;
}
const AddressForm = ({
  open,
  onSubmit,
  closeModal,
  editAddress
}: AddressFormProps) => {
  const [formData, setFormData] = useState<AddressFormData>({
    society: editAddress?.society || '',
    wing: editAddress?.wing || '',
    flatNumber: editAddress?.flatNumber || ''
  });

  useEffect(() => {
    if (editAddress) {
      setFormData({
        society: editAddress.society,
        wing: editAddress.wing,
        flatNumber: editAddress.flatNumber
      });
    }
  }, [editAddress]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.society || !formData.wing || !formData.flatNumber) {
      console.error("Please fill all address fields");
      return;
    }
    onSubmit(formData); 
  };
  return (
    <>
      {open && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingX: 0,
            background: "rgba(0, 0, 0, .3)",
            flexDirection: "column",
            width: "110vw",
            position: "fixed",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 1300,
          }}
        >
          <Box
            sx={{
              top: "5rem",
              background: "#fff",
              position: "fixed",
              marginLeft: "0.625rem",
              display: "flex",
              width: "95%",
              maxWidth: "28rem",
              borderRadius: "0.5rem",
              padding: "1.5rem 1rem",
            }}
          >
            <Box
              sx={{
                marginRight: "0.625rem",
                marginTop: "0rem",
                width: "100%",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Box component={"img"} src={location} />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{
                      letterSpacing: "0.5px",
                      fontWeight: 400,
                      fontSize: "0.875rem",
                      lineHeight: "1.125rem",
                      display: "block",
                      margin: 0,
                      color: "#000",
                    }}
                  >
                    {editAddress ? "Edit your address" : "Add your address"}
                  </Typography>
                </Box>
                <IconButton onClick={closeModal}>
                  <CloseIcon sx={{ fontSize: "1.175rem", color: "rgb(239,67,114)", marginLeft: "2rem" }} />
                </IconButton>
              </Box>

              <Box sx={{ marginTop: "2rem" }}>
                <FormControl fullWidth>
                  <InputLabel>Choose Your society</InputLabel>
                  <Select
                    name="society"
                    value={formData.society}
                    onChange={handleChange}
                    label="Choose Your society"
                  >
                    {societies.map((society, index) => (
                      <MenuItem value={society.societyName} key={index}>
                        {society.societyName}
                      </MenuItem>
                    ))}
                  </Select>

                  <Box sx={{ marginY: "1.5rem" }}>
                    <TextField
                      label="Wing/Phase"
                      name="wing"
                      value={formData.wing}
                      onChange={handleTextChange}
                      fullWidth
                    />
                  </Box>

                  <Box sx={{ marginY: "1.5rem" }}>
                    <TextField
                      label="Flat Number"
                      name="flatNumber"
                      value={formData.flatNumber}
                      onChange={handleTextChange}
                      fullWidth
                    />
                  </Box>

                  <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                      backgroundColor: "rgb(239,67,114)",
                      boxShadow: 0,
                      '&:hover': {
                        backgroundColor: "rgb(239,67,114)",
                      }
                    }}
                    fullWidth
                  >
                    {editAddress ? "Update" : "Save"}
                  </Button>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AddressForm;
