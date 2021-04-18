import React, { Fragment, useCallback, useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { useQuery } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'

import { Column, Text, Row, Input, Image, Pagination } from 'components'
import { listPlayers } from 'services/players'

import { ListPlayerSiteDataProps, ListPlayerProps } from 'shared/listInterfaces'
import { formatQueryString } from 'utils/queryString'
import { getQueryStringsObject } from 'utils/getQueryObject'
import { EuiLoadingSpinner } from '@elastic/eui'

const ListPlayers: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<{ filter: string }>({} as { filter: string })
  const [queryString, setQueryString] = useState<string>('')
  const history = useHistory()
  const location = useLocation()

  const getPlayersHandler = async ({ queryKey }: { queryKey: string | Array<any> }) => {
    const { textFilter } = queryKey[1]
    return listPlayers(textFilter)
  }

  const { data: playersData, isLoading: isGettingPlayers } = useQuery<ListPlayerSiteDataProps>(
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
      <Row width='100%' flexWrap='wrap' justifyContent='flex-start'>
        {isGettingPlayers ? (
          <Row width='100%' height='120px' justifyContent='center' alignItems='center'>
            <EuiLoadingSpinner size='xl' />
          </Row>
        ) : playersData?.data && !!playersData.data.length ? (
          <Fragment>
            {playersData?.data?.map((item: ListPlayerProps) => (
              <Column
                key={item.idPlayer}
                justifyContent='center'
                height='200px'
                width='200px'
                alignItems='center'
                paddingX='10px'
              >
                <Image sourceimage={item.image} width='100px' height='100px' />
                <Row>
                  <Text fontSize={16} fontWeight='bold' color='#262626'>
                    {item.nickname}
                  </Text>
                </Row>
                <Row>
                  <Text fontSize={14} color='#262626'>
                    {item.teamName}
                  </Text>
                </Row>
              </Column>
            ))}
            {playersData && playersData.totalPages > 1 && (
              <Pagination
                totalPages={playersData.totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                handleSelectPage={() => handleSelectPage(currentPage + 1)}
              />
            )}
          </Fragment>
        ) : (
          <Row width='100%' height='40px' justifyContent='center' alignItems='center'>
            <Text fontSize={14} color='#262626'>
              Não há players!
            </Text>
          </Row>
        )}
      </Row>
    </Column>
  )
}

export default ListPlayers
