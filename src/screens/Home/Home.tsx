import React from 'react'
import Carousel from 'react-elastic-carousel'

import { Column, Row, Image, Text } from '../../components'

import featuredImage from '../../assets/Featured.jpg'

const listNews = [
  {
    id: 1,
    title: 'Text Notícia 1',
    date: '15/07/2020',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
  },
  {
    id: 2,
    title: 'Text Notícia 2',
    date: '15/07/2020',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
  },
  {
    id: 3,
    title: 'Text Notícia 3',
    date: '15/07/2020',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
  }
]

const Home: React.FC = () => {
  return (
    <Column width='100%' height='100%'>
      <Row width='100%' height={{ xs: '700px', sm: '500px', md: '500px', lg: '500px' }} position='relative'>
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
    </Column>
  )
}

export default Home
