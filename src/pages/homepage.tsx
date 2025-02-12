import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography>Welcome to Home Page</Typography>
      <Button onClick={() => navigate('/brands')}>Go To Brands</Button>
    </Box>
  );
};

export default HomePage;
