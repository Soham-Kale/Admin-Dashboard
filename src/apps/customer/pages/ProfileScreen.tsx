import {
  AppBar,
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../../../core/store/slices/usersApiSlice";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { setAuth } from "../../../core/store/slices/authSlice";


interface RootState {
  
  auth: {
    user: {
      _id: string;
      name: string;
      isAdmin: boolean;
      isAuth: boolean;
      email:string
    } 
  };
}
 

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state:RootState) => state.auth);
  const [updatedName, setUpdatedName] = useState("");
  const [newEmail,setNewEmail]= useState('');
  const [updateUserProfile, { isLoading }] = useProfileMutation();
  const dispatch = useDispatch();

  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!updatedName || !newEmail) {
        return;
      }
      const response = await updateUserProfile({
        name: updatedName,
        email:newEmail
      }).unwrap();
      dispatch(
        setAuth({
          ...user,
          name: response.name,
          email:response.email,
        })
      );
    } catch (error) {
      console.error("Error while updating profile in profile section", error);
    }
  };
  useEffect(() => {
    if (user.name|| user.email) {
      setUpdatedName(user.name);
      setNewEmail(user.email);
    }
  }, [user]);
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
            Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Box sx={{ height: "100%", width: "100vw", padding: "1.2rem" }}>
          <Box component={'form'} onSubmit={handleSubmit}>
            <Box
              component="label"
              sx={{
                paddingLeft: "0.25rem",
                fontSize: "0.9375rem",
                lineHeight: "1.25rem",
                marginY: "0.625rem",
              }}
            >
              Name *
            </Box>

            <Box
              sx={{
                position: "relative",
                marginBottom: "1rem",
                display: "flex",
                width: "100%",
                alignItems: "center",
              }}
            >
              <TextField
                variant="outlined"
                sx={{
                  paddinY: "0.75rem",
                  fontWeight: "450",
                  outline: "red",
                  flexGrow: "1",
                }}
                value={updatedName}
                onChange={(e) => {
                  console.log(e.target.value);
                  setUpdatedName(e.target.value);
                }}
              />
            </Box>
          </Box>
          <Box>
            <Box
              component="label"
              sx={{
                paddingLeft: "0.25rem",
                fontSize: "0.9375rem",
                lineHeight: "1.25rem",
                marginY: "0.625rem",
              }}
            >
              Email Address *
            </Box>
            <Box
              sx={{
                position: "relative",
                marginBottom: "1rem",
                display: "flex",
                width: "100%",
                alignItems: "center",
              }}
            >
              <TextField
                required={true}
                variant="outlined"
                sx={{
                  paddinY: "0.75rem",
                  fontWeight: "450",
                  outline: "red",
                  flexGrow: "1",
                  lineHeight: "0.25rem",
                  fontSize: "0.25rem",
                }}
                value={newEmail}
                onChange={(e)=>{setNewEmail(e.target.value)}}
              />
            </Box>
            <Typography
              sx={{
                marginTop: "0.25rem",
                fontSize: "0.8125rem",
                lineHeight: "1rem",
              }}
            >
              We promise not to spam you
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Button
                disabled={updatedName === user.name && newEmail===user.email }
                sx={{
                  marginTop: "1.5rem",
                  borderRadius: "0.375rem",
                  paddingY: "0.75rem",
                  paddingX: "1.75rem",
                  backgroundColor: "#EF4372",
                  color: "#FFFFFF",
                  textTransform: "capitalize",
                  fontSize: "0.925rem",
                  letterSpacing: "2px",
                  lineHeight: "1.125rem",
                  ":disabled":{backgroundColor:"#AEAEAE"}
                }}
                fullWidth
                  type="submit"
              >
                {isLoading ? <Spinner /> : "Submit"}{" "}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileScreen;
