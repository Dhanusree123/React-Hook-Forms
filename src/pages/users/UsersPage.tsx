import {
  Box,
  Button,
  Container,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import { IUser } from "../../types/user";
import CustomBreadCrumbs from "../../components/CustomBreadCrumbs";
import { UserDelete } from "../../sections/users/UserDelete";

const UsersPage = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [count, setCount] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const initialPage = Number(params.get("page")) || 1;
  const [page, setPage] = useState<number>(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState<number>(6);

  const onChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
    params.set("page", newPage.toString());
    navigate(`?${params.toString()}`);
  };

  const handleUsers = useCallback(async () => {
    try {
      const users = await axios.get(
        `https://reqres.in/api/users?page=${page}&per_page=${rowsPerPage}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setData(users.data.data);
      setPage(users.data.page);
      setCount(users.data.total);
      setRowsPerPage(users.data.per_page);
    } catch (err) {
      console.log(err);
    }
  }, [page, rowsPerPage]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });
  useEffect(() => {
    handleUsers();
  }, [handleUsers]);

  return (
    <>
      <Container maxWidth="lg">
        <CustomBreadCrumbs pathName="Users" />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => navigate("/users/new")}>New User</Button>
        </Box>
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
              {data.map((m, i) => (
                <TableRow key={i}>
                  <TableCell>{m.id}</TableCell>
                  <TableCell>
                    <img
                      src={m.avatar}
                      alt={m.first_name}
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell>{m.first_name}</TableCell>
                  <TableCell>{m.last_name}</TableCell>
                  <TableCell>{m.email}</TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton onClick={() => navigate(`/users/${m.id}/edit`)}>
                      <Edit />
                    </IconButton>
                    <UserDelete id={m.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(count / rowsPerPage)}
          page={page}
          onChange={onChangePage}
          color="primary"
        />
      </Box>
    </>
  );
};

export default UsersPage;
