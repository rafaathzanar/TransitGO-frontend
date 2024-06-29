import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import AlertDialogBox from "../AlertDialogBox";
import EditCommentBox from "./EditCommentBox";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const email = localStorage.getItem('username');

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const FeedbackCards = ({
  id,
  username,
  profile,
  rate,
  review,
  createdAt,
  currentUser,
  onDelete,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setDialogOpen(false);
  };

  return (
    <Card
      sx={{
        border: 1,
        borderRadius: "8px",
        borderColor: "#f2a2a2",
        margin: "5px",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          sx={{ fontSize: "0.8rem", color: "#0B183C", fontWeight: "bold" }}
        >
          {username}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating
            name="text-feedback"
            value={rate}
            readOnly
            precision={0.5}
            getLabelText={getLabelText}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          sx={{ fontSize: "1.1rem", paddingTop: "10px" }}
        >
          {review}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            fontSize: "0.7rem",
            padding: "10px",
            color: "#0B183C",
          }}
        >
          {createdAt}
        </Typography>
        {username === email && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            mt: 1,
          }}
        >
          
          <Link to={`/reviewsedit/${id}`}>
            <IconButton size="small" color="#0B183C">
              <EditIcon fontSize="small" color="#0B183C" />
            </IconButton>
          </Link>
            <IconButton onClick={handleDeleteClick} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </CardContent>
      <AlertDialogBox
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />

      <Dialog
        open={editDialogOpen}
        onClose={handleEditClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Review & Ratings</DialogTitle>
        <DialogContent>
          <EditCommentBox id={id} onClose={handleEditClose} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default FeedbackCards;
