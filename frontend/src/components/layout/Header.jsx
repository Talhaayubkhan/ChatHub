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
} from "@mui/icons-material"; // Import Material-UI icons
import { crimson } from "../../constants/color"; // Import a custom color
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { lazy, Suspense, useState } from "react"; // Import React utilities

// Use lazy to split code and load components on demand with Suspense for better performance and user experience
const SearchDialouge = lazy(() => import("../specific/SearchDialouge"));
const NotificationsDialouge = lazy(() => import("../specific/Notifications"));
const NewGroupDialouge = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate(); // Initialize navigation

  // const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleOnMobile = () => {
    console.log("mobile");
    setIsMobile((prev) => !prev);
  };
  const openSearch = () => {
    console.log("search");
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    console.log("new group");
    setIsNewGroup((prev) => !prev);
  };
  const seeNotification = () => {
    console.log("notification");
    setIsNotification((prev) => !prev);
  };

  const navigateToGroup = () => {
    navigate("/groups");
  };

  const logOutHanlde = () => {
    console.log("log out");
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
                display: { xs: "none", sm: "block" },
              }}
            >
              ChatHub{" "}
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
                title={"Log Out"}
                onClick={logOutHanlde}
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
      {isNotification && (
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
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
