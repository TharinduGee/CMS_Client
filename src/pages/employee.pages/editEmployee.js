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

function NewEmployee(id, firstname, lastname, address, salary) {
     return { id, firstname, lastname, address, salary };
}
   
const EditEmployee = () => {
     const [empID, setEmpID] = useState("");
     const [firstname, setFirstname] = useState("");
     const [lastname, setLastname] = useState("");
     const [address, setAddress] = useState("");
     const [salary, setSalary] = useState(0);
     const [loading, setLoading] = useState(false);
     const {id} = useParams();
     const navigate = useNavigate();
     const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3030/api/employees/${id}`)
      .then((res) => {
          console.log(res);
        setLoading(false);
        setEmpID(res.data.id);
        setFirstname(res.data.firstname);
        setLastname(res.data.lastname);
        setAddress(res.data.address);
        setSalary(res.data.salary);
        console.log(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        enqueueSnackbar("Error", { variant: "error" });
      });
  }, []);

  const handleEditEmployee = () => {
    const data = NewEmployee(empID, firstname, lastname, address, salary);
     console.log(data.empID);
    setLoading(true);
    axios
      .put(`http://localhost:3030/api/employees/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Record Edited Successfully", { variant: "success" , autoHideDuration: "2000"} );
        navigate("/employee/");
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
         <h1 className="text-3xl my-4 ">Edit Employee Record</h1>

         <TextField
           label="Employee ID"
           variant="outlined"
           type="text"
           value={empID}
           onChange={(e) => setEmpID(e.target.value)}
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
           onClick={handleEditEmployee}
           color="primary"
         >
           Save
         </Button>
       </form>
     </Grid>
   </div>
  );
};

export default EditEmployee;
