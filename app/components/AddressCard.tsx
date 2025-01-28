import { Box, Typography } from "@mui/material";

type ADDRESS = {
  mandal: string;
  pincode: number;
};

import { EmployeeContext } from "../page";

const AddressCard = ({ mandal, pincode }: ADDRESS) => {
  return (
    <>
      <Typography>Mandal: {mandal}</Typography>
      <Typography>Pincode: {pincode}</Typography>
      <EmployeeContext.Consumer>
        {(value) => <Box>Company Id:{value}</Box>}
      </EmployeeContext.Consumer>
    </>
  );
};

export default AddressCard;
