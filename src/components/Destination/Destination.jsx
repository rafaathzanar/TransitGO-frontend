import React from 'react'
import {Timeline,TimelineItem,TimelineSeparator,TimelineConnector,TimelineContent,TimelineDot} from '@mui/lab';
const Destination = () => {
  return (
    <div>
      <Timeline>
        <TimelineItem>
            <TimelineSeparator>
                <TimelineDot/>
                <TimelineConnector/>            
            </TimelineSeparator>
            <TimelineContent>In process-recipient city<br/>Galle</TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineSeparator>
                <TimelineDot/>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent>Current Near Station <br/>Dehiwala</TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineSeparator>
                <TimelineDot/>
            </TimelineSeparator>
            <TimelineContent>Sent from Pettah <br/> Pettah,Colombo</TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  )
}

export default Destination




