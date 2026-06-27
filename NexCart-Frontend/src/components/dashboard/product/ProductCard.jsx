import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'
import axios from 'axios'
import ProductItemCard from './ProductItemCard'

const ProductCard = () => {
    const { productId } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.get(`/api/product/${productId}`, {
            headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }
        }).then((res) => {
            setProduct(res.data)
        })
    }, [productId])

    // Show a loader until product data arrives
    if (!product) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress />
            </Box>
        )
    }

    return <ProductItemCard product={product} />
}

export default ProductCard
