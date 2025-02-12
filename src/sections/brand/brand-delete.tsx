/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
type DeleteBrandProps = {
  id: string;
  onDeleteSuccess: () => void;
};

import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
export const BrandDelete = ({ id, onDeleteSuccess }: DeleteBrandProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      const AUTH_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkxNjQ3ODMsImV4cCI6MTc0MTc1Njc4M30.w3Noq69dqXl3t2sbAfNDueQFr7IT85lXh0ln4LVM6TY";
      const response = await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: `
                mutation deleteBrand($id:String!){
                deleteBrand(id:$id){
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
      <IconButton>
        <DeleteIcon onClick={handleOpen} />
      </IconButton>
      {
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this brand? This action cannot be
              undone
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      }
    </>
  );
};

export default BrandDelete;
