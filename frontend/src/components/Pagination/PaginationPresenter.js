import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      float: 'right',
    },
  },
}));

const PaginationPresenter = (props) => {
  const classes = useStyles();
  const { rowsPerPage, PATH, pageNumber, datas } = props;
  return (
    <div className={classes.root}>
      <Pagination
        page={Number(pageNumber)}
        count={Math.ceil(datas.length / rowsPerPage)}
        color="primary"
        showFirstButton
        showLastButton
        boundaryCount={2}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            selected
            to={`${PATH}/${item.page}`}
            {...item}
          />
        )}
      />
    </div>
  );
};

export default PaginationPresenter;
