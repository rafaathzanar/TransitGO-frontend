import React, { useState } from "react";
import MyForm from "../../components/LostAndFound/MyForm";

export default function LostForm() {


  return (
   
     
        <MyForm lostorfound={"Lost"} url={`/lostandfound/lostfoundreport2`} heading="Report Found Item" APIurl="http://localhost:8080/found" navigateURL="/lostandfound/founditem"/>
      

  );
}


