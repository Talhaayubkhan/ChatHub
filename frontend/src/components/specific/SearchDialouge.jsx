// import {
//   Dialog,
//   DialogTitle,
//   InputAdornment,
//   List,
//   Stack,
//   TextField,
//   IconButton,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Close as CloseIcon,
//   FindInPage as FindHereIcon,
// } from "@mui/icons-material";
// import { useInputValidation } from "6pp";
// import UserItem from "../shared/UserItem";
// import { useState } from "react";
// import { sampleUsers } from "../../constants/sampleData";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsSearch } from "../../redux-toolkit/reducers/misc";

// const SearchDialogue = () => {
//   const { isSearch } = useSelector((state) => state.misc);
//   const dispatch = useDispatch();
//   const search = useInputValidation("");
//   const [users, setUsers] = useState(sampleUsers);

//   let isLoadingSendFriendRequest = false;

//   const addFriendHandler = (id) => {
//     console.log(id);
//   };

//   const handleSearchClose = () => {
//     dispatch(setIsSearch(false));
//   };

//   return (
//     <Dialog
//       open={isSearch}
//       onClose={handleSearchClose}
//       PaperProps={{
//         sx: {
//           borderRadius: "15px",
//           padding: "1rem",
//           backgroundColor: "#f9f9f9",
//           boxShadow: "0 15px 15px 10px rgba(0, 0, 0, 0.2)",
//         },
//       }}
//     >
//       <Stack direction="column" width="100%" spacing={2}>
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <DialogTitle
//             sx={{
//               textAlign: "center",
//               fontSize: "2.2rem",
//               fontWeight: "bold",
//               color: "#333",
//             }}
//           >
//             <FindHereIcon sx={{ fontSize: "2.5rem", color: "#333" }} />
//             Find Here
//           </DialogTitle>
//           <IconButton onClick={handleSearchClose}>
//             <CloseIcon />
//           </IconButton>
//         </Stack>

//         <TextField
//           placeholder="Search users..."
//           value={search.value}
//           onChange={search.changeHandler}
//           variant="outlined"
//           size="medium"
//           sx={{
//             borderRadius: "10px",
//             boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//             "& .MuiOutlinedInput-root": {
//               borderRadius: "10px",
//             },
//             "& .MuiInputBase-input": {
//               fontSize: "1.6rem",
//               padding: "12px 14px",
//             },
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ color: "#888" }} />
//               </InputAdornment>
//             ),
//           }}
//         />

//         <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
//           {users &&
//             users.map((user) => (
//               <UserItem
//                 user={user}
//                 key={user._id}
//                 handler={addFriendHandler}
//                 ishandlerLoading={isLoadingSendFriendRequest}
//               />
//             ))}
//         </List>
//       </Stack>
//     </Dialog>
//   );
// };

// export default SearchDialogue;

import {
  Dialog,
  InputAdornment,
  List,
  Stack,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  LocationOn as FindHereIcon,
} from "@mui/icons-material";
import { useInputValidation } from "6pp";
import UserItem from "../shared/UserItem";
import { useEffect, useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux-toolkit/reducers/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux-toolkit/api/apiSlice";
import { toast } from "react-hot-toast";

const SearchDialogue = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery("");
  const [sendFriendRequest] = useSendFriendRequestMutation();

  const dispatch = useDispatch();
  const search = useInputValidation("");
  const [users, setUsers] = useState(sampleUsers);

  let isLoadingSendFriendRequest = false;

  const addFriendHandler = async (id) => {
    try {
      const res = await sendFriendRequest({ userId: id });
      if (res.data) {
        toast.success("Friend request sent successfully");
        // console.log(res.data.request);
      } else {
        // toast.error("Failed to send friend request");
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      // console.error("Request Error:", error);
      toast.error("Something Went Wrong...");
    }
  };

  const handleSearchClose = () => {
    dispatch(setIsSearch(false));
  };

  useEffect(() => {
    // console.log("Search", search.value);

    const searchTimeOut = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          if (data && data.findUsersAvatar) {
            setUsers(data.findUsersAvatar);
          } else {
            setUsers([]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }, 1000);

    return () => {
      clearTimeout(searchTimeOut);
    };
  }, [search.value]);

  return (
    <Dialog
      open={isSearch}
      onClose={handleSearchClose}
      PaperProps={{
        sx: {
          borderRadius: "15px",
          padding: "1rem",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 15px 15px 10px rgba(0, 0, 0, 0.2)",
          maxWidth: "600px", // Ensures it adjusts on different screen sizes
          width: "90%", // Responsive width
        },
      }}
    >
      <Stack direction="column" width="100%" spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <FindHereIcon sx={{ fontSize: "2.5rem", color: "#333" }} />
            <Typography
              sx={{
                fontSize: "2.2rem",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Find Here
            </Typography>
          </Stack>
          <IconButton onClick={handleSearchClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <TextField
          placeholder="Search users..."
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="medium"
          sx={{
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
            "& .MuiInputBase-input": {
              fontSize: "1.6rem",
              padding: "12px 14px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#888" }} />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
          {users.length > 0 &&
            users.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={addFriendHandler}
                ishandlerLoading={isLoadingSendFriendRequest}
              />
            ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialogue;
