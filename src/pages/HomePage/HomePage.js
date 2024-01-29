import HeaderBar from "../../components/HeaderBar/HeaderBar";
import CardButton from "../../components/CardButton/CardButton";
import React from "react";
import Icon1 from "../../logo/busschimg.png";
import Icon2 from "../../logo/lostimg.png";
import Icon3 from "../../logo/packimg.png";
import Icon4 from "../../logo/announceimg.png";

function HomePage() {
  return (
    <div>
      <HeaderBar></HeaderBar>
      <CardButton
        typography="Bus Schedules"
        icon={Icon1}
        onClick={() => console.log("Button clicked!")}
      />
      <CardButton
        typography="Lost/Found"
        icon={Icon2}
        onClick={() => console.log("Button clicked!")}
      />
      <CardButton
        typography="Package Transfer"
        icon={Icon3}
        onClick={() => console.log("Button clicked!")}
      />
      <CardButton
        typography="Delay Reports Announcements"
        icon={Icon4}
        onClick={() => console.log("Button clicked!")}
      />
    </div>
  );
}

export default HomePage;
