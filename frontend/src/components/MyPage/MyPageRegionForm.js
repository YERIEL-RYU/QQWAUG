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

const MyPageRegionForm = (props) => {
  const { title, classes, onGoBack } = props;
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
          <Grid item xs={4}>
            <InputLabel id="userRegion">지역</InputLabel>
          </Grid>
          <Grid item xs={6}>
            <Select
              labelId="userRegion"
              id="userRegion"
              name="userRegion"
              fullWidth
            >
              <MenuItem value="">선택 안함</MenuItem>
              <MenuItem value="seoul">서울</MenuItem>
              <MenuItem value="busan">부산</MenuItem>
              <MenuItem value="incheon">인천</MenuItem>
              <MenuItem value="">기타</MenuItem>
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
            <Button variant="contained" color={'primary'} type="button">
              등록
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default MyPageRegionForm;
