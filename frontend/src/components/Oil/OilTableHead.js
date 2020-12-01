import React from 'react';
import PropTypes from 'prop-types';

import TableHead from '@material-ui/core/TableHead';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';

const cells = [
  {
    id: 'oil_date',
    numeric: false,
    disablePadding: true,
    label: '날짜',
  },
  {
    id: 'oil_liter',
    numeric: true,
    disablePadding: false,
    label: '리터(L)',
  },
  {
    id: 'oil_price',
    numeric: true,
    disablePadding: false,
    label: '가격(원)',
  },
  {
    id: 'oil_total',
    numeric: true,
    disablePadding: false,
    label: '총 액(원)',
  },
];

const OilTableHead = (props) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    createSortHandler
  } = props;


  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {cells.map((cell) => (
          <TableCell
          key={cell.id}
          align={cell.numeric ? 'right' : 'left'}
          padding={cell.disablePadding ? 'none' : 'default'}
          sortDirection={orderBy === cell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : 'asc'}
              onClick={createSortHandler(cell.id)}
            >
              {cell.label}
              {orderBy === cell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default OilTableHead;

OilTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,

  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
