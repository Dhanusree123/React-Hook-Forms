

import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import { User } from './User-Page';
import { AccountCircle } from '@mui/icons-material';

interface UserListProps {
  users: User[];
  onUserClick: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserClick }) => {
  return (
    <Box sx={{ overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell onClick={() => onUserClick(user.id)} sx={{ cursor: 'pointer' }}>
                  {user.name}
                </TableCell>
                <TableCell onClick={() => onUserClick(user.id)} sx={{ cursor: 'pointer' }}>
                  {user.username}
                </TableCell>
                <TableCell onClick={() => onUserClick(user.id)} sx={{ cursor: 'pointer' }}>
                  {user.email}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton onClick={() => onUserClick(user.id)}>
                      <AccountCircle />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;

