import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import AlertDialogBox from "../AlertDialogBox";

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

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const FeedbackCards = ({ id, username, profile, rate, review, createdAt, onDelete }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setDialogOpen(false);
  };

  return (
    <Card
      sx={{
        border: 1,
        borderRadius: "0px",
        borderColor: "#f2a2a2",
        margin: "5px",
        position: 'relative',
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          position: 'relative',
        }}
      >
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          {createdAt ? new Date(createdAt).toLocaleString() : "Unknown date"}
        </Typography>
        <Typography variant="h3">{username}</Typography>

        <img src={profile} alt={username} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Rating
            name="read-only"
            size="large"
            value={parseFloat(rate)}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </Box>
        <Typography variant="body1">{review}</Typography>
        

        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          <Link to={`/reviews/${id}`}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>

          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </div>

        <AlertDialogBox 
          open={dialogOpen} 
          onClose={handleCloseDialog} 
          onConfirm={handleConfirmDelete} 
        />
      </CardContent>
    </Card>
  );
};

export default FeedbackCards;


