import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const MyCarPresenter = ({ mycar }) => {
  const classes = tableStyle();
  console.log(mycar);
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
        {/* <TableBody>
          <StyledTableRow>
            <TableCell className={classes.cell}>제조사</TableCell>
            {mycar.carCompany === '' ? (
              <TableCell align="center">등록 된 정보가 없습니다.</TableCell>
            ) : (
              <TableCell align="center">{mycar.carCompany}</TableCell>
            )}
          </StyledTableRow>
          <StyledTableRow>
            <TableCell className={classes.cell}>차 종</TableCell>
            {mycar.carName === '' ? (
              <TableCell align="center">등록 된 정보가 없습니다.</TableCell>
            ) : (
              <TableCell align="center">{mycar.carName}</TableCell>
            )}
          </StyledTableRow>
          <StyledTableRow>
            <TableCell className={classes.cell}>연식</TableCell>
            {mycar.carOld === '' ? (
              <TableCell align="center">등록 된 정보가 없습니다.</TableCell>
            ) : (
              <TableCell align="center">{mycar.carOld}</TableCell>
            )}
          </StyledTableRow>
          <StyledTableRow>
            <TableCell className={classes.cell}>유종</TableCell>
            {mycar.carOil === '' ? (
              <TableCell align="center">등록 된 정보가 없습니다.</TableCell>
            ) : (
              <TableCell align="center">{mycar.carOil}</TableCell>
            )}
          </StyledTableRow>
          <StyledTableRow>
            <TableCell className={classes.cell}>차량번호</TableCell>
            {mycar.carNumber === '' ? (
              <TableCell align="center">등록 된 정보가 없습니다.</TableCell>
            ) : (
              <TableCell align="center">{mycar.carNumber}</TableCell>
            )}
          </StyledTableRow>
        </TableBody> */}
      </Table>
    </TableContainer>
  );
};

export default MyCarPresenter;
