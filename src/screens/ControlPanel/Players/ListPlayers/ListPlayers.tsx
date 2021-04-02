import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { EuiIcon, EuiLoadingSpinner } from '@elastic/eui'
import { useMutation, useQuery } from 'react-query'

import { Column, Pagination, Row, Table, TableCell, TableRow, Text } from 'components'
import { deletePlayer, listPlayers } from 'services/cp'

import { linksControlPanel } from 'helpers/topbar'
import { ColumnsPlayers } from 'shared/tableColumns'
import { ListPlayersCPProps } from 'shared/listInterfaces'

const ListPlayers: React.FC = () => {
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data: playersData, isLoading: isGettingPlayer, refetch: updateListPlayer } = useQuery<ListPlayersCPProps>(
    ['playerListGetter', currentPage],
    () => listPlayers(`page=${currentPage}`)
  )

  const { mutateAsync: mutateDeletePlayer, isLoading: isDeletingPlayer } = useMutation(deletePlayer)

  const deletePlayerHandler = async (id: string) => {
    try {
      await mutateDeletePlayer(id)
      updateListPlayer()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Column width='100%' height='100%' paddingX={['10px', '50px', '250px', '350px', '450px']} paddingY='25px'>
      <Row width='100%' justifyContent='space-between'>
        <Text fontSize={20} color='#262626'>
          Players
        </Text>

        <Column
          width='130px'
          height='36px'
          paddingY='16px'
          justifyContent='center'
          alignItems='center'
          bgColor='#0e75d6'
          borderRadius='8px'
          cursor='pointer'
          onClick={() => history.push(linksControlPanel.urlCreatePlayers)}
        >
          <Text fontSize={12} color='white'>
            Novo Player +
          </Text>
        </Column>
      </Row>

      <Column width='100%' height='100%' mt='20px'>
        <Table columns={ColumnsPlayers}>
          {isGettingPlayer ? (
            <Row width='100%' height='40px' justifyContent='center' alignItems='center'>
              <EuiLoadingSpinner size='l' />
            </Row>
          ) : playersData ? (
            <Fragment>
              {playersData.data.map((data, indexColumnData) => {
                const colorRow = indexColumnData % 2 === 0 ? 'white' : '#ececec'
                return (
                  <TableRow key={indexColumnData} bgColor={colorRow}>
                    {ColumnsPlayers.map((col, indexColumn) => {
                      return (
                        <Fragment key={indexColumn}>
                          <TableCell>
                            {col.fieldName === 'nickname' ? (
                              <Text fontSize={14} color='#262626'>
                                {data.nickname}
                              </Text>
                            ) : col.fieldName === 'playerName' ? (
                              <Text fontSize={14} color='#262626'>
                                {data.playerName}
                              </Text>
                            ) : col.fieldName === 'teamName' ? (
                              <Text fontSize={14} color='#262626'>
                                {data.teamName}
                              </Text>
                            ) : (
                              col.fieldName === 'actions' && (
                                <TableCell width='100%' justifyContent='flex-end'>
                                  <Row onClick={() => deletePlayerHandler(data.idPlayer)}>
                                    {isDeletingPlayer ? (
                                      <Row justifyContent='center' alignItems='center'>
                                        <EuiLoadingSpinner size='m' />
                                      </Row>
                                    ) : (
                                      <EuiIcon type='trash' color='red' />
                                    )}
                                  </Row>
                                </TableCell>
                              )
                            )}
                          </TableCell>
                        </Fragment>
                      )
                    })}
                  </TableRow>
                )
              })}
              {playersData && playersData.totalPages > 1 && (
                <Pagination
                  totalPages={playersData.totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </Fragment>
          ) : (
            <Row width='100%' height='40px' justifyContent='center' alignItems='center'>
              <Text fontSize={14} color='#262626'>
                Não há dados!
              </Text>
            </Row>
          )}
        </Table>
      </Column>
    </Column>
  )
}

export default ListPlayers
