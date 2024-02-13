import './OTPButton.css';


function OTPButton({title}){
    return(
        <div className='send-otp-button'>
           <button type="submit">{title}</button>
        </div>
    );
}

export default OTPButton;