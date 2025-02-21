import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { CommonSlideProps } from "../../../types/Product";
import { useState } from "react";
import { z } from "zod";

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onSubmit: (imageUrl: string) => void;
  selectedImage?: CommonSlideProps | null;
};

const AddImageDialog = ({ open, onClose, selectedImage, onSubmit }: Props) => {
  const [imageUrl, setImageUrl] = useState(selectedImage?.thumbnailUrl || "");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setImageUrl(value);
    setError("");
  };

  const handleSubmit = () => {
    const isValid = z.string().url().safeParse(imageUrl).success;
    if (!isValid) {
      setError("Invalid URL");
      return;
    }
    setError("");
    onSubmit(imageUrl);
  };

  return (
    <Dialog fullWidth open={open}>
      <DialogTitle>Add Image</DialogTitle>
      <DialogContent>
        <Stack spacing={1} sx={{ pt: 1 }}>
          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={handleChange}
            helperText={error ?? ""}
            error={Boolean(error)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddImageDialog;
