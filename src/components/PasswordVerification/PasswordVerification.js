import React from 'react';
import LoginButton from '../LoginButton/LoginButton';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../UI/Button/Button';
import axios from 'axios';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


function PasswordVerification() {
    const [open, setOpen] = useState(false);
    const Navigate = useNavigate();
    const [password, setPassword] = useState('');
    const email = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const Authorization = {
    headers: {Authorization: `Bearer ${token}`}
  }
    const handleVerification = async(e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`http://localhost:8080/verifyPassword/${email}`,{password:password},Authorization);
            setOpen(true);
            
        }catch(error){
            console.log("Invalid Password");
            window.alert("Invalid Password");
        }

    }

    const handleConfirmDelete = async () => {
        try {
          await axios.delete(`http://localhost:8080/deleteUser/${email}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Navigate("/");
        } catch (error) {
          console.error("Error deleting", error);
        }
        handleClose();
      };

    const handleClose = () => {
        setOpen(false);
      };

  return (
    <div className='newpassword-form'>
        <form onSubmit={handleVerification}>
        <div class="input">
           <label for="password" class="form-label">Password</label>
           <input 
           type="password" 
           class="form-control" 
           placeholder="Enter Your Password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           required
           />
        </div>
        <div className='button'>
            <LoginButton buttonTitle="Delete Account"></LoginButton>
         </div>
       </form> 
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Password Verified, Are you sure you want to Delete this Account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmDelete()}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PasswordVerification