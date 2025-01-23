import { Typography } from "@mui/material";
import Link from "next/link";

const Home = () => {
  return (
    <Link href="/editor">
      <Typography variant="h2">Go To Editor</Typography>
    </Link>
  );
};
export default Home;
