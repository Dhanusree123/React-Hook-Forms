/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";

const AutoCompleteCom = () => {
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const countriesData = response.data;
        setCountries(countriesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <Box sx={{ margin: 5 }}>
      <Autocomplete
        options={countries}
        getOptionLabel={(option) => option.website}
        onChange={(event, value) => console.log(value)}
        renderInput={(params) => (
          <TextField {...params} variant="standard" placeholder="Countries" />
        )}
      />
    </Box>
  );
};

export default AutoCompleteCom;
