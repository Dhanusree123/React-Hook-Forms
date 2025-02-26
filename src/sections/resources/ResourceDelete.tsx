import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  id: number;
};
export const ResourceDelete = (props: Props) => {
  const { id } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      await axios.get(`https://reqres.in/api/{resource}/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      console.log("deleted");
      toast.success("Resource deleted successfully");
      setOpen(false);
    } catch (err) {
      toast.error("Failed to delete");
      console.log(err);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Delete />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Resource?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
