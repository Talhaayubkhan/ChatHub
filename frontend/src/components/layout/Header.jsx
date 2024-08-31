import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
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

// Use lazy to split code and load components on demand with Suspense for better performance and user experience
const SearchDialouge = lazy(() => import("../specific/SearchDialouge"));
const NotificationsDialouge = lazy(() => import("../specific/Notifications"));
const NewGroupDialouge = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate(); // Initialize navigation
  const dispatch = useDispatch();

  const { isSearch, isNotifications } = useSelector((state) => state.misc);

  const [isNewGroup, setIsNewGroup] = useState(false);

  const handleOnMobile = () => {
    console.log("mobile");
    dispatch(setIsMobileMenu(true));
  };
  const openSearch = () => {
    console.log("search");
    dispatch(setIsSearch(true));
  };
  const openNewGroup = () => {
    console.log("new group");
    setIsNewGroup((prev) => !prev);
  };
  const seeNotification = () => {
    dispatch(setIsNotifications(true));
  };

  const navigateToGroup = () => {
    navigate("/groups");
  };

  const logoutUser = async () => {
    // console.log("log out");

    try {
      console.log("Sending logout request...");
      const { data } = await axios.post(`${server}/api/v1/auth/logout`, null, {
        withCredentials: true,
      });

      console.log("Logout response data:", data);

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
            bgcolor: crimson,
          }}
        >
          <Toolbar>
            <Typography
              fontSize={"25px"}
              fontWeight={"bold"}
              color={"black"}
              variant="h6"
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: "8px", // Space between icon and text
                "& .app-icon": {
                  fontSize: "32px",
                  color: "white",
                },
              }}
            >
              <ChatIcon /> CHATHUB
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleOnMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
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

const IconBtn = ({ title, icon, onClick }) => {
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
            color: "#1DE9B6", // Bright yellow color on hover
            transform: "scale(1.2)", // Increase icon size on hover
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Enhanced shadow effect
          },
          "&:active": {
            transform: "scale(1.1)", // Slightly reduce size when clicked
            color: "#00BFA5", // Darker yellow when clicked
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Reduced shadow on click
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
