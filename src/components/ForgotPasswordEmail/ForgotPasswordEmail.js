import './ForgotPasswordEmail.css';
import { Link, useNavigate } from 'react-router-dom';
import OTPButton from '../OTPButton/OTPButton';
import { useState } from 'react';
import axios from 'axios';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import SignUpButton from '../SignUpButton/SignUpButton';
import CommonButton from '../CommonButton/CommonButton';


function ForgotPasswordEmail(){
   const [loading, setLoading] = useState(false);
   const [email, setemail] = useState('');
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
    setLoading(true);
     e.preventDefault();

     try{
        const response = await axios.post(`http://localhost:8080/api/v1/auth/forgot-password`,null,{params: {email}});
        const responseStatus = response.data.message;
        console.log(responseStatus);
        if (responseStatus === "OTP sent successfully"){
             setLoading(false);
             window.alert("OTP Sent");
             navigate(`/otpVerification/${encodeURIComponent(email)}`);
        } else if (responseStatus === "Email does not exist"){
             setLoading(false);
            window.alert("Email does not exist, Enter a valid Email");
        } else{
            setLoading(false);
            window.alert("Error occurred while sending otp, Try again");
        }
     }catch(error){
        console.error("Error sending OTP", error);
     }
   }



    return(
      <div className='forgotpassword-email'>
          <div className='forgotpassword-heading'>
             <h5>Please Enter a Valid E-mail Address to Receive a Verification Code</h5>
          </div>
          <div className='forgotpassword-form'>
          {loading && <LoadingComponent />}
               <form onSubmit={handleSubmit}>
                   <lable for='email' className='form-lable'>E-mail</lable>
                   <input 
                   type='email' 
                   className='form-control' 
                   placeholder='Enter Your Email'
                   value={email}
                   onChange={(e) => setemail(e.target.value)}
                   required
                   />
                  
                <OTPButton title="Send OTP"></OTPButton>
                
                
               </form>
          </div>
      </div>
    );
}

export default ForgotPasswordEmail;