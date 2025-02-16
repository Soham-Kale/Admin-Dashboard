import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

interface RootState{
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
const OrderConfirmLoader = () => {
  const [showTick, setShowTick] = useState(false);
  const {userAddresses} = useSelector((state:RootState)=>state.auth);
  useEffect(() => {
    // Show the tick mark after the lines animation completes (1 second)
    const timer = setTimeout(() => setShowTick(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box   sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 9999,  
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fff",
        position: "relative",
        width:'100%'
      }}
    > 
      <motion.div
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          backgroundColor: "#8069d1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1, 
        }}
        animate={{
          scale: [1, 1, 0.9],
         
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        {/* Rotating Circular Lines */}
        {!showTick && (
          <motion.svg
            width="140"
            height="140"
            viewBox="0 0 100 100"
            style={{
              position: "absolute",
            }}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
          >
            
            <motion.path
              d="M20 50 A30 30 10 0 1 80 50"  
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1,
              }}
            /> 
            <motion.path
              d="M28 30 A30 30 0 0 1 80 50"  
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 2 }}
              transition={{
                duration: 1.5,
              }}
            />
           
            <motion.path
              d="M28 30 A30 30 0 0 1 80 50"  
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
              }}
            />
          </motion.svg>
        )}

        {/* Tick Mark */}
        {showTick && (
          <motion.div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: "#8069d1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "3px solid green",
              position: "relative",
              zIndex: 2, 
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: "40%",
                height: "40%",
              }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 2 }}
              transition={{ duration: 1 }}
            >
              <motion.path d="M5 13l4 4L19 7" />
            </motion.svg>
          </motion.div>
        )}
      </motion.div>
<Box sx={{display:'flex',justifyContent:"center",alignItems:'center',flexDirection:'column',paddingTop:"1.6rem"}}>
<Box>
    <Typography variant="h5" sx={{fontWeight:"bold",color: "#000",fontFamily:'Montserrat'}} >Order Confirmed</Typography>
</Box>
      <Box sx={{ paddingTop: "1rem", textAlign: "center", zIndex: 1 }}>
        <Typography variant="body1" >
          Delivering to <span style={{color: "#000", fontWeight: "bold" }}>-home</span>
        </Typography>
        <Typography variant="body2" sx={{paddingTop:'0.675rem'}}>
        {userAddresses?`Flat No: ${userAddresses[0].flatNumber}, ${userAddresses[0].wing} Wing, ${userAddresses[0].society}.` :''}
        </Typography>
      </Box>
    </Box>
</Box>
    </Box>
  );
};

export default OrderConfirmLoader;
