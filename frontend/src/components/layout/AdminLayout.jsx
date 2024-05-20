import {
  Close as CloseIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Groups as GroupsIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation, Link as RouterLink, Navigate } from "react-router-dom";

const Link = styled(RouterLink)`
  text-decoration: none;
  color: black;
  padding: 0.5rem 1rem;
  display: block;
  border-radius: 0.5rem;
  transition: color 0.3s ease, background-color 0.3s ease;

  &.active {
    background-color: #e3f2fd;
    color: #1976d2;
  }

  &:hover {
    color: #1976d2;
  }
`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Chat Group",
    path: "/admin/chat",
    icon: <GroupsIcon />,
  },
  {
    name: "User",
    path: "/admin/user",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Message",
    path: "/admin/message",
    icon: <MessageIcon />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();

  const logoutHandler = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  return (
    <Box
      width={w}
      p={"1rem"}
      sx={{
        bgcolor: "#f4f6f8",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack direction={"column"} spacing={"1.5rem"}>
        <Typography
          variant="h4"
          textTransform={"uppercase"}
          fontWeight={"bold"}
          fontFamily={"monospace"}
          color={"#1976d2"}
        >
          ChatHub
        </Typography>
        <Stack spacing={"1rem"} justifyContent={"flex-start"}>
          {adminTabs.map((adminTab) => (
            <Link
              key={adminTab.path}
              to={adminTab.path}
              className={location.pathname === adminTab.path ? "active" : ""}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={"1rem"}
                sx={{
                  p: "0.5rem",
                  borderRadius: "0.5rem",
                  bgcolor:
                    location.pathname === adminTab.path ? "#e3f2fd" : "inherit",
                  color:
                    location.pathname === adminTab.path ? "#1976d2" : "inherit",
                }}
              >
                <Box sx={{ fontSize: "1rem" }}>{adminTab.icon}</Box>
                <Typography fontWeight={"bold"}>{adminTab.name}</Typography>
              </Stack>
            </Link>
          ))}
        </Stack>
      </Stack>
      <Box mt={"auto"} pt={"2rem"}>
        <Link to="#" onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <Box sx={{ fontSize: "2rem" }}>
              <ExitToAppIcon />
            </Box>
            <Typography fontWeight={"bold"}>Logout</Typography>
          </Stack>
        </Link>
      </Box>
    </Box>
  );
};

const isAdmin = true;

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => {
    setIsMobile(!isMobile);
  };
  const handleClose = () => {
    setIsMobile(false);
  };
  if (!isAdmin) return <Navigate to={"/admin"} />;
  return (
    <Grid container height={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile} size="large">
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "#e0e0e0",
          padding: "1rem",
        }}
      >
        {children}
      </Grid>

      <Drawer
        open={isMobile}
        onClose={handleClose}
        PaperProps={{
          sx: { width: "75vw", padding: "1rem" },
        }}
      >
        <Sidebar w={"100%"} />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
