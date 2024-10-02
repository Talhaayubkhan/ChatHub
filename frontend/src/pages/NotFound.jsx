// import { Container, Typography, Button, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import { motion } from "framer-motion";

// const NotFound = () => {
//   const navigate = useNavigate();

//   const handleGoHome = () => {
//     navigate("/"); // Replace with your home or desired route
//   };

//   return (
//     <Container
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         textAlign: "center",
//         bgcolor: "background.default",
//         color: "text.primary",
//       }}
//     >
//       <motion.div
//         initial={{ scale: 0 }}
//         animate={{ rotate: 360, scale: 1 }}
//         transition={{ type: "spring", stiffness: 260, damping: 30 }}
//       >
//         <ErrorOutlineIcon sx={{ fontSize: "8rem", color: "error.main" }} />
//       </motion.div>
//       <Box sx={{ mt: 3 }}>
//         <Typography
//           variant="h1"
//           component="h1"
//           sx={{ fontSize: "4rem", fontWeight: "bold" }}
//         >
//           404
//         </Typography>
//         <Typography
//           variant="h5"
//           component="h2"
//           sx={{ mt: 2, fontWeight: "700" }}
//         >
//           Oops! The page you’re looking for isn’t here.
//         </Typography>
//       </Box>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleGoHome}
//         sx={{
//           marginTop: "25px",
//           fontSize: "1.5rem",
//           textTransform: "capitalize",
//           fontWeight: "700",
//           padding: "0.3rem 2rem",
//         }}
//       >
//         Take Me Home{" "}
//       </Button>
//     </Container>
//   );
// };

// export default NotFound;

import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { motion, AnimatePresence } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isHovering, setIsHovering] = useState(false);

  const handleGoHome = () => {
    navigate("/");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: theme.spacing(4),
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        overflow: "hidden",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          style={{ marginBottom: theme.spacing(6) }}
        >
          <Paper
            elevation={8}
            sx={{
              borderRadius: "50%",
              padding: theme.spacing(4),
              backgroundColor: theme.palette.background.paper,
              display: "inline-block",
            }}
          >
            <motion.div
              animate={{ rotate: isHovering ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <ErrorOutlineIcon
                sx={{
                  fontSize: isMobile ? "6rem" : "8rem",
                  color: theme.palette.error.main,
                  filter: `drop-shadow(0 0 15px ${theme.palette.error.light})`,
                }}
              />
            </motion.div>
          </Paper>
        </motion.div>

        <motion.div
          variants={itemVariants}
          style={{ marginBottom: theme.spacing(4) }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: isMobile ? "4rem" : "7rem",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: theme.spacing(2),
            }}
          >
            404
          </Typography>
        </motion.div>

        <motion.div
          variants={itemVariants}
          style={{ marginBottom: theme.spacing(6) }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 500,
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.5,
            }}
          >
            Oops! It looks like you've stumbled into the digital wilderness.
            <br />
            The page you're looking for seems to have gone on an adventure
            without us.
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: theme.spacing(3),
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoHome}
              startIcon={<HomeIcon />}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              sx={{
                fontSize: "1.5rem",
                textTransform: "none",
                fontWeight: 600,
                padding: "0.5rem 1.5rem",
                borderRadius: "50px",
                boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: `0 10px 25px ${theme.palette.primary.main}60`,
                },
              }}
            >
              Take Me Home
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<SearchIcon />}
              sx={{
                fontSize: "1.1rem",
                textTransform: "none",
                fontWeight: 600,
                padding: "0.8rem 2rem",
                borderRadius: "50px",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: `0 6px 25px ${theme.palette.secondary.main}40`,
                },
              }}
            >
              Search Site
            </Button>
          </Box>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default NotFound;
