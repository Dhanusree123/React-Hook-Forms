import { Divider, Stack } from "@mui/material";
import Link from "next/link";

export const Navigation = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Link href="/linechart">Line Chart</Link>
      <Divider orientation="vertical" />
      <Link href="/steplinechart">Step Line Chart</Link>
      <Divider orientation="vertical" />
      <Link href="/barchart">Bar Chart</Link>
      <Divider orientation="vertical" />
      <Link href="/areachart">Area Chart</Link>
      <Divider orientation="vertical" />
      <Link href="/piechart">Pie Chart</Link>
    </Stack>
  );
};
