import React, { Fragment, useState } from 'react';
import {
  Grid,
  TextField,
  Input,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

const Profile = ({ profileValue, onChange }) => {
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
    onChange(e);
  };
  return (
    <Fragment>
      <Typography variant="h5" gutterBottom align="center">
        프로필 작성
      </Typography>
      <Typography variant="subtitle2" align="center">
        아래 항목은 선택 입력입니다.
      </Typography>
      <Grid container={true} spacing={3}>
        <Grid item xs={6}>
          <label>프로필 사진</label>
          <Input
            id="userImg"
            name="userImg"
            label="프로필 사진"
            fullWidth
            type="file"
            accept="image/jpg, image/png, image/jpeg, image/gif"
            onChange={onFileChange}
            value={profileValue.img}
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
          <TextField
            id="userGender"
            name="userGender"
            label="성별"
            fullWidth
            value={profileValue.userGender || ''}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="userRegion">지역</InputLabel>
          <Select
            labelId="userRegion"
            id="userRegion"
            name="userRegion"
            fullWidth
            value={profileValue.userRegion || ''}
            onChange={onChange}
          >
            <MenuItem value={10}>서울</MenuItem>
            <MenuItem value={20}>부산</MenuItem>
            <MenuItem value={30}>인천</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Profile;
