import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Drawer,
  Button,

} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";

interface LoginDrawerProps {
  openDrawer: boolean;
  closeLoginDrawer: () => void;
}
// Define the types for the Redux state
interface RootState {
  cart: {
    cartItems: { qty: number }[]; // Typing the cartItems array
  };
  auth: {
    user: {
      name: string;
      isAdmin: boolean;
      isAuth:boolean
      
    } | null;
  };
}

const LoginDrawer: React.FC<LoginDrawerProps> = ({openDrawer,closeLoginDrawer}) => {


  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const { user } = useSelector((state: RootState) => state.auth);
 
  return (
    <Drawer open={openDrawer} onClose={() => closeLoginDrawer()} anchor="right" PaperProps={{sx:{width:{xs:'100%',sm:"100%",lg:"30%"}}}} >
      {user?.isAuth? (
         <Cart onClose={() => closeLoginDrawer()} _id={""} name={""} image={""} price={0} category={""} qty={0}/>
      ) : (
        <>
          <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}> 
            <AppBar
              position="static"
              sx={{ backgroundColor: "white",}}
              elevation={1}
            >
              <Toolbar variant="dense">
                <IconButton edge="start" onClick={closeLoginDrawer}>
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
                  Cart
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              sx={{
                backgroundColor: "#F0F4F9",
                padding: "0.5rem",
                paddingTop: { sm: 20, xs: 20, md: 20 },
                height: { lg: "94vh", sm: "96vh", xs: "95vh" },
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding:{xs: "1.1rem",sm:"3rem",lg:'1rem'},
                  width: { xs: "100%", sm: "100%", md: "100%" },
                  maxHeight: "80vh",
                  overflowY: "auto",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "Inter", fontWeight: "700" }}
                >
                  Please Login
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    padding: "0.7rem",
                  }}
                >
                  Please login to access the cart.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#EF4372",
                    padding: "0.5rem",
                    fontFamily: "Inter",
                    borderRadius: 2,
                  }}
                  disableElevation
                  fullWidth
                  onClick={handleModal}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Box>
          <LoginModal closeModal={closeModal} openModal={openModal} />
        </>
      
      )}
    </Drawer>
  );
};
export default LoginDrawer;
