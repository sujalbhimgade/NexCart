import React, { useEffect } from 'react'
import { Box, Button, Divider, Stack, TextField, Typography, Paper } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useProvideAuth'
import AlertSnackBar from '../utils/AlertSnackBar'
import onlineGrocery from '../../assets/onlineGrocery.svg'

const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { isError, user, login, isLoading, error } = useAuth()

  // Once login succeeds, go to app
  useEffect(() => {
    if (user) {
      navigate('/app')
    }
  }, [user])

  const onSubmit = (data) => {
    login(data)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>

      {/* Alerts */}
      {isError && error?.message && !isLoading && (
        <AlertSnackBar message={error.message} severity="error" />
      )}
      {user && !isError && !isLoading && (
        <AlertSnackBar message="Login successful!" severity="success" />
      )}

      {/* Navbar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
        <Link to="/">
          <Typography sx={{ fontWeight: 700, fontSize: 22, color: 'primary.main' }}>NexCart</Typography>
        </Link>
        <Button variant="contained" onClick={() => navigate('/register')}>Create Account</Button>
      </Box>

      <Divider />

      {/* Main content */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 65px)',
        px: { xs: 2, md: 6 },
        gap: 6,
      }}>

        {/* Image - hidden on mobile */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: 1, justifyContent: 'center' }}>
          <img src={onlineGrocery} alt="login" style={{ width: '100%', maxWidth: 400 }} />
        </Box>

        {/* Login Form */}
        <Box sx={{ flex: 1, maxWidth: 420, width: '100%' }}>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={700} mb={1}>Welcome back 👋</Typography>
            <Typography color="text.secondary" mb={3}>Login to your NexCart account</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={2}>

                <TextField
                  label="Email"
                  size="small"
                  fullWidth
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Invalid email' }
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <TextField
                  label="Password"
                  type="password"
                  size="small"
                  fullWidth
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'At least 6 characters' }
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <Button variant="contained" type="submit" size="large" fullWidth disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>

                <Typography textAlign="center" color="text.secondary" fontSize={14}>
                  Don't have an account?{' '}
                  <Link to="/register" style={{ color: '#6366f1', fontWeight: 600 }}>Sign Up</Link>
                </Typography>

              </Stack>
            </form>
          </Paper>
        </Box>

      </Box>
    </Box>
  )
}

export default Login

