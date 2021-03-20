import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { EuiIcon, EuiLoadingSpinner } from '@elastic/eui'
import { useMutation, useQuery } from 'react-query'

import { Column, Pagination, Row, Table, TableCell, TableRow, Text } from 'components'
import { linksControlPanel } from 'helpers/topbar'
import { ColumnTeams } from 'shared/tableColumns'
import { deleteTeam, listTeams } from 'services/cp'

const List: React.FC = () => {
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data: teamsData, isLoading: isGettingTeams, refetch: updateListTeam } = useQuery(
    ['teamsGetter', currentPage],
    () => listTeams(`page=${currentPage}`)
  )

  const { mutateAsync: mutateDeleteTeam, isLoading: isDeletingTeam } = useMutation(deleteTeam)

  const deleteTeamHandler = async (id: string) => {
    try {
      await mutateDeleteTeam(id)
      updateListTeam()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Column width='100%' height='100%' paddingX={['10px', '50px', '250px', '350px', '450px']} paddingY='25px'>
      <Row width='100%' justifyContent='space-between'>
        <Text fontSize={20} color='#262626'>
          Teams
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
          onClick={() => history.push(linksControlPanel.urlCreateTeams)}
        >
          <Text fontSize={12} color='white'>
            Novo Time +
          </Text>
        </Column>
      </Row>

      <Column width='100%' height='100%' mt='20px'>
        <Table columns={ColumnTeams}>
          {isGettingTeams ? (
            <Row width='100%' height='40px' justifyContent='center' alignItems='center'>
              <EuiLoadingSpinner size='l' />
            </Row>
          ) : teamsData ? (
            <Fragment>
              {teamsData.data.map((data, indexColumnData) => {
                const colorRow = indexColumnData % 2 === 0 ? 'white' : '#ececec'
                return (
                  <TableRow key={indexColumnData} bgColor={colorRow}>
                    {ColumnTeams.map((col, indexColumn) => {
                      return (
                        <Fragment key={indexColumn}>
                          <TableCell>
                            {col.fieldName === 'name' ? (
                              <Text fontSize={14} color='#262626'>
                                {data.name}
                              </Text>
                            ) : col.fieldName === 'division' ? (
                              <Text fontSize={14} color='#262626'>
                                {data.division}
                              </Text>
                            ) : (
                              col.fieldName === 'actions' && (
                                <TableCell width='100%' justifyContent='flex-end'>
                                  <Row onClick={() => deleteTeamHandler(data.idTeam)}>
                                    {isDeletingTeam ? (
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
              {teamsData && teamsData.totalPages > 1 && (
                <Pagination
                  totalPages={teamsData.totalPages}
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

export default List
