import "./LoginBusEmployee.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import MainImage from "../../components/MainImageBig/MainImage";
import Logo from "../../components/Logo/Logo";
import LoginButton from "../../components/LoginButton/LoginButton";
import SubHeading from "../../components/SubHeading/SubHeading";

import img from "../../images/loginBusEmployeeImage.png";

function LoginBusEmployee() {
  return (
    <div className="App">
      <div className="Left-Form">
        `
        <div className="LoginBusEmployee">
          <div className="logo">
            <Logo></Logo>
          </div>
          <div className="login-form-heading">
            <SubHeading heading="Login to Your Account"></SubHeading>
          </div>
          <div className="login-form">
            <LoginForm
              userNameTitle="Employee ID or User Name"
              userNamePlaceholder="Enter Your Employee Id or User Name"
              loginAs="Login as Customer?"
            ></LoginForm>
          </div>
          <div className="btn">
            <LoginButton></LoginButton>
          </div>
        </div>
      </div>
      <div className="Right-Image">
        <MainImage img={img}></MainImage>
      </div>
    </div>
  );
}

export default LoginBusEmployee;
