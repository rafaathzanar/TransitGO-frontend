import { Grid } from "@mui/material";
import React from "react";
import "./Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Footer() {
  return (
    <div>
      <div className="Footer">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-8 col-12 ft-1">
              <h3>
                <span>TRANSITGO</span>
              </h3>
              <p>
                Transforming Bus Travel in Srilanka with Real-Time Updates,
                Community Engagement and Enhanced Passenger Services
              </p>
              <div className="footer-icons">
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-linkedin-in"></i>
              </div>
            </div>

            <div className="col-md-4 col-lg-3 col-12 mt-5 mt-md-0 ft-3">
              <h5>Contact Info</h5>
              <p>
                <i class="fa-solid fa-phone-volume"></i> 0542050185
              </p>
              <p>
                <i class="fa-solid fa-envelope"></i> TransitGo@gmail.com
              </p>
              <p>
                <i class="fa-solid fa-paper-plane"></i> Colombo, SriLanka.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="Last-footer">
        <p> All Rights Reserved @ transitGo.</p>
      </div>
    </div>
  );
}
