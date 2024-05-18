import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import {
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponent";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats } from "../constants/sampleData";

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  // console.log(chatId);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const navigateBack = () => {
    navigate("/");
  };
  const handleMenuMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMenuMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

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

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            zIndex: 1,
            color: "white",
            bgcolor: "#556ced",
            "&:hover": {
              color: "dark",
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
      <Stack direction={"row"} spacing={"1rem"}>
        {isEdit ? (
          <></>
        ) : (
          <>
            <Typography variant="h4">Group Name</Typography>
            <IconButton onClick={() => setIsEdit(true)}>
              <EditIcon />
            </IconButton>
          </>
        )}
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
          <GroupsList myGroups={sampleChats} chatId={chatId} />
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
          {GroupName}
        </Grid>

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
          <GroupsList w={"50vw"} myGroups={sampleChats} chatId={chatId} />
        </Drawer>
      </Grid>
    </>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}>
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
