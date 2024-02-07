import './LoginBusEmployee.css';
import LoginForm from '../../Components/LoginForm/LoginForm';
import MainImage from '../../Components/MainImageBig/MainImage';
import Logo from '../../Components/Logo/Logo';
import  LoginButton from '../../Components/LoginButton/LoginButton';
import SubHeading from '../../Components/SubHeading/SubHeading';

import img from '../../images/loginBusEmployeeImage.png';




function LoginBusEmployee(){
    return(
        <div className="App">
            <div className='Left-Form'>`
                  <div className='LoginBusEmployee'>
                      <div className='logo'>
                           <Logo></Logo>
                      </div>
                      <div className='login-form-heading'>
                           <SubHeading heading='Login to Your Account'></SubHeading>
                      </div>
                      <div className='login-form'>
                           <LoginForm userNameTitle="Employee ID or User Name" userNamePlaceholder="Enter Your Employee Id or User Name" loginAs="Login as Customer?"></LoginForm>
                      </div>
                      <div className='btn'>
                          <LoginButton></LoginButton>
                      </div>
                  </div> 
            </div>
            <div className='Right-Image'>
                <MainImage img={img}></MainImage>
            </div>
      </div>
    );
}

export default LoginBusEmployee;
