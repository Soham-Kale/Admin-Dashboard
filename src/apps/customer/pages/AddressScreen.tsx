import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import locationMarker from '/images/icons/location-marker.svg'
import trash from '/images/icons/trash.svg'
import edit from '/images/icons/edit.svg'
import Loader from "../../../shared/components/Loader/Loader";
import { useEffect, useState } from "react";
import AddressForm from "../components/AddressForm/AddressForm";
import {  setAddress, setAuth } from "../../../core/store/slices/authSlice";
import { useProfileMutation } from "../../../core/store/slices/usersApiSlice";
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
  const { userAddresses } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedAddress, setSelectedAddress] = useState<AddressFormData | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [addresses, setAddresses] = useState<AddressFormData[]>(userAddresses || []);
  const [updateUser] = useProfileMutation();
  const dispatch = useDispatch();


  const isLoading = userAddresses === null;

  useEffect(() => {
    setAddresses(userAddresses || []);
  }, [userAddresses]);

  const handleEditAddress = (address: AddressFormData) => {
    setSelectedAddress(address);
    setOpenEditModal(true);
  };

  const handleUpdateAddress = async (updatedAddress: AddressFormData) => {
    try {
      const updatedAddresses = userAddresses.map(addr => 
        (addr.flatNumber === selectedAddress?.flatNumber &&
         addr.wing === selectedAddress?.wing &&
         addr.society === selectedAddress?.society)
          ? updatedAddress
          : addr
      );

      const response = await updateUser({ address: updatedAddresses }).unwrap();
      dispatch(setAuth({ ...user, address: response.address }));
      dispatch(setAddress(updatedAddresses));
      setOpenEditModal(false); 
    } catch (error) {
      console.error('Failed to update address');
    }
  };

  const handleDeleteAddress = async (addressToDelete: AddressFormData) => {
    try { 
      const updatedAddresses = userAddresses.filter(addr => 
        !(addr.flatNumber === addressToDelete.flatNumber &&
          addr.wing === addressToDelete.wing &&
          addr.society === addressToDelete.society)
      );
 
      const response =await updateUser({ 
        address: updatedAddresses.map(addr => ({
          flatNumber: addr.flatNumber,
          wing: addr.wing,
          society: addr.society
        }))
      }).unwrap();
 
      dispatch(setAddress(updatedAddresses));
      dispatch(setAuth({ ...user, address: response.address }));
    } catch (error) { 
      console.error('Failed to delete address:', error);
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
            {addresses && addresses.length > 0 ? (
              <>
                {addresses.map((address, index) => (
                  <Box sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', paddingTop: '1.8rem' }} key={index}>
                    <span style={{ marginLeft: '1.25rem' }}>
                      <img src={locationMarker} alt="" style={{ overflow: "hidden", maxWidth: "100%", height: 'auto', color: "transparent", objectFit: "contain" }} />
                    </span>
                    <Box sx={{ display: 'flex', marginLeft: "1rem", marginRight: '1.25rem', paddingBottom: '1rem', borderBottom: '0.4px solid #e5e7eb', width: "80%", justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant='h4' sx={{ fontSize: '1rem', lineHeight: '1.125rem', marginBottom: '0.35rem', letterSpacing: "0.025em", fontWeight: '700', color: "#000" }}>
                          Home
                        </Typography>
                        <Typography variant='body1' sx={{ fontSize: '0.875rem', lineHeight: '1.125rem', fontWeight: '400', color: "#2b1e3580", margin: 0, overflow: 'hidden' }}>
                          Flat No: {address.flatNumber}, {address.wing} Wing, {address.society}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: 'flex-end', alignItems: 'flex-end', marginLeft: "1.25rem" }}>
                        <Box sx={{ cursor: 'pointer', marginRight: "1.25rem" }}>
                          <img src={edit} alt="edit icon" onClick={() => handleEditAddress(address)} />
                        </Box>
                        <Box sx={{ cursor: 'pointer' }}>
                          <img src={trash} alt="trash icon" onClick={() => handleDeleteAddress(address)} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </>
            ) : (
              <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: '4rem' }}>
                <Typography sx={{ fontSize: "1.15rem" }}>Please Add your address</Typography>
              </Box>
            )}
          </>
        )}
      </Box>
      {openEditModal && (
        <AddressForm 
          open={openEditModal} 
          closeModal={() => setOpenEditModal(false)}
          onSubmit={handleUpdateAddress}
          editAddress={selectedAddress}
        />
      )}
    </Box>
  )
}

export default AddressScreen;