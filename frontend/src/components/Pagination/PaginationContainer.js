import React from 'react';
import PaginationPresenter from './PaginationPresenter';

const PaginationContainer = (props) => {
  const { rowsPerPage, PATH, datas, pageNumber } = props;

  return (
    <PaginationPresenter
      rowsPerPage={rowsPerPage}
      PATH={PATH}
      datas={datas}
      pageNumber={pageNumber}
    />
  );
};

export default PaginationContainer;
