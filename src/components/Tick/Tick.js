import "./Tick.css";
import tick from "../../images/tick.png";


function Tick(){
    return(
        <div className='tick'>
           <img src={tick}/>
        </div>
    );
}

export default Tick;