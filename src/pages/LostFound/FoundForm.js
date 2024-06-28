import React, { useState, useEffect } from "react";
import MyForm from "../../components/LostAndFound/MyForm";
import backlost from "../../images/lostback.jpg";

export default function LostForm() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 800;

  const containerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    height: "100vh",
    width: "100%",
  };

  const backgroundImageStyle = {
    flex: "0 0 40%",
    backgroundImage: `url(${backlost})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: isMobile ? "none" : "block",
  };

  const formContainerStyle = {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundImageStyle}></div>
      <div style={formContainerStyle}>
        <MyForm
          lostorfound={"Lost"}
          url={`/lostandfound/lostfoundreport2`}
          heading="Report Found Item"
          APIurl="http://localhost:8080/found"
          navigateURL="/lostandfound/founditem"
        />
      </div>
    </div>
  );
}
