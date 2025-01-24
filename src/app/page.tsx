import { Container } from "@mui/material";
import Link from "next/link";

const Home = () => {
  return (
    <Container>
      <Link href="/editor">Show Editor</Link>
    </Container>
  );
};

export default Home;
