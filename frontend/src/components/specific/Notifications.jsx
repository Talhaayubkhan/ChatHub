import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { sampleNotifications } from "../../constants/sampleData";

const Notifications = () => {
  const friendReqNotification = ({ _id, accept }) => {
    console.log("friendReqNotification");
  };
  return (
    <>
      <Dialog open>
        <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"40rem"}>
          <DialogTitle fontSize={"1.5rem"} fontWeight={"bold"}>
            Notification
          </DialogTitle>
          {sampleNotifications.length > 0 ? (
            sampleNotifications.map((notification) => (
              <NotificationItem
                sender={notification.sender}
                _id={notification._id}
                key={notification._id}
                handler={friendReqNotification}
              />
            ))
          ) : (
            <Typography textAlign={"center"} color={"red"}>
              0 Notifications
            </Typography>
          )}
        </Stack>
      </Dialog>
    </>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <>
      <ListItem>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={"1rem"}
          width={"100%"}
        >
          <Avatar src={avatar} />

          <Typography
            variant={"body1"}
            sx={{
              flexGlow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {`${name} sent you a friend request`}
          </Typography>
        </Stack>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          p={"1rem"}
        >
          <Button onClick={() => handler({ _id, sender: true })}>
            Accept{" "}
          </Button>
          <Button color="error" onClick={() => handler({ _id, sender: false })}>
            Reject{" "}
          </Button>
        </Stack>
      </ListItem>
    </>
  );
});

export default Notifications;

// if i use later
// import {
//   Avatar,
//   Button,
//   Dialog,
//   DialogTitle,
//   ListItem,
//   Stack,
//   Typography,
//   List,
//   ListItemAvatar,
//   ListItemText,
//   DialogContent,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { memo } from "react";
// import { sampleNotifications } from "../../constants/sampleData";

// const Notifications = () => {
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

//   const handleFriendRequest = ({ _id, accept }) => {
//     console.log("Handling friend request for:", _id, "Accepted:", accept);
//   };

//   return (
//     <Dialog open fullWidth maxWidth="sm" fullScreen={fullScreen}>
//       <DialogTitle>
//         <Typography variant="h6" fontWeight="bold">
//           Notifications
//         </Typography>
//       </DialogTitle>
//       <DialogContent>
//         {sampleNotifications.length > 0 ? (
//           <List>
//             {sampleNotifications.map((notification) => (
//               <NotificationItem
//                 sender={notification.sender}
//                 _id={notification._id}
//                 key={notification._id}
//                 handler={handleFriendRequest}
//               />
//             ))}
//           </List>
//         ) : (
//           <Typography textAlign="center" color="textSecondary" p={2}>
//             0 Notifications
//           </Typography>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// const NotificationItem = memo(({ sender, _id, handler }) => {
//   const { name, avatar } = sender;
//   return (
//     <ListItem
//       sx={{
//         display: "flex",
//         flexDirection: { xs: "column", sm: "row" },
//         justifyContent: { xs: "center", sm: "space-between" },
//         alignItems: "center",
//         padding: "1rem",
//         borderBottom: "1px solid #e0e0e0",
//       }}
//     >
//       <Stack
//         direction="row"
//         alignItems="center"
//         spacing={2}
//         sx={{ width: { xs: "100%", sm: "auto" } }}
//       >
//         <ListItemAvatar>
//           <Avatar src={avatar} alt={name} />
//         </ListItemAvatar>
//         <ListItemText
//           primary={`${name} sent you a friend request`}
//           primaryTypographyProps={{
//             noWrap: true,
//             sx: {
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//             },
//           }}
//           sx={{ flex: 1, marginRight: { xs: 0, sm: "1rem" } }}
//         />
//       </Stack>
//       <Stack
//         direction="row"
//         spacing={1}
//         sx={{ marginTop: { xs: "1rem", sm: 0 } }}
//       >
//         <Button
//           variant="contained"
//           color="primary"
//           size="small"
//           onClick={() => handler({ _id, accept: true })}
//         >
//           Accept
//         </Button>
//         <Button
//           variant="outlined"
//           color="error"
//           size="small"
//           onClick={() => handler({ _id, accept: false })}
//         >
//           Reject
//         </Button>
//       </Stack>
//     </ListItem>
//   );
// });

// export default Notifications;
