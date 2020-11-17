import React from 'react';
import {
  Button,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

const MyPageNormalFrom = (props) => {
  const { title, classes, onGoBack, value, onChange } = props;
  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <Typography variant="h4" className={classes.title}>
        My Page
      </Typography>
      <Paper className={classes.section}>
        <Typography variant="h5" className={classes.title}>
          {title} 변경
        </Typography>
        <Divider />
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          className={classes.content}
        >
          <Grid item xs={3}>
            <Typography variant="h6">{title}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              name={title === '비밀번호' ? 'password' : 'useremail'}
              type={title === '비밀번호' ? 'password' : 'email'}
              placeholder={title === '비밀번호' ? '' : 'example@qqing.com'}
              value={title === '비밀번호' ? value.password : value.useremail}
            ></TextField>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          className={classes.button}
        >
          <Grid item xs={6}>
            <Button variant="contained" onClick={onGoBack}>
              취소
            </Button>
          </Grid>
          <Grid item xs={6} align="center">
            <Button variant="contained" color={'primary'} type="button">
              등록
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default MyPageNormalFrom;
