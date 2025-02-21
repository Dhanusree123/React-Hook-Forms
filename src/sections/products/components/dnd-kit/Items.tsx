import { Container, Box } from "@mui/material";
import UseDroppable from "./useDroppable";
import { useState } from "react";

const Items = () => {
  const [items, setItems] = useState<string[]>(["1", "2", "3"]);
  return (
    <Container>
      <Box>
        <UseDroppable items={items} setItems={setItems} />
      </Box>
    </Container>
  );
};

export default Items;
