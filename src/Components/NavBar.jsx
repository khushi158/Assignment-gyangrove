// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Inventories
          </Typography>
          <Button
            component={Link}
            to="/home"
            color="inherit"
            sx={{
              textTransform: "none",
              "&:hover": {
                transform: "scale(1.1)",
                transition: "transform 0.3s ease",
              },
            }}
          >
            Home
          </Button>
        
        
          <Button
            component={Link}
            to="/settings"
            variant="outlined"
            sx={{
              ml: 2,
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "white",
                transform: "scale(1.1)",
                transition: "transform 0.3s ease",
              },
            }}
          >
            Settings
          </Button>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;
