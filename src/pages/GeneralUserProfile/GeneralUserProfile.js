import ProfileForm from '../../components/ProfileForm/ProfileForm';
import NavbarUser from '../../components/NavbarUSer/NavbarUser';
import './GeneralUserProfile.css';
import GeneralUserProfileIcon from '../../components/GeneralUserProfileIcon/GeneralUserProfileIcon';
import { CircleNotifications } from '@mui/icons-material';
import { useState } from 'react';

function GeneralUserProfile(){
    const [profileInfo, setProfileInfo] = useState({
        fname: "",
        lname: "",
        email: "",
        uname: "",
        id: ""
     });

     const lastname =  profileInfo.uname.toUpperCase();

    
    return(
        <div className='general-user'>
          <div className='profilenavbar'>
            <NavbarUser></NavbarUser>
          </div>
          <div className='profilemain'>
              <div className='profiletop'>
                 <div className='profileicon'>
                     <GeneralUserProfileIcon username={lastname} pagename='PROFILE'></GeneralUserProfileIcon>
                 </div>
                 <div className='profilenotification'>
                     
                 </div>
              </div>
              <div className='profilesubject'>
                 <ProfileForm profileInfo={profileInfo} setProfileInfo={setProfileInfo}></ProfileForm> 
              </div>
          </div>
        </div>
    );
}

export default GeneralUserProfile;