import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  clearCartItems, savePaymentMethod } from "../../../core/store/slices/cartSlice";
import {
  AppBar,
  Box,
  Button,
  Card,
  Collapse,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import location from "/images/icons/location.png";
import payIcon from "/images/icons/pay.svg";
import gpayIcon from "/images/icons/gpay.png";
import paytmIcon from "/images/icons/paytm.png";
import phonepeIcon from "/images/icons/phonepe.png";
import radioButton from "/images/icons/radio_button.png";
import tickIcon from "/images/icons/tick.png";
import { IoMdAdd } from "react-icons/io";
import { IoChevronForwardSharp } from "react-icons/io5";
import { useCreateOrderMutation } from "../../../core/store/slices/ordersApiSlice";
import Loader from "../../../shared/components/Loader/Loader";
import io from 'socket.io-client';
import {BASE_URL} from "../../../shared/constants/constants";
import OrderConfirmLoader from "../components/OrderConfirmLoader/OrderConfirmLoader";

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
      phoneNumber: string;
    } | null;
    userAddresses: AddressFormData[];
  };
}

interface AddressFormData {
  society: string;
  wing: string;
  flatNumber: string;
}

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  countInStock: number;
  category?: string;
}


const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectPaymentMethod, setSelectPaymentMethod] = useState(false);
  const [notifications,setNotifications]=useState<string[]>([]); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const socket = io(BASE_URL);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [showLoader,setShowLoader] = useState(false);
  const {userAddresses} = useSelector((state: RootState)=> state.auth);

  const totalPrice =cart.cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2)

  const handlePayment = async () => {
    try{
      setShowLoader(true);
      const res = await createOrder({
        orderItems: cart.cartItems,
        paymentMethod,
        totalPrice,
      }).unwrap();
      console.log('Your order', res);
      dispatch(savePaymentMethod(paymentMethod));
      setTimeout(() => {
        setShowLoader(false)
        navigate(`/orderstatus`);
      dispatch(clearCartItems());
      }, 3000);

    }catch(err){
      console.error("Placing order issue",err||error)
    }
  };

  const handleCodSelect = () => {
    setSelectPaymentMethod((prev) => !prev);
    setPaymentMethod("Cash On Delivery")
  };

  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "default" || Notification.permission === "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted");
          } else {
            console.log("Notification permission denied");
            console.log(notifications)
          }
        });
      }
    }
      socket.on("pushNotification", (data) => {
        console.log("Received:", data.notification);
        if(Notification.permission==='granted'){
          new Notification("Order has been placed",{
            body:data.notification,
            icon:"/favicon.ico"
          });
        }

      setNotifications((prev) => [...prev, data.notification]);
    });
    
    return () => {
      socket.off("pushNotification"); 
    };
  }, []);
  
  return (
    <>
   {showLoader && <OrderConfirmLoader />}
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
          borderBottomLeftRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
        elevation={1}
      >
        <Toolbar variant="dense">
          <IconButton edge="start" onClick={() => navigate("/")}>
            <NavigateBeforeIcon sx={{ color: "black" }} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              color: "#626471",
              fontSize: "1rem",
            }}
          >
            Payment Options
          </Typography>
        </Toolbar>
        <Box>
          <Box
            sx={{
              paddingX: "3rem",
              gap: "0.25rem",
              display: "flex",
              alignItems: "center",
              paddingBottom: "0.5rem",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#A1A3B2",
                fontSize: "0.875rem",
              }}
            >
              To Pay:
              <span style={{ color: "#5DBEA5", fontWeight: "500" }}>
                {" "}
                ₹{totalPrice}
                {" "}
              </span>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #F7F8FA",
              marginBottom: "0.5rem",
              padding: "0.4rem",
              paddingTop: "0.475rem",
            }}
          >
            <Box
              sx={{
                gap: "0.7rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingX: { xs: "0.4rem", lg: "1rem" },
              }}
            >
              <img
                src={location}
                alt=""
                style={{
                  color: "transparent",
                  objectFit: "contain",
                  position: "relative",
                  maxWidth: "100%",
                  height: "auto",
                  overflow: "hidden",
                  width: "1.2rem",
                  marginLeft: "0.15rem",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#A7ACB6",
                    fontSize: { xs: "0.695rem", lg: "0.875rem" },
                    fontWeight: "500",
                  }}
                >
                  Delivering to
                  <Box
                    component={"span"}
                    sx={{
                      color: "#77797F",
                      fontSize: { xs: "0.695rem", lg: "0.775rem" },
                      marginLeft: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    home
                  </Box>
                  <Box
                    component={"span"}
                    sx={{
                      color: "#77797F",
                      fontSize: { xs: "0.695rem", lg: "0.775rem" },
                      fontWeight: "400",
                      marginLeft: "0.25rem",
                      textOverflow: "ellipsis",
                      lineHeight: "1rem",
                      gap: "1rem",
                    }}
                  >
                    {userAddresses?`Flat No: ${userAddresses[0].flatNumber}, ${userAddresses[0].wing} Wing, ${userAddresses[0].society}.` :''}
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </AppBar>

      <Box sx={{ padding: "1rem 0.75rem 0.75rem 0.75rem ", width: "100%" }}>
        {/* COD Payment */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            maxWidth: { xs: "100%", sm: "66%", md: "44%", lg: "30%" },
            margin: "auto",
            padding: { xs: "0rem", sm: "1.5rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box
              sx={{ margin: { xs: "0px 0px 0px 0px", sm: "0px 8px 8px 0px" } }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#7E7D87",
                  fontWeight: "500",
                  padding: "0px 0px 0px 2px",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Pay on Delivery
              </Typography>
            </Box>

            
            <Box sx={{ padding: "4px", height: "auto", width: "100%" }}>
              <Card
                elevation={0}
                sx={{
                  marginBottom: "0rem",
                  borderRadius: "0.625rem",
                  color: "#FFFFFF",
                  marginTop: "0.875rem",
                  width: "100%",
                  border: "1px solid #E5E8EF",
                }}
              >
                <Box
                  sx={{
                    padding: "0.975rem 0.85rem",
                    borderBottom: "1px solid rgb(240, 244, 249)",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Box
                      sx={{
                        gap: "1rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <img
                        src={payIcon}
                        alt="Bill Icon"
                        style={{
                          color: "transparent",
                          objectFit: "contain",
                          position: "relative",
                          maxWidth: "100%",
                          height: "auto",
                          overflow: "hidden",
                          width: "2.2rem",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgb(38, 42, 51)",
                            fontSize: "0.875rem",
                            lineHeight: "1.125rem",
                            fontWeight: "500",
                            textAlign: { xs: "center", sm: "left" },
                          }}
                        >
                          Cash On Delivery
                        </Typography>
                      </Box>
                    </Box>
                    <Box>

                      <Box
                        onClick={handleCodSelect}
                        sx={{
                          cursor: "pointer",
                          width: "0.875rem",
                          height: "0.875rem",
                        }}
                        
                      >
                        <img
                          src={selectPaymentMethod ? tickIcon : radioButton}
                          alt="Bill Icon"
                          style={{
                            width: "1.2rem",
                            height: "auto",
                          }}
 
                        />
                      </Box>
                    </Box>
                  </Box>
                          {isLoading &&<Loader/>}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "0.875rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <Box
                      sx={{
                        gap: "1rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#A19CA2",
                            fontSize: { xs: "0.7rem", sm: "0.775rem" },
                            lineHeight: "1.125rem",
                            fontWeight: "500",
                            textAlign: { xs: "center", sm: "left" },
                          }}
                        >
                          Pay by Cash/UPI on delivery
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Collapse in={selectPaymentMethod}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "0.875rem",
                      }}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: "#EF4372",
                          boxShadow: 0,
                          fontSize: { xs: "0.8rem", sm: "1rem" },
                        }}
                        onClick={handlePayment}
                      >
                        Proceed to Pay
                      </Button>
                    </Box>
                  </Collapse>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>

        {/* UPI Payment */}

        <Box
          sx={{
            marginTop:'0.75 rem',
            width: "100%",
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
              padding: { sm: "1.5rem" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  margin: { xs: "0px 0px 1px 0px", sm: "0px 8px 8px 0px" },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#7E7D87",
                    fontWeight: "500",
                    padding: "0px 0px 0px 2px",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  Pay By UPI
                </Typography>
              </Box>
              <Box sx={{ padding: "4px", height: "auto", width: "100%" }}>
                <Card
                  elevation={0}
                  sx={{
                    marginBottom: "0rem",
                    borderRadius: "0.625rem",
                    color: "#FFFFFF",
                    marginTop: "0.875rem",
                    width: "100%",
                    border: "1px solid #E5E8EF",
                  }}
                >
                  <Box
                    sx={{
                      padding: "0.975rem 0.85rem",
                      borderBottom: "1px solid rgb(240, 244, 249)",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          flexWrap: "wrap",
                        }}
                      >
                        {[
                          { src: gpayIcon, label: "Google Pay" },
                          { src: phonepeIcon, label: "PhonePe" },
                          { src: paytmIcon, label: "Paytm" },
                        ].map((icon, index) => (
                          <Box key={index} sx={{ textAlign: "center" }}>
                            <img
                              src={icon.src}
                              alt={`${icon.label} Icon`}
                              style={{
                                objectFit: "contain",
                                maxWidth: "100%",
                                height: "auto",
                                overflow: "hidden",
                                width: "3rem",
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#7D7B87",
                                fontSize: "0.675rem",
                                fontWeight: "500",
                                marginTop: "0.5rem",
                              }}
                            >
                              {icon.label}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "0.875rem",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <IconButton
                          sx={{
                            borderRadius: "0.5rem",
                            backgroundColor: "#FDF6FF",
                            border: "1px solid #F1EBFA",
                          }}
                        >
                          <IoMdAdd
                            style={{ color: "#9B01F7", fontSize: "0.9rem" }}
                          />
                        </IconButton>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#A19CA2",
                            fontSize: "0.775rem",
                            lineHeight: "1.125rem",
                            fontWeight: "400",
                          }}
                        >
                          Add new UPI ID
                        </Typography>
                      </Box>
                      <IconButton>
                        <IoChevronForwardSharp
                          style={{ fontSize: "0.875rem" }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default PaymentScreen;
