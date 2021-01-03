import React from 'react'
import { Box, BoxProps } from '@material-ui/core'
import styled, { css } from 'styled-components'
interface RowProps {
  overflowX?: string
  textOverflow?: string
}

const Row: React.FC<RowProps & BoxProps> = ({ overflowX, textOverflow, children, ...props }) => (
  <BoxRow display='flex' flexDirection='row' overflowX={overflowX} textOverflow={textOverflow} {...props}>
    {children}
  </BoxRow>
)

const BoxRow = styled(Box)<RowProps & BoxProps>(({ overflowX, textOverflow }) => {
  return css`
    ${overflowX && `overflow-x: ${overflowX}`};
    ${textOverflow && `text-overflow: ${textOverflow}`};
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

export default Row
