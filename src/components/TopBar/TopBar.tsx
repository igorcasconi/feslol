import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Button } from '@material-ui/core'

import { Row } from '../Row'
import { TextMenu, TitleLogo } from './style'

import { menuItems } from '../../helpers/topbar'
import { MenuProps } from './types'

const TopBar: React.FC = () => {
  const history = useHistory()
  const route = useLocation()

  return (
    <Row
      width='100%'
      height='5rem'
      px='2.188rem'
      justifyContent='space-between'
      alignItems='center'
      bgcolor='#262626'
      position='absolute'
      top={0}
      left={0}
      mb='5rem'
    >
      <TitleLogo>OESLOL</TitleLogo>
      <Row>
        {menuItems.map((items: MenuProps) => (
          <Row
            key={items.id}
            mr='18px'
            borderRadius='7px'
            height='32px'
            padding='6px'
            bgcolor={route.pathname === items.url ? '#004E96' : 'rgba(255, 255, 255, 0.1)'}
            onClick={() => history.push(items.url)}
          >
            <Button>
              <TextMenu>{items.name}</TextMenu>
            </Button>
          </Row>
        ))}
      </Row>
    </Row>
  )
}

export default TopBar
