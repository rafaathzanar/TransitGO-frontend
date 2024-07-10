import "./LoginForm.css";
import { Link } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
} from "../FormValidationSignup/FormValidationSignup";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import LoginButton from "../LoginButton/LoginButton";
import GeneralUserProfileIcon from "../GeneralUserProfileIcon/GeneralUserProfileIcon";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../UI/Button/Button";

const LoginForm = ({ userNameTitle, userNamePlaceholder, loginAs }) => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [profileName, setUsername] = useState({
    username: "",
  });

  const [Open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");

  const onFormInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    //let usernameORemailValidation;
    const passwordValidation = validatePassword(formData.password);
    const emailValidation = validateEmail(formData.email);
    //validate form values
    /*if (!formData.usernameORemail.includes("@")){
      usernameORemailValidation = validateUsername(formData.usernameORemail);
    }
    else{
      usernameORemailValidation = validateEmail(formData.usernameORemail);
    }*/


    if (!emailValidation.isValid ||
        !passwordValidation.isValid){
           setFormErrors({
            email: emailValidation.Message,
            password: passwordValidation.Message
           });
           return;
         }

         try{
          console.log(formData);
            const response = await axios.post("http://localhost:8080/api/v1/auth/authentication",formData);

            //store token, role and mail in the localstorage
            const token = response.data.token;
            const type = response.data.user.type;
            const email = response.data.user.username;
            const lastname = response.data.user.lname;
            const uname = response.data.user.uname;
            const id = response.data.user.id;
            
            localStorage.setItem('token',token);
            localStorage.setItem('userRole',type);
            localStorage.setItem('username',email);
            localStorage.setItem('lastname',lastname);
            localStorage.setItem('uname',uname);
            localStorage.setItem('id',id);


            setDialogTitle("Success");
            setDialogContent("Login Success");
            setOpen(true);
            
            setNavigateTo(type === "admin" ? "/admin" : "/profile");
            
         }catch(error){
          console.log(error);
          let errorMessage = "Something went wrong! Please try again later";
          if (error.response && error.response.data){
              errorMessage = error.response.data || "Invalid Email or Password" || "An unexpected error occurred during authentication, User Email not Verified";
             setFormErrors({
              email: errorMessage,
              password: errorMessage
            });
          
            setDialogTitle("Error");
            setDialogContent(errorMessage);
            setOpen(true);
           }
         }

  };

  const handleCloseDialog = () => {
    setOpen(false);
    if (dialogTitle === "Success") {
      navigate(navigateTo);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div class="input">
          <label for="username" class="form-label">
            {userNameTitle}
          </label>
          <input
            type="email"
            class="form-control"
            placeholder={userNamePlaceholder}
            name="email"
            value={formData.email}
            onChange={(e) => onFormInput(e)}
            error={formErrors.email}
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>
        <div class="input">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="Enter Your Password"
            name="password"
            value={formData.password}
            onChange={(e) => onFormInput(e)}
            error={formErrors.password}
          />
          {formErrors.password && (
            <p className="error">{formErrors.password}</p>
          )}
        </div>


        <div className='other-option'>
              
               <div className='option'>
                  <Link to='/ForgotPassword'>Forgot Password</Link>
               </div>
         </div> 
         <div className="btn">
          <LoginButton buttonTitle="Login Now" onSubmit={(e)=>handleSubmit(e)}></LoginButton>

        </div>
      </form>
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
};

export default LoginForm;
