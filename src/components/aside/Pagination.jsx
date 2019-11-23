import React from 'react'

const Pagination = props => {
  const { totalPages, itemsPerPage } = props;
  return (
    <ul className="pagination">
      <li className="pages"></li>
    </ul>
  )
}

export default Pagination;