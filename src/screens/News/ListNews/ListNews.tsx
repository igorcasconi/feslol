import React from 'react'
import { Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { Column, Row, Text, Input } from 'components'

import { listNews } from 'utils/mockedHome'

const ListNews: React.FC = () => {
  return (
    <Column width='100%' height='100%' paddingX={['10px', '50px', '250px', '350px', '450px']} paddingY='25px'>
      <Row width='100%' justifyContent='space-between'>
        <Text fontSize={30} color='#262626'>
          Notícias
        </Text>
        <Row justifyContent='center' alignItems='center'>
          <Button>
            <SearchIcon style={{ color: '#262625', fontSize: 30, marginRight: -10 }} />
          </Button>
          <Input placeholder='Pesquisar' />
        </Row>
      </Row>
      <Row width='100%' height='1px' bgcolor='#262626' />
      <Column width='100%' height='100%'>
        {listNews.map((item: { id: number; title: string; date: string; text: string }) => (
          <Column key={item.id}>
            <Row width='100%' justifyContent='flex-start' paddingY='16px' paddingX='2px'>
              <Column width='100%'>
                <Text fontSize={20} color='#262626'>
                  {item.title}
                </Text>
              </Column>

              <Column width='100%'>
                <Text fontSize={12} color='#262626'>
                  {item.date}
                </Text>
              </Column>

              <Column width='100%'>
                <Text fontSize={16} color='#262626'>
                  {item.text}
                </Text>
              </Column>
            </Row>
            <Row width='100%' height='1px' bgcolor='#262626' />
          </Column>
        ))}
      </Column>
    </Column>
  )
}

export default ListNews
