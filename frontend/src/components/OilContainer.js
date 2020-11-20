/* eslint-disable react-hooks/rules-of-hooks */
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import OilPresenter from './OilPresenter';

const OilContainer = () => {
  const [datas, setDatas] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const userid = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    const url = `http://localhost:8000/oil/${userid}/`;
    Axios.get(url, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => {
        const oils = response.data;
        return oils;
      })
      .then((oils) => setDatas(oils));
  }, []);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(5);
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, datas.length - page * rowsPerPage);

  //데이터 정렬
  const onRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'asc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  //체크박스 전체 클릭
  const onSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = datas.map((n) => n.date);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  //체크박스 클릭
  const onClick = (event, data) => {
    const selectedIndex = selected.indexOf(data);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, data);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  console.log(selected);
  //페이지 이동
  const onChangePage = (newPage) => {
    setPage(newPage);
  };

  //리스트 출력 갯수 변경
  const onChangeRowsPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <OilPresenter
      datas={datas}
      //table head & toolbar
      selected={selected}
      order={order}
      orderBy={orderBy}
      onSelectAllClick={onSelectAllClick}
      onRequestSort={onRequestSort}
      //table body
      stableSort={stableSort}
      getComparator={getComparator}
      isSelected={isSelected}
      onClick={onClick}
      page={page}
      rowsPerPage={rowsPerPage}
      //table footer
      emptyRows={emptyRows}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  );
};

export default OilContainer;
