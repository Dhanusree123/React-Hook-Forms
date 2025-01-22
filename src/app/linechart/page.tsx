import ChartData from "@/Components/ChartData";
import { Grid2 } from "@mui/material";

export default function Home() {
  return (
    <Grid2 container>
      <ChartData
        label="Line Chart"
        chartid="base-line"
        charttype="line"
        chartcurve="straight"
      />
    </Grid2>
  );
}
