import React, { Fragment, useState } from 'react';
import { Grid, TextField, Input, Typography } from '@material-ui/core';

const Profile = (previewGridProps, showFileNames, value) => {
  const [imgBase64, setImgBase64] = useState(null);
  const [file, setFile] = useState(null);
  console.log(file, 'profile');
  const onChange = (e) => {
    if (e.target.files[0]) {
      console.log('file: ', e.target.files);
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgBase64(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Fragment>
      <Grid container={true} spacing={3} {...previewGridProps.container}>
        <Grid item xs={6}>
          <label>프로필 사진</label>
          <Input
            id="userImg"
            name="userImg"
            label="프로필 사진"
            fullWidth
            type="file"
            accept="image/jpg, image/png, image/jpeg, image/gif"
            onChange={onChange}
          />
        </Grid>
        <Grid item>
          {file !== null ? (
            <img
              src={imgBase64}
              alt="이미지 미리보기"
              style={{ height: 200, width: 200, alignContent: 'center' }}
            />
          ) : (
            <Typography style={{ height: 200, width: 200, background: 'grey' }}>
              이미지 없음
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField id="userArea" name="userArea" label="지역" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="userProfile1"
            name="userArea"
            label="프로필1"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="userProfile2"
            name="userArea"
            label="프로필2"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="userProfile3"
            name="userArea"
            label="프로필3"
            fullWidth
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Profile;
