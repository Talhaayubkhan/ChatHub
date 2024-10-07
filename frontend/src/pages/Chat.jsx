import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Stack as ChatStack, IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponent";
import MessageComponent from "../components/shared/MessageComponent";
import { useSocket } from "../socket.jsx";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING_MESSAGE,
  STOP_TYPING_MESSAGE,
} from "../constants/events";
import {
  useGetMessagesQuery,
  useMembersChatDetailsQuery,
} from "../redux-toolkit/api/apiSlice";
import { useErrors, useSocketEventListeners } from "../hooks/hooks";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenuOpen } from "../redux-toolkit/reducers/misc";
import FileUploadMenu from "../components/dialogs/FileMenu";
import { removeMessagesAlert } from "../redux-toolkit/reducers/chat.js";
import { TypingLoader } from "../components/layout/Loaders.jsx";

const Chat = ({ chatId, user }) => {
  // console.log(chatId, user);
  // State to hold the new message being typed in the input

  // Ref to track the chat container's scroll position (used for infinite scrolling)
  const containerRef = useRef(null);

  const saveBottomRef = useRef(null);

  // Hook to access socket connection
  const socket = useSocket();

  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState("");
  // State for storing real-time messages received through socket
  const [realTimeMessages, setRealTimeMessages] = useState([]);
  // State for pagination (tracks the current page when loading older messages)
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  // Fetch chat details for the current chat, such as members
  const {
    data: chatDetails,
    isLoading,
    isError,
    error,
  } = useMembersChatDetailsQuery({
    chatId,
    skip: !chatId,
  });

  // Fetch older messages based on the current page (pagination)
  const paginatedMessagesChunk = useGetMessagesQuery({ chatId, page });

  // Hook for infinite scroll, it fetches older messages when scrolling up
  const { data: fetchedOldMessages, setData: setFetchedOldMessages } =
    useInfiniteScrollTop(
      containerRef,
      paginatedMessagesChunk.data?.totalPages, // Total pages for pagination
      page, // Current page number
      setPage, // Function to update page state
      paginatedMessagesChunk.data?.messages // The actual chunk of old messages
    );

  // Extract chat members from chat details
  const members = chatDetails?.allChats?.members || [];

  const messageOnChange = (e) => {
    setNewMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING_MESSAGE, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING_MESSAGE, {
        members,
        chatId,
      });
      setIamTyping(false);
    }, [2000]);
  };

  // Handle file upload button click event
  const handleFileUploadOpen = (e) => {
    dispatch(setIsFileMenuOpen(true));
    setFileMenuAnchor(e.currentTarget);
  };

  // Track loading and error states for both chat details and messages
  const chatErrors = [
    {
      isError,
      error,
    },
    {
      isError: paginatedMessagesChunk.isError,
      error: paginatedMessagesChunk.error,
    },
  ];
  // console.log(fetchedOldMessages);

  useEffect(() => {
    dispatch(removeMessagesAlert(chatId));

    return () => {
      setRealTimeMessages([]);
      setNewMessage("");
      setFetchedOldMessages([]);
      setPage(1);
    };
  }, [chatId]);

  useEffect(() => {
    if (saveBottomRef.current)
      saveBottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [realTimeMessages]);

  // Callback function to handle the receipt of a new message via socket
  const newMessageListener = useCallback(
    (data) => {
      // console.log(data);
      if (data.chatId !== chatId) return;

      setRealTimeMessages((prevMessages) => [...prevMessages, data?.message]); // Add new message to existing messages
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      // console.log(data);
      if (data.chatId !== chatId) return;
      // console.log("start typing", data);
      setUserTyping(true);
    },
    [chatId]
  );
  const stopTypingListener = useCallback(
    (data) => {
      // console.log(data);
      if (data.chatId !== chatId) return;
      // console.log("stop typing", data);
      setUserTyping(false);
    },
    [chatId]
  );

  // TODO: Fix later
  const alertListener = useCallback(
    (content) => {
      console.log("ALERT received:", content); // Debugging line

      const messageForAlert = {
        content,
        sender: {
          _id: "aq342easda21232kadsm",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setRealTimeMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  // Memoized object to store socket event listeners
  const socketEventHandlers = useMemo(
    () => ({
      [ALERT]: alertListener, // Listen for the "ALERT" event
      [NEW_MESSAGE]: newMessageListener, // Listen for the "NEW_MESSAGE" event
      [START_TYPING_MESSAGE]: startTypingListener,
      [STOP_TYPING_MESSAGE]: stopTypingListener,
    }),
    []
  );

  // Attach socket event listeners when the component mounts
  useSocketEventListeners(socket, socketEventHandlers);

  // Function to handle message submission when the form is submitted
  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Only send if the message is not empty (trimmed)
    if (!newMessage.trim()) return;

    // Emit a "NEW_MESSAGE" event to the server via socket
    socket.emit(NEW_MESSAGE, {
      chatId, // The chat room ID
      members, // List of chat members
      message: newMessage, // The message content
    });

    // Clear the input box after sending the message
    setNewMessage("");
  };

  // Use custom hook to handle and display errors if any
  useErrors(chatErrors);

  // Combine old messages and real-time messages
  const allMessages = [...fetchedOldMessages, ...realTimeMessages];

  // Return loading skeleton while chat details are being fetched
  return isLoading ? (
    <Skeleton />
  ) : (
    <>
      {/* ChatStack component renders the list of messages */}
      <ChatStack
        ref={containerRef} // Attach the ref to the chat container
        boxSizing="border-box" // Ensure proper sizing
        padding="1rem" // Padding around the chat content
        spacing="1rem" // Space between messages
        bgcolor={grayColor} // Background color for the chat area
        height={"90%"} // Set height of chat container
        sx={{
          overflowX: "hidden", // Hide horizontal overflow
          overflowY: "auto", // Enable vertical scroll for messages
        }}
      >
        {/* Render new real-time messages */}
        {allMessages?.map((currentMessage) => (
          <MessageComponent
            key={currentMessage._id} // Unique key for each new message
            message={currentMessage} // Pass message data
            user={user} // Pass user data
          />
        ))}
        {userTyping && <TypingLoader />}

        <div ref={saveBottomRef} />
      </ChatStack>

      {/* Form to handle input and send new messages */}
      <form style={{ height: "10%" }} onSubmit={handleSendMessage}>
        <Stack
          direction={"row"} // Layout the input and send button horizontally
          height={"100%"} // Full height of the container
          padding={"1rem"} // Padding around input elements
          alignItems={"center"} // Align input elements vertically
          position={"relative"} // Set position for attach icon
        >
          {/* Attach file icon button */}
          <IconButton
            sx={{
              position: "absolute", // Positioned absolutely inside the container
              left: "1.5rem", // Positioned 1.5rem from the left
            }}
            onClick={handleFileUploadOpen}
          >
            <AttachFileIcon />
          </IconButton>

          {/* Input box to type the message */}
          <InputBox
            placeholder="Type Message here" // Placeholder text
            value={newMessage} // Controlled input bound to new message state
            onChange={messageOnChange} // Update message state on change
          />

          {/* Send message button */}
          <IconButton
            type="submit" // Submit the form when clicked
            sx={{
              backgroundColor: "#ea7070", // Button color
              color: "white", // Text color
              marginLeft: "1rem", // Spacing to the left of input
              padding: "0.5rem", // Padding inside the button
              "&:hover": {
                bgcolor: "error.dark", // Darken button on hover
              },
            }}
          >
            <SendIcon /> {/* Send icon inside the button */}
          </IconButton>
        </Stack>
      </form>

      {/* File menu for attachments (optional) */}
      <FileUploadMenu anchorElement={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

// Wrap Chat component inside AppLayout
export default AppLayout()(Chat);
