import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  SearchField,
  CurveButton,
} from "../../components/styles/StyledComponent";
import { DoughnutChart, LineChart } from "../../components/specific/Chart";

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={2}
      sx={{
        padding: "1rem",
        marginBottom: "2rem",
        borderRadius: "1rem",
        display: {
          sm: { width: "50%" },
        },
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"0.5rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem", color: "black" }} />
        <SearchField
          sx={{ border: "2px solid black" }}
          placeholder="Search..."
        />
        <CurveButton variant="contained" color="primary">
          Search
        </CurveButton>
        <Box flexGrow={1} />
        <Typography color={"black"}>
          {moment().format("MMMM Do YYYY")}
        </Typography>
        <NotificationsIcon sx={{ fontSize: "2.2rem" }} />
      </Stack>
    </Paper>
  );

  const Wedgets = (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={"2rem"}
      marginTop={"2rem"}
    >
      <Widget title={"Users"} value={40} Icon={<PersonIcon />} />
      <Widget title={"Messages"} value={10} Icon={<GroupIcon />} />
      <Widget title={"Chats"} value={23} Icon={<MessageIcon />} />
    </Stack>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={"3rem"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "1.5rem",
              width: { xs: "100%", lg: "50rem" },
              borderRadius: "2rem",
            }}
          >
            <Typography variant="h6" fontWeight={"bold"}>
              Last Seven Days Messages
            </Typography>
            <LineChart chartDataArray={[10, 2, 30]} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1.5rem",
              width: { xs: "100%", sm: "50%" },
              maxWidth: "30rem",
              borderRadius: "1rem",
              height: "25rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // position: "relative",
            }}
          >
            <DoughnutChart
              labels={["Single Chats", "Group Chats"]}
              chartDataArray={[45, 60]}
            />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"1rem"}
            >
              <GroupIcon /> <Typography>Vs</Typography> <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        {Wedgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => {
  return (
    <Paper sx={{ padding: "2rem", borderRadius: "1rem" }}>
      <Stack alignItems={"center"} spacing={"1rem"}>
        <Typography
          sx={{
            color: "primary.main",
            borderRadius: "50%",
            border: `5px solid black`,
            width: "5rem",
            height: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "2.5rem",
          }}
        >
          {value}
        </Typography>
        <Stack direction={"row"} spacing={"1rem"} alignItems="center">
          {Icon}
          <Typography variant="subtitle1">{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Dashboard;
