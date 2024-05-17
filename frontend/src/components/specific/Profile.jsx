import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import moment from "moment";

import {
  Face as FaceIcon,
  AlternateEmail as EmailIcon,
  CalendarMonth as CalenderIcon,
} from "@mui/icons-material";

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: "100px",
          height: "100px",
          // bgcolor: "primary.main",
          // color: "white",
          fontSize: "2rem",
          fontWeight: "bold",
          objectFit: "contain",
          marginBottom: "1rem",
          "&:hover": {
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
          },
        }}
      />

      <ProfileCard text={"Bio"} heading={"This is New Chat App"} />
      <ProfileCard
        text={"username"}
        heading={"italhaayub"}
        Icon={<EmailIcon />}
      />
      <ProfileCard text={"Name"} heading={"TalhaAyub"} Icon={<FaceIcon />} />
      <ProfileCard
        text={moment("20111031", "YYYYMMDD").fromNow()}
        heading={"Joined"}
        Icon={<CalenderIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      spacing={"1rem"}
      alignItems={"center"}
      textAlign={"center"}
      color={"white"}
    >
      {Icon && Icon}

      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color={"black"}>{heading}</Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
