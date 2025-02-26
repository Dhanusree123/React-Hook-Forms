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
import CustomBreadCrumbs from "../../components/CustomBreadCrumbs";
import { IResource } from "../../types/resource";
import { ResourceDelete } from "../../sections/resources/ResourceDelete";

const ResourcesPage = () => {
  const [data, setData] = useState<IResource[]>([]);
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

  const handleResources = useCallback(async () => {
    try {
      const resources = await axios.get(
        `https://reqres.in/api/{resource}?page=${page}&per_page=${rowsPerPage}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setData(resources.data.data);
      setPage(resources.data.page);
      setCount(resources.data.total);
      setRowsPerPage(resources.data.per_page);
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
    handleResources();
  }, [handleResources]);

  return (
    <>
      <Container maxWidth="lg">
        <CustomBreadCrumbs pathName="Resources" />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => navigate("/resources/new")}>
            New Resource
          </Button>
        </Box>
        <TableContainer sx={{ borderRadius: 2, boxShadow: 3, mt: 8 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Pantone Value</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((m, i) => (
                <TableRow key={i}>
                  <TableCell>{m.id}</TableCell>

                  <TableCell>{m.name}</TableCell>
                  <TableCell>{m.year}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        backgroundColor: m.color,
                        borderRadius: 1,
                        border: "1px solid #ccc",
                      }}
                    />
                  </TableCell>
                  <TableCell>{m.pantone_value}</TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      onClick={() => navigate(`/resources/${m.id}/edit`)}
                    >
                      <Edit />
                    </IconButton>
                    <ResourceDelete id={m.id} />
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

export default ResourcesPage;
