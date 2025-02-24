import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "../types/user";
import UserForm from "../sections/users/UserForm";
import { toast } from "sonner";
import CustomBreadCrumbs from "../components/CustomBreadCrumbs";
import { Box } from "@mui/material";

const ProfilePage = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const handleUserById = useCallback(async () => {
    try {
      const user = await axios.get(`https://reqres.in/api/users/5`, {
        headers: {
          Accept: "application/json",
        },
      });
      setUser(user.data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = () => {
    toast.success("Profile updated Successfully");
  };
  useEffect(() => {
    handleUserById();
  }, [handleUserById]);

  console.log(user);
  return (
    <Box sx={{ ml: 9, mr: 9 }}>
      <CustomBreadCrumbs pathName="User Profile" />
      <UserForm onSubmit={handleSubmit} user={user} />
    </Box>
  );
};

export default ProfilePage;
