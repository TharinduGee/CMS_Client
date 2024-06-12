import { Link } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

const BackButton = () => {
     let navigate = useNavigate()
  return (
     <div className='flex'>
          
               <Button onClick={() => navigate(-1)} variant="outlined"  startIcon={<ArrowBackIcon />}>
               </Button>
          
     </div>
     
     
  );
};

export default BackButton;