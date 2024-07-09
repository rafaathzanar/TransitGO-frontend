import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../../UI/Button/Button";

import "./DelayItem.css";

const DelayItem = (props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = () => {
    setOpen(true);
  };

  const confirmDeleteHandler = () => {
    props.onDelete(props.id);
    handleClose();
  };

  const editHandler = () => {
    props.onEdit(props.id);
  };

  console.log("props.createdBy:", props.createdBy);
  console.log("props.currentUser:", props.currentUser);
  console.log("props.userRole:", props.userRole);
  console.log("props.createdByRole:", props.createdByRole);

  const isAdmin = props.createdByRole === "admin";

  return (
    <table className="tab">
      <td
        className={`goal-item ${
          props.createdByRole === "admin" ? "admin-post" : "user-post"
        }`}
      >
        {props.children}
        <div className="containerdelay">
          <div className="deleteicon">
            {props.onEdit && <EditIcon onClick={editHandler}></EditIcon>}
            {props.onDelete && (
              <DeleteIcon onClick={deleteHandler}></DeleteIcon>
            )}
          </div>
          <div
            className={`authordelay ${
              props.createdByRole === "admin" ? "admin-post" : "user-post"
            }`}
          >
            <div>Posted by : {props.username} </div>
          </div>
        </div>
      </td>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this announcement?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmDeleteHandler} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </table>
  );
};

export default DelayItem;
