import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Replace with your home or desired route
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <ErrorOutlineIcon sx={{ fontSize: "8rem", color: "error.main" }} />
      </motion.div>
      <Box sx={{ mt: 3 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontSize: "4rem", fontWeight: "bold" }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{ mt: 2, fontWeight: "700" }}
        >
          Oops! The page you’re looking for isn’t here.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{
          marginTop: "25px",
          fontSize: "1.5rem",
          textTransform: "capitalize",
          fontWeight: "700",
          padding: "0.3rem 2rem",
        }}
      >
        Take Me Home{" "}
      </Button>
    </Container>
  );
};

export default NotFound;
