import React, { useCallback, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

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
    marginBottom: 30,
  },
});
const MyCarAdd = ({ history }) => {
  const classes = tableStyle();
  const [value, setValue] = useState([]);
  const onGoBack = () => {
    history.goBack();
  };
  const onSubmit = () => {
    console.log(value);
    const { carMaker, carName, carYear, oilKind, carNum } = value;
    const userid = localStorage.getItem('userid');
    const Authorization = localStorage.getItem('token');
    axios({
      method: 'post',
      url: 'http://localhost:8000/mycar/',
      headers: {
        Authorization: `JWT ${Authorization}`,
      },
      data: {
        userid: userid,
        car_company: carMaker,
        car_name: carName,
        car_old: carYear,
        car_oil: oilKind,
        car_number: carNum,
      },
    })
      .then((response) => {
        const status = response.status;
        if (status === 200) {
          return (window.location.href = '/index');
        }
      })
      .error((error) => {
        const status = error.status;
        console.log(status);
      });
  };
  const onChange = useCallback(
    (e) => {
      console.log(e.target.value);
      setValue({ ...value, [e.target.name]: e.target.value });
    },
    [value],
  );
  useEffect(() => {
    const unblock = history.block('등록을 취소하시겠습니까?');
    return () => {
      unblock();
    };
  }, [history]);
  return (
    <form>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align="center">
                <h2>차량 등록</h2>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <TableCell align="center">제조사</TableCell>
              <TableCell align="center">
                <TextField
                  id="carMaker"
                  name="carMaker"
                  style={{ margin: 1 }}
                  fullWidth
                  margin="dense"
                  placeholder="제조사를 입력하세요."
                  variant="outlined"
                  value={value.carMaker || ''}
                  onChange={onChange}
                />
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell align="center">차 종</TableCell>
              <TableCell align="center">
                <TextField
                  id="carName"
                  name="carName"
                  margin="dense"
                  fullWidth
                  placeholder="차종을 입력하세요."
                  variant="outlined"
                  value={value.carName || ''}
                  onChange={onChange}
                />
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell align="center">연식</TableCell>
              <TableCell align="center">
                <TextField
                  id="carYear"
                  name="carYear"
                  style={{ margin: 1 }}
                  fullWidth
                  margin="dense"
                  placeholder="연식을 입력하세요."
                  variant="outlined"
                  value={value.carYear || ''}
                  onChange={onChange}
                />
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell align="center">유종</TableCell>
              <TableCell align="center">
                <TextField
                  id="oilKind"
                  name="oilKind"
                  style={{ margin: 1 }}
                  fullWidth
                  margin="dense"
                  placeholder="유종 입력하세요."
                  variant="outlined"
                  value={value.oilKind || ''}
                  onChange={onChange}
                />
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell align="center">차량번호</TableCell>
              <TableCell align="center">
                <TextField
                  id="carNum"
                  name="carNum"
                  style={{ margin: 1 }}
                  fullWidth
                  margin="dense"
                  placeholder="차량번호를 입력하세요."
                  variant="outlined"
                  value={value.carNum || ''}
                  onChange={onChange}
                />
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={6}>
          <Button variant="contained" onClick={onGoBack}>
            취소
          </Button>
        </Grid>
        <Grid item xs={6} align="right">
          <Button
            variant="contained"
            color={'primary'}
            type="button"
            onClick={onSubmit}
          >
            등록
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MyCarAdd;
