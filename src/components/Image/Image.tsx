import React from 'react'
import styled, { css } from 'styled-components'
import { Box, BoxProps } from '@material-ui/core'

import { ImageProps } from './types'

const Image: React.FC<ImageProps & BoxProps> = ({ sourceimage, ...props }) => (
  <ImageView sourceimage={sourceimage} {...props} />
)

const ImageView = styled(Box)<ImageProps>(({ sourceimage, opacity }) => {
  return css`
    background-image: url(${sourceimage});
    background-size: cover;
    background-repeat: no-repeat;
    ${opacity && `opacity: ${opacity}`};
  `
})

export default Image
