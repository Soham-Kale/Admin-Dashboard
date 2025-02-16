import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { blue } from "@mui/material/colors";
import circle from "/images/dashboard/icon.jpg";
import bag from "/images/dashboard/bag.png";
import cart from "/images/dashboard/cart.jpg";
import Sidebar from "../components/Sidebar/Sidebar";
import { ArrowRight, KeyboardArrowDown, Tune } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useGetOrdersQuery } from "../../../core/store/slices/ordersApiSlice";

interface Order {
  _id: number;
  user: {
    name: string;
    phoneNumber: string;
  };

  orderItems: Array<{
    name: string;
    qty: number;
    image: string;
  }>;

  name: string;
  image: string;
  totalPrice?: number;
  createdAt: string;
  deliveryStatus: string;
}

const CustomerDetails: React.FC = () => {
  const { data: orders } = useGetOrdersQuery({});

  const cardData = [
    { label: "Total Orders", value: "25,000.00", image: circle },
    { label: "Abandoned Cart", value: "2", image: cart },
    { label: "All Order Pending Completed", value: "2", image: bag },
    { label: "Canceled Returned Damaged", value: "2", image: bag },
  ];

  const customerInfo = [
    "Customer ID: ID-011221",
    "E-mail: lindablair@mail.com",
    "Address: 1833 Bell Meadow Drive, Fontana, California 92335, USA",
    "Phone Number: 050 414 8778",
    "Last Transaction: 12 December 2022",
    "Last Online: 1 Day Ago",
  ];

  const statusColor = (status: string): "warning" | "success" | "info" => {
    switch (status) {
      case "Processing":
        return "warning";
      case "Delivered":
        return "success";
      default:
        return "info";
    }
  };

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} p={2}>
      <Sidebar />
      <Box flex={1} p={{ xs: 1, md: 3 }} marginTop={4}>
        {/* Breadcrumb */}
        <Grid container spacing={2} alignItems="center" mb={4}>
          <Typography
            sx={{ color: "#883DCF", fontWeight: 500, fontSize: "14px" }}
          >
            Customer
          </Typography>
          <ArrowRight />
          <Typography
            sx={{ color: "#667085", fontWeight: 500, fontSize: "14px" }}
          >
            Customer Details
          </Typography>
        </Grid>

        <Grid container spacing={3}>
          {/* Left Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar sx={{ bgcolor: blue[500], width: 80, height: 80 }}>
                    LB
                  </Avatar>
                  <Typography variant="h6" mt={1}>
                    Linda Blair
                  </Typography>
                  <Typography
                    sx={{
                      backgroundColor: "#3A5BFF26",
                      color: "#3A5BFF",
                      textAlign: "center",
                      borderRadius: 2,
                      px: 2,
                      py: 0.5,
                      marginTop: 2,
                    }}
                  >
                    Active
                  </Typography>
                </Box>
                <Box mt={4} display="flex" flexDirection="column" gap={3}>
                  {customerInfo.map((text, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ fontSize: "14px", 
                        paddingLeft: { lg:10} }}
                    >
                      {text}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Section */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={2}>
              {cardData.map((item, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Card>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <img
                          src={item.image}
                          alt=""
                          style={{ width: "40px", height: "40px" }}
                        />
                        <Typography sx={{ fontSize: "12px", color: "#BEC0CA" }}>
                          All Time <KeyboardArrowDown />
                        </Typography>
                      </Box>
                      <Typography sx={{ color: "#8B8D97", fontWeight: 400, paddingTop: 2, paddingBottom: 2 }}>
                        {item.label}
                      </Typography>
                      <Typography sx={{ color: "#353535", fontSize: "20px" }}>
                        {item.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Transaction History */}
            <Box mt={4}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography
                  sx={{ fontSize: 20, fontWeight: 600, color: "#1D1F2C" }}
                >
                  Transaction History
                </Typography>
                <Box display="flex" gap={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={["year", "month", "day"]}
                      slots={{
                        textField: (params) => (
                          <TextField
                            {...params}
                            sx={{
                              width: "140px",
                              "& .MuiInputBase-root": {
                                height: 40,
                                fontSize: "0.875rem",
                                paddingTop: "5px",
                                borderRadius: "8px",
                              },
                            }}
                          />
                        ),
                      }}
                    />
                  </LocalizationProvider>
                  <Button
                    startIcon={<Tune />}
                    variant="outlined"
                    sx={{ textTransform: "none", borderRadius: "8px" }}
                  >
                    Filters
                  </Button>
                </Box>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders?.map((order: Order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order._id.toString().slice(0, 5)}</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
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
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{order.totalPrice}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color={statusColor(order.deliveryStatus)}
                              size="small"
                            >
                              {order.deliveryStatus}
                            </Button>
                          </TableCell>
                          <TableCell>{order.createdAt.slice(0, 10)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CustomerDetails;
