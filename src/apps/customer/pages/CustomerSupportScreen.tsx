import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {  useNavigate } from "react-router-dom";
import { NavigateNextSharp } from "@mui/icons-material";

const CustomerSupportScreen = () => {
  const navigate = useNavigate();
  const supportList =[
    {title:"General Enquiry"},
    {title:"Payment Related"},
    {title:"Feedback Suggestions"},
    {title:"Order / Products Related"},
  ]
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
          Customer Support
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Box sx={{marginTop:"1rem",marginX:'1.25rem'}}>
            <Typography sx={{fontSize:'1.25rem',lineHeight:"1.75rem",width:"66.667%",marginBottom:"0.25rem",fontWeight:"650",color:"#000",fontFamily:"Inter"}} variant="h4">
              FAQs
            </Typography>
            <Box  sx={{listStyleType:'none'}}>
              {supportList.map((item,index)=>(
                <li key={index}>
                  <Box component='a' sx={{display:'flex',textDecoration:"none",paddingY:'1rem',justifyContent:'space-between',width:"100%",cursor:'pointer',alignItems:'center'}}>
                   <Typography sx={{fontSize:"1rem",fontWeight:'500',color:"#000",fontFamily:'Montserrat'}}> {item.title}</Typography>
                   <NavigateNextSharp  sx={{color:"#ff3269"}}/>
                  </Box>
                  <Box sx={{borderBottom:'0.5px solid rgb(229 ,231 ,235)',width:'100%'}}></Box>
                </li>
              ))}
            </Box>
        </Box>
      </Box>
      </Box>
  )
}

export default CustomerSupportScreen;