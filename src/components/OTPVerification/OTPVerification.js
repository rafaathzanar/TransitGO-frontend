import { useScrollTrigger } from '@mui/material';
import './OTPVerification.css';
import { useState } from 'react';
import axios from 'axios';
import OTPButton from '../OTPButton/OTPButton';
import { useLocation, useNavigate, useParams} from 'react-router';
import { useEffect } from 'react';
import { Form } from 'react-router-dom';

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../UI/Button/Button";
import CommonButton from '../CommonButton/CommonButton';
import { Link } from 'react-router-dom';




function OTPVerification(){
    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(300); //5 min in sec
    const [otpExpired, setOtpExpired] = useState(false);
    const navigate = useNavigate();
    const {email} = useParams();

  const [Open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

    // useEffect(() => {
    //     const searchParams = new URLSearchParams(location.search);
    //     const emailQuery = searchParams.get('email');
    //     setEmailFromQuery(emailQuery);
    //     console.log(emailFromQuery);
    //   }, [location]);

    useEffect(() => {
        if (timeLeft > 0){
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }else{
            setOtpExpired(true);
        }
    },[timeLeft]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (otpExpired){
            window.alert("OTP has Expired, Please request a new OTP");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/auth/verify-otp`,null,{params:{email, otp}});
            console.log(response);
            const responseStatus = response.data;
            console.log(responseStatus);
            if (responseStatus === "OTP Verified"){
                //console.log("OTP verified");
                window.alert("OTP Verified");
                navigate(`/NewPassword/${encodeURIComponent(email)}`);
            }else if(responseStatus === "Invalid OTP"){
                console.log("Invalid OTP");
                window.alert("Invalid OTP, Try again");
            }else{
                console.error('Error while verifying OTP'); 
                window.alert("Something went wrong, Try again");
            }
        }catch( error){
            console.error('Error verifying OTP', error); 
            window.alert("Something went wrong, Try again");
        }
    }

    const handleResend = async (e) => {
        e.preventDefault();

     try{
        const response = await axios.post(`http://localhost:8080/api/v1/auth/forgot-password`,null,{params: {email}});
        const responseStatus = response.data.message;
        console.log(responseStatus);
        if (responseStatus === "OTP sent successfully"){
             setTimeLeft(300);
             setOtpExpired(false);
             navigate(`/otpVerification/${encodeURIComponent(email)}`);

        } else if (responseStatus === "Email does not exist"){
            window.alert("Email does not exist, Enter a valid Email");

        } else{
            window.alert("Error occurred while sending otp, Try again");
        }
     }catch(error){
        console.error("Error sending OTP", error);
     }
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds/ 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} : ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    const handleCloseDialog = () => {
        setOpen(false);
      }

    return(
        <div className='email-verification'>
          <div className='email-verification-heading'>
             <h5>Please Enter the 4 Digit Code Sent to {email}</h5>
          </div>
          <div className='email-verification-form'>
            <form onSubmit={handleSubmit}>
               <label>
                OTP:
                <input 
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "2em"
                }}
                type="text" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                required
                className='form-control'
                />
                <OTPButton title="Verify"></OTPButton>
                <Link to="/LoginGeneralUser">
                Login
                </Link>
               </label>
            </form>
          </div>
          <div className='resent-otp'>
             <form onSubmit={handleResend}>
                <button 
                type='submit'
                style={{border: "none"}} 
                >Resent OTP</button>
             </form>
          </div>
          <div 
          className='timer'
          style={{color: "red"}}
          >
              {otpExpired ? (
                <span>OTP Expired, Please request a new OTP</span>
              ):(
                <span>Time Left : {formatTime(timeLeft)}</span>
              )
              }
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

export default OTPVerification;