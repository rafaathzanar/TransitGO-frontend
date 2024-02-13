import './LoginButton.css';

function LoginButton({buttonTitle}){
    return(
         <div className='login'>
            <button type="submit">{buttonTitle}</button>
         </div>
    );
}

export default LoginButton;