import React, { useState } from 'react';
import {
  Button,
  CssBaseline,
  Divider,
  Grid,
  Input,
  Paper,
  Typography,
} from '@material-ui/core';

const MyPageImageForm = (props) => {
  const { title, classes, onGoBack, onChange, value, onProfileSubmit } = props;
  const [imgBase64, setImgBase64] = useState(null);
  const [file, setFile] = useState(null);
  const onFileChange = (e) => {
    if (e.target.files[0]) {
      console.log('file: ', e.target.files);
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgBase64(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    onChange(file);
  };
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
            <Input
              id="userImg"
              name="profile_img"
              label="프로필 사진"
              fullWidth
              type="file"
              accept="image/jpg, image/png, image/jpeg, image/gif"
              value={value.profile_img || ''}
              onChange={onFileChange}
            />
            <Grid item>
              {file !== null ? (
                <img
                  src={imgBase64}
                  alt="이미지 미리보기"
                  style={{ height: 200, width: 200, alignContent: 'center' }}
                />
              ) : (
                <Typography
                  style={{ height: 200, width: 200, background: 'grey' }}
                >
                  이미지 없음
                </Typography>
              )}
            </Grid>
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
      </Paper>
    </Paper>
  );
};

export default MyPageImageForm;
