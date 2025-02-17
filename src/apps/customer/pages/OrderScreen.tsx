
import { useNavigate, useParams } from "react-router-dom";
import Message from "../../../shared/components/Message/Message";
import Loader from "../../../shared/components/Loader/Loader";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from "../../../core/store/slices/ordersApiSlice";
import { toast } from "react-toastify";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SmsFailedOutlinedIcon from "@mui/icons-material/SmsFailedOutlined";
import orderCancelled from "/images/icons/order_cancelled.svg";
import { useSelector } from "react-redux";
import {AppBar,Box,Button,IconButton,Toolbar,Typography} from "@mui/material";
import billIcon from "/images/icons/bill_icon.svg";
import { io } from "socket.io-client";
import {BASE_URL} from "../../../shared/constants/constants";
const socket = io(BASE_URL);
import arriving from '/images/icons/order_arriving.png'
import delivered from '/images/icons/order_delivered.svg'
interface RootState {

  auth: {
    user: {
      _id: string;
      name: string;
      phoneNumber: string;
    } | null;
    userAddresses: AddressFormData[];
  };
}
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface OrderItem {
  name: string;
  image: string;
  product: string;
  price: number;
  qty: string;
  quantity: string;
}
interface AddressFormData {
  society: string;
  wing: string;
  flatNumber: string;
} 

interface UserInfo {
  isAdmin: boolean;
}

const OrderScreen = () => {
  const { id: orderId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [deliverOrder,] =useDeliverOrderMutation();
  const {userAddresses} = useSelector((state: RootState)=>state.auth)
  const { user } = useSelector(
    (state: { auth: { user: UserInfo } }) => state.auth
  );

  const totalItems = order?.orderItems?.reduce(
    (acc: number, currItem: OrderItem) => acc + currItem.qty,
    0
  );


  const deliverOrderHandler = async () => {
    try {
      const response = await deliverOrder(order!._id).unwrap();
      const updatedOrder = response.data;
      socket.emit('orderUpdated',updatedOrder);
      await refetch();
      toast.success("Order marked as delivered");
    } catch (err: any) {
      toast.error(err?.data?.message || err.message);
    }
  };

  // const handlePayment = () => {
  //   if (!order) return;
  //   const options = {
  //     key: razorpay?.keyId || "rzp_test_xdVEmJErXax2yi", // Dynamic key if fetched from backend
  //     amount: order.totalPrice * 100, // Amount in the smallest unit
  //     currency: "INR",
  //     name: "Test Merchant",
  //     description: "Payment for testing",
  //     handler: async function (response: RazorPayResponse) {
  //       try {
  //         // Update payment on the server
  //         const paymentDetails = {
  //           id: response.razorpay_payment_id,
  //           status: "success",
  //           update_time: new Date().toISOString(),
  //           payer: {
  //             email_address: order.user.email,
  //           },
  //         };

  //         await payOrder({
  //           orderId: order._id,
  //           details: paymentDetails,
  //         }).unwrap();
  //         refetch();
  //         toast.success("Payment successful and order updated!");
  //       } catch (error: any) {
  //         toast.error(error?.data?.message || error.message);
  //       }
  //     },
  //     prefill: {
  //       name: order.user.name,
  //       email: order.user.email,
  //       contact: order.shippingAddress.phoneNumber,
  //     },
  //     notes: {
  //       address: order.shippingAddress.address,
  //     },
  //     theme: {
  //       color: "#F37254",
  //     },
  //   };

  //   const rzp1 = new window.Razorpay(options);
  //   rzp1.open();
  // };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#F0F4F9",
        }}
      >
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: "white",
            border: "0.5px solid #e5e7eb",
          }}
          elevation={0}
        >
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              onClick={() => {
                {user.isAdmin?navigate('/admin/orderlist'):  navigate("/account/orders")}
              }}
            >
              <NavigateBeforeIcon sx={{ color: "black" }} />
            </IconButton>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h6"
                sx={{
                  color: "black",
                  fontFamily: "Montserrat",
                  fontSize: "0.675rem",
                  marginTop: "0.5rem",
                }}
              >
                OrderID: {order!._id}
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: "black",
                  fontFamily: "Montserrat",
                  fontSize: "0.675rem",
                }}
              >
                {totalItems} items
              </Typography>
            </Box>
            <IconButton
              edge="end"
              sx={{
                ml: "auto",
                order: { xs: 3, sm: 2 },
                border: "1px solid #D9DADF",
                borderRadius: "10rem",
              }}
            >
              <SmsFailedOutlinedIcon sx={{ fontSize: "1rem", color: "#000" }} />
              <Typography
                variant="body1"
                sx={{
                  fontSize: { lg: "0.675rem", xs: "0.67rem" },
                  paddingX: "0.3rem",
                  fontWeight: "450",
                }}
              >
                Help
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ scrollMarginTop: "5rem" }}>
              <Box sx={{ paddingX: "1rem", backgroundColor: "#FFFFFF" }}>
                <Box
                  sx={{
                    borderBottom: "0.5px solid #e5e7eb",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    paddingY: "1rem",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    
                    <img
                      src={order.deliveryStatus==="Arriving" ? arriving : order.deliveryStatus==="Delivered" ? delivered : orderCancelled}
                      alt={order.deliveryStatus}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        color: "transparent",
                      }}
                    />
                    
                    <Box sx={{ marginX: "0.625rem" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#000",
                          fontSize: "1.1rem",
                          fontWeight: "500",
                        }}
                      >
                        {totalItems} items {order.deliveryStatus}
                      </Typography>
                    </Box>

                  </Box>
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "0.375rem",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "700",
                        fontSize: "0.875rem",
                        lineHeight: "1.125rem",
                      }}
                    >
                      {totalItems} items in Shipment
                    </Typography>
                  </Box>
                  {order.orderItems.map((item: OrderItem,index:number) => (
                    <Box key={index}>
                      <Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box sx={{ paddingY: "0.5rem" }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "grid",
                                  gridTemplateColumns: "40px 1fr",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  style={{
                                    color: "transparent",
                                    objectFit: "contain",
                                    borderRadius: "0.5rem",
                                    overflow: "hidden",
                                    width: "2.5rem",
                                    height: "2.5rem",
                                    position: "relative",
                                    maxWidth: "100%",
                                  }}
                                />
                                <Box
                                  sx={{
                                    marginLeft: "0.5rem",
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontSize: "0.875rem",
                                      lineHeight: "1rem",
                                      fontWeight: "450",
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
                                      variant="body2"
                                      sx={{
                                        fontSize: "0.675rem",
                                        lineHeight: "0.975rem",
                                      }}
                                    >
                                      {item.qty} unit
                                    </Typography>
                                    
                                  </Box>
                                </Box>
                              </Box>
                              <Box sx={{ textAlign: "right" }}>
                                <Typography variant="body1">
                                  ₹{item.price}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ paddingBottom: "1rem", marginTop: "2rem",backgroundColor:"#FFFFFF" }}>
          <Box
            sx={{ paddingTop: "1rem", paddingX: "1rem", marginTop: "0.5rem" }}
          >
            <Box sx={{ marginBottom: "16px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  sx={{
                    display: "flex",
                    paddingRight: "0.5rem",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      marginBottom: "4px",
                      width: "24px",
                      height: "24px",
                      position: "relative",
                    }}
                  >
                    <img
                      src={billIcon}
                      alt=""
                      style={{
                        position: "relative",
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                        color: "transparent",

                      }}
                    />
                  </span>
                  <span
                    style={{
                      color: "rgb(38, 42, 51)",
                      fontSize: "1.125rem",
                      lineHeight: "1.5rem",
                      textAlign: "left",
                      whiteSpace: "normal",
                    }}
                  >
                    Bill Summary
                  </span>
                </Box>
              </Box>
            </Box>
            <Box sx={{ marginBottom: "0.875rem",paddingLeft:"6px" }}>
              <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Box sx={{paddingRight:"0.5rem",display:'flex',justifyContent:'flex-start',alignItems:'center',maxWidth:"70%"}}>
                      <span style={{textAlign:'left',fontSize:"0.775rem",lineHeight:'1rem'}}>Item Total</span>
                    </Box>
                    <Box sx={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                      <span style={{fontSize:"0.875rem",lineHeight:"0.975rem",fontWeight:"600"}}>₹{order.totalPrice}</span>
                    </Box>
              </Box>  
            </Box>
            <Box sx={{ marginBottom: "10px",paddingLeft:"6px" }}>
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Box sx={{paddingRight:"0.5rem",display:'flex',justifyContent:'flex-start',alignItems:'center',maxWidth:"70%"}}>
                      <span style={{textAlign:'left',fontSize:"0.775rem",lineHeight:'1rem'}}>Delivery Fee</span>
                    </Box>
                    <Box sx={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                      <span style={{fontSize:"0.875rem",lineHeight:"0.975rem",fontWeight:"600"}}>₹ 0</span>
                    </Box>
              </Box> 
            </Box>
            <Box sx={{ marginBottom: "2px",paddingLeft:"3px" }}>
              <Box sx={{display:'flex',justifyContent:'space-between'}}>
                  <Box sx={{paddingRight:"0.5rem",display:'flex',maxWidth:"70px",justifyContent:'flex-start',alignItems:'center'}}>
                    <span style={{color:"rgb(38, 42, 51)",fontSize:"0.875rem",fontWeight:"700",lineHeight:"1.125rem"}}>Total Bill</span>
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                    <span style={{color:"rgb(38, 42, 51)",fontSize:"1rem",fontWeight:"700",lineHeight:"1.125rem"}}>₹{order.totalPrice.toFixed(2)}</span>
                  </Box>
              </Box>
            </Box>
          </Box>
          
        </Box>
          <Box sx={{padding:'1rem',marginTop:'0.5rem',backgroundColor:"#FFFFFF"}}>
              <Typography variant="body1" sx={{fontSize:"0.875rem",lineHeight:'1.125rem',fontWeight:"600",color:"rgb(38, 42, 51)"}}>Order Details</Typography>
              <Box sx={{marginY:'0.75rem'}}>
              <Typography variant="body1" sx={{fontSize:"0.775rem",lineHeight:'1rem'}}>Order ID</Typography>
                <Box>
              <Typography variant="body1" sx={{fontSize:"0.675rem",lineHeight:'0.875rem',fontWeight:"450",color:"rgb(38, 42, 51)"}}>#{order._id}</Typography>
                </Box>
              </Box>
              <Box sx={{marginY:'0.75rem'}}>
              <Typography variant="body1" sx={{fontSize:"0.775rem",lineHeight:'1rem'}}>Delivery Address</Typography>
                <Box>
              <Typography variant="body1" sx={{fontSize:"0.75rem",lineHeight:'0.75rem',fontWeight:"450",color:"rgb(38, 42, 51)"}}> {userAddresses?`Flat No: ${userAddresses[0]?.flatNumber}, ${userAddresses[0]?.wing} Wing, ${userAddresses[0]?.society}.` :''}</Typography>
                </Box>
              </Box>
              <Box sx={{marginY:'0.75rem'}}>
              <Typography variant="body1" sx={{fontSize:"0.775rem",lineHeight:'1rem',fontWeight:"450",}}>Order Placed</Typography>
                <Box>
              <Typography variant="body1" sx={{fontSize:"0.75rem",lineHeight:'1rem',fontWeight:"450",color:"rgb(38, 42, 51)"}}>{order.createdAt}</Typography>
                </Box>
              </Box>
          </Box>
          { user.isAdmin&&(
              <Box sx={{padding:'1rem',marginTop:'0.5rem',backgroundColor:"#FFFFFF"}}>
                <Box >
                  {!order.isPaid ?(
                    <Button variant="contained" sx={{marginX:'0.375rem'}}>
                    Mark as Paid
                  </Button>
                  ):('')}
              {/*  */}
              {!order.isDelivered ?(
              <Button variant="contained" onClick={deliverOrderHandler}>
                Mark as Delivered
              </Button>
              ):('')}
                </Box>
            </Box>
          )}
        
      </Box>
    </>
  );
};

export default OrderScreen;
