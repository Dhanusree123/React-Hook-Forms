import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Card,
  CardContent,
  TablePagination,
  Button,
} from "@mui/material";
import { tableData } from "../Data/TableData";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Order = "asc" | "desc";

const TablePage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof (typeof tableData)[0]>("id");

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    _event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(_event.target.value));
    setPage(0);
  };

  const handleRequestSort = (property: keyof (typeof tableData)[0]) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const sortedData = useMemo(() => {
    return tableData.slice().sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [order, orderBy]);
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Button
        variant="contained"
        sx={{ position: "absolute", top: "10px", left: "10px" }}
        onClick={() => navigate("/")}
      >
        Log out
      </Button>
      <Box>
        <Card
          variant="outlined"
          sx={{
            height: "70vh",
            width: "90rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent sx={{ height: "60vh", width: "80rem" }}>
            <TableContainer component={Paper} elevation={6}>
              <Table
                aria-label="simple table"
                stickyHeader
                sx={{ height: "55vh" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell onClick={() => handleRequestSort("id")}>
                      Id
                    </TableCell>
                    <TableCell onClick={() => handleRequestSort("first_name")}>
                      First Name
                    </TableCell>
                    <TableCell onClick={() => handleRequestSort("last_name")}>
                      Last Name
                    </TableCell>
                    <TableCell onClick={() => handleRequestSort("email")}>
                      Email
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData !== null ? (
                    sortedData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.first_name}</TableCell>
                          <TableCell>{row.last_name}</TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <div>Loading...</div>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={sortedData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TablePage;
