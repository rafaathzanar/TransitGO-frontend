import './GeneralUserProfileIcon.css';
import AccountCircle from '@mui/icons-material/AccountCircle';

function GeneralUserProfileIcon({username},{pagename}){
    return(
        <div className='GeneralUserProfileIcone'>
            <div className='profile-icon'>
                <AccountCircle sx={{fontSize:60}}></AccountCircle>
            </div>
            <div className='user-name'>
               <h5>Hi {username}</h5>
               <h4>{pagename}</h4>
            </div>
        </div>
    );
}

export default GeneralUserProfileIcon;