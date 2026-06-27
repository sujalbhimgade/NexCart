import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, IconButton } from '@mui/material'
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material'
import ban1 from '../../../assets/banner1.jpeg'
import ban2 from '../../../assets/banner2.jpeg'
import ban3 from '../../../assets/banner3.jpeg'
import { useNavigate } from 'react-router-dom'

// Each banner item has a title, subtitle, bg color and image
const banners = [
    {
        title: 'Mega Electronics Sale',
        subtitle: 'Up to 40% off on laptops, smartphones & accessories.',
        img: ban3,
        bg: '#0F172A',
    },
    {
        title: 'Fashion Trends 2026',
        subtitle: 'Discover premium clothing, shoes & lifestyle products.',
        img: ban2,
        bg: '#1E293B',
    },
    {
        title: 'Top Brands Collection',
        subtitle: 'Shop products from leading global brands with exclusive offers.',
        img: ban1,
        bg: '#38176a',
    }
]

export function ImageCarousel() {
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0)

    // Auto switch banner every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const goPrev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
    const goNext = () => setCurrent((prev) => (prev + 1) % banners.length)

    const banner = banners[current]

    return (
        <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
            <Box
                sx={{
                    height: { xs: 180, md: 260 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: { xs: 3, md: 6 },
                    bgcolor: banner.bg,
                    transition: 'background-color 0.4s ease',
                }}
            >
                {/* Text on the left */}
                <Box>
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1.4rem', md: '2rem' }, mb: 1 }}>
                        {banner.title}
                    </Typography>
                    <Typography sx={{ color: '#cbd5e1', mb: 2, fontSize: { xs: 13, md: 15 } }}>
                        {banner.subtitle}
                    </Typography>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate('/app')}
                        sx={{ bgcolor: '#6366f1', '&:hover': { bgcolor: '#4f46e5' } }}
                    >
                        Shop Now
                    </Button>
                </Box>

                {/* Image on the right */}
                <Box
                    component="img"
                    src={banner.img}
                    alt="banner"
                    sx={{
                        height: '100%',
                        width: { xs: '45%', md: '40%' },
                        objectFit: 'cover',
                        opacity: 0.7,
                        borderRadius: 2,
                    }}
                />
            </Box>

            {/* Prev / Next buttons */}
            <IconButton
                onClick={goPrev}
                sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: '#fff' } }}
                size="small"
            >
                <ChevronLeftIcon />
            </IconButton>
            <IconButton
                onClick={goNext}
                sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: '#fff' } }}
                size="small"
            >
                <ChevronRightIcon />
            </IconButton>

            {/* Dots indicator */}
            <Box sx={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1 }}>
                {banners.map((_, i) => (
                    <Box
                        key={i}
                        onClick={() => setCurrent(i)}
                        sx={{
                            width: 8, height: 8, borderRadius: '50%', cursor: 'pointer',
                            bgcolor: i === current ? '#fff' : 'rgba(255,255,255,0.4)',
                        }}
                    />
                ))}
            </Box>
        </Box>
    )
}

