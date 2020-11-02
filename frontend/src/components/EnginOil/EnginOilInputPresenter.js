import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

const EnginOilInputPresenter = (props) => {
  const {
    classes,
    onChange,
    onDialogClose,
    onDialogOpen,
    onClick,
    value,
    DialogOpen,
  } = props;
  return (
    <Grid item>
      <Card className={classes}>
        <CardActionArea style={{ height: 300 }} onClick={onDialogOpen}>
          <CardContent>
            <AddIcon fontSize="large" />
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog
        open={DialogOpen}
        onClose={onDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">엔진오일 교체 내역</DialogTitle>
        <form>
          <DialogContent>
            <TextField
              autoFocus
              id="image"
              name="image"
              type="file"
              // value={value.image || ''}
              onChange={onChange}
              accept="image/*"
              fullWidth
            />
            <TextField
              id="date"
              name="date"
              type="date"
              // value={value.date || ''}
              onChange={onChange}
              fullWidth
            />
            <TextField
              id="where"
              label="카센터"
              name="where"
              type="text"
              // value={value.where || ''}
              onChange={onChange}
              fullWidth
            />
            <TextField
              id="km"
              name="km"
              label="교체 Km"
              type="number"
              // value={value.km || ''}
              onChange={onChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onDialogClose} color="primary">
              취소
            </Button>
            <Button color="primary" onClick={onClick}>
              등록
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
};

export default EnginOilInputPresenter;
