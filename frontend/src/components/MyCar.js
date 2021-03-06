import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const tableStyle = makeStyles({
  table: {
    minWidth: 700,
  },
  container: {
    marginTop: 30,
  },
  cell: {
    width: 200,
    textAlign: 'center',
  },
});
const MyCar = () => {
  useEffect(() => {
    const userid = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:8000/mycar/${userid}/`, {
        headers: {
          Authorization: 'JWT ' + token,
        },
      })
      .then((response) => response.data)
      .then(({ car_company, car_name, car_oil, car_old, car_number }) =>
        setMyCar([
          {
            carMaker: car_company,
            carName: car_name,
            carYear: car_old,
            oilKind: car_oil,
            carNum: car_number,
          },
        ]),
      )
      .catch((error) => console.log(error.response));
  }, []);
  const classes = tableStyle();
  const [myCar, setMyCar] = useState([
    {
      carMaker: '',
      carName: '',
      carYear: '',
      oilKind: '',
      carNum: '',
    },
  ]);
  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center">
              <h2>{localStorage.getItem('userid')} 님의 차량정보</h2>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <TableCell className={classes.cell}>제조사</TableCell>
            {myCar[0].carMaker === '' ? (
              <TableCell align="center">등록 된 정보가 없습니다.</TableCell>
            ) : (
              <TableCell align="center">{myCar[0].carMaker}</TableCell>
            )}
          </StyledTableRow>
          <StyledTableRow>
            <TableCell className={classes.cell}>차 종</TableCell>
            {myCar[0].carName === '' ? (
              <TableCell align="center">등록 된 정보가 없습니다.</TableCell>
            ) : (
              <TableCell align="center">{myCar[0].carName}</TableCell>
            )}
          </StyledTableRow>
          <StyledTableRow>
            <TableCell className={classes.cell}>연식</TableCell>
            {myCar[0].carYear === null ? (
              <TableCell align="center">등록 된 정보가 없습니다.</TableCell>
            ) : (
              <TableCell align="center">{myCar[0].carYear}</TableCell>
            )}
          </StyledTableRow>
          <StyledTableRow>
            <TableCell className={classes.cell}>유종</TableCell>
            {myCar[0].oilKind === null ? (
              <TableCell align="center">등록 된 정보가 없습니다.</TableCell>
            ) : (
              <TableCell align="center">{myCar[0].oilKind}</TableCell>
            )}
          </StyledTableRow>
          <StyledTableRow>
            <TableCell className={classes.cell}>차량번호</TableCell>
            {myCar[0].carNum === '' ? (
              <TableCell align="center">등록 된 정보가 없습니다.</TableCell>
            ) : (
              <TableCell align="center">{myCar[0].carNum}</TableCell>
            )}
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyCar;
