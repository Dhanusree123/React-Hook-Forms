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
  Divider,
} from "@mui/material";
import { tableData } from "../Data/TableData";
import { useState } from "react";

const TablePage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    _event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(_event.target.value));
    setPage(0);
  };
  return (
    <Box>
      <Card sx={{ height: "70vh", width: "90rem" }}>
        <CardContent sx={{ height: "60vh", width: "80rem" }}>
          <TableContainer component={Paper}>
            <Table
              aria-label="simple table"
              stickyHeader
              sx={{ height: "55vh" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData !== null ? (
                  tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
              count={tableData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TableContainer>
          <Divider variant="middle" flexItem />
        </CardContent>
      </Card>
    </Box>
  );
};

export default TablePage;
