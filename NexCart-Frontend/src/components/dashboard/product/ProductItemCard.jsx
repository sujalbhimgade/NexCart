import React, { useState } from 'react'
import { Box, Button, Divider, IconButton, Rating, Stack, Typography, Chip } from '@mui/material'
import { Add as AddIcon, Remove as RemoveIcon, LocalShippingOutlined as LocalShippingOutlinedIcon } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { addOrderItem, removeOrderItem, updateOrderQuantiy } from '../../../features/CartSlice'

const ProductItemCard = ({ product }) => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.items)

    // Check if product is already in cart and start count from there
    const cartItem = cartItems.find((item) => item.productId === product.productId)
    const [count, setCount] = useState(cartItem ? cartItem.quantity : 0)

    const handleAdd = () => {
        if (count === 0) {
            dispatch(addOrderItem({ id: product.productId, price: product.price }))
        } else {
            dispatch(updateOrderQuantiy({ id: product.productId, quantity: count + 1 }))
        }
        setCount((prev) => prev + 1)
    }

    const handleRemove = () => {
        if (count - 1 === 0) {
            dispatch(removeOrderItem({ id: product.productId }))
        } else {
            dispatch(updateOrderQuantiy({ id: product.productId, quantity: count - 1 }))
        }
        setCount((prev) => prev - 1)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
                bgcolor: '#fff',
                borderRadius: 3,
                p: { xs: 2, md: 4 },
                border: '1px solid #e2e8f0',
                mb: 4,
            }}
        >
            {/* Left: product image */}
            <Box sx={{ flex: 1, bgcolor: '#f8fafc', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
                <Box
                    component="img"
                    src={product.imageUrl}
                    alt={product.name}
                    sx={{ width: '100%', maxHeight: 400, objectFit: 'contain' }}
                />
            </Box>

            {/* Right: product details */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>

                {product.discountPercent > 0 && (
                    <Chip label={`${product.discountPercent}% OFF`} size="small" sx={{ bgcolor: '#fee2e2', color: '#ef4444', fontWeight: 600, width: 'fit-content' }} />
                )}

                <Typography variant="h4" fontWeight={700}>{product.name}</Typography>

                <Stack direction="row" gap={1} alignItems="center">
                    <Typography color="text.secondary">Brand:</Typography>
                    <Typography fontWeight={600}>{product.brand}</Typography>
                </Stack>

                <Stack direction="row" gap={1} alignItems="center">
                    <Rating value={product.rating} readOnly size="small" />
                    <Typography fontWeight={600} fontSize={14}>({product.rating})</Typography>
                </Stack>

                <Typography variant="h4" fontWeight={700} color="primary.main">
                    ${product.price}
                </Typography>

                {/* Add to cart / quantity controls */}
                {count === 0 ? (
                    <Button variant="contained" size="large" onClick={handleAdd} sx={{ width: { xs: '100%', sm: 220 }, mt: 1 }}>
                        Add to Cart
                    </Button>
                ) : (
                    <Stack direction="row" gap={2} alignItems="center" mt={1}>
                        <IconButton onClick={handleRemove} sx={{ bgcolor: '#fee2e2', borderRadius: 2 }}>
                            <RemoveIcon sx={{ color: '#ef4444' }} />
                        </IconButton>
                        <Typography fontWeight={600} fontSize={18} minWidth={24} textAlign="center">{count}</Typography>
                        <IconButton onClick={handleAdd} sx={{ bgcolor: 'primary.main', color: '#fff', borderRadius: 2, '&:hover': { bgcolor: 'primary.dark' } }}>
                            <AddIcon />
                        </IconButton>
                    </Stack>
                )}

                {/* Delivery info */}
                <Stack direction="row" gap={1} alignItems="center" mt={1}>
                    <LocalShippingOutlinedIcon fontSize="small" color="primary" />
                    <Typography fontSize={14} color="text.secondary">Free delivery on orders above $60</Typography>
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Typography fontWeight={600} mb={0.5}>Description</Typography>
                <Typography color="text.secondary" fontSize={14}>
                    {product.description}
                </Typography>

            </Box>
        </Box>
    )
}

export default ProductItemCard