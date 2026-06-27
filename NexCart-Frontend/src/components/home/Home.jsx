import React from 'react'
import { Box, Button, Typography, Divider, Stack, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import shoppingApp from '../../assets/shoppingBag.svg'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SecurityIcon from '@mui/icons-material/Security'
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

const Home = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>

      {/* Navbar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 22, color: 'primary.main' }}>
          NexCart
        </Typography>
        <Stack direction="row" gap={1}>
          <Button variant="outlined" onClick={() => navigate('/login')}>Login</Button>
          <Button variant="contained" onClick={() => navigate('/register')}>Sign Up</Button>
        </Stack>
      </Box>

      <Divider />

      {/* Hero Section */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 3, md: 8 },
        py: { xs: 4, md: 8 },
        gap: 4,
      }}>

        {/* Left side text */}
        <Box sx={{ flex: 1 }}>
          <Chip label="🛒 New arrivals every day" color="primary" variant="outlined" sx={{ mb: 2 }} />

          <Typography sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.2, mb: 2 }}>
            Shop Smarter,<br /> Live Better.
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 3, fontWeight: 400 }}>
            Discover the best deals on products you love — delivered fast, every time.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
            <Button variant="contained" size="large" onClick={() => navigate('/login')}>
              Get Started
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/app')}>
              Browse Products
            </Button>
          </Stack>

          {/* Small stats row */}
          <Stack direction="row" gap={4} sx={{ mt: 4 }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>10k+</Typography>
              <Typography variant="body2" color="text.secondary">Products</Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>5k+</Typography>
              <Typography variant="body2" color="text.secondary">Happy Users</Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>Fast</Typography>
              <Typography variant="body2" color="text.secondary">Delivery</Typography>
            </Box>
          </Stack>
        </Box>

        {/* Right side image */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src={shoppingApp} alt="shopping" style={{ width: '100%', maxWidth: 420 }} />
        </Box>

      </Box>

      {/* Features row */}
      <Box sx={{ bgcolor: 'primary.main', py: 3, px: 4 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-around"
          gap={3}
        >
          {[
            {
              icon: <LocalShippingIcon sx={{ fontSize: 28 }} />,
              text: 'Free Delivery on orders above $60',
            },
            {
              icon: <SecurityIcon sx={{ fontSize: 28 }} />,
              text: '100% Secure Payments',
            },
            {
              icon: <AssignmentReturnIcon sx={{ fontSize: 28 }} />,
              text: 'Easy 7-Day Returns',
            },
            {
              icon: <SupportAgentIcon sx={{ fontSize: 28 }} />,
              text: '24/7 Customer Support',
            },
          ].map((item) => (
            <Stack
              key={item.text}
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              sx={{ color: '#fff' }}
            >
              {item.icon}
              <Typography fontWeight={500}>
                {item.text}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

    </Box>
  )
}

export default Home

