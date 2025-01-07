

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import UserList from './User-List';
import UserDetails from './User-Details';
import Pagination from './Pagination';
import Loading from './Loading';
import '../styles/userpage.css';

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get('page') || '1');

  const [userData, setUserData] = useState<User[]>([]);
  const [userDetail, setUserDetail] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const usersPerPage = 2;

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error(`Failed to fetch user data: ${response.statusText}`);
        const data = await response.json();
        const sortedData = data.sort((a: User, b: User) => a.name.localeCompare(b.name));
        setUserData(sortedData);
      } catch (error) {
        setError((error as Error).message);
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDetail = async (userId: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/${userId}`);
        if (!response.ok) throw new Error(`Failed to fetch user detail: ${response.statusText}`);
        const data = await response.json();
        setUserDetail(data);
        console.log("Fetched user detail:", data);
      } catch (error) {
        setError((error as Error).message);
        console.error("Error fetching user detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserDetail(Number(id));
    } else {
      fetchUserData();
    }
  }, [id, currentPage]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, pageNumber: number) => {
    navigate(`/userpage?page=${pageNumber}`);
  };

  const handleUserClick = (userId: number) => {
    navigate(`/userpage/${userId}`);
  };

  const handleBackClick = () => navigate(-1);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = userData.slice(startIndex, startIndex + usersPerPage);

  return (
    <Container className="container">
      {id && userDetail ? (
        <UserDetails user={userDetail} onBackClick={handleBackClick} />
      ) : (
        <>
          <Box className="header">
            <Button variant="contained" onClick={handleBackClick}>Back</Button>
            <Typography variant="h4" component="h1" gutterBottom>
              Users
            </Typography>
          </Box>
          <UserList users={paginatedUsers} onUserClick={handleUserClick} />
          <Pagination
            // className="pagination"
            count={Math.ceil(userData.length / usersPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
};

export default UserPage;
