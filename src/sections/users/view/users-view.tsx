import { useEffect, useState } from "react";
import useAxios from "../../../components/custom-axios/useAxios";
import { IUser, UserResponse } from "../../../types/Users";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { DeleteUser } from "../delete-user";
import CustomBreadCrumbs from "../../../components/custom-bread-crumbs/CustomBreadCrumbs";

const UsersView = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const initialPage = Number(params.get("page")) || 1;

  const { response, error, loading, fetchData } = useAxios();
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const fetchUsers = (page: number) => {
    fetchData({
      url: "/users",
      method: "GET",
      params: {
        page: page,
        per_page: 6,
      },
    });
  };

  const handlePageChange = (_: unknown, value: number) => {
    if (value > 1) {
      params.set("page", value.toString());
    } else {
      params.delete("page");
    }
    setPage(value);
    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    if (response) {
      const usersResponse = response as unknown as UserResponse;
      setUsers(usersResponse.data);
      console.log(usersResponse.data);
      setTotalPages(usersResponse.total_pages || 1);
    }
  }, [response]);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <>
      <Box sx={{ bgcolor: "background.default", py: 4 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <CustomBreadCrumbs path="/users" pathName="Users" />
            <Button onClick={() => navigate("/user/new")} variant="contained">
              Add User
            </Button>
          </Box>
          {loading && <Typography>Loading ...</Typography>}
          {error && <Typography>Error: {error}</Typography>}
          <TableContainer sx={{ borderRadius: 2, boxShadow: 3, mt: 8 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <Avatar src={user.avatar} alt={user.first_name} />
                    </TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton
                        onClick={() => navigate(`/user/${user.id}/edit`)}
                      >
                        <Edit />
                      </IconButton>
                      <DeleteUser id={user.id.toString()} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack alignItems="center" marginTop={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default UsersView;
