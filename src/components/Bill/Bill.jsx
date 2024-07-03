// src/components/Bill/Bill.js
import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import jsPDF from 'jspdf';
import logo from '../../logo/logoblack.png';
import './bill.css';

const Bill = ({ open, onClose, billDetails }) => {
  console.log("bill details", billDetails);
  
  const handleDownloadPDF = () => {
    const doc = new jsPDF('l', 'in', [6, 13]);
    
    const pageWidth = 20; 
    const centerX = pageWidth / 2;
    
  
    const imgWidth = 2; 
    const imgHeight = 0.8; 
    doc.addImage(logo, 'PNG', 0.5, 0.5, imgWidth, imgHeight);
    
    // Title
    doc.setFontSize(18);
    doc.text("Invoice", centerX, 2, { align: 'center' });

 
    doc.setFontSize(12);
    let yPos = 3; // Starting y position
    const lineHeight = 0.25; // Line height in inches
    doc.text(`Package ID: ${billDetails.packageID}`, 1, yPos);
    yPos += lineHeight;
    doc.text(`Bus Registration Number: ${billDetails.busRegNo}`, 1, yPos);
    yPos += lineHeight;
    doc.text(`Bus Departure Time from ${billDetails.start}: ${billDetails.departureTime}`, 1, yPos);
    yPos += lineHeight;
    doc.text(`Bus Conductor Contact: ${billDetails.conductorContact}`, 1, yPos);
    yPos += lineHeight;
    doc.text(`Bus Conductor Name: ${billDetails.conductorName}`, 1, yPos);
    yPos += lineHeight;
    doc.text(`Destination: ${billDetails.destination}`, 1, yPos);
    yPos += lineHeight;
    doc.text(`Arrival Time at Destination: ${billDetails.arrivalTime}`, 1, yPos);
    yPos += lineHeight;

    // Footer note
    doc.setFontSize(10);
    doc.text(
      `Please note that your package will reach your destination at the mentioned arrival time.`,
      1, yPos + lineHeight
    );

    // Save the PDF
    doc.save("invoice.pdf");
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
            <p><strong>Conductor: </strong>{billDetails.conductorName}</p>
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
