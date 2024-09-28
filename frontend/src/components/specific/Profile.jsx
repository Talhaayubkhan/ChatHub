// import React from "react";
// import { Avatar, Stack, Typography, Box } from "@mui/material";
// import moment from "moment";
// import {
//   Face as FaceIcon,
//   // AlternateEmail as EmailIcon,
//   CalendarMonth as CalendarIcon,
// } from "@mui/icons-material";

// const Profile = ({ user }) => {
//   return (
//     <Stack
//       spacing={"2rem"}
//       direction={"column"}
//       alignItems={"center"}
//       p={1}
//       m={2}
//     >
//       <Avatar
//         src={user?.avatar?.url}
//         sx={{
//           width: "150px",
//           height: "150px",
//           objectFit: "cover",
//           marginBottom: "1rem",
//           borderRadius: "50%",
//           border: "2px solid #00b4d8", // Light border for avatar
//           transition:
//             "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease", // Smooth transitions
//           "&:hover": {
//             transform: "scale(1.15)", // Slightly enlarges the avatar on hover
//             boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)", // Deeper shadow for a more pronounced effect
//             borderColor: "#001219", // Changes border color on hover
//           },
//           "&:active": {
//             transform: "scale(0.150)", // Slightly reduce size on click
//             boxShadow: "5px 4px 10px 4px rgba(0, 0, 0, 0.2)", // Reduced shadow on click
//           },
//         }}
//       />

//       {/* <ProfileCard heading={"Email"} text={user?.email} Icon={<EmailIcon />} /> */}
//       <ProfileCard
//         heading={"Username"}
//         text={user?.username}
//         Icon={<FaceIcon />}
//       />
//       <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
//       <ProfileCard
//         text={moment(user?.createdAt).fromNow()}
//         heading={"Joined"}
//         Icon={<CalendarIcon />}
//       />
//       <ProfileCard heading={"Bio"} text={user?.bio || "Bio Not Available"} />
//     </Stack>
//   );
// };

// const ProfileCard = ({ text, Icon, heading }) => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: "#ffffff", // Clean white background
//         borderRadius: "15px",
//         padding: "15px",
//         width: "100%",
//         maxWidth: "350px",
//         boxShadow: "3px 6px 10px 5px rgba(0, 0, 0, 0.1)", // Slightly deeper shadow for a more pronounced effect
//         display: "flex",
//         alignItems: "center",
//         border: "2px solid #343a40",
//         transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transitions
//         "&:hover": {
//           transform: "translateY(-15px)", // Lift the card slightly on hover
//           boxShadow: "5px 12px 20px 10px rgba(0, 0, 0, 0.2)", // Deeper shadow on hover
//         },
//       }}
//     >
//       {Icon && (
//         <Box
//           sx={{
//             color: "#001219", // Primary color for the icon
//             fontSize: "1.5rem",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginRight: "1rem",
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
//           sx={{ lineHeight: 1.5 }}
//         >
//           {heading}
//         </Typography>
//       </Stack>
//     </Box>
//   );
// };

// export default Profile;

import React from "react";
import { Avatar, Stack, Typography, Box } from "@mui/material";
import moment from "moment";
import {
  Face as FaceIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";

const Profile = ({ user }) => {
  return (
    <Stack
      spacing={4}
      alignItems="center"
      sx={{
        backgroundColor: "#f9f9f9", // Light background color for the whole profile
        padding: "2rem",
        borderRadius: "15px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        maxWidth: "450px",
        margin: "auto", // Center the profile card
        mt: 4, // Top margin for spacing
      }}
    >
      <Avatar
        src={user?.avatar?.url}
        sx={{
          width: "130px",
          height: "130px",
          border: "3px solid #00b4d8", // Light blue border
          transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transitions
          "&:hover": {
            transform: "scale(1.1)", // Slightly enlarges the avatar on hover
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", // Soft shadow on hover
          },
        }}
      />

      <Typography
        variant="h5"
        color="textPrimary"
        fontWeight="bold"
        textAlign="center"
        textTransform={"capitalize"}
      >
        {user?.name || "User Name"}
      </Typography>

      <ProfileCard
        heading="Username"
        text={user?.username}
        icon={<FaceIcon />}
      />
      <ProfileCard
        heading="Joined"
        text={moment(user?.createdAt).format("MMMM Do, YYYY")}
        icon={<CalendarIcon />}
      />
      <ProfileCard heading="Bio" text={user?.bio || "Bio Not Available"} />
    </Stack>
  );
};

const ProfileCard = ({ text, icon, heading }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#ffffff", // White background
        borderRadius: "10px",
        padding: "15px 20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transitions
        "&:hover": {
          transform: "translateY(-5px)", // Slight lift on hover
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)", // Enhanced shadow on hover
        },
      }}
    >
      {icon && (
        <Box
          sx={{
            color: "#00b4d8", // Accent color for the icon
            marginRight: "0.75rem",
          }}
        >
          {icon}
        </Box>
      )}

      <Box>
        <Typography variant="body1" fontWeight="500" color="textPrimary">
          {heading}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
