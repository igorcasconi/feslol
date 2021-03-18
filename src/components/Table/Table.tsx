import React from 'react'

import { Column, Row, Text } from 'components'

import { ColumnTableType, PaginationProps, TableCellProps, TableProps, TableRowProps } from './types'
import styled from 'styled-components'
import { EuiIcon } from '@elastic/eui'

export const Table: React.FC<TableProps> = ({ columns, children }) => {
  return (
    <Column width='100%' height='100%'>
      <Row width='100%' height='40px' justifyContent='flex-start' bgColor='#262626' paddingX='16px'>
        {columns.map((col: ColumnTableType, index: number) => (
          <Column key={index} width='100%'>
            {col.name === 'actions' ? (
              <Column height='100%' width='15%' justifyContent='flex-end' mr='16px' />
            ) : (
              <Column height='100%' width='50%' justifyContent='center' mr='16px'>
                <Text fontSize={14} color='white'>
                  {col.name}
                </Text>
              </Column>
            )}
          </Column>
        ))}
      </Row>
      {children}
    </Column>
  )
}

export const TableCell: React.FC<TableCellProps> = ({ width = '50%', justifyContent = 'flex-start', children }) => (
  <Row width={width} height='100%' alignItems='center' justifyContent={justifyContent}>
    {children}
  </Row>
)

export const TableRow: React.FC<TableRowProps> = ({ bgColor, children }) => (
  <TableRowComponent width='100%' height='40px' bgColor={bgColor} paddingX='16px' cursor='pointer'>
    {children}
  </TableRowComponent>
)

export const Pagination: React.FC<PaginationProps> = ({ totalPages = 1, currentPage, setCurrentPage }) => {
  const pages = Array.from({ length: totalPages }, (v, k) => k + 1)

  return (
    <Row width='100%' justifyContent='center' mt='16px'>
      <Row onClick={() => setCurrentPage(currentPage - 1)} mr='6px' padding='4px' cursor='pointer'>
        <EuiIcon type='arrowLeft' />
      </Row>
      {pages.map((item: number) => {
        const isCurrentPage = currentPage === item
        return (
          <Row
            cursor='pointer'
            key={item}
            mr='2px'
            bgColor={isCurrentPage ? '#004E96' : 'none'}
            padding='6px'
            borderRadius='6px'
            onClick={() => setCurrentPage(item)}
          >
            <Text fontSize={14} color={isCurrentPage ? 'white' : '#262626'}>
              {item}
            </Text>
          </Row>
        )
      })}
      <Row onClick={() => setCurrentPage(currentPage + 1)} padding='4px' cursor='pointer'>
        <EuiIcon type='arrowRight' />
      </Row>
    </Row>
  )
}

const TableRowComponent = styled(Row)`
  transition: all 0.5s;
  &:hover {
    background-color: #a6a2a2;
  }
`
