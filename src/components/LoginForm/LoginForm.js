import "./LoginForm.css";
import { Link } from "react-router-dom";
import { 
         validateEmail,
        validatePassword } from "../FormValidationSignup/FormValidationSignup";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import LoginButton from "../LoginButton/LoginButton";
import GeneralUserProfileIcon from "../GeneralUserProfileIcon/GeneralUserProfileIcon";

const LoginForm = ({ userNameTitle, userNamePlaceholder, loginAs }) => {
 let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [profileName, setUsername] = useState({
     username: ""
  });

  const onFormInput = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const [formErrors,setFormErrors] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async(e) => {
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
           console.log(formErrors);
           return;
         }

         try{
            const response = await axios.post("http://localhost:8080/api/v1/auth/authentication",formData);
            console.log(response);

            //store token, role and mail in the localstorage
            const token = response.data.token;
            const type = response.data.user.type;
            const email = response.data.user.username;
            const lastname = response.data.user.lname;
            const uname = response.data.user.uname;
            const id = response.data.user.id;
            console.log(token,type,email,lastname,uname);
            localStorage.setItem('token',token);
            localStorage.setItem('userRole',type);
            localStorage.setItem('username',email);
            localStorage.setItem('lastname',lastname);
            localStorage.setItem('uname',uname);
            localStorage.setItem('id',id);

            console.log("login success",formData);
            //alert("Login Success");
            window.confirm("Login Success");
            if (type == "admin"){
              navigate("/admin");
            }else{
               navigate("/GeneralUserProfile");
            }
         }catch(error){
          if (error.response && error.response.data){
             const errorMessage = error.response.data.Message || "Invalid Email or Password";
             setFormErrors({
              email: errorMessage,
              password: errorMessage
            });
           }else{
            console.error("Error submitting form: ",error);
            window.confirm("Something went wrong! Please try again later");
           }
         }

  };
 

  return (
    <div className="login-form">
      <form onSubmit={(e)=>handleSubmit(e)}>
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
            onChange={(e)=>onFormInput(e)}
            error={formErrors.email}
          />
           {formErrors.email && <p className='error'>{formErrors.email}</p>}

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
            onChange={(e)=>onFormInput(e)}
            error={formErrors.password}
          />
            {formErrors.password && <p className='error'>{formErrors.password}</p>}

        </div>
        <div className='other-option'>
               {loginAs === 'Login as Customer?' ? ( 
               <div className='option'>
                 <Link to='/LoginGeneralUser'>{loginAs}</Link>
               </div>):(
               <div className='option'>
                  <Link to='/LoginBusEmployee'>{loginAs}</Link>
               </div>
               )}
               <div className='option'>
                  <Link to='/ForgotPassword'>Forgot Password</Link>
               </div>
         </div> 
         <div className="btn">
          <LoginButton buttonTitle="Login Now" onSubmit={(e)=>handleSubmit(e)}></LoginButton>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
