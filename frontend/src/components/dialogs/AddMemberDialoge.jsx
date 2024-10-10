// import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
// import React, { useState } from "react";
// import { sampleUsers } from "../../constants/sampleData";
// import UserItem from "../shared/UserItem";

// const AddMemberDialoge = ({
//   open,
//   addMember,
//   isLoadingAddGroupMember,
//   chatId,
// }) => {
//   const [members, setMemebers] = useState(sampleUsers);
//   const [selectedMembers, setSelectedMemebers] = useState([]);

//   const selectGroupMembers = (id) => {
//     setSelectedMemebers((prev) =>
//       prev.includes(id)
//         ? prev.filter((currentItem) => currentItem !== id)
//         : [...prev, id]
//     );
//   };
//   //   const addFriendHandler = (user) => {
//   //     console.log(user, chatId);
//   //   };

//   const closeHanlder = () => {
//     setSelectedMemebers([]);
//     setMemebers([]);
//   };
//   const addNewMemberSubmitHandler = () => {
//     closeHanlder();
//   };
//   return (
//     <>
//       <Dialog open onClose={closeHanlder}>
//         <Stack p={"2rem"} width={"30rem"}>
//           <DialogTitle
//             textAlign={"center"}
//             fontSize={"1.5rem"}
//             fontWeight={"bold"}
//           >
//             Add Member
//           </DialogTitle>
//           <Stack spacing={1}>
//             {members.length > 0 ? (
//               members.map((user) => (
//                 <UserItem
//                   key={user._id}
//                   user={user}
//                   handler={selectGroupMembers}
//                   isAdded={selectedMembers.includes(user._id)}
//                 />
//               ))
//             ) : (
//               <>
//                 <Typography textAlign={"center"} padding={"2rem"} variant="h4">
//                   No Friends Here
//                 </Typography>
//               </>
//             )}
//           </Stack>
//           <Stack
//             direction="row"
//             marginTop={"1rem"}
//             justifyContent="flex-end"
//             spacing={3}
//           >
//             <Button variant="outlined" color="error" onClick={closeHanlder}>
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               disabled={isLoadingAddGroupMember}
//               onClick={addNewMemberSubmitHandler}
//             >
//               Submit Changes
//             </Button>
//           </Stack>
//         </Stack>
//       </Dialog>
//     </>
//   );
// };

// export default AddMemberDialoge;

// import React, { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   Stack,
//   Typography,
//   Skeleton,
//   Box,
//   Paper,
// } from "@mui/material";
// import {
//   PersonAdd as PersonAddIcon,
//   Close as CloseIcon,
//   Check as CheckIcon,
// } from "@mui/icons-material";
// import UserItem from "../shared/UserItem";
// import { useErrors, useSendFriendRequest } from "../../hooks/hooks";
// import {
//   useAddGroupMemberMutation,
//   useAvailableFriendsQuery,
// } from "../../redux-toolkit/api/apiSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsAddMember } from "../../redux-toolkit/reducers/misc";

// const AddMemberDialog = ({ chatId }) => {
//   const dispatch = useDispatch();
//   const { isAddMember } = useSelector((state) => state.misc);

//   const { isLoading, isError, error, data } = useAvailableFriendsQuery(chatId);

//   const [addGroupMembers, isLoadingGroupMembers] = useSendFriendRequest(
//     useAddGroupMemberMutation
//   );

//   const [selectedMembers, setSelectedMembers] = useState([]);

//   const selectGroupMembers = (id) => {
//     setSelectedMembers((prev) =>
//       prev.includes(id)
//         ? prev.filter((currentItem) => currentItem !== id)
//         : [...prev, id]
//     );
//   };

//   const closeHandler = () => {
//     dispatch(setIsAddMember(false));
//   };

//   const addNewMemberSubmitHandler = () => {
//     addGroupMembers("Adding Group Member....", {
//       members: selectedMembers,
//       chatId,
//     });
//     closeHandler();
//   };

//   useErrors([{ isError, error }]);

//   return (
//     <Dialog
//       open={isAddMember}
//       onClose={closeHandler}
//       fullWidth
//       maxWidth="sm"
//       PaperProps={{
//         style: {
//           borderRadius: "16px",
//           boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
//           overflow: "hidden",
//         },
//       }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
//           padding: "2rem",
//           color: "white",
//         }}
//       >
//         <DialogTitle
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: { xs: "1.5rem", sm: "2rem" },
//             fontWeight: "bold",
//             mb: 1,
//             textTransform: "uppercase",
//             letterSpacing: "0.05em",
//           }}
//         >
//           <PersonAddIcon sx={{ mr: 2, fontSize: "2.5rem" }} />
//           Add New Members
//         </DialogTitle>
//       </Paper>

//       <Stack p={{ xs: "1.5rem", sm: "2rem" }} spacing={3}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             backgroundColor: "action.selected",
//             borderRadius: "8px",
//             padding: "0.75rem 1rem",
//           }}
//         >
//           <Typography variant="subtitle1" fontWeight="medium">
//             Selected Members
//           </Typography>
//           <Typography
//             variant="subtitle1"
//             fontWeight="bold"
//             color="primary.main"
//           >
//             {selectedMembers.length}
//           </Typography>
//         </Box>

//         <Paper
//           elevation={0}
//           sx={{
//             maxHeight: "50vh",
//             overflowY: "auto",
//             borderRadius: "8px",
//             border: "1px solid",
//             borderColor: "divider",
//           }}
//         >
//           {isLoading ? (
//             <Skeleton variant="rectangular" height={200} />
//           ) : data?.frineds?.length > 0 ? (
//             data?.frineds?.map((user) => (
//               <UserItem
//                 key={user._id}
//                 user={user}
//                 handler={selectGroupMembers}
//                 isAdded={selectedMembers.includes(user._id)}
//               />
//             ))
//           ) : (
//             <Typography
//               textAlign="center"
//               padding="2rem"
//               variant="body1"
//               color="text.secondary"
//             >
//               No Members Available
//             </Typography>
//           )}
//         </Paper>

//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           justifyContent="flex-end"
//           spacing={2}
//         >
//           <Button
//             variant="outlined"
//             color="error"
//             onClick={closeHandler}
//             fullWidth={window.innerWidth < 600}
//             startIcon={<CloseIcon />}
//             sx={{ borderRadius: "8px", textTransform: "none" }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             disabled={isLoadingGroupMembers || selectedMembers.length === 0}
//             onClick={addNewMemberSubmitHandler}
//             fullWidth={window.innerWidth < 600}
//             startIcon={<CheckIcon />}
//             sx={{ borderRadius: "8px", textTransform: "none" }}
//           >
//             {isLoadingGroupMembers
//               ? "Adding..."
//               : `Add ${selectedMembers.length} Member${
//                   selectedMembers.length !== 1 ? "s" : ""
//                 }`}
//           </Button>
//         </Stack>
//       </Stack>
//     </Dialog>
//   );
// };

// export default AddMemberDialog;

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  Skeleton,
  Box,
  Paper,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Close as CloseIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { useErrors, useSendFriendRequest } from "../../hooks/hooks";
import {
  useAddGroupMemberMutation,
  useAvailableFriendsQuery,
} from "../../redux-toolkit/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux-toolkit/reducers/misc";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);

  // Fetch the list of available friends for the group from the API.
  const { isLoading, isError, error, data } = useAvailableFriendsQuery(chatId);

  // Custom hook to handle sending friend requests to add group members.
  const [addGroupMembers, isLoadingGroupMembers] = useSendFriendRequest(
    useAddGroupMemberMutation
  );

  // Track selected members in local state.
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Toggle selection of group members by their ID.
  const selectGroupMembers = (id) => {
    setSelectedMembers(
      (prev) =>
        prev.includes(id)
          ? prev.filter((currentItem) => currentItem !== id) // Deselect if already selected.
          : [...prev, id] // Add to the list if not already selected.
    );
  };

  // Close the dialog handler.
  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  // Submit the selected members and add them to the group.
  const addNewMemberSubmitHandler = () => {
    addGroupMembers("Adding Group Member....", {
      members: selectedMembers,
      chatId,
    });
    closeHandler();
  };

  // Handle any potential errors from the API.
  useErrors([{ isError, error }]);

  return (
    <Dialog
      open={isAddMember}
      onClose={closeHandler}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: "16px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)", // Dialog shadow for aesthetics.
          overflow: "hidden", // Prevent overflow outside the dialog.
        },
      }}
    >
      {/* Header section of the dialog with gradient background and title */}
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          padding: { xs: "1.5rem", sm: "2rem" }, // Responsive padding for mobile and desktop.
          color: "white",
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: { xs: "1.5rem", sm: "2rem" }, // Adjust font size for small screens.
            fontWeight: "bold",
            mb: 1,
            textTransform: "uppercase", // Uppercase text for emphasis.
            letterSpacing: "0.05em",
          }}
        >
          <PersonAddIcon
            sx={{ mr: 2, fontSize: { xs: "2rem", sm: "2.5rem" } }}
          />
          Add New Members
        </DialogTitle>
      </Paper>

      {/* Main content of the dialog */}
      <Stack p={{ xs: "1rem", sm: "1.5rem", md: "2rem" }} spacing={3}>
        {/* Display selected members count */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "action.selected",
            borderRadius: "8px",
            padding: { xs: "0.5rem 0.75rem", sm: "0.75rem 1rem" }, // Responsive padding.
          }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Selected Members
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="primary.main"
          >
            {selectedMembers.length} {/* Show the number of selected members */}
          </Typography>
        </Box>

        {/* List of available friends to add as group members */}
        <Paper
          elevation={0}
          sx={{
            maxHeight: { xs: "40vh", sm: "50vh" }, // Responsive max height for friend list.
            overflowY: "auto", // Enable scrolling if the list is long.
            borderRadius: "8px",
            border: "1px solid",
            borderColor: "divider", // Use divider color for the border.
          }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" height={200} /> // Show loading skeleton if data is not yet available.
          ) : data?.friends?.length > 0 ? (
            // Map through available friends and display them as UserItems.
            data?.friends?.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handler={selectGroupMembers} // Pass the selection handler.
                isAdded={selectedMembers.includes(user._id)} // Indicate if the user is already selected.
              />
            ))
          ) : (
            <Typography
              textAlign="center"
              padding="2rem"
              variant="body1"
              color="text.secondary"
            >
              No Members Available
            </Typography>
          )}
        </Paper>

        {/* Buttons for canceling or confirming the action */}
        <Stack
          direction={{ xs: "column", sm: "row" }} // Stack buttons vertically on mobile and horizontally on larger screens.
          justifyContent="flex-end"
          spacing={2}
        >
          {/* Cancel button */}
          <Button
            variant="outlined"
            color="error"
            onClick={closeHandler}
            fullWidth={window.innerWidth < 600} // Full width on mobile.
            startIcon={<CloseIcon />}
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            Cancel
          </Button>
          {/* Add members button */}
          <Button
            variant="contained"
            color="primary"
            disabled={isLoadingGroupMembers || selectedMembers.length === 0} // Disable if still loading or no members selected.
            onClick={addNewMemberSubmitHandler}
            fullWidth={window.innerWidth < 600} // Full width on mobile.
            startIcon={<CheckIcon />}
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            {isLoadingGroupMembers
              ? "Adding..." // Show loading state on button.
              : `Add ${selectedMembers.length} Member${
                  selectedMembers.length !== 1 ? "s" : "" // Pluralize based on count.
                }`}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
