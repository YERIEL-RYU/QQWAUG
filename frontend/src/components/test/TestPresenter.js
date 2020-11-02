import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    background: '#eeeeee',
  },
  card: {
    width: 250,
    textAlign: 'center',
    height: 300,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 50,
  },
});
const TestPresenter = (props) => {
  const {
    DialogOpen,
    value,
    onDialogOpen,
    onDialogClose,
    list,
    onChange,
  } = props;
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item>
        <Card className={classes.card}>
          <CardActionArea style={{ height: 300 }} onClick={onDialogOpen}>
            <CardContent>
              <AddIcon fontSize="large" />
            </CardContent>
          </CardActionArea>
        </Card>
        <Dialog
          aria-labelledby="form-dialog-title"
          open={DialogOpen}
          onClose={onDialogClose}
        >
          <DialogTitle id="form-dialog-title">엔진오일 교체 내역</DialogTitle>
          <form>
            <DialogContent>
              <TextField
                autoFocus
                id="image"
                name="image"
                type="file"
                value={value.image}
                onChange={onChange}
                accept="image/*"
                fullWidth
              />
              <TextField
                id="date"
                name="date"
                type="date"
                value={value.date}
                onChange={onChange}
                fullWidth
              />
              <TextField
                id="where"
                label="카센터"
                name="where"
                type="text"
                value={value.where}
                onChange={onChange}
                fullWidth
              />
              <TextField
                id="km"
                name="km"
                label="교체 Km"
                type="number"
                value={value.km}
                onChange={onChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={onDialogClose}>
                취소
              </Button>
              <Button color="primary">등록</Button>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
      {list.length === 0 ? (
        <Typography>no data</Typography>
      ) : (
        list.map((data) => (
          <Grid item key={data.km}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={data.date}
                  height="140"
                  image={data.image}
                  title={data.date}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.date}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {data.where}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {data.km} Km
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.button}>
                <Button size="small" color="primary">
                  수정
                </Button>
                <Button size="small" color="primary">
                  삭제
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default TestPresenter;
