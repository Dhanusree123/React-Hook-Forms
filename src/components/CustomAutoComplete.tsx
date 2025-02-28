import { Autocomplete, Box, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Graphql } from "../graphql/Find/Graphql";
import { FieldError } from "react-hook-form";
import useDebounce from "./UseDebounce";
import { toast } from "sonner";
import { FindStores } from "../graphql/Find/FindStores";

export type IAutocompleteFields = {
  id: string;
  title: string;
  active: boolean;
  path?: string;
};

type Label = "Brand" | "Store";

type Props<T> = {
  error: FieldError | undefined;
  selectedFilter: T | null;
  handleSelectedFilter: (value: T) => void;
  disabled?: boolean;
  label: Label | string;
};

const getQueryVariables = (label: Label | string) => {
  switch (label) {
    case "Brand":
      return {
        linkType: "brands",
        queryName: "findBrands",
        fetchData: Graphql,
      };
    case "Store":
      return {
        linkType: "stores",
        queryName: "findStores",
        fetchData: FindStores,
      };
    default:
      return {
        linkType: "",
        queryName: "",
        fetchData: () => Promise.resolve({ brands: [] }),
      };
  }
};

const CustomAutocomplete = <T extends IAutocompleteFields>(props: Props<T>) => {
  const {
    error,
    selectedFilter,
    handleSelectedFilter,
    disabled = false,
    label,
  } = props;

  const [options, setOptions] = useState<T[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm);

  const { fetchData, linkType } = getQueryVariables(label) || {};

  const handleAutoCompleteOnChange = (newValue: T) => {
    handleSelectedFilter(newValue);
    if (newValue && !newValue?.active) {
      toast.error(`${label} is inactive. Please make it active.`);
    }
    setOpen(false);
    if (!newValue) {
      setOptions([]);
    }
  };

  const handleTextFieldOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    if (!value) {
      setIsLoading(false);
      setOpen(false);
    } else {
      setIsLoading(true);
      setOpen(true);
    }
    setOptions([]);
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const fetch = useCallback(async () => {
    if (debouncedSearchTerm && fetchData) {
      setIsLoading(true);
      try {
        const data = await fetchData(0, 10, { title: debouncedSearchTerm });
        if (label === "Brand") {
          setOptions(data.brands || []);
        } else if (label === "Store") {
          setOptions(data.stores || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [debouncedSearchTerm, fetchData, label]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (selectedFilter) {
      setOptions([selectedFilter]);
    }
  }, [selectedFilter]);
  return (
    <Box sx={{ position: "relative" }}>
      <Autocomplete
        options={options}
        value={selectedFilter}
        open={open}
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_event, newValue) =>
          handleAutoCompleteOnChange(newValue as T)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder="Type to search..."
            error={!!error}
            onFocus={handleOnFocus}
            onBlur={() => setOpen(false)}
            onChange={handleTextFieldOnChange}
            helperText={error ? error.message : ""}
          />
        )}
        loading={isLoading}
        noOptionsText={`No ${linkType} found...`}
        clearOnBlur={false}
        disabled={disabled}
      />
    </Box>
  );
};

export default CustomAutocomplete;
