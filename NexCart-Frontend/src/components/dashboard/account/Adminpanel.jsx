import React, { useEffect, useState } from 'react'
import {
  Box, Button, Chip, Divider, Grid, IconButton,
  MenuItem, Paper, Stack, Table, TableBody,
  TableCell, TableHead, TableRow, TextField, Typography,
  Dialog, DialogActions, DialogContent, DialogTitle,
  InputLabel, FormControl, Select
} from '@mui/material'
import { Delete as DeleteIcon, Add as AddIcon, AdminPanelSettings as AdminIcon } from '@mui/icons-material'
import axios from 'axios'
import AlertSnackBar from '../../utils/AlertSnackBar'

const emptyProduct = {
  name: '',
  brand: '',
  description: '',
  imageUrl: '',
  price: '',
  discountPercent: '',
  rating: '',
  categoryId: '',
  stockQuantity: '',
}

const AdminPanel = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [newProduct, setNewProduct] = useState(emptyProduct)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [deleteDialog, setDeleteDialog] = useState({ open: false, productId: null, productName: '' })

  const token = 'Bearer ' + JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = () => {
    axios.get('/api/product', { headers: { Authorization: token } })
      .then((res) => setProducts(res.data))
      .catch(() => setErrorMsg('Failed to load products.'))
  }

  const fetchCategories = () => {
    axios.get('/api/category', { headers: { Authorization: token } })
      .then((res) => setCategories(res.data))
  }

  const handleChange = (field) => (e) => {
    setNewProduct((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.categoryId) {
      setErrorMsg('Name, Price and Category are required.')
      return
    }

    
    const payload = {
      name: newProduct.name,
      brand: newProduct.brand,
      description: newProduct.description,
      imageUrl: newProduct.imageUrl,
      price: parseFloat(newProduct.price),
      discountPercent: parseFloat(newProduct.discountPercent) || 0,
      rating: parseFloat(newProduct.rating) || 0,
      categoryId: parseInt(newProduct.categoryId),
      stockQuantity: parseInt(newProduct.stockQuantity) || 0,
    }

    axios.post('/api/product', payload, { headers: { Authorization: token } })
      .then(() => {
        setSuccessMsg(`"${newProduct.name}" added successfully!`)
        setNewProduct(emptyProduct)
        fetchProducts()
      })
      .catch(() => setErrorMsg('Failed to add product. Check all fields.'))
  }

  const openDeleteDialog = (product) => {
    setDeleteDialog({ open: true, productId: product.productId, productName: product.name })
  }

  const handleDeleteConfirm = () => {
    axios.delete(`/api/product/${deleteDialog.productId}`, { headers: { Authorization: token } })
      .then(() => {
        setSuccessMsg(`"${deleteDialog.productName}" deleted.`)
        setDeleteDialog({ open: false, productId: null, productName: '' })
        fetchProducts()
      })
      .catch(() => setErrorMsg('Failed to delete product.'))
  }

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return
    axios.post('/api/category', { name: newCategoryName }, { headers: { Authorization: token } })
      .then(() => {
        setSuccessMsg(`Category "${newCategoryName}" added!`)
        setNewCategoryName('')
        fetchCategories()
      })
      .catch(() => setErrorMsg('Category already exists or request failed.'))
  }

  const handleDeleteCategory = (cat) => {
    axios.delete(`/api/category/${cat.categoryId}`, { headers: { Authorization: token } })
      .then(() => {
        setSuccessMsg(`"${cat.name}" deleted.`)
        fetchCategories()
      })
      .catch(() => setErrorMsg('Failed to delete category.'))
  }

  return (
    <Box>

      {successMsg && <AlertSnackBar message={successMsg} severity="success" key={successMsg} />}
      {errorMsg && <AlertSnackBar message={errorMsg} severity="error" key={errorMsg} />}

      <Stack direction="row" gap={1.5} alignItems="center" mb={3}>
        <AdminIcon color="primary" />
        <Typography variant="h5" fontWeight={700}>Admin Panel</Typography>
        <Chip label="Admin Only" color="error" size="small" sx={{ fontWeight: 600 }} />
      </Stack>

      <Stack direction="row" gap={2} mb={3}>
        <Paper sx={{ p: 2.5, border: '1px solid #e2e8f0', textAlign: 'center', flex: 1 }}>
          <Typography variant="h4" fontWeight={700} color="primary.main">{products.length}</Typography>
          <Typography color="text.secondary" fontSize={13}>Total Products</Typography>
        </Paper>
        <Paper sx={{ p: 2.5, border: '1px solid #e2e8f0', textAlign: 'center', flex: 1 }}>
          <Typography variant="h4" fontWeight={700} color="success.main">{categories.length}</Typography>
          <Typography color="text.secondary" fontSize={13}>Categories</Typography>
        </Paper>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Add Product Form */}
      <Paper sx={{ p: 3, border: '1px solid #e2e8f0', mb: 3 }}>
        <Typography fontWeight={700} mb={2}>Add New Product</Typography>

        <Grid container spacing={2}>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="Product Name *"
              value={newProduct.name} onChange={handleChange('name')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="Brand"
              value={newProduct.brand} onChange={handleChange('brand')} />
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField fullWidth size="small" label="Price *" type="number"
              value={newProduct.price} onChange={handleChange('price')} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth size="small" label="Discount %" type="number"
              value={newProduct.discountPercent} onChange={handleChange('discountPercent')}
              inputProps={{ min: 0, max: 100 }} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth size="small" label="Rating (0-5)" type="number"
              value={newProduct.rating} onChange={handleChange('rating')}
              inputProps={{ min: 0, max: 5, step: 0.1 }} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth size="small" label="Stock Qty" type="number"
              value={newProduct.stockQuantity} onChange={handleChange('stockQuantity')} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Category *</InputLabel>
              <Select value={newProduct.categoryId} label="Category *" onChange={handleChange('categoryId')}>
                {categories.map((cat) => (
                  <MenuItem key={cat.categoryId} value={cat.categoryId}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="Image URL"
              value={newProduct.imageUrl} onChange={handleChange('imageUrl')}
              placeholder="https://example.com/image.jpg" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth size="small" label="Description"
              multiline rows={2}
              value={newProduct.description} onChange={handleChange('description')} />
          </Grid>

          {newProduct.imageUrl && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography fontSize={13} color="text.secondary">Image preview:</Typography>
                <Box
                  component="img"
                  src={newProduct.imageUrl}
                  alt="preview"
                  sx={{ height: 80, width: 80, objectFit: 'contain', bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </Box>
            </Grid>
          )}

        </Grid>

        <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 2 }} onClick={handleAddProduct}>
          Add Product
        </Button>
      </Paper>

      <Paper sx={{ p: 3, border: '1px solid #e2e8f0', mb: 3 }}>
        <Typography fontWeight={700} mb={2}>Manage Categories</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
          {categories.map((cat) => (
            <Chip
              key={cat.categoryId}
              label={cat.name}
              onDelete={() => handleDeleteCategory(cat)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>
        <Stack direction="row" gap={1}>
          <TextField
            size="small" label="New Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
            sx={{ width: 220 }}
          />
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddCategory}>Add</Button>
        </Stack>
      </Paper>

      <Paper sx={{ border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <Box sx={{ p: 2.5, borderBottom: '1px solid #e2e8f0' }}>
          <Typography fontWeight={700}>All Products ({products.length})</Typography>
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8fafc' }}>
                <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Brand</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Discount</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Rating</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.productId} hover>
                  <TableCell>
                    <Box
                      component="img"
                      src={product.imageUrl}
                      alt={product.name}
                      sx={{ width: 44, height: 44, objectFit: 'contain', bgcolor: '#f8fafc', borderRadius: 1 }}
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, maxWidth: 140 }}>
                    <Typography noWrap fontSize={13}>{product.name}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: 13 }}>{product.brand}</TableCell>
                      <TableCell sx={{ color: '#6366f1', fontWeight: 600 }}>${product.price}</TableCell>
                  <TableCell>{product.discountPercent}%</TableCell>
                  <TableCell>⭐ {product.rating}</TableCell>
                  <TableCell>{product.stockQuantity}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="error" onClick={() => openDeleteDialog(product)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, productId: null, productName: '' })}>
        <DialogTitle fontWeight={700}>Delete Product?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{deleteDialog.productName}</strong>? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" onClick={() => setDeleteDialog({ open: false, productId: null, productName: '' })}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>

    </Box>
  )
}

export default AdminPanel