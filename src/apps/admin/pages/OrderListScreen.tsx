import { useGetOrdersQuery } from "../../../core/store/slices/ordersApiSlice";
import { ArrowDropDown, Create, RemoveRedEye, Tune } from "@mui/icons-material";
import {
  Box,
  Button,
  Table,
  Tabs,
  Tab,
  CircularProgress,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  Typography,
  IconButton,
  ButtonGroup,
  InputAdornment,
  TextField,
  Pagination,
} from "@mui/material";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Sidebar from "../components/Sidebar/Sidebar";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import CreateOrderModal from "./CreateOrderModal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Order {
  _id: string;
  user: {
    name: string;
    phoneNumber: string;
  };

  orderItems: Array<{
    name: string;
    qty: number;
    image: string;
  }>;

  image: string;
  totalPrice?: number;
  createdAt: string;
  paymentMethod: string;
  deliveryStatus: string;
  isPaid: boolean;
  paidAt?: string;
  status: "Processing" | "Delivered" | "Cancelled";
}

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery({});
  const [tabValue, setTabValue] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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

  const filteredOrders = orders?.filter((order: Order) => {
    if (!order) return false;

    const matchesSearch =
      order._id?.toLowerCase().includes(searchQuery) ||
      order.user?.name?.toLowerCase().includes(searchQuery) ||
      order.totalPrice?.toString().includes(searchQuery);

    let matchesTab = true;
    switch (tabValue) {
      case 1:
        matchesTab = order.status === ("Delayed" as string);
        break;
      case 2:
        matchesTab = order.status === "Processing";
        break;
      case 3:
        matchesTab = order.status === "Delivered";
        break;
      case 4:
        matchesTab = order.status === "Cancelled";
        break;
      case 5:
        matchesTab = order.isPaid;
        break;
      case 6:
        matchesTab = !order.isPaid;
        break;
    }
    return matchesSearch && matchesTab;
  });

  return (
    <Box sx={{ display: "flex" }}>
      {/* Header Section */}
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
              onClick={() => setIsCreateModalOpen(true)} // Update this line
              sx={{
                backgroundColor: "#591849",
                "&:hover": {
                  backgroundColor: "#4A1038",
                },
                textTransform: "none",
                borderRadius: "8px",
                height: "40px",
                minWidth: { xs: "100%", sm: "50%", lg: "150px" },
              }}
            >
              Add Order
            </Button>

            <CreateOrderModal
              open={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
            />
          </Box>
        </Box>

        {/* Search and Filters */}
        <Box sx={{ mb: 3 }}>
          {/* Tabs */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" }
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  minWidth: "auto",
                  px: { xs: 1, sm: 2, md: 3 }, // Adjust padding for different screen sizes
                  fontSize: { xs: "9px", sm: "14px", md: "16px" }, // Adjust font size for better readability
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
              <Tab label="All Order" />
              <Tab label="Delayed" />
              <Tab label="Processing" />
              <Tab label="Delivered" />
              <Tab label="Cancelled" />
              <Tab label="Paid" />
              <Tab label="Unpaid" />
            </Tabs>

            <Box sx={{ display: "flex", gap: 2,
              marginTop: { xs: 1, sm: 1,  }
            }}>
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
            bgcolor: "white",
            borderRadius: "12px",
            boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
            overflow: "hidden",
          }}
        >
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" sx={{ p: 3 }}>
              Error loading orders
            </Typography>
          ) : (
            <Table
              sx={{
                minWidth: 1200,
                "& .MuiTableCell-root": {
                  borderBottom: "1px solid #E5E7EB",
                  py: 2,
                  px: 2,
                },
              }}
            >
              <TableHead>
                <TableRow sx={{ bgcolor: "#F9FAFB" }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      size="small"
                      sx={{
                        color: "#D1D5DB",
                        "&.Mui-checked": {
                          color: "#6366F1",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      Order ID <ArrowDropDown />
                    </Box>
                  </TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredOrders?.map((order: Order) => (
                  <TableRow
                    key={order._id}
                    sx={{
                      "&:hover": { bgcolor: "#F8FAFC" },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        size="small"
                        sx={{
                          color: "#591849",
                          "&.Mui-checked": {
                            color: "#591849",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {order._id.slice(0, 6)}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          component="img"
                          src={order.orderItems[0]?.image}
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                        <Box>
                          <Typography sx={{ fontWeight: 400 }}>
                            {order.orderItems[0]?.name}
                          </Typography>
                          {/* <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            {order.orderItems[0]?.name} 
                            </Typography> */}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>
                      ${order?.totalPrice?.toFixed(2) || "0.00"}
                    </TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-flex",
                          px: 2,
                          py: 0.5,
                          borderRadius: "16px",
                          fontSize: "12px",
                          fontWeight: 500,
                          bgcolor: {
                            Processing: "#FFF7E6",
                            Delivered: "#E6F4EA",
                            Cancelled: "#FEE4E2",
                          }[order.status],
                          color: {
                            Processing: "#D97706",
                            Delivered: "#34A853",
                            Cancelled: "#D92D20",
                          }[order.status],
                        }}
                      >
                        {order.deliveryStatus}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        size="small"
                        sx={{
                          "& .MuiButtonGroup-grouped": {
                            border: "none",
                            minWidth: "auto",
                            px: 1,
                          },
                        }}
                      >
                        <IconButton>
                          <Create sx={{ fontSize: 18, color: "#A3A9B6" }} />
                        </IconButton>
                        <IconButton>
                          <RemoveRedEye
                            sx={{ fontSize: 18, color: "#A3A9B6" }}
                          />
                        </IconButton>
                        <IconButton>
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

export default OrderListScreen;
