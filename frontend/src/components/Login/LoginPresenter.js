import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Footer from '../layout/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    marginBottom: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 1, 2),
  },
  grid: {
    marginBottom: theme.spacing(2),
  },
}));

const LoginPresenter = (props) => {
  const classes = useStyles();
  const { onInputChange, onLogin, value } = props;
  return (
    <div>
      <Container className={classes.root} component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            className={classes.avatar}
            src="https://image.cnbcfm.com/api/v1/image/106241502-1573736630770preview-1.jpg?v=1573736678"
          ></Avatar>
          <Typography component="h1" variant="h5">
            삥삥아 어디까지 갈래
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="아이디를 입력하세요."
              name="username"
              value={value.username || ''}
              onChange={onInputChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호를 입력하세요"
              type="password"
              id="password"
              value={value.password || ''}
              onChange={onInputChange}
              autoComplete="false"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onLogin}
            >
              로그인
            </Button>
          </form>
          <Grid
            container
            justify="space-evenly"
            alignItems="center"
            direction="row"
            className={classes.grid}
          >
            <Grid item>
              <Link href="#" variant="body2">
                비밀번호 찾기
              </Link>
            </Grid>
            <Grid item>
              <Link href="/join" variant="body2">
                {'회원가입'}
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default LoginPresenter;
