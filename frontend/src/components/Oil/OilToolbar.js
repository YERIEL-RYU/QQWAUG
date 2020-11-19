import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

//material import
import { lighten, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
// Dialog import
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// icon import
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const toolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const OilToolbar = (props) => {
  const {
    numSelected,
    DialogOpen,
    onDialogOpen,
    onDialogClose,
    value,
    onChange,
    onSubmit,
  } = props;
  const classes = toolbarStyles();
  return (
    <Toolbar
      className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tabletitle"
          component="div"
        >
          주유 관리
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="해당 내역 삭제">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="주유 내역 추가">
            <IconButton aria-label="Add list" onClick={onDialogOpen}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <form onSubmit={onSubmit}>
            <Dialog
              open={DialogOpen}
              onClose={onDialogClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">주유 내역 추가</DialogTitle>
              <DialogContent>
                <TextField
                  validate="filled"
                  autoFocus
                  margin="dense"
                  id="date"
                  name="oil_date"
                  value={value.oil_date || ''}
                  type="date"
                  onChange={onChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="liter"
                  label="리터"
                  name="oil_liter"
                  type="number"
                  value={value.oil_liter || ''}
                  onChange={onChange}
                  fullWidth
                />
                <TextField
                  validate="filled"
                  margin="dense"
                  id="price"
                  name="oil_price"
                  label="리터 당 가격"
                  type="number"
                  value={value.oil_price || ''}
                  onChange={onChange}
                  fullWidth
                />
                <TextField
                  validate="filled"
                  margin="dense"
                  id="total"
                  name="oil_total"
                  label="총 가격"
                  type="number"
                  value={
                    Number(value.oil_price) * Number(value.oil_liter) || ''
                  }
                  onChange={onChange}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={onDialogClose} color="primary">
                  취소
                </Button>
                <Button color="primary" type="submit" onClick={onSubmit}>
                  등록
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        </>
      )}
    </Toolbar>
  );
};
OilToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export default OilToolbar;
