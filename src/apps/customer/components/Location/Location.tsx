import  { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  useMediaQuery,
  AppBar,
  Toolbar,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material"; 
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import locationMarker from "/images/icons/location-marker.svg"; 

import { useDispatch, useSelector } from "react-redux";
import { societies } from "../../../../shared/utils/societies";
import { useProfileMutation } from "../../../../core/store/slices/usersApiSlice";
import { setAddress, setAuth } from "../../../../core/store/slices/authSlice";
interface AddressFormData {
  society: string;
  wing: string;
  flatNumber: string;
}

interface RootState {
  auth: {
    user: {
      _id: string;
      name: string;
      phoneNumber: string;
      isAuth:boolean
    } | null
    userAddresses: AddressFormData[];
  };
}

interface LocationProps {
  openModal: boolean;
  closeModal: () => void;
}

const Location = ({ openModal, closeModal }: LocationProps) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { userAddresses } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.auth);
  const [society, setSociety] = useState("");
  const [wing, setWing] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [updateUser]= useProfileMutation();
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSociety(event.target.value);
  };

  const handleSave = async (e:React.FormEvent) => {
    e.preventDefault();
  
    if (society.trim() && wing.trim() && flatNumber.trim()) {
      const newAddress = { society, wing, flatNumber };
      try { 
        if(user?.isAuth){
          const response = await updateUser({
            address: [...(userAddresses || []), newAddress]
          }).unwrap();
          dispatch(setAddress(newAddress));
          dispatch(setAuth({
            ...user,
            address: response.address
          }));
          setSociety('');
          setFlatNumber('');
          setWing('');
          closeModal();
        }else{
          dispatch(setAddress(newAddress)); 
          setSociety('');
          setFlatNumber('');
          setWing('');
        }
      } catch (error) {
        console.error("Error updating address:", error);
      }
    } else {
      alert("Please enter a valid address.");
    }
  };

  const commonStyles = {
    position: "absolute",
    top: {xs:"50%",md:'40%'},
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : "30rem",
    height: isMobile ? "100%" : "40vh",
    color: "white",
    boxShadow: 24,
    borderRadius: isMobile ? 0 : "0.75rem",
    backgroundSize: "cover",
    backgroundColor: "white",
    overflow: "hidden",
   
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box
        sx={commonStyles}
        
      >
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: "white",
            boxShadow: "0 0 8px rgba(40, 44, 63, 0.2);",
           
          }}
        >
          <Toolbar variant="dense">
            <IconButton edge="start" onClick={closeModal}>
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
              Your Location
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{padding:"1rem",marginTop:"1rem"}}>
        {userAddresses && userAddresses.length > 0?(
          <>
           <Box sx={{marginBottom:"1rem"}}>
            <Typography variant="h5" sx={{color:"#000",marginBottom:'1rem',fontSize:'1.1rem',fontWeight:"700",letterSpacing:'0.04em',lineHeight:"1.5rem"}}>Saved Locations</Typography>
          </Box>
          
          {userAddresses.map((address,index)=>(
          <Box sx={{ marginBottom: "2rem",width:'100%' }} key={index}>
            <Box
              sx={{
                display: "flex",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "left",
              }}
            >
              <span >
                <img
                  src={locationMarker}
                  alt=""
                  style={{
                    overflow: "hidden",
                    maxWidth: "100%",
                    height: "auto",
                    color: "transparent",
                    objectFit: "contain",
                  }}
                />
              </span>
              <Box
                sx={{
                  display: "flex",
                  marginLeft: "1rem",
                  marginRight: "1.25rem",
                  paddingBottom: "1rem",
                  borderBottom: "0.4px solid #e5e7eb",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "1.125rem",
                      marginBottom: "0.35rem",
                      letterSpacing: "0.025em",
                      fontWeight: "700",
                      color: "#000",
                    }}
                  >
                    Home
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.875rem",
                      lineHeight: "1.125rem",
                      fontWeight: "400",
                      color: "#2b1e3580",
                      margin: 0,
                      overflow: "hidden",
                    }}
                  >
                       Flat No: {address?.flatNumber}, {address?.wing} Wing, {address?.society}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
            ))}
          </>
        ):('')}
         
          <Box>
            <Box>
              <Typography variant="h5" sx={{color:"#000",marginBottom:'1rem',fontSize:'1.1rem',fontWeight:"700",letterSpacing:'0.04em',lineHeight:"1.5rem"}}>All Locations</Typography>
            </Box>
            <Box sx={{ display: "flex", marginTop: "1rem", width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                
              >
                Choose Your society
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={society}
                label="Choose Your society"
                onChange={handleChange}
                sx={{
                  zIndex: 1000,
                  width: "100%",
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      zIndex: 1400,
                    },
                  },
                }}
              >
                {societies.map((society, index) => (
                  <MenuItem value={society.societyName} key={index}>
                    {society.societyName}
                  </MenuItem>
                ))}
              </Select>
              {society ? (
                <Box sx={{display:'flex',flexDirection:'column',marginY:'1.5rem'}}>
                  <Box>
                  <TextField
                    label="Wing/Phase"
                    variant="outlined"
                    sx={{
                      width:"100%",
                    }}
                    onChange={(e)=>{setWing(e.target.value)}}
                  />
                  </Box>
                  <Box sx={{marginY:'1.5rem'}}>
                  <TextField
                    label="Flat Number"
                    variant="outlined"
                    onChange={(e)=>{setFlatNumber(e.target.value)}}
                    sx={{
                      width:"100%",
                    }}
                  />
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center'}}> 
                    <Button variant="contained" sx={{backgroundColor:"rgb(239,67,114)",boxShadow:0}} disableElevation fullWidth onClick={handleSave}>Save</Button>
                  </Box>
                </Box>
              ) : (
                ""
              )}
            </FormControl>
          </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default Location;
