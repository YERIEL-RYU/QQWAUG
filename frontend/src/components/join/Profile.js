import React, { Fragment, useState } from 'react';
import {
  Grid,
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
      console.log(e.target.files[0]);
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
            name="profile_img"
            label="프로필 사진"
            fullWidth
            type="file"
            accept="image/jpg, image/png, image/jpeg, image/gif"
            onChange={onFileChange}
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
          <InputLabel id="userGender">성별</InputLabel>
          <Select
            labelId="userGender"
            id="userGender"
            name="profile_gender"
            fullWidth
            value={profileValue.profile_gender || ''}
            onChange={onChange}
          >
            <MenuItem value="">선택안함</MenuItem>
            <MenuItem value="여성">여성</MenuItem>
            <MenuItem value="남성">남성</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="userRegion">지역</InputLabel>
          <Select
            labelId="userRegion"
            id="userRegion"
            name="profile_region"
            fullWidth
            value={profileValue.profile_region || ''}
            onChange={onChange}
          >
            <MenuItem value="">선택 안함</MenuItem>
            <MenuItem value="서울">서울</MenuItem>
            <MenuItem value="부산">부산</MenuItem>
            <MenuItem value="인천">인천</MenuItem>
            <MenuItem value="기타">기타</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Profile;
