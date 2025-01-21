import { Typography } from "@mui/material";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <Typography variant="h2">WELCOME TO HOME PAGE</Typography>
      <Link href="/productaddform">Go To Products Page</Link>
    </>
  );
};

export default HomePage;
