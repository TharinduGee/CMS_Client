import * as React from "react";
import { useState} from "react";
import BackButton from "../../components/backButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {useSnackbar} from 'notistack';
import axios from "axios";
import NavBar from "../../components/navBar";

function NewEmployee(id, firstname, lastname, address, salary) {
  return { id, firstname, lastname, address, salary };
}

const AddEmployee = () => {
  const [id, setId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleSaveEmployee = () => {
    const data = NewEmployee(id, firstname, lastname, address, salary);

    setLoading(true);
    axios
      .post(`http://localhost:3030/api/employees/new`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Record added successfully', {variant: 'success'});
        navigate("/employee/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        enqueueSnackbar("Error", { variant: 'error' });
      });
  };
  return (
    <div className="p-4">
      <NavBar></NavBar>
      <br/>
      <BackButton />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <form autoComplete="off" Validate>
          <h1 className="text-3xl my-4 ">Add New employee</h1>

          <TextField
            label="Employee ID"
            variant="outlined"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="First name"
            variant="outlined"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Last name"
            variant="outlined"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            variant="outlined"
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Salary ($)"
            variant="outlined"
            type="number"
            value={salary}
            required
            onChange={(e) => setSalary(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"  
            onClick={handleSaveEmployee}
            color="primary"
          >
            Save
          </Button>
        </form>
      </Grid>
    </div>
  );
};

export default AddEmployee;
