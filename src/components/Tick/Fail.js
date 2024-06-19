import "./Tick.css";
import fail from "../../images/fail.jpeg";
import { FaIcicles } from "react-icons/fa";

function Fail(){
    return(
        <div className='tick'>
           <img src={fail}/>
        </div>
    );
}

export default Fail;