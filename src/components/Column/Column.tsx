import React, { forwardRef } from 'react'
import { Box, BoxProps } from '@material-ui/core'

import { CursorTypes } from 'shared/typesCss'
import styled, { css } from 'styled-components'
import { ForwardRef } from 'shared/ref'

type ColumnProps = BoxProps & {
  onClick?: () => void
  cursor?: CursorTypes
  bgColor?: string
  overflowY?: string
}

const Column: ForwardRef<HTMLDivElement, ColumnProps> = forwardRef(
  ({ onClick, cursor, bgColor, children, overflowY, ...props }, ref) => (
    <ColumnComponent
      ref={ref}
      display='flex'
      flexDirection='column'
      bgColor={bgColor}
      onClick={onClick}
      cursor={cursor}
      overflowY={overflowY}
      {...props}
    >
      {children}
    </ColumnComponent>
  )
)

const ColumnComponent = styled(Box)<ColumnProps>(({ cursor, bgColor, overflowY }) => {
  return css`
    ${cursor && `cursor: ${cursor}`};
    ${bgColor && `background-color: ${bgColor}`};
    ${overflowY && `overflow-y: ${overflowY}`};
    transition: 0.3s all;
  `
})

Column.displayName = 'Column'

export default Column
