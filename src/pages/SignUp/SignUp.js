import Logo from '../../Components/Logo/Logo';
import MainImage from '../../Components/MainImageBig/MainImage';
import SignUpButton from '../../Components/SignUpButton/SignUpButton';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';
import SubHeading from '../../Components/SubHeading/SubHeading';
import Terms from '../../Components/Terms/Terms';
import img from '../../images/signUpImage.png';
import './SignUp.css';


function SignUp(){
    return(
      <div className='signup-page'>
        <div className='left-image'>
            <div className='logo'>
              <Logo></Logo>
            </div>
            <div className='main-image'>
               <MainImage img={img}></MainImage>
            </div>
        </div>
        <div className='right-form'>
            <div className='signup-form-heading'>
                <SubHeading heading='Create New Account'></SubHeading>
            </div>
            <div className='signup-form'>
               <SignUpForm></SignUpForm>
            </div>
            <div className='option'>
                <Terms></Terms>
            </div>
            <div className='signup-button'>
                <SignUpButton></SignUpButton>
            </div>
        </div>
      </div>
    );
}

export default SignUp;