import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';

const DeleteCargo = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [open , setOpen] = useState(true);
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
  
    const handleDeleteCargo = () => {
      setLoading(false);
      axios
        .delete(`http://localhost:3030/api/cargoes/${id}`)
        .then(() => {
          setLoading(false);
          console.log({messege:"Success"});
          setOpen(false)
          enqueueSnackbar('Cargo Deleted successfully', { variant: 'success' });
          navigate('/cargo/');
        })
        .catch((error) => {
          setLoading(false);
          alert('An error happened. Please Chack console');
          enqueueSnackbar('Error', { variant: 'error' });
          console.log(error);
        });
    };

    const handleClose = () =>{
      setOpen(false);
      navigate('/cargo/');
    };
    

    return (
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>Are you sure you want to delete this record?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{color: "red" }} color="primary" >
          No
        </Button>
        <Button onClick={handleDeleteCargo} color="primary" variant="contained" >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
    )
  }
  
  export default DeleteCargo;