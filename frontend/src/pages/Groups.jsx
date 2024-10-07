// import {
//   Backdrop,
//   Box,
//   Button,
//   Drawer,
//   Grid,
//   IconButton,
//   Stack,
//   TextField,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import { lazy, memo, useEffect, useState, Suspense } from "react";
// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   Done,
//   Edit as EditIcon,
//   KeyboardBackspace as KeyboardBackspaceIcon,
//   Menu as MenuIcon,
// } from "@mui/icons-material";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Link } from "../components/styles/StyledComponent";
// import AvatarCard from "../components/shared/AvatarCard";
// import { sampleChats, sampleUsers } from "../constants/sampleData";
// import UserItem from "../components/shared/UserItem";

// const ConfrimDeleteDialoge = lazy(() =>
//   import("../components/dialogs/ConfrimDeleteDialoge")
// );

// const AddMemberDialoge = lazy(() =>
//   import("../components/dialogs/AddMemberDialoge")
// );

// const isAddMember = false;

// const Groups = () => {
//   const chatId = useSearchParams()[0].get("group");
//   // console.log(chatId);
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [groupName, setGroupName] = useState("");
//   const [groupUpdatedValue, setGroupUpdatedValue] = useState("");
//   const [confrimDeleteDialog, setConfrimDeleteDialog] = useState(false);

//   const navigateBack = () => {
//     navigate("/");
//   };
//   const handleMenuMobile = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   const handleMenuMobileClose = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const updateGroupName = () => {
//     setIsEdit(false);
//     console.log("update the group name");
//   };

//   const AddMember = () => {
//     console.log("add member");
//   };
//   const openConfrimDeleteMember = () => {
//     setConfrimDeleteDialog(true);
//     console.log("delete member");
//   };
//   const closeConfrimDeleteMember = () => {
//     setConfrimDeleteDialog(false);
//     console.log("close delete member");
//   };

//   const removeMemberHandler = (id) => {
//     console.log("remove member", id);
//   };

//   //
//   useEffect(() => {
//     // setGroupName(`Group Name ${chatId}`);
//     // setGroupUpdatedValue(`Group Name ${chatId}`);
//     // show when chatid matches
//     if (chatId) {
//       setGroupName(`Group Name ${chatId}`);
//       setGroupUpdatedValue(`Group Name ${chatId}`);
//     }

//     // Cleanup functions in useEffect are essential for managing side effects and resources, ensuring proper cleanup when the component unmounts or when dependencies change, preventing memory leaks and maintaining lifecycle integrity.
//     return () => {
//       setGroupName("");
//       setGroupUpdatedValue("");
//     };
//   }, [chatId]);

//   const IconButtons = (
//     <>
//       <Box
//         sx={{
//           display: {
//             xs: "block",
//             sm: "none",
//             position: "fixed",
//             right: "1rem",
//             top: "1rem",
//           },
//         }}
//       >
//         <IconButton onClick={handleMenuMobile}>
//           <MenuIcon />
//         </IconButton>
//       </Box>

//       <Tooltip title="Back">
//         <IconButton
//           sx={{
//             position: "absolute",
//             top: "2rem",
//             left: "1.5rem",
//             zIndex: 1,
//             color: "white",
//             backgroundColor: "#556ced",
//             "&:hover": {
//               backgroundColor: "#3c50c7",
//             },
//           }}
//           onClick={navigateBack}
//         >
//           <KeyboardBackspaceIcon />
//         </IconButton>
//       </Tooltip>
//     </>
//   );

//   const GroupName = (
//     <>
//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="space-between"
//         padding={1}
//       >
//         {isEdit ? (
//           <>
//             <TextField
//               value={groupUpdatedValue}
//               onChange={(e) => setGroupUpdatedValue(e.target.value)}
//               variant="outlined"
//               fullWidth
//               size="largeZ"
//             />
//             <IconButton onClick={updateGroupName}>
//               <Done />
//             </IconButton>
//           </>
//         ) : (
//           <>
//             <Typography
//               variant="h5"
//               marginTop={"10px"}
//               fontWeight="bold"
//               fontFamily="cursive"
//             >
//               {groupName}
//             </Typography>
//             <IconButton onClick={() => setIsEdit(true)}>
//               <EditIcon />
//             </IconButton>
//           </>
//         )}
//       </Box>
//     </>
//   );

//   const showGroupMembers = (
//     <>
//       <Typography
//         margin={"2rem"}
//         fontWeight={"bold"}
//         alignSelf={"start"}
//         variant="body1"
//       >
//         Members
//       </Typography>

//       <Stack
//         maxWidth={"45rem"}
//         width={"100%"}
//         boxSizing={"border-box"}
//         padding={{
//           sm: "1rem",
//           xs: "0rem",
//           md: "1rem 4rem",
//         }}
//         spacing={"2rem"}
//         // bgcolor={"lightgray"}
//         height={"50vh"}
//         overflow={"auto"}
//       >
//         {/* fetch all Members */}
//         {sampleUsers.map((user) => (
//           <UserItem
//             key={user._id}
//             user={user}
//             isAdded
//             styling={{
//               boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
//               borderRadius: "1rem",
//               padding: "1rem 2rem",
//             }}
//             handler={removeMemberHandler}
//           />
//         ))}
//       </Stack>
//     </>
//   );

//   const memeberButtonGroup = (
//     <>
//       {/* <Stack
//         direction={{ xs: "column-reverse", sm: "row" }}
//         spacing={"1rem"}
//         p={{
//           xs: "2rem",
//           sm: "1rem",
//           md: "2rem 4rem",
//         }}
//       >
//         <Button size="large" variant="contained">
//           Add Memebers
//         </Button>
//         <Button size="large">Delete Group</Button>
//       </Stack> */}
//       {/* <Stack
//         direction={{ xs: "column-reverse", sm: "row" }}
//         spacing={"1rem"}
//         p={2}
//       >
//         <Button
//           size="large"
//           variant="contained"
//           sx={{
//             // borderRadius: 16,
//             backgroundColor: "#2196f3",
//             color: "white",
//           }}
//           startIcon={<AddIcon />}
//         >
//           Add Members
//         </Button>
//         <Button
//           size="large"
//           variant="outlined"
//           color="error"
//           startIcon={<DeleteIcon />}
//         >
//           Delete Group
//         </Button>
//       </Stack> */}
//       <Stack
//         direction={{ xs: "column-reverse", sm: "row" }}
//         spacing={{ xs: 2, sm: 2 }}
//         p={"2rem"}
//       >
//         <Button
//           size="large"
//           variant="contained"
//           sx={{
//             // borderRadius: 20,
//             backgroundColor: "#2196f3",
//             color: "white",
//             "&:hover": {
//               backgroundColor: "#1976d2",
//             },
//           }}
//           onClick={AddMember}
//           startIcon={<AddIcon />}
//         >
//           Add Members
//         </Button>
//         <IconButton
//           sx={{
//             borderRadius: 20,
//             backgroundColor: "transparent",
//             color: "#f44336",
//             border: "2px solid #f44336",
//             "&:hover": {
//               backgroundColor: "#f44336",
//               color: "white",
//             },
//           }}
//           onClick={openConfrimDeleteMember}
//         >
//           <DeleteIcon />
//         </IconButton>
//       </Stack>
//     </>
//   );

//   return (
//     <>
//       <Grid container height={"100vh"}>
//         <Grid
//           item
//           sm={4}
//           sx={{
//             display: {
//               xs: "none",
//               sm: "block",
//             },
//           }}
//           bgcolor={"lightgray"}
//         >
//           <GroupsList myGroups={sampleChats} chatId={chatId} />
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           sm={8}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             position: "relative",
//             padding: "1rem 3rem", // Corrected padding value
//           }}
//         >
//           {IconButtons}
//           {groupName && (
//             <>
//               {GroupName} {showGroupMembers}
//               {memeberButtonGroup}
//             </>
//           )}
//         </Grid>

//         {isAddMember && (
//           <Suspense fallback={<Backdrop open />}>
//             <AddMemberDialoge />
//           </Suspense>
//         )}

//         {confrimDeleteDialog && (
//           <Suspense fallback={<Backdrop open />}>
//             <ConfrimDeleteDialoge
//               open={confrimDeleteDialog}
//               handleClose={closeConfrimDeleteMember}
//             />
//           </Suspense>
//         )}

//         <Drawer
//           sx={{
//             display: {
//               xs: "block",
//               sm: "none",
//             },
//           }}
//           open={isMobileMenuOpen}
//           onClose={handleMenuMobileClose}
//         >
//           <GroupsList w={"50vw"} myGroups={sampleChats} chatId={chatId} />
//         </Drawer>
//       </Grid>
//     </>
//   );
// };

// const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
//   <Stack width={w} sx={{ height: "100vh", overflow: "auto" }}>
//     {myGroups.length > 0 ? (
//       myGroups.map((group) => (
//         <GroupListItem group={group} chatId={chatId} key={group._id} />
//       ))
//     ) : (
//       <Typography textAlign={"center"} padding="1rem">
//         No Groups
//       </Typography>
//     )}
//   </Stack>
// );

// // Memoization optimizes functional components by caching the result of the component's rendering,
// // thus preventing unnecessary re-renders when props haven't changed, improving performance.
// const GroupListItem = memo(({ group, chatId }) => {
//   const { name, avatar, _id } = group;

//   return (
//     <Link
//       to={`?group=${_id}`}
//       onClick={(e) => {
//         if (chatId === _id) {
//           e.preventDefault();
//         }
//       }}
//     >
//       <Stack
//         direction="row"
//         alignItems="center"
//         spacing={"1rem"}
//         // padding="1rem"
//       >
//         <AvatarCard avatar={avatar} />
//         <Typography>{name}</Typography>
//       </Stack>
//     </Link>
//   );
// });

// export default Groups;

import React, { lazy, memo, useEffect, useState, Suspense } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "../components/styles/StyledComponent";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constants/sampleData";
import UserItem from "../components/shared/UserItem";
import {
  useGetMyGroupsQuery,
  useMembersChatDetailsQuery,
} from "../redux-toolkit/api/apiSlice";
import { useErrors } from "../hooks/hooks";
import { LayoutLoaders } from "../components/layout/Loaders";

const ConfrimDeleteDialoge = lazy(() =>
  import("../components/dialogs/ConfrimDeleteDialoge")
);

const AddMemberDialoge = lazy(() =>
  import("../components/dialogs/AddMemberDialoge")
);

const Groups = () => {
  const theme = useTheme();
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();

  const myGroups = useGetMyGroupsQuery("");

  const groupDetails = useMembersChatDetailsQuery(
    { chatId, populate: true },
    {
      skip: !chatId,
    }
  );
  console.log(groupDetails.data);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupUpdatedValue, setGroupUpdatedValue] = useState("");
  const [confrimDeleteDialog, setConfrimDeleteDialog] = useState(false);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMenuMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMenuMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    setIsEdit(false);
    setGroupName(groupUpdatedValue);
  };

  const AddMember = () => {
    console.log("add member");
  };

  const openConfrimDeleteMember = () => {
    setConfrimDeleteDialog(true);
  };

  const closeConfrimDeleteMember = () => {
    setConfrimDeleteDialog(false);
  };

  const removeMemberHandler = (id) => {
    console.log("remove member", id);
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupUpdatedValue("");
    };
  }, [chatId]);

  const HeaderSection = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      <IconButton
        onClick={navigateBack}
        sx={{
          color: theme.palette.primary.main,
        }}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ flexGrow: 1, textAlign: "center" }}
      >
        {groupName}
      </Typography>
      <IconButton
        sx={{
          display: { xs: "block", sm: "none" },
          color: theme.palette.primary.main,
        }}
        onClick={handleMenuMobile}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );

  const GroupNameEdit = (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={2}
      sx={{
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        borderRadius: "1rem",
        marginBottom: "1rem",
      }}
    >
      {isEdit ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ display: "flex", width: "100%", maxWidth: "400px" }}
        >
          <TextField
            value={groupUpdatedValue}
            onChange={(e) => setGroupUpdatedValue(e.target.value)}
            variant="outlined"
            fullWidth
            size="medium"
            sx={{ marginRight: "1rem" }}
          />
          <IconButton onClick={updateGroupName} color="primary">
            <Done />
          </IconButton>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: theme.palette.primary.main, marginRight: "1rem" }}
          >
            {groupName}
          </Typography>
          <IconButton onClick={() => setIsEdit(true)} color="primary">
            <EditIcon />
          </IconButton>
        </motion.div>
      )}
    </Box>
  );

  const showGroupMembers = (
    <Box sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          margin: "2rem 0 1rem",
          color: theme.palette.text.secondary,
          textAlign: "center",
        }}
      >
        Members
      </Typography>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack
          spacing={2}
          sx={{
            height: "50vh",
            overflow: "auto",
            padding: "1rem",
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            borderRadius: "1rem",
            boxShadow: theme.shadows[4],
          }}
        >
          {sampleUsers.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              isAdded
              styling={{
                borderRadius: "0.5rem",
                padding: "0.75rem 1rem",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
              handler={removeMemberHandler}
            />
          ))}
        </Stack>
      </motion.div>
    </Box>
  );

  const memberButtonGroup = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        marginTop: "2rem",
        width: "100%",
        maxWidth: "600px",
        margin: "2rem auto 0",
      }}
    >
      <Button
        fullWidth
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={AddMember}
        sx={{
          borderRadius: "2rem",
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: theme.shadows[4],
          padding: "0.75rem 1.5rem",
        }}
      >
        Add Members
      </Button>
      <Button
        fullWidth
        size="large"
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfrimDeleteMember}
        sx={{
          borderRadius: "2rem",
          fontWeight: "bold",
          textTransform: "none",
          borderWidth: "2px",
          padding: "0.75rem 1.5rem",
          "&:hover": {
            borderWidth: "2px",
            backgroundColor: alpha(theme.palette.error.main, 0.1),
          },
        }}
      >
        Delete Group
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoaders />
  ) : (
    <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
      <Grid
        item
        sm={4}
        sx={{
          display: { xs: "none", sm: "block" },
          backgroundColor: theme.palette.background.default,
          borderRight: `1px solid ${theme.palette.divider}`,
        }}
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {HeaderSection}
        <Box sx={{ flexGrow: 1, overflow: "auto", padding: "1rem" }}>
          <AnimatePresence>
            {groupName && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ width: "100%" }}
              >
                {GroupNameEdit}
                {showGroupMembers}
                {memberButtonGroup}
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Grid>

      <Drawer
        anchor="left"
        open={isMobileMenuOpen}
        onClose={handleMenuMobileClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: "80%" },
        }}
      >
        <GroupsList
          w="100%"
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        />
      </Drawer>

      <Suspense fallback={<Backdrop open />}>
        {confrimDeleteDialog && (
          <ConfrimDeleteDialoge
            open={confrimDeleteDialog}
            handleClose={closeConfrimDeleteMember}
          />
        )}
      </Suspense>
    </Grid>
  );
};

const GroupsList = memo(({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w} sx={{ height: "100%", overflow: "auto", padding: "1rem" }}>
    <Typography
      variant="h6"
      fontWeight="bold"
      sx={{ marginBottom: "1rem", textAlign: "center" }}
    >
      My Groups
    </Typography>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign="center" color="text.secondary">
        No Groups
      </Typography>
    )}
  </Stack>
));

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  const theme = useTheme();

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
      style={{ textDecoration: "none" }}
    >
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            padding: "0.75rem",
            borderRadius: "0.5rem",
            backgroundColor:
              chatId === _id
                ? alpha(theme.palette.primary.main, 0.1)
                : "transparent",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          <AvatarCard avatar={avatar} />
          <Typography color="text.primary">{name}</Typography>
        </Stack>
      </motion.div>
    </Link>
  );
});

export default Groups;
