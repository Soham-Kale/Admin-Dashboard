import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  IconButton,
  Checkbox,
  // useTheme,
  // useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Sidebar from "../../admin/components/Sidebar/Sidebar";
import { ArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

interface Variation {
  type: string;
  value: string;
}

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const AddProductPage = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [productStatus, setProductStatus] = useState<string>("Draft");
  const navigate = useNavigate();
  const [variations, setVariations] = useState<Variation[]>([
    { type: "", value: "" },
  ]);
  const [isPhysicalProduct, setIsPhysicalProduct] = useState<boolean>(true);

  const addVariation = () => {
    setVariations([...variations, { type: "", value: "" }]);
  };

  const removeVariation = (index: number) => {
    const newVariations = variations.filter((_, i) => i !== index);
    setVariations(newVariations);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        marginLeft: { xs: -20, lg: "55px" },
        marginTop: { xs: 1, sm: 10, lg: "64px" },
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", lg: "240px" },
          position: { xs: "static", lg: "fixed" },
          height: { xs: "auto", lg: "100vh" },
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          ml: { xs: 0, lg: "240px" },
          p: { xs: 2, sm: 3 },
        }}
      >
        {/* Header */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1" sx={{ color: "#591849", fontSize: "14px" }}>
                Product
              </Typography>
              <Typography variant="body1" sx={{ color: "#C2C6CE" }}>
                <ArrowRight />
              </Typography>
              <Typography variant="body1" sx={{ color: "#6E7079" }}>
                Add Product
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "space-between", sm: "flex-end" } }}>
              
              <Button
                onClick={() => navigate(-1)}
                startIcon={<CloseIcon />}
                sx={{
                  color: "#8B909A",
                  border: "1px solid #E6E8EC",
                  borderRadius: "8px",
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: "#591849",
                  "&:hover": { backgroundColor: "#4A1038" },
                  minWidth: { xs: "120px", sm: "150px" },
                }}
              >
                Add Product
              </Button>

            </Box>
          </Grid>
        </Grid>

        {/* Main Form */}
        <Grid container spacing={3}>
          {/* Left Section */}
          <Grid size={{ xs: 12, lg: 9 }}>
            <FormSection title="General Information">
              <Typography sx={{ color: "#777980", fontSize: 14 }}>Product Name</Typography>
              <TextField
                fullWidth
                placeholder="Type product name here"
                sx={{ mb: 2 }}
              />
              <Typography sx={{ color: "#777980", fontSize: 14 }}>Description</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Type product description here..."
              />
            </FormSection>

            <FormSection title="Media">
              <Typography>Photo</Typography>
              <Box
                sx={{
                  height: 200,
                  border: "2px dashed #E6E8EC",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "background.paper",
                }}
              >
                <Typography sx={{ 
                  color: "#858D9D",
                  fontSize: 14,
                  fontWeight: 400,
                }}>Drag and drop image here, or click add image</Typography>
                <Button variant="outlined" sx={{ mt: 1 }}>
                  Add Image
                </Button>
              </Box>
            </FormSection>

            <FormSection title="Pricing">
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 12 }}>
                  <Typography >Base Price</Typography>
                  <TextField
                    fullWidth
                    placeholder="$ Type base price here..."
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                <Typography >Discount Type</Typography>
                  <TextField
                    fullWidth
                    placeholder="Select a discount type"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography >Discount Precentage (%)</Typography>
                  <TextField
                    fullWidth
                    placeholder="Type discount precentage. . ."
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                <Typography>Tax Class</Typography>
                  <TextField
                    fullWidth
                    placeholder="Select a tax class"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography>VAT Amount (%)</Typography>
                  <TextField
                    fullWidth
                    placeholder="Type VAT amount..."
                  />
                </Grid>
              </Grid>
            </FormSection>

            <FormSection title="Inventory">
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="SKU"
                    placeholder="Type product SKU here..."
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Barcode"
                    placeholder="Product barcode"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    placeholder="Type product quantity here..."
                  />
                </Grid>
              </Grid>
            </FormSection>

            <FormSection title="Variations">
              {variations.map((variation, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                  <Grid size={{ xs: 6, sm: 4, md: 5 }}>
                    <TextField
                      fullWidth
                      select
                      label="Variation Type"
                      value={variation.type}
                      onChange={(e) => {
                        const newVariations = [...variations];
                        newVariations[index].type = e.target.value;
                        setVariations(newVariations);
                      }}
                    >
                      <MenuItem value="">Select variation type</MenuItem>
                      {/* Add your variation options here */}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 5, md: 5 }}>
                    <TextField
                      fullWidth
                      label="Variation Value"
                      value={variation.value}
                      onChange={(e) => {
                        const newVariations = [...variations];
                        newVariations[index].value = e.target.value;
                        setVariations(newVariations);
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 1 }} sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => removeVariation(index)}>
                      <CloseIcon fontSize="small" sx={{ color: "red" }}/>
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button onClick={addVariation} startIcon={<AddIcon />}>
                Add Variation
              </Button>
            </FormSection>

            <FormSection title="Shipping">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPhysicalProduct}
                    onChange={(e) => setIsPhysicalProduct(e.target.checked)}
                  />
                }
                label="This is a physical product"
              />
              {isPhysicalProduct && (
                <Grid container spacing={2}>
                  {["Weight", "Height (cm)", "Length (cm)", "Width (cm)"].map((label) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={label}>
                      <TextField
                        fullWidth
                        label={label}
                        placeholder={`Enter ${label}`}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </FormSection>
          </Grid>

          {/* Right Section */}
          <Grid size={{ xs: 12, lg: 3 }}>
            <FormSection title="Category">
              <Select fullWidth value="">
                <MenuItem value="">Select category</MenuItem>
                {/* Add category options */}
              </Select>
            </FormSection>

            <FormSection title="Product Tags">
              <Select fullWidth value="">
                <MenuItem value="">Select tags</MenuItem>
                {/* Add tag options */}
              </Select>
            </FormSection>

            <FormSection title="Status">
              <Select
                fullWidth
                value={productStatus}
                onChange={(e) => setProductStatus(e.target.value as string)}
              >
                <MenuItem value="Draft">Draft</MenuItem>
                <MenuItem value="Published">Published</MenuItem>
              </Select>
            </FormSection>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

export default AddProductPage;