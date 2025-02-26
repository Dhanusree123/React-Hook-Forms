/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ITableColumn } from "../../types/common";
import { getObjectKeyValue } from "../../utils/common";

type Props = {
  data: any[];
  columns: ITableColumn[];
};

const CustomTable = (props: Props) => {
  const { data, columns } = props;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              const { align = "left" } = column;
              return (
                <TableCell
                  key={column.label}
                  align={align}
                  sx={{
                    minWidth: column?.minWidth ?? "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  {column.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                {columns.map((column) => {
                  const {
                    key,
                    label,
                    textTransform,
                    align = "left",
                    minWidth = "auto",
                    action,
                  } = column;
                  const value = key ? getObjectKeyValue(item, key) : null;
                  return (
                    <TableCell
                      key={label}
                      sx={{ textTransform: textTransform ?? "none", minWidth }}
                      align={align}
                    >
                      {key && (
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: 250,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {value}
                        </Typography>
                      )}
                      {action && action(item)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
