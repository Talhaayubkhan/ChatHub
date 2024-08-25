// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";

// import { sampleUsers } from "../../constants/sampleData";
// import UserItem from "../shared/UserItem";
// import { useInputValidation } from "6pp";
// import { useState } from "react";

// const NewGroup = () => {
//   const groupName = useInputValidation();

//   const [members, setMemebers] = useState(sampleUsers);
//   const [selectedMembers, setSelectedMemebers] = useState([]);

//   const selectGroupMembers = (id) => {
//     setSelectedMemebers((prev) =>
//       prev.includes(id)
//         ? prev.filter((currentItem) => currentItem !== id)
//         : [...prev, id]
//     );
//   };
//   // console.log(selectedMembers);

//   const submitHandler = () => {};

//   const closeHandlerGroup = () => {};

//   return (
//     <>
//       <Dialog open onClick={closeHandlerGroup}>
//         <Stack p={{ xs: "1rem", sm: "2rem" }} width={"30rem"} spacing={"1rem"}>
//           <DialogTitle variant="h4" fontWeight={"bold"} textAlign={"center"}>
//             New Group
//           </DialogTitle>
//           <TextField
//             value={groupName.value}
//             onChange={groupName.changeHandler}
//             label="Group Name"
//           />

//           <Typography fontWeight={"bold"} marginTop={"1rem"}>
//             Memebers
//           </Typography>

//           <Stack>
//             {members &&
//               members.map((user) => (
//                 <UserItem
//                   user={user}
//                   key={user._id}
//                   handler={selectGroupMembers}
//                   isAdded={selectedMembers.includes(user._id)}
//                 />
//               ))}
//           </Stack>

//           <Stack direction={"row"} justifyContent={"space-evenly"}>
//             <Button variant="contained" onClick={submitHandler}>
//               Create
//             </Button>
//             <Button variant="outlined" color="error">
//               Cancel
//             </Button>
//           </Stack>
//         </Stack>
//       </Dialog>
//     </>
//   );
// };

// export default NewGroup;

// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   Stack,
//   TextField,
//   Typography,
//   Divider,
// } from "@mui/material";
// import { useInputValidation } from "6pp";
// import { useState } from "react";
// import UserItem from "../shared/UserItem";
// import { sampleUsers } from "../../constants/sampleData";

// const NewGroup = () => {
//   const groupName = useInputValidation();
//   const [members, setMembers] = useState(sampleUsers);
//   const [selectedMembers, setSelectedMembers] = useState([]);

//   const selectGroupMembers = (id) => {
//     setSelectedMembers((prev) =>
//       prev.includes(id)
//         ? prev.filter((currentItem) => currentItem !== id)
//         : [...prev, id]
//     );
//   };

//   const submitHandler = () => {
//     // Handle group creation
//   };

//   const closeHandlerGroup = () => {
//     // Close dialog
//   };

//   return (
//     <Dialog open onClose={closeHandlerGroup} maxWidth="sm" fullWidth>
//       <Stack p={{ xs: "1rem", sm: "2rem" }} spacing={2}>
//         <DialogTitle variant="h4" fontWeight={"bold"} textAlign={"center"}>
//           Create New Group
//         </DialogTitle>

//         <TextField
//           fullWidth
//           value={groupName.value}
//           onChange={groupName.changeHandler}
//           label="Group Name"
//           variant="outlined"
//         />

//         <Divider />

//         <Typography fontWeight={"bold"} marginTop={"1rem"}>
//           Members
//         </Typography>

//         <Stack spacing={1}>
//           {members.map((user) => (
//             <UserItem
//               user={user}
//               key={user._id}
//               handler={selectGroupMembers}
//               isAdded={selectedMembers.includes(user._id)}
//               sx={{
//                 transition: "background-color 0.3s, box-shadow 0.3s",
//                 "&:hover": {
//                   backgroundColor: "#f0f0f0",
//                   boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
//                 },
//               }}
//             />
//           ))}
//         </Stack>

//         <Stack direction="row" spacing={2} justifyContent="center">
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={submitHandler}
//             sx={{
//               borderRadius: "20px",
//               padding: "0.5rem 2rem",
//             }}
//           >
//             Create
//           </Button>
//           <Button
//             variant="outlined"
//             color="error"
//             onClick={closeHandlerGroup}
//             sx={{
//               borderRadius: "20px",
//               padding: "0.5rem 2rem",
//             }}
//           >
//             Cancel
//           </Button>
//         </Stack>
//       </Stack>
//     </Dialog>
//   );
// };

// export default NewGroup;

import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useState } from "react";

const NewGroup = () => {
  const groupName = useInputValidation();
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectGroupMembers = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentItem) => currentItem !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    // Add your submission logic here
  };

  const closeHandlerGroup = () => {
    // Add your close dialog logic here
  };

  return (
    <Dialog open onClose={closeHandlerGroup}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        width={{ xs: "100%", sm: "30rem" }}
        spacing={2}
        borderRadius={2}
        sx={{ boxShadow: 3, backgroundColor: "background.paper" }}
      >
        <DialogTitle
          variant="h4"
          fontWeight={"bold"}
          textAlign={"center"}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          New Group
        </DialogTitle>

        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          label="Group Name"
          variant="outlined"
          fullWidth
        />

        <Divider sx={{ my: 2 }} />

        <Typography fontWeight={"bold"} fontSize={"1.1rem"}>
          Members
        </Typography>

        <Stack spacing={1}>
          {members.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectGroupMembers}
              isAdded={selectedMembers.includes(user._id)}
              sx={{ borderRadius: 1 }}
            />
          ))}
        </Stack>

        <Stack direction={"row"} spacing={2} justifyContent={"center"}>
          <Button
            variant="contained"
            color="primary"
            onClick={submitHandler}
            fullWidth
          >
            Create Group
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={closeHandlerGroup}
            fullWidth
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
