import './Terms.css';
import {Link} from 'react-router-dom';


function Terms(){
    return(
       <div className='terms'>
           <h5>I agree with the 
            <Link to='/Terms' style={{color:'#FA6B6B'}}> Terms of Services </Link> 
            and 
            <Link to='/Terms'  style={{color:'#FA6B6B'}}> Privacy Policy</Link>
            </h5>
       </div>
    );
}

export default Terms;