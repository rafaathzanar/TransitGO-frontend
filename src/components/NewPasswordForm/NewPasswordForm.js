import { useState } from 'react';
import LoginButton from '../LoginButton/LoginButton';
import OTPButton from '../OTPButton/OTPButton';
import './NewPasswordForm.css';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';


function NewPasswordForm(){

   const [password, setPassword] = useState('');
   const {email} = useParams();
   const navigate = useNavigate();

   const handleNewPassword = async (e) => {
      e.preventDefault();

      try{
         const response = await axios.post(`http://localhost:8080/api/v1/auth/new-password`,null,{params: {email,password}});
         const responseStatus = response.data.message;
         console.log(responseStatus);
         if (responseStatus === "Password Saved"){
            window.alert("Password Updated");
            navigate("/signin");
         }else if (responseStatus === "User does not exist"){
            console.log("User does not exist");
            window.alert("User does not exist");
         }else{
            console.log("Error occurred while updating password");
            window.alert("Error occurred while updating password");
         }
         
      }catch(error){
         console.log("Error updating new password", error);
      }
   }

    return(
      <div className='newpassword-form'>
        <form onSubmit={handleNewPassword}>
        <div class="input">
           <label for="password" class="form-label">Password</label>
           <input 
           type="password" 
           class="form-control" 
           placeholder="Enter Your New Password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           required
           />
        </div>
        <div className='button'>
            <LoginButton buttonTitle="Save and Login"></LoginButton>
         </div>
       </form> 
    </div>
    );
}

export default NewPasswordForm;