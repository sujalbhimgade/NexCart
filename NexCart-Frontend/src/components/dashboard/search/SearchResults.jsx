import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import axios from 'axios'
import SearchItemCard from './SearchItemCard'

export default function SearchResults() {
  const { query } = useParams()
  const categoryId = query.includes('category') && query.split('=')[1]

  const [productList, setProductList] = useState([])
  const [category, setCategory] = useState(null)

  useEffect(() => {
    if (categoryId) {
      // Search by category
      axios.get(`/api/category/${categoryId}`, {
        headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }
      }).then((res) => {
        setCategory(res.data)
        setProductList(res.data.products)
      })
    } else {
      // Search by product name
      axios.get(`/api/productByName/${query}`, {
        headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }
      }).then((res) => {
        setCategory(null)
        setProductList(res.data)
      })
    }
  }, [query])

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2}>
        {category ? `Results for ${category.name}` : `Search results for "${query}"`}
      </Typography>

      {productList.length === 0 && (
        <Typography color="text.secondary">No products found.</Typography>
      )}

      {productList.map((item) => (
        <SearchItemCard product={item} key={item.productId} />
      ))}
    </Box>
  )
}
