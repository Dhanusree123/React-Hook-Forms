import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

type Columns = {
  header: string;
};

type TableProps = {
  columns: Columns[];
  rows: Array<string[]>;
};

const PageTable = ({ columns, rows }: TableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell key={i}>{col.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowindex) => (
            <TableRow key={rowindex}>
              {row.map((cell, cellindex) => (
                <TableCell key={cellindex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PageTable;
