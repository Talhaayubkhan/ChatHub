import { useState } from "react";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
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
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import PasswordInput from "./PasswordInput";
import server from "../constants/config.js";
import { userExists } from "../redux-toolkit/reducers/reducerAuth.js";
import {
  emailValidator,
  usernameOrEmailValidator,
  usernameValidator,
} from "../utils/validators.js";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleButton = () => {
    console.log("Clicking toggle button");
    setIsLogin((prev) => !prev);
  };

  const name = useInputValidation("");
  const usernameOrEmail = useInputValidation("", usernameOrEmailValidator);
  const password = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const email = useInputValidation("", emailValidator);
  const bio = useInputValidation("");
  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const loginUser = async (e) => {
    e.preventDefault();
    // console.log("I am Login Now...!");

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // console.log(server);

      const response = await axios.post(
        `${server}/api/v1/auth/login`,
        {
          usernameOrEmail: usernameOrEmail.value,
          password: password.value,
        },
        config
      );
      if (response) {
        dispatch(userExists(true));
        // console.log("Login Successful");
        toast.success("Login Successful");
      } else {
        // console.log("Login Failed");
        toast.error("Login Failed", response);
      }
    } catch (error) {
      toast.error("Failed to Login");
      // console.error("Login Failed");
    }
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
              onSubmit={loginUser}
            >
              <TextField
                required
                fullWidth
                label="UsernameOrEmail"
                margin="normal"
                variant="outlined"
                value={usernameOrEmail.value}
                onChange={usernameOrEmail.changeHandler}
              />
              <PasswordInput
                value={password.value}
                onChange={password.changeHandler}
              />

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
                // onClick={loginUser}
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
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler} // Make sure this is correctly hooked up
                    />
                  </>
                </IconButton>
              </Stack>

              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                variant="outlined"
                value={email.value}
                onChange={email.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <PasswordInput
                value={password.value}
                onChange={password.changeHandler}
              />

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
