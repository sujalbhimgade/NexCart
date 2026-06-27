import React from 'react'
import { Paper, Stack, TextField, Typography, Grid } from '@mui/material'

const CartAddressForm = ({ address, setAddress }) => {

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setAddress((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Paper sx={{ p: 2.5 }}>
      <Typography fontWeight={700} mb={2}>Shipping Address</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth size="small" label="Address Line 1"
            name="addressLine1" value={address.addressLine1} onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth size="small" label="Address Line 2"
            name="addressLine2" value={address.addressLine2} onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth size="small" label="City"
            name="city" value={address.city} onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth size="small" label="State"
            name="state" value={address.state} onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth size="small" label="Zip Code"
            name="zipCode" value={address.zipCode} onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CartAddressForm

