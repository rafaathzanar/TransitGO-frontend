import "./EmailVerification.css";
import Logo from "../../components/Logo/Logo";
import SubHeading from "../../components/SubHeading/SubHeading";
import OTPButton from "../../components/OTPButton/OTPButton";
import OTPTimer from "../../components/OTPTimer/OTPTimer";
import OTPVerification from "../../components/OTPVerification/OTPVerification";

function EmailVerification() {
  return (
    <div className="Email-Verification">
      <div className="logo">
         <Logo></Logo>
      </div>
      <div className="email-verification-main">
        <div className="email-verification-heading">
          <SubHeading heading="Email Verification"></SubHeading>
        </div>
        <div className="email-verification-form">
          <OTPVerification email="myemail@gmail.com"></OTPVerification>
        </div>
        <div className="otp-verify-button">
          
        </div>
        
      </div>
    </div>
  );
}

export default EmailVerification;
