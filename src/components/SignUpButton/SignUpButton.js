import './SignUpButton.css';
import { Link, link } from "react-router-dom";


const SignUpButton = ({buttonTitle}) => {
   
    return(
        <div className='signup'>
           
            <button type='submit'>{buttonTitle}</button>
           
        </div>
    );

}
export default SignUpButton;