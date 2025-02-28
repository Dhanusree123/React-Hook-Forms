import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface Option {
  label: string;
}

const options: Option[] = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];

function AutocompleteExample() {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option: Option) => option.label}
      renderInput={(params) => (
        <TextField {...params} label="Type something" variant="outlined" />
      )}
      filterOptions={(options, state) =>
        options.filter((option) =>
          option.label.toLowerCase().includes(state.inputValue.toLowerCase())
        )
      }
      openOnFocus={false}
    />
  );
}

export default AutocompleteExample;
