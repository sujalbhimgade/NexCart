import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AlertSnackBar = ({ message, severity}) => {
    const [open, setOpen] = React.useState(true);

    
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
   console.log("Called snack");
   
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
  <Alert
    onClose={handleClose}
    severity={severity}
    variant="filled"
    sx={{ width: '100%' }}
  >
    {message}
  </Alert>
</Snackbar>
  )
}

export default AlertSnackBar