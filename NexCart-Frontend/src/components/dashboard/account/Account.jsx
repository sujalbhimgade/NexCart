import React, { useState } from 'react'
import { Box, Button, Grid, Paper, Stack, TextField, Typography, Avatar } from '@mui/material'
import { PersonOutline as PersonOutlineIcon, Edit as EditIcon } from '@mui/icons-material'
import { useAuth } from '../../hooks/useProvideAuth'
import axios from 'axios'

const Account = () => {
    const { user, updateUser } = useAuth()
    const [isEdit, setIsEdit] = useState(false)

    const [userDetail, setUserDetail] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        addressLine1: user?.address?.addressLine1 || '',
        addressLine2: user?.address?.addressLine2 || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zipCode: user?.address?.zipCode || '',
    })

    const handleChange = (field) => (e) => {
        setUserDetail((prev) => ({ ...prev, [field]: e.target.value }))
    }

    const handleSubmit = () => {
        axios.put('/api/user', {
            userId: user.id,
            firstName: userDetail.firstName,
            lastName: userDetail.lastName,
            phoneNumber: userDetail.phoneNumber,
            address: {
                addressLine1: userDetail.addressLine1,
                addressLine2: userDetail.addressLine2,
                city: userDetail.city,
                state: userDetail.state,
                zipCode: userDetail.zipCode,
            }
        }, {
            headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }
        }).then((res) => {
            updateUser(res.data)
            setIsEdit(false)
        })
    }

    return (
        <Box>
            <Stack direction="row" gap={1.5} alignItems="center" mb={3}>
                <PersonOutlineIcon color="primary" />
                <Typography variant="h5" fontWeight={700}>My Account</Typography>
            </Stack>

            <Paper sx={{ p: 3, border: '1px solid #e2e8f0' }}>

                {/* Profile header */}
                <Stack direction="row" gap={2} alignItems="center" mb={3}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, fontSize: 22 }}>
                        {userDetail.firstName?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography fontWeight={700} fontSize={18}>
                            {userDetail.firstName} {userDetail.lastName}
                        </Typography>
                        <Typography color="text.secondary" fontSize={14}>{userDetail.email}</Typography>
                    </Box>
                </Stack>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth size="small" label="First Name" value={userDetail.firstName} onChange={handleChange('firstName')} disabled={!isEdit} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth size="small" label="Last Name" value={userDetail.lastName} onChange={handleChange('lastName')} disabled={!isEdit} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth size="small" label="Email" value={userDetail.email} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth size="small" label="Phone Number" value={userDetail.phoneNumber} onChange={handleChange('phoneNumber')} disabled={!isEdit} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth size="small" label="Address Line 1" value={userDetail.addressLine1} onChange={handleChange('addressLine1')} disabled={!isEdit} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth size="small" label="Address Line 2" value={userDetail.addressLine2} onChange={handleChange('addressLine2')} disabled={!isEdit} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth size="small" label="City" value={userDetail.city} onChange={handleChange('city')} disabled={!isEdit} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth size="small" label="State" value={userDetail.state} onChange={handleChange('state')} disabled={!isEdit} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth size="small" label="Zip Code" value={userDetail.zipCode} onChange={handleChange('zipCode')} disabled={!isEdit} />
                    </Grid>
                </Grid>

                <Stack direction="row" gap={2} mt={3}>
                    {isEdit ? (
                        <>
                            <Button variant="contained" onClick={handleSubmit}>Save Changes</Button>
                            <Button variant="outlined" onClick={() => setIsEdit(false)}>Cancel</Button>
                        </>
                    ) : (
                        <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setIsEdit(true)}>
                            Edit Profile
                        </Button>
                    )}
                </Stack>

            </Paper>
        </Box>
    )
}

export default Account
