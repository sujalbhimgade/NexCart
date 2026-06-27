import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function MakeOrderDialog({ open, handleClose, handleConfirmOrder }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: 700 }}>Confirm your order</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to place this order? You can track it from the Orders page once placed.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} variant="outlined">Cancel</Button>
        <Button onClick={handleConfirmOrder} variant="contained" autoFocus>Confirm Order</Button>
      </DialogActions>
    </Dialog>
  )
}

