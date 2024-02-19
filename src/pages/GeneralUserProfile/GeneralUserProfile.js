import ProfileForm from '../../components/ProfileForm/ProfileForm';
import NavbarUser from '../../components/NavbarUSer/NavbarUser';
import './GeneralUserProfile.css';
import GeneralUserProfileIcon from '../../components/GeneralUserProfileIcon/GeneralUserProfileIcon';
import { CircleNotifications } from '@mui/icons-material';

function GeneralUserProfile(){
    return(
        <div className='general-user-profile'>
          <div className='nav-bar'>
            <NavbarUser></NavbarUser>
          </div>
          <div className='main'>
              <div className='main-header'>
                 <div className='main-profile'>
                     <GeneralUserProfileIcon username='UserName' pagename='PROFILE'></GeneralUserProfileIcon>
                 </div>
                 <div className='main-notification'>
                     <CircleNotifications sx={{fontSize:40}}></CircleNotifications>
                 </div>
              </div>
              <div className='main-subject'>
                   <ProfileForm></ProfileForm> 
              </div>
          </div>
        </div>
    );
}

export default GeneralUserProfile;