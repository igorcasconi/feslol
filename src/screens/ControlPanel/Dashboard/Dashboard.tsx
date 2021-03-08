import React from 'react'
import SecurityIcon from '@material-ui/icons/Security'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import PostAddIcon from '@material-ui/icons/PostAdd'
import { useHistory } from 'react-router-dom'

import { Column, Row, Text } from 'components'

import { linksControlPanel } from 'helpers/topbar'

const Dashboard: React.FC = () => {
  const history = useHistory()

  return (
    <Column width='100%' height='100%' paddingX={['10px', '50px', '250px', '350px', '450px']} paddingY='45px'>
      <Row width='100%' mb='16px' justifyContent='flex-start'>
        <Text fontSize={20} color='#262626'>
          Dashboard
        </Text>
      </Row>
      <Row width='100%' justifyContent='center' flexWrap='wrap'>
        <Column
          width='120px'
          height='120px'
          cursor='pointer'
          borderRadius='8px'
          boxShadow='10px 5px 5px #ccc'
          bgColor='#0e75d6'
          justifyContent='center'
          alignItems='center'
          mr='20px'
          mb='16px'
          onClick={() => history.push(linksControlPanel.urlNews)}
        >
          <PostAddIcon style={{ height: 70, width: 70, color: 'white' }} />
          <Text fontSize={16} color='white'>
            Notícias
          </Text>
        </Column>

        <Column
          width='120px'
          height='120px'
          cursor='pointer'
          borderRadius='8px'
          boxShadow='10px 5px 5px #ccc'
          bgColor='#0e75d6'
          justifyContent='center'
          alignItems='center'
          mr='20px'
          mb='16px'
          onClick={() => history.push(linksControlPanel.urlTeams)}
        >
          <SecurityIcon style={{ height: 70, width: 70, color: 'white' }} />
          <Text fontSize={16} color='white'>
            Teams
          </Text>
        </Column>

        <Column
          width='120px'
          height='120px'
          cursor='pointer'
          borderRadius='8px'
          boxShadow='10px 5px 5px #ccc'
          bgColor='#0e75d6'
          justifyContent='center'
          alignItems='center'
          mr='20px'
          mb='16px'
          onClick={() => history.push(linksControlPanel.urlPlayers)}
        >
          <PersonAddIcon style={{ height: 70, width: 70, color: 'white' }} />
          <Text fontSize={16} color='white'>
            Players
          </Text>
        </Column>

        <Column
          width='120px'
          height='120px'
          cursor='pointer'
          borderRadius='8px'
          boxShadow='10px 5px 5px #ccc'
          bgColor='#0e75d6'
          justifyContent='center'
          alignItems='center'
          mr='20px'
          mb='16px'
          onClick={() => history.push(linksControlPanel.urlTeams)}
        >
          <SportsEsportsIcon style={{ height: 70, width: 70, color: 'white' }} />
          <Text fontSize={12} color='white'>
            Campeonatos
          </Text>
        </Column>

        <Column
          width='120px'
          height='120px'
          cursor='pointer'
          borderRadius='8px'
          boxShadow='10px 5px 5px #ccc'
          bgColor='#0e75d6'
          justifyContent='center'
          alignItems='center'
          mr='20px'
          mb='16px'
          onClick={() => history.push(linksControlPanel.urlTeams)}
        >
          <ThumbUpIcon style={{ height: 70, width: 70, color: 'white' }} />
          <Text fontSize={16} color='white'>
            Parceiros
          </Text>
        </Column>
      </Row>
    </Column>
  )
}

export default Dashboard
