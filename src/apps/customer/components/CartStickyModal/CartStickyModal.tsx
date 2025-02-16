import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import bagIcon from '/images/icons/shoppingBag.svg'

interface RootState {
    cart: {
      cartItems: { qty: number }[]; 
      totalPrice:string
    };
  }
  
    const cardModalStyle = {
      position: "fixed",
      padding: "0.75rem",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderTopLeftRadius: "0.375rem",
      borderTopRightRadius: "0.375rem",
      zIndex: 105,
      height: "fit-content",
      width: "100%", 
    };
const CartStickyModal = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const { cartItems } = cart;
  return (
    <Box sx={cardModalStyle}>
    <Box>
      <Box sx={{display:'flex',marginX:'auto',marginTop:'1.25rem',paddingY:'0.75rem',paddingX:"1rem",backgroundColor:"rgba(239,67,114,1)",borderRadius:"0.5rem",width:'100%',justifyContent:"space-between",alignItems:'center',color:"#fff"}}>
       <Box sx={{display:'flex',justifyContent:'flex-start',verticalAlign:"middle",width:"12rem"}}>
        <Typography>{cartItems.reduce((acc,item)=>acc+item.qty,0)} items</Typography>
        <Typography sx={{marginX:"0.3rem"}}>|</Typography>
        <Typography>₹{cart.totalPrice}</Typography>
       </Box>
       <Box sx={{display:'flex',alignItems:'center',width:"6.1rem"}}>  
        <img src={bagIcon} alt="Shopping Bag" />
        <Typography sx={{fontSize:"1rem",lineHeight:"1.5rem",marginTop:'0.25rem',display:'block',fontWeight:"400"}}>View Cart</Typography>
       </Box>
      </Box>
    </Box>
</Box>
  )
}

export default CartStickyModal