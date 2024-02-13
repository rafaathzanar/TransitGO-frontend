import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import './DelayItem.css';
import { Table } from '@mui/material';

const DelayItem = props => {
   //const [deleteText, setDeleteText] = useState('');

  const deleteHandler = () => {
     //setDeleteText('(Deleted!)');
    props.onDelete(props.id);
  };

  return (
    <table className='tab'>
      <td className="goal-item" >
       {props.children}
       <div className='containerdelay'>
        <div className='deleteicon'>
         <DeleteIcon onClick={deleteHandler}></DeleteIcon>
        </div>
        <div className='authordelay'>
        <div>Posted by :</div>
       </div>
       </div>
     </td>
    </table>
  );
};

export default DelayItem;
