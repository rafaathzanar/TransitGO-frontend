import React from "react";

import DelayItem from "../Delayitem/DelayItem";
import "./DelayList.css";

const DelayList = (props) => {
  return (
    <ul className="goal-listxs">
      {props.items.map((delay) => (
        <DelayItem key={delay.id} id={delay.id} onDelete={props.onDeleteItem}>
          {delay.text}
        </DelayItem>
      ))}
    </ul>
  );
};

export default DelayList;
