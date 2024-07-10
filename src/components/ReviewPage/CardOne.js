import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CommentBox from "./CommentBox";
import FeedbackCards from "./FeedbackCards";
import Grid from "@mui/material/Grid";
import axios from "axios";
import {
  Typography,
  Box,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Pagination from "../../components/Pagination/Paginaton"; // adjust the path as per your actual file location

const CardOne = ({ busID }) => {
  const token = localStorage.getItem("token");
  const currentUser = localStorage.getItem("username");
  const [feedbacks, setFeedbacks] = useState([]);
  const [summary, setSummary] = useState({
    fiveStars: 0,
    fourStars: 0,
    threeStars: 0,
    twoStars: 0,
    oneStar: 0,
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5); // Adjust as needed
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/rates/${busID}`);

      const formattedFeedbacks = result.data.map((feedback) => ({
        ...feedback,
        rate: parseFloat(feedback.rate),
      }));

      const sortedFeedbacks = formattedFeedbacks.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const summary = {
        fiveStars: formattedFeedbacks.filter((fb) => fb.rate === 5).length,
        fourStars: formattedFeedbacks.filter((fb) => fb.rate === 4).length,
        threeStars: formattedFeedbacks.filter((fb) => fb.rate === 3).length,
        twoStars: formattedFeedbacks.filter((fb) => fb.rate === 2).length,
        oneStar: formattedFeedbacks.filter((fb) => fb.rate === 1).length,
        total: formattedFeedbacks.length,
      };

      setFeedbacks(sortedFeedbacks);
      setSummary(summary);
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  };

  const handleFeedbackSubmission = (feedback, isEdit = false) => {
    if (isEdit) {
      const updatedFeedbacks = feedbacks.map((fb) =>
        fb.id === feedback.id ? feedback : fb
      );
      setFeedbacks(updatedFeedbacks);
    } else {
      setFeedbacks([feedback, ...feedbacks]);
    }
  };
  

  const deleteReviews = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/rate/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const getPercentage = (count) => {
    return summary.total ? (count / summary.total) * 100 : 0;
  };

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = feedbacks.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <CardContent
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                width: "100%",
                maxWidth: "1000px",
              }}
            >
              <CommentBox onSubmit={handleFeedbackSubmission} busId={busID} />
            </CardContent>
          </Box>
          <Box display="flex" justifyContent="center" margin="20px 0">
            <Button variant="contained" onClick={handleOpenDialog}>
              Click Here to Ratings Summary
            </Button>
          </Box>
          <div className="feedbackCards">
            {currentReviews.map((feedback) => (
              <FeedbackCards
                key={feedback.id}
                id={feedback.id}
                username={feedback.username}
                profile={feedback.profile}
                rate={feedback.rate}
                review={feedback.review}
                createdAt={feedback.createdAt}
                onDelete={deleteReviews}
                currentUser={currentUser}
                onEdit={loadReviews} // Pass the loadReviews function to refresh data
              />
            ))}

            {/* Pagination component */}
            <Pagination
              totalPages={Math.ceil(feedbacks.length / reviewsPerPage)}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </Grid>
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Bus Ratings Summary</DialogTitle>
        <DialogContent>
          <CardContent>
            <Typography variant="h6">BusID: {busID}</Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { label: "5 Stars", count: summary.fiveStars },
                { label: "4 Stars", count: summary.fourStars },
                { label: "3 Stars", count: summary.threeStars },
                { label: "2 Stars", count: summary.twoStars },
                { label: "1 Stars", count: summary.oneStar },
              ].map(({ label, count }) => (
                <Box key={label} sx={{ mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <StarIcon sx={{ color: "gold" }} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {label}: ({count})
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getPercentage(count)}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CardOne;
