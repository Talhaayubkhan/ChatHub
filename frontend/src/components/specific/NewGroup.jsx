import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useState } from "react";

const NewGroup = () => {
  const groupName = useInputValidation();

  const [members, setMemebers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMemebers] = useState([]);

  const selectGroupMembers = (id) => {
    setSelectedMemebers((prev) =>
      prev.includes(id)
        ? prev.filter((currentItem) => currentItem !== id)
        : [...prev, id]
    );
  };
  console.log(selectedMembers);

  const submitHandler = () => {};

  const closeHandlerGroup = () => {};

  return (
    <>
      <Dialog open onClick={closeHandlerGroup}>
        <Stack p={{ xs: "1rem", sm: "2rem" }} width={"30rem"} spacing={"1rem"}>
          <DialogTitle variant="h4" fontWeight={"bold"} textAlign={"center"}>
            New Group
          </DialogTitle>
          <TextField
            value={groupName.value}
            onChange={groupName.changeHandler}
            label="Group Name"
          />

          <Typography fontWeight={"bold"} marginTop={"1rem"}>
            Memebers
          </Typography>

          <Stack>
            {members &&
              members.map((user) => (
                <UserItem
                  user={user}
                  key={user._id}
                  handler={selectGroupMembers}
                  isAdded={selectedMembers.includes(user._id)}
                />
              ))}
          </Stack>

          <Stack direction={"row"} justifyContent={"space-evenly"}>
            <Button variant="contained" onClick={submitHandler}>
              Create
            </Button>
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default NewGroup;
