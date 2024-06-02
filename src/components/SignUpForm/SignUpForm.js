import './SignUpForm.css';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {Link} from 'react-router-dom';
import { validateFname,
         validateLname,
         validateUsername,
         validateEmail,
         validatePassword,
         validateConfirmpassword } from '../FormValidationSignup/FormValidationSignup';
import SignUpButton from '../SignUpButton/SignUpButton';


const FormAddPassenger = () => {
   let navigate=useNavigate();
   const [formData, setFormData] = useState({
     fname: "",
     lname: "",
     email: "",
     username: "",
     password: "",
     confirmpassword: ""
   });

  
   const{fname,lname,email,username,password,confirmpassword} = formData;
 
   const onFormInput = (e) =>{
      setFormData({...formData,[e.target.name]:e.target.value});
   }
 
 
   const [formErrors, setFormErrors] = useState({
     fname: "",
     lname: "",
     email: "",
     username: "",
     password: "",
     confirmpassword
   });
 
 
   const handleSubmit = async(e) => {
     e.preventDefault();

     //Validate form fields
     const fnameValidation = validateFname(formData.fname);
     const lnameValidation = validateLname(formData.lname);
     const usernameValidation = validateUsername(formData.username);
     const emailValidation = validateEmail(formData.email);
     const passwordValidation = validatePassword(formData.password);
     const confirmpasswordValidation = validateConfirmpassword(formData.password,formData.confirmpassword);

     if (!fnameValidation.isValid ||
         !lnameValidation.isValid ||
         !usernameValidation.isValid ||
         !emailValidation.isValid ||
         !passwordValidation.isValid ||
         !confirmpasswordValidation.isValid){
          setFormErrors({
            fname: fnameValidation.Message,
            lname: lnameValidation.Message,
            username: usernameValidation.Message,
            email: emailValidation.Message,
            password: passwordValidation.Message,
            confirmpassword: confirmpasswordValidation.Message
          });
          console.log(formErrors);
          return;
         }

     try{
       const updatedFormData ={...formData, type:"passenger"};
       console.log("json is",updatedFormData)
       await axios.post("http://localhost:8080/api/v1/auth/register",updatedFormData);
       setFormData({
        fname: "",
        lname: "",
        email: "",
        username: "",
        password: "",
        confirmpassword:""
       })
       window.alert("Registration Successful");
       navigate("/verifyEmail");
     }
     catch(error){
      if (error.response && error.response.data){
       setFormErrors({
        ...formErrors,
        email: error.response.data
       });
      }else{
       console.error("Error submitting form: ",error);
       window.alert("Something went wrong, please try again later.");
      }
     }
   };


    return(
        <div className='signup-form'>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <div class="input name">
            <div className='fn'>
               <label htmlFor="firstName"class="form-label">First Name</label>
               <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Enter Your First Name"
                  name="fname"
                  value={formData.fname}
                  onChange={(e)=>onFormInput(e)}
                  error={formErrors.fname}/>
                 {formErrors.fname && <p className='error'>{formErrors.fname}</p>}
           </div>
           <div className='ln'>
               <label htmlFor="lastName" class="form-label">Last Name</label>
               <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Enter Your Last Name" 
                  name="lname" 
                  value={formData.lname}
                  onChange={(e)=>onFormInput(e)}
                  error={formErrors.lname}/>
                  {formErrors.lname && <p className='error'>{formErrors.lname}</p>}

           </div>
        </div>
           <div class="input">
               <label htmlFor="email" class="form-label">E-mail</label>
               <input 
                  type="text" 
                  class="form-control" 
                  placeholder='Enter Your E-mail' 
                  name="email" value={formData.email}
                  onChange={(e)=>onFormInput(e)}
                  error={formErrors.email}/>
                  {formErrors.email && <p className='error'>{formErrors.email}</p>}

           </div>
           <div class="input">
              <label htmlFor="username" class="form-label">User Name</label>
              <input 
                 type="text" 
                 class="form-control" 
                 placeholder='Enter Your User Name' 
                 name="username" value={formData.username}
                 onChange={(e)=>onFormInput(e)}
                 error={formErrors.username}/>
                 {formErrors.username && <p className='error'>{formErrors.username}</p>}

        </div>
        <div class="input">
             <label htmlFor="password" class="form-label">Password</label>
             <input 
                type="password" 
                class="form-control" 
                placeholder='Enter Your Password' 
                name="password" 
                value={formData.password}
                onChange={(e)=>onFormInput(e)}
                error={formErrors.password}/>
                {formErrors.password && <p className='error'>{formErrors.password}</p>}

        </div>
        <div class="input">
             <label for="password" class="form-label">Confirm Password</label>
             <input 
             type="password" 
             class="form-control" 
             placeholder='Enter Your Password'
             name='confirmpassword'
             value={formData.confirmpassword}
             onChange={(e)=>onFormInput(e)}
             error={formErrors.confirmpassword}/>
             {formErrors.confirmpassword && <p className='error'>{formErrors.confirmpassword}</p>}

        </div>
        <div className='other-option'>
           <label for="text" class="form-label">Already Have an Account?</label>
           <div className='option'>
             <Link to='/LoginGeneralUser'>Login</Link>
           </div>
        </div>
        <div>
        <div>
            <SignUpButton buttonTitle="Sign Up Now" onSubmit={(e)=>handleSubmit(e)}></SignUpButton>
        </div> 
        </div>
        <input type="hidden" name="type" value="passenger" />
       </form> 
    </div>
    );
}

export default FormAddPassenger;