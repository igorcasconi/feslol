import React from 'react'
import styled, { css } from 'styled-components'
import { Box, BoxProps } from '@material-ui/core'

import { ImageProps } from './types'

const Image: React.FC<ImageProps & BoxProps> = ({ sourceimage, ...props }) => (
  <ImageView sourceimage={sourceimage} {...props} />
)

const ImageView = styled(Box)<ImageProps>(({ sourceimage }) => {
  return css`
    background-image: url(${sourceimage});
    background-size: cover;
    background-repeat: no-repeat;
    @media (m-width: 900px) {
      background-size: contain;
    }
  `
})

export default Image
