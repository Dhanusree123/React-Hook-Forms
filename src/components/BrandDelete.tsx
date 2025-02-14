/* eslint-disable @typescript-eslint/no-explicit-any */
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
import axios from "axios";
import { DeleteBrandProps } from "../type/Schema";
import { Icon } from "@iconify/react";

export const BrandDelete = ({ id, onDeleteSuccess }: DeleteBrandProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      const AUTH_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkyNTAwMjAsImV4cCI6MTc0MTg0MjAyMH0.5FIeB-q3wjBsQYSsfLXslLhj2klKzIRaClEw0CjMts8";

      await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: `
                  mutation deleteBrand($id:String!){
                  deleteBrand(id:$id){
                      statusCode
                      message
                  }
              }
          `,
          variables: { id },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );
      toast.success("Brand deleted Successfully");
      handleClose();
      onDeleteSuccess();
    } catch (err: any) {
      toast.error("Error in deleteing Brand", err);
    }
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpen} color="error">
        <Icon icon="eva:trash-2-outline" />
      </IconButton>
      {
        <Box>
          <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this brand? This action cannot
                be undone.
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

export default BrandDelete;
