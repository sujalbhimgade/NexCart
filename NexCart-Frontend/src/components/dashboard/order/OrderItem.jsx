import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'
import OrderStepper from './OrderStepper'

const shippingFee = 50
const discount = 18

// Maps backend order status to a step index for the stepper
const statusToStep = {
    CONFIRMED: 0,
    SHIPPED: 1,
    DELIVERED: 2,
}

const OrderItem = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        axios.get(`/api/order/${id}`, {
            headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }
        }).then((res) => {
            setOrder(res.data)
        })
    }, [id])

    if (!order) return null

    const jsDate = new Date(order.orderDate)
    const formattedDate = jsDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    const formattedTime = jsDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    const address = order.shippingAddress

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

            <OrderStepper activeStep={statusToStep[order.orderStatus?.toUpperCase()] ?? 0} />

            {/* Order items list */}
            <Paper sx={{ border: '1px solid #e2e8f0' }}>
                <Stack direction="row" justifyContent="space-between" sx={{ bgcolor: '#f8fafc', p: 2 }}>
                    <Typography fontWeight={600}>Order #{order.orderId}</Typography>
                    <Typography color="text.secondary">Placed on {formattedDate}, {formattedTime}</Typography>
                </Stack>

                {order.orderItems?.map((item) => (
                    <Stack
                        key={item.product.productId}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={2}
                        sx={{ p: 2, borderBottom: '1px solid #f1f5f9' }}
                    >
                        <Box sx={{ width: 60, height: 60, bgcolor: '#f8fafc', borderRadius: 2, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box component="img" src={item.product.imageUrl} alt={item.product.name} sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </Box>

                        <Typography fontWeight={600} sx={{ flex: 1 }} noWrap>{item.product.name}</Typography>

                        <Typography color="text.secondary" fontSize={14} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            ${item.product.price} x {item.quantity}
                        </Typography>

                        <Typography fontWeight={700} color="primary.main">
                            ${item.product.price * item.quantity}
                        </Typography>
                    </Stack>
                ))}
            </Paper>

            {/* Address + summary */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>

                <Paper sx={{ flex: 1, p: 3, border: '1px solid #e2e8f0' }}>
                    <Typography fontWeight={700} mb={1}>Shipping Address</Typography>
                    <Typography color="text.secondary" fontSize={14}>
                        {address?.addressLine1}, {address?.addressLine2}, {address?.city}, {address?.state} - {address?.zipCode}
                    </Typography>
                </Paper>

                <Paper sx={{ flex: 1, p: 3, border: '1px solid #e2e8f0' }}>
                    <Typography fontWeight={700} mb={2}>Total Summary</Typography>
                    <Stack gap={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography color="text.secondary">Subtotal</Typography>
                            <Typography fontWeight={600}>${order.totalAmount}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography color="text.secondary">Shipping Fee</Typography>
                            <Typography fontWeight={600}>${shippingFee}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography color="text.secondary">Discount</Typography>
                            <Typography fontWeight={600} color="success.main">-${discount}</Typography>
                        </Stack>
                        <Divider sx={{ my: 1 }} />
                        <Stack direction="row" justifyContent="space-between">
                            <Typography fontWeight={700} fontSize={18}>Total</Typography>
                            <Typography fontWeight={700} fontSize={18} color="primary.main">
                                ${order.totalAmount + shippingFee - discount}
                            </Typography>
                        </Stack>
                        <Typography color="text.secondary" fontSize={13} mt={1}>Paid via {order.paymentMethod}</Typography>
                    </Stack>
                </Paper>

            </Box>
        </Box>
    )
}

export default OrderItem
