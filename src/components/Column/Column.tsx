import React from 'react'
import { Box, BoxProps } from '@material-ui/core'

const Column: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box display='flex' flexDirection='column' {...props}>
    {children}
  </Box>
)

export default Column
