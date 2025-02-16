import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  Chip,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useGetOrdersQuery } from "../../../../core/store/slices/ordersApiSlice";

interface Order {
  _id: string;
  orderItems: Array<{
    name: string;
    qty: number;
    image: string;
  }>;
  createdAt: string;
  isDelivered: boolean;
  isPaid: boolean;
}

const RecentOrders = () => {
  const [filter, setFilter] = useState<string>("All");
  const { data: orders, isLoading, error } = useGetOrdersQuery({});

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
  };

  // Filter orders based on status
  const filteredOrders = orders?.filter((order: Order) => {
    if (filter === "All") return true;
    if (filter === "Pending") return !order.isDelivered;
    if (filter === "Completed") return order.isDelivered;
    return true;
  });

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading orders
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        width: "100%",
        maxWidth: { xs: "100%", lg: "384px", md: "" },
        height: "100%", // Take full height
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ color: "#353535" }}>
          Recent Orders
        </Typography>
        <Select
          value={filter}
          onChange={handleFilterChange}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </Box>

      {/* Orders List */}
      <List
        sx={{
          maxHeight: 600,
          overflow: "auto",
          p: 0,
          marginLeft: { sm: 40, md: 0 },
        }}
      >
        {filteredOrders?.map((order: Order) => (
          <ListItem
            key={order._id}
            sx={{
              display: "flex",
              // justifyContent: 'space-between',
              p: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              "&:last-child": {
                borderBottom: "none",
              },
            }}
          >
            {/* Left side - Product info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={order.orderItems[0]?.image}
                alt={order.orderItems[0]?.name}
                variant="rounded"
                sx={{ width: 48, height: 48 }}
              />
              <Box>
                <Typography variant="subtitle2">
                  {order.orderItems[0]?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {order.orderItems[0]?.qty}kg
                </Typography>
              </Box>
            </Box>

            {/* Right side - Date and Status */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                gap: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
              <Chip
                label={order.isDelivered ? "Completed" : "Pending"}
                size="small"
                sx={{
                  bgcolor: order.isDelivered
                    ? "rgba(75, 181, 67, 0.1)"
                    : "rgba(243, 145, 15, 0.1)",
                  color: order.isDelivered ? "#4BB543" : "#F3910F",
                  fontWeight: 500,
                  minWidth: 80,
                }}
              />
            </Box>
          </ListItem>
        ))}

        {/* Empty state */}
        {(!filteredOrders || filteredOrders.length === 0) && (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography color="text.secondary">No orders found</Typography>
          </Box>
        )}
      </List>
      
    </Box>
  );
};

export default RecentOrders;
