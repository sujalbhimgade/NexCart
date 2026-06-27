import React, { useEffect, useState } from 'react'
import {
  Drawer, Box, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Typography, Divider, IconButton, Collapse
} from '@mui/material'
import {
  ChevronLeft as ChevronLeftIcon,
  HomeOutlined as HomeOutlinedIcon,
  ShoppingBagOutlined as ShoppingBagOutlinedIcon,
  PersonOutline as PersonOutlineIcon,
  HeadsetMicOutlined as HeadsetMicOutlinedIcon,
  Logout as LogoutIcon,
  CategoryOutlined as CategoryOutlinedIcon,
  ExpandLess,
  ExpandMore,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useProvideAuth'
import axios from 'axios'

const drawerWidth = 240

// Main nav links
const navLinks = [
  { title: 'Home', icon: <HomeOutlinedIcon />, link: '/app' },
  { title: 'My Orders', icon: <ShoppingBagOutlinedIcon />, link: 'orders' },
  { title: 'Account', icon: <PersonOutlineIcon />, link: 'account' },
  { title: 'Support', icon: <HeadsetMicOutlinedIcon />, link: 'support' },
]

const SideBar = ({ open, handleDrawerClose }) => {
  const navigate = useNavigate()
  const { logOut, user } = useAuth()
  const [categories, setCategories] = useState([])
  const [catOpen, setCatOpen] = useState(false)

  // Check if logged in user is admin by email
  const isAdmin = user?.email === 'admin@email.com'

  // Fetch categories from backend
  useEffect(() => {
    axios.get('/api/category', {
      headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }
    }).then((res) => {
      setCategories(res.data)
    })
  }, [])

  const handleNav = (link) => {
    navigate(link)
    handleDrawerClose()
  }

  const handleCategoryClick = (categoryId) => {
    navigate(`search/category=${categoryId}`)
    handleDrawerClose()
  }

  const handleLogout = () => {
    logOut()
    navigate('/')
  }

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid #e2e8f0',
        },
      }}
    >
      {/* Sidebar header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
        <Typography sx={{ fontWeight: 700, color: 'primary.main', fontSize: 18 }}>NexCart</Typography>
        <IconButton onClick={handleDrawerClose} size="small">
          <ChevronLeftIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Nav links */}
      <List sx={{ px: 1, pt: 1 }}>
        {navLinks.map((item) => (
          <ListItem key={item.title} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNav(item.link)}
              sx={{ borderRadius: 2, '&:hover': { bgcolor: 'primary.main', color: '#fff', '& .MuiListItemIcon-root': { color: '#fff' } } }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Admin link — only shows for admin@email.com */}
        {isAdmin && (
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNav('admin')}
              sx={{ borderRadius: 2, bgcolor: '#fef3c7', '&:hover': { bgcolor: '#f59e0b', color: '#fff', '& .MuiListItemIcon-root': { color: '#fff' } } }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: '#f59e0b' }}><AdminIcon /></ListItemIcon>
              <ListItemText primary="Admin Panel" primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        )}

        {/* Categories dropdown */}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton onClick={() => setCatOpen(!catOpen)} sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
              <CategoryOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
            {catOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </ListItemButton>
        </ListItem>

        <Collapse in={catOpen} unmountOnExit>
          <List disablePadding sx={{ pl: 2 }}>
            {categories.map((cat) => (
              <ListItem key={cat.categoryId} disablePadding sx={{ mb: 0.3 }}>
                <ListItemButton onClick={() => handleCategoryClick(cat.categoryId)} sx={{ borderRadius: 2, py: 0.5 }}>
                  <ListItemText primary={cat.name} primaryTypographyProps={{ fontSize: 13, color: 'text.secondary' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      {/* Logout at bottom */}
      <Box sx={{ mt: 'auto', px: 1, pb: 2 }}>
        <Divider sx={{ mb: 1 }} />
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: 'error.main' }}>
          <ListItemIcon sx={{ minWidth: 36, color: 'error.main' }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
        </ListItemButton>
      </Box>

    </Drawer>
  )
}

export default SideBar