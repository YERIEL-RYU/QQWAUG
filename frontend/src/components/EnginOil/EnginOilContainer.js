import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EnginOilPresenter from './EnginOilPresenter';
import axios from 'axios';

const EnginOilContainer = () => {
  const [enginoils, setEnginoils] = useState([]);
  const token = localStorage.getItem('token');
  const userid = localStorage.getItem('userid');
  const url = 'http://localhost:8000/enginoil/' + userid + '/';
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: 'JWT ' + token,
        },
      })
      .then((response) => {
        const data = response.data;
        return data;
      })
      .then((data) => setEnginoils(data))
      .catch((error) => {
        console.log(error.status);
      });
  }, []);
  const rowsPerPage = 9;
  const PATH = '/enginoil';
  const { pageNumber = 1 } = useParams();
  //데이터 시작 && 끝
  const startRow = (Number(pageNumber) - 1) * rowsPerPage;
  const endRow = (Number(pageNumber) - 1) * rowsPerPage + rowsPerPage;

  const onDelete = useCallback(() => {
    axios.delete(url).then((response) => {
      console.log(response.status);
    });
  });
  console.log(enginoils.length);
  return (
    <EnginOilPresenter
      datas={enginoils}
      rowsPerPage={rowsPerPage}
      PATH={PATH}
      startRow={startRow}
      endRow={endRow}
      pageNumber={pageNumber}
      onDelete={onDelete}
    />
  );
};

export default EnginOilContainer;
