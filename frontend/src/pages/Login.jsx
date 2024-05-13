import React, { useState } from "react";
import { Container, Paper } from "@mui/material";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Container component={"main"} maxWidth="sx">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Paper>
      </Container>
    </>
  );
};

export default Login;
