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
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";

const isAdmin = true;

const AdminLogin = () => {
  // TODO: we later use usernameOrEmail instead
  const username = useInputValidation("");
  const secretKey = useInputValidation("");
  const submitHandler = (e) => {
    e.preventDefault();
  };

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div
      style={{
        //   backgroundImage:
        //     "linear-gradient(to bottom right, rgba(36, 74, 235, 0.8), rgba(134, 221, 14, 0.6))",
        backgroundColor: "lightgray",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
            borderRadius: 4,
          }}
        >
          <Avatar
            sx={{
              m: 2,
              bgcolor: "secondary.main",
              width: "50px",
              height: "50px",
              border: "1px solid black",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" fontWeight={"bold"}>
            Admin Login
          </Typography>
          <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="text"
              id="username"
              autoComplete="username"
              value={username.value}
              onChange={username.changeHandler}
            />
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
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
