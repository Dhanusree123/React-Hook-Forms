import ChartData from "@/Components/ChartData";
import { Grid2 } from "@mui/material";

export default function Home() {
  return (
    <Grid2 container>
      <ChartData
        label="Step Line Chart"
        chartid="base-line"
        charttype="line"
        chartcurve="stepline"
      />
    </Grid2>
  );
}
