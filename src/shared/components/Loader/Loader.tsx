import {   Backdrop, Box, CircularProgress,   } from "@mui/material" 

const Loader  = () => {
  return (
    <>
    <Backdrop sx={{backgroundColor:"transparent", zIndex: (theme) => theme.zIndex.drawer + 1 ,opacity:'3'}} open={true}>
    <Box sx={{display:'flex',justifyContent:'center',alignItems:"center" }}>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE7A8" />
            <stop offset="100%" stopColor="#EF4372" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' }}} size={'4rem'} />
    </Box>
    </Backdrop>
    </>
  )
}

export default Loader