import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Divider, Chip, Stack } from '@mui/material'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import Offer from './Offer'
import ItemCard from '../cards/ItemCard'
import AlertSnackBar from '../../utils/AlertSnackBar'

const MainLanding = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [orderConfirmation, setOrderConfirmation] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    if (location.state?.from === 'completedOrder') {
      setOrderConfirmation(true)
    }

    // Fetch all products — no slice limit
    axios.get('/api/product/random', {
      headers: { Authorization: 'Bearer ' + token }
    }).then((res) => setProducts(res.data))

    // Fetch real categories from backend
    axios.get('/api/category', {
      headers: { Authorization: 'Bearer ' + token }
    }).then((res) => setCategories(res.data))

  }, [])

  const handleCategoryClick = (cat) => {
    navigate(`search/category=${cat.categoryId}`)
  }

  return (
    <Box>

      {orderConfirmation && (
        <AlertSnackBar message="Your order has been placed!" severity="success" />
      )}

      {/* Banner */}
      <Offer />

      {/* Real categories from backend */}
      {categories.length > 0 && (
        <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mt: 2.5 }}>
          {categories.map((cat) => (
            <Chip
              key={cat.categoryId}
              label={cat.name}
              variant="outlined"
              clickable
              color="primary"
              onClick={() => handleCategoryClick(cat)}
              sx={{ fontWeight: 500 }}
            />
          ))}
        </Stack>
      )}

      <Divider sx={{ my: 3 }} />

      {/* All products — no slice limit */}
      <SectionHeader title="All Products" />
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        mb: 4,
      }}>
        {products.map((item) => (
          <ItemCard key={item.productId} item={item} />
        ))}
      </Box>

    </Box>
  )
}

const SectionHeader = ({ title }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
    <Typography variant="h6" fontWeight={700}>{title}</Typography>
  </Box>
)

export default MainLanding