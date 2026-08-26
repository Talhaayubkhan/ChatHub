import { memo } from "react";
import { Link } from "../styles/StyledComponent";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  _id,
  name,
  newMessageAlert,
  isOnline,
  handleDeleteChat,
  sameSender,
  groupChat = false,
}) => {
  return (
    <>
      <Link
        sx={{
          padding: "0",
        }}
        to={`/chat/${_id}`}
        aria-label={`Open chat with ${name}`}
        onContextMenu={(e) => {
          e.preventDefault();
          handleDeleteChat(e, _id, groupChat);
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.01 }}
          whileInView={{ opacity: 1, scale: 1 }}
          style={{
            display: "flex",
            // gap: "1rem",
            alignItems: "center",
            padding: "0.65rem",
            // borderBottom: "2px solid lightgray",
            borderRadius: "0.75rem",
            backgroundColor: sameSender ? "#dbeafe" : "transparent",
            color: "#0f172a",
            position: "relative",
          }}
        >
          {/* Avatar Card */}
          <AvatarCard avatar={avatar} />
          <Stack>
            <Typography
              sx={{
                fontWeight: "bold",
                padding: "0.25rem 0.75rem",
                fontSize: "1rem",
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

          {isOnline && (
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                position: "absolute",
                right: "1.5rem",
                top: "50%",
                backgroundColor: "#16a34a",
                transform: "translateY(-50%)",
              }}
            />
          )}
        </motion.div>
      </Link>
    </>
  );
};

export default memo(ChatItem);
