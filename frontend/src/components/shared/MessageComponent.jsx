import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachment = [], timestamp } = message;

  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(timestamp).fromNow();
  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "1rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography color={"crimson"} fontWeight={"bold"}>
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}

      {attachment.length > 0 &&
        attachment.map((currentAttachment, i) => {
          const url = currentAttachment?.url;
          const file = "Hello World";
          return (
            <Box key={i}>
              <a
                href={url}
                target="_blank"
                download
                rel="noreferrer"
                style={{
                  color: "black",
                }}
              >
                {file}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
