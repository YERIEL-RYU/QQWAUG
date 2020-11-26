import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const EnginOilInputPresenter = (props) => {
  const {
    title,
    onChange,
    onDialogClose,
    onClick,
    value,
    DialogOpen,
    onModify
  } = props;
  return (
    <Dialog
      open={DialogOpen}
      onClose={onDialogClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <form>
        <DialogContent>
          <TextField
            autoFocus
            id="image"
            name="image"
            type="file"
            value={value.image || ''}
            onChange={onChange}
            accept="image/*"
            fullWidth
          />
          <TextField
            id="date"
            name="date"
            type="date"
            value={value.date || ''}
            onChange={onChange}
            fullWidth
          />
          <TextField
            id="where"
            label="카센터"
            name="where"
            type="text"
            value={value.where || ''}
            onChange={onChange}
            fullWidth
          />
          <TextField
            id="km"
            name="km"
            label="교체 Km"
            type="number"
            value={value.km || ''}
            onChange={onChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="primary">
            취소
          </Button>
          <Button color="primary" onClick={title === '엔진오일 교체 내역 등록'?onClick:onModify}>
            {title === '엔진오일 교체 내역 등록'?'등록':'수정'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EnginOilInputPresenter;
