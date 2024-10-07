// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";

// import { sampleUsers } from "../../constants/sampleData";
// import UserItem from "../shared/UserItem";
// import { useInputValidation } from "6pp";
// import { useState } from "react";

// const NewGroup = () => {
//   const groupName = useInputValidation();

//   const [members, setMemebers] = useState(sampleUsers);
//   const [selectedMembers, setSelectedMemebers] = useState([]);

//   const selectGroupMembers = (id) => {
//     setSelectedMemebers((prev) =>
//       prev.includes(id)
//         ? prev.filter((currentItem) => currentItem !== id)
//         : [...prev, id]
//     );
//   };
//   // console.log(selectedMembers);

//   const submitHandler = () => {};

//   const closeHandlerGroup = () => {};

//   return (
//     <>
//       <Dialog open onClick={closeHandlerGroup}>
//         <Stack p={{ xs: "1rem", sm: "2rem" }} width={"30rem"} spacing={"1rem"}>
//           <DialogTitle variant="h4" fontWeight={"bold"} textAlign={"center"}>
//             New Group
//           </DialogTitle>
//           <TextField
//             value={groupName.value}
//             onChange={groupName.changeHandler}
//             label="Group Name"
//           />

//           <Typography fontWeight={"bold"} marginTop={"1rem"}>
//             Memebers
//           </Typography>

//           <Stack>
//             {members &&
//               members.map((user) => (
//                 <UserItem
//                   user={user}
//                   key={user._id}
//                   handler={selectGroupMembers}
//                   isAdded={selectedMembers.includes(user._id)}
//                 />
//               ))}
//           </Stack>

//           <Stack direction={"row"} justifyContent={"space-evenly"}>
//             <Button variant="contained" onClick={submitHandler}>
//               Create
//             </Button>
//             <Button variant="outlined" color="error">
//               Cancel
//             </Button>
//           </Stack>
//         </Stack>
//       </Dialog>
//     </>
//   );
// };

// export default NewGroup;

// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   Stack,
//   TextField,
//   Typography,
//   Divider,
// } from "@mui/material";
// import { useInputValidation } from "6pp";
// import { useState } from "react";
// import UserItem from "../shared/UserItem";
// import { sampleUsers } from "../../constants/sampleData";

// const NewGroup = () => {
//   const groupName = useInputValidation();
//   const [members, setMembers] = useState(sampleUsers);
//   const [selectedMembers, setSelectedMembers] = useState([]);

//   const selectGroupMembers = (id) => {
//     setSelectedMembers((prev) =>
//       prev.includes(id)
//         ? prev.filter((currentItem) => currentItem !== id)
//         : [...prev, id]
//     );
//   };

//   const submitHandler = () => {
//     // Handle group creation
//   };

//   const closeHandlerGroup = () => {
//     // Close dialog
//   };

//   return (
//     <Dialog open onClose={closeHandlerGroup} maxWidth="sm" fullWidth>
//       <Stack p={{ xs: "1rem", sm: "2rem" }} spacing={2}>
//         <DialogTitle variant="h4" fontWeight={"bold"} textAlign={"center"}>
//           Create New Group
//         </DialogTitle>

//         <TextField
//           fullWidth
//           value={groupName.value}
//           onChange={groupName.changeHandler}
//           label="Group Name"
//           variant="outlined"
//         />

//         <Divider />

//         <Typography fontWeight={"bold"} marginTop={"1rem"}>
//           Members
//         </Typography>

//         <Stack spacing={1}>
//           {members.map((user) => (
//             <UserItem
//               user={user}
//               key={user._id}
//               handler={selectGroupMembers}
//               isAdded={selectedMembers.includes(user._id)}
//               sx={{
//                 transition: "background-color 0.3s, box-shadow 0.3s",
//                 "&:hover": {
//                   backgroundColor: "#f0f0f0",
//                   boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
//                 },
//               }}
//             />
//           ))}
//         </Stack>

//         <Stack direction="row" spacing={2} justifyContent="center">
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={submitHandler}
//             sx={{
//               borderRadius: "20px",
//               padding: "0.5rem 2rem",
//             }}
//           >
//             Create
//           </Button>
//           <Button
//             variant="outlined"
//             color="error"
//             onClick={closeHandlerGroup}
//             sx={{
//               borderRadius: "20px",
//               padding: "0.5rem 2rem",
//             }}
//           >
//             Cancel
//           </Button>
//         </Stack>
//       </Stack>
//     </Dialog>
//   );
// };

// export default NewGroup;

// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   Stack,
//   TextField,
//   Typography,
//   Divider,
// } from "@mui/material";
// import { sampleUsers } from "../../constants/sampleData";
// import UserItem from "../shared/UserItem";
// import { useInputValidation } from "6pp";
// import { useState } from "react";

// const NewGroup = () => {
//   const groupName = useInputValidation();
//   const [members, setMembers] = useState(sampleUsers);
//   const [selectedMembers, setSelectedMembers] = useState([]);

//   const selectGroupMembers = (id) => {
//     setSelectedMembers((prev) =>
//       prev.includes(id)
//         ? prev.filter((currentItem) => currentItem !== id)
//         : [...prev, id]
//     );
//   };

//   const submitHandler = () => {
//     // Add your submission logic here
//   };

//   const closeHandlerGroup = () => {
//     // Add your close dialog logic here
//   };

//   return (
//     <Dialog open onClose={closeHandlerGroup}>
//       <Stack
//         p={{ xs: "1rem", sm: "2rem" }}
//         width={{ xs: "100%", sm: "30rem" }}
//         spacing={2}
//         borderRadius={2}
//         sx={{ boxShadow: 3, backgroundColor: "background.paper" }}
//       >
//         <DialogTitle
//           variant="h4"
//           fontWeight={"bold"}
//           textAlign={"center"}
//           sx={{ borderBottom: 1, borderColor: "divider" }}
//         >
//           New Group
//         </DialogTitle>

//         <TextField
//           value={groupName.value}
//           onChange={groupName.changeHandler}
//           label="Group Name"
//           variant="outlined"
//           fullWidth
//         />

//         <Divider sx={{ my: 2 }} />

//         <Typography fontWeight={"bold"} fontSize={"1.1rem"}>
//           Members
//         </Typography>

//         <Stack spacing={1}>
//           {members.map((user) => (
//             <UserItem
//               user={user}
//               key={user._id}
//               handler={selectGroupMembers}
//               isAdded={selectedMembers.includes(user._id)}
//               sx={{ borderRadius: 1 }}
//             />
//           ))}
//         </Stack>

//         <Stack direction={"row"} spacing={2} justifyContent={"center"}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={submitHandler}
//             fullWidth
//           >
//             Create Group
//           </Button>
//           <Button
//             variant="outlined"
//             color="error"
//             onClick={closeHandlerGroup}
//             fullWidth
//           >
//             Cancel
//           </Button>
//         </Stack>
//       </Stack>
//     </Dialog>
//   );
// };

// export default NewGroup;

// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   Stack,
//   TextField,
//   Typography,
//   Divider,
//   IconButton,
//   Box,
//   useMediaQuery,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { sampleUsers } from "../../constants/sampleData";
// import UserItem from "../shared/UserItem";
// import { useInputValidation } from "6pp";
// import { useState } from "react";
// import { useTheme } from "@mui/material/styles";

// const NewGroup = () => {
//   const groupName = useInputValidation();
//   const [members, setMembers] = useState(sampleUsers);
//   const [selectedMembers, setSelectedMembers] = useState([]);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const selectGroupMembers = (id) => {
//     setSelectedMembers((prev) =>
//       prev.includes(id)
//         ? prev.filter((currentItem) => currentItem !== id)
//         : [...prev, id]
//     );
//   };

//   const submitHandler = () => {
//     // Add your submission logic here
//   };

//   const closeHandlerGroup = () => {
//     // Add your close dialog logic here
//   };

//   return (
//     <Dialog
//       open
//       onClose={closeHandlerGroup}
//       fullWidth
//       maxWidth="sm" // Ensures it doesn’t stretch too wide on desktop
//       PaperProps={{
//         sx: {
//           width: isMobile ? "90%" : "100%", // Adds flexibility for mobile and desktop
//           maxWidth: "30rem", // Ensures a reasonable width on desktop
//           padding: isMobile ? "1rem" : "2rem",
//           borderRadius: 3,
//           boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
//         },
//       }}
//     >
//       {/* Close button and Title */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}
//       >
//         <DialogTitle variant={isMobile ? "h6" : "h5"} fontWeight="bold">
//           New Group
//         </DialogTitle>
//         <IconButton edge="end" color="inherit" onClick={closeHandlerGroup}>
//           <CloseIcon />
//         </IconButton>
//       </Box>

//       {/* Group Name Input */}
//       <Stack spacing={2} mt={2}>
//         <TextField
//           value={groupName.value}
//           onChange={groupName.changeHandler}
//           label="Group Name"
//           variant="outlined"
//           fullWidth
//           sx={{ borderRadius: 2 }}
//         />

//         <Divider sx={{ my: 2 }} />

//         {/* Members Selection */}
//         <Typography fontWeight="bold" fontSize={isMobile ? "1rem" : "1.1rem"}>
//           Members
//         </Typography>

//         <Stack spacing={1} sx={{ maxHeight: "15rem", overflowY: "auto" }}>
//           {members.map((user) => (
//             <UserItem
//               user={user}
//               key={user._id}
//               handler={selectGroupMembers}
//               isAdded={selectedMembers.includes(user._id)}
//               sx={{
//                 borderRadius: 2,
//                 padding: "0.75rem",
//                 backgroundColor: selectedMembers.includes(user._id)
//                   ? "primary.light"
//                   : "background.paper",
//                 transition: "background-color 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "primary.main",
//                   color: "white",
//                 },
//               }}
//             />
//           ))}
//         </Stack>

//         {/* Action Buttons */}
//         <Stack
//           direction={isMobile ? "column" : "row"}
//           spacing={2}
//           justifyContent="center"
//           mt={3}
//         >
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={submitHandler}
//             fullWidth
//             sx={{ fontSize: isMobile ? "0.9rem" : "1rem", borderRadius: 2 }}
//           >
//             Create Group
//           </Button>
//           <Button
//             variant="outlined"
//             color="error"
//             onClick={closeHandlerGroup}
//             fullWidth
//             sx={{ fontSize: isMobile ? "0.9rem" : "1rem", borderRadius: 2 }}
//           >
//             Cancel
//           </Button>
//         </Stack>
//       </Stack>
//     </Dialog>
//   );
// };

// export default NewGroup;

import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  Avatar,
  Chip,
  Skeleton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux-toolkit/api/apiSlice";
import { useErrors, useSendFriendRequest } from "../../hooks/hooks";
import { setIsNewGroup } from "../../redux-toolkit/reducers/misc";
import toast from "react-hot-toast";

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const groupName = useInputValidation("");

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] =
    useSendFriendRequest(useNewGroupMutation);
  // console.log(data);

  const [selectedMembers, setSelectedMembers] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectGroupMembers = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentItem) => currentItem !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) toast.error("Group Name us required!");
    let minMembers = Math.max(2, selectedMembers.length);
    if (selectedMembers.length < minMembers) {
      return toast.error(`Please Select Atleast ${minMembers} Members`);
    }

    // creating group!

    newGroup("Creating Group..", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandlerGroup();
  };

  const closeHandlerGroup = () => {
    // Add your close dialog logic here
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog
      open={isNewGroup}
      onClose={closeHandlerGroup}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          width: isMobile ? "95%" : "100%",
          maxWidth: "35rem",
          padding: isMobile ? "1.5rem" : "2.5rem",
          borderRadius: 4,
          boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(145deg, #ffffff, #f0f4f8)",
        },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Box display="flex" alignItems="center">
          <GroupAddIcon sx={{ fontSize: 32, color: "primary.main", mr: 1.5 }} />
          <DialogTitle
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            sx={{ p: 0, color: "primary.main" }}
          >
            New Group
          </DialogTitle>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={closeHandlerGroup}
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.04)",
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.08)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Group Name Input */}
      <Stack spacing={3}>
        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          label="Group Name"
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "background.paper",
              "&:hover": {
                "& > fieldset": { borderColor: "primary.main" },
              },
            },
          }}
        />

        {/* Selected Members */}
        <Box>
          <Typography
            fontWeight="bold"
            fontSize={isMobile ? "1rem" : "1.1rem"}
            mb={1}
          >
            Selected Members
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {selectedMembers.map((id) => {
              const user = data?.friends?.find((m) => m._id === id);
              return (
                <Chip
                  key={id}
                  avatar={<Avatar src={user.avatar} />}
                  label={user.name}
                  onDelete={() => selectGroupMembers(id)}
                  sx={{
                    bgcolor: "primary.light",
                    "& .MuiChip-deleteIcon": {
                      color: "primary.main",
                      "&:hover": { color: "primary.dark" },
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* Members Selection */}
        <Box>
          <Typography
            fontWeight="bold"
            fontSize={isMobile ? "1rem" : "1.1rem"}
            mb={1}
          >
            Add Members
          </Typography>
          <Box
            sx={{
              maxHeight: "15rem",
              overflowY: "auto",
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 1,
              boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Stack spacing={1}>
              {isLoading ? (
                <Skeleton />
              ) : (
                data?.friends?.map((user) => (
                  <UserItem
                    user={user}
                    key={user._id}
                    handler={selectGroupMembers}
                    isAdded={selectedMembers.includes(user._id)}
                    sx={{
                      borderRadius: 2,
                      padding: "0.75rem",
                      backgroundColor: selectedMembers.includes(user._id)
                        ? "primary.light"
                        : "background.default",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  />
                ))
              )}
            </Stack>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          justifyContent="center"
          mt={2}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
            fullWidth
            sx={{
              fontSize: isMobile ? "1rem" : "1.1rem",
              borderRadius: 2,
              py: 1.5,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Create Group
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={closeHandlerGroup}
            fullWidth
            sx={{
              fontSize: isMobile ? "1rem" : "1.1rem",
              borderRadius: 2,
              py: 1.5,
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
                backgroundColor: "rgba(211, 47, 47, 0.04)",
              },
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
