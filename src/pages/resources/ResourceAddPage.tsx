import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import CustomBreadCrumbs from "../../components/CustomBreadCrumbs";

import axios from "axios";
import { Box } from "@mui/material";
import ResourceForm from "../../sections/resources/ResourceForm";
import { IResource } from "../../types/resource";

const ResourceAddPage = () => {
  const navigate = useNavigate();

  const [newResource, setNewResource] = useState<IResource | null>(null);

  const handleSubmit = async () => {
    try {
      const resourceById = await axios.put(
        `https://reqres.in/api/{resource}/{id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setNewResource(newResource);
      toast.success(`Updated At ${resourceById.data.updatedAt}`);
      navigate("/resources");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ ml: 7, mr: 7 }}>
      <CustomBreadCrumbs
        path="/resources"
        pathName="Resources"
        subPathName="Add Resource"
      />
      <ResourceForm onSubmit={handleSubmit} resource={newResource} />
    </Box>
  );
};

export default ResourceAddPage;
