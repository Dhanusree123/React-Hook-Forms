import { useCallback, useEffect, useState } from "react";
import UserForm from "../../sections/users/UserForm";
import { IUser } from "../../types/user";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import CustomBreadCrumbs from "../../components/CustomBreadCrumbs";
import { Box } from "@mui/material";

const UserEditPage = () => {
  const { id } = useParams();
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
      const userById = await axios.patch(`https://reqres.in/api/users/${id}`, {
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
        subPathName="Edit User"
      />
      <UserForm isEdit onSubmit={handleSubmit} user={user} />
    </Box>
  );
};

export default UserEditPage;
