import { Box } from '@mui/material'
import React from 'react'

const PlanBox = () => {
  return (
    <Box
      height={200}
      width={200}
      my={8}
      marginTop={8}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey', borderRadius:'20px' , mx:"auto"  }}
    >
      This Box uses MUI System props for quick customization.
    </Box>
  )
}

export default PlanBox

// 27.2 | Kubernetes Part - 2 