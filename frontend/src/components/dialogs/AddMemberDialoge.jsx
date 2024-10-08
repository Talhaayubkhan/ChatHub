import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialoge = ({
  open,
  addMember,
  isLoadingAddGroupMember,
  chatId,
}) => {
  const [members, setMemebers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMemebers] = useState([]);

  const selectGroupMembers = (id) => {
    setSelectedMemebers((prev) =>
      prev.includes(id)
        ? prev.filter((currentItem) => currentItem !== id)
        : [...prev, id]
    );
  };
  //   const addFriendHandler = (user) => {
  //     console.log(user, chatId);
  //   };

  const closeHanlder = () => {
    setSelectedMemebers([]);
    setMemebers([]);
  };
  const addNewMemberSubmitHandler = () => {
    closeHanlder();
  };
  return (
    <>
      <Dialog open={addMember} onClose={closeHanlder}>
        <Stack p={"2rem"} width={"30rem"}>
          <DialogTitle
            textAlign={"center"}
            fontSize={"1.5rem"}
            fontWeight={"bold"}
          >
            Add Member
          </DialogTitle>
          <Stack spacing={1}>
            {members.length > 0 ? (
              members.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  handler={selectGroupMembers}
                  isAdded={selectedMembers.includes(user._id)}
                />
              ))
            ) : (
              <>
                <Typography textAlign={"center"} padding={"2rem"} variant="h4">
                  No Friends Here
                </Typography>
              </>
            )}
          </Stack>
          <Stack
            direction="row"
            marginTop={"1rem"}
            justifyContent="flex-end"
            spacing={3}
          >
            <Button variant="outlined" color="error" onClick={closeHanlder}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={isLoadingAddMember}
              onClick={addNewMemberSubmitHandler}
            >
              Submit Changes
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default AddMemberDialoge;
