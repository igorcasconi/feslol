import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import { EuiLoadingSpinner } from '@elastic/eui'

import { Column, Input, Pagination, Row, Text } from 'components'
import { listChampionships } from 'services/championships'

import { formatQueryString } from 'utils/queryString'
import { getQueryStringsObject } from 'utils/getQueryObject'
import { ListChampionship, ListChampionshipSitesProps } from 'shared/listInterfaces'
import { format } from 'date-fns'

const ListChampionships: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<{ filter: string }>({} as { filter: string })
  const [queryString, setQueryString] = useState<string>('')
  const history = useHistory()
  const location = useLocation()

  const getPlayersHandler = async ({ queryKey }: { queryKey: string | Array<any> }) => {
    const { textFilter } = queryKey[1]
    return listChampionships(textFilter)
  }

  const { data: championshipsData, isLoading: isGettingChampionship } = useQuery<ListChampionshipSitesProps>(
    ['playersDataGetter', { textFilter: queryString }],
    getPlayersHandler,
    {
      keepPreviousData: true
    }
  )

  const handleSelectPage = (page: number) => {
    return history.push(
      `/players?${formatQueryString({
        ...filter,
        page
      })}`
    )
  }

  const formatFilter = useCallback(() => {
    const queryStringObject = getQueryStringsObject(location.search, { filter: '' })
    const { filter } = queryStringObject

    setFilter({ filter })
    return setQueryString(formatQueryString(queryStringObject))
  }, [setQueryString, location.search])

  const handleFilterPlayer = () => {
    if (!filter) return

    return history.push(`/players?${formatQueryString(filter)}`)
  }

  useEffect(() => {
    formatFilter()
  }, [location.search, formatFilter])

  return (
    <Column height='100%' width='100%' paddingX={['10px', '50px', '150px', '250px', '350px']} paddingY='25px'>
      <Row width='100%' justifyContent='space-between'>
        <Text fontSize={30} color='#262626'>
          Players
        </Text>
        <Row justifyContent='center' alignItems='center'>
          <Column width='40px' height='40px' onClick={handleFilterPlayer} cursor='pointer'>
            <SearchIcon style={{ color: '#262625', fontSize: 30, marginRight: -10, marginTop: 5 }} />
          </Column>
          <Input
            placeholder='Pesquisar'
            value={filter.filter ?? ''}
            onChange={event => setFilter({ filter: event.target.value })}
          />
        </Row>
      </Row>
      <Row width='100%' height='1px' bgcolor='#262626' />
      <Column width='100%' height='100%'>
        {isGettingChampionship ? (
          <Row width='100%' height='120px' justifyContent='center' alignItems='center'>
            <EuiLoadingSpinner size='xl' />
          </Row>
        ) : championshipsData?.data && championshipsData.data.length ? (
          <Fragment>
            {championshipsData?.data?.map((item: ListChampionship) => (
              <Column key={item.idChampionship}>
                <Row width='100%' justifyContent='space-between' paddingY='16px' paddingX='2px'>
                  <Row justifyContent='flex-start' mr='20px'>
                    <Column maxWidth='200px' width='100%' mr='20px'>
                      <Text fontSize={20} color='#262626'>
                        {item.championshipName}
                      </Text>
                    </Column>
                  </Row>
                  <Column width='50%'>
                    <Row width='100%'>
                      <Column width='100%'>
                        <Text fontSize={12} color='#686666'>
                          Divisão
                        </Text>
                        <Text fontSize={12} color='#262626'>
                          {item.division}
                        </Text>
                      </Column>
                      <Column width='100%'>
                        <Text fontSize={12} color='#686666'>
                          Data - Hora
                        </Text>
                        <Text fontSize={12} color='#262626'>
                          {format(new Date(item.date), 'dd/MM/yyyy')} - {format(new Date(item.date), 'HH:mm')}
                        </Text>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row width='100%' height='1px' bgcolor='#262626' />
              </Column>
            ))}
            {championshipsData && championshipsData.totalPages > 1 && (
              <Pagination
                totalPages={championshipsData.totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                handleSelectPage={() => handleSelectPage(currentPage + 1)}
              />
            )}
          </Fragment>
        ) : (
          <Row width='100%' height='40px' justifyContent='center' alignItems='center'>
            <Text fontSize={14} color='#262626'>
              Não há times!
            </Text>
          </Row>
        )}
      </Column>
    </Column>
  )
}

export default ListChampionships
