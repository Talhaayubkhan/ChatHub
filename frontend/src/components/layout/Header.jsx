// import {
//   AppBar,
//   Backdrop,
//   Badge,
//   Box,
//   IconButton,
//   Toolbar,
//   Tooltip,
//   Typography,
//   useTheme,
// } from "@mui/material"; // Import Material-UI components
// import {
//   Add as AddIcon,
//   Menu as MenuIcon,
//   Search as SearchIcon,
//   Group as GroupIcon,
//   Logout as LogoutIcon,
//   Notifications as NotificationsIcon,
//   Chat as ChatIcon,
// } from "@mui/icons-material"; // Import Material-UI icons
// import { crimson } from "../../constants/color"; // Import a custom color
// import { useNavigate } from "react-router-dom"; // Import navigation hook
// import { lazy, Suspense, useState } from "react"; // Import React utilities
// import axios from "axios";
// import server from "../../constants/config";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { userNotExists } from "../../redux-toolkit/reducers/reducerAuth";
// import {
//   setIsMobileMenu,
//   setIsNotifications,
//   setIsSearch,
// } from "../../redux-toolkit/reducers/misc";
// import { decrementNotificationCount } from "../../redux-toolkit/reducers/chat";

// // Lazy load components
// const SearchDialouge = lazy(() => import("../specific/SearchDialouge"));
// const NotificationsDialouge = lazy(() => import("../specific/Notifications"));
// const NewGroupDialouge = lazy(() => import("../specific/NewGroup"));

// const Header = () => {
//   const navigate = useNavigate(); // Initialize navigation
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   const { isSearch, isNotifications } = useSelector((state) => state.misc);

//   const { notificationCount } = useSelector((state) => state.chat);

//   const [isNewGroup, setIsNewGroup] = useState(false);

//   const handleOnMobile = () => {
//     dispatch(setIsMobileMenu(true));
//   };
//   const openSearch = () => {
//     dispatch(setIsSearch(true));
//   };
//   const openNewGroup = () => {
//     setIsNewGroup((prev) => !prev);
//   };
//   const seeNotification = () => {
//     dispatch(setIsNotifications(true));
//     dispatch(decrementNotificationCount());
//   };

//   const navigateToGroup = () => {
//     navigate("/groups");
//   };

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
//       const errorMessage =
//         error?.response?.data?.message ||
//         "Unexpected error occurred. Please try again later.";
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <>
//       <Box sx={{ flexGrow: 1 }} height={"4rem"}>
//         <AppBar
//           position="static"
//           sx={{
//             bgcolor: theme.palette.mode === "dark" ? "#1E1E1E" : crimson,
//             boxShadow: "none", // Removing default shadow
//             borderBottom: "1px solid",
//             borderColor: theme.palette.divider, // Subtle border for separation
//           }}
//         >
//           <Toolbar sx={{ px: 2 }}>
//             {/* App Icon and Name */}
//             <Typography
//               fontSize={"1.8rem"}
//               fontWeight={"bold"}
//               color={"#fff"}
//               variant="h1"
//               sx={{
//                 display: { xs: "none", sm: "flex" },
//                 alignItems: "center",
//                 gap: "8px", // Space between icon and text
//                 cursor: "pointer",
//                 "& .app-icon": {
//                   fontSize: "30px",
//                   color: "white",
//                 },
//               }}
//               onClick={() => navigate("/")} // Clicking on logo navigates to home
//             >
//               <ChatIcon sx={{ fontSize: "2.2rem" }} /> CHATHUB
//             </Typography>

//             {/* Mobile Menu Icon */}
//             <Box
//               sx={{
//                 display: { xs: "block", sm: "none" },
//               }}
//             >
//               <IconButton color="inherit" onClick={handleOnMobile}>
//                 <MenuIcon />
//               </IconButton>
//             </Box>

//             <Box sx={{ flexGrow: 1 }} />

//             {/* Action Buttons */}
//             <Box>
//               <IconBtn
//                 icon={<SearchIcon />}
//                 title={"Search"}
//                 onClick={openSearch}
//               />
//               <IconBtn
//                 icon={<AddIcon />}
//                 title={"New Group"}
//                 onClick={openNewGroup}
//               />
//               <IconBtn
//                 icon={<GroupIcon />}
//                 title={"Manage Groups"}
//                 onClick={navigateToGroup}
//               />
//               <IconBtn
//                 icon={<NotificationsIcon />}
//                 title={"Notifications"}
//                 onClick={seeNotification}
//                 value={notificationCount}
//               />
//               <IconBtn
//                 icon={<LogoutIcon />}
//                 title={"Logout"}
//                 onClick={logoutUser}
//               />
//             </Box>
//           </Toolbar>
//         </AppBar>
//       </Box>

//       {/* Modals */}
//       {isSearch && (
//         <Suspense fallback={<Backdrop open />}>
//           <SearchDialouge />
//         </Suspense>
//       )}
//       {isNotifications && (
//         <Suspense fallback={<Backdrop open />}>
//           <NotificationsDialouge />
//         </Suspense>
//       )}
//       {isNewGroup && (
//         <Suspense fallback={<Backdrop open />}>
//           <NewGroupDialouge />
//         </Suspense>
//       )}
//     </>
//   );
// };

// // Icon Button Component with Enhanced UI
// const IconBtn = ({ title, icon, onClick, value }) => {
//   return (
//     <Tooltip title={title} arrow>
//       <IconButton
//         color="inherit"
//         size="large"
//         onClick={onClick}
//         sx={{
//           transition:
//             "transform 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
//           "&:hover": {
//             color: "#1DE9B6", // Bright highlight color on hover
//             transform: "scale(1.2)", // Increase icon size on hover
//             boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Enhanced shadow effect
//           },
//           "&:active": {
//             transform: "scale(1.1)", // Slightly reduce size when clicked
//             color: "#00BFA5", // Darker color when clicked
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Reduced shadow on click
//           },
//         }}
//       >
//         {value ? (
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

import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  useMediaQuery,
  Fade,
  Menu,
  MenuItem,
  Button,
  ListItemIcon,
} from "@mui/material";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import {
  setIsMobileMenu,
  setIsNewGroup,
  setIsNotifications,
  setIsSearch,
} from "../../redux-toolkit/reducers/misc";
import { resetNotificationCount } from "../../redux-toolkit/reducers/chat.js";
import { userNotExists } from "../../redux-toolkit/reducers/reducerAuth";
import axios from "axios";
import server from "../../constants/config";
import toast from "react-hot-toast";

const SearchDialogue = lazy(() => import("../specific/SearchDialouge"));
const NotificationsDialogue = lazy(() => import("../specific/Notifications"));
const NewGroupDialogue = lazy(() => import("../specific/NewGroup"));

// Custom color palette
const colors = {
  primary: "#3A0CA3",
  secondary: "#4361EE",
  accent: "#7209B7",
  background: "#F0F4F8",
  text: "#2B2D42",
  lightText: "#FFFFFF",
  hover: "#4CC9F0",
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const { isSearch, isNotifications, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  // console.log(notificationCount);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleOnMobile = () => dispatch(setIsMobileMenu(true));
  const openSearch = () => {
    dispatch(setIsSearch(true));
    handleCloseMenu();
  };
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
    handleCloseMenu();
  };
  const seeNotification = () => {
    dispatch(setIsNotifications(true));
    dispatch(resetNotificationCount());
    handleCloseMenu();
  };
  const navigateToGroup = () => {
    navigate("/groups");
    handleCloseMenu();
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
    handleCloseMenu();
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: colors.primary,
          backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            height: { xs: "3rem", sm: "4rem", md: "4rem" },
            px: { xs: 1, sm: 2, md: 4 },
          }}
        >
          <Fade in timeout={1000}>
            <Box display="flex" alignItems="center">
              {isMobile && (
                <IconButton
                  color="inherit"
                  onClick={handleOnMobile}
                  edge="start"
                  sx={{ mr: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography
                variant={isMobile ? "h6" : "h5"}
                noWrap
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 800,
                  letterSpacing: { xs: ".1rem", sm: ".2rem" },
                  color: colors.lightText,
                  textDecoration: "none",
                  cursor: "pointer",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  "&:hover": {
                    color: colors.hover,
                    transition: "color 0.3s ease",
                  },
                }}
                onClick={() => navigate("/")}
              >
                <ChatIcon
                  sx={{
                    mr: 1,
                    fontSize: { xs: "1.8rem", sm: "2.2rem" },
                    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
                  }}
                />
                CHATHUB
              </Typography>
            </Box>
          </Fade>

          <Fade in timeout={1000}>
            <Box display="flex" alignItems="center">
              {!isMobile && (
                <>
                  <IconBtn
                    icon={<SearchIcon />}
                    title="Search"
                    onClick={openSearch}
                  />
                  <IconBtn
                    icon={<AddIcon />}
                    title="New Group"
                    onClick={openNewGroup}
                  />
                  {!isTablet && (
                    <>
                      <IconBtn
                        icon={<GroupIcon />}
                        title="Manage Groups"
                        onClick={navigateToGroup}
                      />
                      <IconBtn
                        title="Notifications"
                        icon={<NotificationsIcon />}
                        onClick={seeNotification}
                        value={notificationCount}
                      />
                    </>
                  )}
                </>
              )}
              {!isMobile && !isTablet && (
                <Button
                  color="inherit"
                  onClick={logoutUser}
                  startIcon={<LogoutIcon />}
                  sx={{
                    ml: 1,
                    fontWeight: "bold",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Logout
                </Button>
              )}
              {(isMobile || isTablet) && (
                <IconButton
                  color="inherit"
                  onClick={handleMenu}
                  sx={{
                    ml: 1,
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              )}
            </Box>
          </Fade>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            bgcolor: colors.background,
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          },
        }}
      >
        {isMobile && (
          <>
            <MenuItem onClick={openSearch}>
              <ListItemIcon>
                <SearchIcon fontSize="small" />
              </ListItemIcon>
              Search
            </MenuItem>
            <MenuItem onClick={openNewGroup}>
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              New Group
            </MenuItem>
          </>
        )}
        {(isMobile || isTablet) && (
          <>
            <MenuItem onClick={navigateToGroup}>
              <ListItemIcon>
                <GroupIcon fontSize="small" />
              </ListItemIcon>
              Manage Groups
            </MenuItem>
            <MenuItem onClick={seeNotification}>
              <ListItemIcon>
                <Badge value={notificationCount} color="error">
                  <NotificationsIcon fontSize="small" />
                </Badge>
              </ListItemIcon>
              Notifications
            </MenuItem>
          </>
        )}
        <MenuItem onClick={logoutUser}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialogue />
        </Suspense>
      )}
      {isNotifications && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationsDialogue />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialogue />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        color="inherit"
        onClick={onClick}
        sx={{
          transition: "all 0.3s ease",
          mx: { xs: 0.5, sm: 1 },
          color: colors.lightText,
          "&:hover": {
            transform: "scale(1.1)",
            color: colors.hover,
            bgcolor: "rgba(255, 255, 255, 0.1)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        {value ? (
          <Badge
            badgeContent={value}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: colors.accent,
                color: colors.lightText,
                fontWeight: "bold",
              },
            }}
          >
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
