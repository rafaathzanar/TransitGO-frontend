import React from "react";
import './heading.css';

export default function Heading(props) {
  return <span className="h1">{props.text}</span>;
}
