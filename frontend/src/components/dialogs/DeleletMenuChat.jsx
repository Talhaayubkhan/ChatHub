// import { Menu, Stack } from "@mui/material";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsDeleteMenu } from "../../redux-toolkit/reducers/misc";

// const DeleletMenuChat = ({ dispatch, deleteMenuAnchor }) => {
//   const { isDeleteMenu } = useSelector((state) => state.misc);
//   const closeHandler = () => {
//     dispatch(setIsDeleteMenu(false));
//   };

//   return (
//     <>
//       <Menu
//         open={isDeleteMenu}
//         onClose={closeHandler}
//         anchorEl={deleteMenuAnchor}
//       >
//         <Stack
//           sx={{
//             width: "10rem",
//             padding: "0.5rem",
//             gap: "1rem",
//             cursor: "pointer",
//           }}
//           direction={"row"}
//           alignItems={"center"}
//           spacing={"0.5rem"}
//         >
//           Delete Chat
//         </Stack>
//       </Menu>
//     </>
//   );
// };

// export default DeleletMenuChat;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux-toolkit/reducers/misc";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSendFriendRequest } from "../../hooks/hooks";
import {
  useDeleteGroupChatsMutation,
  useLeaveGroupMutation,
} from "../../redux-toolkit/api/apiSlice";

const DeleteMenuChat = ({ deleteMenuAnchor }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );

  const [deleteChat, _, deleteChatData] = useSendFriendRequest(
    useDeleteGroupChatsMutation
  );
  const [leaveGroup, __, leaveGroupData] = useSendFriendRequest(
    useLeaveGroupMutation
  );

  const isGroup = selectedDeleteChat.groupChat;
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };

  const deleteChatHandler = () => {
    // Add your delete logic here
    closeHandler();
    deleteChat("Deleting Chat....", selectedDeleteChat.chatId);
  };

  const leaveChatHandler = () => {
    closeHandler();
    leaveGroup("Leaving Group Chat....", selectedDeleteChat.chatId);
  };

  useEffect(() => {
    if (deleteChatData || leaveGroupData) navigate("/");
  }, [deleteChatData, leaveGroupData]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuItem
        onClick={isGroup ? leaveChatHandler : deleteChatHandler}
        className="hover:bg-gray-100 transition-colors duration-200"
      >
        <ListItemIcon>
          {selectedDeleteChat.groupChat ? (
            <ExitToAppIcon className="text-yellow-500" size={20} />
          ) : (
            <DeleteIcon className="text-red-500" size={20} />
          )}
        </ListItemIcon>
        <ListItemText
          primary={isGroup ? "Leave Group" : "Delete Chat"}
          className={isGroup ? "text-yellow-500" : "text-red-500"}
        />{" "}
      </MenuItem>
    </Menu>
  );
};

export default DeleteMenuChat;
