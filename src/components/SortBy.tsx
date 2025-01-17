import { Select, MenuItem, Typography, SelectChangeEvent } from "@mui/material";

type SortByProps = {
  sortBy: string;
  handleSortChange: (event: SelectChangeEvent) => void;
};

const SortBy = ({ sortBy, handleSortChange }: SortByProps) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Sort By
      </Typography>
      <Select
        value={sortBy}
        onChange={handleSortChange}
        displayEmpty
        inputProps={{ "aria-label": "Sort By" }}
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

export default SortBy;
