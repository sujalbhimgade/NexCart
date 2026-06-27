import React, { useEffect, useState } from 'react'
import { Box, Chip, IconButton, Paper, Stack, Typography } from '@mui/material'
import { ShoppingBagOutlined as ShoppingBagOutlinedIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useProvideAuth'
import axios from 'axios'

// Maps order status to a chip color
const statusColor = {
  DELIVERED: 'success',
  CONFIRMED: 'warning',
  SHIPPED: 'info',
  CANCELLED: 'error',
}

const Order = () => {
  const [orders, setOrders] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    axios.get(`/api/order/user/${user.id}`, {
      headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }
    }).then((res) => {
      setOrders(res.data)
    })
  }, [])

  return (
    <Box>
      <Stack direction="row" gap={1.5} alignItems="center" mb={3}>
        <ShoppingBagOutlinedIcon color="primary" />
        <Typography variant="h5" fontWeight={700}>My Orders</Typography>
      </Stack>

      {orders.length === 0 && (
        <Typography color="text.secondary">You haven't placed any orders yet.</Typography>
      )}

      <Stack gap={2}>
        {orders.map((order) => (
          <Link to={`${order.orderId}`} key={order.orderId} style={{ textDecoration: 'none' }}>
            <Paper sx={{ border: '1px solid #e2e8f0', '&:hover': { borderColor: 'primary.main' } }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                gap={1}
                sx={{ p: 2.5 }}
              >
                <Box>
                  <Typography fontSize={13} color="text.secondary">Order ID</Typography>
                  <Typography fontWeight={700}>#{order.orderId}</Typography>
                </Box>

                <Chip
                  label={order.orderStatus}
                  color={statusColor[order.orderStatus?.toUpperCase()] || 'default'}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />

                <Typography color="text.secondary" fontSize={14}>{order.orderDate}</Typography>

                <Typography fontWeight={700} color="primary.main">${order.totalAmount}</Typography>

                <IconButton size="small">
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Paper>
          </Link>
        ))}
      </Stack>
    </Box>
  )
}

export default Order
