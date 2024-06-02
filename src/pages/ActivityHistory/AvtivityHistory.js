import './ActivityHistory.css';
import NavbarUser from '../../components/NavbarUSer/NavbarUser';
import GeneralUserProfileIcon from '../../components/GeneralUserProfileIcon/GeneralUserProfileIcon';
import { CircleNotifications } from '@mui/icons-material';
import ActivityHistoryTable from '../../components/ActivityHistoryTable/ActivityHistoryTable';

function ActivityHistory(){
    const activityData = [
        {desc: 'FirstDataFirstDataFirstData'},
        {desc: ' SecondDataSecondDataSecondData'},
        {desc: ' ThirdDataThirdDataThirdData'}
      ]
       
     
   
   
    return(
        <div className='activity-history'>
        <div className='nav-bar'>
          <NavbarUser></NavbarUser>
        </div>
        <div className='main'>
            <div className='main-header'>
               <div className='main-profile'>
                   <GeneralUserProfileIcon username='UserName' pagename='ACTIVITY HISTORY'></GeneralUserProfileIcon>
               </div>
               <div className='main-notification'>
                   <CircleNotifications sx={{fontSize:40}}></CircleNotifications>
               </div>
            </div>
            <div className='main-subject'>
                 <ActivityHistoryTable activityData={activityData}></ActivityHistoryTable>
            </div>
        </div>
      </div>  
    );
}

export default ActivityHistory;