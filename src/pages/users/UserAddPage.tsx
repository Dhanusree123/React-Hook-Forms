import { useState } from "react";
import UserForm from "../../sections/users/UserForm";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import CustomBreadCrumbs from "../../components/CustomBreadCrumbs";
import { IUser } from "../../types/user";
import axios from "axios";
import { Box } from "@mui/material";

const UserAddPage = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState<IUser | null>(null);

  const handleSubmit = async () => {
    try {
      const userById = await axios.put(`https://reqres.in/api/users/{id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      setNewUser(newUser);
      toast.success(`Updated At ${userById.data.updatedAt}`);
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ ml: 7, mr: 7 }}>
      <CustomBreadCrumbs
        path="/users"
        pathName="Users"
        subPathName="Add User"
      />
      <UserForm onSubmit={handleSubmit} user={newUser} />
    </Box>
  );
};

export default UserAddPage;
