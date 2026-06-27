import React from 'react'
import { Box, Paper, Stack, Typography, Button } from '@mui/material'
import { HeadsetMicOutlined as HeadsetMicOutlinedIcon, EmailOutlined as EmailOutlinedIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material'

const faqs = [
  { q: 'How do I track my order?', a: 'Go to My Orders from the sidebar and click on any order to see its current status.' },
  { q: 'What is the return policy?', a: 'Most items can be returned within 7 days of delivery, as long as they are unused and in original packaging.' },
  { q: 'How long does delivery take?', a: 'Orders are usually delivered within 3-5 business days depending on your location.' },
]

const Support = () => {
  return (
    <Box>
      <Stack direction="row" gap={1.5} alignItems="center" mb={3}>
        <HeadsetMicOutlinedIcon color="primary" />
        <Typography variant="h5" fontWeight={700}>Help & Support</Typography>
      </Stack>

      {/* Contact card */}
      <Paper sx={{ p: 3, border: '1px solid #e2e8f0', mb: 3 }}>
        <Typography fontWeight={700} mb={1}>Need help with something?</Typography>
        <Typography color="text.secondary" mb={2}>
          Our support team is happy to help with orders, payments, or account issues.
        </Typography>

        <Stack direction="row" gap={1.5} alignItems="center" mb={1}>
          <EmailOutlinedIcon fontSize="small" color="primary" />
          <Typography fontSize={14}>support@nexcart.com</Typography>
        </Stack>
        <Stack direction="row" gap={1.5} alignItems="center" mb={2}>
          <AccessTimeIcon fontSize="small" color="primary" />
          <Typography fontSize={14}>Mon - Sat, 9 AM - 6 PM</Typography>
        </Stack>

        <Button variant="contained" href="mailto:support@nexcart.com">Email Us</Button>
      </Paper>

      {/* FAQ section */}
      <Typography fontWeight={700} mb={1.5}>Frequently Asked Questions</Typography>
      <Stack gap={1.5}>
        {faqs.map((item) => (
          <Paper key={item.q} sx={{ p: 2.5, border: '1px solid #e2e8f0' }}>
            <Typography fontWeight={600} mb={0.5}>{item.q}</Typography>
            <Typography color="text.secondary" fontSize={14}>{item.a}</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  )
}

export default Support
