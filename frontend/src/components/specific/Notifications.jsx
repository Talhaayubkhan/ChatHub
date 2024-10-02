// import {
//   Avatar,
//   Button,
//   Dialog,
//   DialogTitle,
//   ListItem,
//   Stack,
//   Typography,
//   Divider,
//   Skeleton,
// } from "@mui/material";
// import { memo } from "react";
// import { Notifications as NotificationsIcon } from "@mui/icons-material"; // Importing an icon from Material UI
// // import { sampleNotifications } from "../../constants/sampleData";
// import {
//   useAcceptFriendRequestMutation,
//   useGetNotificationsQuery,
// } from "../../redux-toolkit/api/apiSlice";
// import { useErrors } from "../../hooks/hooks";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsNotifications } from "../../redux-toolkit/reducers/misc";
// import toast from "react-hot-toast";

// const Notifications = () => {
//   const { isNotifications } = useSelector((state) => state.misc);

//   const dispatch = useDispatch();
//   const { isLoading, data, error, isError } = useGetNotificationsQuery();

//   const [acceptRequest] = useAcceptFriendRequestMutation();

//   const friendReqNotification = async ({ _id, accept }) => {
//     dispatch(setIsNotifications(false));

//     try {
//       const response = await acceptRequest({
//         requestId: _id,
//         accept,
//       });
//       // console.log(response);

//       if (response?.data?.success) {
//         // Display a success message using toast
//         toast.success(
//           accept
//             ? "Friend request accepted! You are now connected."
//             : "Friend request declined."
//         );
//         // Optionally, you can emit a socket event here if needed
//         // socket.emit('friendRequestResponse', { requestId: _id, accept });
//       } else {
//         // Display a specific error message from the server or a default one
//         toast.error(
//           response?.data?.error?.message ||
//             "Unable to process your request. Please try again."
//         );
//       }
//     } catch (error) {
//       // Display a generic error message for unexpected issues
//       toast.error(
//         "Oops! Something went wrong. Please check your connection and try again."
//       );
//     }
//   };

//   useErrors([{ error, isError }]);

//   // console.log("All data has been processed", data);

//   const handleClose = () => {
//     dispatch(setIsNotifications(false));
//   };

//   console.log(data);

//   return (
//     <Dialog
//       open={isNotifications}
//       onClose={handleClose}
//       maxWidth="sm"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: "20px",
//           boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//         },
//       }}
//     >
//       <Stack p={1} spacing={1}>
//         <Stack direction="row" alignItems="center" justifyContent="center">
//           <NotificationsIcon
//             sx={{ fontSize: "3em", color: "#1976d2", mr: 1 }} // Styling the icon
//           />
//           <DialogTitle
//             sx={{
//               fontSize: "2.5rem",
//               fontWeight: "800",
//               textAlign: "center",
//               color: "#333",
//             }}
//           >
//             Notifications
//           </DialogTitle>
//         </Stack>
//         {isLoading ? (
//           <Skeleton />
//         ) : (
//           <>
//             {data?.allRequests?.length > 0 ? (
//               data?.allRequests?.map((notification) => (
//                 <NotificationItem
//                   sender={notification?.sender}
//                   _id={notification._id}
//                   key={notification._id}
//                   handler={friendReqNotification}
//                 />
//               ))
//             ) : (
//               <Typography
//                 fontWeight={"800"}
//                 textAlign={"center"}
//                 color={"textPrimary"}
//               >
//                 No notifications yet....
//               </Typography>
//             )}
//           </>
//         )}
//       </Stack>
//     </Dialog>
//   );
// };

// const NotificationItem = memo(({ sender, _id, handler }) => {
//   const { name, avatar } = sender;

//   return (
//     <ListItem
//       sx={{
//         p: 2,
//         borderRadius: "20px",
//         // border: "2px solid #183411",
//         boxShadow: "0 5px 12px rgba(0, 0, 0, 0.08)",
//         "&:hover": {
//           backgroundColor: "#f0f4f7",
//           cursor: "pointer",
//         },
//         transition: "background-color 0.5s ease",
//       }}
//     >
//       <Stack direction="row" alignItems="center" spacing={1} width="100%">
//         <Avatar
//           src={avatar}
//           sx={{
//             width: 60,
//             height: 60,
//             border: "2px solid #000012",
//           }}
//         />
//         <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
//           <Typography
//             variant="body1"
//             sx={{
//               fontWeight: "600",
//               color: "text.secondary",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//             }}
//           >
//             {`${name} Sent You a Friend Request`}
//           </Typography>
//         </Stack>
//         <Stack direction="row" spacing={1}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handler({ _id, accept: true })}
//             sx={{
//               textTransform: "none",
//               borderRadius: "8px",
//             }}
//           >
//             Accept
//           </Button>
//           <Button
//             variant="outlined"
//             color="error"
//             onClick={() => handler({ _id, accept: false })}
//             sx={{
//               textTransform: "none",
//               borderRadius: "8px",
//             }}
//           >
//             Reject
//           </Button>
//         </Stack>
//       </Stack>
//       <Divider sx={{ my: 1 }} />
//     </ListItem>
//   );
// });

// export default Notifications;

// import {
//   Avatar,
//   Button,
//   Dialog,
//   DialogTitle,
//   ListItem,
//   Stack,
//   Typography,
//   Divider,
//   Skeleton,
//   IconButton,
//   Box,
// } from "@mui/material";
// import { memo } from "react";
// import {
//   Notifications as NotificationsIcon,
//   Close as CloseIcon,
// } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsNotifications } from "../../redux-toolkit/reducers/misc";
// import {
//   useGetNotificationsQuery,
//   useAcceptFriendRequestMutation,
// } from "../../redux-toolkit/api/apiSlice";
// import { useErrors } from "../../hooks/hooks";
// import toast from "react-hot-toast";

// const Notifications = () => {
//   const { isNotifications } = useSelector((state) => state.misc);
//   const dispatch = useDispatch();
//   const { isLoading, data, error, isError } = useGetNotificationsQuery();
//   const [acceptRequest] = useAcceptFriendRequestMutation();

//   const handleClose = () => {
//     dispatch(setIsNotifications(false));
//   };

//   const friendReqNotification = async ({ _id, accept }) => {
//     dispatch(setIsNotifications(false));
//     try {
//       const response = await acceptRequest({ requestId: _id, accept });
//       if (response?.data?.success) {
//         toast.success(
//           accept ? "Friend request accepted!" : "Friend request declined."
//         );
//       } else {
//         toast.error(
//           response?.data?.error?.message || "Unable to process your request."
//         );
//       }
//     } catch {
//       toast.error("Oops! Something went wrong.");
//     }
//   };

//   useErrors([{ error, isError }]);

//   return (
//     <Dialog
//       open={isNotifications}
//       onClose={handleClose}
//       maxWidth="sm"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: "16px",
//           boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//           padding: "1rem 2rem",
//         },
//       }}
//     >
//       {/* Header with Close Button */}
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={1}
//       >
//         <Box display="flex" alignItems="center">
//           <NotificationsIcon
//             sx={{ fontSize: "2rem", color: "#1976d2", mr: 1 }}
//           />
//           <DialogTitle
//             sx={{
//               fontSize: "1.8rem",
//               fontWeight: "700",
//               color: "#333",
//             }}
//           >
//             Notifications
//           </DialogTitle>
//         </Box>
//         <IconButton onClick={handleClose}>
//           <CloseIcon />
//         </IconButton>
//       </Stack>

//       {/* Notification Items */}
//       <Stack spacing={2}>
//         {isLoading ? (
//           <Skeleton variant="rectangular" height={100} />
//         ) : (
//           <>
//             {data?.allRequests?.length > 0 ? (
//               data.allRequests.map((notification) => (
//                 <NotificationItem
//                   sender={notification?.sender}
//                   _id={notification._id}
//                   key={notification._id}
//                   handler={friendReqNotification}
//                 />
//               ))
//             ) : (
//               <Typography
//                 fontWeight="600"
//                 textAlign="center"
//                 color="textSecondary"
//               >
//                 No notifications yet...
//               </Typography>
//             )}
//           </>
//         )}
//       </Stack>
//     </Dialog>
//   );
// };

// const NotificationItem = memo(({ sender, _id, handler }) => {
//   const { name, avatar } = sender;

//   return (
//     <ListItem
//       sx={{
//         p: 2,
//         borderRadius: "12px",
//         boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
//         backgroundColor: "#fff",
//         "&:hover": {
//           backgroundColor: "#f7f9fc",
//         },
//         transition: "background-color 0.3s",
//         mb: 1,
//       }}
//     >
//       <Stack direction="row" alignItems="center" spacing={2} width="100%">
//         <Avatar
//           src={avatar}
//           sx={{
//             width: 50,
//             height: 50,
//             border: "2px solid #1976d2",
//           }}
//         />
//         <Stack direction="column" flexGrow={1}>
//           <Typography
//             variant="body1"
//             sx={{
//               fontWeight: "600",
//               color: "textPrimary",
//               mb: 0.5,
//             }}
//           >
//             {name}
//           </Typography>
//           <Typography
//             variant="body2"
//             sx={{
//               color: "textSecondary",
//             }}
//           >
//             Sent you a friend request
//           </Typography>
//         </Stack>

//         {/* Action Buttons */}
//         <Stack direction="row" spacing={1}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handler({ _id, accept: true })}
//             sx={{
//               textTransform: "none",
//               borderRadius: "8px",
//               fontSize: "0.9rem",
//             }}
//           >
//             Accept
//           </Button>
//           <Button
//             variant="outlined"
//             color="error"
//             onClick={() => handler({ _id, accept: false })}
//             sx={{
//               textTransform: "none",
//               borderRadius: "8px",
//               fontSize: "0.9rem",
//             }}
//           >
//             Reject
//           </Button>
//         </Stack>
//       </Stack>
//       <Divider sx={{ my: 1 }} />
//     </ListItem>
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
  Skeleton,
  IconButton,
  Box,
  List,
} from "@mui/material";
import { memo } from "react";
import {
  Notifications as NotificationsIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotifications } from "../../redux-toolkit/reducers/misc";
import {
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
} from "../../redux-toolkit/api/apiSlice";
import { useErrors } from "../../hooks/hooks";
import toast from "react-hot-toast";

const Notifications = () => {
  const { isNotifications } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const [acceptRequest] = useAcceptFriendRequestMutation();

  const handleClose = () => {
    dispatch(setIsNotifications(false));
  };

  const friendReqNotification = async ({ _id, accept }) => {
    dispatch(setIsNotifications(false));
    try {
      const response = await acceptRequest({ requestId: _id, accept });
      if (response?.data?.success) {
        toast.success(
          accept ? "Friend request accepted!" : "Friend request declined."
        );
      } else {
        toast.error(
          response?.data?.error?.message || "Unable to process your request."
        );
      }
    } catch {
      toast.error("Oops! Something went wrong.");
    }
  };

  useErrors([{ error, isError }]);

  return (
    <Dialog
      open={isNotifications}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          padding: "1.5rem",
          background: "linear-gradient(145deg, #f6f8fa, #ffffff)",
        },
      }}
    >
      {/* Header with Close Button */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <NotificationsIcon
            sx={{ fontSize: "2.5rem", color: "#3f51b5", mr: 1.5 }}
          />
          <DialogTitle
            sx={{
              fontSize: "2.2rem",
              fontWeight: "700",
              color: "#3f51b5",
              padding: 0,
            }}
          >
            Notifications
          </DialogTitle>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            bgcolor: "#f0f2f5",
            "&:hover": { bgcolor: "#e0e3e8" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>

      {/* Notification Items */}
      <List sx={{ maxHeight: "50vh", overflowY: "auto", py: 0 }}>
        {isLoading ? (
          [...Array(1)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={70}
              sx={{ borderRadius: "20px", mb: 3 }}
            />
          ))
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              data?.allRequests?.map((notification) => (
                <NotificationItem
                  sender={notification.sender}
                  _id={notification._id}
                  key={notification._id}
                  handler={friendReqNotification}
                />
              ))
            ) : (
              <Typography
                fontWeight="600"
                textAlign="center"
                color="text.secondary"
                sx={{ py: 4, fontSize: "1.1rem" }}
              >
                No notifications yet...
              </Typography>
            )}
          </>
        )}
      </List>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem
      sx={{
        p: 2,
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        backgroundColor: "#ffffff",
        "&:hover": {
          backgroundColor: "#f7f9fc",
          transform: "translateY(-2px)",
        },
        transition: "all 0.3s ease",
        mb: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} width="100%">
        <Avatar
          src={avatar}
          sx={{
            width: 56,
            height: 56,
            border: "3px solid #3f51b5",
          }}
        />
        <Stack direction="column" flexGrow={1}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "700",
              color: "text.primary",
              mb: 0.5,
              fontSize: "1.1rem",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
            }}
          >
            Sent you a friend request
          </Typography>
        </Stack>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handler({ _id, accept: true })}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              fontSize: "0.9rem",
              boxShadow: "0 4px 8px rgba(63, 81, 181, 0.2)",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(63, 81, 181, 0.3)",
              },
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
              borderRadius: "12px",
              fontSize: "0.9rem",
              borderWidth: "2px",
              "&:hover": {
                borderWidth: "2px",
                backgroundColor: "rgba(211, 47, 47, 0.04)",
              },
            }}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
