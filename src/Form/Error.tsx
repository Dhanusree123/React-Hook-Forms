
import React from 'react';
import { Alert } from '@mui/material';

export interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return <Alert severity="error">{message}</Alert>;
};

export default Error;
