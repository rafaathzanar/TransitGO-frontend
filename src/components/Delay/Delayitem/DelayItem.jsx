
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

import "./DelayItem.css";
import { Table } from "@mui/material";

const DelayItem = (props) => {
  //const [deleteText, setDeleteText] = useState('');
  

  const deleteHandler = () => {
    //setDeleteText('(Deleted!)');
    props.onDelete(props.id);
  };

  const editHandler = () => {
    //setDeleteText('(Deleted!)');
    props.onEdit(props.id);
  };

  return (
    <table className="tab">
      <td className="goal-item">
        {props.children}
        <div className="containerdelay">
          <div className="deleteicon">
            <EditIcon onClick={editHandler}></EditIcon>
            <DeleteIcon onClick={deleteHandler}></DeleteIcon>
          </div>
          <div className="authordelay">
            <div>Posted by :</div>
          </div>
        </div>
      </td>
    </table>
  );
};

export default DelayItem;
