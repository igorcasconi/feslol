import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Button, useMediaQuery } from '@material-ui/core'

import { Column, Row, Text, Input, Image } from 'components'
import { listTeams } from 'utils/mockedHome'
import { ListTeamsProps } from 'shared/listInterfaces'

const ListTeams: React.FC = () => {
  const queryWidth500 = useMediaQuery('(max-width:500px)')

  return (
    <Column width='100%' height='100%' paddingX={['10px', '50px', '250px', '350px', '450px']} paddingY='25px'>
      <Row width='100%' justifyContent='space-between'>
        <Text fontSize={30} color='#262626'>
          Teams LOL
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
        {listTeams.map((item: ListTeamsProps) => {
          if (item.name)
            return (
              <Column key={item.id}>
                <Row width='100%' justifyContent='space-between' paddingY='16px' paddingX='2px'>
                  <Row justifyContent='flex-start' mr='20px'>
                    <Column mr='16px'>
                      <Image sourceimage={item.logoImage} width='100px' height='100px' />
                    </Column>

                    <Column maxWidth='200px' width='100%' mr='20px'>
                      <Text fontSize={20} color='#262626'>
                        {item.name}
                      </Text>
                    </Column>
                  </Row>
                  {!queryWidth500 && (
                    <Column width='50%'>
                      <Row width='100%'>
                        <Column width='100%'>
                          <Text fontSize={12} color='#686666'>
                            Último campeonato
                          </Text>
                          <Text fontSize={12} color='#262626'>
                            {item.lastChampionship}
                          </Text>
                        </Column>
                        <Column width='100%'>
                          <Text fontSize={12} color='#686666'>
                            Vitórias - Derrotas
                          </Text>
                          <Text fontSize={12} color='#262626'>
                            {item.results}
                          </Text>
                        </Column>
                      </Row>

                      <Column width='100%' mt='10px'>
                        <Text fontSize={12} color='#686666'>
                          Divisão
                        </Text>
                        <Text fontSize={12} color='#262626'>
                          {item.division}
                        </Text>
                      </Column>
                    </Column>
                  )}
                </Row>
                <Row width='100%' height='1px' bgcolor='#262626' />
              </Column>
            )
        })}
      </Column>
    </Column>
  )
}

export default ListTeams
