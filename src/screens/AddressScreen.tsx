import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import locationMarker from '/images/icons/location-marker.svg'
import trash from '/images/icons/trash.svg'
import edit from '/images/icons/edit.svg'
import Loader from "../shared/components/Loader/Loader";

interface RootState {
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
interface AddressFormData {
  society: string;
  wing: string;
  flatNumber: string;
}

const AddressScreen = () => {
  const navigate = useNavigate();
  const {userAddresses} = useSelector((state: RootState)=>state.auth);
const isLoading = userAddresses === null;

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
          boxShadow:'0 0 8px rgba(40, 44, 63, 0.2);'
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
          Addresses
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginBottom: '5rem' }}> 
        {isLoading ? (
          <Loader /> 
        ) : (
          <>
            {userAddresses && userAddresses.length > 0 ? (
              <>
                {userAddresses.map((address, index) => (
                  <Box sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', paddingTop: '1.8rem', textAlign: 'left' }} key={index}>
                    <span style={{ marginLeft: '1.25rem' }}>
                      <img src={locationMarker} alt="" style={{ overflow: "hidden", maxWidth: "100%", height: 'auto', color: "transparent", objectFit: "contain" }} />
                    </span>
                    <Box sx={{ display: 'flex', marginLeft: "1rem", marginRight: '1.25rem', paddingBottom: '1rem', borderBottom: '0.4px solid #e5e7eb', width: "80%", justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant='h4' sx={{ fontSize: '1rem', lineHeight: '1.125rem', marginBottom: '0.35rem', letterSpacing: "0.025em", fontWeight: '700', color: "#000" }}>Home</Typography>
                        <Typography variant='body1' sx={{ fontSize: '0.875rem', lineHeight: '1.125rem', fontWeight: '400', color: "#2b1e3580", margin: 0, overflow: 'hidden' }}>
                          Flat No: {address.flatNumber}, {address.wing} Wing, {address.society}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: 'flex-end', alignItems: 'flex-end', marginLeft: "1.25rem" }}>
                        <Box sx={{ cursor: 'pointer', marginRight: "1.25rem" }}>
                          <img src={edit} alt="edit icon" />
                        </Box>
                        <Box sx={{ cursor: 'pointer' }}>
                          <img src={trash} alt="trash icon" />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </>
            ) : (
              <Typography>Add your address</Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

export default AddressScreen;