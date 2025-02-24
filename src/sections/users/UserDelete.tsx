import axios from "axios";
import { toast } from "sonner";

type Props = {
  id: string;
};
export const UserDelete = async (props: Props) => {
  const { id } = props;
  try {
    await axios.get(`https://reqres.in/api/users/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    console.log("deleted");
    toast.success("User deleted successfully");
  } catch (err) {
    console.log(err);
  }
};
