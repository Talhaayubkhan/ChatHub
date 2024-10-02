// import React from "react";
// import { Stack } from "@mui/material";
// import ChatItem from "../shared/ChatItem";

// const ChatList = ({
//   w = "100%",
//   chats = [],
//   chatId,
//   onlineUsers = [],
//   newMessagesAlert = [
//     {
//       chatId: "",
//       count: 0,
//     },
//   ],
//   handleDeleteChat,
// }) => {
//   return (
//     <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
//       {chats?.map((data, index) => {
//         const { avatar, _id, name, groupChat, members } = data;

//         const newMessageAlert = newMessagesAlert.find(
//           ({ chatId }) => chatId === _id
//         );

//         const isOnline = members?.some((member) =>
//           onlineUsers.includes(member._id)
//         );

//         return (
//           <ChatItem
//             // Current position in the list
//             index={index}
//             newMessageAlert={newMessageAlert}
//             isOnline={isOnline}
//             avatar={avatar}
//             name={name}
//             _id={_id}
//             key={_id}
//             groupChat={groupChat}
//             sameSender={chatId === _id}
//             handleDeleteChat={handleDeleteChat}
//           />
//         );
//       })}
//     </Stack>
//   );
// };

// export default ChatList;

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
  console.log("chats", chats);
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
      {chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data; // Fixed typo: memebers -> members

        // Check for new message alerts
        const newMessageAlert = newMessagesAert.find(
          ({ chatId }) => chatId === _id
        );

        // Check if any members of the chat are online
        const isOnline = members?.some((member) =>
          onlineUsers.includes(member._id)
        ); // Check member._id against onlineUsers

        return (
          <ChatItem
            // Current position in the list
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline} // Pass the boolean value, not the array
            avatar={avatar}
            name={name}
            _id={_id}
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
