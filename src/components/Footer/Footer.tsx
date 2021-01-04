import React from 'react'

import { Column, Row, Text } from 'components'

import { menuItems } from 'helpers/topbar'
import { MenuProps } from 'components/TopBar/types'
import { Link } from '@material-ui/core'

const Footer: React.FC = () => (
  <Column width='100%' justifyContent='center' alignItems='center'>
    <Row
      width='100%'
      height='250px'
      bgcolor='#004E96'
      paddingX={['10px', '50px', '250px', '350px', '450px']}
      paddingY='25px'
      justifyContent='center'
      alignItems='center'
    >
      <Column height='100%' justifyContent='center'>
        <Text fontSize={20} color='#fff'>
          Mapa do Site
        </Text>
        <Row maxWidth='250px' flexWrap='wrap' mt='16px'>
          {menuItems.map((items: MenuProps) => (
            <Row key={items.id} mr='16px' mb='5px'>
              <Link href={items.url}>
                <Text fontSize={12} color='#fff'>
                  {items.name}
                </Text>
              </Link>
            </Row>
          ))}
        </Row>
      </Column>
      <Column height='100%' width='1px' bgcolor='#fff' mr='32px' />
      <Column height='100%' justifyContent='center'>
        <Text fontSize={30} color='#fff'>
          OSLOL
        </Text>
        <Text fontSize={14} color='#fff'>
          ORGANIZAÇÃO DO SUDESTE DE LEAGUE OF LEGENDS
        </Text>
      </Column>
    </Row>
  </Column>
)

export default Footer
