import React, { useState } from 'react'
import { Box, Typography, IconButton, Chip, Rating, Stack } from '@mui/material'
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addOrderItem, removeOrderItem, updateOrderQuantiy } from '../../../features/CartSlice'

const ItemCard = ({ item }) => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.items)

    const cartItem = cartItems.find((p) => p.productId === item.productId)
    const [count, setCount] = useState(cartItem ? cartItem.quantity : 0)

    const handleAdd = () => {
        if (count === 0) {
            dispatch(addOrderItem({ id: item.productId, price: item.price }))
        } else {
            dispatch(updateOrderQuantiy({ id: item.productId, quantity: count + 1 }))
        }
        setCount((prev) => prev + 1)
    }

    const handleRemove = () => {
        if (count - 1 === 0) {
            dispatch(removeOrderItem({ id: item.productId }))
        } else {
            dispatch(updateOrderQuantiy({ id: item.productId, quantity: count - 1 }))
        }
        setCount((prev) => prev - 1)
    }

    return (
        <Box
            sx={{
                // Responsive width: 2 cards per row on mobile, 3 on tablet, 4 on desktop
                width: {
                    xs: 'calc(50% - 8px)',
                    sm: 'calc(33.33% - 11px)',
                    md: 'calc(25% - 12px)',
                    lg: 'calc(20% - 13px)',
                },
                bgcolor: '#fff',
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s, transform 0.2s',
                '&:hover': { boxShadow: '0 8px 24px rgba(99,102,241,0.12)', transform: 'translateY(-3px)' },
            }}
        >
            {/* Product image */}
            <Link to={`/app/products/${item.productId}`}>
                <Box sx={{ position: 'relative', bgcolor: '#f8fafc', p: 1.5, textAlign: 'center' }}>
                    {item.discountPercent > 0 && (
                        <Chip
                            label={`${item.discountPercent}% OFF`}
                            size="small"
                            sx={{ position: 'absolute', top: 6, left: 6, bgcolor: '#ef4444', color: '#fff', fontWeight: 600, fontSize: 10 }}
                        />
                    )}
                    <Box
                        component="img"
                        src={item.imageUrl}
                        alt={item.name}
                        sx={{ height: { xs: 100, md: 130 }, objectFit: 'contain', width: '100%' }}
                    />
                </Box>
            </Link>

            {/* Product info */}
            <Box sx={{ p: 1.2 }}>
                <Typography fontWeight={600} fontSize={{ xs: 12, md: 13 }} noWrap mb={0.3}>
                    {item.name}
                </Typography>

                <Rating value={item.rating} readOnly size="small" sx={{ mb: 0.5, fontSize: { xs: 14, md: 16 } }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    {/* Just show price as-is from backend — no hardcoded currency symbol */}
                    <Typography fontWeight={700} color="primary.main" fontSize={{ xs: 13, md: 15 }}>
                       $ {item.price}
                    </Typography>

                    {count === 0 ? (
                        <IconButton
                            size="small"
                            onClick={handleAdd}
                            sx={{ bgcolor: 'primary.main', color: '#fff', borderRadius: 2, p: 0.5, '&:hover': { bgcolor: 'primary.dark' } }}
                        >
                            <AddIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                        </IconButton>
                    ) : (
                        <Stack direction="row" alignItems="center" gap={0.3}>
                            <IconButton size="small" onClick={handleRemove} sx={{ bgcolor: '#fee2e2', borderRadius: 2, p: 0.4 }}>
                                <RemoveIcon sx={{ fontSize: 14, color: '#ef4444' }} />
                            </IconButton>
                            <Typography fontWeight={600} fontSize={13} minWidth={18} textAlign="center">
                                {count}
                            </Typography>
                            <IconButton size="small" onClick={handleAdd} sx={{ bgcolor: 'primary.main', color: '#fff', borderRadius: 2, p: 0.4, '&:hover': { bgcolor: 'primary.dark' } }}>
                                <AddIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                        </Stack>
                    )}
                </Stack>
            </Box>
        </Box>
    )
}

export default ItemCard