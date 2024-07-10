import "./EmailVerificationSend.css";
import Logo from "../../components/Logo/Logo";
import SubHeading from "../../components/SubHeading/SubHeading";
import Tick from "../../components/Tick/Tick";


function EmailVerificationSend(){

   
    return(
        <div className='verifyEmail'>
           <div className="logo">
             <Logo></Logo>
           </div>
           <div className="main">
              <div className="tick">
                 <Tick></Tick>
              </div>
              <div className="heading">
                <SubHeading heading="You have Signed up Successfully"></SubHeading>
              </div>
              <div className="subject">
                <h6>Please Check your Email to verify your Account</h6>
              </div>
           </div>
        </div>
    );
}

export default EmailVerificationSend;