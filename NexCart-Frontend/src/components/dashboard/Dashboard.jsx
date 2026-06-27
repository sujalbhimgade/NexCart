import React, { useState } from 'react'
import { Box, Toolbar } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import Navigation from './navigation/Navigation'
import axios from 'axios'

const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  // If token expires (401), log user out and send to login
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/login')
      }
      return Promise.reject(error)
    }
  )

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>

      <Navigation
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />

      {/* Main content — sidebar now overlays so no margin shift needed */}
      <Box
        component="main"
        sx={{
          width: '100%',
          p: { xs: 2, md: 3 },
          overflowX: 'hidden',
          minHeight: '100vh',
        }}
      >
        {/* Pushes content below the fixed AppBar */}
        <Toolbar />

        <Outlet />
      </Box>

    </Box>
  )
}

export default Dashboard