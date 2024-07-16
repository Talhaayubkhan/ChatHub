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
import axios from "axios";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { useDispatch } from "react-redux";
import { userNameValidator } from "../utils/validators";

import { server } from "../constants/config.js";
import { userExists } from "../redux-toolkit/reducers/reducerAuth";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleButton = () => {
    setIsLogin((prev) => !prev);
  };

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", userNameValidator);
  const password = useStrongPassword();

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handleLogin called with");
    console.log("Username:", username.value);
    console.log("Password:", password.value);

    const config = {
      withCredentials: true, // Ensure cookies are sent
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      console.log("Attempting to log in...");
      const { data } = await axios.post(
        `${server}/api/v1/auth/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      console.log("Server response:", data);

      dispatch(userExists(true));
      toast.success(data?.message);
    } catch (error) {
      console.error("Failed to log in", error?.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add signup functionality here
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(36, 74, 235, 0.94), rgba(134, 221, 14, 0))",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h4" gutterBottom>
                Login
              </Typography>
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
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  sx={{ bgcolor: "white" }}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  sx={{ bgcolor: "white" }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    mt: 2,
                    mb: 1.5,
                    py: 2,
                    fontSize: "1.2rem",
                  }}
                >
                  Log In
                </Button>
                <Typography textAlign="center" m="1rem">
                  OR
                </Typography>
                <Button fullWidth variant="text" onClick={toggleButton}>
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                Sign Up
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position="relative" width="10rem" margin="auto">
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "cover",
                      border: "2px solid #1976d2",
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
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    m="1rem auto"
                    width="fit-content"
                    fontSize="18px"
                    fontWeight="bold"
                    display="block"
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
                  sx={{ bgcolor: "white" }}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  sx={{ bgcolor: "white" }}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  sx={{ bgcolor: "white" }}
                />
                {username.error && (
                  <Typography variant="caption" color="error">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  sx={{ bgcolor: "white" }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    mt: 2,
                    mb: 1,
                    py: 1.5,
                    fontSize: "1.1rem",
                  }}
                >
                  Sign Up
                </Button>
                <Typography textAlign="center" m="1rem">
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
