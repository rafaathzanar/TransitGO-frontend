import React, { useEffect, useState } from "react";
import axios from "axios";
import DelayItem from "../Delayitem/DelayItem";
import { useParams } from "react-router";
import { Grid } from "@mui/material";
import Button from "../../UI/Button/Button";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";

const DelayList = () => {
  const [delayList, setDelayList] = useState([]);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const email = localStorage.getItem("username");
  console.log(token, userRole, email);
  const Authorization = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDelays();
  }, []);

  const fetchDelays = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/announcements");

      setDelayList(response.data);
    } catch (error) {
      console.error("Error fetching delays:", error);
    }
    setLoading(false);
  };

  const deleteDelayHandler = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/announcement/${id}`,
        Authorization
      );
      setDelayList(delayList.filter((delay) => delay.id !== id));
    } catch (error) {
      console.error("Error deleting delay:", error);
    }
  };

  const editDelayHandler = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/announcement/${id}`,
        Authorization
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
      await axios.put(
        `http://localhost:8080/announcement/${id}`,
        {
          details: updatedDetails,
        },
        Authorization
      );
      setEditingAnnouncement(null);
      fetchDelays();
    } catch (error) {
      console.error("Error editing delay:", error);
    }
  };

  return (
    <>
    {loading && <LoadingComponent />}
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

      <ul className="goal-list">
        {delayList.map((delay) => (
          <div key={delay.id} className="itemspace">
            <DelayItem
              id={delay.id}
              username={delay.user}
              userRole={userRole}
              createdBy={delay.createdBy}
              createdByRole={delay.createdByRole}
              currentUser={email}
              onDelete={
                userRole === "admin" || delay.createdBy === email
                  ? deleteDelayHandler
                  : null
              }
              onEdit={delay.createdBy === email ? editDelayHandler : null}
            >
              {delay.details}
            </DelayItem>
          </div>
        ))}
      </ul>
    </Grid>
    </>
  );
};

export default DelayList;
