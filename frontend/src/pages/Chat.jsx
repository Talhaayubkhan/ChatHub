import { useCallback, useMemo, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Stack as ChatStack, IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponent";
import MessageComponent from "../components/shared/MessageComponent";
import { useSocket } from "../socket";
import { NEW_MESSAGE } from "../constants/events";
import {
  useGetMessagesQuery,
  useMembersChatDetailsQuery,
} from "../redux-toolkit/api/apiSlice";
import { useErrors, useSocketEventListeners } from "../hooks/hooks";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenuOpen } from "../redux-toolkit/reducers/misc";
import FileUploadMenu from "../components/dialogs/FileMenu";

const Chat = ({ chatId, user }) => {
  // State to hold the new message being typed in the input
  const [newMessage, setNewMessage] = useState("");

  // State for storing real-time messages received through socket
  const [realTimeMessages, setRealTimeMessages] = useState("");

  // State for pagination (tracks the current page when loading older messages)
  const [page, setPage] = useState(1);

  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  // Ref to track the chat container's scroll position (used for infinite scrolling)
  const containerRef = useRef(null);

  // Hook to access socket connection
  const socket = useSocket();

  const dispatch = useDispatch();

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
  // Callback function to handle the receipt of a new message via socket
  const handleNewMessageReceived = useCallback((data) => {
    setRealTimeMessages((prevMessages) => [...prevMessages, data.message]); // Add new message to existing messages
  }, []);

  // Memoized object to store socket event listeners
  const socketEventHandlers = useMemo(
    () => ({
      [NEW_MESSAGE]: handleNewMessageReceived, // Listen for the "NEW_MESSAGE" event
    }),
    [handleNewMessageReceived]
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
      newMessage, // The message content
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
        {allMessages.map((currentMessage) => (
          <MessageComponent
            key={currentMessage?._id} // Unique key for each new message
            message={currentMessage} // Pass message data
            user={user} // Pass user data
          />
        ))}
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
            onChange={(e) => setNewMessage(e.target.value)} // Update message state on change
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

// import { useCallback, useMemo, useRef, useState } from "react";
// import AppLayout from "../components/layout/AppLayout";
// import {
//   Stack as ChatStack,
//   IconButton,
//   Skeleton,
//   Stack,
//   Box,
// } from "@mui/material";
// import { grayColor } from "../constants/color";
// import {
//   AttachFile as AttachFileIcon,
//   Send as SendIcon,
// } from "@mui/icons-material";
// import { InputBox } from "../components/styles/StyledComponent";
// import MessageComponent from "../components/shared/MessageComponent";
// import { useSocket } from "../socket";
// import { NEW_MESSAGE } from "../constants/events";
// import {
//   useGetMessagesQuery,
//   useMembersChatDetailsQuery,
// } from "../redux-toolkit/api/apiSlice";
// import { useErrors, useSocketEventListeners } from "../hooks/hooks";
// import { useInfiniteScrollTop } from "6pp";
// import { useDispatch } from "react-redux";
// import { setIsFileMenuOpen } from "../redux-toolkit/reducers/misc";
// import FileUploadMenu from "../components/dialogs/FileMenu";

// const Chat = ({ chatId, user }) => {
//   const [newMessage, setNewMessage] = useState("");
//   const [realTimeMessages, setRealTimeMessages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
//   const containerRef = useRef(null);
//   const socket = useSocket();
//   const dispatch = useDispatch();

//   const {
//     data: chatDetails,
//     isLoading,
//     isError,
//     error,
//   } = useMembersChatDetailsQuery({
//     chatId,
//     skip: !chatId,
//   });

//   const paginatedMessagesChunk = useGetMessagesQuery({ chatId, page });
//   const { data: fetchedOldMessages } = useInfiniteScrollTop(
//     containerRef,
//     paginatedMessagesChunk.data?.totalPages,
//     page,
//     setPage,
//     paginatedMessagesChunk.data?.messages
//   );

//   const members = chatDetails?.allChats?.members || [];

//   const handleFileUploadOpen = (e) => {
//     dispatch(setIsFileMenuOpen(true));
//     setFileMenuAnchor(e.currentTarget);
//   };

//   const chatErrors = [
//     { isError, error },
//     {
//       isError: paginatedMessagesChunk.isError,
//       error: paginatedMessagesChunk.error,
//     },
//   ];

//   const handleNewMessageReceived = useCallback((data) => {
//     setRealTimeMessages((prevMessages) => [...prevMessages, data.message]);
//   }, []);

//   const socketEventHandlers = useMemo(
//     () => ({ [NEW_MESSAGE]: handleNewMessageReceived }),
//     [handleNewMessageReceived]
//   );

//   useSocketEventListeners(socket, socketEventHandlers);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;
//     socket.emit(NEW_MESSAGE, { chatId, members, newMessage });
//     setNewMessage("");
//   };

//   useErrors(chatErrors);

//   const allMessages = [...fetchedOldMessages, ...realTimeMessages];

//   return isLoading ? (
//     <Skeleton />
//   ) : (
//     <Box sx={{ backgroundColor: "#fff", borderRadius: "8px", height: "100%" }}>
//       <ChatStack
//         ref={containerRef}
//         padding="1rem"
//         spacing="1rem"
//         bgcolor={grayColor}
//         height={"90%"}
//         sx={{
//           overflowX: "hidden",
//           overflowY: "auto",
//           borderRadius: "8px 8px 0 0", // Rounded corners for chat container
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Subtle shadow for depth
//         }}
//       >
//         {allMessages.map((currentMessage) => (
//           <MessageComponent
//             key={currentMessage._id}
//             message={currentMessage}
//             user={user}
//           />
//         ))}
//       </ChatStack>

//       <form
//         style={{
//           height: "10%",
//           background: "#fff",
//           borderTop: "1px solid #e0e0e0",
//           borderRadius: "0 0 8px 8px",
//           overflow: "hidden",
//         }}
//         onSubmit={handleSendMessage}
//       >
//         <Stack
//           direction={"row"}
//           height={"100%"}
//           padding={"0.5rem"}
//           alignItems={"center"}
//         >
//           <IconButton
//             sx={{
//               backgroundColor: "transparent",
//               "&:hover": {
//                 backgroundColor: "#f0f0f0",
//               },
//             }}
//             onClick={handleFileUploadOpen}
//           >
//             <AttachFileIcon />
//           </IconButton>

//           <InputBox
//             placeholder="Type Message here"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             sx={{
//               flexGrow: 1,
//               marginLeft: "0.5rem",
//               borderRadius: "20px",
//               border: "1px solid #ccc",
//               "&:focus": {
//                 borderColor: "#1976d2",
//                 outline: "none",
//               },
//               backgroundColor: "#f9f9f9", // Slightly different background for the input
//             }}
//           />

//           <IconButton
//             type="submit"
//             sx={{
//               backgroundColor: "#1976d2",
//               color: "white",
//               marginLeft: "0.5rem",
//               "&:hover": {
//                 bgcolor: "#115293",
//               },
//               borderRadius: "20px",
//             }}
//           >
//             <SendIcon />
//           </IconButton>
//         </Stack>
//       </form>

//       <FileUploadMenu anchorElement={fileMenuAnchor} chatId={chatId} />
//     </Box>
//   );
// };

// // Wrap Chat component inside AppLayout
// export default AppLayout()(Chat);

// import { useCallback, useMemo, useRef, useState } from "react";
// import AppLayout from "../components/layout/AppLayout";
// import {
//   Stack as ChatStack,
//   IconButton,
//   Skeleton,
//   Stack,
//   Box,
// } from "@mui/material";
// import { grayColor } from "../constants/color";
// import {
//   AttachFile as AttachFileIcon,
//   Send as SendIcon,
// } from "@mui/icons-material";
// import { InputBox } from "../components/styles/StyledComponent";
// import MessageComponent from "../components/shared/MessageComponent";
// import { useSocket } from "../socket";
// import { NEW_MESSAGE } from "../constants/events";
// import {
//   useGetMessagesQuery,
//   useMembersChatDetailsQuery,
// } from "../redux-toolkit/api/apiSlice";
// import { useErrors, useSocketEventListeners } from "../hooks/hooks";
// import { useInfiniteScrollTop } from "6pp";
// import { useDispatch } from "react-redux";
// import { setIsFileMenuOpen } from "../redux-toolkit/reducers/misc";
// import FileUploadMenu from "../components/dialogs/FileMenu";

// const Chat = ({ chatId, user }) => {
//   const [newMessage, setNewMessage] = useState("");
//   const [realTimeMessages, setRealTimeMessages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
//   const containerRef = useRef(null);
//   const socket = useSocket();
//   const dispatch = useDispatch();

//   const {
//     data: chatDetails,
//     isLoading,
//     isError,
//     error,
//   } = useMembersChatDetailsQuery({
//     chatId,
//     skip: !chatId,
//   });

//   const paginatedMessagesChunk = useGetMessagesQuery({ chatId, page });
//   const { data: fetchedOldMessages } = useInfiniteScrollTop(
//     containerRef,
//     paginatedMessagesChunk.data?.totalPages,
//     page,
//     setPage,
//     paginatedMessagesChunk.data?.messages
//   );

//   const members = chatDetails?.allChats?.members || [];

//   const handleFileUploadOpen = (e) => {
//     dispatch(setIsFileMenuOpen(true));
//     setFileMenuAnchor(e.currentTarget);
//   };

//   const chatErrors = [
//     { isError, error },
//     {
//       isError: paginatedMessagesChunk.isError,
//       error: paginatedMessagesChunk.error,
//     },
//   ];

//   const handleNewMessageReceived = useCallback((data) => {
//     setRealTimeMessages((prevMessages) => [...prevMessages, data.message]);
//   }, []);

//   const socketEventHandlers = useMemo(
//     () => ({ [NEW_MESSAGE]: handleNewMessageReceived }),
//     [handleNewMessageReceived]
//   );

//   useSocketEventListeners(socket, socketEventHandlers);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;
//     socket.emit(NEW_MESSAGE, { chatId, members, newMessage });
//     setNewMessage("");
//   };

//   useErrors(chatErrors);

//   const allMessages = [...fetchedOldMessages, ...realTimeMessages];

//   return isLoading ? (
//     <Skeleton />
//   ) : (
//     <Box
//       sx={{
//         backgroundColor: "#ffffff",
//         borderRadius: "8px",
//         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Enhanced shadow for the chat container
//         height: "100%",
//         display: "flex",
//         flexDirection: "column", // Layout adjustment for better alignment
//       }}
//     >
//       {/* Chat Messages Container */}
//       <ChatStack
//         ref={containerRef}
//         padding="1rem"
//         spacing="1rem"
//         bgcolor={grayColor}
//         flexGrow={1} // Make the chat container take up available space
//         sx={{
//           overflowX: "hidden",
//           overflowY: "auto",
//           borderRadius: "8px 8px 0 0",
//           boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)", // Subtle inner shadow for depth
//           paddingBottom: "2rem", // Add padding to avoid overlap with input
//         }}
//       >
//         {allMessages.map((currentMessage) => (
//           <MessageComponent
//             key={currentMessage._id}
//             message={currentMessage}
//             user={user}
//           />
//         ))}
//       </ChatStack>

//       {/* Message Input Container */}
//       <form
//         style={{
//           height: "auto",
//           background: "#f5f5f5",
//           borderTop: "1px solid #e0e0e0",
//           borderRadius: "0 0 8px 8px",
//           overflow: "hidden",
//           padding: "0.5rem 1rem", // Padding adjustment for better spacing
//           display: "flex", // Flex display for input alignment
//           alignItems: "center", // Center align input and buttons
//         }}
//         onSubmit={handleSendMessage}
//       >
//         {/* Attach File Button */}
//         <IconButton
//           sx={{
//             marginRight: "0.5rem",
//             "&:hover": {
//               backgroundColor: "#e0e0e0",
//             },
//           }}
//           onClick={handleFileUploadOpen}
//         >
//           <AttachFileIcon />
//         </IconButton>

//         {/* Message Input Box */}
//         <InputBox
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           sx={{
//             flexGrow: 1,
//             borderRadius: "20px",
//             padding: "0.5rem 2rem", // Padding inside input box
//             border: "1px solid #ccc",
//             "&:focus": {
//               borderColor: "#1976d2",
//               outline: "none",
//             },
//             backgroundColor: "#fff",
//             boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)", // Subtle inner shadow
//           }}
//         />

//         {/* Send Button */}
//         <IconButton
//           type="submit"
//           sx={{
//             backgroundColor: "#1976d2",
//             color: "#ffffff",
//             marginLeft: "0.5rem",
//             "&:hover": {
//               bgcolor: "#115293",
//             },
//             borderRadius: "20px",
//           }}
//         >
//           <SendIcon />
//         </IconButton>
//       </form>

//       {/* File Upload Menu Dialog */}
//       <FileUploadMenu anchorElement={fileMenuAnchor} chatId={chatId} />
//     </Box>
//   );
// };

// // Wrap Chat component inside AppLayout
// export default AppLayout()(Chat);
