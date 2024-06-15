import React, { useState } from "react";
import MyForm from "../../components/LostAndFound/MyForm";

export default function LostForm() {


  return (
   
     
        <MyForm lostorfound={"Found"} url={`/lostandfound/lostfoundreport`} heading="Report Lost Item" APIurl="http://localhost:8080/lost" navigateURL="/lostandfound/lostitem"/>
      
  
  );
}


