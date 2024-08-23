// import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux-toolkit/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobileMenu } from "../../redux-toolkit/reducers/misc";
import ErrorHook from "../../hooks/ErrorHook";

// This High Order Function
// Higher-order components (HOCs) in React are used to enhance components with reusable logic, providing a way to share functionality across multiple components without repeating code
const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const chatId = params.chatId;

    const { isMobileMenu } = useSelector((state) => state.misc);
    console.log(isMobileMenu);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    ErrorHook([{ isError, error }]);

    const handleDeleteChat = (event, _id, groupChat) => {
      event.preventDefault();
      console.log("deleteChat", _id, groupChat);
    };

    const handleMobileClose = () => {
      dispatch(setIsMobileMenu(false));
    };

    return (
      <>
        <Title />

        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileClose}>
            <ChatList
              width="75vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
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
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100vh"}>
            <WrappedComponent {...props} />
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
            height={"100vh"}
            bgcolor="primary.main"
          >
            <Profile />
          </Grid>
        </Grid>
        <div>Footer</div>
      </>
    );
  };
};

export default AppLayout;
