import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/backButton";
import NavBar from "../../components/navBar";

export default function OutlinedCard() {
  const [employeeinfo, setEmployeeinfo] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3030/api/employees/${id}`)
      .then((res) => {
        //console.log(res.data)
        setEmployeeinfo(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("An error happened. Please Check console");
      });
  },[employeeinfo]);

  return (
    <div>
      <NavBar />
      <br />
      <BackButton></BackButton>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Card sx={{ minWidth: 300 }} variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {employeeinfo.id}
            </Typography>
            <Typography  sx={{ mb: 1.5 }} variant="h5" component="div">
            {employeeinfo.firstname} {employeeinfo.lastname}
            </Typography>
            <Typography sx={{ mb: 0 }} color="text.secondary">
              Address :{employeeinfo.address}
            </Typography>
            <Typography sx={{ mb: 0 }} variant="body1" color="text.secondary">
              Salary : {employeeinfo.salary} $
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
