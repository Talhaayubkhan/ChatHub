import {
  Avatar,
  IconButton,
  ListItem,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { memo } from "react";

const UserItem = ({
  user,
  handler,
  ishandlerLoading,
  isAdded = false,
  styling,
}) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem
      sx={{
        borderRadius: "10px",
        padding: "0.8rem",
        transition: "background-color 0.3s ease",
        bgcolor: "#fff", // Default background color
        "&:hover": {
          bgcolor: "#f1f1f1", // Background color on hover
        },
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar
          src={avatar}
          sx={{
            width: 56,
            height: 56,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />

        <Typography
          variant={"body1"}
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#333",
          }}
        >
          {name}
        </Typography>

        <Tooltip title={isAdded ? "Remove Friend" : "Add Friend"}>
          <IconButton
            size="medium"
            sx={{
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              bgcolor: isAdded ? "error.main" : "primary.main",
              color: "white",
              transition: "background-color 0.3s ease",
              "&:hover": {
                bgcolor: isAdded ? "error.dark" : "primary.dark",
              },
            }}
            onClick={() => handler(_id)}
            disabled={ishandlerLoading}
            aria-label={isAdded ? "Remove friend" : "Add friend"}
          >
            {isAdded ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </Tooltip>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
