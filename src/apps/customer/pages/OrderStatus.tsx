import {  useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  IconButton,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SmsFailedOutlinedIcon from "@mui/icons-material/SmsFailedOutlined";
import packing from "/images/gifs/packing.gif"; 
import bagIcon from "/images/icons/bag.jpg";
import { NavigateNextSharp } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../../core/store/slices/ordersApiSlice"; 

interface RootState {
  cart: {
    cartItems: CartItem[];
    shippingAddress: any;
    paymentMethod: string;
  };
  auth: {
    user: {
      _id: string;
      name: string;
      isAdmin: boolean;
      isAuth: boolean;
    } | null; // User info can be null if not logged in
    userAddresses: AddressFormData[];
  };
}

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  countInStock: number;
  category?: string;
  quantity: number;
}
interface AddressFormData {
  society: string;
  wing: string;
  flatNumber: string;
}

const style = {
  position: "absolute",
  top: '73%',
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", lg: "40%" },
  bgcolor: "background.paper", 
  borderTopLeftRadius: "1.5rem",
  borderTopRightRadius: "1.5rem",
  paddingX: "0.1rem",
  paddingTop: "1.25rem",
  paddingBottom: "1.25rem",
};
const OrderStatus = () => { 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const { userAddresses } = useSelector((state: RootState) => state.auth);
  const { data: orders } = useGetMyOrdersQuery({});
  const latestOrder = orders?.reduce((latest: any, current: any) => {
    if (!latest) return current;
    return new Date(current.createdAt) > new Date(latest.createdAt)
      ? current
      : latest;
  }, null);

  const handleBack = () => {
    navigate("/");
  };

  const handleViewOrderDetails = () => {
    if (latestOrder?._id) {
      navigate(`/order/${latestOrder._id}`);
      handleClose();
    }
  }; 
  return (
    <>
     
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#F0F4F9",
          overflow: "hidden",
        }}
      >
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: "white",
            boxShadow: "0",
          }}
        >
          <Toolbar variant="dense">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
                px: 2,
              }}
            >
              <IconButton edge="start" onClick={handleBack}>
                <NavigateBeforeIcon sx={{ color: "black" }} />
              </IconButton>

              <Typography
                variant="h6"
                sx={{
                  color: "black",
                  fontFamily: "Montserrat",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  textAlign: "left",
                }}
              >
                Order Status
              </Typography>

              <IconButton
                edge="end"
                sx={{
                  ml: "auto",
                  order: { xs: 3, sm: 2 },
                  border: "1px solid #D9DADF",
                  borderRadius: "10rem",
                }}
                onClick={() => {
                  navigate("/support");
                }}
              >
                <SmsFailedOutlinedIcon
                  sx={{ fontSize: "1rem", color: "#000" }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "0.775rem",
                    paddingX: "0.3rem",
                    fontWeight: "450",
                  }}
                >
                  Help
                </Typography>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            width: "100%",
            padding: "1rem 0.75rem 0.75rem 0.75rem ",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              maxWidth: { xs: "100%", sm: "66%", md: "44%", lg: "30%" },
              margin: "auto",
              padding: { xs: "1rem", sm: "1.5rem" },
              backgroundColor: "white",
              borderRadius: "20px",
            }}
          >
            <Card
              elevation={0}
              sx={{
                marginBottom: "0rem",
                borderRadius: "0.625rem",
                color: "#FFFFFF",
                marginTop: "0.875rem",
                width: "100%",
                border: "1px solid #E5E8EF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem",
                flexWrap: "wrap",
              }}
            >
              {/* Left Section */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgb(38, 42, 51)",
                    fontSize: "0.875rem",
                    lineHeight: "1.225rem",
                    fontWeight: "400",
                    textAlign: "left",
                    width: { xs: "86%" },
                  }}
                >
                  Arriving in
                </Typography>
                <Typography
                  sx={{
                    color: "purple",
                    fontSize: { lg: "1.8rem", xs: "1.3rem" },
                    lineHeight: "1.75rem",
                    fontWeight: "700",
                    width: "95%",
                  }}
                >
                  30-35 mins
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgb(38, 42, 51)",
                    fontSize: "1rem",
                    marginTop: "1.125rem",
                    fontWeight: "600",
                    textAlign: "left",
                    width: { xs: "80%" },
                  }}
                >
                  Your order is getting packed
                </Typography>
              </Box>

              {/* Right Section (Image) */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  maxWidth: { xs: "80%", sm: "50%" },
                }}
              >
                <img
                  src={packing}
                  alt="Packing Gif"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </Box>
            </Card>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                marginTop: "1rem",
                alignItems: "center",
              }}
            >
              {/* Image Section */}
              <img
                src={bagIcon}
                style={{
                  width: "8%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "2rem",
                  color: "transparent",
                  maxWidth: "100%",
                }}
              />
              {/* Text Section */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "0.875rem",
                    marginX: "0.875rem",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "rgb(38, 42, 51)",
                      fontSize: "0.775rem",
                      lineHeight: "0.125rem",
                      fontWeight: "550",
                    }}
                  >
                    {latestOrder?.orderItems.reduce(
                      (acc: number, item: { qty: number }) => acc + item.qty,
                      0
                    )}{" "}
                    items
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#ABAEBB",
                      fontSize: "0.765rem",
                      lineHeight: "1.525rem",
                      fontWeight: "500",
                      marginTop: "0.15rem",
                      width: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {userAddresses
                      ? `Flat No: ${userAddresses[0].flatNumber}, ${userAddresses[0].wing} Wing, ${userAddresses[0].society}.`
                      : ""}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <IconButton onClick={handleOpen}>
                    <NavigateNextSharp />
                  </IconButton>
                </Box>
              </Box>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "50vh",
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      sx={{
                        borderBottom: "0.5px solid #e5e7eb",
                        color: "#000",
                        textAlign: "center",
                        fontWeight: "700",
                        paddingBottom: "0.8rem",
                      }}
                    >
                      {latestOrder?.orderItems.reduce(
                        (acc: number, item: { qty: number }) => acc + item.qty,
                        0
                      )}{" "}
                      items in Shipment
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        paddingY: "1rem",
                        borderBottom: "0.5px solid #e5e7eb",
                        gap: "0.75rem",
                        marginBottom: "0.5rem",
                        paddingX: "1rem",
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontSize: "0.875rem" }}>
                          Delivering to{" "}
                          <span
                            style={{
                              fontWeight: 700,
                              color: "#000",
                              fontFamily: "Inter",
                            }}
                          >
                            - home
                          </span>
                        </Typography>
                        <Typography
                          sx={{
                            marginTop: "0.5rem",
                            fontSize: "0.75rem",
                            lineHeight: "1rem",
                            fontWeight: "400",
                            fontFamily: "Inter",
                          }}
                        >
                          {userAddresses
                            ? `Flat No: ${userAddresses[0].flatNumber}, ${userAddresses[0].wing} Wing, ${userAddresses[0].society}.`
                            : ""}
                        </Typography>
                      </Box>
                    </Box>
 
                    <Box
                      sx={{
                        flexGrow: 1, 
                        overflowY: "auto", 
                        paddingY: "0.5rem",
                        paddingX: "1rem",
                      }}
                    >
                      {latestOrder?.orderItems.map((item: CartItem) => (
                        <Box sx={{ paddingY: "0.5rem" }} key={item._id}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "grid",
                                gridTemplateColumns: "40px 1fr",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                component={"img"}
                                src={item.image}
                                sx={{
                                  width: "2.5rem",
                                  height: "2.5rem",
                                  borderRadius: "0.5rem",
                                  objectFit: "contain",
                                  overflow: "hidden",
                                }}
                              />
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginLeft: "0.9rem",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "0.875rem",
                                    lineHeight: "1rem",
                                    fontWeight: "450",
                                    color: "#000",
                                  }}
                                >
                                  {item.name}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                   
                                  <Typography
                                    sx={{
                                      color: "rgb(117,117,117)",
                                      fontSize: "0.675rem",
                                      lineHeight: "0.97rem",
                                    }}
                                  >
                                    {item.qty} units
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "0.875rem",
                                  lineHeight: "0.97rem",
                                  marginLeft: "0.5rem",
                                  fontWeight: "700",
                                  color: "#000",
                                }}
                              >
                                ₹{item.price}{" "}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                <Box
                      sx={{
                        position: { xs: "fixed", lg: "fixed" },
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor: "white",
                        paddingX: "0.75rem",
                        paddingTop: "0.75rem",
                        paddingBottom: "1rem",
                        boxShadow: "0px -2px 5px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          textAlign: "center",
                          backgroundColor: "rgba(239,67,114,1)",
                          borderRadius: "0.75rem",
                          height: "3.25rem",
                          color: "white",
                        }}
                        onClick={handleViewOrderDetails}
                      >
                        View Order Details
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Modal> 
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OrderStatus;
