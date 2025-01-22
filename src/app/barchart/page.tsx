import ChartData from "@/Components/ChartData";
import { Grid2 } from "@mui/material";

export default function Home() {
  return (
    <Grid2 container>
      <ChartData
        label="Bar Chart"
        chartid="bar"
        charttype="bar"
        horizontal={true}
      />
    </Grid2>
  );
}
