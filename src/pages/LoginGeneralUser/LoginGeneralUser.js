import "./LoginGeneralUser.css";
import Logo from "../../components/Logo/Logo";
import SubHeading from "../../components/SubHeading/SubHeading";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoginButton from "../../components/LoginButton/LoginButton";
import MainImage from "../../components/MainImageBig/MainImage";
import img from "../../images/loginGeneralUserImage.png";
import SignUpButton from "../../components/SignUpButton/SignUpButton";

import { Link } from "react-router-dom";

function LoginGeneralUser() {
  return (
    <div className="App">
      <div className="Left-Form">
        `
        <div className="logo">
          <Logo></Logo>
        </div>
        <div className="login-form-heading">
          <SubHeading heading="Login to Your Account"></SubHeading>
        </div>
        <div className="login-form">
          <LoginForm
            userNameTitle="User Name or E-mail"
            userNamePlaceholder="Enter Your User Name or E-mail"
            loginAs="Login as Bus Employee?"
          ></LoginForm>
        </div>
        <div className="btn">
          <LoginButton buttonTitle="Login Now"></LoginButton>
        </div>
        <div className="signup">
          <Link to="/SignUp">
            <SignUpButton></SignUpButton>
          </Link>
        </div>
      </div>
      <div className="Right-Image">
        <MainImage img={img}></MainImage>
      </div>
    </div>
  );
}

export default LoginGeneralUser;
