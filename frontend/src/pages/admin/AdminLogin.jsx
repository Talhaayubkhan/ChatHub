// import {
//   Avatar,
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
//   Box,
//   CssBaseline,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { useInputValidation } from "6pp";
// import { Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { adminLogin } from "../../redux-toolkit/thunks/admin";

// const AdminLogin = () => {
//   const { isAdmin } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   // TODO: we later use usernameOrEmail instead
//   const username = useInputValidation("");
//   const secretKey = useInputValidation("");

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(adminLogin(secretKey.value));
//   };

//   if (isAdmin) return <Navigate to="/admin/dashboard" />;

//   return (
//     <div
//       style={{
//         //   backgroundImage:
//         //     "linear-gradient(to bottom right, rgba(36, 74, 235, 0.8), rgba(134, 221, 14, 0.6))",
//         backgroundColor: "lightgray",
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Container component="main" maxWidth="sm">
//         <CssBaseline />
//         <Paper
//           elevation={6}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: 5,
//             borderRadius: 4,
//           }}
//         >
//           <Avatar
//             sx={{
//               m: 2,
//               bgcolor: "secondary.main",
//               width: "50px",
//               height: "50px",
//               border: "1px solid black",
//             }}
//           >
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h4" fontWeight={"bold"}>
//             Admin Login
//           </Typography>
//           <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="username"
//               label="Username"
//               type="text"
//               id="username"
//               autoComplete="username"
//               value={username.value}
//               onChange={username.changeHandler}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               label="Secret Key"
//               name="password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={secretKey.value}
//               onChange={secretKey.changeHandler}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Log In
//             </Button>
//           </Box>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default AdminLogin;
// AdminLogin.js
import {
  Avatar,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useInputValidation } from "6pp"; // Custom hook for input validation
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getVerifiedAdmin } from "../../redux-toolkit/thunks/admin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLogin = () => {
  const { admin: isAdmin } = useSelector((state) => state.auth); // Get admin status from state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const secretKey = useInputValidation(""); // Only handle secretKey now

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      adminLogin({ secretKey: secretKey.value }) // Only dispatch secretKey
    );
  };
  useEffect(() => {
    dispatch(getVerifiedAdmin());
  }, [dispatch]);

  if (isAdmin) navigate("/admin/dashboard"); // Redirect to admin dashboard if login is successful

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(135deg, #14213d 30%, #000000 100%)",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper
          elevation={15}
          sx={{
            padding: { xs: 2, sm: 2 },
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "primary.main", width: 70, height: 70 }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography
              component="h1"
              variant="h4"
              fontWeight={"700"}
              color="textPrimary"
            >
              Admin Login
            </Typography>
          </Box>
          <Box component="form" onSubmit={submitHandler} sx={{ mt: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Secret Key"
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                padding: { xs: "10px", sm: "12px" },
                fontSize: { xs: "0.9rem", sm: "1rem" },
                mb: 2,
                background: "linear-gradient(90deg, #1E88E5, #43A047)",
              }}
            >
              Log In
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
