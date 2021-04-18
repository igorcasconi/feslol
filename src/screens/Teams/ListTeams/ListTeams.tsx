import React, { Fragment, useCallback, useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { useMediaQuery } from '@material-ui/core'
import { useQuery } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'

import { Column, Row, Text, Input, Image, Pagination } from 'components'
import { listTeams } from 'services/teams'

import { ListTeamsProps } from 'shared/listInterfaces'
import { formatQueryString } from 'utils/queryString'
import { getQueryStringsObject } from 'utils/getQueryObject'
import { EuiLoadingSpinner } from '@elastic/eui'

const ListTeams: React.FC = () => {
  const queryWidth500 = useMediaQuery('(max-width:500px)')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<{ filter: string }>({} as { filter: string })
  const [queryString, setQueryString] = useState<string>('')
  const history = useHistory()
  const location = useLocation()

  const getTeamsHandler = async ({ queryKey }: { queryKey: string | Array<any> }) => {
    const { textFilter } = queryKey[1]
    console.log(textFilter)
    return listTeams(textFilter)
  }

  const { data: teamsData, isLoading: isGettingTeams } = useQuery(
    ['teamsDataGetter', { textFilter: queryString }],
    getTeamsHandler,
    {
      keepPreviousData: true
    }
  )

  const handleSelectPage = (page: number) => {
    return history.push(
      `/teams?${formatQueryString({
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

  const handleFilterTeams = () => {
    if (!filter) return

    return history.push(`/teams?${formatQueryString(filter)}`)
  }

  useEffect(() => {
    formatFilter()
  }, [location.search, formatFilter])

  return (
    <Column width='100%' height='100%' paddingX={['10px', '50px', '250px', '350px', '450px']} paddingY='25px'>
      <Row width='100%' justifyContent='space-between'>
        <Text fontSize={30} color='#262626'>
          Teams LOL
        </Text>
        <Row justifyContent='center' alignItems='center'>
          <Column width='40px' height='40px' onClick={handleFilterTeams} cursor='pointer'>
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
        {isGettingTeams ? (
          <Row width='100%' height='120px' justifyContent='center' alignItems='center'>
            <EuiLoadingSpinner size='xl' />
          </Row>
        ) : teamsData?.data && teamsData.data.length ? (
          <Fragment>
            {teamsData?.data?.map((item: ListTeamsProps) => (
              <Column key={item.idTeam}>
                <Row width='100%' justifyContent='space-between' paddingY='16px' paddingX='2px'>
                  <Row justifyContent='flex-start' mr='20px'>
                    <Column mr='16px'>
                      <Image sourceimage={item.logoImage} width='100px' height='100px' />
                    </Column>

                    <Column maxWidth='200px' width='100%' mr='20px'>
                      <Text fontSize={20} color='#262626'>
                        {item.teamName}
                      </Text>
                    </Column>
                  </Row>
                  {!queryWidth500 && (
                    <Column width='50%'>
                      <Row width='100%'>
                        <Column width='100%'>
                          <Text fontSize={12} color='#686666'>
                            Último campeonato
                          </Text>
                          <Text fontSize={12} color='#262626'>
                            {item.lastChampionship}
                          </Text>
                        </Column>
                        <Column width='100%'>
                          <Text fontSize={12} color='#686666'>
                            Vitórias - Derrotas
                          </Text>
                          <Text fontSize={12} color='#262626'>
                            {item.victorys} - {item.defeats}
                          </Text>
                        </Column>
                      </Row>

                      <Column width='100%' mt='10px'>
                        <Text fontSize={12} color='#686666'>
                          Divisão
                        </Text>
                        <Text fontSize={12} color='#262626'>
                          {item.division}
                        </Text>
                      </Column>
                    </Column>
                  )}
                </Row>
                <Row width='100%' height='1px' bgcolor='#262626' />
              </Column>
            ))}
            {teamsData && teamsData.totalPages > 1 && (
              <Pagination
                totalPages={teamsData.totalPages}
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

export default ListTeams
