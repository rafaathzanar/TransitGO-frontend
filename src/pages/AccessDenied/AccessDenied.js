import React from 'react'

function AccessDenied() {
  return (
    <div
    style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
    }} 
    >
        <h2
        style={{
            fontWeight: "bold",
            opacity: "0.4",
            fontSize: "50px"
        }}
        >403 - Access Denied</h2>
        <h6>You do not have permission to view this page.</h6>
    </div>
  )
}

export default AccessDenied