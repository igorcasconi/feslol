import React from 'react'
import { Box, BoxProps } from '@material-ui/core'

const Row: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box display='flex' flexDirection='row' {...props}>
    {children}
  </Box>
)

export default Row
