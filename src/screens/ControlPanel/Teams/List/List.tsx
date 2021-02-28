import React from 'react'
import { useHistory } from 'react-router-dom'

import { Column, Row, Text } from 'components'
import { linksControlPanel } from 'helpers/topbar'

const List: React.FC = () => {
  const history = useHistory()

  return (
    <Column width='100%' height='100%' paddingX={['10px', '50px', '250px', '350px', '450px']} paddingY='25px'>
      <Row width='100%' justifyContent='space-between'>
        <Text fontSize={20} color='#262626'>
          Teams
        </Text>

        <Column
          width='130px'
          height='36px'
          paddingY='16px'
          justifyContent='center'
          alignItems='center'
          bgColor='#0e75d6'
          borderRadius='8px'
          cursor='pointer'
          onClick={() => history.push(linksControlPanel.urlCreateTeams)}
        >
          <Text fontSize={12} color='white'>
            Novo Time +
          </Text>
        </Column>
      </Row>
    </Column>
  )
}

export default List
