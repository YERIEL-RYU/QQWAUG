import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';

const JoinForm = (props) => {
  const { joinValue, onChange, onUseridChange } = props;
  return (
    <>
      <Typography variant="h5" gutterBottom align="center">
        회원가입*
      </Typography>
      <Typography variant="subtitle2" align="center">
        아래 항목은 필수 입력입니다.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="userId"
            name="userId"
            label="아이디를 입력하세요"
            fullWidth
            onChange={onUseridChange}
            value={joinValue.userId || ''}
            error={joinValue.userId === '' ? true : false}
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
            onChange={onChange}
            value={joinValue.userPw || ''}
            error={joinValue.userPw === '' ? true : false}
            autoComplete="false"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="userName"
            name="userName"
            label="이름을 입력하세요"
            fullWidth
            onChange={onChange}
            value={joinValue.userName || ''}
            error={joinValue.userName === '' ? true : false}
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
            onChange={onChange}
            value={joinValue.userEmail || ''}
            error={joinValue.userEmail === '' ? true : false}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default JoinForm;
