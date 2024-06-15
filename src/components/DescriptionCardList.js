// // DescriptionCardList.js
// import React, { useEffect, useState } from "react";
// import DescriptionCard from "./DescriptionCard";
// import axios from "axios";
// import { set } from "react-hook-form";

// const DescriptionCardList = ({ data }) => {

// const[items, setitems]=useState([]);

// useEffect(()=>
// {
//  loadItems();
// },[])


// const loadItems=async ()=>{
//   const result=await axios.get("http://localhost:8080/founds");
  
//   setitems(result.data);
// }
//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       {items.map((item, index) => (


//    <DescriptionCard
//           key={index} // Make sure to provide a unique key for each card
//           Uname={item.Uname}
//           numb={item.numb}
//           bus={item.bus}
//           desc={item.desc}
//           dateTime={item.dateTime}
//       /> 
//       ))}
//     </div>
//   );
// };

// export default DescriptionCardList;
