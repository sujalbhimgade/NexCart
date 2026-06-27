import React, { useState } from 'react'
import { InputBase, Box } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`search/${query.trim()}`)
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      bgcolor: '#f1f5f9',
      borderRadius: 2,
      px: 2,
      py: 0.5,
      width: { xs: '100%', sm: 320, md: 420 },
    }}>
      <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
      <InputBase
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ flex: 1, fontSize: 14 }}
      />
    </Box>
  )
}

export default SearchBox
