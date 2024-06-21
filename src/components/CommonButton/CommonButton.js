import './CommonButton.css';


function CommonButton({buttonTitle}){
    return(
        <div className='common'>
            <button type='button'>{buttonTitle}</button>
        </div>
    );
}

export default CommonButton;