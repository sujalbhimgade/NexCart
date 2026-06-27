import React, { useState } from 'react'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeOrderItem } from '../../features/CartSlice'
import { useAuth } from '../hooks/useProvideAuth'
import axios from 'axios'
import CartReviewCard from './CartReviewCard'
import CartAddressForm from './CartAddressForm'
import BillingDetails from './BillingDetails'

const CartReview = () => {
  const cartItems = useSelector((state) => state.cart.items)
  const { user } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [address, setAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    zipCode: '',
    city: '',
    state: '',
  })

  const handleRemove = (id) => {
    dispatch(removeOrderItem({ id }))
  }

  const handleBrowseProducts = () => {
    navigate('/app')
  }

  // Checks if any field in the address form is still empty
  const isAddressIncomplete = () => {
    return Object.values(address).some((val) => val.trim() === '')
  }

  const confirmTheOrder = () => {
    if (isAddressIncomplete()) {
      alert('Please fill in your shipping address before placing the order.')
      return
    }
    completeOrder()
  }

  const completeOrder = () => {
    // Backend only needs productId + quantity, not price
    const orderItems = cartItems.map(({ productId, quantity }) => ({ productId, quantity }))

    const order = {
      userId: user.id,
      shippingAddress: address,
      orderItems,
      paymentMethod: 'CREDIT/DEBIT CARD',
    }

    axios.post('/api/order', order, {
      headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }
    }).then(() => {
      navigate('/app', { state: { from: 'completedOrder' } })
    })
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" fontWeight={700} mb={1}>Your cart is empty</Typography>
        <Typography color="text.secondary" mb={3}>Looks like you haven't added anything yet.</Typography>
        <Button variant="contained" onClick={handleBrowseProducts}>Browse Products</Button>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>

      {/* Left: cart items */}
      <Stack gap={2} sx={{ width: { xs: '100%', md: '60%' } }}>
        {cartItems.map((item) => (
          <Paper key={item.productId} sx={{ border: '1px solid #e2e8f0' }}>
            <CartReviewCard item={item} handleRemove={handleRemove} />
          </Paper>
        ))}
        <Button variant="outlined" onClick={handleBrowseProducts}>Add More Products</Button>
      </Stack>

      {/* Right: address + billing */}
      <Stack gap={2} sx={{ width: { xs: '100%', md: '40%' } }}>
        <CartAddressForm address={address} setAddress={setAddress} />
        <BillingDetails confirmTheOrder={confirmTheOrder} />
      </Stack>

    </Box>
  )
}

export default CartReview

