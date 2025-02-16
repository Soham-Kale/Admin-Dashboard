import { Box, Card, Typography, Checkbox, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface CustomerCardProps {
  id: string;
  name: string;
  status: "Active" | "Blocked";
  orders: string;
  balance: string;
  selected?: boolean;
  onSelect?: () => void;
}

const CustomerCard = ({
  id,
  name,
  status,
  orders,
  balance,
  selected = false,
  onSelect,
}: CustomerCardProps) => {
  const navigate = useNavigate();
  const handleCustomerClick = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  return (
    <Card
      onClick={() => handleCustomerClick(id)}
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: selected ? "#6366F1" : "#E5E7EB",
        borderRadius: "12px",
        boxShadow: "none",
        height: "85%",
        marginTop: 5,
        "&:hover": {
          borderColor: "#6366F1",
        },
      }}
    >

      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Centers all items horizontally
          alignItems: "center", // Centers all items vertically
          flexDirection: "row",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Checkbox
            checked={selected}
            onChange={onSelect}
            sx={{
              color: "#D1D5DB",
              "&.Mui-checked": {
                color: "#6366F1",
              },
            }}
          />
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "#E0E2E7",
            }}
          />
        </Box>

        <IconButton size="small" sx={{ ml: 2 }}>
          {" "}
          {/* Added spacing if needed */}
          <MoreVertIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
        </IconButton>
      </Box>

      <Box sx={{ ml: 6, margin: "auto" }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            color: "#111827",
            mb: 0.5,
            textAlign: "center",
          }}
        >
          {name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: status === "Active" ? "#6366F1" : "#DC2626",
            bgcolor: status === "Active" ? "#EEF2FF" : "#FEE2E2",
            width: "fit-content",
            px: 1.5,
            py: 0.5,
            borderRadius: "16px",
            fontSize: "0.75rem",
            margin: "auto",
          }}
        >
          {status}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 4, textAlign: "center" }}>
          <Grid size={{ xs: 6 }}>
            <Typography
              variant="caption"
              sx={{
                color: "#667085",
                display: "block",
                fontSize: "12px",
                fontWeight: 400,
              }}
            >
              Orders
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#353535",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              {orders}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography
              variant="caption"
              sx={{
                color: "#667085",
                display: "block",
                fontSize: "12px",
                fontWeight: 400,
              }}
            >
              Balance
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#353535",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              ${balance}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CustomerGrid = () => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const customers = [
    {
      id: "1",
      name: "John Bushnell",
      status: "Active" as const,
      orders: 12.09,
      balance: 1209.5,
    },
    {
      id: "2",
      name: "Laura Pritchet",
      status: "Blocked" as const,
      orders: 15.2,
      balance: 2450.0,
    },
    {
      id: "3",
      name: "Mohammad Karim",
      status: "Active" as const,
      orders: 8.0,
      balance: 1050.75,
    },
    {
      id: "4",
      name: "Emily Stone",
      status: "Blocked" as const,
      orders: 20.15,
      balance: 3000.0,
    },
    {
      id: "5",
      name: "Kevin Singh",
      status: "Active" as const,
      orders: 5.5,
      balance: 500.0,
    },
    {
      id: "6",
      name: "Ava Smith",
      status: "Active" as const,
      orders: 18.75,
      balance: 2100.25,
    },
    {
      id: "7",
      name: "Ethan Johnson",
      status: "Blocked" as const,
      orders: 10.2,
      balance: 1800.0,
    },
    {
      id: "8",
      name: "Sofia Patel",
      status: "Active" as const,
      orders: 22.0,
      balance: 3500.0,
    },
    {
      id: "9",
      name: "Liam Brown",
      status: "Blocked" as const,
      orders: 7.8,
      balance: 900.0,
    },
    {
      id: "10",
      name: "Isabella Garcia",
      status: "Active" as const,
      orders: 12.5,
      balance: 1400.6,
    },
    {
      id: "11",
      name: "Noah Wilson",
      status: "Blocked" as const,
      orders: 4.9,
      balance: 600.0,
    },
    {
      id: "12",
      name: "Mia Taylor",
      status: "Active" as const,
      orders: 16.25,
      balance: 2700.5,
    },
    {
      id: "13",
      name: "James Davis",
      status: "Blocked" as const,
      orders: 19.8,
      balance: 3200.0,
    },
    {
      id: "14",
      name: "Olivia Martinez",
      status: "Active" as const,
      orders: 25.5,
      balance: 4000.75,
    },
    {
      id: "15",
      name: "Alexander Lee",
      status: "Blocked" as const,
      orders: 6.3,
      balance: 800.0,
    },
  ];

  return (
    <Box sx={{ p: 3, mt: { xs: -65, md: -80 }, ml: { xs: 0, sm: 2, md: 35 } }}>
      <Grid container spacing={2}>
        {customers.map((customer) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}
            key={customer.id}
          >
            <CustomerCard
              {...customer}
              orders={customer.orders.toString()} // Convert to string
              balance={customer.balance.toString()} // Convert to string
              selected={selectedCards.includes(customer.id)}
              onSelect={() => {
                setSelectedCards((prev) =>
                  prev.includes(customer.id)
                    ? prev.filter((id) => id !== customer.id)
                    : [...prev, customer.id]
                );
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomerGrid;
