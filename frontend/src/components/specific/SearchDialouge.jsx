import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useInputValidation } from "6pp";
import UserItem from "../shared/UserItem";
import { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";

// const users = [1, 2, 3];

const SearchDialouge = () => {
  // Using a custom hook like useInputValidation encapsulates validation logic, promotes code reusability, and maintains cleaner, more maintainable components.
  const search = useInputValidation("");
  const [users, setUsers] = useState(sampleUsers);

  let isLoadingSendFriendRequest = false;

  const addFriendHandler = (id) => {
    console.log(id);
  };
  return (
    <Dialog open={open}>
      <Stack p="1rem" direction="column" width="35rem" spacing={1}>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "2.2rem",
            fontWeight: "bold",
          }}
        >
          Find Here
        </DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
            "& .MuiInputLabel-root": {
              fontSize: "2rem",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users &&
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

export default SearchDialouge;
