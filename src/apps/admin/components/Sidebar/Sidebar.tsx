import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ArrowDropDownCircleOutlined, NotificationsNone } from '@mui/icons-material';
import barne from "../../../../assets/logo.png";
import { Avatar, Badge, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 300;

export default function Admin() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const location = useLocation();

  const handleDrawerClose = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // const isActiveRoute = (path: string) => {
  //   return location.pathname === path || location.pathname.startsWith(path);
  // };

  const isActiveRoute = (path: string) => location.pathname === path;

  const menuItems = [
    {
      title: "Dashboard", path: "/", iconName: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6.5C3 3.87479 3.02811 3 6.5 3C9.97189 3 10 3.87479 10 6.5C10 9.12521 10.0111 10 6.5 10C2.98893 10 3 9.12521 3 6.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14 6.5C14 3.87479 14.0281 3 17.5 3C20.9719 3 21 3.87479 21 6.5C21 9.12521 21.0111 10 17.5 10C13.9889 10 14 9.12521 14 6.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.5C3 14.8748 3.02811 14 6.5 14C9.97189 14 10 14.8748 10 17.5C10 20.1252 10.0111 21 6.5 21C2.98893 21 3 20.1252 3 17.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14 17.5C14 14.8748 14.0281 14 17.5 14C20.9719 14 21 14.8748 21 17.5C21 20.1252 21.0111 21 17.5 21C13.9889 21 14 20.1252 14 17.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      )
    },
    {
      title: "Product Management", path: "/admin/product", iconName: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V7.99999C20.9996 7.64927 20.9071 7.3048 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.26999L13 2.26999C12.696 2.09446 12.3511 2.00204 12 2.00204C11.6489 2.00204 11.304 2.09446 11 2.26999L4 6.26999C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.3048 3.00036 7.64927 3 7.99999V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3.27 6.96001L12 12.01L20.73 6.96001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 22.08V12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      )
    },
    {
      title: "Order Management", path: "/admin/order", iconName: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5137 21.5H8.1659C5.09954 21.5 2.74714 20.3924 3.41533 15.9348L4.19336 9.89357C4.60526 7.66931 6.02403 6.81805 7.26888 6.81805H17.4474C18.7105 6.81805 20.0469 7.73339 20.5229 9.89357L21.3009 15.9348C21.8684 19.889 19.5801 21.5 16.5137 21.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M16.651 6.59839C16.651 4.21232 14.7167 2.27802 12.3307 2.27802V2.27802C11.1817 2.27315 10.0781 2.72618 9.26386 3.53694C8.44967 4.34769 7.99198 5.44938 7.99199 6.59839H7.99199" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M15.2963 11.1018H15.2506" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M9.46568 11.1018H9.41991" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      )
    },
    {
      title: "Customer Management", path: "/admin/customer", iconName: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5915 13.2068C11.2805 13.2068 14.4335 13.7658 14.4335 15.9988C14.4335 18.2318 11.3015 18.8068 7.5915 18.8068C3.9015 18.8068 0.7495 18.2528 0.7495 16.0188C0.7495 13.7848 3.8805 13.2068 7.5915 13.2068Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5915 10.0198C5.1695 10.0198 3.2055 8.05679 3.2055 5.63479C3.2055 3.21279 5.1695 1.24979 7.5915 1.24979C10.0125 1.24979 11.9765 3.21279 11.9765 5.63479C11.9855 8.04779 10.0355 10.0108 7.6225 10.0198H7.5915Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14.4831 8.88159C16.0841 8.65659 17.3171 7.28259 17.3201 5.61959C17.3201 3.98059 16.1251 2.62059 14.5581 2.36359" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M16.5954 12.7322C18.1464 12.9632 19.2294 13.5072 19.2294 14.6272C19.2294 15.3982 18.7194 15.8982 17.8954 16.2112" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      )
    },
    {
      title: "Delivery Locations", path: "/admin/deliverylocation", iconName: (
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.0231 21.9273C10.6116 22.3532 10.2615 22.7028 10 22.9593C9.7385 22.7028 9.38836 22.3532 8.97687 21.9273C8.05015 20.9681 6.81643 19.6263 5.58473 18.0928C4.35097 16.5568 3.13178 14.844 2.22426 13.1424C1.30982 11.4278 0.75 9.79457 0.75 8.4C0.75 4.28741 4.75781 0.75 10 0.75C15.2422 0.75 19.25 4.28741 19.25 8.4C19.25 9.79457 18.6902 11.4278 17.7757 13.1424C16.8682 14.844 15.649 16.5568 14.4153 18.0928C13.1836 19.6263 11.9499 20.9681 11.0231 21.9273ZM5.67857 8.4C5.67857 10.5874 7.74219 12.15 10 12.15C12.2578 12.15 14.3214 10.5874 14.3214 8.4C14.3214 6.21259 12.2578 4.65 10 4.65C7.74219 4.65 5.67857 6.21259 5.67857 8.4Z" stroke="white" stroke-width="1.5" />
        </svg>
      )
    },
    {
      title: "Reports", path: "/admin/reports", iconName: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4189 15.7321C21.4189 19.3101 19.3099 21.4191 15.7319 21.4191H7.9499C4.3629 21.4191 2.2499 19.3101 2.2499 15.7321V7.93209C2.2499 4.35909 3.5639 2.25009 7.1429 2.25009H9.1429C9.8609 2.25109 10.5369 2.58809 10.9669 3.16309L11.8799 4.37709C12.3119 4.95109 12.9879 5.28909 13.7059 5.29009H16.5359C20.1229 5.29009 21.4469 7.11609 21.4469 10.7671L21.4189 15.7321Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M7.481 14.463H16.216" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      )
    },
    {
      title: "Setting", path: "/admin/setting", iconName: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.53245 2.937L2.70726 3.66634C2.8034 3.6433 2.88883 3.64674 2.9792 3.6765L5.13369 4.56801L5.52185 4.72863L5.86158 4.48155C6.02412 4.36334 6.19465 4.25208 6.37336 4.14783C6.54651 4.04683 6.7167 3.96198 6.88392 3.89231L7.28384 3.72567L7.33929 3.29598L7.63888 0.974123C7.63893 0.973721 7.63898 0.97332 7.63904 0.97292C7.64955 0.895579 7.67534 0.850066 7.72496 0.804955C7.76887 0.765039 7.80517 0.75 7.87045 0.75H11.6205C11.6857 0.75 11.722 0.765039 11.766 0.804955C11.8156 0.850057 11.8413 0.895562 11.8519 0.97288C11.8519 0.973294 11.852 0.973709 11.852 0.974124L12.1516 3.29598L12.2088 3.73948L12.6262 3.90001C12.8024 3.96779 12.9663 4.04821 13.1188 4.14084C13.2923 4.24668 13.4625 4.36022 13.6293 4.48155L13.9691 4.72863L14.3572 4.56801L16.5115 3.67658C16.5945 3.64942 16.6641 3.64963 16.7394 3.67114C16.7815 3.68318 16.8138 3.70103 16.852 3.7606L18.6949 6.97319L18.7006 6.98322L18.7067 6.99307C18.7405 7.04798 18.7479 7.08827 18.735 7.15292C18.7204 7.22592 18.6946 7.26311 18.6455 7.3L18.6454 7.29999L18.6416 7.30288L16.7666 8.72788L16.4156 8.99463L16.478 9.43106C16.4901 9.51574 16.4955 9.59253 16.4955 9.662V10.337C16.4955 10.3684 16.4907 10.4116 16.4743 10.469L16.3335 10.9619L16.7416 11.2721L18.6166 12.6971L18.6166 12.6971L18.6205 12.7C18.6696 12.7369 18.6954 12.7741 18.71 12.8471C18.7229 12.9117 18.7155 12.952 18.6817 13.0069L18.6763 13.0157L18.6712 13.0246L16.8276 16.2135C16.79 16.2723 16.7503 16.3015 16.6861 16.3217C16.6019 16.3475 16.5343 16.3464 16.4633 16.324L14.363 15.4344L13.9724 15.269L13.6293 15.5184C13.4668 15.6367 13.2963 15.7479 13.1176 15.8522C12.9444 15.9532 12.7742 16.038 12.607 16.1077L12.2071 16.2743L12.1516 16.704L11.852 19.0259C11.852 19.0263 11.8519 19.0267 11.8519 19.0271C11.8414 19.1044 11.8156 19.1499 11.766 19.195C11.722 19.235 11.6857 19.25 11.6205 19.25H7.87045C7.80517 19.25 7.76887 19.235 7.72496 19.195C7.67533 19.1499 7.64955 19.1044 7.63903 19.0271C7.63898 19.0267 7.63893 19.0263 7.63888 19.0259L7.33929 16.704L7.28206 16.2605L6.86469 16.1C6.68863 16.0323 6.52536 15.952 6.37391 15.8597L6.37292 15.8591C6.19877 15.7532 6.02833 15.6397 5.86158 15.5184L5.52185 15.2714L5.13369 15.432L2.9794 16.3234C2.89639 16.3506 2.82678 16.3504 2.7515 16.3289C2.70937 16.3168 2.67716 16.299 2.63891 16.2394L0.796015 13.0268L0.79026 13.0168L0.784198 13.0069C0.750409 12.952 0.742962 12.9117 0.75589 12.8471C0.770491 12.7741 0.796269 12.7369 0.845454 12.7L0.845463 12.7L0.849267 12.6971L2.72427 11.2721L3.07526 11.0054L3.01292 10.5689C3.00085 10.4845 2.99545 10.4073 2.99545 10.337V9.662C2.99545 9.59253 3.00082 9.51574 3.01292 9.43107L3.07526 8.99464L2.72427 8.72788L0.849267 7.30288L0.849276 7.30287L0.845455 7.3C0.796268 7.26311 0.770491 7.22592 0.75589 7.15291C0.742962 7.08827 0.750409 7.04798 0.784198 6.99307L0.79026 6.98322L0.796015 6.97319L2.64602 3.74819L2.65669 3.72959L2.66627 3.71041C2.67914 3.68468 2.68841 3.67443 2.69097 3.67194C2.69109 3.67188 2.69126 3.67179 2.69148 3.67169C2.69282 3.67103 2.69824 3.66854 2.70962 3.66578L2.53245 2.937ZM2.53245 2.937C2.29112 2.99567 2.11212 3.14167 1.99545 3.375L3.24545 2.975C3.01212 2.89167 2.77445 2.879 2.53245 2.937ZM6.77401 6.9978L6.77375 6.99806C5.95946 7.82281 5.54545 8.83755 5.54545 10C5.54545 11.1624 5.95946 12.1772 6.77375 13.0019L6.77401 13.0022C7.59392 13.8318 8.61697 14.25 9.79545 14.25C10.961 14.25 11.9768 13.8294 12.8008 13.0053C13.6248 12.1813 14.0455 11.1655 14.0455 10C14.0455 8.83449 13.6248 7.8187 12.8008 6.99467C11.9768 6.17064 10.961 5.75 9.79545 5.75C8.61697 5.75 7.59392 6.16818 6.77401 6.9978Z" stroke="white" stroke-width="1.5" />
        </svg>
      )
    },
  ]

  const drawer = (
    <Box style={{
      height: "100vh",
      backgroundColor: "#591849",
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '2rem',
      alignItems: 'center',
    }}>
      <img style={{
        height: "4.5re",
        width: "5.5rem"
      }} src={barne} alt="" />

      <List sx={{ gap: 10, width: '100%' }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 100,
              marginTop: 2,
              position: 'relative', // Added for absolute positioning of active indicator
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                backgroundColor: '#FFFFFF',
                opacity: isActiveRoute(item.path) ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }
            }}
            onClick={() => handleNavigation(item.path)}
          >

            <ListItemIcon
              sx={{
                color: "#FFFFFF",
                marginRight: -2,
                opacity: isActiveRoute(item.path) ? 1 : 0.7 // Optional: dim inactive icons
              }}
            >
              {item.iconName}
            </ListItemIcon>
            <Button
              onClick={() => handleNavigation(item.path)}
              sx={{
                color: "#FFFFFF",
                opacity: isActiveRoute(item.path) ? 1 : 0.7, // Optional: dim inactive text
                '&:hover': {
                  opacity: 1
                }
              }}
            >
              <ListItemText
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: isActiveRoute(item.path) ? 600 : 500, // Optional: bold active text
                  textAlign: 'left',
                }}
              >
                {item.title}
              </ListItemText>
            </Button>
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#EF4372", color: "black", marginTop: 6 }}
        endIcon={<ArrowDropDownCircleOutlined />}
      >
        Nik Shop
      </Button>
    </Box>
  );

  // Extract the last part of the pathname
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const pageTitle = pathSegments.length > 0
    ? pathSegments[pathSegments.length - 1].replace("-", " ") // Format for readability
    : "Dashboard"; // Default title

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white", // Change this to your desired color
          boxShadow: "none", // Optional: Remove shadow if needed
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

          <IconButton
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Left Side - Dashboard */}

          <Typography variant="h6" sx={{ color: "black" }}>
            {pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)}
          </Typography>

          {/* Center - Dropdown Button */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

            {/* Right Side - Notifications & Profile */}
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsNone sx={{ color: 'black' }} />
              </Badge>
            </IconButton>
            <Avatar sx={{ height: '2rem', width: '2rem' }} />
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
