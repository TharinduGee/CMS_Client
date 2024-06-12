import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import {useState, useEffect} from 'react';
import { useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import BackButton from '../../components/backButton';
import NavBar from "../../components/navBar";




export default function OutlinedCard() {

     const [cargoinfo, setCargoinfo] = useState({_id:3433});
     const [loading, setLoading] = useState(false);
     const {id} = useParams()

     useEffect(()=>{
          setLoading(true);
          axios
         .get(`http://localhost:3030/api/cargoes/${id}`)
         .then((res) => {
           setCargoinfo(res.data);

         })
         .catch((error) => {
           setLoading(false);
           console.log(error);
           
          
           
         });
     },[cargoinfo]);

  return (
     <div>
          <NavBar/>
          <br/>
          <BackButton></BackButton>
          <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
           
           <Card sx={{ minWidth: 300 }} variant="outlined" >
           <CardContent >
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {cargoinfo._id}
      </Typography>
      <Typography  variant="h5" component="div">
      {cargoinfo.name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
      {cargoinfo.description}
      </Typography>
      <Typography sx={{ mb: 1.5 }} variant="body2">
      Stored by : {cargoinfo.storedBy}
      </Typography>
      <Typography sx={{ mb: 1.5 }} variant="body2">
      Stored At : {cargoinfo.storeID}
      </Typography>
      <Typography sx={{ mb: 1.5 }} variant="body2">
      {cargoinfo.createdAt}
      </Typography>
      <Typography variant="body2">
      Handling Fee :  {cargoinfo.amount} $
      </Typography>
    </CardContent>

                </Card>
           
      </Grid>
     </div>
     
    
  );
}