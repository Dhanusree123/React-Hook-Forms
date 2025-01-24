import { Container, Typography } from "@mui/material";
import MyEditor from "@/component/Editor";

const Home = () => {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        My Rich Text Editor
      </Typography>
      <MyEditor />
    </Container>
  );
};

export default Home;
