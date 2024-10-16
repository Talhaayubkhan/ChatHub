import { Box, Typography } from "@mui/material";
import moment from "moment";
import { memo } from "react";
import { fileFormat } from "../../lib/features";
import RenderAttachMent from "./RenderAttachMent";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  // console.log("message are", message);
  const { sender, content, attachments = [], timestamp } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(timestamp).fromNow();
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileInView={{ opacity: 1, x: 0 }}
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
          {sender?.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}
      {attachments.map((currentAttachment, i) => {
        const url = currentAttachment.url;
        const file = fileFormat(url);
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
              {/* hello */}
              {RenderAttachMent && RenderAttachMent(file, url)}
            </a>
          </Box>
        );
      })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
