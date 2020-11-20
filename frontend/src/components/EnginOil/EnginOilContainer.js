import React from 'react';
import { useParams } from 'react-router-dom';
import EnginOilPresenter from './EnginOilPresenter';

const EnginOilContainer = () => {
  const rowsPerPage = 9;
  const PATH = '/enginoil';
  const { pageNumber = 1 } = useParams();
  //데이터 시작 && 끝
  const startRow = (Number(pageNumber) - 1) * rowsPerPage;
  const endRow = (Number(pageNumber) - 1) * rowsPerPage + rowsPerPage;

  return (
    <EnginOilPresenter
      rowsPerPage={rowsPerPage}
      PATH={PATH}
      startRow={startRow}
      endRow={endRow}
      pageNumber={pageNumber}
    />
  );
};

export default EnginOilContainer;
