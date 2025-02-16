import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavigateNextSharp } from "@mui/icons-material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import profileIcon from "/images/icons/profile.svg";
import { useLogoutMutation, useProfileMutation } from "../../../core/store/slices/usersApiSlice";
import { logout, setAuth } from "../../../core/store/slices/authSlice";
import { profileItems } from "../../../shared/utils/profileItems";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

interface RootState {
  auth: {
    user: {
      _id: string;
      name: string;
      phoneNumber: string;
    };
  };
}
const AccountScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [updateUser, isLoading] = useProfileMutation();
  const [userName, setUserName] = useState("");
  const [logoutApiCall] = useLogoutMutation();
  const [openModal, setOpenModal] = useState(true);
  const handleLogout = async () => {
    try {
      await logoutApiCall({}).unwrap();
      localStorage.removeItem("user");
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleNameSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateUser({
        name: userName,
      }).unwrap();
      console.log(response)
      dispatch(
        setAuth({
          ...user, 
          name: response.name,
        })
      );
      setUserName('');
      setOpenModal(false);
    } catch (error) {
      console.error("Error while setting name in account",error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
          boxShadow: "0 0 2px 1px rgba(40, 44, 63, 0.2);",
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            onClick={() => {
              navigate("/");
            }}
          >
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
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ maxWidth: "80rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingBottom: "2.5rem",
          }}
        >
          <Box
            sx={{
              borderRadius: "0.5rem",
              display: "flex",
              flexDirection: "column",
              width: { lg: "90%", md: "100%", xs: "100%", sm: "100%" },
              height: "100%",
            }}
          >
            <Box sx={{ paddingX: "1rem" }}>
              <header>
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "0.75rem",
                    padding: "1.5rem",
                    borderTopLeftRadius: "0.75rem",
                    borderTopRightRadius: "0.75rem",
                  }}
                >
                  <img
                    src={profileIcon}
                    alt=""
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "0.25rem",
                      marginX: "0.675rem",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1.25rem",
                        lineHeight: "1.5rem",
                        fontWeight: "700",
                        color: "#000",
                      }}
                    >
                      {user.name}
                    </Typography>
                    <Typography variant="body1">{user.phoneNumber}</Typography>
                  </Box>
                </Box>
              </header>
              {profileItems.map((item, index) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(236, 236, 236, 1)",
                  }}
                  key={index}
                >
                  <img src={item.icon} alt={item.title} />
                  <Box
                    component="a"
                    sx={{
                      display: "flex",
                      height: "100%",
                      width: "100%",
                      cursor: "pointer",
                      justifyContent: "space-between",
                      overflow: "hidden",
                      padding: "1.25rem",
                      lineHeight: "1.25rem",
                      textDecoration: "none",
                    }}
                    href={item.route}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "0.875rem", fontFamily: "Montserrat" }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                  <NavigateNextSharp sx={{ color: "#ff3269" }} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            sx={{
              color: "rgba(239,67,114,1)",
              letterSpacing: "0.1em",
              fontSize: "0.775rem",
              lineHeight: "1.125rem",
              paddingX: "0.8rem",
              paddingY: "0.4rem",
              backgroundColor: "white",
              border: "1px solid rgba(236, 236, 236, 1)",
              textTransform: "capitalize",
              fontWeight: "500",
            }}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Box>
          {openModal &&(
            <>
        {!user.name  ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingX: 0,
              background: "rgba(0, 0, 0, .3)",
              flexDirection: "column",
              width: "110vw",
              position: "fixed",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              zIndex: 1300,
            }}
          >
            <Box
              sx={{
                top: "5rem",
                background: "#fff",
                position: "fixed",
                marginLeft: "0.625rem",
                display: "flex",
                width: "95%",
                maxWidth: "28rem",
                borderRadius: "0.5rem",
                padding: "1.5rem 1rem",
              }}
            >
              <Box
                sx={{
                  marginRight: "0.625rem",
                  width: "100%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></Box>
                <Box>
                  <Typography
                    sx={{
                      color: "#000",
                      fontWeight: "400",
                      fontSize: "1rem",
                      lineHeight: "1rem",
                      marginLeft: "0.15rem",
                    }}
                  >
                    Enter your details
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", width: "100%" }}>
                  <FormControl fullWidth>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginY: "1.5rem",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Enter your name"
                        variant="outlined"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "rgb(239,67,114)",
                          boxShadow: 0,
                        }}
                        disableElevation
                        fullWidth
                        onClick={handleNameSave}
                      >
                        {!isLoading?(<Spinner/>):('Save')} 
                      </Button>
                    </Box>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}
            </>
          )}
      </Box>
    </Box>
  );
};

export default AccountScreen;
