import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../../core/store/slices/cartSlice";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Card,
  Button,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove"; 
import billIcon from "/images/icons/bill_icon.svg";
import addressIcon from "/images/icons/address.png";
import downArrow from "/images/icons/downArrow.png";
import { useNavigate } from "react-router-dom";
import AddressForm from "../AddressForm/AddressForm";
import { setAddress, setAuth } from "../../../../core/store/slices/authSlice";
import { useProfileMutation } from "../../../../core/store/slices/usersApiSlice";
interface AddressFormData {
  society: string;
  wing: string;
  flatNumber: string;
}
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

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  countInStock: number;
  category?: string;
}

interface CartProps {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  qty: number;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const { userAddresses } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.auth);
  const [updateUser] = useProfileMutation();
  //Changes updated here
  const handleBrowseProducts = () => {
    navigate("/");
    onClose();
  };

  const [showModal, setShowModal] = useState(false);

  const handleIncrement = (item: CartItem) => {
    if (qty < 5) {
      const newQuantity = qty + 1;
      setQty(newQuantity);
      dispatch(
        addToCart({
          ...item,
          qty: newQuantity,
          category: item.category || "defaultCategory",
        })
      );
    }
  };

  const handleDecrement = (item: CartItem) => {
    if (item.qty > 1) {
      const newQuantity = item.qty - 1;
      dispatch(
        addToCart({
          ...item,
          qty: newQuantity,
          category: item.category || "defaultCategory",
        })
      );
    } else {
      dispatch(removeFromCart(item._id));
    }
  };
  const addItems = () => {
    onClose();
  };

  const handlePayment = () => {
    navigate("/payment");
  };
  const handleAddAddress = () => {
    setShowModal(true);
  };

  const closeModal = async () => {
    setShowModal(false);
  };

  const handleSubmit = async (address: AddressFormData) => {
 
      try {
        const response = await updateUser({
          address: [...(userAddresses || []), address] 
        }).unwrap();
    
        dispatch(setAddress(address));
        dispatch(setAuth({ ...user, address: response.address }));
    
        setShowModal(false);
      } catch (error) {
        console.error("Failed to update address:", error);
      }
     
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: '#F0F4F9',
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
        }}
        elevation={1}
      >
        <Toolbar variant="dense">
          <IconButton edge="start" onClick={onClose}>
            <NavigateBeforeIcon sx={{ color: "black" }} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              color: "black",
              fontFamily: "Montserrat",
              fontSize: "1.1rem",
            }}
          >
            Your Cart
          </Typography>
        </Toolbar>
      </AppBar>

      
        <Box>
        {cartItems.length === 0 ? ( 
            <Box sx={{display: "flex",
          justifyContent: "center",
          alignItems: "center",flexDirection:"column",marginY:"2rem" ,backgroundColor:"#FFFFFF",padding:'3rem',marginX:"3rem",borderRadius:"0.7rem"}}>
            <Box sx={{marginY:"0.775rem"}}>
              <img
                alt=""
                loading="lazy" 
                decoding="async"
                src="public/images/icons/empty_cart.png"
                style={{ 
                  objectFit: "contain", 
                  width:"70px",
                  height: "auto",
                }}
              />

            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "Inter",
                  fontSize: "1.15rem",
                  lineHeight:"1.5rem"
                }}
              >
                Your cart is empty
              </Typography>

            </Box>
              <Button
                variant="contained"
                sx={{
                  marginTop: "1rem",
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "0.5rem",
                  fontFamily: "Inter",
                  fontSize: "0.8rem",
                  borderRadius: 2,
                }}
                onClick={handleBrowseProducts}
              >
                Browse Products
              </Button>
            </Box>
        ) : (
          <>
            <Card
              elevation={0}
              sx={{
                marginX: "0.75rem",
                marginBottom: "0.75rem",
                padding: "0rem 0rem 0.75rem",
                borderRadius: "0.625rem",
                marginTop:"0.75rem"
              }}
            >
              <Box sx={{ padding: "0.875rem 0.7rem 0.375rem" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <img
                    alt=""
                    loading="lazy"
                    width="36"
                    height="36"
                    decoding="async"
                    src="https://cdn.zeptonow.com/production///tr:w-100,ar-36-36,pr-true,f-auto,q-80/app/images/eta_normal_darkstore_v1.png"
                    style={{
                      color: "transparent",
                      objectFit: "contain",
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgb(38, 42, 51)",
                      lineHeight: "1.25rem",
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}
                  >
                    Delivery in 30 - 35 mins
                  </Typography>
                </Box>
              </Box>

              {cartItems.map((item) => (
                <Box sx={{ paddingTop: "0.625rem" }} key={item._id}>
                  <Box sx={{ paddingBottom: 0 }}>
                    <Box
                      key={item._id}
                      sx={{
                        padding: "0.5rem 1rem 0.5rem 1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", justifyContent: "flex-start" }}
                      >
                        <img
                          src={item.image}
                          alt=""
                          style={{
                            width: "3.3rem",
                            height: "3.3rem",
                            borderRadius: "0.5rem",
                            marginRight: "0.5rem",
                            flexShrink: 0,
                            position: "relative",
                            maxWidth: "100%",
                          }}
                        />
                        <Box
                          sx={{
                            paddingLeft: "0.675rem",
                            textAlign: "left",
                            paddingRight: "1rem",
                            height: "3.5rem",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "0.875rem",
                              fontWeight: "400",
                              marginTop: "0.4rem",
                              lineHeight: "1rem",
                              color: "rgba(38,42,51,1)",
                              minWidth: "7rem",
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                          marginLeft: "2rem",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: "#FDECF1",
                            border: "1px solid rgba(252,217,229, 1)",
                            borderRadius: "0.5rem",
                          }}
                        >
                          <IconButton onClick={() => handleDecrement(item)}>
                            <RemoveIcon
                              sx={{
                                color: "#EF4372",
                                fontSize: "0.875rem",
                                lineHeight: "1.125rem",
                                padding: 0,
                              }}
                            />
                          </IconButton>
                          <Typography
                            variant="body1"
                            sx={{
                              paddingX: "0.1rem",
                              fontWeight: "600",
                              fontSize: "0.8125rem",
                            }}
                          >
                            {item.qty}
                          </Typography>
                          <IconButton onClick={() => handleIncrement(item)}>
                            <AddIcon
                              sx={{
                                color: "#EF4372",
                                fontSize: "0.875rem",
                                lineHeight: "1.125rem",
                                padding: 0,
                              }}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: "right", paddingLeft: "0.9rem" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#000",
                            fontSize: "1rem",
                            fontWeight: "450",
                            marginTop: "0.4rem",
                          }}
                        >
                          ₹{item.price}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px dotted rgba(43,30,53,0.6)",
                  paddingTop: "0.625rem",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "500",
                    fontSize: "0.775rem",
                    lineHeight: "1.5rem",
                  }}
                >
                  Missed Something?
                </Typography>
                <Box
                  component="button"
                  sx={{
                    backgroundColor: "black",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingX: "0.5rem",
                    paddingY: "0.5rem",
                    border: "none",
                    borderRadius: "0.4rem",
                  }}
                  onClick={addItems}
                >
                  <AddIcon
                    sx={{
                      color: "white",
                      lineHeight: "0.6rem",
                      height: "15px",
                      width: "15px",
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.675rem",
                      color: "white",
                      textDecoration: "none",
                      paddingLeft: "0.5rem",
                    }}
                  >
                    Add More Items
                  </Typography>
                </Box>
              </Box>
            </Card>

            <Card
              elevation={0}
              sx={{
                marginX: "0.75rem",
                marginBottom: "0rem",
                borderRadius: "0.625rem",
                padding: "0rem",
                color: "#FFFFFF",
              }}
            >
              <Box
                sx={{
                  padding: "0.975rem 0.75rem",
                  borderBottom: "1px solid rgb(240, 244, 249)",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box
                    sx={{
                      gap: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={billIcon}
                      alt="Bill Icon"
                      style={{
                        color: "transparent",
                        objectFit: "contain",
                        position: "relative",
                        maxWidth: "100%",
                        height: "auto",
                        overflow: "hidden",
                        width: "1.75rem",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgb(38, 42, 51)",
                          fontSize: "1rem",
                          lineHeight: "1.125rem",
                          fontWeight: "600",
                        }}
                      >
                        {" "}
                        Bill Summary
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "0.875rem",
                  }}
                >
                  <Box
                    sx={{
                      gap: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ borderBottom: "1px dotted grey" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgb(38, 42, 51)",
                          fontSize: "0.675rem",
                          lineHeight: "1.125rem",
                        }}
                      >
                        {" "}
                        Item total
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ textAlign: "center", marginRight: "0.75rem" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#71717F",
                            fontSize: "0.675rem",
                            lineHeight: "1rem",
                            fontWeight: "500",
                          }}
                        >
                          {" "}
                          ₹
                          {cartItems
                            .reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )
                            .toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "0.675rem",
                  }}
                >
                  <Box
                    sx={{
                      gap: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ borderBottom: "1px dotted grey" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgb(38, 42, 51)",
                          fontSize: "0.775rem",
                          lineHeight: "1.125rem",
                        }}
                      >
                        Delivery Fee
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ textAlign: "center", marginRight: "0.75rem" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#71717F",
                            fontSize: "0.775rem",
                            lineHeight: "1rem",
                            fontWeight: "500",
                          }}
                        >
                          {" "}
                          ₹0
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "0.875rem",
                  }}
                >
                  <Box
                    sx={{
                      gap: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "rgb(38, 42, 51)",
                          fontSize: "0.875rem",
                          lineHeight: "1.125rem",
                          fontWeight: "450",
                        }}
                      >
                        To Pay
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ textAlign: "center", marginRight: "0.75rem" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#71717F",
                            fontSize: "0.875rem",
                            lineHeight: "1rem",
                            fontWeight: "500",
                          }}
                        >
                          ₹
                          {cartItems
                            .reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )
                            .toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#ABAEBB",
                      fontSize: "0.565rem",
                      lineHeight: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    Incl. all taxes and charges
                  </Typography>
                </Box>
              </Box>
            </Card>

            <Box
              component="div"
              sx={{ height: { xs: "10rem", lg: "22rem", sm: "32rem" } }}
            ></Box>

            <Box
              component={"div"}
              sx={{
                position: { lg: "sticky", xs: "fixed" },
                paddingX: "0.75rem",
                paddingTop: "0.75rem",
                backgroundColor: "rgba(255, 255 ,255, 1)",
                borderTopLeftRadius: "0.375rem",
                borderTopRightRadius: "0.375rem",
                width: "100%",
                height: "fit-content",
                zIndex: "101",
                bottom: 0,
                right: 0,
              }}
            >
              {userAddresses && userAddresses.length > 0 ? (
                <>
                  <Box
                    component="button"
                    sx={{
                      paddingLeft: "0.25rem",
                      paddingRight: "0.25rem",
                      paddingY: "0.5rem",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      width: "100%",
                      cursor: "pointer",
                      textTransform: "none",
                      border: "none",
                      backgroundColor: "rgba(255, 255 ,255, 1)",
                    }}
                  >
                    <img
                      src={addressIcon}
                      alt="address icon"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        width: "40px",
                      }}
                    />
                    <Box
                      sx={{
                        cursor: "pointer",
                        textTransform: "none",
                        paddingLeft: "0.625rem",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "rgba(2, 6, 12, 0.6)",
                            lineHeight: "1.25rem",
                            fontWeight: "700",
                            fontSize: "1rem",
                            paddingRight: "0.5rem",
                          }}
                        >
                          Delivering to home
                        </Typography>
                        <img
                          src={downArrow}
                          alt=""
                          style={{
                            color: "transparent",
                            objectFit: "contain",
                            overflow: "hidden",
                            position: "relative",
                            maxWidth: "100%",
                            height: "auto",
                            width: "8px",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "rgba(2, 6, 12, 0.6)",
                          lineHeight: "1rem",
                          fontWeight: "400",
                          fontSize: "0.825rem",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {userAddresses
                          ? `Flat No: ${userAddresses[0]?.flatNumber}, ${userAddresses[0]?.wing} Wing, ${userAddresses[0]?.society}.`
                          : ""}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      sx={{
                        textAlign: "center",
                        backgroundColor: "rgba(239,67,114,1)",
                        borderRadius: "0.75rem",
                        width: "100%",
                        height: "3.25rem",
                        marginY: "0.625rem",
                        color: "white",
                      }}
                      onClick={handlePayment}
                    >
                      Click to Pay ₹
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </Button>
                  </Box>
                </>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    sx={{
                      textAlign: "center",
                      backgroundColor: "rgba(239,67,114,1)",
                      borderRadius: "0.75rem",
                      width: "100%",
                      height: "3.25rem",
                      marginY: "0.625rem",
                      color: "white",
                    }}
                    onClick={handleAddAddress}
                  >
                    Add Address to Proceed
                  </Button>
                </Box>
              )}
            </Box>
          </>
        )}
          </Box>

        <AddressForm
          open={showModal}
          closeModal={closeModal}
          onSubmit={handleSubmit}
        /> 
    </Box>
  );
};

export default Cart;
