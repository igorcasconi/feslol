import React from 'react'
import { Row } from '../Row'
import { TitleLogo } from './style'

const TopBar: React.FC = () => (
  <Row width='100%' height='5rem' px='2.188rem' justifyContent='space-between' alignItems='center' bgcolor='#262626'>
    <TitleLogo>OESLOL</TitleLogo>
  </Row>
)

export default TopBar
