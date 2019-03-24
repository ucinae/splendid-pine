import React from 'react'
import { Pagination } from 'react-bootstrap'

const PaginationLinks =({ currentPage, numberOfPages }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages
  const previousPage = currentPage - 1 === 1 ? '/' : '/page/' + (currentPage - 1).toString()
  const nextPage = '/page/' + (currentPage + 1).toString()
  return (
    <Pagination>
      {isFirst ? (
        <Pagination.Prev href='/' disabled />
      ) : (
        <Pagination.Prev href={previousPage} />
      )}

      {Array.from({ length: numberOfPages }, (_, i) => currentPage === i + 1 ? (
        <Pagination.Item active key={`page-number${i + 1}`} href={`/${i === 0 ? "" : "page/" + (i + 1)}`}>
            {i + 1}
        </Pagination.Item>
      ) : (
        <Pagination.Item key={`page-number${i + 1}`} href={`/${i === 0 ? "" : "page/" + (i + 1)}`}>
            {i + 1}
        </Pagination.Item>
      ))}

      {isLast ? (
        <Pagination.Next href={nextPage} disabled />
      ) : (
        <Pagination.Next href={nextPage} />
      )}
    </Pagination>
  )
}

export default PaginationLinks