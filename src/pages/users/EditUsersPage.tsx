import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAxios from "../../components/custom-axios/useAxios";
import { User } from "../../types/Users";
import Details from "../../sections/users/user-details";

const EditUsersPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { response, error, loading, fetchData } = useAxios();
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const token = localStorage.getItem("token");

  const fetchUser = () => {
    fetchData({
      url: `/users/${id}`,
      method: "GET",
    });
  };

  const handleSubmit = () => {
    fetchData({
      url: `/users/${id}`,
      method: "PUT",
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
      },
    }).then(() => {
      console.log("Updated user:", {
        id,
        first_name: firstName,
        last_name: lastName,
        email,
      });
    });
    toast.success("Successfully updated");
    navigate("/users");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (response) {
      const usersResponse = response as { data: User };
      const user = usersResponse.data;
      setUser(user);
      console.log("userResponse", user);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
  }, [response]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <>
      <Details
        loading={loading}
        error={error}
        user={user}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default EditUsersPage;
