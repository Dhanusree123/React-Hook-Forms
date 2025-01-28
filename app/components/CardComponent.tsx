import { Card, Typography } from "@mui/material";
import AddressCard from "./AddressCard";

type EmployeeProps = {
  name: string;
  place: string;
  address: {
    mandal: string;
    pincode: number;
  };
};

const CardComponent = ({ name, place, address }: EmployeeProps) => {
  return (
    <>
      <Card sx={{ p: 4 }}>
        <Typography>Employee name:{name}</Typography>
        <Typography>Employee Place:{place}</Typography>
        <AddressCard mandal={address.mandal} pincode={address.pincode} />
      </Card>
    </>
  );
};

export default CardComponent;
