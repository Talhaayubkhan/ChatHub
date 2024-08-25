// import {
//   Avatar,
//   Button,
//   Dialog,
//   DialogTitle,
//   ListItem,
//   Stack,
//   Typography,
// } from "@mui/material";
// import { memo } from "react";
// import { sampleNotifications } from "../../constants/sampleData";

// const Notifications = () => {
//   const friendReqNotification = ({ _id, accept }) => {
//     console.log("friendReqNotification");
//   };
//   return (
//     <>
//       <Dialog open>
//         <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"40rem"}>
//           <DialogTitle fontSize={"1.5rem"} fontWeight={"bold"}>
//             Notification
//           </DialogTitle>
//           {sampleNotifications.length > 0 ? (
//             sampleNotifications.map((notification) => (
//               <NotificationItem
//                 sender={notification.sender}
//                 _id={notification._id}
//                 key={notification._id}
//                 handler={friendReqNotification}
//               />
//             ))
//           ) : (
//             <Typography textAlign={"center"} color={"red"}>
//               0 Notifications
//             </Typography>
//           )}
//         </Stack>
//       </Dialog>
//     </>
//   );
// };

// const NotificationItem = memo(({ sender, _id, handler }) => {
//   const { name, avatar } = sender;
//   return (
//     <>
//       <ListItem>
//         <Stack
//           direction={"row"}
//           alignItems={"center"}
//           spacing={"1rem"}
//           width={"100%"}
//         >
//           <Avatar src={avatar} />

//           <Typography
//             variant={"body1"}
//             sx={{
//               flexGlow: 1,
//               display: "-webkit-box",
//               WebkitLineClamp: 1,
//               WebkitBoxOrient: 1,
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               width: "100%",
//             }}
//           >
//             {`${name} sent you a friend request`}
//           </Typography>
//         </Stack>
//         <Stack
//           direction={{
//             xs: "column",
//             sm: "row",
//           }}
//           p={"1rem"}
//         >
//           <Button onClick={() => handler({ _id, sender: true })}>
//             Accept{" "}
//           </Button>
//           <Button color="error" onClick={() => handler({ _id, sender: false })}>
//             Reject{" "}
//           </Button>
//         </Stack>
//       </ListItem>
//     </>
//   );
// });

// export default Notifications;

import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { memo } from "react";
import { sampleNotifications } from "../../constants/sampleData";

const Notifications = () => {
  const friendReqNotification = ({ _id, accept }) => {
    console.log("friendReqNotification");
    // Implement the functionality here
  };

  return (
    <Dialog
      open
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Stack p={2} spacing={2}>
        <DialogTitle
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Notifications
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
          <Typography textAlign={"center"} color={"textSecondary"}>
            No notifications yet
          </Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem
      sx={{
        p: 2,
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        mb: 1,
        "&:hover": {
          backgroundColor: "#f5f5f5",
          cursor: "pointer",
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} width="100%">
        <Avatar
          src={avatar}
          sx={{
            width: 50,
            height: 50,
            border: "2px solid #1976d2",
          }}
        />
        <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "medium",
              color: "text.primary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {`${name} sent you a friend request`}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handler({ _id, accept: true })}
            sx={{
              textTransform: "none",
            }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handler({ _id, accept: false })}
            sx={{
              textTransform: "none",
            }}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{ my: 1 }} />
    </ListItem>
  );
});

export default Notifications;
