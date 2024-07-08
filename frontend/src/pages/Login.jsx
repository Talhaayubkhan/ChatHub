import { useState } from "react";
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

import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { userNameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const name = useInputValidation("");
  // const firstName = useInputValidation("");
  // const lastName = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", userNameValidator);
  // for security purpose, we use strong passwords
  const password = useStrongPassword();

  // to show picture with Sign Up
  const avatar = useFileHandler("single");

  const toggleButton = () => {
    setIsLogin((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
  };
  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(36 74 235 / 94%), rgba(134 221 14 / 0%))",
      }}
    >
      <Container
        component={"main"}
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Log In
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button fullWidth variant="text" onClick={toggleButton}>
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Sign Up</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                      color: "white",
                      bgcolor: "rgba(0, 0, 0, 0.5)",
                      ":hover": {
                        bgcolor: "rgba(0, 0, 0, 0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    fontSize={"18px"}
                    fontWeight={"bold"}
                    display={"block"}
                    variant="caption"
                    color="error"
                  >
                    {avatar.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                {/* <TextField
                  required
                  fullWidth
                  label="First Name"
                  margin="normal"
                  variant="outlined"
                  value={firstName.value}
                  onChange={firstName.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  variant="outlined"
                  value={lastName.value}
                  onChange={lastName.changeHandler}
                /> */}
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography variant="caption" color="error">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {/* {password.error && (
                  <Typography variant="caption" color="error">
                    {password.error}
                  </Typography>
                )} */}

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Sign Up
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button fullWidth variant="text" onClick={toggleButton}>
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
