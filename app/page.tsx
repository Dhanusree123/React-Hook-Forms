import { Box, Divider, Typography } from "@mui/material";
import Link from "next/link";

const Home = () => {
  return (
    <Box sx={{ margin: 20 }}>
      <Typography variant="h3">Welcome to ApexCharts</Typography>
      <Link href="/linechart/basic">Click for LineChart (Basic)</Link>
      <Divider />
      <Link href="/linechart/stepline">Click for LineChart (Stepline) </Link>
      <Divider />
      <Link href="/barchart">Click for BarChart </Link>
      <Divider />
      <Link href="/areachart">Click for AreaChart </Link>
      <Divider />
      <Link href="/piechart">Pie Chart</Link>
    </Box>
  );
};
export default Home;
