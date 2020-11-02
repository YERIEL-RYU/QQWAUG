import React, { Fragment, useState } from 'react';
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

const getStepContent = (step, value, onChange) => {
  switch (step) {
    case 0:
      return <JoinForm value={value} onChange={onChange} />;
    case 1:
      return <Profile value={value} onChange={onChange} />;

    default:
      throw new Error('Unknoew step');
  }
};

const Join = () => {
  const [user, setUser] = React.useState([
    {
      userid: '',
      userPw: '',
    },
  ]);
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const onNext = () => {
    setActiveStep(activeStep + 1);
  };
  const onBack = () => {
    setActiveStep(activeStep - 1);
  };
  const [value, setValue] = React.useState([]);
  const onChange = React.useCallback(
    (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
      console.log(value);
    },
    [value],
  );
  const onSubmit = React.useCallback(
    (e) => {
      console.log(value, 'onSubmit');
      setUser(user.concat(value));
      setValue([]);
      e.preventDefault();
      console.log(user, 'onSubmit');
    },
    [value, user],
  );
  console.log(user, 'join');
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
              <form onSubmit={onSubmit}>
                {getStepContent(activeStep, value, onChange)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={onBack} className={classes.button}>
                      이전
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onNext}
                    className={classes.button}
                    type="submit"
                  >
                    {activeStep === steps.length - 1 ? '회원가입' : '다음'}
                  </Button>
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
