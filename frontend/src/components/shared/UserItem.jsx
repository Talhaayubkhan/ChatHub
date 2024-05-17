import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import React, { memo } from "react";

const UserItem = ({ user, handler, ishandlerLoading, isAdded = false }) => {
  const { name, _id, avatar } = user;
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
            {name}
          </Typography>
          <IconButton
            size="small"
            sx={{
              bgcolor: isAdded ? "error.main" : "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: isAdded ? "error.main" : "primary.dark",
              },
            }}
            onClick={() => handler(_id)}
            disabled={ishandlerLoading}
          >
            {isAdded ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </Stack>
      </ListItem>
    </>
  );
};

export default memo(UserItem);
