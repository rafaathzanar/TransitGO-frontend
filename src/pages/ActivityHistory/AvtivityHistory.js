import './ActivityHistory.css';
import NavbarUser from '../../components/NavbarUSer/NavbarUser';
import GeneralUserProfileIcon from '../../components/GeneralUserProfileIcon/GeneralUserProfileIcon';
import { CircleNotifications } from '@mui/icons-material';
import ActivityHistoryTable from '../../components/ActivityHistoryTable/ActivityHistoryTable';
import { useState } from 'react';

function ActivityHistory(){
     const uname = localStorage.getItem('uname');

    // const activityData = [
    //     {desc: 'FirstDataFirstDataFirstData'},
    //     {desc: ' SecondDataSecondDataSecondData'},
    //     {desc: ' ThirdDataThirdDataThirdData'}
    //   ]
       
     
   
   
    return(
        <div className='activity-history'>
        <div className='nav-bar'>
          <NavbarUser></NavbarUser>
        </div>
        <div className='history'>
            <div className='top'>
               <GeneralUserProfileIcon username={uname.toUpperCase()} pagename='ACTIVITY HISTORY'></GeneralUserProfileIcon>
            </div>
            <div className='bottom'>
                 <ActivityHistoryTable></ActivityHistoryTable>
            </div>
        </div>
      </div>  
    );
}

export default ActivityHistory;