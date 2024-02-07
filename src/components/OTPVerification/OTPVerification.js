import './OTPVerification.css';


function OTPVerification({email}){
    return(
        <div className='email-verification'>
          <div className='email-verification-heading'>
             <h5>Please Enter the 4 Digit Code Sent to {email}</h5>
          </div>
          <div className='email-verification--form'>
               <div className='digit'>
                   <input type='number' class='form-control'/>
               </div>
               <div className='digit'>
                   <input type='number' class='form-control'/>
               </div>
               <div className='digit'>
                   <input type='number' class='form-control'/>
               </div>
               <div className='digit'>
                   <input type='number' class='form-control'/>
               </div>
          </div>
          <div className='resent-otp'>
               <h5>Resend Code</h5>
          </div>
      </div>
    );
}

export default OTPVerification;