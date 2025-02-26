import { Box, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ResourceForm from "./resource-form";
import CustomBreadCrumbs from "../../components/custom-bread-crumbs/CustomBreadCrumbs";

const EditResource = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="sm">
        <CustomBreadCrumbs
          path="/resources"
          pathName="Resources"
          subPathName="Edit resource"
        />
        <ResourceForm Id={id} onSuccess={() => navigate("/resources")} />
      </Container>
    </Box>
  );
};

export default EditResource;
