import './EmailVerification.css';
import Logo from '../../Components/Logo/Logo';
import SubHeading from '../../Components/SubHeading/SubHeading';
import OTPButton from '../../Components/OTPButton/OTPButton';
import OTPTimer from '../../Components/OTPTimer/OTPTimer';
import OTPVerification from '../../Components/OTPVerification/OTPVerification';


function EmailVerification(){
    return(
      <div className='Email-Verification'>
           <div className='logo'>
               <Logo></Logo>
           </div>
           <div className='email-verification-main'>
              <div className='email-verification-heading'>
                  <SubHeading heading='Email Verification'></SubHeading>
              </div>
              <div className='email-verification-form'>
                  <OTPVerification email='myemail@gmail.com'></OTPVerification>
              </div>
              <div className='otp-verify-button'>
                  <OTPButton title='Verify'></OTPButton>
              </div>
              <div className='otp-timer'>
                  <OTPTimer></OTPTimer>
              </div>
           </div>
      </div>
    );
}

export default EmailVerification;