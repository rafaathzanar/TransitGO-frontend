import React from "react";
import CardBox from '../../components/CardBox';
import Typography from '@mui/material/Typography';
import img1 from '../../images/LostAnno.png'
import img2 from '../../images/FoundAnno.png'
import img3 from '../../images/Report.png'


export default function LostFound() {
    return (
      <div>
       <Typography
           variant="h2"
           align="center"
           marginTop='50px'
           sx={{
             fontSize: 32,
            }}>
          Get Your Things Back with 
        </Typography>

        <Typography
           variant="h2"
           align="center"
           sx={{
             fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'OpenSans', }}>
          Lost&Found
        </Typography>

      <div style={{display:'flex',alignItems:'center',marginTop:'75px'}}>
        <CardBox icon={img1} typography={'Lost Announcement'}  />

        <CardBox icon={img2} typography={"Found Announcement"}  />

        <CardBox icon={img3} typography={"Report Lost/Found"} />
      </div>
      </div>
    )
  }



