import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { lazy, memo, useEffect, useState, Suspense } from "react";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponent";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constants/sampleData";
import UserItem from "../components/shared/UserItem";

import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux-toolkit/reducers/misc";
import { useErrors, useSendFriendRequest } from "../hooks/hooks";
import {
  useDeleteGroupChatsMutation,
  useGetMyGroupsQuery,
  useMembersChatDetailsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux-toolkit/api/apiSlice";

const ConfrimDeleteDialoge = lazy(() =>
  import("../components/dialogs/ConfrimDeleteDialoge")
);

const AddMemberDialoge = lazy(() =>
  import("../components/dialogs/AddMemberDialoge")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useGetMyGroupsQuery("");

  const groupDetails = useMembersChatDetailsQuery(
    { chatId, populate: true },
    {
      skip: !chatId,
    }
  );

  // console.log(groupDetails.data);

  const [updatingGroup, isUpdatingGroup] = useSendFriendRequest(
    useRenameGroupMutation
  );

  const [removeGroupMember, isLoadingRemoveGroupMember] = useSendFriendRequest(
    useRemoveGroupMemberMutation
  );
  const [deleteGroupChats, isLoadingDeleteGroupChat] = useSendFriendRequest(
    useDeleteGroupChatsMutation
  );

  // console.log(chatId);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupUpdatedValue, setGroupUpdatedValue] = useState("");
  const [confrimDeleteDialog, setConfrimDeleteDialog] = useState(false);

  const [showMembers, setIsShowMembers] = useState([]);

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

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupUpdatedValue(groupData.chat.name);
      setIsShowMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupUpdatedValue("");
      setIsShowMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

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
    updatingGroup("Updating Group Name...", {
      chatId,
      name: groupUpdatedValue,
    });
    console.log("update the group name");
  };

  const AddMember = () => {
    dispatch(setIsAddMember(true));
    console.log("add member");
  };

  const openConfrimDeleteMember = () => {
    setConfrimDeleteDialog(true);
  };
  const closeConfrimDeleteMember = () => {
    setConfrimDeleteDialog(false);
  };

  const deleteHandler = () => {
    deleteGroupChats("Deleting Group..", chatId);
    closeConfrimDeleteMember();
    navigate("/groups");
  };

  const removeMemberHandler = (userId) => {
    removeGroupMember("Removing Group Member...", { chatId, userId });
    // console.log("remove member", id);
  };

  //
  useEffect(() => {
    // show when chatid matches
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupUpdatedValue(`Group Name ${chatId}`);
    }

    // Cleanup functions in useEffect are essential for managing side effects and resources, ensuring proper cleanup when the component unmounts or when dependencies change, preventing memory leaks and maintaining lifecycle integrity.
    return () => {
      setGroupName("");
      setGroupUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconButtons = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMenuMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "1.5rem",
            zIndex: 1,
            color: "white",
            backgroundColor: "#556ced",
            "&:hover": {
              backgroundColor: "#3c50c7",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
      >
        {isEdit ? (
          <>
            <TextField
              value={groupUpdatedValue}
              onChange={(e) => setGroupUpdatedValue(e.target.value)}
              variant="outlined"
              fullWidth
              size="largeZ"
            />
            <IconButton onClick={updateGroupName} disabled={isUpdatingGroup}>
              <Done />
            </IconButton>
          </>
        ) : (
          <>
            <Typography
              variant="h5"
              marginTop={"10px"}
              fontWeight="bold"
              fontFamily="cursive"
            >
              {groupName}
            </Typography>
            <IconButton
              disabled={isUpdatingGroup}
              onClick={() => setIsEdit(true)}
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      </Box>
    </>
  );

  const showGroupMembers = (
    <>
      <Typography
        margin={"2rem"}
        fontWeight={"bold"}
        alignSelf={"start"}
        variant="body1"
      >
        Members
      </Typography>

      <Stack
        maxWidth={"45rem"}
        width={"100%"}
        boxSizing={"border-box"}
        padding={{
          sm: "1rem",
          xs: "0rem",
          md: "1rem 4rem",
        }}
        spacing={"2rem"}
        // bgcolor={"lightgray"}
        height={"50vh"}
        overflow={"auto"}
      >
        {/* fetch all Members */}
        {isLoadingRemoveGroupMember ? (
          <CircularProgress />
        ) : (
          showMembers.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              isAdded
              styling={{
                boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                borderRadius: "1rem",
                padding: "1rem 2rem",
              }}
              handler={removeMemberHandler}
            />
          ))
        )}
      </Stack>
    </>
  );

  const memeberButtonGroup = (
    <>
      {/* <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        spacing={"1rem"}
        p={{
          xs: "2rem",
          sm: "1rem",
          md: "2rem 4rem",
        }}
      >
        <Button size="large" variant="contained">
          Add Memebers
        </Button>
        <Button size="large">Delete Group</Button>
      </Stack> */}
      {/* <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        spacing={"1rem"}
        p={2}
      >
        <Button
          size="large"
          variant="contained"
          sx={{
            // borderRadius: 16,
            backgroundColor: "#2196f3",
            color: "white",
          }}
          startIcon={<AddIcon />}
        >
          Add Members
        </Button>
        <Button
          size="large"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete Group
        </Button>
      </Stack> */}
      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        spacing={{ xs: 2, sm: 2 }}
        p={"2rem"}
      >
        <Button
          size="large"
          variant="contained"
          sx={{
            // borderRadius: 20,
            backgroundColor: "#2196f3",
            color: "white",
            "&:hover": {
              backgroundColor: "#1976d2",
            },
          }}
          onClick={AddMember}
          startIcon={<AddIcon />}
        >
          Add Members
        </Button>
        <IconButton
          sx={{
            borderRadius: 20,
            backgroundColor: "transparent",
            color: "#f44336",
            border: "2px solid #f44336",
            "&:hover": {
              backgroundColor: "#f44336",
              color: "white",
            },
          }}
          onClick={openConfrimDeleteMember}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </>
  );

  return (
    <>
      <Grid container height={"100vh"}>
        <Grid
          item
          sm={4}
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          bgcolor={"lightgray"}
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
            alignItems: "center",
            position: "relative",
            padding: "1rem 3rem", // Corrected padding value
          }}
        >
          {IconButtons}
          {groupName && (
            <>
              {GroupName} {showGroupMembers}
              {memeberButtonGroup}
            </>
          )}
        </Grid>

        {isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialoge chatId={chatId} />
          </Suspense>
        )}

        {confrimDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfrimDeleteDialoge
              open={confrimDeleteDialog}
              handleClose={closeConfrimDeleteMember}
              deleteHandler={deleteHandler}
              groupName={groupName}
            />
          </Suspense>
        )}

        <Drawer
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
          }}
          open={isMobileMenuOpen}
          onClose={handleMenuMobileClose}
        >
          <GroupsList
            w={"50vw"}
            myGroups={myGroups?.data?.groups}
            chatId={chatId}
          />
        </Drawer>
      </Grid>
    </>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w} sx={{ height: "100vh", overflow: "auto" }}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No Groups
      </Typography>
    )}
  </Stack>
);

// Memoization optimizes functional components by caching the result of the component's rendering,
// thus preventing unnecessary re-renders when props haven't changed, improving performance.
const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={"1rem"}
        // padding="1rem"
      >
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
