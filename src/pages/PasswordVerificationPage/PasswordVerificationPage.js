import React from 'react';
import "./PasswordVerification.css";
import Logo from '../../components/Logo/Logo';
import SubHeading from '../../components/SubHeading/SubHeading';
import PasswordVerification from '../../components/PasswordVerification/PasswordVerification';

function PasswordVerificationPage() {
  return (
    <div className="passwordVerification">
      <div className="logo">
        <Logo></Logo>
      </div>
      <div className="passwordVerification-main">
        <div className="passwordVerification-heading">
          <SubHeading heading="Password Verification"></SubHeading>
        </div>
        <div className="passwordVerification-form">
          <PasswordVerification></PasswordVerification>
        </div>
        
      </div>
    </div>
  )
}

export default PasswordVerificationPage