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

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux-toolkit/reducers/misc";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { Delete as DeleteIcon } from "lucide-react";

const DeleteMenuChat = ({ deleteMenuAnchor }) => {
  const dispatch = useDispatch();
  const { isDeleteMenu } = useSelector((state) => state.misc);

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
  };

  const handleDelete = () => {
    // Add your delete logic here
    closeHandler();
  };

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
        onClick={handleDelete}
        className="hover:bg-gray-100 transition-colors duration-200"
      >
        <ListItemIcon>
          <DeleteIcon className="text-red-500" size={20} />
        </ListItemIcon>
        <ListItemText primary="Delete Chat" className="text-red-500" />
      </MenuItem>
    </Menu>
  );
};

export default DeleteMenuChat;
