import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import CustomBreadCrumbs from "../../components/CustomBreadCrumbs";
import { Box } from "@mui/material";
import ResourceForm from "../../sections/resources/ResourceForm";
import { IResource } from "../../types/resource";

const ResourceEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState<IResource | null>(null);

  const handleResourceById = useCallback(async () => {
    try {
      const resource = await axios.get(
        `https://reqres.in/api/{resource}/${id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setResource(resource.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      const userById = await axios.patch(`https://reqres.in/api/users/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      toast.success(`Updated At ${userById.data.updatedAt}`);
      navigate("/resources");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleResourceById();
  }, [handleResourceById]);

  return (
    <Box sx={{ ml: 7, mr: 7 }}>
      <CustomBreadCrumbs
        path="/resources"
        pathName="Resources"
        subPathName="Edit Resource"
      />
      <ResourceForm isEdit onSubmit={handleSubmit} resource={resource} />
    </Box>
  );
};

export default ResourceEditPage;
