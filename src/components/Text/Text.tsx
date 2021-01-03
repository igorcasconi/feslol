import React from 'react'
import styled, { css } from 'styled-components'

import { TextProps } from './types'

const Text: React.FC<TextProps> = ({ fontSize, color, fontWeight, textAlign, lineHeight, children }) => (
  <TextParagraph
    fontSize={fontSize}
    color={color}
    fontWeight={fontWeight}
    textAlign={textAlign}
    lineHeight={lineHeight}
  >
    {children}
  </TextParagraph>
)

const TextParagraph = styled.p<TextProps>(({ fontSize, color, fontWeight, textAlign, lineHeight }) => {
  return css`
    font-size: ${fontSize}px;
    color: ${color};
    ${fontWeight &&
    `
      font-weight: ${fontWeight};
    `}
    ${textAlign &&
    `
      text-align: ${textAlign};
    `}
     ${lineHeight &&
    `
      line-height: ${lineHeight}px;
    `}
  `
})

export default Text
