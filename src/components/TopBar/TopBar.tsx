import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Button, useMediaQuery, Modal, Backdrop, Fade } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline'

import { Row, Column, Input } from 'components'
import { TextMenu, TitleLogo } from './style'

import { menuItems } from 'helpers/topbar'
import { MenuProps } from './types'

const TopBar: React.FC = () => {
  const history = useHistory()
  const route = useLocation()
  const queryWidthForMenu = useMediaQuery('(max-width:1024px)')
  const queryWidthForSearch = useMediaQuery('(max-width:600px)')
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const handleClose = () => {
    setOpenMenu(false)
  }

  return (
    <Column width='100%' justifyContent='center' alignItems='center'>
      <Row width='100%' height='60px' px='35px' justifyContent='space-between' alignItems='center' bgcolor='#262626'>
        <TitleLogo>OSLOL</TitleLogo>
        {queryWidthForMenu === false ? (
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
        ) : (
          <Row border='1px solid #fff' borderRadius='8px' onClick={() => setOpenMenu(!openMenu)}>
            <ViewHeadlineIcon style={{ color: '#fff', fontSize: 30 }} />
          </Row>
        )}
        {queryWidthForSearch === false && (
          <Row justifyContent='center' alignItems='center'>
            <Button>
              <SearchIcon style={{ color: '#fff', fontSize: 30, marginRight: -10 }} />
            </Button>
            <Input placeholder='Pesquisar' />
          </Row>
        )}
      </Row>

      <Modal
        open={openMenu}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openMenu}>
          <Column borderRadius='8px' bgcolor='#262626' width='100%' mt='5.75rem'>
            {menuItems.map((items: MenuProps) => (
              <Row
                key={items.id}
                mr='18px'
                width='100%'
                height='45px'
                padding='6px'
                justifyContent='center'
                alignItems='center'
                bgcolor={route.pathname === items.url ? '#004E96' : 'rgba(255, 255, 255, 0.1)'}
                onClick={() => {
                  history.push(items.url)
                  setOpenMenu(false)
                }}
              >
                <TextMenu>{items.name}</TextMenu>
              </Row>
            ))}
          </Column>
        </Fade>
      </Modal>
    </Column>
  )
}

export default TopBar
