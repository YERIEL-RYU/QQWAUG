import React from 'react';
import {
  CssBaseline,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: ' 100%',
    height: '100%',
  },
  title: {
    paddingTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  section: {
    width: '90%',
    alignContent: 'center',
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
    minHeight: '300px',
  },
}));
const MyPagePresenter = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <Typography variant="h4" className={classes.title}>
        My Page
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Paper className={classes.section}>
            <Typography variant="h5" className={classes.title}>
              기본정보
            </Typography>
            <Grid
              container
              justify="flex-start"
              spacing={3}
              alignItems="center"
            >
              <Grid item xs={3}>
                <label>아이디</label>
              </Grid>
              <Grid item>
                <span>dddd</span>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              justify="flex-start"
              spacing={3}
              alignItems="center"
            >
              <Grid item xs={3}>
                <label>이름</label>
              </Grid>
              <Grid item>
                <span>dddd</span>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              justify="flex-start"
              spacing={3}
              alignItems="center"
            >
              <Grid item xs={3}>
                <label>휴대전화번호</label>
              </Grid>
              <Grid item>
                <span></span>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              justify="flex-start"
              spacing={3}
              alignItems="center"
            >
              <Grid item xs={3}>
                <label>이메일</label>
              </Grid>
              <Grid item>
                <span>dddd</span>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.section}>
            <Typography variant="h5" className={classes.title}>
              프로필 정보
            </Typography>
            <Grid
              container
              justify="flex-start"
              spacing={3}
              alignItems="center"
            >
              <Grid item xs={3}>
                <label>아이디</label>
              </Grid>
              <Grid item>
                <span>dddd</span>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              justify="flex-start"
              spacing={3}
              alignItems="center"
            >
              <Grid item xs={3}>
                <label>이름</label>
              </Grid>
              <Grid item>
                <span>dddd</span>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              justify="flex-start"
              spacing={3}
              alignItems="center"
            >
              <Grid item xs={3}>
                <label>휴대전화번호</label>
              </Grid>
              <Grid item>
                <span></span>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              justify="flex-start"
              spacing={3}
              alignItems="center"
            >
              <Grid item xs={3}>
                <label>이메일</label>
              </Grid>
              <Grid item>
                <span>dddd</span>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MyPagePresenter;
