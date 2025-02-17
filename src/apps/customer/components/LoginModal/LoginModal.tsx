import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import { IoMdCloseCircle } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import bg from "/images/background/bg.svg";
import { toast } from "react-toastify";
import { IoChatbubbleOutline } from "react-icons/io5";
import axios from "axios";
import { OTP_URL,  BASE_URL} from "../../../../shared/constants/constants"; 
import { useDispatch } from "react-redux";
import { setAuth } from "../../../../core/store/slices/authSlice";
import { useLoginMutation } from "../../../../core/store/slices/usersApiSlice"; 
import { useNavigate } from "react-router-dom";
import { initializeSessionId } from "../../../../shared/utils/sessionUtils"; 
interface LoginModalProps {
  openModal: boolean;
  closeModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ openModal, closeModal }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [modal, setModal] = useState<"login" | "otp">("login");
  const [isEnabled, setIsEnabled] = useState(false);
  const [height ,setHeight ] =useState(window.innerHeight);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [time, setTime] = useState(30); 
  const isValidPhoneNumber =phoneNumber.length === 10 && /^[6-9]\d{9}$/.test(phoneNumber);
  const dispatch = useDispatch();
  // const search  = useLocation();
  const [login] = useLoginMutation();
  // const sp = new URLSearchParams(search);
  // const redirect = sp.get('redirect') || '/';
  const navigate = useNavigate();
 
  
  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === "Backspace" && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const sendOtp = async () => {
    try {
      await initializeSessionId();
      let sessionId = sessionStorage.getItem("sessionId");
      if (!isValidPhoneNumber) {
        toast.error("Please enter a valid phone number!");
        return;
      }
      setModal("otp");
      startTimer();
      setIsEnabled(false);
  
      const response = await axios.post(`${BASE_URL}${OTP_URL}/send`, {
        phoneNumber,
        sessionId,
      });

      console.log(` ${response.data.message} ${response.data.otp}`);

    } catch (error) {
      console.error("Error sending OTP:", error);
      console.error("Failed to send OTP. Please try again.");
      closeModal();
      setModal("login");
      setPhoneNumber("");
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;  
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); 
    setOtp(newOtp); 
   
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
   
    if (value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
   
    if (index === otp.length - 1 && newOtp.every(digit => digit !== "")) {
      verifyOtp(newOtp);  
    }
  };
  const verifyOtp = async (newOtp: string[]) => {
    let otpToken = newOtp.join("");  
    console.log("Entered OTP:", otpToken);
  
    try { 
      //  const response =await axios.post(`${BASE_URL}${OTP_URL}/verify`,{
      //   phoneNumber,
      //   otpToken
      // });

      const data = await login({ phoneNumber, otpToken }).unwrap();
      
      if (data) {
      
        dispatch(setAuth({ ...data })); 
        closeModal();
        localStorage.setItem("user", JSON.stringify(data));
        
        if (data.isAdmin) {
          navigate("/admin/dashboard");
        }
      } else {
        console.log("Invalid OTP!");
        setOtp(Array(6).fill(""));  
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP");
      setOtp(Array(6).fill(""));
      setTime(0)
    }
  };

  const resendOtp = () => {
    startTimer();
    setIsEnabled(false);
    sendOtp();
  };

  const closeModalHandler = () => {
    setModal("login");
    closeModal();
  };

  const startTimer = () => {
    setTime(30);
    setIsEnabled(true);
  };


  useEffect(() => {
    if (time <= 0) {
      setIsEnabled(true);
      return;
    }
    const timerId = setTimeout(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [time]);

  useEffect(()=>{
    const handleResize =()=>{
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize",handleResize);
    return ()=>{ window.removeEventListener('resize',handleResize)}
  })
  const commonStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : "30rem",
    height:  `${height}px`, 
    padding: "3.65rem 1.5rem 1.5rem 1.5rem",
    color: "white",
    boxShadow: 24,
    borderRadius: isMobile ? 0 : "0.75rem",
    backgroundImage: `url(${bg})`,  
    backgroundSize: "cover",
    bgcolor: "background.paper",
    overflow: "hidden",
  };
  return (
    <>
     
      <Modal open={openModal} onClose={closeModalHandler}>
      <Box sx={commonStyles}>
        {isMobile && (
          <Box sx={{ position: "absolute", top:'0.5rem', right:'0.5rem' }}>
            <IconButton onClick={()=>{closeModal() ;setPhoneNumber('');setModal('login')}}>
              <IoMdCloseCircle color="#9d67aa" size={25} />
            </IconButton>
          </Box>
        )}

        {modal === "login" && (
          <>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "700",
                backgroundImage:
                  "linear-gradient(180deg, #ff3269 9%, #ff794d 98.18%)",
                color: "transparent",
                backgroundClip: "text",
                fontSize: { lg: "3rem", xs: "2.8rem" },
              }}
            >
              Barne Farms
            </Typography>
            
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: "2rem",
                mb: 3, 
                letterSpacing: "1.5px",
              }}
            >
              Groceries  
            </Typography>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: "2rem",
                mb: 3, 
                letterSpacing: "1.5px",
                lineHeight:'0px'
              }}
            >
             delivered in  
            </Typography>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: "2rem",
                mb: 3, 
                letterSpacing: "1.5px",
              }}
            >
               30-35 minutes
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                placeholder="Enter Phone Number"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                type="tel"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      +91
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "50px",
                    backgroundColor: "white",
                    height: "45px",
                    border: "none",
                  },
                }}
                inputProps={{ maxLength: 10 }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  mb: 3,
                  width: { lg: "75%", xs: "100%", sm: "80%" },
                }}
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button
                fullWidth
                disabled={!isValidPhoneNumber}
                sx={{
                  backgroundImage:
                    "linear-gradient(92.16deg, #ff3269 1.82%, #ff794d 98.18%)",
                  color: "white",
                  borderRadius: "50px",
                  height: "50px",
                  textTransform: "none",
                  "&:disabled": {
                    backgroundImage:
                      "linear-gradient(92.16deg,rgba(255, 50, 105, 0.61) 1.32%,rgba(255, 122, 77, 0.61) 98.18%);", 
                  },
                  fontFamily: "Montserrat",
                  width: { lg: "75%", xs: "100%", sm: "80%" },
                  border:'none'
                }}
                onClick={sendOtp}
              >
                Continue
              </Button>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "0.8rem",
                  pt: "3.20rem",
                  width: "230px",
                  fontFamily: "Inter",
                }}
              >
                By continuing, you agree to our{" "}
                <span style={{ color: "#FF5C5C", fontWeight: "bold" }}>
                  Terms of Service
                </span>{" "}
                &{" "}
                <span style={{ color: "#FF5C5C", fontWeight: "bold" }}>
                  Privacy Policy
                </span>
              </Typography>
            </Box>
          </>
        )}

        {modal === "otp" && (
          <>
            {isMobile && (
              <Box sx={{ position: "absolute", top: 60, right: 10 }}>
                <IconButton onClick={()=>{closeModal;setModal("login")}}>
                  <IoMdCloseCircle color="#9d67aa" size={1} />
                </IconButton>
              </Box>
            )}
            <IconButton
              onClick={() => setModal("login")}
              sx={{ position: "relative", right: "0.6rem", bottom: "1rem" }}
            >
              <FaArrowLeftLong color="white" />
            </IconButton>
            <Typography
              sx={{
                fontFamily: "Lato",
                fontWeight: "700",
                fontSize: { lg: "2rem", xs: "2.8rem" },
              }}
            >
              OTP Verification
            </Typography>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "500",
                fontSize: "0.9rem",
                mb: 4,
                letterSpacing: "1.5px",
                mt: 3,
              }}
            >
              OTP has been sent to +91 {phoneNumber}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                mb: 6,
              }}
            >
              {otp.map((value, index) => (
                <TextField
                  key={index}
                  value={value}
                  variant="outlined"
                  type="tel"
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center", fontSize: "1.5rem" },
                  }}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  sx={{
                    width: "3rem",
                    height: "3.7rem",                  
                    transition: 'border-color 0.3s',  
                    borderRadius: "0.75rem",
                    backgroundColor:value?'green': "white",

                    "& .MuiOutlinedInput-notchedOutline": { border:"none" },
                    '& .MuiOutlinedInput-root': {
                      
                     },
                    }}
                  
                />
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                mt: 5,
              }}
            >
              <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
                00:{time}
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "0.9rem",
                  mt: 3,
                  width: "230px",
                  fontFamily: "Inter",
                }}
              >
                Didn't get it?
              </Typography>
              <Box
                component="button"
                disabled={!isEnabled}
                sx={{
                  padding: 0,
                  backgroundColor: "transparent",
                  mt: 2,
                  border: "none",
                }}
              >
                <Box
                  component="a"
                  onClick={resendOtp}
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <IoChatbubbleOutline
                    style={{
                      fontSize: "1.1rem",
                      position: "relative",
                      right: "3px",
                      backgroundImage:
                        "linear-gradient(180deg, #ff3269 9%, #ff794d 98.18%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                    }}
                  >
                    Send OTP (SMS)
                  </Typography>
                </Box>
              </Box> 
            </Box>
          </>
        )}
      </Box>
    </Modal>  
    </>
  );
};

export default LoginModal;
