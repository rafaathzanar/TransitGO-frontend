import "./LoginForm.css";
import { Link, link } from "react-router-dom";

function LoginForm({ userNameTitle, userNamePlaceholder, loginAs }) {
  return (
    <div className="login-form">
      <form>
        <div class="input">
          <label for="username" class="form-label">
            {userNameTitle}
          </label>
          <input
            type="text"
            class="form-control"
            placeholder={userNamePlaceholder}
          />
        </div>
        <div class="input">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="Enter Your Password"
          />
        </div>
        {/* <div className='other-option'>
               {loginAs === 'Login as Customer?' ? ( 
               <div className='option'>
                 <Link to='/LoginGeneralUser'>{loginAs}</Link>
               </div>):(
               <div className='option'>
                  <Link to='/LoginBusEmployee'>{loginAs}</Link>
               </div>
               )}
               <div className='option'>
                  <Link to='/ForgotPassword'>Forgot Password</Link>
               </div>
            </div> */}
      </form>
    </div>
  );
}

export default LoginForm;
