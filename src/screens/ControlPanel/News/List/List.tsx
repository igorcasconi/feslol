import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { format } from 'date-fns'
import { EuiIcon, EuiLoadingSpinner } from '@elastic/eui'

import { Column, Pagination, Row, Table, TableCell, TableRow, Text } from 'components'
import { deleteNews, listNews } from 'services/cp'

import { linksControlPanel } from 'helpers/topbar'
import { NewsDataProps } from 'shared/listInterfaces'
import { ColumnNews } from 'shared/tableColumns'

const List: React.FC = () => {
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data: newsData, refetch: updateListNews, isLoading: isGettingNews } = useQuery<NewsDataProps>(
    ['newsGetter', currentPage],
    () => listNews(`page=${currentPage}`)
  )
  const { mutateAsync: mutateDeleteNews, isLoading: isDeletingNews } = useMutation(deleteNews)

  const deleteNewsHandler = async (id: string) => {
    try {
      await mutateDeleteNews(id)
      updateListNews()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Column width='100%' height='100%' paddingX={['10px', '50px', '250px', '350px', '450px']} paddingY='25px'>
      <Row width='100%' justifyContent='space-between'>
        <Text fontSize={20} color='#262626'>
          Notícias
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
          onClick={() => history.push(linksControlPanel.urlCreateNews)}
        >
          <Text fontSize={12} color='white'>
            Nova Notícia +
          </Text>
        </Column>
      </Row>
      <Column width='100%' height='100%' mt='20px'>
        <Table columns={ColumnNews}>
          {isGettingNews ? (
            <Row width='100%' height='40px' justifyContent='center' alignItems='center'>
              <EuiLoadingSpinner size='l' />
            </Row>
          ) : newsData ? (
            <Fragment>
              {newsData.data.map((data, indexColumnData) => {
                const colorRow = indexColumnData % 2 === 0 ? 'white' : '#ececec'
                return (
                  <TableRow key={indexColumnData} bgColor={colorRow}>
                    {ColumnNews.map((col, indexColumn) => {
                      return (
                        <Fragment key={indexColumn}>
                          <TableCell>
                            {col.fieldName === 'title' ? (
                              <Text fontSize={14} color='#262626'>
                                {data.title}
                              </Text>
                            ) : col.fieldName === 'date' ? (
                              <Text fontSize={14} color='#262626'>
                                {format(new Date(data.date), 'dd/MM/yyyy')}
                              </Text>
                            ) : (
                              col.fieldName === 'actions' && (
                                <TableCell width='100%' justifyContent='flex-end'>
                                  <Row onClick={() => deleteNewsHandler(data.idNews)}>
                                    {isDeletingNews ? (
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
              {newsData && newsData.totalPages > 1 && (
                <Pagination
                  totalPages={newsData.totalPages}
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
