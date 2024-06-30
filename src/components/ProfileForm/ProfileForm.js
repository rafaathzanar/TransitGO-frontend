import "./ProfileForm.css";
import CommonButtonEdit from "../CommonButton/CommonButton";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Nav } from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../UI/Button/Button";

function ProfileForm({ profileInfo, setProfileInfo }) {
  const Navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const role = localStorage.getItem("userRole");
  const isPassenger = role === "passenger";
  const { fname, lname, email, uname, id } = profileInfo;
  const [editData, setEditData] = useState({
    fname: "",
    lname: "",
    uname: "",
  });

  const [Open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

  //to handle edit button click
  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
    setEditData({
      fname: profileInfo.fname,
      lname: profileInfo.lname,
      uname: profileInfo.uname,
    });
  };

  //to handle new input changes
  const onEditInput = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  //to save updated values
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/admin-user/update/${profileInfo.id}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDialogTitle("Saved");
      setDialogContent("Changes Saved");
      setOpen(true);

      console.log(response.data);

      setProfileInfo(response.data);
      setIsEditing(false);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  //to load profile details
  const getProfileInfo = async (e) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      //const userInfo = response.data.user;
      setProfileInfo({
        fname: response.data.fname,
        lname: response.data.lname,
        email: response.data.email,
        uname: response.data.uname,
        id: response.data.id,
      });
    } catch (error) {
      console.log("Error Fetching user information : ", error);
    }
  };

  const handlePasswordVerification = () => {
    Navigate("/PasswordVerification");
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div className="profileform">
      <div className="form">
        <form onSubmit={handleSave}>
          <div class="input name">
            <div className="fn">
              <label htmlFor="firstname" class="form-label">
                First Name
              </label>
              <input
                type="text"
                class="form-control"
                value={isEditing ? editData.fname : profileInfo.fname}
                name="fname"
                disabled={!isEditing}
                onChange={onEditInput}
              />
            </div>
            <div className="ln">
              <label htmlFor="lasttname" class="form-label">
                Last Name
              </label>
              <input
                type="text"
                class="form-control"
                value={isEditing ? editData.lname : profileInfo.lname}
                name="lname"
                disabled={!isEditing}
                onChange={onEditInput}
              />
            </div>
          </div>
          <div class="input">
            <label htmlFor="email" class="form-label">
              E-mail
            </label>
            <input
              type="email"
              class="form-control"
              value={profileInfo.email}
              disabled
            />
          </div>
          <div class="input">
            <label htmlFor="username" class="form-label">
              User Name
            </label>
            <input
              type="text"
              class="form-control"
              value={isEditing ? editData.uname : profileInfo.uname}
              name="uname"
              disabled={!isEditing}
              onChange={onEditInput}
            />
          </div>
          <div className="other-option">
            <div className="option">
              <Link to="/forgotpassword">Change Password</Link>
            </div>
          </div>
          <div
            className={`edit-and-save ${
              isPassenger ? "with-delete" : "without-delete"
            }`}
          >
            <div className="edit">
              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  id={isEditing ? "onclick" : ""}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="save">
              {isEditing && <button type="submit">Save Change</button>}
            </div>

            {role === "passenger" && (
              <div className="delete">
                <button onClick={handlePasswordVerification} type="submit">
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      <Dialog
        open={Open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfileForm;
