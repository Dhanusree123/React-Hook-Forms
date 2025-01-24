import { Box, Divider, Typography } from "@mui/material";
import Link from "next/link";

const Home = () => {
  return (
    <Box sx={{ margin: 20 }}>
      <Typography variant="h3">Welcome to ApexCharts</Typography>
      <Link href="/line-chart/basic">Click for LineChart (Basic)</Link>
      <Divider />
      <Link href="/line-chart/step-line">Click for LineChart (Stepline) </Link>
      <Divider />
      <Link href="/bar-chart">Click for BarChart </Link>
      <Divider />
      <Link href="/area-chart">Click for AreaChart </Link>
      <Divider />
      <Link href="/area-chart/spinline">Area Spinline</Link>
      <Divider />
      <Link href="/pie-chart">Pie Chart</Link>
    </Box>
  );
};
export default Home;
