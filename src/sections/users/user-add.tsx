import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Box } from "@mui/material";
import CustomBreadCrumbs from "../../components/custom-bread-crumbs/CustomBreadCrumbs";
import { IUser } from "../../types/Users";
import UserForm from "./users-form";

const UserAddPage = () => {
  const id = 9;
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);

  const handleUserById = useCallback(async () => {
    try {
      const user = await axios.get(`https://reqres.in/api/users/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      setUser(user.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      const userById = await axios.put(`https://reqres.in/api/users`, {
        headers: {
          Accept: "application/json",
        },
      });
      toast.success(`Updated At ${userById.data.updatedAt}`);
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleUserById();
  }, [handleUserById]);

  return (
    <Box sx={{ ml: 7, mr: 7 }}>
      <CustomBreadCrumbs
        path="/users"
        pathName="Users"
        subPathName="Add User"
      />
      <UserForm onSubmit={handleSubmit} user={user} />
    </Box>
  );
};

export default UserAddPage;
