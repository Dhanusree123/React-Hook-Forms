import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResourceForm from "./resource-form";
import CustomBreadCrumbs from "../../components/custom-bread-crumbs/CustomBreadCrumbs";

const AddResourcePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="md">
        <CustomBreadCrumbs
          path="/resources"
          pathName="Resources"
          subPathName="Add resource"
        />
        <ResourceForm onSuccess={() => navigate("/resources")} />
      </Container>
    </Box>
  );
};

export default AddResourcePage;
