import React from "react";
import { Stack } from "@mui/material";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
      {chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, memebers } = data;

        const newMessageAlert = newMessagesAert.find(
          ({ chatId }) => chatId === _id
        );

        const isOnline = memebers?.some((member) => onlineUsers.includes(_id));

        return (
          <ChatItem
            // Current position in the list
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={onlineUsers}
            avatar={avatar}
            name={name}
            // Unique chat identifier
            _id={_id}
            // React key for efficient updates
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
