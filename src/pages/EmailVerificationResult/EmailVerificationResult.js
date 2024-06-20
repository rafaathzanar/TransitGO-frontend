import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Verified } from "@mui/icons-material";
import SuccessComponent from "./SuccessComponent";
import FailComponent from "./FailComponenet";



const EmailVerificationResult = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token');
        console.log(token);

        const verifyEmail = async () => {
            try{
                const response = await axios.get('http://localhost:8080/api/v1/auth/verify-email',{params: {token},});
                //console.log('Email verified successfully', response.data);
                const verificationStatus = response.data;
                console.log('Email Veriifcation status: ', verificationStatus);
                setStatus(verificationStatus);
            }catch(error){
                console.log('Failed to verify email:', error);
                setStatus('Verify-Email');
           } 

        };

        if (token){
            verifyEmail();
        }else{
           console.error('Email verification token not found!');
           navigate('/signup');
        }
        },[navigate, location.search]
    );

    useEffect(() => {
        if (status){
            if(status === 'Verified'){
                navigate('/SuccessComponent');
            }else{
                navigate('/FailComponent');
            }
        }
    },[status, navigate]);

    return null;
    
    
}


export default EmailVerificationResult;