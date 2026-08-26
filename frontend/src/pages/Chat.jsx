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
import { useSocket } from "../Socket.jsx";
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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  MAX_MESSAGE_LENGTH,
  normalizeMessageText,
} from "../lib/chatState.js";

const Chat = ({ chatId, user }) => {
  // console.log(chatId, user);
  // State to hold the new message being typed in the input

  // Ref to track the chat container's scroll position (used for infinite scrolling)
  const containerRef = useRef(null);

  const saveBottomRef = useRef(null);

  // Hook to access socket connection
  const socket = useSocket();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newMessage, setNewMessage] = useState("");
  // State for storing real-time messages received through socket
  const [realTimeMessages, setRealTimeMessages] = useState([]);
  // State for pagination (tracks the current page when loading older messages)
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const typingTimeout = useRef(null);

  // Fetch chat details for the current chat, such as members
  const {
    data: chatDetails,
    isLoading,
    isError,
    error,
  } = useMembersChatDetailsQuery({ chatId }, { skip: !chatId });

  // Fetch older messages based on the current page (pagination)
  const paginatedMessagesChunk = useGetMessagesQuery(
    { chatId, page },
    { skip: !chatId }
  );

  // Hook for infinite scroll, it fetches older messages when scrolling up
  const { data: fetchedOldMessages, setData: setFetchedOldMessages } =
    useInfiniteScrollTop(
      containerRef,
      paginatedMessagesChunk.data?.totalPages, // Total pages for pagination
      page, // Current page number
      setPage, // Function to update page state
      paginatedMessagesChunk.data?.messages // The actual chunk of old messages
    );

  const stopTyping = useCallback(() => {
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = null;

    if (IamTyping) {
      socket.emit(STOP_TYPING_MESSAGE, { chatId });
      setIamTyping(false);
    }
  }, [IamTyping, chatId, socket]);

  const messageOnChange = (e) => {
    const nextMessage = e.target.value;
    setNewMessage(nextMessage);

    if (nextMessage.trim() && !IamTyping) {
      socket.emit(START_TYPING_MESSAGE, { chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING_MESSAGE, { chatId });
      setIamTyping(false);
      typingTimeout.current = null;
    }, 2000);
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
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      socket.emit(STOP_TYPING_MESSAGE, { chatId });
    };
  }, [chatId, dispatch, setFetchedOldMessages, socket]);

  useEffect(() => {
    if (saveBottomRef.current)
      saveBottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [realTimeMessages]);

  useEffect(() => {
    if (chatDetails && !chatDetails.allChats) navigate("/");
  }, [chatDetails, navigate]);

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

  const alertListener = useCallback(
    (data) => {
      // console.log("ALERT received:", content); // Debugging line
      if (data.chatId !== chatId) return;

      const messageForAlert = {
        content: data.message,
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
    [alertListener, newMessageListener, startTypingListener, stopTypingListener]
  );

  // Attach socket event listeners when the component mounts
  useSocketEventListeners(socket, socketEventHandlers);

  // Function to handle message submission when the form is submitted
  const handleSendMessage = (e) => {
    e.preventDefault();

    const message = normalizeMessageText(newMessage);
    if (!message || isSending) return;

    stopTyping();
    setIsSending(true);

    socket.timeout(5000).emit(
      NEW_MESSAGE,
      { chatId, message },
      (timeoutError, response) => {
        setIsSending(false);

        if (timeoutError || !response?.ok) {
          toast.error(response?.error || "Message could not be sent");
          return;
        }

        setNewMessage("");
      }
    );
  };

  // Use custom hook to handle and display errors if any
  useErrors(chatErrors);

  // Combine old messages and real-time messages
  const allMessages = [...fetchedOldMessages, ...realTimeMessages];

  // Return loading skeleton while chat details are being fetched
  return isLoading ? (
    <Skeleton />
  ) : (
    <Stack height="100%" minHeight={0} bgcolor={grayColor}>
      {/* ChatStack component renders the list of messages */}
      <ChatStack
        ref={containerRef} // Attach the ref to the chat container
        boxSizing="border-box" // Ensure proper sizing
        padding={{ xs: "0.75rem", sm: "1rem" }}
        spacing="1rem" // Space between messages
        bgcolor={grayColor} // Background color for the chat area
        sx={{
          flex: 1,
          minHeight: 0,
          overflowX: "hidden", // Hide horizontal overflow
          overflowY: "auto", // Enable vertical scroll for messages
        }}
      >
        {/* Render new real-time messages */}
        {allMessages?.map((currentMessage, index) => (
          <MessageComponent
            key={
              currentMessage._id ||
              `${currentMessage.chat}-${currentMessage.createdAt}-${index}`
            }
            message={currentMessage} // Pass message data
            user={user} // Pass user data
          />
        ))}
        {userTyping && <TypingLoader />}

        <div ref={saveBottomRef} />
      </ChatStack>

      {/* Form to handle input and send new messages */}
      <form style={{ flexShrink: 0 }} onSubmit={handleSendMessage}>
        <Stack
          direction={"row"} // Layout the input and send button horizontally
          minHeight={{ xs: "4.5rem", sm: "5rem" }}
          padding={{ xs: "0.65rem", sm: "1rem" }}
          alignItems={"center"} // Align input elements vertically
          position={"relative"} // Set position for attach icon
        >
          {/* Attach file icon button */}
          <IconButton
            aria-label="Attach a file"
            sx={{
              position: "absolute", // Positioned absolutely inside the container
              left: { xs: "0.9rem", sm: "1.5rem" },
            }}
            onClick={handleFileUploadOpen}
          >
            <AttachFileIcon />
          </IconButton>

          {/* Input box to type the message */}
          <InputBox
            aria-label="Message"
            placeholder="Type a message"
            maxLength={MAX_MESSAGE_LENGTH}
            value={newMessage} // Controlled input bound to new message state
            onChange={messageOnChange} // Update message state on change
            disabled={isSending}
          />

          {/* Send message button */}
          <IconButton
            aria-label="Send message"
            type="submit" // Submit the form when clicked
            disabled={!normalizeMessageText(newMessage) || isSending}
            sx={{
              backgroundColor: "#ea7070", // Button color
              color: "white", // Text color
              marginLeft: { xs: "0.5rem", sm: "1rem" },
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
    </Stack>
  );
};

// Wrap Chat component inside AppLayout
export default AppLayout()(Chat);
