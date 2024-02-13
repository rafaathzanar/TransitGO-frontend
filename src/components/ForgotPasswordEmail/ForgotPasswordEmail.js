import './ForgotPasswordEmail.css';


function ForgotPasswordEmail(){
    return(
      <div className='forgotpassword-email'>
          <div className='forgotpassword-heading'>
             <h5>Please Enter a Valid E-mail Address to Receive a Verification Code</h5>
          </div>
          <div className='forgotpassword-form'>
               <form>
                   <lable for='email' class='form-lable'>E-mail</lable>
                   <input type='email' class='form-control' placeholder='Enter Your Email'/>
               </form>
          </div>
          <div className='send-otp-button'>

          </div>
      </div>
    );
}

export default ForgotPasswordEmail;