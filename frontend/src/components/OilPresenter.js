import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import OilTableHead from './Oil/OilTableHead';
import OilToolbarContainer from './Oil/OilToolbarContainer';

const tableStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));
const OilPresenter = (props) => {
  const classes = tableStyles();
  const {
    datas,
    selected,
    order,
    orderBy,
    onSelectAllClick,
    createSortHandler,
    stableSort,
    getComparator,
    isSelected,
    onClick,
    page,
    rowsPerPage,
    emptyRows,
    onChangePage,
    onChangeRowsPerPage,
  } = props;
  return (
    <Paper className={classes.paper}>
      <OilToolbarContainer numSelected={selected.length} selected={selected}/>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="oil table"
        >
          <OilTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={onSelectAllClick}
            createSortHandler={createSortHandler}
            rowCount={datas.length}
          />
          <TableBody>
            {stableSort(datas, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, index) => {
                const isItemSelected = isSelected(data);
                const labelId = `oil-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => onClick(event, data)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={data.oil_date}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {data.oil_date}
                    </TableCell>
                    <TableCell align="right">{data.oil_liter}</TableCell>
                    <TableCell align="right">{data.oil_price}</TableCell>
                    <TableCell align="right">{data.oil_total}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10,15,20]}
        component="div"
        count={datas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OilPresenter;
