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

function NewCargo(name, description, storedBy, storeID, status, amount) {
  return { name, description, storedBy, storeID, status, amount };
}

const AddCargo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [storedBy, setStoredBy] = useState("");
  const [storeID, setStoreID] = useState("");
  const [status, setStatus] = useState("In store");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleSaveVoter = () => {
    const data = NewCargo(name, description, storedBy, storeID, status, amount);

    const saveCargo = ()=>{
      setLoading(true);
    axios
      .post(`http://localhost:3030/api/cargoes/new`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Record added successfully', {variant: 'success'});
        navigate("/cargo");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        enqueueSnackbar("Error", { variant: 'error' });
      });
    }

    axios
      .get(`http://localhost:3030/api/employees/find/${storedBy}`)
      .then((res) => {
        if(!res.data){
          enqueueSnackbar("Invalid Employee ID", { variant: 'error' });
          
        }
        saveCargo();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        enqueueSnackbar("Invalid Employee ID", { variant: 'error' });
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
          <h1 className="text-3xl my-4 ">Add New Cargo</h1>

          <TextField
            label="Name"
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Discription"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Store ID"
            variant="outlined"
            type="text"
            value={storeID}
            required
            onChange={(e) => setStoreID(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Store By"
            variant="outlined"
            type="text"
            value={storedBy}
            required
            onChange={(e) => setStoredBy(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Handling fee ($)"
            variant="outlined"
            type="number"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            
            onClick={handleSaveVoter}
            color="primary"
          >
            Save
          </Button>
        </form>
      </Grid>
    </div>
  );
};

export default AddCargo;
