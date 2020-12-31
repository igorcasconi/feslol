import React from 'react'
import styled, { css } from 'styled-components'

import { TextProps } from './types'

const Text: React.FC<TextProps> = ({ fontSize, color, fontWeight, textAlign, children }) => (
  <TextParagraph fontSize={fontSize} color={color} fontWeight={fontWeight} textAlign={textAlign}>
    {children}
  </TextParagraph>
)

const TextParagraph = styled.p<TextProps>(({ fontSize, color, fontWeight, textAlign }) => {
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
  `
})

export default Text
