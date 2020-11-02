import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';

const JoinForm = (value) => {
  //console.log(onChange);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        회원가입
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="userId"
            name="userId"
            label="아이디를 입력하세요"
            fullWidth
            onChange={value.onChange}
            value={value.value.userId}
            error={value.value.userId === '' ? true : false}
            helperText="아이디는 필수 입력입니다."
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="userPw"
            name="userPw"
            label="비밀번호를 입력하세요"
            fullWidth
            type="password"
            onChange={value.onChange}
            value={value.value.userPw}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="userName"
            name="userName"
            label="이름을 입력하세요"
            fullWidth
            onChange={value.onChange}
            value={value.value.userName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="userPhone"
            name="userPhone"
            label="휴대전화 번호를 입력하세요"
            fullWidth
            type="tel"
            placeholder="010-0000-0000"
            onChange={value.onChange}
            value={value.value.userPhone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="userEmail"
            name="userEmail"
            label="이메일을 입력하세요"
            fullWidth
            type="email"
            placeholder="example@qqingqqing.com"
            onChange={value.onChange}
            value={value.value.userEmail}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default JoinForm;
