import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { EuiIcon, EuiLoadingSpinner } from '@elastic/eui'
import { useMutation, useQuery } from 'react-query'
import { format } from 'date-fns'

import { Column, Pagination, Row, Table, TableCell, TableRow, Text } from 'components'
import { deleteChampionship, listChampionship } from 'services/cp'

import { ListChampionshipCPProps } from 'shared/listInterfaces'
import { linksControlPanel } from 'helpers/topbar'
import { ColumnsChampionship } from 'shared/tableColumns'

const ListChampionship: React.FC = () => {
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const {
    data: championshipData,
    isLoading: isGettingChampionships,
    refetch: updateListChampionship
  } = useQuery<ListChampionshipCPProps>(['championshipCPGetter', currentPage], () =>
    listChampionship(`page=${currentPage}`)
  )

  const { mutateAsync: mutateDeleteChampionship, isLoading: isDeletingChampionship } = useMutation(deleteChampionship)

  const deleteNewsHandler = async (id: string) => {
    try {
      await mutateDeleteChampionship(id)
      updateListChampionship()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Column width='100%' height='100%' paddingX={['10px', '50px', '250px', '350px', '450px']} paddingY='25px'>
      <Row width='100%' justifyContent='space-between'>
        <Text fontSize={20} color='#262626'>
          Campeonatos
        </Text>

        <Column
          width='150px'
          height='36px'
          paddingY='16px'
          justifyContent='center'
          alignItems='center'
          bgColor='#0e75d6'
          borderRadius='8px'
          cursor='pointer'
          onClick={() => history.push(linksControlPanel.urlCreateChampionship)}
        >
          <Text fontSize={12} color='white'>
            Novo Campeonato +
          </Text>
        </Column>
      </Row>

      <Column width='100%' height='100%' mt='20px'>
        <Table columns={ColumnsChampionship}>
          {isGettingChampionships ? (
            <Row width='100%' height='40px' justifyContent='center' alignItems='center'>
              <EuiLoadingSpinner size='l' />
            </Row>
          ) : championshipData ? (
            <Fragment>
              {championshipData.data.map((data, indexColumnData) => {
                const colorRow = indexColumnData % 2 === 0 ? 'white' : '#ececec'
                return (
                  <TableRow key={indexColumnData} bgColor={colorRow}>
                    {ColumnsChampionship.map((col, indexColumn) => {
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
                            ) : col.fieldName === 'date' ? (
                              <Text fontSize={14} color='#262626'>
                                {format(new Date(data.date), 'dd/MM/yyyy')}
                              </Text>
                            ) : (
                              col.fieldName === 'actions' && (
                                <TableCell width='100%' justifyContent='flex-end'>
                                  <Row onClick={() => deleteNewsHandler(data.idChampionship)}>
                                    {isDeletingChampionship ? (
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
              {championshipData && championshipData.totalPages > 1 && (
                <Pagination
                  totalPages={championshipData.totalPages}
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

export default ListChampionship
