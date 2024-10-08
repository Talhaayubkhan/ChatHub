import React, { memo } from "react";
import { Link } from "../styles/StyledComponent";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  _id,
  name,
  newMessageAlert,
  isOnline,
  handleDeleteChat,
  sameSender,
  groupChat = false,
  index = 0,
}) => {
  return (
    <>
      <Link
        sx={{
          padding: "0",
        }}
        to={`/chat/${_id}`}
        onContextMenu={(e) => {
          e.preventDefault();
          handleDeleteChat(e, _id, groupChat);
        }}
      >
        <div
          style={{
            display: "flex",
            // gap: "1rem",
            alignItems: "center",
            padding: "0.5rem",
            // borderBottom: "2px solid lightgray",
            borderRadius: "2px",
            backgroundColor: sameSender ? "#42a5f5" : "unset",
            color: sameSender ? "#03071e" : "unset",
            position: "relative",
          }}
        >
          {/* Avatar Card */}
          <AvatarCard avatar={avatar} />
          <Stack>
            <Typography
              sx={{
                fontWeight: "bold",
                padding: "1rem",
                fontSize: "1.3rem",
                maxWidth: "30rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textTransform: "capitalize",
              }}
            >
              {name}
            </Typography>
            {newMessageAlert && (
              <Typography>{newMessageAlert.count} New Message</Typography>
            )}
          </Stack>

          {!isOnline && (
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "55%",
                position: "absolute",
                right: "1.5rem",
                top: "50%",
                backgroundColor: "green",
                transform: "translateY(-50%)",
              }}
            />
          )}
        </div>
      </Link>
    </>
  );
};

export default memo(ChatItem);
