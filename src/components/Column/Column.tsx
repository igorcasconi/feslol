import React from 'react'
import { Box, BoxProps } from '@material-ui/core'

import { CursorTypes } from 'shared/typesCss'
import styled, { css } from 'styled-components'
interface ColumnProps {
  onClick?: () => void
  cursor?: CursorTypes
  bgColor?: string
}

const Column: React.FC<ColumnProps & BoxProps> = ({ onClick, cursor, bgColor, children, ...props }) => (
  <ColumnComponent display='flex' flexDirection='column' bgColor={bgColor} onClick={onClick} cursor={cursor} {...props}>
    {children}
  </ColumnComponent>
)

const ColumnComponent = styled(Box)<ColumnProps>(({ cursor, bgColor }) => {
  return css`
    ${cursor && `cursor: ${cursor}`};
    ${bgColor && `background-color: ${bgColor}`};
  `
})

export default Column
