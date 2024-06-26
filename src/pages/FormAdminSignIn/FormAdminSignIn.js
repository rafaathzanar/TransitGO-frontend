import React, { useState } from "react";

const FormAdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log("Forgot Password clicked");
  };

  return (
    <div style={styles.container}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      <button onClick={handleForgotPassword} style={styles.forgotButton}>
        Forgot Password
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  forgotButton: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "transparent",
    color: "#007BFF",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default FormAdminSignIn;
