import { Select, MenuItem, Typography, SelectChangeEvent } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

type SortByProps = {
  sortBy: string;
  handleSortChange: (event: SelectChangeEvent) => void;
};

const SortBy = ({ sortBy, handleSortChange }: SortByProps) => {
  const navigate = useNavigate();

  const { search, categories } = useParams<{
    search?: string;
    categories?: string;
  }>();

  const updateUrl = (sort: string) => {
    let queryString = `?sort=${sort}`;
    if (search) {
      queryString += `&search=${search}`;
    }
    if (categories) {
      queryString += `&categories=${categories}`;
    }
    navigate(queryString || "/");
  };

  const handleSort = (event: SelectChangeEvent) => {
    handleSortChange(event);
    updateUrl(event.target.value);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Sort By
      </Typography>
      <Select
        value={sortBy}
        onChange={handleSort}
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
