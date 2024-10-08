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

// import {
//   Dialog,
//   InputAdornment,
//   List,
//   Stack,
//   TextField,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Close as CloseIcon,
//   LocationOn as FindHereIcon,
// } from "@mui/icons-material";
// import { useInputValidation } from "6pp";
// import UserItem from "../shared/UserItem";
// import { useEffect, useState } from "react";
// import { sampleUsers } from "../../constants/sampleData";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsSearch } from "../../redux-toolkit/reducers/misc";
// import {
//   useLazySearchUserQuery,
//   useSendFriendRequestMutation,
// } from "../../redux-toolkit/api/apiSlice";
// import { useSendFriendRequest } from "../../hooks/hooks";

// const SearchDialogue = () => {
//   const { isSearch } = useSelector((state) => state.misc);

//   const [searchUser] = useLazySearchUserQuery("");
//   const [sendFriendRequest, isRequestLoading] = useSendFriendRequest(
//     useSendFriendRequestMutation
//   );

//   const dispatch = useDispatch();
//   const search = useInputValidation("");
//   const [users, setUsers] = useState(sampleUsers);

//   const addFriendHandler = async (id) => {
//     await sendFriendRequest("Sending Friend Request...", { userId: id });
//   };
//   const handleSearchClose = () => {
//     dispatch(setIsSearch(false));
//   };

//   useEffect(() => {
//     // console.log("Search", search.value);
//     const searchTimeOut = setTimeout(() => {
//       searchUser(search.value)
//         .then(({ data }) => {
//           // console.log("API Response:", data);
//           if (data && data.findUsersAvatar) {
//             setUsers(data.findUsersAvatar);
//           } else {
//             setUsers([]);
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }, 1000);

//     return () => {
//       clearTimeout(searchTimeOut);
//     };
//   }, [search.value]);

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
//           maxWidth: "600px", // Ensures it adjusts on different screen sizes
//           width: "90%", // Responsive width
//         },
//       }}
//     >
//       <Stack direction="column" width="100%" spacing={2}>
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Stack direction="row" alignItems="center" spacing={1}>
//             <FindHereIcon sx={{ fontSize: "2.5rem", color: "#333" }} />
//             <Typography
//               sx={{
//                 fontSize: "2.2rem",
//                 fontWeight: "bold",
//                 color: "#333",
//               }}
//             >
//               Find Here
//             </Typography>
//           </Stack>
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
//           slotProps={{
//             input: {
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon sx={{ color: "#888" }} />
//                 </InputAdornment>
//               ),
//             },
//           }}
//         />

//         <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
//           {users.length > 0 &&
//             users.map((user) => (
//               <UserItem
//                 user={user}
//                 key={user._id}
//                 handler={addFriendHandler}
//                 ishandlerLoading={isRequestLoading}
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
  Fade,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  PersonSearch as PersonSearchIcon,
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
import { useSendFriendRequest } from "../../hooks/hooks";

const SearchDialogue = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery("");
  const [sendFriendRequest, isRequestLoading] = useSendFriendRequest(
    useSendFriendRequestMutation
  );

  const dispatch = useDispatch();
  const search = useInputValidation("");
  const [users, setUsers] = useState(sampleUsers);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending Friend Request...", { userId: id });
  };
  const handleSearchClose = () => {
    dispatch(setIsSearch(false));
  };

  useEffect(() => {
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
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 500 }}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          padding: "1.5rem",
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          width: "95%",
        },
      }}
    >
      <Stack direction="column" width="100%" spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <PersonSearchIcon sx={{ fontSize: "3rem", color: "#3f51b5" }} />
            <Typography
              sx={{
                fontSize: "2.4rem",
                fontWeight: "bold",
                color: "#3f51b5",
                letterSpacing: "-0.5px",
              }}
            >
              Find Here
            </Typography>
          </Stack>
          <IconButton
            onClick={handleSearchClose}
            sx={{
              backgroundColor: "#f0f0f0",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <TextField
          placeholder="Search users..."
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
              backgroundColor: "#f5f5f5",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#e8e8e8",
              },
              "&.Mui-focused": {
                backgroundColor: "#ffffff",
                boxShadow: "0 0 0 2px #3f51b5",
              },
            },
            "& .MuiInputBase-input": {
              fontSize: "1.6rem",
              padding: "15px 14px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#666", fontSize: "2rem" }} />
              </InputAdornment>
            ),
          }}
        />

        <List
          sx={{
            maxHeight: "350px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "10px",
              "&:hover": {
                background: "#555",
              },
            },
          }}
        >
          {users.length > 0 &&
            users.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={addFriendHandler}
                ishandlerLoading={isRequestLoading}
              />
            ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialogue;
