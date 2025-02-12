/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// type Brand = {
//   title: string;
// };

// const Example = () => {
//   const [response, setResponse] = useState();
//   const navigate = useNavigate();
//   const CREATEBRAND = `
//     mutation createBrand($input: BrandInput!) {
//       createBrand(input: $input) {
//         active
//         title
//       }
//     }`;

//   const handleBrand = async (data: Brand) => {
//     try {
//       const res = await axios({
//         url: "https://test-api.nine.deals/graphql",
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             "Bearer" +
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkwOTg3MjEsImV4cCI6MTc0MTY5MDcyMX0.MUenpGFfQwaDy7Ub9abrrByvcA4XDtxGWb7jP4BSrrY",
//         },
//         data: {
//           query: CREATEBRAND,
//           variables: { input: { title: data.title } },
//         },
//       });
//       const result = res.data;
//       if (result.errors) {
//         console.log("error");
//       } else {
//         setResponse(result.data.createBrand);
//         console.log(response);
//         toast.success("Brand added successfully");
//         navigate("/");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return <div></div>;
// };

// export default Example;

import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

type Brand = {
  title: string;
  active: boolean;
};

const Example = () => {
  const [title, setTitle] = useState("");
  const [response, setResponse] = useState<Brand | null>(null);
  const navigate = useNavigate();

  const handleBrand = async () => {
    const AUTH_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkxNjQ3ODMsImV4cCI6MTc0MTc1Njc4M30.w3Noq69dqXl3t2sbAfNDueQFr7IT85lXh0ln4LVM6TY";

    try {
      const res = await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: `
            mutation createBrand($input:CreateBrandDto!) {
              createBrand(input: $input) {
                title
                active
              }
            }
          `,
          variables: {
            input: {
              title: `${title}`,
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + AUTH_TOKEN,
          },
        }
      );

      console.log("Token", AUTH_TOKEN);
      setResponse(res.data.data.createBrand);
      toast.success("Brand added successfully");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <Box sx={{ p: 5, m: 2 }}>
      <Card sx={{ p: 5, m: 2 }}>
        <Typography variant="h6">Add Brand</Typography>
        <TextField
          label="Title"
          margin="normal"
          fullWidth
          value={title}
          onChange={handleTitleChange}
        />
        <Button variant="contained" onClick={handleBrand}>
          Add Brand
        </Button>
      </Card>

      {response && (
        <Card sx={{ p: 5, m: 2 }}>
          <Typography variant="h6">Newly Created Brand</Typography>
          <Typography variant="body1">Title: {response.title}</Typography>
          <Typography variant="body1">
            Active: {response ? "Yes" : "No"}
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default Example;
