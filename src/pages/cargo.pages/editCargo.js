import * as React from "react";
import { useState, useEffect } from "react";
import BackButton from "../../components/backButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/navBar";

function NewCargo(name, description, storedBy, storeID, amount) {
  return { name, description, storedBy, storeID, amount };
}

const EditCargo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [storedBy, setStoredBy] = useState("");
  const [storeID, setStoreID] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3030/api/cargoes/${id}`)
      .then((res) => {
        setLoading(false);
        setName(res.data.name);
        setDescription(res.data.description);
        setStoreID(res.data.storeID);
        setStoredBy(res.data.storedBy);
        setAmount(res.data.amount);
        console.log(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("An error happened. Please Chack console");

        enqueueSnackbar("Error", { variant: "error" });
      });
  }, [name]);

  const handleEditVoter = () => {
    const data = NewCargo(name, description, storedBy, storeID, amount);

    setLoading(true);
    axios
      .put(`http://localhost:3030/api/cargoes/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Record Edited Successfully", { variant: "success" , autoHideDuration: "2000"} );
        navigate("/cargo/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("An error happened. Please Chack console");
        enqueueSnackbar("Error", { variant: "error" });
      });
  };
  return (
    <div className="p-4">
      <NavBar />
      <br></br>
      <BackButton />

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <form autoComplete="off" Validate>
          <h1 className="text-3xl my-4 ">Edit Cargo Info</h1>

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
            onChange={(e) => setStoreID(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Store By"
            variant="outlined"
            type="text"
            value={storedBy}
            onChange={(e) => setStoredBy(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Handling fee ($)"
            variant="outlined"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleEditVoter} color="primary">
            Save
          </Button>
        </form>
      </Grid>
    </div>
  );
};

export default EditCargo;
