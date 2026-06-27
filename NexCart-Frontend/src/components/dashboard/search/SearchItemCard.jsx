import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, IconButton, Rating, Stack, Typography } from '@mui/material'
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { addOrderItem, removeOrderItem, updateOrderQuantiy } from '../../../features/CartSlice'

const SearchItemCard = ({ product }) => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.items)

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
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                bgcolor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 3,
                p: 2,
                mb: 2,
            }}
        >
            {/* Product image */}
            <Link to={`/app/products/${product.productId}`}>
                <Box sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2, width: { xs: '100%', sm: 160 }, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box component="img" src={product.imageUrl} alt={product.name} sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </Box>
            </Link>

            {/* Product details */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="h6" fontWeight={700}>{product.name}</Typography>

                <Stack direction="row" gap={1} alignItems="center">
                    <Typography color="text.secondary" fontSize={14}>Brand:</Typography>
                    <Typography fontWeight={600} fontSize={14}>{product.brand}</Typography>
                </Stack>

                <Stack direction="row" gap={1} alignItems="center">
                    <Rating value={product.rating} readOnly size="small" />
                    <Typography fontWeight={600} fontSize={13}>({product.rating})</Typography>
                </Stack>

                <Typography fontWeight={700} fontSize={18} color="primary.main" mt={0.5}>
                    {product.price}
                </Typography>

                <Typography color="text.secondary" fontSize={13} sx={{ display: { xs: 'none', md: 'block' }, mt: 0.5 }} noWrap>
                    {product.description}
                </Typography>

                {/* Add to cart controls */}
                <Box mt={1}>
                    {count === 0 ? (
                        <Button variant="contained" size="small" onClick={handleAdd}>Add to Cart</Button>
                    ) : (
                        <Stack direction="row" gap={1.5} alignItems="center">
                            <IconButton size="small" onClick={handleRemove} sx={{ bgcolor: '#fee2e2', borderRadius: 2 }}>
                                <RemoveIcon fontSize="small" sx={{ color: '#ef4444' }} />
                            </IconButton>
                            <Typography fontWeight={600}>{count}</Typography>
                            <IconButton size="small" onClick={handleAdd} sx={{ bgcolor: 'primary.main', color: '#fff', borderRadius: 2, '&:hover': { bgcolor: 'primary.dark' } }}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default SearchItemCard