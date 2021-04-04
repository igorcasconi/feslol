import React, { Fragment, useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'

import { Column, Row, Text, Input, Pagination } from 'components'
import { listNews } from 'services/news'

import { useMutation } from 'react-query'
import { format } from 'date-fns'
import { EuiLoadingSpinner } from '@elastic/eui'
import { useHistory, useLocation } from 'react-router-dom'
import { getQueryStringsObject } from 'utils/getQueryObject'

interface FilterProps {
  page: number
  filter: string
}

const ListNews: React.FC = () => {
  const history = useHistory()
  const route = useLocation()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<FilterProps>({ page: 1, filter: '' })

  const { data: newsData, isLoading: isGettingNews, mutateAsync: filterNews } = useMutation(listNews)

  const filterNewsHandler = () => {
    if (!filter.filter) return

    history.push(`/news?page=${filter.page}&filter=${filter.filter}`)
    filterNews(`page=${filter.page}&filter=${filter.filter}`)
  }

  useEffect(() => {
    let currentFilter

    if (route.search) {
      const object: FilterProps = {} as FilterProps
      const query = getQueryStringsObject(route.search, object)
      setFilter({ page: query.page, filter: query.filter })
      currentFilter = { page: query.page, filter: query.filter }
    } else {
      filterNews(`page=${currentPage}`)
    }

    if (currentFilter) filterNews(`page=${currentFilter.page}&filter=${currentFilter.filter}`)
  }, [filterNews, route.search])

  return (
    <Column width='100%' height='100%' paddingX={['10px', '50px', '250px', '350px', '450px']} paddingY='25px'>
      <Row width='100%' justifyContent='space-between'>
        <Text fontSize={30} color='#262626'>
          Notícias
        </Text>
        <Row justifyContent='center' alignItems='center'>
          <Column width='40px' height='40px' onClick={filterNewsHandler} cursor='pointer'>
            <SearchIcon style={{ color: '#262625', fontSize: 30, marginRight: -10 }} />
          </Column>
          <Input
            placeholder='Pesquisar'
            value={filter.filter}
            onChange={event => setFilter({ page: currentPage, filter: event.target.value })}
          />
        </Row>
      </Row>
      <Row width='100%' height='1px' bgcolor='#262626' />
      <Column width='100%' height='100%'>
        {isGettingNews ? (
          <Row width='100%' height='120px' justifyContent='center' alignItems='center'>
            <EuiLoadingSpinner size='xl' />
          </Row>
        ) : newsData && !!newsData.data.length ? (
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
              Não há notícias!
            </Text>
          </Row>
        )}
      </Column>
    </Column>
  )
}

export default ListNews
