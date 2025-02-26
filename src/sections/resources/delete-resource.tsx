import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteById } from "../../components/api/api";

type Props = {
  id: string;
};

export const DeleteResource = (props: Props) => {
  const { id } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    DeleteById("resource", id);
    toast.success("User deleted successfully");
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen} color="error">
        <Delete />
      </IconButton>
      {
        <Box>
          <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this User!!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={handleClose}>
                Cancel
              </Button>
              <Button color="error" onClick={handleDelete}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      }
    </>
  );
};
