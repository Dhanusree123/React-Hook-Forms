

import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { User } from './User-Page';

interface UserDetailsProps {
  user: User | null;
  onBackClick: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onBackClick }) => {
  if (!user) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          User details are not available.
        </Typography>
        <Button
          variant="contained"
          onClick={onBackClick}
          aria-label="Go back to the previous page"
          sx={{ mt: 2 }}
        >
          Back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Button
        variant="contained"
        onClick={onBackClick}
        aria-label="Go back to the previous page"
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <Typography variant="h4" gutterBottom>{user.name}</Typography>
      <Typography variant="body1">Username: {user.username || "Not provided"}</Typography>
      <Typography variant="body1">Email: {user.email || "Not provided"}</Typography>
      <Typography variant="body1">
        Address: {user.address.street || "N/A"}, {user.address.suite || "N/A"}, 
        {user.address.city || "N/A"}, {user.address.zipcode || "N/A"}
      </Typography>
    </Box>
  );
};

export default UserDetails;
