// import { useState } from "react";
// import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
// import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
// import {
//   Avatar,
//   Button,
//   Container,
//   IconButton,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { toast } from "react-hot-toast";
// import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
// import PasswordInput from "./PasswordInput";
// import server from "../constants/config.js";
// import { userExists } from "../redux-toolkit/reducers/reducerAuth.js";
// import {
//   emailValidator,
//   passwordValidator,
//   usernameOrEmailValidator,
//   usernameValidator,
// } from "../utils/validators.js";

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   const toggleButton = () => {
//     // console.log("Clicking toggle button");
//     setIsLogin((prev) => !prev);
//   };

//   const name = useInputValidation("");
//   const usernameOrEmail = useInputValidation("", usernameOrEmailValidator);
//   // const password = useStrongPassword();
//   const password = useInputValidation("", passwordValidator);
//   const username = useInputValidation("", usernameValidator);
//   const email = useInputValidation("", emailValidator);
//   const bio = useInputValidation("");
//   const avatar = useFileHandler("single");

//   const dispatch = useDispatch();

//   const loginUser = async (e) => {
//     e.preventDefault();
//     // console.log("I am Login Now...!");

//     // Configuration for login requests
//     // Sends JSON data for username and password, includes cookies for session management
//     const config = {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     try {
//       const response = await axios.post(
//         `${server}/api/v1/auth/login`,
//         {
//           usernameOrEmail: usernameOrEmail.value,
//           password: password.value,
//         },
//         config
//       );
//       if (response.data.success) {
//         dispatch(userExists(true));
//         toast.success("Login Successful");
//       } else {
//         toast.error(
//           response?.data?.message ||
//             "Login failed. Please check your credentials and try again."
//         );
//       }
//     } catch (error) {
//       // Define user-friendly messages based on the error status code or message
//       const errorMessage =
//         error?.response?.data?.message || error?.response?.status === 401
//           ? "Incorrect username or password. Please try again."
//           : error?.response?.status === 500
//           ? "Server error. Please try again later."
//           : "Something went wrong. Please try again.";

//       toast.error(errorMessage);
//     }
//   };

//   const regitserUser = async (e) => {
//     e.preventDefault();
//     // console.log("I am Register Now...!");

//     const formData = new FormData();
//     formData.append("name", name.value);
//     formData.append("username", username.value);
//     formData.append("email", email.value);
//     formData.append("password", password.value);
//     formData.append("bio", bio.value);
//     formData.append("avatar", avatar.file);

//     if (!formData) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     // Configuration for registration requests
//     // Handles file uploads and form data, includes cookies for authentication
//     const config = {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };
//     try {
//       const response = await axios.post(
//         `${server}/api/v1/auth/register`,
//         formData,
//         config
//       );
//       // console.log("Response: ", response);

//       if (response?.data?.success) {
//         dispatch(userExists(true));
//         toast.success(
//           response?.data?.message || "User Registered Successfully"
//         );
//       } else {
//         toast.error(
//           response?.data?.message ||
//             "Registration failed. Please check your details and try again."
//         );
//       }
//     } catch (error) {
//       const errorMessage =
//         error?.response?.data?.message || error?.response?.status === 400
//           ? "Invalid credentials. Please check your details and try again."
//           : error?.response?.status === 500
//           ? "Server error. Please try again later."
//           : "Something went wrong. Please try again.";
//       toast.error(errorMessage);
//       // console.error("Error: " + error.message);
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage:
//           "linear-gradient(rgba(180, 100, 220,0.5),rgba(110, 90, 190,0.5)",
//       }}
//     >
//       <Container
//         component={"main"}
//         maxWidth="sm"
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <Paper
//           elevation={20}
//           sx={{
//             padding: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             borderRadius: "10px",
//           }}
//         >
//           {isLogin ? (
//             <>
//               <Typography
//                 variant="h4"
//                 sx={{
//                   fontSize: "2rem",
//                   fontWeight: "700",
//                   marginBottom: "10px",
//                 }}
//                 color="primary"
//               >
//                 {" "}
//                 Login Here{" "}
//               </Typography>
//               <form
//                 style={{
//                   width: "100%",
//                   marginTop: "10px",
//                   marginBottom: "10px",
//                 }}
//                 onSubmit={loginUser}
//               >
//                 <TextField
//                   required
//                   fullWidth
//                   label="UsernameOrEmail"
//                   margin="normal"
//                   variant="outlined"
//                   value={usernameOrEmail.value}
//                   onChange={usernameOrEmail.changeHandler}
//                 />
//                 {usernameOrEmail.error && (
//                   <Typography variant="caption" color="error">
//                     {usernameOrEmail.error}
//                   </Typography>
//                 )}
//                 <PasswordInput
//                   value={password.value}
//                   onChange={password.changeHandler}
//                 />
//                 {password.error && (
//                   <Typography variant="caption" color="error">
//                     {password.error}
//                   </Typography>
//                 )}
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   color="info"
//                   type="submit"
//                   sx={{
//                     marginTop: "25px",
//                     fontSize: "1.5rem",
//                     textTransform: "capitalize",
//                     fontWeight: "700",
//                     padding: "0.3rem 2rem",
//                   }}
//                   // onClick={loginUser}
//                 >
//                   Login{" "}
//                 </Button>
//                 <Typography
//                   textAlign={"center"}
//                   margin={"1rem"}
//                   fontWeight={"600"}
//                 >
//                   OR
//                 </Typography>
//                 <Button
//                   sx={{
//                     fontSize: "1.2rem",
//                     textTransform: "capitalize",
//                     fontWeight: "700",
//                   }}
//                   color="primary"
//                   fullWidth
//                   onClick={toggleButton}
//                 >
//                   Register Instead
//                 </Button>
//               </form>
//             </>
//           ) : (
//             <>
//               <Typography
//                 variant="h4"
//                 sx={{
//                   fontSize: "2rem",
//                   fontWeight: "700",
//                   padding: "0.5rem 1rem",
//                 }}
//                 color="primary"
//               >
//                 {" "}
//                 Register Your Account Here{" "}
//               </Typography>
//               <form
//                 style={{
//                   width: "100%",
//                   marginTop: "10px",
//                   marginBottom: "10px",
//                 }}
//                 onSubmit={regitserUser}
//               >
//                 <Stack position={"relative"} width={"10rem"} margin={"auto"}>
//                   <Avatar
//                     sx={{
//                       width: "10rem",
//                       height: "10rem",
//                       objectFit: "cover",
//                     }}
//                     src={
//                       avatar
//                         ? avatar.preview
//                         : "images directory not found in the filesystem"
//                     }
//                   />
//                   <IconButton
//                     sx={{
//                       position: "absolute",
//                       bottom: "0",
//                       right: "0",
//                       cursor: "pointer",
//                       bgcolor: "rgba(0,0,0,0.4)",
//                       ":hover": {
//                         bgcolor: "rgba(255,255,255,0.10)",
//                       },
//                     }}
//                     component="label"
//                   >
//                     <>
//                       <CameraAltIcon />
//                       <VisuallyHiddenInput
//                         type="file"
//                         onChange={avatar.changeHandler} // Make sure this is correctly hooked up
//                       />
//                     </>
//                   </IconButton>
//                 </Stack>
//                 {avatar.error && (
//                   <Typography
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       color: "red",
//                       fontWeight: "600",
//                       padding: "0.3rem",
//                     }}
//                   >
//                     {avatar.error}
//                   </Typography>
//                 )}
//                 <TextField
//                   required
//                   fullWidth
//                   label="Name"
//                   margin="normal"
//                   variant="outlined"
//                   value={name.value}
//                   onChange={name.changeHandler}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   label="Username"
//                   margin="normal"
//                   variant="outlined"
//                   value={username.value}
//                   onChange={username.changeHandler}
//                 />

//                 {username.error && (
//                   <Typography variant="caption" color="error">
//                     {username.error}
//                   </Typography>
//                 )}

//                 <TextField
//                   required
//                   fullWidth
//                   label="Email"
//                   type="email"
//                   margin="normal"
//                   variant="outlined"
//                   value={email.value}
//                   onChange={email.changeHandler}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   label="Bio"
//                   margin="normal"
//                   variant="outlined"
//                   value={bio.value}
//                   onChange={bio.changeHandler}
//                 />
//                 <PasswordInput
//                   value={password.value}
//                   onChange={password.changeHandler}
//                 />
//                 {password.error && (
//                   <Typography variant="caption" color="error">
//                     {password.error}
//                   </Typography>
//                 )}

//                 <Button
//                   fullWidth
//                   variant="contained"
//                   color="info"
//                   type="submit"
//                   sx={{
//                     marginTop: "25px",
//                     fontSize: "1.5rem",
//                     textTransform: "capitalize",
//                     fontWeight: "700",
//                     padding: "0.3rem 2rem",
//                   }}
//                 >
//                   Register Here{" "}
//                 </Button>

//                 <Typography
//                   textAlign={"center"}
//                   margin={"1rem"}
//                   fontWeight={"600"}
//                 >
//                   OR
//                 </Typography>

//                 <Button
//                   sx={{
//                     fontSize: "1.2rem",
//                     textTransform: "capitalize",
//                     fontWeight: "700",
//                   }}
//                   color="primary"
//                   fullWidth
//                   onClick={toggleButton}
//                 >
//                   Login Instead
//                 </Button>
//               </form>
//             </>
//           )}
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default Login;

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
  ThemeProvider,
  createTheme,
  useMediaQuery,
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
  passwordValidator,
  usernameOrEmailValidator,
  usernameValidator,
} from "../utils/validators.js";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ea",
    },
    secondary: {
      main: "#3f51b5",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
      fontSize: "2rem",
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: "none",
          fontSize: "1rem",
          padding: "10px 20px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "20px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          padding: "2rem",
          "@media (max-width:600px)": {
            padding: "1rem",
          },
        },
      },
    },
  },
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleButton = () => {
    setIsLogin((prev) => !prev);
  };

  const name = useInputValidation("");
  const usernameOrEmail = useInputValidation("", usernameOrEmailValidator);
  const password = useInputValidation("", passwordValidator);
  const username = useInputValidation("", usernameValidator);
  const email = useInputValidation("", emailValidator);
  const bio = useInputValidation("");
  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const loginUser = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${server}/api/v1/auth/login`,
        {
          usernameOrEmail: usernameOrEmail.value,
          password: password.value,
        },
        config
      );
      if (response.data.success) {
        dispatch(userExists(response?.data?.user));
        toast.success("Login Successful", {
          id: toastId,
        });
      } else {
        toast.error(
          response?.data?.message ||
            "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.response?.status === 401
          ? "Incorrect username or password. Please try again."
          : error?.response?.status === 500
          ? "Server error. Please try again later."
          : "Something went wrong. Please try again.";

      toast.error(errorMessage, {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const regitserUser = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Registering User....");

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("username", username.value);
    formData.append("email", email.value);
    formData.append("password", password.value);
    formData.append("bio", bio.value);
    formData.append("avatar", avatar.file);

    if (!formData) {
      toast.error("Please fill all required fields");
      return;
    }

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await axios.post(
        `${server}/api/v1/auth/register`,
        formData,
        config
      );

      if (response?.data?.success) {
        dispatch(userExists(response?.data?.user));
        toast.success(
          response?.data?.message || "User Registered Successfully",
          {
            id: toastId,
          }
        );
      } else {
        toast.error(
          response?.data?.message ||
            "Registration failed. Please check your details and try again."
        );
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.response?.status === 400
          ? "Invalid credentials. Please check your details and try again."
          : error?.response?.status === 500
          ? "Server error. Please try again later."
          : "Something went wrong. Please try again.";
      toast.error(errorMessage, {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "1rem" : "2rem",
        }}
      >
        <Container
          component={"main"}
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={20}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              overflowY: "auto",
              maxHeight: "90vh",
            }}
          >
            {isLogin ? (
              <>
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: "20px",
                    color: "primary.main",
                  }}
                >
                  Welcome Back
                </Typography>
                <form
                  style={{
                    width: "100%",
                    marginTop: "10px",
                  }}
                  onSubmit={loginUser}
                >
                  <TextField
                    required
                    fullWidth
                    label="Username or Email"
                    variant="outlined"
                    value={usernameOrEmail.value}
                    onChange={usernameOrEmail.changeHandler}
                    error={!!usernameOrEmail.error}
                    helperText={usernameOrEmail.error}
                  />
                  <PasswordInput
                    value={password.value}
                    onChange={password.changeHandler}
                    error={!!password.error}
                    helperText={password.error}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                    sx={{
                      marginTop: "20px",
                      marginBottom: "15px",
                    }}
                  >
                    Login
                  </Button>
                  <Typography
                    textAlign={"center"}
                    margin={"0.5rem"}
                    fontWeight={"600"}
                  >
                    OR
                  </Typography>
                  <Button
                    disabled={isLoading}
                    color="secondary"
                    fullWidth
                    onClick={toggleButton}
                  >
                    Create an Account
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: "10px",
                    color: "primary.main",
                  }}
                >
                  Create Your Account
                </Typography>
                <form
                  style={{
                    width: "100%",
                    marginTop: "10px",
                  }}
                  onSubmit={regitserUser}
                >
                  <Stack
                    position={"relative"}
                    width={"120px"}
                    margin={"auto"}
                    mb={3}
                  >
                    <Avatar
                      sx={{
                        width: "115px",
                        height: "115px",
                        objectFit: "cover",
                      }}
                      src={avatar.preview}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "primary.dark",
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
                    <Typography color="error" textAlign="center" mb={2}>
                      {avatar.error}
                    </Typography>
                  )}
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={name.value}
                    onChange={name.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username.value}
                    onChange={username.changeHandler}
                    error={!!username.error}
                    helperText={username.error}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email.value}
                    onChange={email.changeHandler}
                    error={!!email.error}
                    helperText={email.error}
                  />
                  <TextField
                    fullWidth
                    label="Bio"
                    variant="outlined"
                    multiline
                    rows={2}
                    value={bio.value}
                    onChange={bio.changeHandler}
                  />
                  <PasswordInput
                    value={password.value}
                    onChange={password.changeHandler}
                    error={!!password.error}
                    helperText={password.error}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    Register
                  </Button>
                  <Typography
                    textAlign={"center"}
                    margin={"0.5rem"}
                    fontWeight={"600"}
                  >
                    OR
                  </Typography>
                  <Button
                    disabled={isLoading}
                    color="secondary"
                    fullWidth
                    onClick={toggleButton}
                  >
                    Login Instead
                  </Button>
                </form>
              </>
            )}
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Login;
