import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Divider } from '@mui/material'
import axios from 'axios'
import ProductCard from './ProductCard'
import ItemCard from '../cards/ItemCard'

const Product = () => {
  const { productId } = useParams()
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    // Just showing some random products as "You may also like"
    axios.get('/api/product/random', {
      headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }
    }).then((res) => setRelatedProducts(res.data))
  }, [productId])

  return (
    <Box>
      <ProductCard />

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" fontWeight={700} mb={2}>You may also like</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        {relatedProducts.slice(0, 5).map((item) => (
          <ItemCard key={item.productId} item={item} />
        ))}
      </Box>
    </Box>
  )
}

export default Product
