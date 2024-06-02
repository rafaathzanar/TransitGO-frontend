import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";




const EmailVerificationResult = () =>{

    const history = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const code = new URLSearchParams(location.search).get('code');

        const verifyEmail = async () => {
            try{
                const response = await axios.get('/api/v1/auth/verify',{params: {code},});
                console.log('Email verified successfully', response.data);
                history.push('/SuccessComponenet'); 
            }catch(error){
            console.log('Failed to verify email:', error);
            history.push('/FailComponenet')
           } 

        };
        if (code){
            verifyEmail();
        }else{
            console.error('Email verification token not found!');
            history.push('/signup');
        }
        },[history, location.search]
    );
    
    return null;
}


export default EmailVerificationResult;