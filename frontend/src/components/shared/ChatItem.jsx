import React, { memo } from "react";
import { Link } from "../styles/StyledComponent";
import { Box, Stack, Typography } from "@mui/material";

const ChatItem = ({
  avatar = [],
  _id,
  name,
  newMessageAlert,
  isOnline,
  handleDeleteChatItem,
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
        onContextMenu={(e) => handleDeleteChatItem(e, _id, groupChat)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 15px",
            borderBottom: "1px solid lightgray",
            backgroundColor: sameSender ? "white" : "black",
            color: sameSender ? "black" : "white",
            position: "relative",
            gap: "1rem",
          }}
        >
          {/* Avatar Card */}
          <Stack>
            <Typography>{name}</Typography>
            {newMessageAlert && (
              <Typography>{newMessageAlert.count} New Message</Typography>
            )}
          </Stack>

          {isOnline && (
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                position: "absolute",
                right: "10px",
                top: "10px",
                backgroundColor: "green",
                //     borderRadius: "50%",
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
