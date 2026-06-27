import React from 'react'
import { AppBar, Toolbar, Box, IconButton, Badge, Typography, Tooltip } from '@mui/material'
import { Menu as MenuIcon, ShoppingCartOutlined as ShoppingCartOutlinedIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SearchBox from './SearchBox'

const TopAppBar = ({ handleDrawerOpen, open }) => {
  const cartItems = useSelector((state) => state.cart.items)

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: '#fff',
        color: 'text.primary',
        boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>

        {/* Left: menu icon + logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {!open && (
            <IconButton onClick={handleDrawerOpen} edge="start">
              <MenuIcon />
            </IconButton>
          )}
          <Link to="/app">
            <Typography sx={{ fontWeight: 700, fontSize: 20, color: 'primary.main' }}>
              NexCart
            </Typography>
          </Link>
        </Box>

        {/* Middle: search */}
        <Box sx={{ flex: 1, maxWidth: 480 }}>
          <SearchBox />
        </Box>

        {/* Right: cart icon */}
        <Tooltip title="Cart">
          <Link to="cart">
            <IconButton>
              <Badge badgeContent={cartItems.length} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Link>
        </Tooltip>

      </Toolbar>
    </AppBar>
  )
}

export default TopAppBar