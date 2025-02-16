import { FaTrash } from "react-icons/fa";
import { useGetProductsQuery } from "../../../core/store/slices/productsApiSlice";
import Sidebar from "../components/Sidebar/Sidebar";
import {
  Search,
  Tune,
  Create,
  RemoveRedEye,
  ArrowDropDown,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  ButtonGroup,
  Tabs,
  Tab,
  Checkbox,
  Typography,
  CircularProgress,
  useTheme,
  Pagination,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  countInStock: number;
  image: string;
  deliveryStatus: string;
  // status: "Low Stock" | "Draft" | "Published";
  dateAdded: string;
  sku: string;
}

const ProductListScreen = () => {
  const { data: products, isLoading } = useGetProductsQuery({});
  //const [createProduct, { isLoading: createLoading }] = useCreateProductMutation();
  const [tabValue, setTabValue] = useState<number>(0);
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query.toLowerCase());
  };

  const filteredProducts = products?.filter((product: any) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchQuery) ||
      "" ||
      product.sku?.toLowerCase().includes(searchQuery) ||
      "" ||
      product.category?.toLowerCase().includes(searchQuery) ||
      "";

    let matchesTab = true;
    switch (tabValue) {
      case 1:
        matchesTab = product.status === "Published";
        break;
      case 2:
        matchesTab = product.status === "Low Stock";
        break;
      case 3:
        matchesTab = product.status === "Draft";
        break;
    }

    return matchesSearch && matchesTab;
  });

  // const createProductHandler = async () => {
  //   if (window.confirm("Are you sure, you want to create a new product?")) {
  //     try {
  //       await createProduct({});
  //       refetch();
  //     } catch (err: any) {
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   }
  // };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" }, // Stack on mobile/tablet, row on desktop
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", lg: "240px" },
          position: { xs: "static", lg: "fixed" },
          height: { xs: "auto", lg: "100vh" },
          zIndex: 1000,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          width: { xs: "100%", lg: "calc(100% - 240px)" },
          marginLeft: { xs: 0, lg: 35 },
          marginTop: { xs: 6, lg: 5 },
          p: { xs: 1, sm: 2, md: 3 },
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "center" },
            gap: { xs: 2, md: 3 },
            p: { xs: 1, sm: 2 },
          }}
        >
          {/* Search Bar */}
          <TextField
            placeholder="Search order..."
            size="small"
            value={searchQuery}
            onChange={handleSearch}
            fullWidth
            sx={{
              backgroundColor: "white",
              width: { xs: "100%", md: "100%" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 5, sm: 2 },
              flexDirection: { xs: "row", sm: "row" },
              width: { xs: "40%", md: "40%" },
            }}
          >
            <Button
              fullWidth
              variant="contained"
              startIcon={<FileDownloadOutlinedIcon />}
              sx={{
                backgroundColor: "rgba(58, 91, 255, 0.15)",
                color: "#4A4A8A",
                textTransform: "none",
                borderRadius: "8px",
                height: "40px",
                minWidth: { xs: "100%", sm: "120px" },
              }}
            >
              Export
            </Button>

            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/add-product")}
              //onClick={createProductHandler}
              sx={{
                backgroundColor: "#591849",
                "&:hover": {
                  backgroundColor: "#4A1038",
                },
                textTransform: "none",
                borderRadius: "8px",
                height: "40px",
                //width: { xs: '100%', sm: '300', lg: '150px' },
                minWidth: { xs: "100%", sm: "50%", lg: "150px" },
              }}
            >
              Add Product
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            mb: { xs: 2, md: 1 },
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "stretch", lg: "center" },
            justifyContent: "space-between",
            p: { xs: 1, sm: 2 },
          }}
        >
          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                minWidth: "auto",
                px: { xs: 1, sm: 2, md: 3 }, // Adjust padding for different screen sizes
                fontSize: { xs: "15px", sm: "18px", md: "20px" }, // Adjust font size for better readability
                color: "text.secondary",
                "&.Mui-selected": {
                  color: "#6366F1",
                },
              },
              "& .MuiTabs-indicator": {
                bgcolor: "#6366F1",
              },
              border: '0.7px solid #E0E2E7',
              borderRadius: 3,
            }}         
          >
            <Tab label="All Product" />
            <Tab label="Published" />
            <Tab label="Low Stock" />
            <Tab label="Draft" />
          </Tabs>

          {/* Search and Filter Controls */}
          <Box
            sx={{
              display: "flex",
              marginTop: { xs: 1 },
              gap: { xs: 1, sm: 2 },
              flexDirection: { xs: "column", sm: "row" },
              width: { xs: "100%", lg: "auto" },
            }}
          >
            <TextField
              placeholder="Search product..."
              size="small"
              value={searchQuery}
              onChange={handleSearch}
              fullWidth
              sx={{
                backgroundColor: "white",
                width: { xs: "100%", sm: "250px" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    width: "140px",
                    "& .MuiInputBase-root": {
                      height: "40px", // Set the height of the input field
                      fontSize: "14px",
                    },
                  }}
                  openTo="month"
                  views={["year", "month", "day"]}
                />
              </LocalizationProvider>

              <Button
                startIcon={<Tune />}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  height: "40px", // Reduced height
                  fontSize: "14px",
                  padding: "8px 16px",
                }}
              >
                Filters
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Table Section */}
        <Box
          sx={{
            overflowX: "auto",
            p: { xs: 1, sm: 2 },
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
            position: "relative",
            minHeight: "200px", // Ensures the spinner has space
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Table
              sx={{
                minWidth: { xs: 650, md: 800 },
                "& .MuiTableCell-root": {
                  px: { xs: 1, sm: 2 },
                  py: { xs: 1, sm: 1.5 },
                  whiteSpace: "nowrap",
                },
              }}
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: "#F8F9FA" }}>
                  <TableCell padding="checkbox">
                    <Checkbox size="small" />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      Product <ArrowDropDown />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    SKU
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    Category
                  </TableCell>
                  <TableCell>
                    Stock <ArrowDropDown />
                  </TableCell>
                  <TableCell>
                    Price <ArrowDropDown />
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    Added <ArrowDropDown />
                  </TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts?.map((product: Product) => (
                  <TableRow key={product._id}>
                    <TableCell padding="checkbox">
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: 1, sm: 2 },
                        }}
                      >
                        <Box
                          component="img"
                          src={product.image}
                          sx={{
                            width: { xs: 32, sm: 40 },
                            height: { xs: 32, sm: 40 },
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            [theme.breakpoints.down("sm")]: {
                              width: "50px", // Adjust the width for mobile devices
                            },
                          }}
                        >
                          {product.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {product.sku}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {product.category}
                    </TableCell>
                    <TableCell>{product.countInStock}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.deliveryStatus}</TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {product.dateAdded}
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        size="small"
                        sx={{
                          "& .MuiButtonGroup-grouped": {
                            minWidth: { xs: 32, sm: 40 },
                          },
                        }}
                      >
                        <IconButton
                          component={Link}
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <Create
                            sx={{
                              fontSize: { xs: 18, sm: 20 },
                              color: "#A3A9B6",
                            }}
                          />
                        </IconButton>
                        <IconButton
                          component={Link}
                          to={`/admin/product/${product._id}`}
                        >
                          <RemoveRedEye
                            sx={{
                              fontSize: { xs: 18, sm: 20 },
                              color: "#A3A9B6",
                            }}
                          />
                        </IconButton>
                        <IconButton
                          component={Link}
                          to={`/admin/product/${product._id}`}
                        >
                          <FaTrash style={{ fontSize: 16, color: "#A3A9B6" }} />
                        </IconButton>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mt: 3,
          }}
        >
          <Pagination
            count={10}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            shape="rounded"
            style={{ color: "#591849" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductListScreen;
