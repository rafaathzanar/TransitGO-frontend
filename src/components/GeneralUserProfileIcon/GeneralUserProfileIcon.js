import './GeneralUserProfileIcon.css';
import AccountCircle from '@mui/icons-material/AccountCircle';



function GeneralUserProfileIcon({username, pagename}){
    const uname = localStorage.getItem('uname');

    return(
        <div className='GeneralUserProfileIcone'>
            
            <div className='user-name'>
               <h5>Hi <span className='uname'>{uname.toUpperCase()}</span></h5>
               <h4>{pagename}</h4>
            </div>
        </div>
    );
}

export default GeneralUserProfileIcon;