import { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Stack as ChatStack, IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponent";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessages } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { useSocket } from "../socket";
import { NEW_MESSAGE } from "../constants/events";
import { useMembersChatDetailsQuery } from "../redux-toolkit/api/apiSlice";

const user = {
  _id: "akdfj233",
  name: "Hello!",
};

const Chat = ({ chatId }) => {
  // console.log("Chat ID:", chatId); // Ensure this is correct

  const containerRef = useRef(null);

  const membersChatDetails = useMembersChatDetailsQuery({
    chatId,
    skip: !chatId,
  });
  // console.log("Chat ID:", chatId); // Ensure this is correct

  const socket = useSocket();
  // console.log(socket);

  const [message, setMessage] = useState("");
  const members = membersChatDetails?.data?.allChats?.members;
  // console.log(members);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, {
      chatId,
      members,
      message,
    });
    setMessage("");
  };

  const handleNewMessage = useCallback((data) => {
    console.log("New message received:", data);
  }, []);
  useEffect(() => {
    // Register the event listener
    socket.on(NEW_MESSAGE, handleNewMessage);
    return () => {
      socket.off(NEW_MESSAGE, handleNewMessage);
    };
  }, []);

  return membersChatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <ChatStack
        ref={containerRef}
        boxSizing="border-box"
        padding="1rem"
        spacing="1rem"
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* Messages Render here */}

        {sampleMessages.map((currentMessage) => (
          <MessageComponent
            key={currentMessage._id}
            message={currentMessage}
            user={user}
          />
        ))}
      </ChatStack>

      <form style={{ height: "10%" }} onSubmit={handleSendMessage}>
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              // rotate: "-90deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: "#ea7070",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </>
  );
};

// Correctly wrap the Chat component with AppLayout
export default AppLayout()(Chat);
