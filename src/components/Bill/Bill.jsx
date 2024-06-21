// src/components/Bill/Bill.js
import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import jsPDF from 'jspdf';
import logo from '../../logo/logoblack.png';
import './bill.css';

const Bill = ({ open, onClose, billDetails }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.addImage(logo, 'PNG', 10, 10, 50, 30);
    doc.text("Package Bill", 20, 50);
    doc.text(`Package ID: ${billDetails.packageID}`, 20, 60);
    doc.text(`Bus Registration Number: ${billDetails.busRegNo}`, 20, 70);
    doc.text(`Departure Time: ${billDetails.departureTime}`, 20, 80);
    doc.text(`Arrival Time: ${billDetails.arrivalTime}`, 20, 90);
    doc.text(`Bus Conductor Contact: ${billDetails.conductorContact}`, 20, 100);
    doc.save("bill.pdf");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogContent>
        <div className="invoice-container">
          <div className="invoice-header">
            <img src={logo} alt="Company Logo" className="company-logo" />
          </div>
          <div className="invoice-details">
            <p><strong>Package ID:</strong> {billDetails.packageID}</p>
            <p><strong>Bus Registration Number:</strong> {billDetails.busRegNo}</p>
            <p><strong>Departure Time from {billDetails.start} :</strong> {billDetails.departureTime}</p>
            
            <p><strong>Contact:</strong> {billDetails.conductorContact}</p>

          <p>Please Bring the Package before the departure time.</p>
          <p>The payement should be done to the conductor.</p>
          </div>
          <Button variant="contained" onClick={handleDownloadPDF} className="download-button">Download PDF</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Bill;
