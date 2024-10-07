// import React from "react";
import { useCallback, useEffect } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
// import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux-toolkit/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobileMenu } from "../../redux-toolkit/reducers/misc";
import { useErrors, useSocketEventListeners } from "../../hooks/hooks";
import { useSocket } from "../../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from "../../constants/events";
import {
  incrementNotificationCount,
  setNewMessagesAlert,
} from "../../redux-toolkit/reducers/chat";
import { getMessagesCountInLocalStorage } from "../../lib/features";

// This High Order Function
// Higher-order components (HOCs) in React are used to enhance components with reusable logic, providing a way to share functionality across multiple components without repeating code
const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const chatId = params.chatId;
    // console.log("Chat ID in AppLayout:", chatId); // Verify this

    const socket = useSocket();
    // console.log(socket);

    const { isMobileMenu } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getMessagesCountInLocalStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessagesAlert,
      });
    }, [newMessagesAlert]);

    const handleDeleteChat = (event, _id, groupChat) => {
      event.preventDefault();
      console.log("deleteChat", _id, groupChat);
    };

    const handleMobileClose = () => {
      dispatch(setIsMobileMenu(false));
    };

    const handleNewMessageAlert = useCallback(
      (data) => {
        // console.log("New message alert received:", data); // Log to check if event fires

        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const handleNewRequest = useCallback(() => {
      dispatch(incrementNotificationCount());
    }, []);

    const socketEventHandlers = {
      [NEW_MESSAGE_ALERT]: handleNewMessageAlert, // Listen for the "NEW_MESSAGE" event
      [NEW_REQUEST]: handleNewRequest,
    };

    // Attach socket event listeners when the component mounts
    useSocketEventListeners(socket, socketEventHandlers);

    return (
      <>
        <Title />
        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileClose}>
            <ChatList
              width="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgColor: "rgba(0,0,0,0.86)",
            }}
            height={"100%"}
            bgcolor="primary.main"
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
