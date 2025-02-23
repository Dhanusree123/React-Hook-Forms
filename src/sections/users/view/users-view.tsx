import { useEffect, useState } from "react";
import useAxios from "../../../components/custom-axios/useAxios";
import { User, UserResponse } from "../../../types/Users";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid2,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

const UsersView = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const initialPage = Number(params.get("page")) || 1;

  const { response, error, loading, fetchData } = useAxios();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialPage);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const fetchUsers = (page: number) => {
    fetchData({
      url: "/users",
      method: "GET",
      params: {
        page: page,
        per_page: 4,
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

  const deleteUser = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const userToDelete = users.find((user) => user.id === id);
    if (userToDelete) {
      console.log("Deleted user:", userToDelete);
      fetchData({
        url: `/users/${id}`,
        method: "DELETE",
      }).then(() => {
        const afterDeleteUsers = users.filter((user) => user.id !== id);
        setUsers(afterDeleteUsers);
        console.log("After Delete Users", afterDeleteUsers);
        toast.success("User deleted successfully");
      });
    }
  };

  const handleUserClick = (user: User) => {
    navigate(`/user/${user.id}/edit`);
  };

  const handleUserEmailClick = (user: User, event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/user/${user.id}/edit-email`);
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
        <Container>
          {loading && <Typography>Loading ...</Typography>}
          {error && <Typography>Error: {error}</Typography>}
          {users && (
            <Grid2 container spacing={2}>
              {users.map((user) => (
                <Grid2 size={{ xs: 12, md: 6 }} key={user.id}>
                  <Card
                    onClick={() => handleUserClick(user)}
                    sx={{ marginTop: 3 }}
                  >
                    <Stack spacing={3} direction="row">
                      <CardMedia
                        component="img"
                        src={user.avatar}
                        alt={`${user.first_name} ${user.last_name}`}
                        sx={{ maxWidth: 250, cursor: "pointer" }}
                      />
                      <Stack justifyContent="center">
                        <CardContent>
                          <Typography variant="h6">
                            User: {user.first_name} {user.last_name}
                          </Typography>
                          <Typography
                            variant="h6"
                            onClick={(event) =>
                              handleUserEmailClick(user, event)
                            }
                            sx={{ cursor: "pointer" }}
                          >
                            {user.email}
                          </Typography>
                          <Button
                            onClick={(event) => deleteUser(user.id, event)}
                          >
                            Delete
                          </Button>
                        </CardContent>
                      </Stack>
                    </Stack>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          )}

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
