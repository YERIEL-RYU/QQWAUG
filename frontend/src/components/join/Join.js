import React, { Fragment, useCallback, useState } from 'react';
import JoinForm from './JoinForm';
import Profile from './Profile';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['회원가입', '프로필 작성'];

const getStepContent = (
  step,
  joinValue,
  profileValue,
  alert,
  onChange,
  onUseridChange,
) => {
  switch (step) {
    case 0:
      return (
        <JoinForm
          joinValue={joinValue}
          alert={alert}
          onChange={onChange}
          onUseridChange={onUseridChange}
        />
      );
    case 1:
      return <Profile profileValue={profileValue} onChange={onChange} />;

    default:
      throw new Error('Unknoew step');
  }
};

const Join = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [joinValue, setJoinValue] = useState([]);
  const [profileValue, setProfileValue] = useState([]);
  const [alert, setAlert] = useState('');
  const onNext = () => {
    setActiveStep(activeStep + 1);
  };
  const onBack = () => {
    setActiveStep(activeStep - 1);
  };
  const onChange = useCallback(
    (e) => {
      if (activeStep === 0) {
        setJoinValue({ ...joinValue, [e.target.name]: e.target.value });
        console.log(joinValue);
      } else {
        setProfileValue({ ...profileValue, [e.target.name]: e.target.value });
        console.log(profileValue);
      }
    },
    [joinValue, profileValue, activeStep],
  );
  const onUseridChange = useCallback(
    (e) => {
      const userid = joinValue.userId;
      console.log(userid);
      axios
        .get(`http://localhost:8000/users/duplicate/${userid}`)
        .then((response) => {
          const status = response.status;
          if (status === 200) {
            setAlert('200 사용 가능한 아이디입니다.');
          }
        })
        .catch((error) => {
          const status = error.response.status;
          if (status === 409) {
            setAlert('409 이미 사용 중인 아이디입니다.');
          } else {
            setAlert('404 아이디를 입력하세요');
          }
        });
    },
    [joinValue],
  );
  const onSubmit = useCallback(
    (e) => {
      console.log(joinValue, profileValue, 'onSubmit');
      const { userId, userPw, userName, userEmail } = joinValue;
      const { img, userGender, userRegion } = profileValue;
      axios
        .post('http://localhost:8000/users/create/', {
          userid: userId,
          password: userPw,
          username: userName,
          useremail: userEmail,
        })
        .then((response) => {
          console.log(response.status);
        })
        .catch((error) => {
          console.log(error.response);
        });
      if (profileValue !== null) {
        axios
          .post('http://localhost:8000/users/profile/', {
            userid: userId,
            profile_img: img,
            profile_gender: userGender,
            profile_region: userRegion,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      onNext();
    },
    [joinValue, profileValue, activeStep],
  );
  return (
    <Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            회 원 가 입
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === steps.length ? (
              <Fragment>
                <Typography variant="h5" gutterBottom>
                  회원가입을 축하드립니다.
                </Typography>
                <Typography variant="subtitle1">
                  삥삥아 어디까지 갈래와 함께 차를 관리해보세요.
                </Typography>
                <Button href="/" color="primary">
                  로그인 하러가기
                </Button>
              </Fragment>
            ) : (
              <form>
                {getStepContent(
                  activeStep,
                  joinValue,
                  profileValue,
                  alert,
                  onChange,
                  onUseridChange,
                )}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button
                      variant="contained"
                      onClick={onBack}
                      color="default"
                      className={classes.button}
                    >
                      이전
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onSubmit}
                      className={classes.button}
                      type="button"
                    >
                      회원가입
                    </Button>
                  ) : joinValue.userId === '' ||
                    joinValue.userId === undefined ||
                    joinValue.userPw === '' ||
                    joinValue.userPw === undefined ||
                    joinValue.userName === '' ||
                    joinValue.userName === undefined ||
                    joinValue.userEmail === '' ||
                    joinValue.userEmail === undefined ? (
                    <Button
                      variant="contained"
                      disabled
                      className={classes.button}
                    >
                      다음
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onNext}
                      className={classes.button}
                      type="button"
                    >
                      다음
                    </Button>
                  )}
                </div>
              </form>
            )}
          </Fragment>
        </Paper>
      </main>
    </Fragment>
  );
};

export default Join;
