import React from 'react'
import { Pagination } from 'react-bootstrap'

const PaginationLinks =({ currentPage, numberOfPages }) => {
  // TODO 페이지는 Post에만 둘 예정이므로 1번으로 이동하면 '/'가 아닌 '/page/1'로 이동하도록 변경할 것
  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages
  const previousPage = currentPage - 1 === 1 ? '/' : '/page/' + (currentPage - 1).toString()
  const nextPage = '/page/' + (currentPage + 1).toString()
  return (
    <Pagination className="justify-content-center">
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