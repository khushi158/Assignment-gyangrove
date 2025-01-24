// src/pages/Settings.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { Delete as DeleteIcon } from "@mui/icons-material";

const Settings = () => {
  const [password, setPassword] = useState("");
  const [alertEmail, setAlertEmail] = useState("");
  const [alertEmails, setAlertEmails] = useState([]);

  const handlePasswordChange = () => {
    if (!password) {
      alert("Please enter a new password.");
      return;
    }
    // Handle password update logic here
    alert("Password updated successfully!");
    setPassword("");
  };

  const handleAddAlertEmail = () => {
    if (!alertEmail) {
      alert("Please enter an email address.");
      return;
    }
    setAlertEmails((prev) => [...prev, alertEmail]);
    setAlertEmail("");
  };

  const handleRemoveAlertEmail = (email) => {
    setAlertEmails((prev) => prev.filter((e) => e !== email));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>

        {/* Change Password Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePasswordChange}
            sx={{
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.3s ease",
              },
            }}
          >
            Update Password
          </Button>
        </Paper>

        {/* Alert Emails Section */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Alert Emails
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <TextField
                fullWidth
                type="email"
                label="Add Alert Email"
                value={alertEmail}
                onChange={(e) => setAlertEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddAlertEmail}
                fullWidth
                sx={{
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease",
                  },
                }}
              >
                Add Email
              </Button>
            </Grid>
          </Grid>
          <List sx={{ mt: 2 }}>
            {alertEmails.map((email, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveAlertEmail(email)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={email} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default Settings;
