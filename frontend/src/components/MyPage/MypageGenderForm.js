import React from 'react';
import {
  Button,
  CssBaseline,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';

const MypageGenderForm = (props) => {
  const { title, classes, onGoBack, onChange, value, onProfileSubmit } = props;
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
        <form>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            className={classes.content}
          >
            <Grid item xs={4}>
              <InputLabel id="userGender">성별</InputLabel>
            </Grid>
            <Grid item xs={6}>
              <Select
                labelId="userGender"
                id="userGender"
                name="profile_gender"
                fullWidth
                value={value.profile_gender || ''}
                onChange={onChange}
              >
                <MenuItem value="">선택안함</MenuItem>
                <MenuItem value="F">여성</MenuItem>
                <MenuItem value="M">남성</MenuItem>
              </Select>
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
              <Button
                variant="contained"
                color={'primary'}
                type="button"
                onClick={onProfileSubmit}
              >
                등록
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Paper>
  );
};

export default MypageGenderForm;
