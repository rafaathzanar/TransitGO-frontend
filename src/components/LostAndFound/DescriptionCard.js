import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import AlertDialogBox from "../AlertDialogBox";

const DescriptionCard = ({
  id,
  Uname,
  numb,
  bus,
  desc,
  dateTime,
  onDelete,
  editLink,
}) => {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          background: "linear-gradient(#9fe8fc,#e1f6fc,#edf3f5 )",
          border: "1px solid #fa9dad",
          borderRadius: "10px",
          paddingLeft: "10px",
        }}
        style={{ width: "80%", margin: 20 }}
      >
        <CardContent>
          {Uname && (
            <Typography variant="body1">
              <strong>Name:</strong> {Uname}
            </Typography>
          )}
          {numb && (
            <Typography variant="body1">
              <strong>Contact Number:</strong> {numb}
            </Typography>
          )}
          {bus && (
            <Typography variant="body1">
              <strong>Bus Description:</strong> {bus}
            </Typography>
          )}
          {desc && (
            <Typography variant="body1">
              <strong>Item Description:</strong> {desc}
            </Typography>
          )}
          {dateTime && (
            <Typography variant="body2">
              <strong>Posted On:</strong> {new Date(dateTime).toLocaleString()}
            </Typography>
          )}
          {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
            <Link to={editLink}>
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton aria-label="delete" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </div> */}
          <AlertDialogBox
            open={dialogOpen}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DescriptionCard;
