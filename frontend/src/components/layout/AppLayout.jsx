import { useCallback, useEffect, useMemo, useRef } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux-toolkit/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDeleteMenu,
  setIsMobileMenu,
  setSelectedDeleteChat,
} from "../../redux-toolkit/reducers/misc";
import { useErrors, useSocketEventListeners } from "../../hooks/hooks";
import { useSocket } from "../../Socket.jsx";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  REFETCH_ALERT,
} from "../../constants/events";
import {
  incrementNotificationCount,
  setNewMessagesAlert,
} from "../../redux-toolkit/reducers/chat";
import { getMessagesCountInLocalStorage } from "../../lib/features";
import DeleletMenuChat from "../dialogs/DeleletMenuChat";

// Keep shared chat navigation and socket alerts in one layout wrapper.
const AppLayout = () => (WrappedComponent) => {
  const AppLayoutComponent = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);
    // console.log("Chat ID in AppLayout:", chatId); // Verify this

    const socket = useSocket();
    // console.log(socket);

    const { isMobileMenu } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getMessagesCountInLocalStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessagesAlert,
      });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => {
      dispatch(setIsMobileMenu(false));
    };

    const handleNewMessageListener = useCallback(
      (data) => {
        // console.log("New message alert received:", data); // Log to check if event fires

        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId, dispatch]
    );

    const handleNewRequestListener = useCallback(() => {
      dispatch(incrementNotificationCount());
    }, [dispatch]);
    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const socketEventHandlers = useMemo(
      () => ({
        [NEW_MESSAGE_ALERT]: handleNewMessageListener,
        [NEW_REQUEST]: handleNewRequestListener,
        [REFETCH_ALERT]: refetchListener,
      }),
      [handleNewMessageListener, handleNewRequestListener, refetchListener]
    );

    // Attach socket event listeners when the component mounts
    useSocketEventListeners(socket, socketEventHandlers);

    return (
      <>
        <Title />
        <Header />
        <DeleletMenuChat
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor.current}
        />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer
            open={isMobileMenu}
            onClose={handleMobileClose}
            PaperProps={{
              sx: { width: "min(88vw, 22rem)", maxWidth: "100%" },
            }}
          >
            <ChatList
              w="100%"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
            />
          </Drawer>
        )}

        <Grid
          container
          sx={{
            height: "calc(100dvh - 4rem)",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
              minHeight: 0,
              overflow: "hidden",
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
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
            sx={{ minWidth: 0, minHeight: 0, overflow: "hidden" }}
          >
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              padding: { md: "1.25rem", lg: "2rem" },
              overflowY: "auto",
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

  return AppLayoutComponent;
};

export default AppLayout;
