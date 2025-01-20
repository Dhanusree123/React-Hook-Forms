import { Select, MenuItem, Typography, SelectChangeEvent } from "@mui/material";

type SortByProps = {
  sortPrice: string;
  handleSortChange: (event: SelectChangeEvent) => void;
};

const Sorting = ({ sortPrice, handleSortChange }: SortByProps) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Sort By
      </Typography>
      <Select
        value={sortPrice}
        onChange={handleSortChange}
        displayEmpty
        inputProps={{ "aria-label": "Sort" }}
      >
        <MenuItem value="">
          <em>Relevance</em>
        </MenuItem>
        <MenuItem value="price-asc">Price: Low to High</MenuItem>
        <MenuItem value="price-desc">Price: High to Low</MenuItem>
      </Select>
    </div>
  );
};

export default Sorting;
