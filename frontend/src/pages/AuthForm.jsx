import { useState } from "react";
import { useFileHandler, useInputValidation } from "6pp";
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
import PasswordInput from "./PasswordInput"; // Import PasswordInput component
import { useDispatch } from "react-redux";
import server from "../constants/config.js";
import { userExists } from "../redux-toolkit/reducers/reducerAuth";
import { toast } from "react-toastify";
import axios from "axios";
import {
  emailValidator,
  usernameOrEmailValidator,
  usernameValidator,
} from "../utils/validators.js";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleButton = () => {
    console.log("Im clicked");
    setIsLogin((prev) => !prev);
  };

  const name = useInputValidation("", {
    required: true,
  });
  const bio = useInputValidation("");
  const usernameOrEmail = useInputValidation("", usernameOrEmailValidator); // This will be used for login
  const username = useInputValidation("", usernameValidator);
  const email = useInputValidation("", emailValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // console.log(server);
      const { data } = await axios.post(
        `${server}/api/v1/auth/login`,
        {
          usernameOrEmail: usernameOrEmail.value, // This can be either username or email
          password: password.value,
        },
        config
      );

      // console.log("API response:", data);

      if (data.success === true) {
        dispatch(userExists(true));
        toast.success(data.message);
      } else {
        toast.error(data.message || "Invalid username or password");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Add sign-up handling logic here later
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(15, 125, 255, 0.50), rgba(124, 255, 114, 0.40))",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem", // Added padding to ensure content is not too close to edges
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={12} // Increased elevation for more pronounced shadow
          sx={{
            padding: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 5, // Rounded corners
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly opaque background for better contrast
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)", // Improved shadow effect
          }}
        >
          {isLogin ? (
            <>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 800, // Bold text
                  fontSize: "2rem", // Larger font size
                  letterSpacing: "1px", // Slight letter spacing for a modern look
                  color: "#1976d2", // Primary color for contrast
                }}
              >
                Log In
              </Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username or Email"
                  margin="normal"
                  variant="outlined"
                  value={usernameOrEmail.value}
                  onChange={usernameOrEmail.changeHandler}
                  sx={{ bgcolor: "white", borderRadius: 4 }}
                />
                <PasswordInput
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 2,
                    mb: 1.5,
                    py: 2,
                    fontSize: "1.2rem",
                    borderRadius: 4,
                  }}
                  onClick={handleLogin} // Add this line
                >
                  Log In Here
                </Button>
                <Typography textAlign="center" m="0.5rem">
                  OR
                </Typography>
                <Button fullWidth variant="text" onClick={toggleButton}>
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: 800, // Bold text
                  fontSize: "2rem", // Larger font size
                  letterSpacing: "0.5px", // Slight letter spacing for a modern look
                  color: "#1976d2", // Primary color for contrast
                }}
              >
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
                      border: "2px solid #1976d2", // Enhanced border
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
                  sx={{ bgcolor: "white", borderRadius: 4 }}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  sx={{ bgcolor: "white", borderRadius: 4 }}
                />
                {username.error && (
                  <Typography variant="caption" color="error">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  value={email.value}
                  onChange={email.changeHandler}
                  sx={{ bgcolor: "white", borderRadius: 4 }}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  sx={{ bgcolor: "white", borderRadius: 4 }}
                />
                <PasswordInput
                  value={password.value}
                  onChange={password.changeHandler}
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
                    borderRadius: 4,
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
