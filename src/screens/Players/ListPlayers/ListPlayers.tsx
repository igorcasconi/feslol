import React from 'react'
import { Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { Column, Text, Row, Input, Image } from 'components'
import { listPlayers } from 'utils/mockedHome'
import { ListPlayerProps } from 'shared/listInterfaces'

const ListPlayers: React.FC = () => (
  <Column height='100%' width='100%' paddingX={['10px', '50px', '250px', '350px', '450px']} paddingY='25px'>
    <Row width='100%' justifyContent='space-between'>
      <Text fontSize={30} color='#262626'>
        Players
      </Text>
      <Row justifyContent='center' alignItems='center'>
        <Button>
          <SearchIcon style={{ color: '#262625', fontSize: 30, marginRight: -10 }} />
        </Button>
        <Input placeholder='Pesquisar' />
      </Row>
    </Row>
    <Row width='100%' height='1px' bgcolor='#262626' />
    <Row width='100%' height='100%' flexWrap='wrap' justifyContent='flex-start' alignItems='center' mt='16px'>
      {listPlayers.map((item: ListPlayerProps) => (
        <Column key={item.id} justifyContent='center' alignItems='center' mr='20px'>
          <Image sourceimage={item.photo} width='100px' height='100px' />
          <Row>
            <Text fontSize={16} fontWeight='bold' color='#262626'>
              {item.name}
            </Text>
          </Row>
          <Row>
            <Text fontSize={14} color='#262626'>
              {item.team}
            </Text>
          </Row>
        </Column>
      ))}
    </Row>
  </Column>
)

export default ListPlayers
