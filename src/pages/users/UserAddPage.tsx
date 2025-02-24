import { useCallback, useEffect, useState } from "react";
import UserForm from "../../sections/users/UserForm";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import CustomBreadCrumbs from "../../components/CustomBreadCrumbs";
import { IUser } from "../../types/user";
import axios from "axios";

const UserAddPage = () => {
  const navigate = useNavigate();
  const id = 1;

  const [newUser, setNewUser] = useState<IUser | null>(null);

  const handleUserById = useCallback(async () => {
    try {
      const user = await axios.get(`https://reqres.in/api/users/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      setNewUser(user.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      const userById = await axios.put(`https://reqres.in/api/users/${id}`, {
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
    <>
      <CustomBreadCrumbs
        path="/users"
        pathName="Users"
        subPathName="Add User"
      />
      <UserForm onSubmit={handleSubmit} user={newUser} />
    </>
  );
};

export default UserAddPage;
