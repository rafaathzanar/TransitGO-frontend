import Success from "../../components/Tick/Success";
import "./EmailVerificationResult.css";
import Logo from "../../components/Logo/Logo";
import SubHeading from "../../components/SubHeading/SubHeading";
import { Link } from "react-router-dom";

function SuccessComponent(){
    return(
        <div className='result'>
           <div className="logo">
             <Logo></Logo>
           </div>
           <div className="main">
              <div className="tick">
                 <Success></Success>
              </div>
              <div className="heading">
                <SubHeading heading="Congratulations, your Account has been verified"></SubHeading>
              </div>
              <div className="subject">
                <h6>
                  <Link to={'/signin'}>
                  Click here to LOG IN
                  </Link>
                  </h6>
              </div>
           </div>
        </div>
    );
}

export default SuccessComponent;