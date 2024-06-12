import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const snackBar = ()=>{
     const [open, setOpen] = useState(true);

 

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

     return(
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
          </Snackbar>
     );
     

}



export default snackBar;