import React, { useEffect, useState } from "react";
import axios from "axios";
import DelayItem from "../Delayitem/DelayItem";
import { useParams } from "react-router";
import { Grid } from "@mui/material";
import Button from "../../UI/Button/Button";

const DelayList = () => {
  const [delayList, setDelayList] = useState([]);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchDelays();
  }, []);

  const fetchDelays = async () => {
    try {
      const response = await axios.get("http://localhost:8080/announcements");
      setDelayList(response.data);
    } catch (error) {
      console.error("Error fetching delays:", error);
    }
  };

  const deleteDelayHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/announcement/${id}`);
      setDelayList(delayList.filter((delay) => delay.id !== id));
    } catch (error) {
      console.error("Error deleting delay:", error);
    }
  };

  const editDelayHandler = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/announcement/${id}`
      );
      const existingDetails = response.data.details;
      setEditingAnnouncement({ id, details: existingDetails });
    } catch (error) {
      console.error("Error fetching existing details for editing:", error);
    }
  };

  const cancelEditHandler = () => {
    setEditingAnnouncement(null);
  };

  const submitEditHandler = async (id, updatedDetails) => {
    try {
      await axios.put(`http://localhost:8080/announcement/${id}`, {
        details: updatedDetails,
      });
      setEditingAnnouncement(null);
      fetchDelays();
    } catch (error) {
      console.error("Error editing delay:", error);
    }
  };

  return (
    <Grid item xs={10}>
      {editingAnnouncement && (
        <div className="form-control">
          <textarea
            value={editingAnnouncement.details}
            onChange={(e) =>
              setEditingAnnouncement({
                ...editingAnnouncement,
                details: e.target.value,
              })
            }
          />

          <div
            style={{
              paddingTop: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginLeft: "5px" }}>
              <Button onClick={cancelEditHandler}>Cancel</Button>
            </div>
            <div>
              <Button
                onClick={() =>
                  submitEditHandler(
                    editingAnnouncement.id,
                    editingAnnouncement.details
                  )
                }
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      <ul className="goal-listxs">
        {delayList.map((delay) => (
          <DelayItem
            key={delay.id}
            id={delay.id}
            onDelete={deleteDelayHandler}
            onEdit={editDelayHandler}
          >
            {delay.details}
          </DelayItem>
        ))}
      </ul>
    </Grid>
  );
};

export default DelayList;
