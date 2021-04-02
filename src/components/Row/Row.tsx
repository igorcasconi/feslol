import React, { forwardRef } from 'react'
import { Box, BoxProps } from '@material-ui/core'
import styled, { css } from 'styled-components'

import { CursorTypes } from 'shared/typesCss'
import { ForwardRef } from 'shared/ref'
interface RowProps extends BoxProps {
  overflowX?: string
  overflowY?: string
  textOverflow?: string
  onClick?: () => void
  bgColor?: string
  cursor?: CursorTypes
}

const Row: ForwardRef<HTMLDivElement, RowProps> = forwardRef(
  ({ overflowX, textOverflow, children, onClick, ...props }, ref) => (
    <BoxRow
      display='flex'
      flexDirection='row'
      overflowX={overflowX}
      textOverflow={textOverflow}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      {children}
    </BoxRow>
  )
)

const BoxRow = styled(Box)<RowProps & BoxProps>(({ overflowX, overflowY, textOverflow, bgColor, cursor }) => {
  return css`
    ${overflowX && `overflow-x: ${overflowX}`};
    ${overflowY && `overflow-y: ${overflowY}`};
    ${textOverflow && `text-overflow: ${textOverflow}`};
    ${bgColor && `background-color: ${bgColor}`};
    ${cursor && `cursor: ${cursor}`};
    @media (min-width: 900px) {
      scrollbar-width: thin;
      ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
      }
      ::-webkit-scrollbar-track {
        display: none;
      }
      ::-webkit-scrollbar-thumb {
        background: gray;
        border-radius: 8px;
        border: 4px solid rgba(0, 0, 0, 0);
        background-clip: padding-box;
      }
    }
  `
})

Row.displayName = 'Row'

export default Row
