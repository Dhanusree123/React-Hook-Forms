import { Stack, Typography } from "@mui/material";
import CardComponent from "./CardComponent";

// type Employee = {
//     name:string,
//     place:string,
//     address:{
//         mandal:string,
//         pincode:number
//     }
// }
const DETAILS = [
  {
    name: "Sai",
    place: "Hyderabad",
    address: {
      mandal: "XYZ",
      pincode: 123456,
    },
  },
  {
    name: "Yogi",
    place: "Banglore",
    address: {
      mandal: "ABC",
      pincode: 985679,
    },
  },
  {
    name: "Tony",
    place: "Kolkata",
    address: {
      mandal: "PQR",
      pincode: 769878,
    },
  },
  {
    name: "Tom",
    place: "New Delhi",
    address: {
      mandal: "MNO",
      pincode: 903456,
    },
  },
];
const ContainerBox = () => {
  return (
    <>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Employee Details
      </Typography>

      <Stack direction="column" spacing={3}>
        {DETAILS.map((detail) => (
          <CardComponent
            key={detail.name}
            name={detail.name}
            place={detail.place}
            address={detail.address}
          />
        ))}
      </Stack>
    </>
  );
};

export default ContainerBox;
