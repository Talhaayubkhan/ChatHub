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
  Skeleton,
} from "@mui/material";
import { memo } from "react";
import { Notifications as NotificationsIcon } from "@mui/icons-material"; // Importing an icon from Material UI
// import { sampleNotifications } from "../../constants/sampleData";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux-toolkit/api/apiSlice";
import { useErrors } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotifications } from "../../redux-toolkit/reducers/misc";
import toast from "react-hot-toast";

const Notifications = () => {
  const { isNotifications } = useSelector((state) => state.misc);

  const dispatch = useDispatch();
  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendReqNotification = async ({ _id, accept }) => {
    // console.log("friendReqNotification");

    dispatch(setIsNotifications(false));

    try {
      const response = await acceptRequest({
        requestId: _id,
        accept,
      });

      if (response?.data?.success) {
        // Display a success message using toast
        toast.success(
          accept
            ? "Friend request accepted! You are now connected."
            : "Friend request declined."
        );
        // Optionally, you can emit a socket event here if needed
        // socket.emit('friendRequestResponse', { requestId: _id, accept });
      } else {
        // Display a specific error message from the server or a default one
        toast.error(
          response?.data?.error?.message ||
            "Unable to process your request. Please try again."
        );
      }
    } catch (error) {
      // Display a generic error message for unexpected issues
      toast.error(
        "Oops! Something went wrong. Please check your connection and try again."
      );
    }
  };

  useErrors([{ error, isError }]);

  const handleClose = () => {
    dispatch(setIsNotifications(false));
  };

  return (
    <Dialog
      open={isNotifications}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Stack p={2} spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <NotificationsIcon
            sx={{ fontSize: "2.5rem", color: "#1976d2", mr: 1 }} // Styling the icon
          />
          <DialogTitle
            sx={{
              fontSize: "2.5rem",
              fontWeight: "800",
              textAlign: "center",
              color: "#333",
            }}
          >
            Notifications
          </DialogTitle>
        </Stack>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              data?.allRequests?.map((notification) => (
                <NotificationItem
                  sender={notification?.sender}
                  _id={notification._id}
                  key={notification._id}
                  handler={friendReqNotification}
                />
              ))
            ) : (
              <Typography
                fontWeight={"800"}
                textAlign={"center"}
                color={"textPrimary"}
              >
                No notifications yet
              </Typography>
            )}
          </>
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
        p: "10px",
        borderRadius: "20px",
        // border: "2px solid #183411",
        boxShadow: "0 5px 12px rgba(0, 0, 0, 0.08)",
        "&:hover": {
          backgroundColor: "#f0f4f7",
          cursor: "pointer",
        },
        transition: "background-color 0.5s ease",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} width="100%">
        <Avatar
          src={avatar}
          sx={{
            width: 55,
            height: 55,
            border: "2px solid #112199",
          }}
        />
        <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "600",
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {`${name} Sent You a Friend Request`}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handler({ _id, accept: true })}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
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
              borderRadius: "8px",
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
