import Fail from "../../components/Tick/Fail";
import "./EmailVerificationResult.css";
import Logo from "../../components/Logo/Logo";
import SubHeading from "../../components/SubHeading/SubHeading";

function FailComponent(){
    return(
        <div className='result'>
           <div className="logo">
             <Logo></Logo>
           </div>
           <div className="main">
              <div className="tick">
                 <Fail></Fail>
              </div>
              <div className="heading">
                <SubHeading heading="Sorry, We could not verify your Account"></SubHeading>
              </div>
              <div className="subject">
                <h6>Account maybe already verifies or verification code is incorrect</h6>
              </div>
           </div>
        </div>
    );
}

export default FailComponent;