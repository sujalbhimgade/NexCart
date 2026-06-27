import React from 'react'
import { Box, Typography } from '@mui/material'
import CartReview from './CartReview'

const Cart = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>My Cart</Typography>
      <CartReview />
    </Box>
  )
}

export default Cart