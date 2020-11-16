import React, { useCallback, useEffect, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Divider,
} from '@material-ui/core';
import axios from 'axios';

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
  img: {
    width: '100px',
    height: 'auto',
  },
}));
const MyPage = () => {
  useEffect(() => {
    const userid = localStorage.getItem('userid');
    axios
      .get(`http://localhost:8000/users/profile/${userid}/`)
      .then((response) => response.data)
      .then(
        ({ userid, username, profile_img, profile_region, profile_gender }) =>
          setUser({
            userId: userid,
            userName: username,
            profileImg: profile_img,
            profileRegion: profile_region,
            profileGender: profile_gender,
          }),
      )
      .catch((error) => console.log(error.response));
  }, []);
  const [user, setUser] = useState({
    userId: '',
    userName: '',
    profileImg: '',
    profileRegion: '',
    profileGender: '',
  });
  const classes = useStyles();
  const onClick = useCallback(() => {
    console.log('클릭이벤트');
  }, []);
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
              onClick={onClick}
            >
              <Grid item xs={4}>
                <Typography variant="subtitle1" className={classes.content}>
                  아이디
                </Typography>
              </Grid>
              <Grid item>
                <span className={classes.content}>{user.userId}</span>
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
                <Typography variant="subtitle1" className={classes.content}>
                  비밀번호
                </Typography>
              </Grid>
              <Grid item>
                <span className={classes.content}>비밀번호를 변경합니다.</span>
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
                <Typography variant="subtitle1" className={classes.content}>
                  이름
                </Typography>
              </Grid>
              <Grid item>
                <span className={classes.content}>{user.userName}</span>
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
                <Typography variant="subtitle1" className={classes.content}>
                  이메일
                </Typography>
              </Grid>
              <Grid item>
                <span className={classes.content}></span>
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
            >
              <Grid item xs={4}>
                <Typography variant="subtitle1" className={classes.content}>
                  지역
                </Typography>
              </Grid>
              <Grid item>
                {user.profileRegion === '' || user.profileRegion === null ? (
                  <span className={classes.content}>
                    등록 된 정보가 없습니다.
                  </span>
                ) : (
                  <span className={classes.content}>{user.profileRegion}</span>
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
            >
              <Grid item xs={4}>
                <Typography variant="subtitle1" className={classes.content}>
                  성별
                </Typography>
              </Grid>
              <Grid item>
                {user.profileGender === '' || user.profileGender === null ? (
                  <span className={classes.content}>
                    등록 된 정보가 없습니다.
                  </span>
                ) : (
                  <span className={classes.content}>{user.profileGender}</span>
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
            >
              <Grid item xs={4}>
                <Typography variant="subtitle1" className={classes.content}>
                  이미지
                </Typography>
              </Grid>
              <Grid item>
                <img
                  className={classes.img}
                  src={
                    user.profileImg === '' || user.profileImg === null
                      ? 'https://lh3.googleusercontent.com/proxy/8gjp-8G-0mQGOVEZlSmCw4zQ1LLuIhCMGwPnESMYNlhMmf5UBOoYpxoO83wkVXTigZLtsEkhdsNr1djncVvRYWdYOiDdTQJQWiyn6r18uSYDAA'
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

export default MyPage;
