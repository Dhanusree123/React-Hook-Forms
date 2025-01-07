
import React from 'react';
import { Container, CircularProgress, Box } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default Loading;
