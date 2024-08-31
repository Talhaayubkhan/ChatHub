// import React from "react";
// import { Avatar, Stack, Typography } from "@mui/material";
// import moment from "moment";

// import {
//   Face as FaceIcon,
//   AlternateEmail as EmailIcon,
//   CalendarMonth as CalenderIcon,
// } from "@mui/icons-material";

// const Profile = () => {
//   return (
//     <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
//       <Avatar
//         sx={{
//           width: "150px",
//           height: "150px",
//           // bgcolor: "primary.main",
//           // color: "white",
//           fontSize: "1.5rem",
//           fontWeight: "bold",
//           objectFit: "contain",
//           marginBottom: "1rem",
//           "&:hover": {
//             boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
//             border: "1px solid black",
//           },
//         }}
//       />

//       <ProfileCard text={"Bio"} heading={"This is New Chat App"} />
//       <ProfileCard
//         text={"username"}
//         heading={"italhaayub"}
//         Icon={<EmailIcon />}
//       />
//       <ProfileCard text={"Name"} heading={"TalhaAyub"} Icon={<FaceIcon />} />
//       <ProfileCard
//         text={moment("20111031", "YYYYMMDD").fromNow()}
//         heading={"Joined"}
//         Icon={<CalenderIcon />}
//       />
//     </Stack>
//   );
// };

// const ProfileCard = ({ text, Icon, heading }) => {
//   return (
//     <Stack
//       direction={"row"}
//       spacing={"1rem"}
//       alignItems={"center"}
//       textAlign={"center"}
//       color={"white"}
//     >
//       {Icon && Icon}

//       <Stack>
//         <Typography variant="body1">{text}</Typography>
//         <Typography color={"black"}>{heading}</Typography>
//       </Stack>
//     </Stack>
//   );
// };

// export default Profile;

import React from "react";
import { Avatar, Stack, Typography, Box } from "@mui/material";
import moment from "moment";
import {
  Face as FaceIcon,
  // AlternateEmail as EmailIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";

const Profile = ({ user }) => {
  return (
    <Stack spacing={"2.5rem"} direction={"column"} alignItems={"center"} p={3}>
      <Avatar
        src={user?.avatar?.url}
        sx={{
          width: "140px",
          height: "140px",
          fontSize: "2rem",
          fontWeight: "bold",
          objectFit: "cover",
          marginBottom: "1.5rem",
          borderRadius: "50%",
          border: "2px solid #e0e0e0", // Light border for avatar
          transition:
            "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease", // Smooth transitions
          "&:hover": {
            transform: "scale(1.05)", // Slightly enlarges the avatar on hover
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)", // Deeper shadow for a more pronounced effect
            borderColor: "#3f51b5", // Changes border color on hover
          },
          "&:active": {
            transform: "scale(0.98)", // Slightly reduce size on click
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Reduced shadow on click
          },
        }}
      />

      {/* <ProfileCard heading={"Email"} text={user?.email} Icon={<EmailIcon />} /> */}
      <ProfileCard
        heading={"Username"}
        text={user?.username}
        Icon={<FaceIcon />}
      />
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard
        text={moment(user?.createdAt).fromNow()}
        heading={"Joined"}
        Icon={<CalendarIcon />}
      />
      <ProfileCard heading={"Bio"} text={user?.bio || "Bio Not Available"} />
    </Stack>
  );
};

// const ProfileCard = ({ text, Icon, heading }) => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: "#f5f5f5",
//         borderRadius: "10px",
//         padding: "1rem",
//         width: "100%",
//         maxWidth: "350px",
//         boxShadow: "0px 5px 8px 5px rgba(0, 0, 0, 0.1)",
//         display: "flex",
//         alignItems: "center",
//         border: "2px solid #e0e0e0", // Light border for card
//       }}
//     >
//       {Icon && (
//         <Box
//           sx={{
//             color: "#3f51b5",
//             fontSize: "2rem",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginRight: "1.5rem",
//           }}
//         >
//           {Icon}
//         </Box>
//       )}

//       <Stack>
//         <Typography
//           variant="body1"
//           color={"textSecondary"}
//           fontWeight={"bold"}
//           sx={{ marginBottom: "0.5rem" }}
//         >
//           {text}
//         </Typography>
//         <Typography
//           variant="h7"
//           color={"textPrimary"}
//           fontWeight={"500"}
//           sx={{ lineHeight: 1.2 }}
//         >
//           {heading}
//         </Typography>
//       </Stack>
//     </Box>
//   );
// };

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff", // Clean white background
        borderRadius: "10px",
        padding: "1rem",
        width: "100%",
        maxWidth: "350px",
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)", // Slightly deeper shadow for a more pronounced effect
        display: "flex",
        alignItems: "center",
        border: "2px solid #e0e0e0",
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transitions
        "&:hover": {
          transform: "translateY(-5px)", // Lift the card slightly on hover
          boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.2)", // Deeper shadow on hover
        },
      }}
    >
      {Icon && (
        <Box
          sx={{
            color: "#3f51b5", // Primary color for the icon
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "1.5rem",
          }}
        >
          {Icon}
        </Box>
      )}

      <Stack>
        <Typography
          variant="body1"
          color={"textSecondary"}
          fontWeight={"bold"}
          sx={{ marginBottom: "0.5rem" }}
        >
          {text}
        </Typography>
        <Typography
          variant="h7"
          color={"textPrimary"}
          fontWeight={"500"}
          sx={{ lineHeight: 1.2 }}
        >
          {heading}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Profile;
