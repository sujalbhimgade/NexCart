import React from 'react'
import TopAppBar from './TopAppBar'
import SideBar from './SideBar'

// This component just groups the AppBar and Sidebar together
const Navigation = ({ open, handleDrawerOpen, handleDrawerClose }) => {
  return (
    <>
      <TopAppBar handleDrawerOpen={handleDrawerOpen} open={open} />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
    </>
  )
}

export default Navigation
