import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material"; // Import Material-UI components
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
} from "@mui/icons-material"; // Import Material-UI icons
import { crimson } from "../../constants/color"; // Import a custom color
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { lazy, Suspense, useState } from "react"; // Import React utilities
import axios from "axios";
import server from "../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userNotExists } from "../../redux-toolkit/reducers/reducerAuth";
import {
  setIsMobileMenu,
  setIsNotifications,
  setIsSearch,
} from "../../redux-toolkit/reducers/misc";
import { decrementNotificationCount } from "../../redux-toolkit/reducers/chat";

// Lazy load components
const SearchDialouge = lazy(() => import("../specific/SearchDialouge"));
const NotificationsDialouge = lazy(() => import("../specific/Notifications"));
const NewGroupDialouge = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate(); // Initialize navigation
  const dispatch = useDispatch();
  const theme = useTheme();

  const { isSearch, isNotifications } = useSelector((state) => state.misc);

  const { notificationCount } = useSelector((state) => state.chat);

  const [isNewGroup, setIsNewGroup] = useState(false);

  const handleOnMobile = () => {
    dispatch(setIsMobileMenu(true));
  };
  const openSearch = () => {
    dispatch(setIsSearch(true));
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const seeNotification = () => {
    dispatch(setIsNotifications(true));
    dispatch(decrementNotificationCount());
  };

  const navigateToGroup = () => {
    navigate("/groups");
  };

  const logoutUser = async () => {
    try {
      const { data } = await axios.post(`${server}/api/v1/auth/logout`, null, {
        withCredentials: true,
      });

      if (data.success) {
        dispatch(userNotExists());
        toast.success("User logged out successfully.");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Unexpected error occurred. Please try again later.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: theme.palette.mode === "dark" ? "#1E1E1E" : crimson,
            boxShadow: "none", // Removing default shadow
            borderBottom: "1px solid",
            borderColor: theme.palette.divider, // Subtle border for separation
          }}
        >
          <Toolbar sx={{ px: 2 }}>
            {/* App Icon and Name */}
            <Typography
              fontSize={"1.8rem"}
              fontWeight={"bold"}
              color={"#fff"}
              variant="h1"
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: "8px", // Space between icon and text
                cursor: "pointer",
                "& .app-icon": {
                  fontSize: "30px",
                  color: "white",
                },
              }}
              onClick={() => navigate("/")} // Clicking on logo navigates to home
            >
              <ChatIcon sx={{ fontSize: "2.2rem" }} /> CHATHUB
            </Typography>

            {/* Mobile Menu Icon */}
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleOnMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Action Buttons */}
            <Box>
              <IconBtn
                icon={<SearchIcon />}
                title={"Search"}
                onClick={openSearch}
              />
              <IconBtn
                icon={<AddIcon />}
                title={"New Group"}
                onClick={openNewGroup}
              />
              <IconBtn
                icon={<GroupIcon />}
                title={"Manage Groups"}
                onClick={navigateToGroup}
              />
              <IconBtn
                icon={<NotificationsIcon />}
                title={"Notifications"}
                onClick={seeNotification}
                value={notificationCount}
              />
              <IconBtn
                icon={<LogoutIcon />}
                title={"Logout"}
                onClick={logoutUser}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Modals */}
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialouge />
        </Suspense>
      )}
      {isNotifications && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationsDialouge />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialouge />
        </Suspense>
      )}
    </>
  );
};

// Icon Button Component with Enhanced UI
const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        color="inherit"
        size="large"
        onClick={onClick}
        sx={{
          transition:
            "transform 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            color: "#1DE9B6", // Bright highlight color on hover
            transform: "scale(1.2)", // Increase icon size on hover
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Enhanced shadow effect
          },
          "&:active": {
            transform: "scale(1.1)", // Slightly reduce size when clicked
            color: "#00BFA5", // Darker color when clicked
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Reduced shadow on click
          },
        }}
      >
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;

// import React, { lazy, Suspense, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Box,
//   Tooltip,
//   Avatar,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
//   useTheme,
//   useMediaQuery,
//   Drawer,
//   List,
//   ListItem,
//   Divider,
//   styled,
//   Badge,
// } from "@mui/material";
// import {
//   Menu as MenuIcon,
//   Search as SearchIcon,
//   Add as AddIcon,
//   Group as GroupIcon,
//   Notifications as NotificationsIcon,
//   Chat as ChatIcon,
//   Logout as LogoutIcon,
//   AccountCircle as AccountCircleIcon,
//   Close as CloseIcon,
// } from "@mui/icons-material";
// import { userNotExists } from "../../redux-toolkit/reducers/reducerAuth";
// import {
//   setIsMobileMenu,
//   setIsNotifications,
//   setIsSearch,
// } from "../../redux-toolkit/reducers/misc";
// import server from "../../constants/config";
// import toast from "react-hot-toast";

// const SearchDialogue = lazy(() => import("../specific/SearchDialouge"));
// const NotificationsDialogue = lazy(() => import("../specific/Notifications"));
// const NewGroupDialogue = lazy(() => import("../specific/NewGroup"));

// // Styled components for enhanced sidebar
// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   "& .MuiDrawer-paper": {
//     width: "280px",
//     backgroundColor: theme.palette.mode === "dark" ? "#1A1A2E" : "#f8f8f8",
//     color: theme.palette.text.primary,
//   },
// }));

// const SidebarHeader = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   padding: theme.spacing(2),
//   backgroundColor: theme.palette.mode === "dark" ? "#111122" : "#e8e8e8",
// }));

// const SidebarListItem = styled(ListItem)(({ theme }) => ({
//   borderRadius: theme.shape.borderRadius,
//   "&:hover": {
//     backgroundColor:
//       theme.palette.mode === "dark"
//         ? "rgba(255, 255, 255, 0.08)"
//         : "rgba(0, 0, 0, 0.04)",
//   },
// }));

// const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const { isSearch, isNotifications } = useSelector((state) => state.misc);
//   const { notificationCount } = useSelector((state) => state.chat);
//   // console.log(notificationCount); // Should print the updated value

//   const [isNewGroup, setIsNewGroup] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);
//   const openSearch = () => dispatch(setIsSearch(true));
//   const openNewGroup = () => setIsNewGroup((prev) => !prev);
//   const seeNotification = () => dispatch(setIsNotifications(true));
//   const navigateToGroup = () => navigate("/groups");

//   const logoutUser = async () => {
//     try {
//       const { data } = await axios.post(`${server}/api/v1/auth/logout`, null, {
//         withCredentials: true,
//       });
//       if (data.success) {
//         dispatch(userNotExists());
//         toast.success("User logged out successfully.");
//       } else {
//         toast.error("Logout failed. Please try again.");
//       }
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || "Unexpected error occurred."
//       );
//     }
//     handleMenuClose();
//   };

//   const menuItems = [
//     { icon: <SearchIcon />, title: "Search", onClick: openSearch },
//     { icon: <AddIcon />, title: "New Group", onClick: openNewGroup },
//     { icon: <GroupIcon />, title: "Manage Groups", onClick: navigateToGroup },
//     {
//       icon: <NotificationsIcon />,
//       title: "Notifications",
//       onClick: seeNotification,
//       value: notificationCount,
//     },
//   ];

//   const renderMobileMenu = () => (
//     <StyledDrawer
//       anchor="right"
//       open={mobileMenuOpen}
//       onClose={handleMobileMenuToggle}
//     >
//       <SidebarHeader>
//         <Typography
//           variant="h6"
//           component="div"
//           sx={{ display: "flex", alignItems: "center" }}
//         >
//           <ChatIcon sx={{ mr: 1 }} />
//           CHATHUB
//         </Typography>
//         <IconButton onClick={handleMobileMenuToggle} edge="end">
//           <CloseIcon />
//         </IconButton>
//       </SidebarHeader>
//       <Divider />
//       <List sx={{ p: 2 }}>
//         {menuItems.map((item) => (
//           <SidebarListItem
//             button
//             key={item.title}
//             onClick={() => {
//               item.onClick();
//               handleMobileMenuToggle();
//             }}
//             sx={{ mb: 1 }}
//           >
//             <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </SidebarListItem>
//         ))}
//         <Divider sx={{ my: 2 }} />
//         <SidebarListItem
//           button
//           onClick={() => {
//             navigate("/profile");
//             handleMobileMenuToggle();
//           }}
//         >
//           <ListItemIcon sx={{ minWidth: 40 }}>
//             <AccountCircleIcon />
//           </ListItemIcon>
//           <ListItemText primary="Profile" />
//         </SidebarListItem>
//         <SidebarListItem
//           button
//           onClick={() => {
//             logoutUser();
//             handleMobileMenuToggle();
//           }}
//         >
//           <ListItemIcon sx={{ minWidth: 40 }}>
//             <LogoutIcon />
//           </ListItemIcon>
//           <ListItemText primary="Logout" />
//         </SidebarListItem>
//       </List>
//     </StyledDrawer>
//   );

//   return (
//     <>
//       <AppBar
//         position="static"
//         elevation={0}
//         sx={{
//           bgcolor: theme.palette.mode === "dark" ? "#1A1A2E" : "#3498db",
//           borderBottom: "1px solid",
//           borderColor: theme.palette.divider,
//         }}
//       >
//         <Toolbar
//           sx={{
//             justifyContent: "space-between",
//             height: { xs: "56px", sm: "64px" },
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Typography
//               variant="h6"
//               noWrap
//               component="div"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 fontWeight: 700,
//                 letterSpacing: ".1rem",
//                 color: "inherit",
//                 textDecoration: "none",
//                 cursor: "pointer",
//                 fontSize: { xs: "1.1rem", sm: "1.25rem" },
//               }}
//               onClick={() => navigate("/")}
//             >
//               <ChatIcon
//                 sx={{ mr: 1, fontSize: { xs: "1.5rem", sm: "1.75rem" } }}
//               />
//               CHATHUB
//             </Typography>
//           </Box>

//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             {!isMobile &&
//               menuItems.map((item) => (
//                 <IconBtn
//                   key={item.title}
//                   icon={item.icon}
//                   title={item.title}
//                   onClick={item.onClick}
//                   value={item?.title === "Notifications" ? item?.value : null}
//                   // value={1}
//                 />
//               ))}

//             {!isMobile && (
//               <Tooltip title="Account settings">
//                 <IconButton
//                   onClick={handleMenuOpen}
//                   size="small"
//                   sx={{ ml: 2 }}
//                 >
//                   <Avatar
//                     sx={{
//                       width: 32,
//                       height: 32,
//                       bgcolor: theme.palette.secondary.main,
//                     }}
//                   >
//                     <AccountCircleIcon />
//                   </Avatar>
//                 </IconButton>
//               </Tooltip>
//             )}

//             {isMobile && (
//               <IconButton
//                 color="inherit"
//                 onClick={handleMobileMenuToggle}
//                 sx={{ ml: 1 }}
//               >
//                 <MenuIcon />
//               </IconButton>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//         onClick={handleMenuClose}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             overflow: "visible",
//             filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//             mt: 1.5,
//             "& .MuiAvatar-root": {
//               width: 32,
//               height: 32,
//               ml: -0.5,
//               mr: 1,
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//       >
//         <MenuItem onClick={() => navigate("/profile")}>
//           <ListItemIcon>
//             <AccountCircleIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText>Profile</ListItemText>
//         </MenuItem>
//         <MenuItem onClick={logoutUser}>
//           <ListItemIcon>
//             <LogoutIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText>Logout</ListItemText>
//         </MenuItem>
//       </Menu>

//       {renderMobileMenu()}

//       {isSearch && (
//         <Suspense fallback={<div>Loading...</div>}>
//           <SearchDialogue />
//         </Suspense>
//       )}
//       {isNotifications && (
//         <Suspense fallback={<div>Loading...</div>}>
//           <NotificationsDialogue />
//         </Suspense>
//       )}
//       {isNewGroup && (
//         <Suspense fallback={<div>Loading...</div>}>
//           <NewGroupDialogue />
//         </Suspense>
//       )}
//     </>
//   );
// };

// const IconBtn = ({ title, icon, onClick, value }) => {
//   return (
//     <Tooltip title={title} arrow>
//       <IconButton
//         color="inherit"
//         onClick={onClick}
//         sx={{
//           transition: "all 0.3s ease",
//           "&:hover": {
//             transform: "translateY(-2px)",
//             color: "#FFF",
//             backgroundColor: "rgba(255, 255, 255, 0.1)",
//           },
//         }}
//       >
//         {title === "Notifications" && value > 0 ? (
//           <Badge badgeContent={value} color="error">
//             {icon}
//           </Badge>
//         ) : (
//           icon
//         )}
//       </IconButton>
//     </Tooltip>
//   );
// };

// export default Header;
