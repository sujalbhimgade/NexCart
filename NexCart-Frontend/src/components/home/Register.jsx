import React, { useEffect } from 'react'
import { Box, Button, Divider, Stack, TextField, Typography, Paper } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useProvideAuth'
import AlertSnackBar from '../utils/AlertSnackBar'
import onlineGrocery from '../../assets/onlineGrocery.svg'

const Register = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { isError, user, signUp, isLoading, error } = useAuth()

  //Once registered, go to app
  useEffect(() => {
    if (user) {
      navigate('/app')
    }
  }, [user])

  const onSubmit = async (data) => {
    await signUp(data)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>

      {/* Alerts */}
      {isError && error?.message && !isLoading && (
        <AlertSnackBar message={error.message} severity="error" />
      )}
      {user && !isError && !isLoading && (
        <AlertSnackBar message="Account created!" severity="success" />
      )}

      {/* Navbar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
        <Link to="/">
          <Typography sx={{ fontWeight: 700, fontSize: 22, color: 'primary.main' }}>NexCart</Typography>
        </Link>
        <Button variant="outlined" onClick={() => navigate('/login')}>Login</Button>
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
          <img src={onlineGrocery} alt="register" style={{ width: '100%', maxWidth: 400 }} />
        </Box>

        {/* Register Form */}
        <Box sx={{ flex: 1, maxWidth: 420, width: '100%' }}>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={700} mb={1}>Create your account</Typography>
            <Typography color="text.secondary" mb={3}>Join NexCart and start shopping</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={2}>

                {/* First + Last name side by side */}
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                  <TextField
                    label="First Name"
                    size="small"
                    fullWidth
                    {...register('firstName', { required: 'Required' })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                  <TextField
                    label="Last Name"
                    size="small"
                    fullWidth
                    {...register('lastName', { required: 'Required' })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                </Stack>

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
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>

                <Typography textAlign="center" color="text.secondary" fontSize={14}>
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: '#6366f1', fontWeight: 600 }}>Login</Link>
                </Typography>

              </Stack>
            </form>
          </Paper>
        </Box>

      </Box>
    </Box>
  )
}

export default Register
