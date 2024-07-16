import React from "react";
import "./Mobile.css";
import Qr from "../../images/TransitGO.png";
import apple from "../../images/appstore.png";
import play from "../../images/playstore.png";

export default function Mobile() {
  return (
    <div>
      <div className="mobile">
        <div className="row">
          <div className="col-md-6 col-lg-7 col-12 ft-10">
            <img src={Qr} />
          </div>

          <div className="col-md-6 col-lg-5 col-12 mt-1 mt-md-0 ft-30">
            <div className="col-md-12 col-lg-12 col-12 mt-5 mt-md-0 ft-30">
              <h5>OUR FREE APP</h5>
              <p>
                One app for every step of your journey—Time planning has never
                been easier!
              </p>
            </div>
            <div>
             <a href="#"> <img src={play} /></a>
             <a href="#"><img src={apple} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
