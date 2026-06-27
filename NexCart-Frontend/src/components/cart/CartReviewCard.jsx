import React, { useEffect, useState } from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { Add as AddIcon, Remove as RemoveIcon, Close as CloseIcon } from '@mui/icons-material'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addOrderItem, removeOrderItem, updateOrderQuantiy } from '../../features/CartSlice'

const CartReviewCard = ({ item, handleRemove }) => {
    const [itemCount, setItemCount] = useState(item.quantity)
    const [product, setProduct] = useState(null)
    const dispatch = useDispatch()

    // Get full product details (name, image, price) for this cart item
    useEffect(() => {
        axios.get(`/api/product/${item.productId}`, {
            headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }
        }).then((res) => {
            setProduct(res.data)
        })
    }, [])

    const handleAdd = () => {
        dispatch(updateOrderQuantiy({ id: item.productId, quantity: itemCount + 1 }))
        setItemCount((prev) => prev + 1)
    }

    const handleRemoveOne = () => {
        if (itemCount > 1) {
            dispatch(updateOrderQuantiy({ id: item.productId, quantity: itemCount - 1 }))
            setItemCount((prev) => prev - 1)
        }
    }

    return (
        <Box sx={{ display: 'flex', gap: 2, p: 2, position: 'relative' }}>

            {/* Product image */}
            <Box sx={{ width: { xs: 80, md: 120 }, height: { xs: 80, md: 120 }, bgcolor: '#f8fafc', borderRadius: 2, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box component="img" src={product?.imageUrl} alt={product?.name} sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>

            {/* Product info */}
            <Box sx={{ flex: 1 }}>
                <Typography fontWeight={600} fontSize={15} mb={0.5} pr={4}>{product?.name}</Typography>
                <Typography color="text.secondary" fontSize={13} mb={1}>
                    ${product?.price} x {itemCount}
                </Typography>

                <Stack direction="row" gap={1} alignItems="center">
                    <IconButton
                        size="small"
                        onClick={handleRemoveOne}
                        disabled={itemCount <= 1}
                        sx={{ bgcolor: '#fee2e2', borderRadius: 2, '&.Mui-disabled': { bgcolor: '#f1f5f9' } }}
                    >
                        <RemoveIcon fontSize="small" sx={{ color: itemCount > 1 ? '#ef4444' : '#cbd5e1' }} />
                    </IconButton>

                    <Typography fontWeight={600}>{itemCount}</Typography>

                    <IconButton size="small" onClick={handleAdd} sx={{ bgcolor: 'primary.main', color: '#fff', borderRadius: 2, '&:hover': { bgcolor: 'primary.dark' } }}>
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Box>

            {/* Item total + remove button */}
            <Box sx={{ textAlign: 'right' }}>
                <IconButton size="small" onClick={() => handleRemove(item.productId)}>
                    <CloseIcon fontSize="small" />
                </IconButton>
                <Typography fontWeight={700} color="primary.main" mt={2}>
                    ${product ? product.price * itemCount : 0}
                </Typography>
            </Box>

        </Box>
    )
}

export default CartReviewCard

