import "./LoginGeneralUser.css";
import Logo from "../../components/Logo/Logo";
import SubHeading from "../../components/SubHeading/SubHeading";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoginButton from "../../components/LoginButton/LoginButton";
import MainImage from "../../components/MainImageBig/MainImage";
import img from "../../images/loginGeneralUserImage.png";
import SignUpButton from "../../components/SignUpButton/SignUpButton";
import { Password } from "@mui/icons-material";
import { Link } from "react-router-dom";

const LoginGeneralUser = () => {
  return (
    <div className="App">
      <div className="Left-Form">
        <div className="logo">
          <Logo></Logo>
        </div>
        <div className="login-form-heading">
          <SubHeading heading="Login to Your Account"></SubHeading>
        </div>
        <div className="login-form">
          <LoginForm
            userNameTitle="E-mail"
            userNamePlaceholder="Enter Your E-mail"

          ></LoginForm>
        </div>
        <div className="signup">
          <Link to="/SignUp">
            <SignUpButton buttonTitle="Sign Up Now"></SignUpButton>
          </Link>
        </div>
      </div>
      <div className="Right-Image">
        <MainImage img={img}></MainImage>
      </div>
    </div>
  );
};

export default LoginGeneralUser;
