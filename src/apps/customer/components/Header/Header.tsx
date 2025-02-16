import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../../../assets/logo.png";
// import { useLogoutMutation } from "../../slices/usersApiSlice";
// import { logout } from "../../slices/authSlice";
// import {  useNavigate } from "react-router-dom";
import { 
  Toolbar,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Badge,
  TextField, 
} from "@mui/material";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import LoginDrawer from "../CartDrawer/CartDrawer";
import LoginModal from "../LoginModal/LoginModal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Location from "../Location/Location";
import CartStickyModal from "../CartStickyModal/CartStickyModal";
// import { useGetProductsQuery } from "../../slices/productsApiSlice";
// Define the types for the Redux state
interface RootState {
  cart: {
    cartItems: { qty: number }[]; 
    totalPrice:string
  };
  auth: {
    user: {
      name: string;
      isAdmin: boolean;
      isAuth: boolean;
    };
    userAddresses: [
      {
        society: string;
        wing: string;
        flatNumber: string;
      }
    ];  
  };
}

const Header: React.FC = () => {
  const [loginDrawer, setLoginDrawer] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;
  const { user } = useSelector((state: RootState) => state.auth);
  const [loginModal, setLoginModal] = useState(false);
  const { userAddresses } = useSelector((state: RootState) => state.auth);
  const [showLocation, setShowLocation] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  // const { data: products = [] } = useGetProductsQuery({});
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/');
    }
  };

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const commonStyles = {
    iconButton: {
      color: "black",
      fontSize: "2rem",
      width: "2rem",
      height: "2rem",
    },
    text: { fontSize: { xs: "0.8rem", md: "0.9rem" }, color: "black" },
  };
  const [isHeaderVisible, setHeaderVisible] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setHeaderVisible(false);
      setShowCartModal(true);
    } else {
      setHeaderVisible(true);
      setShowCartModal(false); 
    }
  };

  const headerStyle = {
    top: 0,
    zIndex: 105,
    transition: "transform 0.3s ",
    transform: isHeaderVisible ? "translateY(0px)" : "translateY(-50%)",
    paddingBottom: "0.75rem",
    position: "sticky",
  };


  const toggleDrawer = (open: boolean) => {
    setLoginDrawer(open);
  };

  const openModal = (open: boolean) => {
    setLoginModal(open);
  };
  const openLocation = () => {
    setShowLocation(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const desktopHeader = (
    <Toolbar
      sx={{
        background: "linear-gradient(rgb(236, 220, 255), rgb(255, 255, 255))",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,  
        height:'5.25rem'
      }}
    > 
      <Box>
        <Box component="a" href="/">
          <img
            src={logo}
            alt="logo"
            style={{ width: "75px", height: "auto" }}
          />
        </Box>
      </Box>

      {/* Right Side: User and Cart */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* User Icon */}
        {!user?.isAuth ? (
          <Box>
            <IconButton onClick={() => openModal(true)}>
              <HiOutlineUserCircle style={commonStyles.iconButton} />
            </IconButton>
            <Typography sx={commonStyles.text}>Log In</Typography>
          </Box>
        ) : (
          <LinkContainer to="/account">
            <Box>
              <IconButton>
                <HiOutlineUserCircle style={commonStyles.iconButton} />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={commonStyles.text}>Profile</Typography>
              </Box>
            </Box>
          </LinkContainer>
        )}
 
        <Box>
          <IconButton onClick={() => toggleDrawer(true)}>
            <Badge
              badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)}
              color="secondary"
            >
              <IoCartOutline style={commonStyles.iconButton} />
            </Badge>
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={commonStyles.text}>Cart</Typography>
          </Box>
        </Box>
      </Box>
    </Toolbar>
  );

  const mobileHeader = (
    <>
      <Box
        sx={{
          paddingBottom: "0.75rem",
          background: "linear-gradient(rgb(255, 231, 168), rgb(255, 231, 168))",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingTop: "1.25rem",
            paddingBottom: "0.75rem",
            columnGap: "0.75rem",
            paddingX: "1rem",
          }}
        >
          {!user?.isAuth ? (
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                rowGap: "0.25rem",
                alignItems: "center",
                minWidth: "max-content",
              }}
            >
              <IconButton onClick={() => openModal(true)}>
                <HiOutlineUserCircle style={commonStyles.iconButton} />
              </IconButton>
            </Box>
          ) : (
            <Link to="/account">
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "0.25rem",
                  alignItems: "center",
                  minWidth: "max-content",
                }}
              >
                <HiOutlineUserCircle style={commonStyles.iconButton} />
              </Box>
            </Link>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flexGrow: "1",
              flexBasis: "0%",
              flexShrink: "1",
              height: "2.75rem",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "0.25rem",
              }}
            >
              <Typography
                sx={{
                  color: "#000",
                  fontSize: "1.125rem",
                  lineHeight: "1.25rem",
                }}
                variant="body1"
              >
                Delivery in{" "}
                <span style={{ fontWeight: "800", color: "#000" }}>
                  30 - 35 Mins
                </span>
              </Typography>
            </Box>
            <Box
              sx={{
                textTransform: "none",
                display: "flex",
                backgroundColor: "transparent",
                backgroundImage: "none",
                alignItems: "center",
                fontWeight: "600",
                cursor: "pointer",
                padding: "0px",
                border: "none",
              }}
              component={"button"}
              onClick={openLocation}
            >
              <Typography
                sx={{
                  maxWidth: "200px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  textWrap: "nowrap",
                  fontSize: "0.8125rem",
                  color: "#000",
                  lineHeight: "1.43rem",
                }}
              >
                {userAddresses && userAddresses.length > 0
                  ? `Flat No: ${userAddresses[0]?.flatNumber}, ${userAddresses[0]?.wing} Wing, ${userAddresses[0]?.society}`
                  : "Select Location"}
              </Typography>
              <KeyboardArrowDownIcon sx={{ color: "#000" }} />
            </Box>
          </Box>
          <IconButton onClick={() => toggleDrawer(true)}>
            <Badge
              badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)}
              color="secondary"
            >
              <IoCartOutline style={commonStyles.iconButton} />
            </Badge>
          </IconButton>
        </Box>

        <Box sx={{ paddingX: "1rem", opacity: "1" }}>
        <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingY: { xs: "0.5rem", sm: "0.75rem", md: "1rem" },
        paddingX: { xs: "0.5rem", sm: "1rem" },
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
        columnGap: "1rem",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        width: { xs: "100%", sm: "100%"},
      }}
    >
      <IoSearch
        style={{
          fontSize: "1.2rem",
          color: "rgb(55 65 81)",
        }}
      />
      <TextField
        placeholder="Search for items"
        variant="standard"
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          flex: "1",
          fontSize: { xs: "0.8rem", sm: "0.9375rem" },
          fontWeight: "400",
          color: "rgb(55 65 81)",
        }} 
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
      />
    </Box>
          
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <Box component={"header"} sx={isDesktop ? undefined : headerStyle}>
        {isDesktop ? desktopHeader : mobileHeader}
      </Box>

      <LoginDrawer
        openDrawer={loginDrawer}
        closeLoginDrawer={() => toggleDrawer(false)}
      />

      <LoginModal openModal={loginModal} closeModal={() => openModal(false)} />

      <Location
        openModal={showLocation}
        closeModal={() => setShowLocation(false)}
      />

      {showCartModal && !isDesktop && cart.cartItems.length > 0&& (
  
        <Box component={'a'} onClick={()=>setLoginDrawer(true)} sx={{cursor:'pointer'}}>
        <CartStickyModal/>  
        </Box>
      )}
    </>
  );
};

export default Header;
