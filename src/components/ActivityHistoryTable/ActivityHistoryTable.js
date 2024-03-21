import React from 'react'
import { DeleteOutline,Edit } from '@mui/icons-material';

import './ActivityHistoryTable.css';


export const ActivityHistoryTable = () => {
  return (
    
       <div className='activities'>
          <div className='activity'>
              <span className='desc'>
                   FirstDataFirstDataFirstData
              </span>
              <span className='action'>
                    <DeleteOutline></DeleteOutline>
                    <Edit></Edit>
              </span>
          </div>
          <div className='activity'>
              <span className='desc'>
                   SecondDataSecondDataSecondData
              </span>
              <span className='action'>
                    <DeleteOutline></DeleteOutline>
                    <Edit></Edit>
              </span>
          </div>
          <div className='activity'>
              <span className='desc'>
                   SecondDataSecondDataSecondData
              </span>
              <span className='action'>
                    <DeleteOutline></DeleteOutline>
                    <Edit></Edit>
              </span>
          </div>
       </div>
    
  )
}

export default ActivityHistoryTable;
