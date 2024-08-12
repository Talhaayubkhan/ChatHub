import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import PasswordInput from "./PasswordInput";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleButton = () => {
    console.log("Clicking toggle button");
    setIsLogin((prev) => !prev);
  };

  const handleLogin = (e) => {
    console.log("Hello, Khan!");
    e.preventDefault();
  };

  return (
    <Container
      component={"main"}
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={15}
        sx={{
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography
              variant="h4"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "700",
                padding: "0.5rem 1rem",
              }}
              color="primary"
            >
              {" "}
              Login Here{" "}
            </Typography>
            <form
              style={{
                width: "100%",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              onSubmit={handleLogin}
            >
              <TextField
                required
                fullWidth
                label="UsernameOrEmail"
                margin="normal"
                variant="outlined"
              />
              <PasswordInput />

              <Button
                fullWidth
                variant="contained"
                color="info"
                type="submit"
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  fontSize: "1.2rem",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  letterSpacing: "0.05rem",
                  padding: "0.5rem 1rem",
                }}
              >
                Login{" "}
              </Button>

              <Typography
                textAlign={"center"}
                margin={"1rem"}
                fontWeight={"600"}
              >
                OR
              </Typography>

              <Button color="primary" fullWidth onClick={toggleButton}>
                Register Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography
              variant="h4"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "700",
                padding: "0.5rem 1rem",
              }}
              color="primary"
            >
              {" "}
              Register Your Account Here!{" "}
            </Typography>
            <form
              style={{
                width: "100%",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              onSubmit={handleLogin}
            >
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    cursor: "pointer",
                    bgcolor: "rgba(0,0,0,0.4)",
                    ":hover": {
                      bgcolor: "rgba(255,255,255,0.10)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput type="file" />
                  </>
                </IconButton>
              </Stack>

              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
              />
              <PasswordInput />

              <Button
                fullWidth
                variant="contained"
                color="info"
                type="submit"
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  fontSize: "1.2rem",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  letterSpacing: "0.05rem",
                  padding: "0.5rem 1rem",
                }}
              >
                Register Here{" "}
              </Button>

              <Typography
                textAlign={"center"}
                margin={"1rem"}
                fontWeight={"600"}
              >
                OR
              </Typography>

              <Button color="primary" fullWidth onClick={toggleButton}>
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
