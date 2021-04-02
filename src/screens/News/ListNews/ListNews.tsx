import React, { Fragment, useState } from 'react'
import { Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { Column, Row, Text, Input, Pagination } from 'components'
import { listNews } from 'services/news'

import { useQuery } from 'react-query'
import { NewsSiteDataProps } from 'shared/listInterfaces'
import { format } from 'date-fns'
import { EuiLoadingSpinner } from '@elastic/eui'

const ListNews: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data: newsData, isLoading: isGettingNews } = useQuery<NewsSiteDataProps>(['newsGetter', currentPage], () =>
    listNews(`page=${currentPage}`)
  )

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
        {isGettingNews ? (
          <Row width='100%' height='120px' justifyContent='center' alignItems='center'>
            <EuiLoadingSpinner size='xl' />
          </Row>
        ) : newsData ? (
          <Fragment>
            {newsData.data.map(item => (
              <Column key={item.idNews}>
                <Column width='100%' justifyContent='flex-start' paddingY='16px' paddingX='2px' cursor='pointer'>
                  <Row width='100%' mb='8px'>
                    <Text fontSize={20} color='#262626'>
                      {item.title}
                    </Text>
                  </Row>

                  <Row width='100%' mb='8px'>
                    <Text fontSize={12} color='#262626'>
                      {format(new Date(item.date), 'dd/MM/yyyy')} - {format(new Date(item.date), 'HH:mm')}
                    </Text>
                  </Row>

                  <Row width='100%'>
                    <Text fontSize={16} color='#262626'>
                      {item.text}
                    </Text>
                  </Row>
                </Column>
                <Row width='100%' height='1px' bgcolor='#262626' />
              </Column>
            ))}
            {newsData && newsData.totalPages > 1 && (
              <Pagination totalPages={newsData.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
          </Fragment>
        ) : (
          <Row width='100%' height='40px' justifyContent='center' alignItems='center'>
            <Text fontSize={14} color='#262626'>
              Não há dados!
            </Text>
          </Row>
        )}
      </Column>
    </Column>
  )
}

export default ListNews
