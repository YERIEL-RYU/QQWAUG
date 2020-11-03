import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

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

const EnginOil = () => {
  //   useEffect(() => {
  //     axios
  //       .get('http://localhost:8000/post/list')
  //       .then(({ data }) => setDatas(data));
  //   }, []);
  const classes = useStyles();
  const [datas, setDatas] = useState([]);
  const [DialogOpen, setOnDialogOpen] = useState(false);
  const onDialogOpen = () => {
    setOnDialogOpen(true);
  };
  const onDialogClose = () => {
    setOnDialogOpen(false);
  };
  const [value, setValue] = useState([]);
  const onChange = useCallback(
    (e) => {
      console.log(e.target.value, e.target.name);
      setValue({ ...value, [e.target.name]: e.target.value });
    },
    [value],
  );
  const onClick = useCallback(() => {
    // await axios
    //   .post('http://localhost:8000/posts/list/create/', {
    //     title: value.title,
    //     content: value.content,
    //     writer: value.wirter,
    //   })
    //   .then((response) => console.log(response));
    // await axios
    //   .get('http://localhost:8000/post/list')
    //   .then(({ data }) => setDatas(data));
    setValue('');
    setOnDialogOpen(false);
  }, [value]);
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
          open={DialogOpen}
          onClose={onDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">test</DialogTitle>
          <form>
            <DialogContent>
              <TextField
                id="title"
                name="title"
                label="title"
                type="text"
                value={value.title}
                onChange={onChange}
                fullWidth
              />
              <TextField
                id="content"
                label="content"
                name="content"
                type="text"
                value={value.content}
                onChange={onChange}
                fullWidth
              />
              <TextField
                id="wirter"
                name="wirter"
                label="wirter"
                type="wirter"
                value={value.wirter}
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
      {datas.length === 0 ? (
        <Typography>Non data</Typography>
      ) : (
        datas.map((data) => (
          <Grid item key={data.id}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {data.content}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {data.writer}
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

export default EnginOil;
