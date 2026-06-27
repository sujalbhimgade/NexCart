import React, { useState } from 'react'
import { Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import MakeOrderDialog from './MakeOrderDialog'

const BillingDetails = ({ confirmTheOrder }) => {
  const [open, setOpen] = useState(false)
  const cartItems = useSelector((state) => state.cart.items)

  const shipping = cartItems.length > 0 ? 4.99 : 0
  const tax = 6.99
  const discount = 3.99

  const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const total = subTotal + shipping + tax - discount

  const handleClose = () => setOpen(false)
  const handleMakeOrder = () => setOpen(true)

  const handleConfirmOrder = () => {
    setOpen(false)
    confirmTheOrder()
  }

  return (
    <Paper sx={{ p: 2.5 }}>
      <Typography fontWeight={700} mb={2}>Order Summary</Typography>

      <Stack gap={1}>
        <Row label="Subtotal" value={`$${subTotal}`} />
        <Row label="Shipping" value={shipping ? `$${shipping}` : '-'} />
        <Row label="Tax" value={`$${tax}`} />
        <Row label="Discount" value={`-$${discount}`} highlight />
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Row label="Total" value={`$${total}`} bold />

      <Button variant="contained" fullWidth size="large" sx={{ mt: 3 }} onClick={handleMakeOrder}>
        Place Order
      </Button>

      {open && (
        <MakeOrderDialog open={open} handleClose={handleClose} handleConfirmOrder={handleConfirmOrder} />
      )}
    </Paper>
  )
}

// Small row component to avoid repeating the same layout
const Row = ({ label, value, bold, highlight }) => (
  <Stack direction="row" justifyContent="space-between">
    <Typography fontWeight={bold ? 700 : 400} fontSize={bold ? 18 : 14} color={bold ? 'text.primary' : 'text.secondary'}>
      {label}
    </Typography>
    <Typography fontWeight={bold ? 700 : 500} fontSize={bold ? 18 : 14} color={highlight ? 'success.main' : 'text.primary'}>
      {value}
    </Typography>
  </Stack>
)

export default BillingDetails