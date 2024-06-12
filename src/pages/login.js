import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { useSnackbar } from "notistack";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
const data = {
     "email" : email,
     "password" : password
}
    axios
      .post(
        'http://localhost:3030/api/login',
        data
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        if (res.data.success) {
          setTimeout(() => {
            navigate("/cargo");
            enqueueSnackbar(`Welcome !`, { variant: "info" });
          }, 1000);
        } else {
            enqueueSnackbar("Please enter valid credentials", {
            variant: "error",
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("An error happened. Please Chack console");
        enqueueSnackbar("Error", { variant: "error" });
      });
  };

  const directSignupPage = () => {
    navigate("/signup");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Login</h1>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          autoComplete="email"
          autoFocus
          style={{ marginBottom: "10px", width: "300px" }}
        />
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          fullWidth
          autoComplete="current-password"
          style={{ marginBottom: "10px", width: "300px" }}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          fullWidth
          color="primary"
          style={{ marginBottom: "10px", width: "100px" }}
        >
          Log In
        </Button>
        <p>
          <span>Don't have an account test? </span>
          <Link
            component="button"
            variant="body1"
            onClick={directSignupPage}
            style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </Grid>
  );
};

export default Login;
