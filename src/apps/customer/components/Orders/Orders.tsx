import { AppBar, Box, Card, IconButton, Toolbar, Typography } from "@mui/material";
import { useGetMyOrdersQuery } from "../../../../core/store/slices/ordersApiSlice";
import Message from "../../../../shared/components/Message/Message";
import Loader from "../../../../shared/components/Loader/Loader";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Link, useNavigate } from "react-router-dom";
import { NavigateNextSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import {BACKEND_URL} from "../../../../shared/constants/constants";
import orderDelivered from "/images/icons/green_tick.svg";
import orderArriving from '/images/icons/order_arriving.png';

const socket = io(BACKEND_URL);
interface Order {
  _id: string;
  orderItems: any[];
  deliveryStatus: string;
  createdAt: string;
  totalPrice: number;
}
const Orders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery({});
  const navigate = useNavigate();
  const [updatedOrders, setUpdatedOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (orders) {
      setUpdatedOrders(orders);
    }
    socket.on("orderUpdated", (updatedOrder: Order) => {
      setUpdatedOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => {
      socket.off("orderUpdated");
    };
  }, [orders]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh", 
        backgroundColor: "#F0F4F9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
          boxShadow: "0 0 8px rgba(40, 44, 63, 0.2);",
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            onClick={() => {
              navigate("/account");
            }}
          >
            <NavigateBeforeIcon sx={{ color: "black" }} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              color: "black",
              fontFamily: "Montserrat",
              fontSize: "1rem",
            }}
          >
            Orders
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, overflowY: "auto" }}>
         
          <Box>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">
                {error instanceof Error ? error.message : 'UnAuthorized. Please login and try again'}
              </Message>
            ) : (
              <Box>
                {updatedOrders && updatedOrders.length>0?(
                  <Box>
                  {updatedOrders.map((order) => (
                    <Box sx={{ margin: "1rem" }} key={order._id}>
                      <Card
                        sx={{
                          borderRadius: "1rem",
                          boxShadow: "0",
                          padding: "1rem",
                        }}
                      >
                        <Link
                          to={`/order/${order._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Box sx={{ position: "relative" }}>
                            <Box
                              sx={{
                                display: "flex",
                                width: "100%",
                                overflow: "scroll",
                                scrollbarWidth: "none",
                              }}
                            >
                              {order.orderItems.map((item) => (
                                <img
                                  src={item.image}
                                  key={item._id}
                                  alt={item.name}
                                  style={{
                                    objectFit: "contain",
                                    color: "transparent",
                                    width: "calc(17.3846% - 11.0769px)",
                                    border: "1px solid #e5e7eb",
                                    flexShrink: 0,
                                    borderRadius: "0.5rem",
                                    position: "relative",
                                    aspectRatio: 1 / 1,
                                    maxWidth: "100%",
                                    height: "auto",
                                    marginRight: "0.85rem",
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              marginTop: "1.5rem",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                marginRight: "0.375rem",
                                fontSize: "0.975rem",
                                lineHeight: "1.125rem",
                                fontWeight: "600",
                              }}
                            >
                              {order.deliveryStatus}
                            </Typography>
                            <img src={order.deliveryStatus ==="Arriving"? orderArriving : order.deliveryStatus === "Delivered" ? orderDelivered :''} alt={order.deliveryStatus} />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                color: "rgba(167,167,167, 1)",
                                fontSize: "0.875rem",
                                lineHeight: "1.325rem",
                                fontWeight: "450",
                                marginTop: "0.25rem",
                              }}
                            >
                              {order.createdAt.substring(0, 10)}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  marginRight: "0.375rem",
                                  fontSize: "1rem",
                                  fontWeight: "600",
                                }}
                              >
                                ₹{order.totalPrice}
                              </Typography>
                              <NavigateNextSharp
                                sx={{ fontSize: "1.325rem", fontWeight: "600" }}
                              />
                            </Box>
                          </Box>
                        </Link>
                      </Card>
                    </Box>
                  ))}
                  </Box>
                ):(
                  <Box><Typography variant="h6" sx={{textAlign:'center'}}>No orders</Typography></Box>
                )}
              </Box>
            )}
          </Box>
      </Box>
    </Box>
  );
};

export default Orders;
