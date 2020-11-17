import React, { useCallback } from 'react';
import {
  CssBaseline,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Divider,
  Link,
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
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
    minHeight: '300px',
    textAlign: 'center',
  },
  content: {
    height: 50,
    paddingTop: 10,
    cursor: 'pointer',
  },
  content2: {
    height: 50,
    paddingTop: 10,
  },
  img: {
    width: '100px',
    height: 'auto',
  },
}));
const MyPagePresenter = ({ onClick, user }) => {
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
              <Grid item xs={4}>
                <Typography variant="subtitle1" className={classes.content2}>
                  아이디
                </Typography>
              </Grid>
              <Grid item>
                <span className={classes.content2}>{user.userId}</span>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              id="userpassword"
              justify="flex-start"
              spacing={3}
              alignItems="center"
              onClick={onClick}
            >
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className={classes.content}
                  id="userpassword"
                >
                  비밀번호
                </Typography>
              </Grid>
              <Grid item>
                <span className={classes.content} id="userpassword">
                  비밀번호를 변경합니다.
                </span>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              justify="flex-start"
              spacing={3}
              alignItems="center"
              onClick={onClick}
            >
              <Grid item xs={4}>
                <Typography variant="subtitle1" className={classes.content2}>
                  이름
                </Typography>
              </Grid>
              <Grid item>
                <span className={classes.content2}>{user.userName}</span>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              id="useremail"
              justify="flex-start"
              spacing={3}
              alignItems="center"
              onClick={onClick}
            >
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className={classes.content}
                  id="useremail"
                >
                  이메일
                </Typography>
              </Grid>
              <Grid item>
                <span id="useremail" className={classes.content}>
                  {user.userEmail}
                </span>
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
              onClick={onClick}
              id="profileregion"
            >
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className={classes.content}
                  id="profileregion"
                >
                  지역
                </Typography>
              </Grid>
              <Grid item>
                {user.profileRegion === '' || user.profileRegion === null ? (
                  <span className={classes.content}>
                    등록 된 정보가 없습니다.
                  </span>
                ) : (
                  <span className={classes.content} id="profileregion">
                    {user.profileRegion}
                  </span>
                )}
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              justify="flex-start"
              spacing={3}
              alignItems="center"
              onClick={onClick}
              id="profilegender"
            >
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className={classes.content}
                  id="profilegender"
                >
                  성별
                </Typography>
              </Grid>
              <Grid item>
                {user.profileGender === '' || user.profileGender === null ? (
                  <span className={classes.content}>
                    등록 된 정보가 없습니다.
                  </span>
                ) : (
                  <span className={classes.content} id="profilegender">
                    {user.profileGender}
                  </span>
                )}
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              justify="flex-start"
              spacing={3}
              alignItems="center"
              onClick={onClick}
              id="profileimg"
            >
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className={classes.content}
                  id="profileimg"
                >
                  이미지
                </Typography>
              </Grid>
              <Grid item>
                <img
                  id="profileimg"
                  className={classes.img}
                  src={
                    user.profileImg === '' || user.profileImg === null
                      ? ''
                      : `http://localhost:8000/${user.profileImg}`
                  }
                  alt="프로필이미지"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MyPagePresenter;
