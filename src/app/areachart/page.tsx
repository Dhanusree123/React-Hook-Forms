import ChartData from "@/Components/ChartData";
import { Grid2 } from "@mui/material";

export default function Home() {
  return (
    <Grid2 container>
      <ChartData
        label="Area Chart"
        chartid="base-area"
        charttype="area"
        chartcurve="straight"
      />
    </Grid2>
  );
}
