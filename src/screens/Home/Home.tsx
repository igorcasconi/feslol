import React from 'react'
import Carousel from 'react-elastic-carousel'

import { Column, Row, Image, Text } from '../../components'

import { listChampionship, listNews } from '../../utils/mockedHome'
import { ListChampionship } from '../../shared/listInterfaces'

import featuredImage from '../../assets/Featured.jpg'
import trophy from '../../assets/trophy.svg'
import logo from '../../assets/logo.png'
import { Link } from '@material-ui/core'

const Home: React.FC = () => {
  return (
    <Column width='100%' height='100%'>
      <Row width='100%' height={{ xs: '700px', sm: '500px', md: '500px', lg: '500px' }} position='relative' mb='24px'>
        <Image sourceimage={featuredImage} width='100%' height='100%' position='absolute' />
        <Row
          zIndex={1}
          width='100%'
          height='100%'
          justifyContent='center'
          alignItems='center'
          paddingX={['10px', '50px', '250px', '350px', '450px']}
          paddingY='45px'
        >
          <Carousel
            itemsToShow={1}
            enableAutoPlay
            preventDefaultTouchmoveEvent
            enableSwipe
            showArrows={false}
            renderPagination={({ pages, activePage, onClick }) => (
              <Row width='100%' justifyContent='center' mt='16px'>
                {pages.map((page: number) => {
                  const isActivePage = activePage === page
                  return (
                    <Row
                      key={page}
                      width='10px'
                      height='10px'
                      borderRadius='10px'
                      bgcolor={isActivePage ? '#004E96' : '#fff'}
                      onClick={() => onClick(String(page))}
                      mr='20px'
                    />
                  )
                })}
              </Row>
            )}
          >
            {listNews.map((item: { id: number; title: string; date: string; text: string }) => (
              <Column
                width='100%'
                height='100%'
                bgcolor='rgb(255,255,255,0.3)'
                borderRadius='8px'
                color='#fff'
                fontSize='36px'
                justifyContent='center'
                paddingX='20px'
                paddingY='45px'
                key={item.id}
              >
                <Row width='100%' justifyContent='center' mb='16px'>
                  <Text fontSize={36} color='#fff' textAlign='center'>
                    {item.title}
                  </Text>
                </Row>

                <Row width='100%' justifyContent='center' mb='16px'>
                  <Text fontSize={18} color='#fff' textAlign='center'>
                    {item.date}
                  </Text>
                </Row>

                <Row width='100%' justifyContent='center'>
                  <Text fontSize={20} color='#fff' textAlign='center'>
                    {item.text}
                  </Text>
                </Row>
              </Column>
            ))}
          </Carousel>
        </Row>
      </Row>
      <Column width='100%' paddingX={['10px', '50px', '150px', '250px']}>
        <Column width='100%' alignItems='center' justifyContent='center'>
          <Row width='100%' mb='20px' justifyContent='center'>
            <Text fontSize={24} color='#262626' lineHeight={28.13}>
              CAMPEONATOS DO SUDESTE
            </Text>
          </Row>

          <Row width='100%' justifyContent='center' alignItems='center'>
            <Row width='100%' mb='16px' justifyContent='center'>
              <Row overflowX='auto' paddingTop='10px'>
                {listChampionship.map((items: ListChampionship) => (
                  <Column
                    alignItems='center'
                    justifyContent='center'
                    bgcolor='#004E96'
                    width='200px'
                    height='180px'
                    key={items.id}
                    mr='16px'
                    mb='16px'
                    borderRadius='8px'
                    padding='16px'
                    position='relative'
                    border='2px solid rgb(204,204,204)'
                    boxShadow='2px 2px 10px #262626'
                  >
                    <Image sourceimage={logo} width='100%' height='100%' position='absolute' opacity={0.1} />
                    <Row width='100%' position='absolute' top={-5} justifyContent='center'>
                      <Image sourceimage={trophy} width='30px' height='30px' />
                    </Row>
                    <Row width='100%' mb='16px' justifyContent='center'>
                      <Text fontSize={14} color='#fff' textAlign='center'>
                        {items.name}
                      </Text>
                    </Row>
                    <Row width='100%' mb='16px' justifyContent='center'>
                      <Text fontSize={12} color='#fff' textAlign='center'>
                        {items.date} - {items.hour}
                      </Text>
                    </Row>
                    <Row width='100%' textOverflow='ellipsis' overflowX='hidden' whiteSpace='nowrap'>
                      <Link href='#'>
                        <Text fontSize={12} color='#01ddf1' textAlign='center'>
                          {items.link}
                        </Text>
                      </Link>
                    </Row>
                  </Column>
                ))}
              </Row>
            </Row>
          </Row>
        </Column>
      </Column>
    </Column>
  )
}

export default Home
