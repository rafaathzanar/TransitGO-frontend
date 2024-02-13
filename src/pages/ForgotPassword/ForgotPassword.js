import ForgotPasswordEmail from "../../components/ForgotPasswordEmail/ForgotPasswordEmail";
import Logo from "../../components/Logo/Logo";
import OTPButton from "../../components/OTPButton/OTPButton";
import SubHeading from "../../components/SubHeading/SubHeading";
import "./ForgotPassword.css";

import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="forgotpassword">
      <div className="logo">
        <Logo></Logo>
      </div>
      <div className="forgotpassword-main">
        <div className="forgotpassword-heading">
          <SubHeading heading="Forgot Password"></SubHeading>
        </div>
        <div className="forgotpassword-form">
          <ForgotPasswordEmail></ForgotPasswordEmail>
        </div>
        <div className="send-otp-button">
          <Link to="/EmailVerification">
            <OTPButton title="Send OTP"></OTPButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
