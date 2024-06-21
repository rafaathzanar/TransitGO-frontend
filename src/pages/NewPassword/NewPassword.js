import './NewPassword.css';
import Logo from '../../components/Logo/Logo';
import SubHeading from '../../components/SubHeading/SubHeading';
import NewPasswordForm from '../../components/NewPasswordForm/NewPasswordForm';
import LoginButton from '../../components/LoginButton/LoginButton';


function NewPassword(){
    return(
        <div className='newpassword'>
           <div className="logo">
             <Logo></Logo>
           </div>
           <div className="newpassword-main">
              <div className="newpassword-heading">
                <SubHeading heading="New Password"></SubHeading>
           </div>
           <div className="newpassword-form">
               <NewPasswordForm></NewPasswordForm>
           </div>
           
      </div>
      </div>
    );
}

export default NewPassword;