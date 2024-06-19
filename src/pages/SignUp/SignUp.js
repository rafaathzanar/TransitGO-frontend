import Logo from "../../components/Logo/Logo";
import MainImage from "../../components/MainImageBig/MainImage";
import SignUpButton from "../../components/SignUpButton/SignUpButton";
import FormAddPassenger from "../../components/SignUpForm/SignUpForm";
import SubHeading from "../../components/SubHeading/SubHeading";
import Terms from "../../components/Terms/Terms";
import img from "../../images/signUpImage.png";
import "./SignUp.css";

function SignUp() {
  return (
    <div className="signup-page">
      <div className="left-image">
        <div className="logo">
          <Logo></Logo>
        </div>
        <div className="main-image">
          <MainImage img={img}></MainImage>
        </div>
      </div>
      <div className="right-form">
        <div className="signup-form-heading">
          <SubHeading heading="Create New Account"></SubHeading>
        </div>
        <div className="signup-form">
          <FormAddPassenger></FormAddPassenger>
        </div>
        <div className="option">
          <Terms></Terms>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
