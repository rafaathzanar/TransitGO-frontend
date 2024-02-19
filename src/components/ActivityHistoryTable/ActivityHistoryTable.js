import React from 'react'
import { DeleteOutline,Edit } from '@mui/icons-material';

import './ActivityHistoryTable.css';


export const ActivityHistoryTable = ({activityData}) => {
  
  return (
    
       <div className='activities'>
          {
               activityData.map((activity, index) => (
              <div className='activity'>
                   <span className='desc'>
                      {activity.desc}
                   </span>
                   <span className='action'>
                       <DeleteOutline className='dlt-btn'></DeleteOutline>
                       <Edit></Edit>
                   </span>
              </div>
               ))
          }
          
          
       </div>
    
  )
}

export default ActivityHistoryTable;
