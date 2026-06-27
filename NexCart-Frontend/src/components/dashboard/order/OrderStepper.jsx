import React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import { CardGiftcard as CardGiftcardIcon, LocalShipping as LocalShippingIcon, HomeRounded as HomeRoundedIcon } from '@mui/icons-material'

const steps = [
  { label: 'Order Placed', icon: <CardGiftcardIcon /> },
  { label: 'Shipped', icon: <LocalShippingIcon /> },
  { label: 'Delivered', icon: <HomeRoundedIcon /> },
]

// activeStep tells the stepper which step the order is currently on
const OrderStepper = ({ activeStep = 0 }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={() => <StepIcon icon={step.icon} index={index} activeStep={activeStep} />}>
              <Typography fontSize={13}>{step.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

// Circle icon that turns indigo once that step is reached
const StepIcon = ({ icon, index, activeStep }) => {
  const isDone = index <= activeStep
  return (
    <Box sx={{
      width: 40, height: 40, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      bgcolor: isDone ? 'primary.main' : '#e2e8f0',
      color: isDone ? '#fff' : '#94a3b8',
    }}>
      {icon}
    </Box>
  )
}

export default OrderStepper
