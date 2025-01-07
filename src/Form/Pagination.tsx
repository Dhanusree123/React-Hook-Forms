
import React from 'react';
import { Box, Pagination as MUIPagination } from '@mui/material';

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ count, page, onChange }) => {
  return (
    <Box mt={3} display="flex" justifyContent="center">
      <MUIPagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
      />
    </Box>
  );
};

export default Pagination;
