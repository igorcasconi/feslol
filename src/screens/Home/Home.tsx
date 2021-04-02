import React, { useEffect, useMemo, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import { Link, useMediaQuery } from '@material-ui/core'
import { useQuery } from 'react-query'

import { Column, Row, Image, Text } from 'components'
import { featuredNews, lastChampionships, newTeamsAdded } from 'services/home'

import { listTeams } from 'utils/mockedHome'
import { FeaturedNewsProps, LastChampionshipProps, NewTeamsAddedProps } from 'shared/home'

import featuredImage from 'assets/Featured.jpg'
import trophy from 'assets/trophy.svg'
import logo from 'assets/logo.png'
import { format } from 'date-fns'
import styled, { css } from 'styled-components'
import { EuiLoadingSpinner } from '@elastic/eui'

const Home: React.FC = () => {
  const queryWidth800 = useMediaQuery('(max-width:800px)')
  const queryWidth700 = useMediaQuery('(max-width:700px)')
  const queryWidth500 = useMediaQuery('(max-width:500px)')
  const [visibleDiv, setVisibleDiv] = useState<boolean>(false)

  const { data: featuredNewsData } = useQuery<FeaturedNewsProps[]>('featuredNewsGetter', featuredNews)
  const { data: lastChampionshipsData, isLoading: isGettingChampionship } = useQuery<LastChampionshipProps[]>(
    'lastChampionshipsGetter',
    lastChampionships
  )
  const { data: newTeamsAddedData } = useQuery<NewTeamsAddedProps[]>('newTeamsAddedGetter', newTeamsAdded)

  const valueItemsCarouselTeams = useMemo(() => {
    if (queryWidth500) return 2

    if (queryWidth700) return 3

    if (queryWidth800) return 4

    return 5
  }, [queryWidth800, queryWidth700, queryWidth500])

  const scrollHandler = () => {
    if (document.documentElement.scrollTop > 250) setVisibleDiv(true)
  }

  useEffect(() => {
    window.onscroll = () => scrollHandler()
  }, [])

  return (
    <Column width='100%' mb='32px'>
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
                {featuredNewsData &&
                  pages.map((page: number) => {
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
            {featuredNewsData &&
              featuredNewsData.map((item: FeaturedNewsProps) => (
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
                  key={item.idNews}
                >
                  <Row width='100%' justifyContent='center' mb='16px'>
                    <Text fontSize={36} color='#fff' textAlign='center'>
                      {item.title}
                    </Text>
                  </Row>

                  <Row width='100%' justifyContent='center' mb='16px'>
                    <Text fontSize={18} color='#fff' textAlign='center'>
                      {format(new Date(item.date), 'dd/MM/yyyy')}
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

      <Column width='100%' paddingX={['10px', '50px', '150px', '250px']} mb='32px'>
        <Column width='100%' alignItems='center' justifyContent='center'>
          <Row width='100%' mb='20px' justifyContent='center'>
            <Text fontSize={24} color='#262626' lineHeight={28.13}>
              CAMPEONATOS DO SUDESTE
            </Text>
          </Row>

          <Row width='100%' height='200px' justifyContent='center' alignItems='center'>
            <Row width='100%' justifyContent='center'>
              <Row overflowX='auto' paddingTop='10px' overflowY='hidden'>
                {isGettingChampionship ? (
                  <Row width='100%' height='100%' justifyContent='center' alignItems='center'>
                    <EuiLoadingSpinner size='xl' />
                  </Row>
                ) : lastChampionshipsData ? (
                  lastChampionshipsData.map((items: LastChampionshipProps) => (
                    <Column
                      alignItems='center'
                      justifyContent='center'
                      bgcolor='#004E96'
                      width='200px'
                      height='180px'
                      key={items.idChampionship}
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
                          {format(new Date(items.date), 'dd/MM/yyyy')} - {format(new Date(items.date), 'HH:mm')}
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
                  ))
                ) : (
                  <Text fontSize={18} color='#262626' textAlign='center'>
                    Não há campeonatos no momento! Aguarde a nova temporada.
                  </Text>
                )}
              </Row>
            </Row>
          </Row>
        </Column>
      </Column>

      <Column width='100%' height='200px' position='relative' mb='130px'>
        <DivAnimation
          width='100%'
          bgcolor='#262626'
          paddingX={['10px', '50px', '150px', '350px', '450px']}
          paddingY='25px'
          alignItems='center'
          visible={visibleDiv}
          position='absolute'
        >
          <Row width='100%' justifyContent='flex-start' mb='16px'>
            <Text fontSize={24} color='#fff'>
              NOVOS TIMES
            </Text>
          </Row>

          <Row width='100%' height='140px' justifyContent='center' alignItems='center'>
            <Row width='100%' overflowX='auto' justifyContent='center'>
              <CarouselComponent
                itemsToShow={valueItemsCarouselTeams}
                enableAutoPlay
                preventDefaultTouchmoveEvent
                enableSwipe
                showArrows={false}
                renderPagination={() => <></>}
                autoPlaySpeed={2500}
              >
                {newTeamsAddedData &&
                  newTeamsAddedData.map((items: NewTeamsAddedProps) => (
                    <Row
                      width='100%'
                      justifyContent='flex-start'
                      alignItems='center'
                      key={items.idTeams}
                      cursor='pointer'
                    >
                      <Image sourceimage={items.image} width='120px' height='120px' />
                    </Row>
                  ))}
              </CarouselComponent>
            </Row>
          </Row>
        </DivAnimation>
      </Column>

      <Column
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
        paddingX={['10px', '50px', '150px', '250px', '450px']}
      >
        <Row width='100%' justifyContent='flex-start' mb='16px'>
          <Text fontSize={24} color='#262626'>
            PARCERIAS
          </Text>
        </Row>

        <Row width='100%' flexWrap='wrap' justifyContent='center'>
          {listTeams.map((items: { id: number; logoImage: string }) => (
            <Row justifyContent='center' alignItems='center' key={items.id} mr='32px' mb='16px'>
              <Image sourceimage={items.logoImage} width='120px' height='120px' />
            </Row>
          ))}
        </Row>
      </Column>
    </Column>
  )
}

const CarouselComponent = styled(Carousel)`
  & .rec-carousel-item {
    width: 120px;
    margin-right: 40px;
  }
`

const DivAnimation = styled(Column)<{ visible: boolean }>(
  ({ visible }) => `
  left: -100%;
  ${
    visible &&
    css`
      @keyframes slide-in {
        100% {
          left: 0;
        }
      }
      animation: slide-in 1s forwards;
    `
  }`
)

export default Home
